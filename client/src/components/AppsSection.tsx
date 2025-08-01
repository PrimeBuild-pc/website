import { FaDownload, FaPaypal } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";

interface App {
  name: string;
  description: string;
  features: string[];
  comingSoon: boolean;
}

const AppsSection = () => {
  const apps: App[] = [
    {
      name: "Tweaks Utility",
      description: "Strumento avanzato per ottimizzare le prestazioni del tuo PC Gaming con tweaks personalizzati.",
      features: ["Ottimizzazione Windows", "Boost FPS", "Personalizzazione GPU/CPU"],
      comingSoon: true
    },
    {
      name: "Chrossair Easy",
      description: "Personalizza il tuo mirino per migliorare la precisione in qualsiasi gioco FPS.",
      features: ["Mirini personalizzabili", "Configurazioni per gioco", "Overlay trasparente"],
      comingSoon: true
    },
    {
      name: "Util Benchmark",
      description: "Suite completa per testare e confrontare le prestazioni del tuo sistema PC.",
      features: ["Test CPU/GPU", "Confronto risultati", "Report dettagliati"],
      comingSoon: true
    }
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
              className="bg-neutral-900 rounded-xl overflow-hidden"
              delay={0.1 * index}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{app.name}</h3>
                <p className="text-neutral-400 mb-4">{app.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {app.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-neutral-300">
                      <span className="text-[#ff7514] mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-center">
                  {app.comingSoon ? (
                    <span className="inline-block bg-neutral-800 text-neutral-300 px-4 py-2 rounded-md text-sm">
                      In arrivo
                    </span>
                  ) : (
                    <a 
                      href="#" 
                      className="inline-block bg-[#ff7514] hover:bg-opacity-90 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105"
                    >
                      <FaDownload className="inline mr-2" /> Scarica
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
              Le nostre app sono in fase di sviluppo e saranno presto disponibili. Supporta il nostro lavoro con una donazione per accelerare lo sviluppo e ottenere accesso anticipato.
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