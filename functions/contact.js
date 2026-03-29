// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://primebuild.website/contact
// Handles POST form submissions with JSON body
// Uses Resend + Cloudflare Turnstile server-side validation

const DEFAULT_ALLOWED_ORIGIN = 'https://primebuild.website';
const DEFAULT_TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function parseAllowedOrigins(env) {
  const configured = (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGIN)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return configured
    .map((origin) => {
      try {
        return new URL(origin).origin;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function getAllowedCorsOrigin(request, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return null;

  let normalizedOrigin;
  try {
    normalizedOrigin = new URL(origin).origin;
  } catch {
    return null;
  }

  const allowedOrigins = parseAllowedOrigins(env);
  return allowedOrigins.includes(normalizedOrigin) ? normalizedOrigin : null;
}

function jsonHeaders(allowOrigin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Origin',
  };

  if (allowOrigin) {
    headers['Access-Control-Allow-Origin'] = allowOrigin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }

  return headers;
}

function jsonResponse(payload, status, allowOrigin = null) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: jsonHeaders(allowOrigin),
  });
}

function sanitize(value, max) {
  if (!value) return '';

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
    .slice(0, max);
}

async function enforceRateLimit(request, env) {
  if (!env.CONTACT_RATE_KV) {
    return { allowed: false, status: 503, error: 'Rate limit unavailable' };
  }

  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const raw = await env.CONTACT_RATE_KV.get(ip);

    const WINDOW_MS = 60 * 60 * 1000;
    const MAX_REQUESTS = 10;

    let rec = raw ? JSON.parse(raw) : { first: now, count: 0 };
    if (now - rec.first > WINDOW_MS) {
      rec = { first: now, count: 0 };
    }

    if (rec.count >= MAX_REQUESTS) {
      return { allowed: false, status: 429, error: 'Rate limit' };
    }

    rec.count += 1;
    await env.CONTACT_RATE_KV.put(ip, JSON.stringify(rec), { expirationTtl: 7200 });
    return { allowed: true };
  } catch (error) {
    console.error('KV rate limit error', error);
    return { allowed: false, status: 503, error: 'Rate limit unavailable' };
  }
}

async function verifyTurnstileToken(request, env, token, debugEnabled) {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: false, status: 503, error: 'Turnstile not configured' };
  }

  const verifyUrl = env.TURNSTILE_VERIFY_URL || DEFAULT_TURNSTILE_VERIFY_URL;
  const remoteIp = request.headers.get('CF-Connecting-IP') || '';

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp,
    }).toString();

    const verifyResp = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!verifyResp.ok) {
      const text = await verifyResp.text().catch(() => '');
      console.error('Turnstile verify HTTP error', verifyResp.status, text);
      return { ok: false, status: 502, error: 'Turnstile verification failed' };
    }

    const verifyData = await verifyResp.json();
    if (!verifyData.success) {
      if (debugEnabled) {
        console.debug('Turnstile verify errors:', verifyData['error-codes'] || []);
      }
      return { ok: false, status: 400, error: 'Turnstile validation failed' };
    }

    return { ok: true };
  } catch (error) {
    console.error('Turnstile verify exception', error);
    return { ok: false, status: 502, error: 'Turnstile verification failed' };
  }
}

export const onRequestPost = async (context) => {
  const { request, env } = context;
  const start = Date.now();
  const allowOrigin = getAllowedCorsOrigin(request, env);
  const strictEmail = env.EMAIL_STRICT === '1';
  const debugEnabled = env.DEBUG === '1';

  if (!allowOrigin) {
    return jsonResponse({ success: false, error: 'Origin not allowed' }, 403);
  }

  try {
    const bodyText = await request.text();
    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON' }, 400, allowOrigin);
    }

    // Honeypot trap for basic bots
    if (data.website) {
      return jsonResponse({ success: true, skipped: true }, 200, allowOrigin);
    }

    const name = sanitize(data.name, 100);
    const email = sanitize(data.email, 254);
    const subject = sanitize(data.subject, 150);
    const message = sanitize(data.message, 5000);
    const turnstileToken = sanitize(data.turnstileToken, 4096);

    if (!name || !email || !subject || !message || !turnstileToken) {
      return jsonResponse({ success: false, error: 'Missing fields' }, 400, allowOrigin);
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Invalid email' }, 400, allowOrigin);
    }

    const rateLimit = await enforceRateLimit(request, env);
    if (!rateLimit.allowed) {
      return jsonResponse({ success: false, error: rateLimit.error }, rateLimit.status, allowOrigin);
    }

    const turnstileCheck = await verifyTurnstileToken(request, env, turnstileToken, debugEnabled);
    if (!turnstileCheck.ok) {
      return jsonResponse({ success: false, error: turnstileCheck.error }, turnstileCheck.status, allowOrigin);
    }

    const mailTo = env.MAIL_TO || 'primebuild.official@gmail.com';
    const resendApiKey = env.RESEND_API_KEY;
    if (!mailTo || !resendApiKey) {
      console.error('Email service not configured');
      return jsonResponse({ success: false, error: 'Email service misconfigured' }, 503, allowOrigin);
    }

    const fromEmail = env.MAIL_FROM || 'noreply@primebuild.website';
    const prefix = env.MAIL_SUBJECT_PREFIX ? `${env.MAIL_SUBJECT_PREFIX.trim()} ` : '';

    const html =
      `<p><strong>Nome:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Oggetto:</strong> ${subject}</p>
       <p><strong>Messaggio:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`;
    const plain =
      `Nome: ${name}\nEmail: ${email}\nOggetto: ${subject}\nMessaggio:\n${message}`;

    try {
      const mailResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Modulo Contatti <${fromEmail}>`,
          to: [mailTo],
          reply_to: email,
          subject: `${prefix}${subject}`,
          html,
          text: plain,
        }),
      });

      if (!mailResp.ok) {
        const errTxt = await mailResp.text().catch(() => '');
        console.error('Resend send failed', mailResp.status, errTxt);
        const payload = {
          success: strictEmail ? false : true,
          warning: 'Email send failed',
          degraded: !strictEmail,
        };

        if (debugEnabled) {
          console.debug('Resend error body:', errTxt.slice(0, 400));
        }

        return jsonResponse(payload, strictEmail ? 502 : 200, allowOrigin);
      }
    } catch (error) {
      console.error('Resend exception', error);
      const payload = {
        success: strictEmail ? false : true,
        warning: 'Email send exception',
        degraded: !strictEmail,
      };

      if (debugEnabled) {
        console.debug('Resend exception message:', (error && error.message) || String(error));
      }

      return jsonResponse(payload, strictEmail ? 502 : 200, allowOrigin);
    }

    return jsonResponse(
      {
        success: true,
        message: 'Message received successfully!',
        ms: Date.now() - start,
      },
      200,
      allowOrigin
    );
  } catch (error) {
    console.error('Unhandled contact function error', error);
    if (debugEnabled) {
      console.debug('Server error details:', (error && error.message) || String(error));
    }
    return jsonResponse({ success: false, error: 'Server error' }, 500, allowOrigin);
  }
};

export const onRequestOptions = async ({ request, env }) => {
  const allowOrigin = getAllowedCorsOrigin(request, env);
  if (!allowOrigin) {
    return new Response('', {
      status: 403,
      headers: {
        Vary: 'Origin',
      },
    });
  }

  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  });
};
