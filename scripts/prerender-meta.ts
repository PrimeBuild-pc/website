import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { guides } from "../client/src/data/guides";
import { services } from "../client/src/data/services";

const SITE = "https://primebuild.website";
const DIST = "client/dist";
const template = await readFile(join(DIST, "index.html"), "utf8");

const pages = [
  {
    path: "/",
    title: "PC Gaming su Misura a Padova | Prime Build",
    description: "Assemblaggio PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia. Preventivi gratuiti e supporto diretto Prime Build.",
    image: "/og-image.png",
  },
  ...services.map((service) => ({
    path: `/servizi/${service.slug}`,
    title: service.seoTitle,
    description: service.metaDescription,
    image: "/og-image.png",
  })),
  {
    path: "/guides",
    title: "Guide PC Gaming e Ottimizzazione | Prime Build",
    description: "Guide tecniche Prime Build su PC gaming, latenza, DLSS, audio competitivo, rete e ottimizzazione Windows.",
    image: "/og-image.png",
  },
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    title: `${guide.title} | Prime Build`,
    description: guide.description,
    image: guide.image,
  })),
  {
    path: "/privacy",
    title: "Privacy e Cookie Policy | Prime Build",
    description: "Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Prime Build.",
    image: "/og-image.png",
  },
];

const escapeHtml = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const shellFor = (path: string) => {
  const service = services.find((item) => path === `/servizi/${item.slug}`);
  if (service) return `<main style="max-width:72rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><article><header><p>${escapeHtml(service.eyebrow)}</p><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.description)}</p></header><section><h2>Un progetto prima di un prodotto</h2><p>${escapeHtml(service.intro)}</p></section><section><h2>Cosa include il servizio</h2>${service.benefits.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>Come lavoriamo</h2>${service.process.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>Cosa valutiamo</h2>${service.insights.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>${escapeHtml(service.detailsTitle)}</h2>${service.details.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</section><section><h2>Domande comuni</h2>${service.questions.map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("")}</section><p><a href="/#contact">Richiedi un preventivo gratuito</a></p></article></main>`;

  const guide = guides.find((item) => path === `/guides/${item.slug}`);
  if (guide) return `<main style="max-width:56rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><article><p>Guida tecnica Prime Build</p><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><p><a href="/guides">Tutte le guide tecniche</a></p></article></main>`;

  if (path === "/") return `<main style="min-height:100vh;display:grid;place-content:center;text-align:center;padding:6rem 1.25rem;color:#fff;background:#050505"><p>Montegrotto Terme · 35036 (PD)</p><h1 style="font:700 clamp(4rem,15vw,12rem)/.8 Arial,sans-serif;margin:1rem 0">PRIME<br><span style="color:#ff6600">BUILD</span></h1><p>PC gaming progettati intorno a te. Consulenza reale, assemblaggio preciso e prestazioni ottimizzate senza sprechi.</p><nav><a href="/servizi/pc-gaming-su-misura">PC gaming su misura</a> · <a href="/servizi/assistenza-riparazione-pc">Assistenza PC</a> · <a href="/servizi/ottimizzazione-pc-gaming">Ottimizzazione</a></nav></main>`;
  if (path === "/guides") return `<main style="max-width:72rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><h1>Guide tecniche Prime Build</h1><p>Approfondimenti su PC gaming, latenza, audio, rete e ottimizzazione.</p>${guides.map((item) => `<article><h2><a href="/guides/${item.slug}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.description)}</p></article>`).join("")}</main>`;
  if (path === "/privacy") return `<main style="max-width:56rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><h1>Privacy e Cookie Policy</h1><p>Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Prime Build.</p></main>`;
  return "";
};

for (const page of pages) {
  const url = new URL(page.path, SITE).toString();
  const image = new URL(page.image, SITE).toString();
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*("\s*\/?>)/, `$1${image}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*("\s*\/?>)/, `$1${image}$2`);
  html = html.replace('<div id="root"></div>', `<div id="root">${shellFor(page.path)}</div>`);

  const output = page.path === "/" ? join(DIST, "index.html") : join(DIST, page.path, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

const notFound = template
  .replace(/<title>.*?<\/title>/, "<title>Pagina non trovata | Prime Build</title>")
  .replace(/(<meta name="robots" content=")[^"]*("\s*\/?>)/, "$1noindex, follow$2");
await writeFile(join(DIST, "404.html"), notFound);

console.log(`Generated metadata shells for ${pages.length} routes.`);
