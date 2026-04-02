import { useMemo } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { normalizeHeadingCase } from "@/lib/guideHeadingCase";
import presentationModelsReportRaw from "@/content/presentation-models-report.txt?raw";

type Block =
  | { type: "h2"; content: string }
  | { type: "p"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" };

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

const guideImageClass =
  "w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain";

const placeholderMedia = [
  {
    src: "/images/guides/MPO.webp",
    alt: "Schema Multi-Plane Overlay",
  },
  {
    src: "/images/guides/HAGS.webp",
    alt: "Schema Hardware Accelerated GPU Scheduling",
  },
  {
    src: "/images/guides/VRR.webp",
    alt: "Schema Variable Refresh Rate",
  },
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const withInlineFormatting = (value: string) => {
  let html = escapeHtml(value);

  html = html.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");

  return html;
};

const isUnorderedList = (lines: string[]) =>
  lines.length > 0 && lines.every((line) => /^\*\s+/.test(line.trim()));

const isOrderedList = (lines: string[]) =>
  lines.length > 0 && lines.every((line) => /^\d+\.\s+/.test(line.trim()));

const parseBlocks = (): Block[] => {
  const normalized = presentationModelsReportRaw.replace(/\r\n/g, "\n").trim();
  const rawBlocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return rawBlocks.map((block) => {
    if (/^-{3,}$/.test(block)) {
      return { type: "hr" };
    }

    if (block.startsWith("### ")) {
      return { type: "h2", content: normalizeHeadingCase(block.slice(4).trim()) };
    }

    const lines = block.split("\n").map((line) => line.trimEnd());

    if (isUnorderedList(lines)) {
      return {
        type: "ul",
        items: lines.map((line) => line.replace(/^\*\s+/, "").trim()),
      };
    }

    if (isOrderedList(lines)) {
      return {
        type: "ol",
        items: lines.map((line) => line.replace(/^\d+\.\s+/, "").trim()),
      };
    }

    return { type: "p", content: block };
  });
};

const PresentationModelsContent = () => {
  const blocks = useMemo(() => parseBlocks(), []);
  const placeholderIndexes = useMemo(() => {
    if (blocks.length < 6) {
      return [1];
    }

    return Array.from(
      new Set([
        Math.max(1, Math.floor(blocks.length * 0.25)),
        Math.max(2, Math.floor(blocks.length * 0.55)),
        Math.max(3, Math.floor(blocks.length * 0.8)),
      ])
    ).filter((index) => index > 0 && index < blocks.length);
  }, [blocks]);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.28 }}
      >
        <img
          src="/images/guides/presentation-models-1.jpg"
          alt="Modelli di presentazione tecnologici"
          className={guideImageClass}
        />
      </motion.div>

      {blocks.map((block, index) => (
        <div key={`presentation-block-wrapper-${index}`}>
          <motion.div
            key={`presentation-block-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + index * 0.03 }}
            className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_em]:text-zinc-100 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:text-primary"
          >
            {block.type === "h2" ? (
              <h2
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(withInlineFormatting(block.content)),
                }}
              />
            ) : block.type === "ul" ? (
              <ul>
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`presentation-ul-${index}-${itemIndex}`}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(withInlineFormatting(item)),
                    }}
                  />
                ))}
              </ul>
            ) : block.type === "ol" ? (
              <ol>
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`presentation-ol-${index}-${itemIndex}`}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(withInlineFormatting(item)),
                    }}
                  />
                ))}
              </ol>
            ) : block.type === "hr" ? (
              <hr className="border-white/10 my-6" />
            ) : (
              <p
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(withInlineFormatting(block.content)),
                }}
              />
            )}
          </motion.div>

          {placeholderIndexes.includes(index + 1) ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.38 + index * 0.03 }}
              className="w-full"
            >
              <img
                src={
                  placeholderMedia[
                    Math.min(
                      placeholderIndexes.indexOf(index + 1),
                      placeholderMedia.length - 1
                    )
                  ]?.src
                }
                alt={
                  placeholderMedia[
                    Math.min(
                      placeholderIndexes.indexOf(index + 1),
                      placeholderMedia.length - 1
                    )
                  ]?.alt ?? "Schema tecnico"
                }
                className={guideImageClass}
              />
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default PresentationModelsContent;