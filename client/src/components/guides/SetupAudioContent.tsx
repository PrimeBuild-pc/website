import { useMemo } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { normalizeHeadingElements } from "@/lib/guideHeadingCase";
import setupAudioSectionsHtml from "@/content/setup-audio-sections.html?raw";

type SectionContent = {
  id: string;
  blocks: string[];
};

type ContextImageRule = {
  sectionId: string;
  match: string;
  src: string;
  alt: string;
  imageClassName?: string;
  followupNote?: string;
};

const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

const guideImageClass =
  "w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain";

const usefulResources = [
  {
    label: "Equalizer APO",
    href: "https://sourceforge.net/projects/equalizerapo/",
  },
  {
    label: "Peace Equalizer",
    href: "https://sourceforge.net/projects/peace-equalizer-apo-extension/",
  },
];

const contextImageRules: ContextImageRule[] = [
  {
    sectionId: "parte-1",
    match: "il punto di partenza è sempre windows",
    src: "/images/guides/windows-audio-devices.webp",
    alt: "Impostazioni dispositivi audio di Windows",
    imageClassName:
      "w-full max-w-[560px] rounded-xl border border-zinc-800 my-8 shadow-lg object-contain",
    followupNote:
      "In questa fase conviene anche disabilitare i dispositivi di riproduzione e registrazione che non usi: mantenere attivi solo quelli necessari riduce conflitti di routing, semplifica la gestione dei driver e rende piu stabile la configurazione audio durante il gioco competitivo.",
  },
  {
    sectionId: "parte-1",
    match: "miglioramenti audio",
    src: "/images/guides/audio-enhancement.webp",
    alt: "Disattivazione miglioramenti audio",
  },
  {
    sectionId: "parte-3",
    match: "tra i 4 e i 5 khz",
    src: "/images/guides/footstep-frequency-response.webp",
    alt: "Risposta in frequenza dei passi",
  },
  {
    sectionId: "parte-6",
    match: "mixer virtuale",
    src: "/images/guides/fx-sound.webp",
    alt: "Software EQ e routing audio",
  },
];

const mapImageSrc = (src: string): string => {
  if (!src || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  const fileName = src.split("/").pop();
  return fileName ? `/images/guides/${fileName}` : src;
};

const stripPartPrefixFromHeadings = (section: Element) => {
  section.querySelectorAll("h2, h3, h4").forEach((heading) => {
    const text = heading.textContent ?? "";
    heading.textContent = text.replace(/^\s*parte\s*\d+\s*[\-–—:]\s*/i, "").trim();
  });
};

const insertUsefulProgramsLinks = (section: Element) => {
  const sectionId = section.getAttribute("id") ?? "";
  if (sectionId !== "parte-3") {
    return;
  }

  let inserted = false;
  Array.from(section.children).forEach((child) => {
    if (inserted) {
      return;
    }

    const normalizedText = (child.textContent ?? "").toLowerCase();
    if (!normalizedText.includes("equalizer apo")) {
      return;
    }

    const linksCard = section.ownerDocument.createElement("div");
    linksCard.setAttribute(
      "class",
      "highlight-box mt-4 mb-6 rounded-lg border border-primary/30 bg-primary/10 p-4"
    );
    linksCard.innerHTML = [
      '<p><strong>Programmi utili:</strong></p>',
      '<ul>',
      '<li><a href="https://sourceforge.net/projects/equalizerapo/" target="_blank" rel="noopener noreferrer">Equalizer APO</a></li>',
      '<li><a href="https://sourceforge.net/projects/peace-equalizer-apo-extension/" target="_blank" rel="noopener noreferrer">Peace Equalizer</a></li>',
      '</ul>',
    ].join("");

    child.insertAdjacentElement("afterend", linksCard);
    inserted = true;
  });
};

const extractSections = (): SectionContent[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(setupAudioSectionsHtml, "text/html");

  return Array.from(doc.querySelectorAll("section[id]")).map((section) => {
    section.querySelectorAll(".toc, .toc-container").forEach((toc) => toc.remove());
    stripPartPrefixFromHeadings(section);
    normalizeHeadingElements(section);
    insertUsefulProgramsLinks(section);

    const sectionRules = contextImageRules.filter((rule) => rule.sectionId === section.id);
    const insertedSources = new Set<string>();

    const children = Array.from(section.children);
    children.forEach((child) => {
      const normalizedText = (child.textContent ?? "").toLowerCase();

      const matchingRule = sectionRules.find(
        (rule) => !insertedSources.has(rule.src) && normalizedText.includes(rule.match)
      );

      if (!matchingRule) {
        return;
      }

      const image = doc.createElement("img");
      image.setAttribute("src", matchingRule.src);
      image.setAttribute("alt", matchingRule.alt);
      image.setAttribute("class", matchingRule.imageClassName ?? guideImageClass);
      child.insertAdjacentElement("afterend", image);

      if (matchingRule.followupNote) {
        const note = doc.createElement("p");
        note.setAttribute("class", "text-zinc-300 leading-relaxed mb-6");
        note.textContent = matchingRule.followupNote;
        image.insertAdjacentElement("afterend", note);
      }

      insertedSources.add(matchingRule.src);
    });

    section.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") ?? "";
      img.setAttribute("src", mapImageSrc(src));
      if (!img.getAttribute("class")) {
        img.setAttribute("class", guideImageClass);
      }
      img.removeAttribute("style");
    });

    section.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("http")) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    });

    const blocks = Array.from(section.children)
      .filter((element) =>
        ["H2", "H3", "P", "UL", "DIV", "IMG"].includes(element.tagName)
      )
      .map((element) => sanitizeHtml(element.outerHTML));

    return { id: section.id, blocks };
  });
};


const SetupAudioContent = () => {
  const sections = useMemo(() => extractSections(), []);
  let sequence = 0;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <img
          src="/images/guides/audio-setup.jpg"
          alt="Setup audio competitivo"
          className={guideImageClass}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.24 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
      >
        <h3 className="text-lg text-zinc-100 mb-3">Risorse utili</h3>
        <ul className="list-disc list-inside space-y-2 text-zinc-300">
          {usefulResources.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:text-primary"
              >
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 + sectionIndex * 0.08 }}
          className="space-y-3"
        >
          {section.blocks.map((block, blockIndex) => {
            const delay = 0.35 + sequence * 0.03;
            sequence += 1;

            return (
              <motion.div
                key={`${section.id}-${blockIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay }}
                className="[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:text-primary [&_.highlight-box]:mt-3 [&_.highlight-box]:mb-3 [&_.highlight-box]:rounded-lg [&_.highlight-box]:border [&_.highlight-box]:border-primary/30 [&_.highlight-box]:bg-primary/10 [&_.highlight-box]:p-4"
                dangerouslySetInnerHTML={{ __html: block }}
              />
            );
          })}
        </motion.section>
      ))}
    </div>
  );
};

export default SetupAudioContent;