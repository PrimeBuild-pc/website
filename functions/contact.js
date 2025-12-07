// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://primebuild.website/contact
// Handles POST form submissions with JSON body
// Uses Resend for email delivery

// Helper: compute allowed CORS origin (reflect if dev/pages, else whitelist)
function computeAllowOrigin(origin, env) {
  try {
    if (!origin) return '*';
    const o = new URL(origin).origin;
    const host = new URL(origin).hostname;
    const allowed = (env.ALLOWED_ORIGINS || '')
      .split(',').map(s => s.trim()).filter(Boolean);
    const isLocal = /^localhost(:\d+)?$/.test(host) || /^127\./.test(host);
    const isPages = /\.pages\.dev$/i.test(host);
    if (isLocal || isPages) return o; // riflette in dev / preview
    if (allowed.length === 0) return o;
    if (allowed.includes(o)) return o;
    return allowed[0];
  } catch { return '*'; }
}

export const onRequestPost = async (context) => {
  const { request, env } = context;
  const start = Date.now();
  const origin = request.headers.get('Origin') || '';
  const allowOriginHeader = computeAllowOrigin(origin, env);
  const strictEmail = env.EMAIL_STRICT === '1'; // se non impostato: fail-soft
  const debugEnabled = env.DEBUG === '1';

  const baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowOriginHeader || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };

  try {
    const bodyText = await request.text();
    let data;
    try { data = JSON.parse(bodyText); } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), { status: 400, headers: baseHeaders });
    }

    // Honeypot
    if (data.website) {
      return new Response(JSON.stringify({ success: true, skipped: true }), { status: 200, headers: baseHeaders });
    }

    const sanitize = (v, max) =>
      String(v || '').replace(/<[^>]+>/g, '').trim().slice(0, max);

    const name = sanitize(data.name, 100);
    const email = sanitize(data.email, 254);
    const subject = sanitize(data.subject, 150);
    const message = sanitize(data.message, 5000);

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Missing fields' }), { status: 400, headers: baseHeaders });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email' }), { status: 400, headers: baseHeaders });
    }

    // Rate limit (KV)
    if (env.CONTACT_RATE_KV) {
      try {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const raw = await env.CONTACT_RATE_KV.get(ip);
        const now = Date.now();
        const WINDOW_MS = 60 * 60 * 1000;
        const MAX = 10;
        let rec = raw ? JSON.parse(raw) : { first: now, count: 0 };
        if (now - rec.first > WINDOW_MS) rec = { first: now, count: 0 };
        if (rec.count >= MAX) {
          return new Response(JSON.stringify({ success: false, error: 'Rate limit' }), { status: 429, headers: baseHeaders });
        }
        rec.count++;
        await env.CONTACT_RATE_KV.put(ip, JSON.stringify(rec), { expirationTtl: 7200 });
      } catch (e) {
        console.warn('KV rate limit error', e);
      }
    }

    // Mail sending (Resend)
    const mailTo = env.MAIL_TO;
    const resendApiKey = env.RESEND_API_KEY;

    if (!mailTo) {
      console.warn('MAIL_TO missing – skipping send.');
      return new Response(JSON.stringify({ success: true, warning: 'MAIL_TO missing' }), { status: 200, headers: baseHeaders });
    }

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY missing – skipping send.');
      return new Response(JSON.stringify({ success: true, warning: 'RESEND_API_KEY missing' }), { status: 200, headers: baseHeaders });
    }

    const fromEmail = env.MAIL_FROM || 'onboarding@resend.dev';
    const prefix = env.MAIL_SUBJECT_PREFIX ? env.MAIL_SUBJECT_PREFIX.trim() + ' ' : '';
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
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: `Modulo Contatti <${fromEmail}>`,
          to: [mailTo],
          reply_to: email,
          subject: `${prefix}${subject}`,
          html: html,
          text: plain
        })
      });

      if (!mailResp.ok) {
        const errTxt = await mailResp.text().catch(() => '');
        console.error('Resend send failed', mailResp.status, errTxt);
        const payload = { success: strictEmail ? false : true, warning: 'Email send failed', degraded: !strictEmail };
        if (debugEnabled) payload.debug = { status: mailResp.status, body: errTxt.slice(0, 400) };
        return new Response(JSON.stringify(payload), { status: strictEmail ? 502 : 200, headers: baseHeaders });
      }
    } catch (e) {
      console.error('Resend exception', e);
      const payload = { success: strictEmail ? false : true, warning: 'Email send exception', degraded: !strictEmail };
      if (debugEnabled) payload.debug = { message: (e && e.message) || String(e) };
      return new Response(JSON.stringify(payload), { status: strictEmail ? 502 : 200, headers: baseHeaders });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Message received successfully!',
      ms: Date.now() - start
    }), { status: 200, headers: baseHeaders });

  } catch (e) {
    console.error('Unhandled contact function error', e);
    const payload = { success: false, error: 'Server error' };
    if (debugEnabled) payload.debug = { message: (e && e.message) || String(e) };
    return new Response(JSON.stringify(payload), { status: 500, headers: baseHeaders });
  }
};

export const onRequestOptions = async ({ request, env }) => {
  const allow = computeAllowOrigin(request.headers.get('Origin') || '', env);
  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    }
  });
};
