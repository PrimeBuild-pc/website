import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { Marked } from 'marked';
import { parseDocument } from 'htmlparser2';
import manifest from '../client/src/content/guides/manifest.json' with {type:'json'};
import { renderGuide, guideHref, figureSrc, readGuideSource } from './prepare-guides.mjs';

// Compare the complete ordered HTML tree, ignoring only presentation wrappers/attributes.
function canonical(nodes, original=false, pre=false) {
  return nodes.flatMap(node => {
    if(node.type==='text') return pre || node.data.trim() ? [['text',node.data]] : [];
    if(node.type!=='tag') return [];
    if(node.name==='figure' && node.attribs['data-guide-figure']) return [];
    if(node.name==='summary') return [];
    const children=canonical(node.children,original,pre||node.name==='pre');
    if(node.name==='div' && node.attribs.class==='guide-table' || node.name==='details') return children;
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
  const source=await readGuideSource(guide);
  assert.ok(!source.includes('../discord-revisione-v5/pdf/'),`${guide.file}: historical PDF reference`);
  for(const obsolete of ['https://github.com/TestMem5/.github/releases','https://github.com/TestMem5-Config','https://www.usb.org/document-library/hid-1-11','https://www.vesa.org/vesa-certified-products/']) assert.ok(!source.includes(obsolete),`${guide.file}: obsolete reference ${obsolete}`);
  assert.ok(!/non incorpora (?:nuove immagini|la figura|nuove figure)|non sono state incorporate|né incorporate/i.test(source),`${guide.file}: obsolete image disclaimer`);
  if(guide.id===2) {
    assert.ok(!source.includes('interfaccia **v13**'),'OCCT screenshot version is obsolete');
    for(const topic of ['SSE, AVX, AVX2 e AVX-512','Core Cycling','Mirror Move','Check','Device selection']) assert.ok(source.includes(topic),`Missing OCCT explanation: ${topic}`);
    for(const asset of ['occt-cpu','occt-cpu-ram','occt-memory','occt-3d-adaptive','occt-vram']) assert.ok(guide.figures.some(f=>f.asset===asset),`Missing real screenshot: ${asset}`);
  }
  if(guide.id===6) {
    for(const topic of ['### HDMI e DisplayPort: che cosa cambia nel collegamento','### Tabella delle generazioni e della banda','### Risoluzione, Hz e colore','### Perché si consiglia spesso DP sul PC e HDMI sulla console','### GPU NVIDIA e AMD','### Uscita GPU, cavo e ingresso monitor','al video DisplayPort']) assert.ok(source.includes(topic),`Missing display explanation: ${topic}`);
    assert.ok(!source.includes('**due o quattro corsie** ai dati USB'),'USB-C lane allocation is obsolete');
  }
  const actual=renderGuide(source,guide.figures);
  assert.deepEqual(canonical(parseDocument(actual.html).children),canonical(parseDocument(new Marked({gfm:true}).parse(source)).children,true),`${guide.file}: editorial content mismatch`);
  assert.ok(guide.figures.length>=5);
  assert.equal(new Set(guide.figures.map(f=>f.asset)).size,guide.figures.length);
  assert.equal((actual.html.match(/data-guide-figure=/g)||[]).length,guide.figures.length);
  assert.match(guide.image, /^\/images\/guides\/covers\/[a-z0-9-]+\.svg$/);
  await readFile(`client/public${guide.image}`);
  for(const figure of guide.figures) {
    const src=figureSrc(figure);
    const bytes=await readFile(`client/public${src}`);
    assert.ok(figure.alt.trim());
    assert.ok(figure.width>0 && figure.height>0);
    if(src.endsWith('.svg')) assert.ok(!/<script|<foreignObject|\son\w+=|(?:href|src)=["']https?:/i.test(bytes.toString('utf8')),figure.asset);
    else assert.ok(figure.credit && figure.source && figure.caption,`${figure.asset}: missing provenance`);
  }
  for(const item of actual.toc) assert.ok(actual.html.includes(`id="${item.id}"`));
  imageCount+=guide.figures.length;
  console.log(`${String(guide.id).padStart(2,'0')} ${guide.slug}: preserved original + authorized edits, faithful HTML, ${guide.figures.length} figures, ${actual.toc.length} sections`);
}
assert.ok(imageCount>=65);
assert.ok(!renderGuide('<script>alert(1)</script><a href="javascript:alert(1)">x</a>').html.includes('javascript:'));
assert.equal(guideHref(manifest[0].file+'#test'),`/guides/${manifest[0].slug}/#test`);
// Figures belonging to a subsection must precede the following sibling, not the next chapter.
const sample={asset:'example',src:'/images/guides/screenshots/example.png',heading:'Settings',alt:'Settings',width:10,height:10};
const section=renderGuide('## Chapter\n### Settings\nOptions\n### Results\nOutput\n## Next',[sample]).html;
assert.ok(section.indexOf('Options')<section.indexOf('<figure'));
assert.ok(section.indexOf('<figure')<section.indexOf('<h3 id="results"'));
assert.throws(()=>figureSrc({...sample,src:'/images/guides/../../secret.png'}));
assert.throws(()=>renderGuide('### Settings',[{...sample,source:'javascript:alert(1)'}]));
console.log(`All 13 guides passed; ${imageCount} figures and 13 covers.`);
