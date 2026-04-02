import { useMemo } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { normalizeHeadingElements } from "@/lib/guideHeadingCase";
import bufferbloatArticleHtml from "@/content/bufferbloat-article.html?raw";

type ContentBlock = {
  key: string;
  html: string;
};

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

const mapImageSrc = (src: string): string => {
  if (!src) {
    return src;
  }

  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  const fileName = src.split("/").pop();
  if (!fileName) {
    return src;
  }

  const safeFileName = fileName.toLowerCase().replace(/\s+/g, "-");
  return `/images/guides/${safeFileName}`;
};

const normalizeDisplayText = (value: string): string =>
  value
    .replace(/\[\^\d+\]/g, "")
    .replace(/\^\d+/g, "")
    .replace(/\[(\d+)\]/g, "")
    .replace(/\{\.mark\}/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s*&gt;\s*/g, " ")
    .replace(/\s*>\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractBufferbloatBlocks = (): ContentBlock[] => {
  if (typeof window === "undefined") {
    return [{ key: "fallback", html: sanitizeHtml(bufferbloatArticleHtml) }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(bufferbloatArticleHtml, "text/html");
  normalizeHeadingElements(doc.body);

  doc.querySelectorAll(".hero-section").forEach((section) => section.remove());

  doc.querySelectorAll("footer, .footer").forEach((footer) => footer.remove());
  doc.querySelectorAll("sup").forEach((sup) => sup.remove());

  doc.querySelectorAll("p").forEach((paragraph) => {
    const text = (paragraph.textContent ?? "").trim();

    if (/\$\$\s*=\s*P_\{90\}\(\)\s*-\s*P_\{05\}\(\)\s*\$\$/i.test(text)) {
      paragraph.textContent = "Percentile = P90 - P05";
      return;
    }

    if (
      /^\d{1,2}\s+gennaio(?:\s+\d{4})?$/i.test(text) &&
      !paragraph.closest(".hero-section")
    ) {
      paragraph.remove();
      return;
    }
  });

  const textWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let currentNode = textWalker.nextNode();
  while (currentNode) {
    textNodes.push(currentNode as Text);
    currentNode = textWalker.nextNode();
  }

  textNodes.forEach((node) => {
    if (node.parentElement?.closest("script, style")) {
      return;
    }

    const cleaned = normalizeDisplayText(node.textContent ?? "");
    node.textContent = cleaned;
  });

  doc.querySelectorAll("ul").forEach((ul) => {
    ul.setAttribute("class", "list-disc list-outside pl-5 space-y-2");
  });

  doc.querySelectorAll("ol").forEach((ol) => {
    ol.setAttribute("class", "list-decimal list-outside pl-5 space-y-2");
  });

  doc.querySelectorAll("li").forEach((li) => {
    const directParagraphs = Array.from(li.querySelectorAll(":scope > p"));
    directParagraphs.forEach((paragraph) => {
      const cleaned = normalizeDisplayText(paragraph.textContent ?? "");
      paragraph.replaceWith(doc.createTextNode(cleaned));
    });

    if (!li.querySelector("ul, ol")) {
      li.textContent = normalizeDisplayText(li.textContent ?? "");
    }
  });

  const heading22 = Array.from(doc.querySelectorAll("h2, h3, h4")).find((heading) =>
    /2\.2\s+LibreQoS/i.test(heading.textContent ?? "")
  );

  if (heading22) {
    const targetParagraph =
      heading22.nextElementSibling?.tagName.toLowerCase() === "p"
        ? heading22.nextElementSibling
        : heading22;

    const inlineImage = doc.createElement("img");
    inlineImage.setAttribute("src", "/images/guides/bufferbloat-test-results.jpg");
    inlineImage.setAttribute("alt", "Risultati del test bufferbloat");
    inlineImage.setAttribute(
      "class",
      "w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain"
    );

    targetParagraph.parentNode?.insertBefore(inlineImage, targetParagraph.nextSibling);
  }

  const heading72 = Array.from(doc.querySelectorAll("h2, h3, h4")).find((heading) =>
    /7\.2\b/i.test(heading.textContent ?? "")
  );

  if (heading72) {
    const targetParagraph =
      heading72.nextElementSibling?.tagName.toLowerCase() === "p"
        ? heading72.nextElementSibling
        : heading72;

    const inlineImage = doc.createElement("img");
    inlineImage.setAttribute("src", "/images/guides/waveform-bufferbloat-result.jpg");
    inlineImage.setAttribute("alt", "Forma d'onda risultato test bufferbloat");
    inlineImage.setAttribute(
      "class",
      "w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain"
    );

    targetParagraph.parentNode?.insertBefore(inlineImage, targetParagraph.nextSibling);
  }

  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src") ?? "";
    img.setAttribute("src", mapImageSrc(src));
    img.setAttribute("class", "w-full rounded-lg mb-6 border border-zinc-800");
    img.removeAttribute("style");
  });

  doc.querySelectorAll("a").forEach((anchor) => {
    const href = anchor.getAttribute("href") ?? "";
    const currentClass = anchor.getAttribute("class") ?? "";
    anchor.setAttribute("class", `${currentClass} break-all`.trim());
    if (href.startsWith("http")) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  });

  doc.querySelectorAll("table").forEach((table) => {
    const wrapper = doc.createElement("div");
    wrapper.setAttribute(
      "class",
      "overflow-x-auto rounded-lg border border-white/10 bg-zinc-900/60 my-6"
    );

    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    table.setAttribute("class", "w-full min-w-[680px] border-collapse");
  });

  doc.querySelectorAll(".bibliography").forEach((bibliography) => {
    const title = bibliography.querySelector("h4")?.textContent?.trim() || "Fonti";

    const details = doc.createElement("details");
    details.setAttribute(
      "class",
      "mt-6 rounded-lg border border-white/10 bg-zinc-950/70 p-4"
    );

    const summary = doc.createElement("summary");
    summary.textContent = `Fonti e Bibliografia - ${title}`;
    summary.setAttribute(
      "class",
      "cursor-pointer list-none text-white font-semibold text-lg"
    );
    details.appendChild(summary);

    const content = doc.createElement("div");
    content.setAttribute("class", "mt-4 space-y-4");

    Array.from(bibliography.children).forEach((child) => {
      if (child.tagName.toLowerCase() !== "h4") {
        content.appendChild(child);
      }
    });

    details.appendChild(content);
    bibliography.replaceWith(details);
  });

  const blocks: ContentBlock[] = [];
  const preferredBlocks = doc.querySelectorAll(".hero-section, .container");

  if (preferredBlocks.length > 0) {
    preferredBlocks.forEach((node, index) => {
      blocks.push({
        key: `preferred-${index}`,
        html: sanitizeHtml(node.outerHTML),
      });
    });

    return blocks;
  }

  Array.from(doc.body.children).forEach((node, index) => {
    blocks.push({
      key: `block-${index}`,
      html: sanitizeHtml(node.outerHTML),
    });
  });

  return blocks;
};

const BufferbloatContent = () => {
  const blocks = useMemo(() => extractBufferbloatBlocks(), []);
  const hasEmbeddedMedia = useMemo(
    () => blocks.some((block) => /<iframe\b/i.test(block.html)),
    [blocks]
  );
  const splitIndex = Math.max(1, Math.ceil(blocks.length / 2));
  const firstChunk = hasEmbeddedMedia ? blocks : blocks.slice(0, splitIndex);
  const secondChunk = hasEmbeddedMedia ? [] : blocks.slice(splitIndex);

  return (
    <div className="space-y-4">
      {!hasEmbeddedMedia ? (
        <img
          src="/images/guides/scheme-bufferbloat.webp"
          alt="Schema del fenomeno bufferbloat"
          className="w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain"
        />
      ) : null}

      {firstChunk.map((block, index) => (
        <motion.div
          key={block.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 + index * 0.03 }}
          className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_em]:text-primary [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5 [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_blockquote]:rounded-lg [&_blockquote]:border [&_blockquote]:border-primary/30 [&_blockquote]:bg-primary/10 [&_blockquote]:p-4 [&_blockquote]:text-zinc-300 [&_code]:rounded [&_code]:border [&_code]:border-white/20 [&_code]:bg-zinc-800 [&_code]:px-2 [&_code]:py-0.5 [&_code]:text-primary [&_.hero-section]:rounded-xl [&_.hero-section]:border [&_.hero-section]:border-white/10 [&_.hero-section]:bg-zinc-900/60 [&_.hero-section]:p-6 [&_.container]:rounded-xl [&_.container]:border [&_.container]:border-white/10 [&_.container]:bg-zinc-900/60 [&_.container]:p-5 [&_.container]:md:p-6 [&_.test-links]:grid [&_.test-links]:gap-4 [&_.test-links]:md:grid-cols-2 [&_.test-card]:rounded-lg [&_.test-card]:border [&_.test-card]:border-white/10 [&_.test-card]:bg-zinc-950/70 [&_.test-card]:p-4 [&_.test-card_a]:inline-flex [&_.test-card_a]:items-center [&_.test-card_a]:justify-center [&_.test-card_a]:rounded-lg [&_.test-card_a]:bg-primary [&_.test-card_a]:px-4 [&_.test-card_a]:py-2 [&_.test-card_a]:font-semibold [&_.test-card_a]:text-white [&_.test-card_a:hover]:bg-primary [&_.references]:rounded-lg [&_.references]:border [&_.references]:border-white/10 [&_.references]:bg-black/60 [&_.references]:p-4 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-primary [&_th]:font-semibold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-primary/30 [&_td]:px-4 [&_td]:py-3 [&_td]:text-zinc-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-zinc-800/30 [&_a]:max-w-full [&_a]:text-primary [&_a]:underline-offset-2 [&_a]:break-all [&_a:hover]:text-primary"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      ))}

      {secondChunk.map((block, index) => (
        <motion.div
          key={`secondary-${block.key}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.65 + index * 0.03 }}
          className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_em]:text-primary [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5 [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_blockquote]:rounded-lg [&_blockquote]:border [&_blockquote]:border-primary/30 [&_blockquote]:bg-primary/10 [&_blockquote]:p-4 [&_blockquote]:text-zinc-300 [&_code]:rounded [&_code]:border [&_code]:border-white/20 [&_code]:bg-zinc-800 [&_code]:px-2 [&_code]:py-0.5 [&_code]:text-primary [&_.hero-section]:rounded-xl [&_.hero-section]:border [&_.hero-section]:border-white/10 [&_.hero-section]:bg-zinc-900/60 [&_.hero-section]:p-6 [&_.container]:rounded-xl [&_.container]:border [&_.container]:border-white/10 [&_.container]:bg-zinc-900/60 [&_.container]:p-5 [&_.container]:md:p-6 [&_.test-links]:grid [&_.test-links]:gap-4 [&_.test-links]:md:grid-cols-2 [&_.test-card]:rounded-lg [&_.test-card]:border [&_.test-card]:border-white/10 [&_.test-card]:bg-zinc-950/70 [&_.test-card]:p-4 [&_.test-card_a]:inline-flex [&_.test-card_a]:items-center [&_.test-card_a]:justify-center [&_.test-card_a]:rounded-lg [&_.test-card_a]:bg-primary [&_.test-card_a]:px-4 [&_.test-card_a]:py-2 [&_.test-card_a]:font-semibold [&_.test-card_a]:text-white [&_.test-card_a:hover]:bg-primary [&_.references]:rounded-lg [&_.references]:border [&_.references]:border-white/10 [&_.references]:bg-black/60 [&_.references]:p-4 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-primary [&_th]:font-semibold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-primary/30 [&_td]:px-4 [&_td]:py-3 [&_td]:text-zinc-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-zinc-800/30 [&_a]:max-w-full [&_a]:text-primary [&_a]:underline-offset-2 [&_a]:break-all [&_a:hover]:text-primary"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      ))}

    </div>
  );
};

export default BufferbloatContent;
