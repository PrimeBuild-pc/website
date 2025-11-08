// Cloudflare Pages Function: /functions/contact.js
// Endpoint: https://<YOUR_PAGES_SUBDOMAIN>/contact
// Handles POST form submissions with JSON body

export const onRequestPost = async (context) => {
  try {
    const req = context.request;
    const env = context.env || {};

    // Basic CORS (adjust origins as needed)
    const origin = req.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || 'https://primebuild.website')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const headers = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : 'https://primebuild.website',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Content-Type': 'application/json'
    };

    // Preflight
    if (req.method === 'OPTIONS') {
      return new Response('', { status: 204, headers });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), { status: 400, headers });
    }

    const sanitize = (val) => (typeof val === 'string' ? val.replace(/<[^>]*>/g, '').trim() : '');

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const subject = sanitize(body.subject);
    const message = sanitize(body.message);
    const website = sanitize(body.website); // honeypot

    // KV Rate Limit (simple sliding window per IP)
    const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.CONTACT_RATE_KV) {
      try {
        const kvRecordRaw = await env.CONTACT_RATE_KV.get(ip);
        const now = Date.now();
        const WINDOW_MS = 60 * 60 * 1000; // 1 hour
        const MAX_COUNT = 10; // max submissions per window
        let data = kvRecordRaw ? JSON.parse(kvRecordRaw) : { first: now, count: 0 };
        if (now - data.first > WINDOW_MS) {
          data = { first: now, count: 0 }; // reset window
        }
        if (data.count >= MAX_COUNT) {
          return new Response(JSON.stringify({ success: false, message: 'Rate limit exceeded' }), { status: 429, headers });
        }
        data.count += 1;
        await env.CONTACT_RATE_KV.put(ip, JSON.stringify(data), { expirationTtl: 60 * 60 * 2 }); // keep for 2h
      } catch (e) {
        // Fail open on KV errors
        console.error('KV rate limit error', e);
      }
    }

    // Honeypot triggers silent success (avoid disclosing filtering logic)
    if (website) {
      return new Response(JSON.stringify({ success: true, message: 'Received' }), { status: 200, headers });
    }

    // Basic validation
    if (!name || name.length > 100) {
      return new Response(JSON.stringify({ success: false, message: 'Bad name' }), { status: 400, headers });
    }
    if (!email || email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Bad email' }), { status: 400, headers });
    }
    if (!subject || subject.length > 150) {
      return new Response(JSON.stringify({ success: false, message: 'Bad subject' }), { status: 400, headers });
    }
    if (!message || message.length > 5000) {
      return new Response(JSON.stringify({ success: false, message: 'Bad message' }), { status: 400, headers });
    }

    // Send email via MailChannels (recommended on Cloudflare)
    const toEmail = (env.MAIL_TO || 'primebuild.official@gmail.com').trim();
    const fromEmail = (env.MAIL_FROM || `no-reply@${new URL(headers['Access-Control-Allow-Origin']).hostname || 'primebuild.website'}`).trim();
    const subjectPrefix = (env.MAIL_SUBJECT_PREFIX || 'Contatto sito').trim();

    const html = `
      <h2>Nuovo contatto dal sito</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Oggetto:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Messaggio:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p>IP: ${escapeHtml(req.headers.get('CF-Connecting-IP') || '')}</p>
    `;
    const text = `Nuovo contatto dal sito\n\nNome: ${name}\nEmail: ${email}\nOggetto: ${subject}\n\nMessaggio:\n${message}\n`;

    const mcPayload = {
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: fromEmail, name: 'Prime Build Website' },
      reply_to: { email },
      subject: `${subjectPrefix}: ${subject}`.slice(0, 180),
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html }
      ],
      headers: {
        'X-Entity-Ref-ID': (globalThis.crypto?.randomUUID?.() || Date.now().toString())
      }
    };

    const sendRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mcPayload)
    });

    if (!sendRes.ok) {
      const errText = await sendRes.text().catch(() => '');
      return new Response(JSON.stringify({ success: false, message: 'Email send failed', details: errText.slice(0, 500) }), { status: 502, headers });
    }

    return new Response(JSON.stringify({ success: true, message: 'Message received successfully!' }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const onRequestOptions = async () => {
  return new Response('', {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://primebuild.website',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
