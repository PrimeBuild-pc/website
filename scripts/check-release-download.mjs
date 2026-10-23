import assert from 'node:assert/strict';
import { onRequestGet } from '../functions/github-release-download.js';

const env = { GITHUB_TOKEN: 'test-only-token' };
const request = new Request('https://primebuild.website/github-release-download?owner=PrimeBuild-pc&repo=Test');
const repoUrl = 'https://api.github.com/repos/PrimeBuild-pc/Test';
const asset = { id: 1, name: 'setup.exe', url: repoUrl + '/releases/assets/1', browser_download_url: 'https://github.com/PrimeBuild-pc/Test/releases/download/v1/setup.exe' };
let isPrivate = false;
let redirect = 'https://release-assets.githubusercontent.com/test';
let calls = [];
globalThis.fetch = async (url, options) => {
  calls.push(String(url));
  assert.equal(options.headers.Authorization, new URL(url).hostname === 'api.github.com' ? 'Bearer test-only-token' : undefined);
  if (url === repoUrl) return Response.json({ private: isPrivate });
  if (url === repoUrl + '/releases') return Response.json([{ draft: false, tag_name: 'v1', assets: [asset] }]);
  if (url === asset.url) return new Response(null, {status:302,headers:{Location:redirect}});
  if (url === redirect) return new Response('x', {status:206});
  throw new Error('Unexpected fetch');
};
assert.equal((await onRequestGet({request,env})).status,200);
isPrivate = true; calls = [];
assert.equal((await onRequestGet({request,env})).status,404);
assert.deepEqual(calls,[repoUrl]);
isPrivate = false;
const originalError = console.error;
try {
  console.error = () => {};
  for (redirect of ['http://release-assets.githubusercontent.com/test','https://attacker.githubusercontent.com/test','https://evil.example/test','https://api.github.com:444/test','https://user@api.github.com/test']) {
    calls = [];
    assert.equal((await onRequestGet({request,env})).status,500);
    assert.ok(!calls.includes(redirect));
  }
} finally { console.error = originalError; }
calls = [];
assert.equal((await onRequestGet({request:new Request('https://primebuild.website/github-release-download?owner=..&repo=Test'),env})).status,400);
assert.equal(calls.length,0);
console.log('Release resolver: public download, private denial, token confinement and redirect boundaries passed.');
