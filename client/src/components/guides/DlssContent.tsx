import { useMemo } from "react";
import DOMPurify from "dompurify";
import { normalizeHeadingElements } from "@/lib/guideHeadingCase";
import dlssArticleHtml from "@/content/dlss-article.html?raw";

type ContentBlock = {
  key: string;
  type: "html" | "pdf";
  html?: string;
  pdfSrc?: string;
};

const DLSS_PDF_SRC = "/images/guides/dlss_programming_guide_release.pdf";

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, ADD_ATTR: ["class"] });

const stripGuideEmojis = (doc: Document) => {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  let currentNode: Node | null = walker.nextNode();

  while (currentNode) {
    currentNode.textContent = (currentNode.textContent ?? "")
      .replace(/(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|\uFE0F)/g, "")
      .replace(/\s{2,}/g, " ");
    currentNode = walker.nextNode();
  }
};

const mapImageSrc = (src: string): string => {
  if (!src.startsWith("images/")) return src;
  const fileName = src.split("/").pop();
  return fileName ? `/images/guides/${fileName}` : src;
};

const pushNodeAsBlock = (node: Element, key: string, blocks: ContentBlock[]) => {
  const clonedNode = node.cloneNode(true) as Element;
  const iframe = clonedNode.querySelector("iframe");

  if (iframe) {
    iframe.remove();
    if ((clonedNode.textContent ?? "").trim()) {
      blocks.push({ key: `${key}-html`, type: "html", html: sanitizeHtml(clonedNode.outerHTML) });
    }
    blocks.push({ key: `${key}-pdf`, type: "pdf", pdfSrc: DLSS_PDF_SRC });
    return;
  }

  blocks.push({ key, type: "html", html: sanitizeHtml(clonedNode.outerHTML) });
};

const extractDlssBlocks = (): ContentBlock[] => {
  if (typeof window === "undefined") {
    return [{ key: "fallback", type: "html", html: sanitizeHtml(dlssArticleHtml) }];
  }

  const doc = new DOMParser().parseFromString(dlssArticleHtml, "text/html");
  stripGuideEmojis(doc);
  normalizeHeadingElements(doc.body);
  doc.querySelectorAll("[style]").forEach((element) => element.removeAttribute("style"));
  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("src", mapImageSrc(img.getAttribute("src") ?? ""));
    img.setAttribute("class", "w-full rounded-lg mb-6 border border-zinc-800");
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "1280");
    img.setAttribute("height", "720");
  });
  doc.querySelectorAll("a").forEach((anchor) => {
    if ((anchor.getAttribute("href") ?? "").startsWith("http")) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  });

  const blocks: ContentBlock[] = [];
  Array.from(doc.body.children).forEach((node, index) => {
    if (node.tagName.toLowerCase() === "section") {
      Array.from(node.children).forEach((child, childIndex) =>
        pushNodeAsBlock(child, `section-${index}-${childIndex}`, blocks)
      );
    } else {
      pushNodeAsBlock(node, `block-${index}`, blocks);
    }
  });
  return blocks;
};

const PdfResource = ({ src }: { src: string }) => (
  <div className="my-6 rounded-xl border border-primary/30 bg-primary/10 p-5">
    <p className="font-semibold text-white">DLSS Programming Guide ufficiale (PDF, 6 MB)</p>
    <p className="mt-2 text-sm text-zinc-300">Il documento viene caricato solo quando scegli di aprirlo.</p>
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black"
    >
      Apri il PDF in una nuova scheda
    </a>
  </div>
);

const DlssContent = () => {
  const blocks = useMemo(() => extractDlssBlocks(), []);

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div
          key={block.key}
          className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_.card]:rounded-xl [&_.card]:border [&_.card]:border-white/10 [&_.card]:bg-zinc-900/60 [&_.card]:p-5 [&_.card]:mb-4 [&_.card-note]:border-primary/40 [&_.table-container]:overflow-x-auto [&_.table-container]:rounded-lg [&_.table-container]:border [&_.table-container]:border-white/10 [&_.table-container]:bg-zinc-900/60 [&_table]:w-full [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-primary [&_th]:font-semibold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-primary/30 [&_td]:px-4 [&_td]:py-3 [&_td]:text-zinc-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-zinc-800/30 [&_.benchmark-data]:rounded-lg [&_.benchmark-data]:border [&_.benchmark-data]:border-primary/30 [&_.benchmark-data]:bg-black [&_.benchmark-data]:p-4 [&_.benchmark-data]:text-zinc-300 [&_.benchmark-data]:font-mono [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-white/20 [&_kbd]:bg-zinc-800 [&_kbd]:px-2 [&_kbd]:py-0.5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
        >
          {block.type === "pdf" ? (
            <PdfResource src={block.pdfSrc ?? DLSS_PDF_SRC} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: block.html ?? "" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DlssContent;
