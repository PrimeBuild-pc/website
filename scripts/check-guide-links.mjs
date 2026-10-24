import assert from 'node:assert/strict';
import { readFile, access, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseDocument } from 'htmlparser2';
import guides from '../client/src/content/guides/manifest.json' with {type:'json'};
import materials from '../client/src/content/guides/materials.json' with {type:'json'};
import { renderGuide, readGuideSource } from './prepare-guides.mjs';

const documents=new Map(); const external=new Set(); const blocked=new Set();
const elements=nodes=>nodes.flatMap(node=>node.type==='tag'?[node,...elements(node.children)]:[]);
for(const guide of guides) documents.set(guide.slug,elements(parseDocument(renderGuide(await readGuideSource(guide),guide.figures).html).children));
for(const material of materials.filter(m=>m.status==='included')) {
  const bytes=await readFile(`client/public/guide-materials/${material.path}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),material.sha256,material.path);
}
for(const [slug,nodes] of documents) for(const node of nodes.filter(n=>n.name==='a'&&n.attribs.href)) {
  const url=new URL(node.attribs.href,`https://primebuild.website/guides/${slug}/`);
  assert.ok(!url.pathname.includes('/discord-revisione-v5/pdf/'),`Historical PDF still linked: ${url}`);
  if(url.origin!=='https://primebuild.website') {if(/^https?:/.test(url.protocol))external.add(url.href);continue;}
  if(url.pathname.startsWith('/guides/')) {
    const target=documents.get(url.pathname.split('/')[2]);
    assert.ok(target,`Unknown guide link ${url}`);
    if(url.hash) assert.ok(target.some(n=>n.attribs.id===decodeURIComponent(url.hash.slice(1))),`Missing anchor ${url}`);
  } else {
    const path=decodeURIComponent(url.pathname);
    const material=materials.find(m=>'/guide-materials/'+m.path===path);
    if(material?.status==='blocked-rights') blocked.add(path);
    else await access('client/public'+path);
  }
}
console.log(`All guide routes/anchors, figures and ${materials.filter(m=>m.status==='included').length} included attachment hashes passed.`);
if(process.argv.includes('--external')) {
  const results=[]; const urls=[...external]; let index=0;
  await Promise.all(Array.from({length:6},async()=>{
    while(index<urls.length) {
      const url=urls[index++];
      try {
        let response=await fetch(url,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(12000)});
        if(response.status===405) {response=await fetch(url,{headers:{Range:'bytes=0-0'},signal:AbortSignal.timeout(12000)});await response.body?.cancel();}
        results.push({url,status:response.status,finalUrl:response.url});
      } catch(error) {results.push({url,error:error.name});}
    }
  }));
  await mkdir('tmp/browser-qa',{recursive:true});
  await writeFile('tmp/browser-qa/external-links.json',JSON.stringify(results,null,2));
  console.log(`External links: ${results.length} checked, ${results.filter(r=>r.status>=200&&r.status<400).length} reachable; ${results.filter(r=>!r.status||r.status>=400).length} require review (see tmp/browser-qa/external-links.json).`);
}
if(blocked.size) {
  console.error(`BLOCKED: ${blocked.size} linked historical PDFs omitted pending image redistribution rights:\n${[...blocked].join('\n')}`);
  process.exitCode=1;
}
