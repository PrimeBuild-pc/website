import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import manifest from '../client/src/content/guides/manifest.json' with {type:'json'};
import updates from '../client/src/content/guides/editorial-updates.json' with {type:'json'};

// Original Markdown stays immutable; only the user's explicit editorial amendments apply.
export async function readGuideSource(guide) {
  const bytes=await readFile(`client/src/content/guides/${guide.file}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),guide.sha256,`${guide.file}: original source changed`);
  let source=bytes.toString('utf8').replaceAll('\r\n','\n');
  for(const edit of updates[guide.file] || []) {
    assert.ok(edit.before && source.split(edit.before).length===2,`${guide.file}: amendment target must occur exactly once`);
    if(edit.insertFile) assert.match(edit.insertFile,/^[a-z0-9-]+\.md$/);
    else assert.equal(typeof edit.after,'string');
    const after=edit.insertFile ? `${await readFile(new URL(`../client/src/content/guides/${edit.insertFile}`,import.meta.url),'utf8')}\n\n${edit.before}` : edit.after;
    source=source.replace(edit.before,()=>after);
  }
  return source;
}

export const escapeHtml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function figureSrc(figure) {
  const src = figure.src || `/images/guides/diagrams/${figure.asset}.svg`;
  assert.match(src, /^\/images\/guides\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:svg|webp|png|jpg)$/);
  return src;
}
function renderFigure(figure) {
  const src = figureSrc(figure);
  let credit = escapeHtml(figure.credit || 'Schema illustrativo Prime Build');
  if (figure.source) {
    assert.equal(new URL(figure.source).protocol, 'https:');
    credit = `<a href="${escapeHtml(figure.source)}" target="_blank" rel="noopener noreferrer">${credit}</a>`;
  }
  return `<figure data-guide-figure="${escapeHtml(figure.asset)}"><a href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Ingrandisci: ${escapeHtml(figure.alt)}"><img src="${src}" alt="${escapeHtml(figure.alt)}" width="${figure.width}" height="${figure.height}" loading="lazy" decoding="async"></a><figcaption>${escapeHtml(figure.caption || figure.alt)} · ${credit}</figcaption></figure>`;
}
export function guideHref(href) {
  const [path, fragment] = href.split('#');
  const guide = manifest.find(g=>g.file===path);
  if (guide) return `/guides/${guide.slug}/${fragment ? '#'+fragment : ''}`;
  if (path.startsWith('../')) return `/guide-materials/${path.slice(3)}${fragment ? '#'+fragment : ''}`;
  return href;
}

export function renderGuide(source, figures=[]) {
  const headings=[]; const allHeadings=[]; const ids=new Map(); let pending=[];
  const parser=new Marked({gfm:true,breaks:false});
  parser.use({renderer:{
    heading({tokens,depth}) {
      const content=this.parser.parseInline(tokens);
      const plain=sanitizeHtml(content,{allowedTags:[],allowedAttributes:{}});
      const base=plain.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'');
      const count=ids.get(base)||0;ids.set(base,count+1);
      const id=`${base}${count?'-'+count:''}`;
      const before=pending.filter(f=>f.depth>=depth).map(f=>f.html).join('');
      pending=pending.filter(f=>f.depth<depth);
      allHeadings.push(plain);
      if(depth===2){
        headings.push({id,text:plain});
      }
      for(const figure of figures.filter(f=>f.heading===plain)) pending.push({depth,html:renderFigure(figure)});
      return `${before}<h${depth} id="${id}">${content}</h${depth}>\n`;
    },
    link({href,title,tokens}) {return `<a href="${escapeHtml(guideHref(href))}"${title?` title="${escapeHtml(title)}"`:''}>${this.parser.parseInline(tokens)}</a>`;},
    table(token) {return `<div class="guide-table" tabindex="0" role="region" aria-label="Tabella scorrevole">${this.constructor.prototype.table.call(this,token)}</div>`;},
    code(token) {return this.constructor.prototype.code.call(this,token).replace('<pre>','<pre tabindex="0" aria-label="Blocco di codice scorrevole">');},
  }});
  const rendered=parser.parse(source);const body=rendered+pending.map(f=>f.html).join('');
  for(const figure of figures) assert.ok(allHeadings.includes(figure.heading),`Missing figure section: ${figure.heading}`);
  const clean=sanitizeHtml(body,{
    allowedTags:[...sanitizeHtml.defaults.allowedTags,'img','figure','figcaption','details','summary'],
    allowedAttributes:{'*':['id','class'],a:['href','title','target','rel','aria-label'],img:['src','alt','width','height','loading','decoding'],div:['class','tabindex','role','aria-label'],pre:['tabindex','aria-label'],figure:['data-guide-figure'],ol:['start'],th:['align'],td:['align'],code:['class']},
    allowedSchemes:['https','http','mailto'],allowProtocolRelative:false,
  });
  return {html:collapseSources(clean),toc:headings};
}

// The closing "Fonti" section keeps its heading and notes; only the link list folds into a closed <details>.
function collapseSources(html){
  const start=html.lastIndexOf('<h2');
  if(start<0||!/fonti/i.test(html.slice(start,html.indexOf('</h2>',start)))) return html;
  const tail=html.slice(start);
  assert.equal(tail.split('<ol>').length,2,'sources section must contain exactly one list');
  return html.slice(0,start)+tail.replace(/<ol>[\s\S]*?<\/ol>/,list=>`<details class="guide-sources"><summary>Elenco delle fonti (${list.split('<li>').length-1})</summary>${list}</details>`);
}

export async function prepareGuides(){
  assert.equal(manifest.length,13);
  await mkdir('client/public/guide-content',{recursive:true});
  for(const guide of manifest){
    const result=renderGuide(await readGuideSource(guide),guide.figures);
    await writeFile(`client/public/guide-content/${guide.slug}.json`,JSON.stringify(result));
  }
  console.log('Prepared 13 guides from preserved originals and explicit editorial amendments.');
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/prepare-guides.mjs')) await prepareGuides();
