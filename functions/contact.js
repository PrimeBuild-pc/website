// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://primebuild.website/contact
// Handles POST form submissions with JSON body
// Uses Resend + Cloudflare Turnstile server-side validation

const DEFAULT_ALLOWED_ORIGIN = 'https://primebuild.website';
const DEFAULT_TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_EMAILS_URL = 'https://api.resend.com/emails';

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

function clean(value, max) {
  return value ? String(value).trim().slice(0, max) : '';
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : '';
  } catch {
    return '';
  }
}

async function sendEmail(apiKey, payload) {
  return fetch(RESEND_EMAILS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
}

function buildConfirmation(name, qualificationFormUrl) {
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(qualificationFormUrl);
  const subject = 'Abbiamo ricevuto la tua richiesta | Prime Build';
  const text = `Ciao ${name},

abbiamo ricevuto il tuo primo contatto.

Per preparare una proposta adatta alle tue esigenze, completa il questionario: ${qualificationFormUrl}

Ci aiuterà a valutare budget, utilizzo, giochi o software, risoluzione, componenti già disponibili, preferenze e tempistiche.

PREVENTIVO BASE — GRATUITO
Include l'analisi delle tue esigenze, una stima del costo complessivo e l'indicazione della fascia di configurazione più adatta. È sufficiente per capire che tipo di PC e quale livello di prestazioni potresti ricevere affidando a Prime Build la realizzazione e l'assemblaggio.

PREVENTIVO COMPLETO — €25
Include la stessa analisi, con in più il modello esatto di ogni componente, i link di acquisto, i prezzi consigliati rilevati al momento della ricerca e una checklist completa di compatibilità. È pensato per chi vuole poter acquistare e assemblare la build in autonomia.

Se dopo aver acquistato il Preventivo Completo decidi di affidare comunque a Prime Build l'assemblaggio, i €25 già pagati verranno sottratti dal costo della manodopera.

I preventivi riflettono prezzi e disponibilità presenti nel momento in cui vengono preparati. Il mercato dei componenti può cambiare rapidamente e Prime Build non vende direttamente i singoli componenti. Se rileviamo un prezzo particolarmente alto, te lo comunichiamo con trasparenza e, quando ci sono indicazioni concrete di un possibile calo a breve, possiamo consigliarti di attendere.

Se ci hai contattato per assistenza relativa a un servizio già in corso, puoi rispondere direttamente a questa email senza compilare il questionario.

Team Prime Build`;
  const html = `<p>Ciao ${safeName},</p>
<p>abbiamo ricevuto il tuo primo contatto.</p>
<p>Per preparare una proposta adatta alle tue esigenze, completa il questionario: ci aiuterà a valutare budget, utilizzo, giochi o software, risoluzione, componenti già disponibili, preferenze e tempistiche.</p>
<p><a href="${safeUrl}" style="display:inline-block;padding:12px 20px;border-radius:6px;background:#ff6600;color:#000;text-decoration:none;font-weight:700">Completa il questionario</a></p>
<h2 style="font-size:18px">Preventivo Base — gratuito</h2>
<p>Include l'analisi delle tue esigenze, una stima del costo complessivo e l'indicazione della fascia di configurazione più adatta. È sufficiente per capire che tipo di PC e quale livello di prestazioni potresti ricevere affidando a Prime Build la realizzazione e l'assemblaggio.</p>
<h2 style="font-size:18px">Preventivo Completo — €25</h2>
<p>Include la stessa analisi, con in più il modello esatto di ogni componente, i link di acquisto, i prezzi consigliati rilevati al momento della ricerca e una checklist completa di compatibilità. È pensato per chi vuole poter acquistare e assemblare la build in autonomia.</p>
<p>Se dopo aver acquistato il Preventivo Completo decidi di affidare comunque a Prime Build l'assemblaggio, i €25 già pagati verranno sottratti dal costo della manodopera.</p>
<p>I preventivi riflettono prezzi e disponibilità presenti nel momento in cui vengono preparati. Il mercato dei componenti può cambiare rapidamente e Prime Build non vende direttamente i singoli componenti. Se rileviamo un prezzo particolarmente alto, te lo comunichiamo con trasparenza e, quando ci sono indicazioni concrete di un possibile calo a breve, possiamo consigliarti di attendere.</p>
<p>Se ci hai contattato per assistenza relativa a un servizio già in corso, puoi rispondere direttamente a questa email senza compilare il questionario.</p>
<p>Team Prime Build</p>`;

  return { subject, text, html };
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

    const name = clean(data.name, 100);
    const email = clean(data.email, 254);
    const subject = clean(data.subject, 150);
    const message = clean(data.message, 5000);
    const turnstileToken = clean(data.turnstileToken, 4096);

    if (!name || !email || !subject || !message || !turnstileToken) {
      return jsonResponse({ success: false, error: 'Missing fields' }, 400, allowOrigin);
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Invalid email' }, 400, allowOrigin);
    }

    const turnstileCheck = await verifyTurnstileToken(request, env, turnstileToken, debugEnabled);
    if (!turnstileCheck.ok) {
      return jsonResponse({ success: false, error: turnstileCheck.error }, turnstileCheck.status, allowOrigin);
    }

    const mailTo = env.MAIL_TO || 'primebuild.official@gmail.com';
    const resendApiKey = env.RESEND_API_KEY;
    const qualificationFormUrl = getHttpsUrl(env.QUALIFICATION_FORM_URL);
    if (!mailTo || !resendApiKey || !qualificationFormUrl) {
      console.error('Email service or qualification form not configured');
      return jsonResponse({ success: false, error: 'Email service misconfigured' }, 503, allowOrigin);
    }

    const fromEmail = env.MAIL_FROM || 'preventivi@primebuild.website';
    const replyTo = env.MAIL_REPLY_TO || fromEmail;
    const prefix = env.MAIL_SUBJECT_PREFIX ? `${env.MAIL_SUBJECT_PREFIX.trim()} ` : '[PRIMO CONTATTO] ';

    const html =
      `<p><strong>Nome:</strong> ${escapeHtml(name)}</p>
       <p><strong>Email:</strong> ${escapeHtml(email)}</p>
       <p><strong>Oggetto:</strong> ${escapeHtml(subject)}</p>
       <p><strong>Messaggio:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`;
    const plain =
      `Nome: ${name}\nEmail: ${email}\nOggetto: ${subject}\nMessaggio:\n${message}`;

    let notificationSent = false;
    try {
      const notificationResponse = await sendEmail(resendApiKey, {
        from: `Sito Prime Build <${fromEmail}>`,
        to: [mailTo],
        reply_to: email,
        subject: `${prefix}${subject}`,
        html,
        text: plain,
      });

      if (!notificationResponse.ok) {
        const errorText = await notificationResponse.text().catch(() => '');
        console.error('Resend notification failed', notificationResponse.status, errorText);
        return jsonResponse(
          {
            success: !strictEmail,
            warning: 'Email send failed',
            degraded: !strictEmail,
          },
          strictEmail ? 502 : 200,
          allowOrigin
        );
      }

      notificationSent = true;
      const confirmation = buildConfirmation(name, qualificationFormUrl);
      const confirmationResponse = await sendEmail(resendApiKey, {
        from: `Prime Build Preventivi <${fromEmail}>`,
        to: [email],
        reply_to: replyTo,
        ...confirmation,
      });

      if (!confirmationResponse.ok) {
        const errorText = await confirmationResponse.text().catch(() => '');
        console.error('Resend confirmation failed', confirmationResponse.status, errorText);
        return jsonResponse(
          {
            success: true,
            confirmationSent: false,
            warning: 'Confirmation email failed',
            ms: Date.now() - start,
          },
          200,
          allowOrigin
        );
      }
    } catch (error) {
      console.error('Resend exception', error);
      if (debugEnabled) {
        console.debug('Resend exception message:', (error && error.message) || String(error));
      }
      return jsonResponse(
        notificationSent
          ? { success: true, confirmationSent: false, warning: 'Confirmation email failed' }
          : { success: false, error: 'Email send exception' },
        notificationSent ? 200 : 502,
        allowOrigin
      );
    }

    return jsonResponse(
      {
        success: true,
        confirmationSent: true,
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
