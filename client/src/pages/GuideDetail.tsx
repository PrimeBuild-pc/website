import { lazy, Suspense } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { guides } from "@/data/guides";
import BackgroundEffect from "@/components/BackgroundEffect";
import useSEO from "@/hooks/useSEO";

const SetupAudioContent = lazy(() => import("@/components/guides/SetupAudioContent"));
const DlssContent = lazy(() => import("@/components/guides/DlssContent"));
const BufferbloatContent = lazy(() => import("@/components/guides/BufferbloatContent"));
const PresentationModelsContent = lazy(
  () => import("@/components/guides/PresentationModelsContent")
);
const LowLatencyGuideContent = lazy(() => import("@/components/guides/LowLatencyGuideContent"));

const formatSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

const GuideDetail = () => {
  const [, params] = useRoute("/guides/:slug");
  const slug = params?.slug ?? "";
  const guide = guides.find((item) => item.slug === slug);
  const fallbackTitle = slug ? formatSlug(slug) : "Guida";
  const isSetupAudio = slug === "setup-audio";
  const isDlssGuide = slug === "guida-dlss-frame-generation";
  const isBufferbloatGuide = slug === "setup-rete-anti-bufferbloat";
  const isPresentationGuide = slug === "ottimizzazione-build-240hz";
  const isLowLatencyGuide = slug === "low-latency-gaming-guide";

  useSEO({
    title: `${guide?.title ?? fallbackTitle} | Prime Build`,
    description:
      guide?.description ??
      `Guida tecnica Prime Build: ${fallbackTitle}. Analisi pratiche per prestazioni competitive e latenza ottimizzata.`,
  });

  return (
    <section className="relative isolate min-h-[calc(100vh-8rem)] bg-black text-white pt-28 pb-16 px-4 overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto max-w-4xl relative z-10">
        <Link
          href="/guides"
          className="inline-flex items-center text-sm text-zinc-300 hover:text-primary transition-colors border border-white/10 px-3 py-2 rounded-md bg-zinc-900/40"
        >
          ← Torna alle Guide
        </Link>

        <header className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="relative h-56 md:h-64 w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
          >
            {guide?.image ? (
              <img
                src={guide.image}
                alt={`Copertina guida ${guide?.title ?? fallbackTitle}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-xs uppercase tracking-wider text-primary">
                Report tecnico
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="mt-2 text-3xl md:text-5xl font-bold font-montserrat text-white"
              >
                {guide?.title ?? fallbackTitle}
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.26 }}
            className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider"
          >
            <span className="px-2.5 py-1 rounded border border-white/10 bg-zinc-900/70 text-zinc-300">
              slug: {slug || "non disponibile"}
            </span>
            {guide?.date ? (
              <span className="px-2.5 py-1 rounded border border-primary/30 bg-primary/10 text-primary">
                {guide.date}
              </span>
            ) : null}
          </motion.div>
        </header>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
          className="mt-6 border border-white/10 bg-zinc-900/50 rounded-xl p-6 md:p-8"
        >
          <Suspense fallback={<div className="text-white">Caricamento guida...</div>}>
            {isSetupAudio ? (
              <SetupAudioContent />
            ) : isDlssGuide ? (
              <DlssContent />
            ) : isBufferbloatGuide ? (
              <BufferbloatContent />
            ) : isPresentationGuide ? (
              <PresentationModelsContent />
            ) : isLowLatencyGuide ? (
              <LowLatencyGuideContent />
            ) : guide?.description ? (
              <p className="text-zinc-300 leading-relaxed">{guide.description}</p>
            ) : (
              <p className="text-zinc-400 leading-relaxed">
                Contenuto guida in preparazione.
              </p>
            )}
          </Suspense>
        </motion.article>
      </div>
    </section>
  );
};

export default GuideDetail;

