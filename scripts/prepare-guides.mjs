import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import manifest from '../client/src/content/guides/manifest.json' with {type:'json'};

export const escapeHtml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function guideHref(href) {
  const [path, fragment] = href.split('#');
  const guide = manifest.find(g=>g.file===path);
  if (guide) return `/guides/${guide.slug}/${fragment ? '#'+fragment : ''}`;
  if (path.startsWith('../')) return `/guide-materials/${path.slice(3)}${fragment ? '#'+fragment : ''}`;
  return href;
}

export function renderGuide(source, figures=[]) {
  const headings=[]; const ids=new Map(); let pending='';
  const parser=new Marked({gfm:true,breaks:false});
  parser.use({renderer:{
    heading({tokens,depth}) {
      const content=this.parser.parseInline(tokens);
      const plain=sanitizeHtml(content,{allowedTags:[],allowedAttributes:{}});
      const base=plain.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'');
      const count=ids.get(base)||0;ids.set(base,count+1);
      const id=`${base}${count?'-'+count:''}`;
      let before='';
      if(depth===2){
        before=pending;pending='';
        headings.push({id,text:plain});
        for(const figure of figures.filter(f=>f.heading===plain)) pending+=`<figure data-guide-figure="${escapeHtml(figure.asset)}"><a href="/images/guides/diagrams/${escapeHtml(figure.asset)}.svg" target="_blank" rel="noopener noreferrer" aria-label="Ingrandisci: ${escapeHtml(figure.alt)}"><img src="/images/guides/diagrams/${escapeHtml(figure.asset)}.svg" alt="${escapeHtml(figure.alt)}" width="${figure.width}" height="${figure.height}" loading="lazy" decoding="async"></a><figcaption>${escapeHtml(figure.alt)} · Schema illustrativo Prime Build</figcaption></figure>`;
      }
      return `${before}<h${depth} id="${id}">${content}</h${depth}>\n`;
    },
    link({href,title,tokens}) {return `<a href="${escapeHtml(guideHref(href))}"${title?` title="${escapeHtml(title)}"`:''}>${this.parser.parseInline(tokens)}</a>`;},
    table(token) {return `<div class="guide-table" tabindex="0" role="region" aria-label="Tabella scorrevole">${this.constructor.prototype.table.call(this,token)}</div>`;},
    code(token) {return this.constructor.prototype.code.call(this,token).replace('<pre>','<pre tabindex="0" aria-label="Blocco di codice scorrevole">');},
  }});
  const rendered=parser.parse(source);const body=rendered+pending;
  for(const figure of figures) assert.ok(headings.some(h=>h.text===figure.heading),`Missing figure section: ${figure.heading}`);
  const clean=sanitizeHtml(body,{
    allowedTags:[...sanitizeHtml.defaults.allowedTags,'img','figure','figcaption'],
    allowedAttributes:{'*':['id','class'],a:['href','title','target','rel','aria-label'],img:['src','alt','width','height','loading','decoding'],div:['class','tabindex','role','aria-label'],pre:['tabindex','aria-label'],figure:['data-guide-figure'],ol:['start'],th:['align'],td:['align'],code:['class']},
    allowedSchemes:['https','http','mailto'],allowProtocolRelative:false,
  });
  return {html:clean,toc:headings};
}

export async function prepareGuides(){
  assert.equal(manifest.length,13);
  await mkdir('client/public/guide-content',{recursive:true});
  for(const guide of manifest){
    const buffer=await readFile(`client/src/content/guides/${guide.file}`);
    assert.equal(createHash('sha256').update(buffer).digest('hex'),guide.sha256,`${guide.file}: source changed`);
    const result=renderGuide(buffer.toString('utf8'),guide.figures);
    await writeFile(`client/public/guide-content/${guide.slug}.json`,JSON.stringify(result));
  }
  console.log('Prepared 13 guides from unchanged Markdown sources.');
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/prepare-guides.mjs')) await prepareGuides();
