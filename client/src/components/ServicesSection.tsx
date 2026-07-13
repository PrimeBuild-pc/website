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
  slug,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[]; 
  cta: string;
  slug: string;
  delay: number; 
}) => {
  return (
    <AnimatedElement delay={delay} className="surface-card group relative h-full overflow-hidden p-7 md:p-8">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/[0.06]" />
      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mb-3 font-montserrat text-xl font-semibold">{title}</h3>
      <p className="mb-6 leading-relaxed text-neutral-400">{description}</p>
      <ul className="mb-7 space-y-3 text-sm text-neutral-300">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className="mr-2.5 text-xs text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={`/servizi/${slug}`}
        onClick={() => trackCTAClick(cta, 'services')}
        className="inline-flex items-center gap-2 font-semibold text-primary"
      >
        {cta} <FaArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
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
      cta: "Scopri il servizio",
      slug: "pc-gaming-su-misura",
      delay: 0.1
    },
    {
      icon: <FaTools />,
      title: "Riparazioni e Assistenza",
      description: "Servizio di riparazione e assistenza tecnica professionale per risolvere qualsiasi problema hardware o software del tuo PC.",
      features: ["Diagnosi professionale", "Riparazione rapida", "Supporto post-intervento"],
      cta: "Scopri il servizio",
      slug: "assistenza-riparazione-pc",
      delay: 0.2
    },
    {
      icon: <FaTachometerAlt />,
      title: "Ottimizzazione",
      description: "Massimizza le prestazioni del tuo PC con i nostri servizi di ottimizzazione, tweaking e boost per gaming e produttività.",
      features: ["Overclock sicuro", "Ottimizzazione sistema", "Performance boost"],
      cta: "Scopri il servizio",
      slug: "ottimizzazione-pc-gaming",
      delay: 0.3
    }
  ];

  return (
    <section id="services" className="bg-[#090909] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedElement>
          <SectionHeader
            title="Servizi PC"
            highlight="su misura"
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


