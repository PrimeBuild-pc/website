import { lazy, Suspense } from "react";
import { Link, useRoute } from "wouter";
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
    path: `/guides/${slug}`,
    image: guide?.image,
    type: "article",
    datePublished: guide?.datePublished,
    dateModified: guide?.dateModified,
  });

  return (
    <section className="relative isolate min-h-[calc(100vh-8rem)] bg-black text-white pt-28 pb-16 px-4 overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto max-w-4xl relative z-10">
        <Link
          href="/guides/"
          className="inline-flex items-center text-sm text-zinc-300 hover:text-primary transition-colors border border-white/10 px-3 py-2 rounded-md bg-zinc-900/40"
        >
          ← Torna alle Guide
        </Link>

        <header className="mt-8">
          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-primary">Report tecnico</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold font-montserrat text-white">
              {guide?.title ?? fallbackTitle}
            </h1>
            {guide?.description ? (
              <p className="mt-4 max-w-3xl leading-relaxed text-zinc-300">{guide.description}</p>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
            <Link href="/chi-siamo/" className="px-2.5 py-1 rounded border border-white/10 bg-zinc-900/70 text-zinc-300 hover:text-primary">
              A cura del team tecnico Prime Build
            </Link>
            {guide?.date ? (
              <time dateTime={guide.dateModified} className="px-2.5 py-1 rounded border border-primary/30 bg-primary/10 text-primary">
                Pubblicato il {guide.date}
              </time>
            ) : null}
          </div>
        </header>

        <article className="mt-6 border border-white/10 bg-zinc-900/50 rounded-xl p-6 md:p-8">
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
        </article>
      </div>
    </section>
  );
};

export default GuideDetail;

