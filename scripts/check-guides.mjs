import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { Marked } from 'marked';
import { parseDocument } from 'htmlparser2';
import manifest from '../client/src/content/guides/manifest.json' with {type:'json'};
import { renderGuide, guideHref } from './prepare-guides.mjs';

// Compare the complete ordered HTML tree, ignoring only presentation wrappers/attributes.
function canonical(nodes, original=false, pre=false) {
  return nodes.flatMap(node => {
    if(node.type==='text') return pre || node.data.trim() ? [['text',node.data]] : [];
    if(node.type!=='tag') return [];
    if(node.name==='figure' && node.attribs['data-guide-figure']) return [];
    const children=canonical(node.children,original,pre||node.name==='pre');
    if(node.name==='div' && node.attribs.class==='guide-table') return children;
    const attributes={};
    for(const key of ['href','title','src','alt','start','align']) if(node.attribs[key]!==undefined) attributes[key]=key==='href'&&original?guideHref(node.attribs[key]):node.attribs[key];
    return [[node.name,attributes,children]];
  });
}
assert.equal(manifest.length,13);
assert.equal(new Set(manifest.map(g=>g.slug)).size,13);
let imageCount=0;
for(const guide of manifest) {
  const bytes=await readFile(`client/src/content/guides/${guide.file}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),guide.sha256);
  if(process.argv[2]) assert.deepEqual(bytes,await readFile(resolve(process.argv[2],guide.file)),`${guide.file}: original mismatch`);
  const source=bytes.toString('utf8');
  const actual=renderGuide(source,guide.figures);
  assert.deepEqual(canonical(parseDocument(actual.html).children),canonical(parseDocument(new Marked({gfm:true}).parse(source)).children,true),`${guide.file}: editorial content mismatch`);
  assert.ok(guide.figures.length>=5);
  assert.equal(new Set(guide.figures.map(f=>f.asset)).size,guide.figures.length);
  assert.equal((actual.html.match(/data-guide-figure=/g)||[]).length,guide.figures.length);
  for(const figure of guide.figures) {
    const svg=await readFile(`client/public/images/guides/diagrams/${figure.asset}.svg`,'utf8');
    assert.ok(figure.alt.trim());
    assert.ok(!/<script|<foreignObject|\son\w+=|(?:href|src)=["']https?:/i.test(svg),figure.asset);
  }
  for(const item of actual.toc) assert.ok(actual.html.includes(`id="${item.id}"`));
  imageCount+=guide.figures.length;
  console.log(`${String(guide.id).padStart(2,'0')} ${guide.slug}: exact source, faithful HTML, ${guide.figures.length} figures, ${actual.toc.length} sections`);
}
assert.equal(imageCount,69);
assert.ok(!renderGuide('<script>alert(1)</script><a href="javascript:alert(1)">x</a>').html.includes('javascript:'));
assert.equal(guideHref(manifest[0].file+'#test'),`/guides/${manifest[0].slug}/#test`);
console.log('All 13 guides passed; 69 figures.');
