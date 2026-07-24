import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sanitizeHtml from "sanitize-html";
import { guides } from "../client/src/data/guides";
import { services } from "../client/src/data/services";
import { buildSchema } from "../client/src/lib/schema";
import { assetUrl, pagePath, pageUrl } from "../client/src/lib/site";

const DIST = "client/dist";
const CONTENT = "client/src/content";
const template = await readFile(join(DIST, "index.html"), "utf8");

const pages = [
  {
    path: "/",
    title: "PC Gaming su Misura a Padova | Prime Build",
    description: "Assemblaggio PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia. Preventivi gratuiti e supporto diretto Prime Build.",
    image: "/og-image.png",
    type: "website",
  },
  ...services.map((service) => ({
    path: `/servizi/${service.slug}`,
    title: service.seoTitle,
    description: service.metaDescription,
    image: "/og-image.png",
    type: "website",
  })),
  {
    path: "/guides",
    title: "Guide PC Gaming e Ottimizzazione | Prime Build",
    description: "Guide tecniche Prime Build su PC gaming, latenza, DLSS, audio competitivo, rete e ottimizzazione Windows.",
    image: "/og-image.png",
    type: "website",
  },
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    title: `${guide.title} | Prime Build`,
    description: guide.description,
    image: guide.image,
    type: "article",
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
  })),
  {
    path: "/chi-siamo",
    title: "Chi siamo | Prime Build",
    description: "Metodo, servizi e contatti del team tecnico Prime Build: PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia.",
    image: "/og-image.png",
    type: "website",
  },
  {
    path: "/privacy",
    title: "Privacy e Cookie Policy | Prime Build",
    description: "Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Prime Build.",
    image: "/og-image.png",
    type: "website",
  },
];

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const cleanTrustedHtml = (source: string) => sanitizeHtml(source, {
  allowedTags: [
    "article", "section", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "strong", "em", "span", "a", "img", "table", "thead",
    "tbody", "tfoot", "tr", "th", "td", "colgroup", "col", "caption", "sup",
    "mark", "u", "kbd", "br", "hr", "blockquote", "code", "pre", "header", "footer", "iframe",
  ],
  allowedAttributes: {
    "*": ["class", "id"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "loading", "width", "height"],
    ol: ["type"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
  },
  transformTags: {
    iframe: () => ({
      tagName: "a",
      attribs: {
        href: "/images/guides/dlss_programming_guide_release.pdf",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      text: "Apri il DLSS Programming Guide (PDF, 6 MB)",
    }),
    img: (_tagName, attributes) => ({
      tagName: "img",
      attribs: {
        ...attributes,
        src: attributes.src?.startsWith("images/") ? `/images/guides/${attributes.src.slice(7)}` : attributes.src,
        loading: attributes.loading ?? "lazy",
      },
    }),
    a: (_tagName, attributes) => {
      const href = attributes.href?.startsWith("/guides") ? pagePath(attributes.href) : attributes.href;
      return {
        tagName: "a",
        attribs: {
          ...attributes,
          href,
          ...(attributes.target === "_blank" ? { rel: "noopener noreferrer" } : {}),
        },
      };
    },
  },
  exclusiveFilter: (frame) =>
    frame.tag === "header" ||
    frame.tag === "footer" ||
    (/^h[2-6]$/.test(frame.tag) && !frame.text.trim()),
}).trim();

const textToHtml = (source: string) => source
  .replace(/\r\n/g, "\n")
  .trim()
  .split(/\n{2,}/)
  .map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (block.startsWith("### ")) return `<h2>${escapeHtml(block.slice(4).trim())}</h2>`;
    if (lines.every((line) => /^\*\s+/.test(line))) return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^\*\s+/, ""))}</li>`).join("")}</ul>`;
    if (lines.every((line) => /^\d+\.\s+/.test(line))) return `<ol>${lines.map((line) => `<li>${escapeHtml(line.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
    if (/^-{3,}$/.test(block)) return "<hr>";
    return `<p>${escapeHtml(lines.join(" "))}</p>`;
  })
  .join("");

const guideBodies = new Map<string, string>([
  ["setup-audio", cleanTrustedHtml(await readFile(join(CONTENT, "setup-audio-sections.html"), "utf8"))],
  ["guida-dlss-frame-generation", cleanTrustedHtml(await readFile(join(CONTENT, "dlss-article.html"), "utf8"))],
  ["setup-rete-anti-bufferbloat", cleanTrustedHtml(await readFile(join(CONTENT, "bufferbloat-article.html"), "utf8"))],
  ["ottimizzazione-build-240hz", textToHtml(await readFile(join(CONTENT, "presentation-models-report.txt"), "utf8"))],
  ["low-latency-gaming-guide", cleanTrustedHtml(await readFile(join(CONTENT, "low-latency-guide-sections.html"), "utf8"))],
]);

const shellFor = (path: string) => {
  const normalizedPath = pagePath(path);
  const service = services.find((item) => normalizedPath === pagePath(`/servizi/${item.slug}`));
  if (service) return `<main style="max-width:72rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><article><header><p>${escapeHtml(service.eyebrow)}</p><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.description)}</p></header><section><h2>Un progetto prima di un prodotto</h2><p>${escapeHtml(service.intro)}</p></section><section><h2>Cosa include il servizio</h2>${service.benefits.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>Come lavoriamo</h2>${service.process.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>Cosa valutiamo</h2>${service.insights.map((item) => `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`).join("")}</section><section><h2>${escapeHtml(service.detailsTitle)}</h2>${service.details.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</section><section><h2>Domande comuni</h2>${service.questions.map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join("")}</section><p><a href="/#contact">Richiedi un preventivo gratuito</a></p></article></main>`;

  const guide = guides.find((item) => normalizedPath === pagePath(`/guides/${item.slug}`));
  if (guide) return `<main style="max-width:56rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><article><a href="/guides/">Tutte le guide tecniche</a><header><p>Report tecnico</p><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.description)}</p><p><a href="/chi-siamo/">A cura del team tecnico Prime Build</a> · <time datetime="${guide.datePublished}">Pubblicato il ${escapeHtml(guide.date)}</time></p></header><section>${guideBodies.get(guide.slug) ?? ""}</section></article></main>`;

  if (normalizedPath === "/") return `<main style="min-height:100vh;display:grid;place-content:center;text-align:center;padding:6rem 1.25rem;color:#fff;background:#050505"><p>Montegrotto Terme · 35036 (PD)</p><h1 style="font:700 clamp(4rem,15vw,12rem)/.8 Arial,sans-serif;margin:1rem 0">PRIME<br><span style="color:#ff6600">BUILD</span></h1><p>PC gaming progettati intorno a te. Consulenza reale, assemblaggio preciso e prestazioni ottimizzate senza sprechi.</p><nav><a href="/servizi/pc-gaming-su-misura/">PC gaming su misura</a> · <a href="/servizi/assistenza-riparazione-pc/">Assistenza PC</a> · <a href="/servizi/ottimizzazione-pc-gaming/">Ottimizzazione</a></nav></main>`;
  if (normalizedPath === "/guides/") return `<main style="max-width:72rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><h1>Guide PC gaming e ottimizzazione</h1><p>Approfondimenti su PC gaming, latenza, audio, rete e ottimizzazione.</p>${guides.map((item) => `<article><h2><a href="/guides/${item.slug}/">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.description)}</p></article>`).join("")}</main>`;
  if (normalizedPath === "/chi-siamo/") return `<main style="max-width:56rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><article><h1>PC gaming progettati intorno alle persone</h1><p>Prime Build progetta e assembla PC gaming su misura, offre assistenza tecnica e ottimizzazione da Montegrotto Terme, Padova, con servizi disponibili in tutta Italia.</p><h2>Il metodo Prime Build</h2><p>Budget e obiettivi guidano ogni proposta. Temperature, stabilità e prestazioni vengono misurate prima e dopo gli interventi. Componenti, modifiche e limiti vengono spiegati con chiarezza.</p><h2>Il team tecnico Prime Build</h2><p>Le guide e le configurazioni pubblicate sul sito sono curate dal team tecnico Prime Build e riportano date e fonti quando disponibili.</p><p>Contatto: <a href="mailto:primebuild.official@gmail.com">primebuild.official@gmail.com</a></p></article></main>`;
  if (normalizedPath === "/privacy/") return `<main style="max-width:56rem;margin:auto;padding:8rem 1.25rem;color:#fff;background:#050505"><h1>Privacy e Cookie Policy</h1><p>Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Prime Build.</p></main>`;
  return "";
};

for (const page of pages) {
  const path = pagePath(page.path);
  const url = pageUrl(path);
  const image = assetUrl(page.image);
  const schema = JSON.stringify(buildSchema(path)).replaceAll("<", "\\u003c");
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  html = html.replace(/(<link rel="alternate" hreflang="(?:it|x-default)" href=")[^"]*("\s*\/?>)/g, `$1${url}$2`);
  html = html.replace(/(<meta property="og:type" content=")[^"]*("\s*\/?>)/, `$1${page.type}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*("\s*\/?>)/, `$1${image}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(page.description)}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*("\s*\/?>)/, `$1${image}$2`);
  const articleMeta = page.type === "article"
    ? `<meta property="article:published_time" content="${page.datePublished}"><meta property="article:modified_time" content="${page.dateModified}">`
    : "";
  html = html.replace("</head>", `${articleMeta}<script id="primebuild-schema" type="application/ld+json">${schema}</script></head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${shellFor(path)}</div>`);

  const output = path === "/" ? join(DIST, "index.html") : join(DIST, path, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

const notFound = template
  .replace(/<title>.*?<\/title>/, "<title>Pagina non trovata | Prime Build</title>")
  .replace(/(<meta name="robots" content=")[^"]*("\s*\/?>)/, "$1noindex, follow$2");
await writeFile(join(DIST, "404.html"), notFound);

console.log(`Generated metadata and content shells for ${pages.length} routes.`);
