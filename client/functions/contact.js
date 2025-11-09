// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://<YOUR_PAGES_SUBDOMAIN>/contact
// Handles POST form submissions with JSON body

function computeAllowOrigin(origin, env) {
  try {
    if (!origin) return '*';
    const o = new URL(origin).origin;
    const host = new URL(origin).hostname;
    const allowed = (env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const isLocal = /^localhost$/.test(host) || /^127\./.test(host) || /^localhost:/.test(host);
    const isPages = /\.pages\.dev$/i.test(host);

    if (isLocal || isPages) return o;
    if (allowed.length === 0) return o;
    if (allowed.includes(o)) return o;
    return allowed[0];
  } catch {
    return '*';
  }
}

function json(resObj, status, allow) {
  return new Response(JSON.stringify(resObj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    }
  });
}

export const onRequestOptions = async ({ request, env }) => {
  const allow = computeAllowOrigin(request.headers.get('Origin'), env);
  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allow,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    }
  });
};

export const onRequestGet = async ({ request, env }) => {
  const allow = computeAllowOrigin(request.headers.get('Origin'), env);
  return json({ success: false, error: 'Method not allowed. Use POST.' }, 405, allow);
};

export const onRequestPost = async (context) => {
  const { request, env } = context;
  const allow = computeAllowOrigin(request.headers.get('Origin'), env);
  const started = Date.now();

  try {
    const text = await request.text();
    let data;
    try { data = JSON.parse(text); } catch {
      return json({ success: false, error: 'Invalid JSON' }, 400, allow);
    }

    // Honeypot
    if (data.website) {
      return json({ success: true, skipped: true }, 200, allow);
    }

    const sanitize = (v, max) =>
      String(v || '').replace(/<[^>]+>/g, '').trim().slice(0, max);

    const name = sanitize(data.name, 100);
    const email = sanitize(data.email, 254);
    const subject = sanitize(data.subject, 150);
    const message = sanitize(data.message, 5000);

    if (!name || !email || !subject || !message) {
      return json({ success: false, error: 'Missing fields' }, 400, allow);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ success: false, error: 'Invalid email' }, 400, allow);
    }

    // Rate limit
    if (env.CONTACT_RATE_KV) {
      try {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const raw = await env.CONTACT_RATE_KV.get(ip);
        const now = Date.now();
        const WINDOW = 3600_000;
        const MAX = 10;
        let rec = raw ? JSON.parse(raw) : { first: now, count: 0 };
        if (now - rec.first > WINDOW) rec = { first: now, count: 0 };
        if (rec.count >= MAX) {
          return json({ success: false, error: 'Rate limit' }, 429, allow);
        }
        rec.count++;
        await env.CONTACT_RATE_KV.put(ip, JSON.stringify(rec), { expirationTtl: 7200 });
      } catch (e) {
        console.warn('KV error', e);
      }
    }

    const mailTo = env.MAIL_TO;
    if (!mailTo) {
      console.warn('MAIL_TO missing');
      return json({ success: true, warning: 'MAIL_TO missing' }, 200, allow);
    }

    const fromEmail = env.MAIL_FROM || `no-reply@${new URL(request.url).hostname}`;
    const prefix = env.MAIL_SUBJECT_PREFIX ? env.MAIL_SUBJECT_PREFIX.trim() + ' ' : '';
    const plain = `Nome: ${name}\nEmail: ${email}\nOggetto: ${subject}\nMessaggio:\n${message}`;
    const html = `<p><strong>Nome:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Oggetto:</strong> ${subject}</p>
<p><strong>Messaggio:</strong><br/>${message.replace(/\n/g,'<br/>')}</p>`;

    try {
      const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
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

      if (!resp.ok) {
        const err = await resp.text().catch(() => '');
        console.error('MailChannels failed', resp.status, err);
        return json({ success: false, error: 'Email send failed' }, 502, allow);
      }
    } catch (e) {
      console.error('Mail send exception', e);
      return json({ success: false, error: 'Email send exception' }, 502, allow);
    }

    return json({
      success: true,
      message: 'Message received successfully!',
      ms: Date.now() - started
    }, 200, allow);

  } catch (e) {
    console.error('Unhandled error', e);
    return json({ success: false, error: 'Server error' }, 500, allow);
  }
};
