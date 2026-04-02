import { useMemo } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { normalizeHeadingElements } from "@/lib/guideHeadingCase";
import lowLatencyGuideSectionsHtml from "@/content/low-latency-guide-sections.html?raw";

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

const isLocalImageSrc = (src: string) =>
  !/^https?:\/\//i.test(src) && !src.startsWith("/") && !src.startsWith("data:");

const mapToPublicGuideImage = (src: string) => {
  const fileName = src.split("/").pop();
  if (!fileName) {
    return src;
  }

  return `/images/guides/${fileName}`;
};

const stripLegacyAttributes = (root: Element) => {
  const nodes = [root, ...Array.from(root.querySelectorAll("*"))];

  nodes.forEach((node) => {
    node.removeAttribute("class");
    node.removeAttribute("style");

    if (!["H2", "H3", "H4"].includes(node.tagName)) {
      node.removeAttribute("id");
    }
  });
};

const applyTypographyClasses = (root: Element) => {
  if (root.tagName === "H2") {
    root.className = "text-white font-bold text-2xl mt-12 mb-6 border-b border-zinc-800 pb-2";
  }

  if (root.tagName === "H3") {
    root.className = "text-xl text-zinc-100 mt-8 mb-4";
  }

  if (root.tagName === "H4") {
    root.className = "text-lg text-primary mt-6 mb-3";
  }

  if (root.tagName === "P") {
    root.className = "text-zinc-300 leading-relaxed mb-6";
  }

  const paragraphs = root.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    paragraph.className = "text-zinc-300 leading-relaxed mb-6";
  });

  const h2List = root.querySelectorAll("h2");
  h2List.forEach((heading) => {
    heading.className = "text-white font-bold text-2xl mt-12 mb-6 border-b border-zinc-800 pb-2";
  });

  const h3List = root.querySelectorAll("h3");
  h3List.forEach((heading) => {
    heading.className = "text-xl text-zinc-100 mt-8 mb-4";
  });

  const h4List = root.querySelectorAll("h4");
  h4List.forEach((heading) => {
    heading.className = "text-lg text-primary mt-6 mb-3";
  });

  const lists = root.querySelectorAll("ul");
  lists.forEach((list) => {
    list.className = "text-zinc-300 list-disc list-inside mb-6 space-y-2";
  });

  const listItems = root.querySelectorAll("li");
  listItems.forEach((item) => {
    item.className = "text-zinc-300 leading-relaxed marker:text-primary";
  });

  const links = root.querySelectorAll("a");
  links.forEach((link) => {
    link.className = "text-primary hover:text-primary underline underline-offset-2";
  });

  const strongTags = root.querySelectorAll("strong");
  strongTags.forEach((strong) => {
    strong.className = "text-primary font-semibold";
  });
};

const styleTable = (table: HTMLTableElement, documentRef: Document) => {
  table.className = "min-w-full border-collapse bg-zinc-900";

  table.querySelectorAll("caption").forEach((caption) => {
    caption.className = "sr-only";
  });

  table.querySelectorAll("thead").forEach((thead) => {
    thead.className = "bg-zinc-800";
  });

  table.querySelectorAll("th").forEach((th) => {
    th.className = "border border-zinc-800 px-4 py-3 text-left text-white";
  });

  table.querySelectorAll("td").forEach((td) => {
    td.className = "border border-zinc-800 px-4 py-3 text-zinc-300 align-top";
  });

  const tableWrapper = documentRef.createElement("div");
  tableWrapper.className = "mb-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900";
  tableWrapper.appendChild(table);

  return tableWrapper;
};

const styleMediaBlock = (block: HTMLElement, documentRef: Document) => {
  block.className = "mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4";

  block.querySelectorAll("div").forEach((div) => {
    if (!div.textContent?.trim() && !div.querySelector("img, iframe")) {
      div.remove();
    }
  });

  block.querySelectorAll("iframe").forEach((iframe) => {
    const frameWrapper = documentRef.createElement("div");
    frameWrapper.className = "mb-3 aspect-video overflow-hidden rounded-lg border border-zinc-700";

    iframe.parentNode?.insertBefore(frameWrapper, iframe);
    frameWrapper.appendChild(iframe);

    iframe.className = "h-full w-full";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("allowFullScreen", "true");
  });

  block.querySelectorAll("a").forEach((link) => {
    link.className =
      "mb-3 block overflow-hidden rounded-lg border border-zinc-700 transition-colors hover:border-primary/70";

    if (!link.getAttribute("target")) {
      link.setAttribute("target", "_blank");
    }

    if (!link.getAttribute("rel")) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  block.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");

    if (src && isLocalImageSrc(src)) {
      img.setAttribute("src", mapToPublicGuideImage(src));
    }

    img.className = "w-full h-auto rounded-lg border border-zinc-800";
    img.setAttribute("loading", "lazy");
  });

  const mediaCaptions = block.querySelectorAll("p");
  mediaCaptions.forEach((caption) => {
    caption.className = "mt-3 text-sm text-zinc-400 leading-relaxed";
  });

  return block;
};

const buildGuideBlocks = () => {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  const parser = new DOMParser();
  const parsed = parser.parseFromString(
    `<div id="low-latency-root">${lowLatencyGuideSectionsHtml}</div>`,
    "text/html"
  );

  const root = parsed.getElementById("low-latency-root");
  if (!root) {
    return [] as string[];
  }

  const blocks = Array.from(root.children)
    .filter((element) => !element.classList.contains("toc"))
    .map((element) => {
      const isMedia = element.classList.contains("media-container");
      const isSources = element.classList.contains("sources");

      stripLegacyAttributes(element);
      normalizeHeadingElements(element);
      applyTypographyClasses(element);

      if (isMedia) {
        return sanitizeHtml(styleMediaBlock(element as HTMLElement, parsed).outerHTML);
      }

      if (element.tagName === "TABLE") {
        return sanitizeHtml(styleTable(element as HTMLTableElement, parsed).outerHTML);
      }

      if (isSources) {
        const section = element as HTMLElement;
        section.className = "mt-10 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5";
        applyTypographyClasses(section);
        return sanitizeHtml(section.outerHTML);
      }

      if (element.tagName === "BR") {
        return "";
      }

      return sanitizeHtml(element.outerHTML);
    })
    .filter(Boolean);

  return blocks;
};

const LowLatencyGuideContent = () => {
  const blocks = useMemo(() => buildGuideBlocks(), []);

  return (
    <div className="space-y-1">
      {blocks.map((block, index) => (
        <motion.div
          key={`low-latency-block-${index}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 + index * 0.02 }}
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
    </div>
  );
};

export default LowLatencyGuideContent;