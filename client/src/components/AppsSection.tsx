import { FaDownload, FaPaypal } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";
import { trackDownload, trackExternalLink } from "@/lib/analytics";

interface App {
  name: string;
  description: string;
  features: string[];
  url: string;
  repoUrl?: string;
  comingSoon: boolean;
}

const handleDownloadClick = (appName: string, url: string) => {
  trackDownload(appName, url);
};

const handleRepoClick = (appName: string, url: string) => {
  trackExternalLink(`${appName} Repository`, url);
};

const handlePayPalClick = () => {
  trackExternalLink('PayPal Donation', 'https://paypal.me/PrimeBuildOfficial');
};

const AppsSection = () => {
  const apps: App[] = [
    {
      name: "TreadPilot",
      description:
        "Alternativa open source a Process Lasso per Windows. Modifiche di sistema per utenti esperti.",
      features: ["Open-source", "Affinità processi su core", "Gestione powerplans"],
  url: "https://github.com/PrimeBuild-pc/TreadPilot/releases/download/beta/ThreadPilot-v1.0-Windows-x64-Portable.zip",
  repoUrl: "https://github.com/PrimeBuild-pc/TreadPilot",
      comingSoon: false,
    },
    {
      name: "LightCrosshair",
      description:
        "Overlay di mirino leggero e personalizzabile per migliorare la precisione nei giochi FPS.",
      features: ["Overlay trasparente", "Mirino personalizzabile", "Profilo per gioco"],
  url: "https://github.com/PrimeBuild-pc/LightCrosshair/releases/download/beta/LightCrosshair-beta-win-x64-portable.zip",
  repoUrl: "https://github.com/PrimeBuild-pc/LightCrosshair",
      comingSoon: false,
    },
    {
      name: "TweakHub",
      description:
        "Centro di controllo all-in-one per modifiche e ottimizzazioni di Windows 11.",
      features: ["Affinità processi su core", "Gestione powerplans", "Controllo estremo"],
  url: "https://github.com/PrimeBuild-pc/TweakHub/releases/download/beta/TweakHub-v1.0.0-win-x64-portable.zip",
  repoUrl: "https://github.com/PrimeBuild-pc/TweakHub",
      comingSoon: false,
    },
  ];

  return (
    <section id="apps" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Le nostre <span className="text-[#ff7514]">app</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Strumenti esclusivi per ottimizzare la tua esperienza di gioco
          </p>
        </AnimatedElement>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <AnimatedElement
              key={index}
              className="glow-card relative pb-14 bg-neutral-900 rounded-xl overflow-hidden h-full flex flex-col
                         focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#ff7514]
                         transition-transform hover:scale-105 focus-within:scale-105"
              delay={0.1 * index}
            >
              {/* wrapper interno a colonna per riempire l'altezza */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{app.name}</h3>
                <p className="text-neutral-400 mb-4">{app.description}</p>

                <ul className="space-y-2 mb-6">
                  {app.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-neutral-300">
                      <span className="text-[#ff7514] mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>

                {/* spinge il blocco pulsante in fondo alla card; download centrato e repo in basso a destra */}
                <div className="mt-auto relative pt-4">
                  {/* Repo button - bottom-left (always shown when repoUrl exists) */}
                  {app.repoUrl && (
                    <a
                      href={app.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleRepoClick(app.name, app.repoUrl!)}
                      aria-label={`Visualizza repository GitHub di ${app.name}`}
                      className="absolute left-4 bottom10 inline-flex items-center gap-2 bg-[#24292f] hover:bg-[#444d56] text-white px-4 py-1.5 rounded-md text-sm min-h-[32px]"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <span className="font-semibold">Repo</span>
                    </a>
                  )}

                  {/* Download button - bottom-right (only when available) */}
                  {app.comingSoon ? (
                    <span className="absolute right-1 bottom10 inline-block bg-neutral-800 text-neutral-300 px-4 py-2 rounded-md text-sm min-h-[32px]">
                      In arrivo
                    </span>
                  ) : (
                    app.url && (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDownloadClick(app.name, app.url)}
                        aria-label={`Scarica ${app.name}`}
                        className="absolute right-4 bottom10 inline-flex items-center gap-2 bg-[#ff7514] hover:bg-opacity-90 text-white px-4 py-1.5 rounded-md min-h-[32px] text-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7514] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                      >
                        <FaDownload className="inline mr-2" aria-hidden="true" /> Download
                      </a>
                    )
                  )}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement className="mt-16 text-center" delay={0.3}>
          <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Supporta il nostro lavoro</h3>
            <p className="text-neutral-400 mb-6">
              Le nostre app sono in fase di sviluppo e saranno presto disponibili. Supporta il nostro lavoro con una
              donazione per accelerare lo sviluppo e ottenere accesso anticipato.
            </p>
            <a
              href="https://paypal.me/PrimeBuildOfficial?country.x=IT&locale.x=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePayPalClick}
              aria-label="Supportaci con una donazione su PayPal"
              className="inline-flex items-center bg-[#0070BA] hover:bg-[#003087] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
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
