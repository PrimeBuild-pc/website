// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://<YOUR_PAGES_SUBDOMAIN>/contact
// Handles POST form submissions with JSON body

export const onRequestPost = async (context) => {
  const { request, env } = context;
  const start = Date.now();

  let origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',')
    .map(s => s.trim()).filter(Boolean);
  const allowOriginHeader = allowed.length === 0
    ? origin
    : (allowed.includes(origin) ? origin : allowed[0]);

  const baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowOriginHeader || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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

    // Mail sending (MailChannels)
    const mailTo = env.MAIL_TO;
    if (!mailTo) {
      console.warn('MAIL_TO missing – skipping send.');
      return new Response(JSON.stringify({ success: true, warning: 'MAIL_TO missing' }), { status: 200, headers: baseHeaders });
    }

    const fromEmail = env.MAIL_FROM || `no-reply@${new URL(request.url).hostname}`;
    const prefix = env.MAIL_SUBJECT_PREFIX ? env.MAIL_SUBJECT_PREFIX.trim() + ' ' : '';
    const html =
      `<p><strong>Nome:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Oggetto:</strong> ${subject}</p>
       <p><strong>Messaggio:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`;
    const plain =
      `Nome: ${name}\nEmail: ${email}\nOggetto: ${subject}\nMessaggio:\n${message}`;

    try {
      const mailResp = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: mailTo }] }],
            from: { email: fromEmail, name: 'Modulo Contatti' },
            reply_to: { email },
            subject: `${prefix}${subject}`,
            content: [
              { type: 'text/plain', value: plain },
              { type: 'text/html', value: html }
            ],
            headers: { 'X-Entity-Ref-ID': crypto.randomUUID() }
        })
      });

      if (!mailResp.ok) {
        const errTxt = await mailResp.text().catch(() => '');
        console.error('MailChannels send failed', mailResp.status, errTxt);
        return new Response(JSON.stringify({ success: false, error: 'Email send failed' }), { status: 502, headers: baseHeaders });
      }
    } catch (e) {
      console.error('MailChannels exception', e);
      return new Response(JSON.stringify({ success: false, error: 'Email send exception' }), { status: 502, headers: baseHeaders });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Message received successfully!',
      ms: Date.now() - start
    }), { status: 200, headers: baseHeaders });

  } catch (e) {
    console.error('Unhandled contact function error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500, headers: baseHeaders });
  }
};

export const onRequestOptions = async ({ request, env }) => {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const allowOriginHeader = allowed.length === 0
    ? origin
    : (allowed.includes(origin) ? origin : allowed[0]);
  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOriginHeader || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};
