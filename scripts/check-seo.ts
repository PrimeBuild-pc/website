import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { guides } from "../client/src/data/guides";
import { services } from "../client/src/data/services";
import { pagePath, pageUrl } from "../client/src/lib/site";

const DIST = "client/dist";
const paths = [
  "/",
  ...services.map((service) => `/servizi/${service.slug}/`),
  "/guides/",
  ...guides.map((guide) => `/guides/${guide.slug}/`),
  "/chi-siamo/",
  "/privacy/",
];

assert.equal(pagePath("/guides"), "/guides/");
assert.equal(pagePath("/guides/?preview=1"), "/guides/");
assert.equal(pagePath("/"), "/");

const sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls, paths.map(pageUrl), "Sitemap URLs must match the canonical route list");

for (const path of paths) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, path, "index.html");
  const html = await readFile(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, pageUrl(path), `${path} canonical must be its final 200 URL`);
  const schemaText = html.match(/<script id="primebuild-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(schemaText, `${path} must expose raw JSON-LD`);
  const schema = JSON.parse(schemaText);

  if (path.startsWith("/guides/") && path !== "/guides/") {
    const words = html
      .match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/)?.[1]
      ?.replace(/<[^>]+>/g, " ")
      .match(/\S+/g)?.length ?? 0;
    assert.ok(words > 1000, `${path} raw article is too thin (${words} words)`);
    assert.ok(schema["@graph"].some((item: { "@type": string }) => item["@type"] === "Article"), `${path} must expose Article schema`);
    assert.doesNotMatch(html, /<iframe\b/i, `${path} must not auto-load embedded documents`);
  }
}

const assets = await readdir(join(DIST, "assets"));
assert.ok(!assets.some((file) => /pdf\.worker|pdfjs/i.test(file)), "The initial build must not ship pdf.js");
console.log(`SEO checks passed for ${paths.length} routes.`);
