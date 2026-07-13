type Guide = {
  id: number;
  title: string;
  description: string;
  date: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  image: string;
};

export const guides: Guide[] = [
  {
    id: 1,
    title: "Setup Audio Competitivo",
    description:
      "Guida pratica per ottimizzare catena audio, equalizzazione e monitoring in scenari competitivi a bassa latenza.",
    date: "17 marzo 2026",
    datePublished: "2026-03-17",
    dateModified: "2026-03-17",
    slug: "setup-audio",
    image: "/images/guides/setup-audio.jpg",
  },
  {
    id: 2,
    title: "Guida DLSS e Frame Generation",
    description:
      "Analisi pratica su quando attivare upscaling e frame generation in base al target FPS e alla stabilita della latenza percepita.",
    date: "9 gennaio 2026",
    datePublished: "2026-01-09",
    dateModified: "2026-01-09",
    slug: "guida-dlss-frame-generation",
    image: "/images/guides/dlss-4.5.jpg",
  },
  {
    id: 3,
    title: "Setup Rete Anti-Bufferbloat",
    description:
      "Configurazione QoS e test ripetibili per ottenere ping stabile durante gaming online e streaming simultaneo.",
    date: "6 gennaio 2026",
    datePublished: "2026-01-06",
    dateModified: "2026-01-06",
    slug: "setup-rete-anti-bufferbloat",
    image: "/images/guides/bufferbloat-site.jpg",
  },
  {
    id: 4,
    title: "Ottimizzazione Build per 240Hz",
    description:
      "Checklist hardware e software per mantenere frametime coerente su monitor ad alto refresh con priorita alla competitivita.",
    date: "30 marzo 2026",
    datePublished: "2026-03-30",
    dateModified: "2026-03-30",
    slug: "ottimizzazione-build-240hz",
    image: "/images/guides/present-mode.jpg",
  },
  {
    id: 5,
    title: "Low Latency Gaming Guide",
    description:
      "Guida tecnica completa per ridurre input lag, stabilizzare frametime e ottimizzare l'intera pipeline di gioco competitivo.",
    date: "6 dicembre 2025",
    datePublished: "2025-12-06",
    dateModified: "2025-12-06",
    slug: "low-latency-gaming-guide",
    image: "/images/guides/low-latency-guide.jpg",
  },
];