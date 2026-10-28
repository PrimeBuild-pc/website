// Renders the 1200x630 social cards: client/public/og-image.png (default) and client/public/og/<slug>.png (one per guide).
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import manifest from '../client/src/content/guides/manifest.json' with {type:'json'};
import { escapeHtml } from './prepare-guides.mjs';

const logo = `data:image/png;base64,${(await readFile('client/public/logo.png')).toString('base64')}`;
const card = ({eyebrow, title, size, foot}) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;position:relative;font-family:"Segoe UI",Arial,sans-serif;color:#fff;
background:radial-gradient(900px 500px at 100% 0,#ff660033,transparent 60%),radial-gradient(700px 400px at 0 100%,#ff660018,transparent 60%),#0a0a0b}
body::before{content:"";position:absolute;inset:0;background:linear-gradient(#ffffff08 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,#ffffff08 1px,transparent 1px) 0 0/48px 48px;mask-image:linear-gradient(135deg,#000,transparent 70%)}
.bar{position:absolute;left:0;right:0;bottom:0;height:12px;background:linear-gradient(90deg,#ff6600,#ff9d5b)}
main{position:absolute;inset:0;padding:56px 72px 52px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:18px;font-weight:700;font-size:30px;letter-spacing:.06em}
.brand img{width:56px;height:56px;border-radius:14px}.brand b{color:#ff6600}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.eyebrow{color:#ff6600;font-weight:700;font-size:26px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:22px}
h1{font-weight:700;font-size:${size}px;line-height:1.08;letter-spacing:-.025em;max-width:1000px;text-wrap:balance}
.foot{display:flex;justify-content:space-between;font-size:24px;color:#a1a1aa}.foot b{color:#e4e4e7;font-weight:600}
</style><main><div class="brand"><img src="${logo}" alt=""><span>PRIME <b>BUILD</b></span></div>
<div class="mid"><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1>${escapeHtml(title)}</h1></div>
<div class="foot"><span>${foot}</span><b>primebuild.website</b></div></main><div class="bar"></div>`;

const cards = [
  {file:'client/public/og-image.png', eyebrow:'PC gaming custom', title:'PC gaming progettati intorno a te', size:84, foot:'Montegrotto Terme (PD) · in tutta Italia'},
  ...manifest.map(g => ({file:`client/public/og/${g.slug}.png`, eyebrow:`Guida ${String(g.id).padStart(2,'0')} / ${manifest.length}`, title:g.title, size:g.title.length > 55 ? 54 : 62, foot:'Guide tecniche · PC gaming e ottimizzazione'})),
];
await mkdir('client/public/og', {recursive:true});
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:1200, height:630}});
for (const c of cards) { await page.setContent(card(c)); await page.screenshot({path:c.file}); }
await browser.close();
console.log(`Rendered ${cards.length} social cards.`);
