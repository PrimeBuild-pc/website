import { FaDesktop, FaTools, FaTachometerAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";
import { trackCTAClick } from "@/lib/analytics";
import { SectionHeader } from "./SectionHeader";

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  cta, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[]; 
  cta: string; 
  delay: number; 
}) => {
  return (
    <AnimatedElement delay={delay} className="group surface-card interactive-card h-full p-7 md:p-8">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
        <h3 className="text-xl font-bold font-montserrat mb-3">{title}</h3>
        <p className="text-sm leading-6 text-neutral-400 mb-6">{description}</p>
        <ul className="mb-7 space-y-3 text-sm text-neutral-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <FaCheck className="text-[10px] text-primary" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => trackCTAClick(cta, 'services')}
          className="mt-auto inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-orange-300"
        >
          {cta} <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </AnimatedElement>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <FaDesktop />,
      title: "PC Gaming Custom",
      description: "Assembliamo il PC Gaming dei tuoi sogni con componenti di alta qualità, selezionati in base alle tue esigenze e al tuo budget.",
      features: ["Componenti premium", "Assemblaggio professionale", "Cable management impeccabile"],
      cta: "Richiedi preventivo",
      delay: 0.2
    },
    {
      icon: <FaTools />,
      title: "Riparazioni e Assistenza",
      description: "Servizio di riparazione e assistenza tecnica professionale per risolvere qualsiasi problema hardware o software del tuo PC.",
      features: ["Diagnosi professionale", "Riparazione rapida", "Supporto post-intervento"],
      cta: "Prenota assistenza",
      delay: 0.4
    },
    {
      icon: <FaTachometerAlt />,
      title: "Ottimizzazione",
      description: "Massimizza le prestazioni del tuo PC con i nostri servizi di ottimizzazione, tweaking e boost per gaming e produttività.",
      features: ["Overclock sicuro", "Ottimizzazione sistema", "Performance boost"],
      cta: "Scopri di più",
      delay: 0.6
    }
  ];

  return (
    <section id="services" className="section-shell relative overflow-hidden border-y border-white/5 bg-[#08090b]">
      <div className="section-grid opacity-50" aria-hidden="true" />
      <div className="section-glow -right-64 top-0 opacity-60" aria-hidden="true" />
      <div className="site-container">
        <AnimatedElement>
          <SectionHeader
            eyebrow="Servizi"
            title="Un unico partner per"
            highlight="tutto il tuo setup"
            subtitle="Offriamo una gamma completa di servizi per soddisfare ogni tua esigenza nel mondo PC Gaming"
          />
        </AnimatedElement>
        
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


