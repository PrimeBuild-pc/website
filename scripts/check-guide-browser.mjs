import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import guides from '../client/src/content/guides/manifest.json' with {type:'json'};
import { renderGuide } from './prepare-guides.mjs';

const base=process.argv[2] || 'http://127.0.0.1:5173';
const output=process.env.QA_OUTPUT || 'tmp/browser-qa';
await mkdir(output,{recursive:true});
const browser=await chromium.launch();
const results=[];
try {
  for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const guide of guides) {
      await page.goto(`${base}/guides/${guide.slug}/`);
      await page.locator('article.guide-prose h1').waitFor();
      assert.equal(await page.locator('h1').count(),1,guide.slug);
      assert.equal(await page.locator('article h1').innerText(),guide.title);
      const original=renderGuide(await readFile(`client/src/content/guides/${guide.file}`,'utf8')).html;
      const fidelity=await page.locator('article.guide-prose').evaluate((article,html)=>{
        const expected=document.createElement('div'); expected.innerHTML=html;
        const actual=article.cloneNode(true); actual.querySelectorAll('figure[data-guide-figure]').forEach(el=>el.remove());
        return actual.textContent===expected.textContent;
      },original);
      assert.ok(fidelity,`${guide.slug}: browser content differs`);
      const reject=page.getByRole('button',{name:'Rifiuta',exact:true});
      if(await reject.isVisible()) await reject.click();
      const figures=page.locator('article figure img');
      assert.equal(await figures.count(),guide.figures.length);
      for(const img of await figures.all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el=>el.decode());
        assert.ok(await img.evaluate(el=>el.complete && el.naturalWidth>0));
      }
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      assert.equal(overflow,false,`${guide.slug}: horizontal overflow at ${width}`);
      const anchors=await page.locator('article h2[id]').evaluateAll(els=>els.map(el=>el.id));
      const toc=await page.locator('.guide-index a').evaluateAll(els=>els.map(el=>el.getAttribute('href').slice(1)));
      assert.deepEqual(toc,anchors);
      const axe=await new AxeBuilder({page}).include('.guide-page').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      results.push({slug:guide.slug,width,images:guide.figures.length,overflow,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});
      await page.evaluate(()=>scrollTo(0,0));
      if(guide.id===1 || guide.id===10) await page.screenshot({path:`${output}/guide-${guide.id}-${width}.png`});
      console.log(`${width}px ${guide.slug}: ${guide.figures.length} images loaded, ${axe.violations.length} accessibility findings`);
    }
    await page.goto(`${base}/guides/`);
    await page.locator('a[href*="stabilita-occt"]').first().waitFor();
    await page.screenshot({path:`${output}/index-${width}.png`});
    await page.goto(`${base}/guides/${guides[0].slug}/`);
    await page.locator('article.guide-prose h1').waitFor();
    await page.locator('nav[aria-label="Altre guide"] a').last().click();
    await page.getByRole('heading',{level:1,name:guides[1].title,exact:true}).waitFor();
    assert.equal(await page.evaluate(()=>scrollY),0,'Next guide must open at the beginning');
    assert.deepEqual(errors,[],'Browser JS errors');
    await context.close();
  }
} finally {
  await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));
  await browser.close();
}
assert.equal(results.flatMap(r=>r.violations).length,0,'Accessibility findings require review');
