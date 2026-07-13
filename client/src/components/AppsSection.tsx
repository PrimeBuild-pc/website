import { useState } from "react";
import { FaDownload, FaPaypal } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";
import { trackDownload, trackExternalLink } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import {
  buildGitHubRepoUrl,
  buildGitHubReleasesUrl,
  getDownloadConfirmationMessage,
  resolveLatestReleaseDownload,
} from "@/lib/githubReleaseDownload";
import { SectionHeader } from "./SectionHeader";

interface App {
  name: string;
  description: string;
  features: string[];
  owner: string;
  repo: string;
  comingSoon: boolean;
}

const handleRepoClick = (appName: string, url: string) => {
  trackExternalLink(`${appName} Repository`, url);
};

const handlePayPalClick = () => {
  trackExternalLink('PayPal Donation', 'https://paypal.me/PrimeBuildOfficial');
};

const AppsSection = () => {
  const { toast } = useToast();
  const [downloadingApp, setDownloadingApp] = useState<string | null>(null);

  const apps: App[] = [
    {
      name: "ThreadPilot",
      description:
        "Alternativa open source a Process Lasso per Windows. Modifiche di sistema per utenti esperti.",
      features: ["Open-source", "Affinità processi su core", "Gestione powerplans"],
      owner: "PrimeBuild-pc",
      repo: "ThreadPilot",
      comingSoon: false,
    },
    {
      name: "LightCrosshair",
      description:
        "Overlay di mirino leggero e personalizzabile per migliorare la precisione nei giochi FPS.",
      features: ["Overlay trasparente", "Mirino personalizzabile", "Profilo per gioco"],
      owner: "PrimeBuild-pc",
      repo: "LightCrosshair",
      comingSoon: false,
    },
    {
      name: "TweakHub",
      description:
        "Centro di controllo all-in-one per modifiche e ottimizzazioni di Windows 11.",
      features: ["Affinità processi su core", "Gestione powerplans", "Controllo estremo"],
      owner: "PrimeBuild-pc",
      repo: "TweakHub",
      comingSoon: false,
    },
    {
      name: "ZapTweaks",
      description:
        "App per veloci tweaks su Windows 11, ideale per ottimizzazioni base su una fresh install.",
      features: ["Tweaks rapidi", "Ottimizzazione Win11", "Fresh install"],
      owner: "PrimeBuild-pc",
      repo: "ZapTweaks",
      comingSoon: false,
    },
  ];

  const openResolvedUrl = (targetUrl: string, pendingWindow: Window | null) => {
    if (pendingWindow) {
      pendingWindow.location.replace(targetUrl);
      return;
    }

    window.location.assign(targetUrl);
  };

  const handleDownloadClick = async (app: App) => {
    if (downloadingApp) return;

    const releasePageUrl = buildGitHubReleasesUrl(app.owner, app.repo);
    const confirmationText = getDownloadConfirmationMessage(app.name);
    if (!window.confirm(confirmationText)) return;

    // Open now to avoid popup blockers after async network calls.
    const pendingWindow = window.open('', '_blank', 'noopener,noreferrer');
    setDownloadingApp(app.name);

    try {
      const resolved = await resolveLatestReleaseDownload({ owner: app.owner, repo: app.repo });

      if (!resolved.success) {
        toast({
          title: 'Download non disponibile',
          description: `${resolved.error || 'Errore inatteso.'} Ti apriamo la pagina release GitHub come fallback.`,
        });
      }

      const targetUrl = resolved.success ? resolved.downloadUrl : resolved.releasePageUrl || releasePageUrl;
      trackDownload(app.name, targetUrl);
      openResolvedUrl(targetUrl, pendingWindow);
    } catch {
      const fallbackUrl = releasePageUrl;
      toast({
        title: 'Errore durante il download',
        description: 'Apertura pagina release GitHub come fallback.',
      });
      trackDownload(app.name, fallbackUrl);
      openResolvedUrl(fallbackUrl, pendingWindow);
    } finally {
      setDownloadingApp(null);
    }
  };

  return (
    <section id="apps" className="bg-[#050505] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedElement>
          <SectionHeader
            title="Software aperto,"
            highlight="controllo reale"
            subtitle="Utility gratuite sviluppate da Prime Build per capire e ottimizzare Windows senza formule magiche."
            underline={false}
          />
        </AnimatedElement>

        <div className="no-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {apps.map((app, index) => {
            const repoUrl = buildGitHubRepoUrl(app.owner, app.repo);

            return (
              <AnimatedElement
                key={index}
                className="surface-card glow-card relative flex w-[82vw] max-w-[300px] flex-shrink-0 snap-center flex-col overflow-hidden md:w-auto md:max-w-none"
                delay={0.1 * index}
              >
                {/* wrapper interno a colonna per riempire l'altezza */}
                <div className="flex h-full flex-col p-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Prime Build Labs</p>
                  <h3 className="mb-3 font-montserrat text-xl font-semibold">{app.name}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-400">{app.description}</p>

                  <ul className="space-y-2 mb-6">
                    {app.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-neutral-300">
                        <span className="text-primary mr-2">•</span> {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pulsanti in fondo alla card */}
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    {/* Repo button */}
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleRepoClick(app.name, repoUrl)}
                      aria-label={`Visualizza repository GitHub di ${app.name}`}
                      className="inline-flex items-center gap-1.5 bg-[#24292f] hover:bg-[#444d56] text-white px-3 py-1.5 rounded-md text-sm min-h-[32px]"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <span className="font-semibold">Repo</span>
                    </a>

                    {/* Download button */}
                    {app.comingSoon ? (
                      <span className="inline-block bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-md text-sm min-h-[32px]">
                        In arrivo
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDownloadClick(app)}
                        disabled={downloadingApp === app.name}
                        aria-label={`Download ${app.name}`}
                        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary text-black font-semibold px-3 py-1.5 rounded-md min-h-[32px] text-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <FaDownload aria-hidden="true" /> {downloadingApp === app.name ? 'Verifica...' : 'Download'}
                      </button>
                    )}
                  </div>
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        <AnimatedElement className="mt-14 text-center" delay={0.2}>
          <div className="surface-card mx-auto max-w-2xl p-7 md:p-9">
            <h3 className="text-2xl font-bold mb-4">Supporta il nostro lavoro</h3>
            <p className="text-neutral-400 mb-6">
              Le app restano gratuite e open source. Se ti sono utili, una donazione ci aiuta a mantenerle e migliorarle.
            </p>
            <a
              href="https://paypal.me/PrimeBuildOfficial?country.x=IT&locale.x=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePayPalClick}
              aria-label="Supportaci su PayPal con una donazione"
              className="inline-flex min-h-12 items-center rounded-full bg-[#0070BA] px-7 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#168bd2]"
            >
              <FaPaypal className="mr-2 text-xl" aria-hidden="true" /> Supportaci su PayPal
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default AppsSection;


