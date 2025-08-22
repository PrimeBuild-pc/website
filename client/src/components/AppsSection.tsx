import { FaDownload, FaPaypal } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";

interface App {
  name: string;
  description: string;
  features: string[];
  url: string;
  comingSoon: boolean;
}

const AppsSection = () => {
  const apps: App[] = [
    {
      name: "TreadPilot",
      description:
        "Alternativa open source a Process Lasso per Windows. Piani energetici, priorità e modifiche di sistema per giocatori e utenti esperti: gratuito e semplice.",
      features: ["Open-source", "Affinità processi su core", "Gestione powerplans"],
  url: "https://github.com/PrimeBuild-pc/TreadPilot/releases/download/beta/ThreadPilot-v1.0-Windows-x64-Portable.zip",
      comingSoon: false,
    },
    {
      name: "LightCrosshair",
      description:
        "Overlay di mirino leggero e personalizzabile per migliorare la precisione nei giochi FPS.",
      features: ["Overlay trasparente", "Mirino personalizzabile", "Profilo per gioco"],
  url: "https://github.com/PrimeBuild-pc/LightCrosshair/releases/download/beta/LightCrosshair-v1.0.0.zip",
      comingSoon: false,
    },
    {
      name: "TweakHub",
      description:
        "Centro di controllo all-in-one per modifiche e ottimizzazioni di Windows 11",
      features: ["Affinità processi su core", "Gestione powerplans", "Controllo estremo"],
  url: "https://github.com/PrimeBuild-pc/TweakHub/releases/download/beta/TweakHub-v1.0.0-win-x64-portable.zip",
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
              className="glow-card bg-neutral-900 rounded-xl overflow-hidden h-full flex flex-col
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

                {/* spinge il blocco pulsante in fondo alla card */}
                <div className="flex justify-center mt-auto">
                  {app.comingSoon ? (
                    <span className="inline-block bg-neutral-800 text-neutral-300 px-4 py-2 rounded-md text-sm">
                      In arrivo
                    </span>
                  ) : (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#ff7514] hover:bg-opacity-90 text-white px-4 py-2 rounded-md
                                 transition-transform hover:scale-105 focus:outline-none
                                 focus-visible:ring-2 focus-visible:ring-[#ff7514]
                                 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                    >
                      <FaDownload className="inline mr-2" /> Downlaod
                    </a>
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
              className="inline-flex items-center bg-[#0070BA] hover:bg-[#003087] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
            >
              <FaPaypal className="mr-2 text-xl" /> Supportaci su PayPal
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default AppsSection;
