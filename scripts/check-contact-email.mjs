import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/contact.js';

const resendPayloads = [];
globalThis.fetch = async (url, options) => {
  if (String(url).includes('siteverify')) {
    return Response.json({ success: true });
  }

  if (url === 'https://api.resend.com/emails') {
    resendPayloads.push(JSON.parse(options.body));
    return Response.json({ id: `email-${resendPayloads.length}` });
  }

  throw new Error(`Unexpected request: ${url}`);
};

const env = {
  ALLOWED_ORIGINS: 'https://primebuild.website',
  TURNSTILE_SECRET_KEY: 'test-secret',
  RESEND_API_KEY: 're_test',
  QUALIFICATION_FORM_URL: 'https://docs.google.com/forms/d/e/test/viewform',
  MAIL_TO: 'internal@example.com',
  MAIL_FROM: 'preventivi@primebuild.website',
  MAIL_REPLY_TO: 'preventivi@primebuild.website',
  EMAIL_STRICT: '1',
};

const request = new Request('https://primebuild.website/contact', {
  method: 'POST',
  headers: {
    Origin: 'https://primebuild.website',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Lorenzo & Co',
    email: 'cliente@example.com',
    subject: 'Nuovo PC',
    message: 'Budget 1500 euro',
    turnstileToken: 'valid-token',
  }),
});

const response = await onRequestPost({ request, env });
const result = await response.json();
assert.equal(response.status, 200);
assert.equal(result.confirmationSent, true);
assert.equal(resendPayloads.length, 2);
assert.deepEqual(resendPayloads[0].to, ['internal@example.com']);
assert.equal(resendPayloads[0].reply_to, 'cliente@example.com');
assert.match(resendPayloads[0].subject, /^\[PRIMO CONTATTO\]/);
assert.deepEqual(resendPayloads[1].to, ['cliente@example.com']);
assert.equal(resendPayloads[1].reply_to, 'preventivi@primebuild.website');
assert.match(resendPayloads[1].html, /Ciao Lorenzo &amp; Co/);
assert.match(resendPayloads[1].html, /Completa il questionario/);
assert.match(resendPayloads[1].text, /PREVENTIVO COMPLETO — €25/);
assert.match(resendPayloads[1].text, /https:\/\/docs\.google\.com\/forms/);

console.log('Contact email flow check passed.');
