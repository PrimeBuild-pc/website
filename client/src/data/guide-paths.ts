export type GuidePath = {
  problem: string;
  slug: string;
};

export const guidePaths: GuidePath[] = [
  { problem: "Il PC è appena montato o Windows è da sistemare", slug: "low-latency-gaming-guide" },
  { problem: "Il gioco scatta o gli FPS non dicono come risponde", slug: "ottimizzazione-build-240hz" },
  { problem: "Voglio meno ritardo, niente tearing o un cap sensato", slug: "sincronizzazione-limiter" },
  { problem: "Sto scegliendo o regolando il monitor", slug: "monitor-gaming-pannelli" },
  { problem: "Il cavo o la modalità video non è quella che credo", slug: "display-cavi" },
  { problem: "Il mouse o la tastiera sembrano in ritardo", slug: "input-usb" },
  { problem: "Non sento i passi o l'audio è confuso", slug: "audio-cuffie-dac" },
  { problem: "Voglio equalizzare senza rompere il suono", slug: "setup-audio" },
  { problem: "Il lag compare quando qualcuno scarica", slug: "setup-rete-anti-bufferbloat" },
  { problem: "LatencyMon è rosso o un driver è sospetto", slug: "driver-latencymon" },
  { problem: "Sto facendo overclock e voglio sapere se è stabile", slug: "stabilita-occt" },
  { problem: "Ho trovato un tweak di registro o un timer", slug: "parametri-windows" },
  { problem: "DLSS, FSR o il contatore FPS sono saliti", slug: "guida-dlss-frame-generation" },
  { problem: "Ho cambiato qualcosa e non so se è meglio", slug: "misure-verifica" },
];
