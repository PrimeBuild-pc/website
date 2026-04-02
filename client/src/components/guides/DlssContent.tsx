import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { normalizeHeadingElements } from "@/lib/guideHeadingCase";
import dlssArticleHtml from "@/content/dlss-article.html?raw";

type ContentBlock = {
  key: string;
  type: "html" | "pdf";
  html?: string;
  pdfSrc?: string;
};

const DLSS_PDF_FALLBACK_SRC = "/images/guides/dlss_programming_guide_release.pdf";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
}

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: [
      "class",
    ],
  });

const stripGuideEmojis = (doc: Document) => {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  let currentNode: Node | null = walker.nextNode();

  while (currentNode) {
    const text = currentNode.textContent ?? "";
    currentNode.textContent = text
      .replace(/(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|\uFE0F)/g, "")
      .replace(/\s{2,}/g, " ");
    currentNode = walker.nextNode();
  }
};

const mapImageSrc = (src: string): string => {
  if (src.startsWith("images/")) {
    const fileName = src.split("/").pop();
    return fileName ? `/images/guides/${fileName}` : src;
  }

  return src;
};

const mapIframeSrc = (src: string): string => {
  if (src.startsWith("DLSS_Programming_Guide_Release.pdf")) {
    return "/images/guides/dlss_programming_guide_release.pdf";
  }

  return src;
};

const pushNodeAsBlock = (node: Element, key: string, blocks: ContentBlock[]) => {
  const clonedNode = node.cloneNode(true) as Element;
  const iframe = clonedNode.querySelector("iframe");

  if (iframe) {
    const rawSrc = iframe.getAttribute("src") ?? "";
    const pdfSrc = mapIframeSrc(rawSrc) || DLSS_PDF_FALLBACK_SRC;

    iframe.remove();

    const cleanedHtml = sanitizeHtml(clonedNode.outerHTML);
    const hasText = (clonedNode.textContent ?? "").trim().length > 0;

    if (hasText) {
      blocks.push({
        key: `${key}-html`,
        type: "html",
        html: cleanedHtml,
      });
    }

    blocks.push({
      key: `${key}-pdf`,
      type: "pdf",
      pdfSrc,
    });
    return;
  }

  blocks.push({
    key,
    type: "html",
    html: sanitizeHtml(clonedNode.outerHTML),
  });
};

const extractDlssBlocks = (): ContentBlock[] => {
  if (typeof window === "undefined") {
    return [{ key: "fallback", type: "html", html: sanitizeHtml(dlssArticleHtml) }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(dlssArticleHtml, "text/html");
  stripGuideEmojis(doc);
  normalizeHeadingElements(doc.body);

  // Remove inline legacy styles so headings and text follow the shared guide typography.
  doc.querySelectorAll("[style]").forEach((element) => {
    element.removeAttribute("style");
  });

  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src") ?? "";
    img.setAttribute("src", mapImageSrc(src));
    img.setAttribute("class", "w-full rounded-lg mb-6 border border-zinc-800");
    img.removeAttribute("style");
  });

  doc.querySelectorAll("a").forEach((anchor) => {
    const href = anchor.getAttribute("href") ?? "";
    if (href.startsWith("http")) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  });

  const blocks: ContentBlock[] = [];
  const rootChildren = Array.from(doc.body.children);

  rootChildren.forEach((node, index) => {
    const tagName = node.tagName.toLowerCase();

    if (tagName === "section") {
      const sectionChildren = Array.from(node.children);
      sectionChildren.forEach((child, childIndex) => {
        pushNodeAsBlock(child, `section-${index}-${childIndex}`, blocks);
      });
      return;
    }

    pushNodeAsBlock(node, `block-${index}`, blocks);
  });

  return blocks;
};

const InlinePdfViewer = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(16);
  const [pageWidth, setPageWidth] = useState(900);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const resizePage = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 960;
      const nextWidth = Math.floor(Math.min(980, Math.max(280, containerWidth - 32)));
      setPageWidth(nextWidth);
    };

    resizePage();
    window.addEventListener("resize", resizePage);

    return () => {
      window.removeEventListener("resize", resizePage);
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const loadPdf = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      setPdfDoc(null);
      setNumPages(0);

      try {
        const response = await fetch(src || DLSS_PDF_FALLBACK_SRC, {
          cache: "no-store",
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: buffer });

        const loadedPdf = await loadingTask.promise;
        if (abortController.signal.aborted) {
          await loadedPdf.destroy();
          return;
        }

        setPdfDoc(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setPageNumber((currentPage) => {
          if (currentPage < 1) {
            return 1;
          }

          return Math.min(currentPage, loadedPdf.numPages);
        });
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        const message = error instanceof Error ? error.message : "Errore sconosciuto";
        setErrorMessage(message);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      abortController.abort();
    };
  }, [src]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) {
      return;
    }

    let isCancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = pageWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas context non disponibile");
        }

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        renderTaskRef.current?.cancel();
        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
        });
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Render PDF fallito";
        if (!isCancelled) {
          setErrorMessage(message);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [pdfDoc, pageNumber, pageWidth]);

  useEffect(() => {
    return () => {
      renderTaskRef.current?.cancel();
      if (pdfDoc) {
        void pdfDoc.destroy();
      }
    };
  }, [pdfDoc]);

  const canGoPrevious = pageNumber > 1;
  const canGoNext = numPages > 0 && pageNumber < numPages;

  return (
    <div ref={containerRef} className="my-6 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-4 text-sm text-zinc-300">
        <p className="font-medium text-zinc-200">DLSS Programming Guide (PDF)</p>
        <p className="text-zinc-400">
          Pagina {pageNumber}
          {numPages > 0 ? ` di ${numPages}` : ""}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPageNumber((currentPage) => Math.max(1, currentPage - 1))}
          disabled={!canGoPrevious}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Pagina precedente
        </button>
        <button
          type="button"
          onClick={() => setPageNumber((currentPage) => Math.min(numPages || currentPage, currentPage + 1))}
          disabled={!canGoNext}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Pagina successiva
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-2">
        {isLoading ? (
          <p className="py-10 text-center text-zinc-400">Caricamento PDF...</p>
        ) : errorMessage ? (
          <div className="space-y-3 py-8 text-center">
            <p className="text-red-400">Impossibile caricare il PDF.</p>
            <p className="text-xs text-zinc-500">Dettaglio tecnico: {errorMessage}</p>
            <a
              href={src || DLSS_PDF_FALLBACK_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-2 hover:text-primary hover:underline"
            >
              Apri il PDF in una nuova scheda
            </a>
          </div>
        ) : (
          <div className="flex justify-center">
            <canvas ref={canvasRef} className="max-w-full rounded border border-zinc-800 bg-white" />
          </div>
        )}
      </div>
    </div>
  );
};

const DlssContent = () => {
  const blocks = useMemo(() => extractDlssBlocks(), []);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <motion.div
          key={block.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 + index * 0.03 }}
          className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_.card]:rounded-xl [&_.card]:border [&_.card]:border-white/10 [&_.card]:bg-zinc-900/60 [&_.card]:p-5 [&_.card]:mb-4 [&_.card-note]:border-primary/40 [&_.table-container]:overflow-x-auto [&_.table-container]:rounded-lg [&_.table-container]:border [&_.table-container]:border-white/10 [&_.table-container]:bg-zinc-900/60 [&_table]:w-full [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-primary [&_th]:font-semibold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-primary/30 [&_td]:px-4 [&_td]:py-3 [&_td]:text-zinc-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-zinc-800/30 [&_.benchmark-data]:rounded-lg [&_.benchmark-data]:border [&_.benchmark-data]:border-primary/30 [&_.benchmark-data]:bg-black [&_.benchmark-data]:p-4 [&_.benchmark-data]:text-zinc-300 [&_.benchmark-data]:font-mono [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-white/20 [&_kbd]:bg-zinc-800 [&_kbd]:px-2 [&_kbd]:py-0.5 [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:text-primary"
        >
          {block.type === "pdf" ? (
            <InlinePdfViewer src={block.pdfSrc ?? DLSS_PDF_FALLBACK_SRC} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: block.html ?? "" }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DlssContent;