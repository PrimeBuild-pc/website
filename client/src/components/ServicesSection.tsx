import { FaDesktop, FaTools, FaTachometerAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";

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
    <AnimatedElement delay={delay} className="service-card bg-black p-8 rounded-xl shadow-lg overflow-hidden relative h-full">
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF5722] opacity-5 rounded-bl-full"></div>
      <div className="text-4xl text-[#FF5722] mb-6 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-montserrat mb-4">{title}</h3>
      <p className="text-neutral-400 mb-4">{description}</p>
      <ul className="text-sm text-neutral-300 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className="text-[#FF5722] mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-block text-[#FF5722] hover:underline font-medium group"
      >
        {cta} <FaArrowRight className="inline ml-1 transform group-hover:translate-x-1 transition-transform" />
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
    <section id="services" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-[#FF5722] inline-block border-b-2 border-[#FF5722] pb-2">
            Servizi
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Offriamo una gamma completa di servizi per soddisfare ogni tua esigenza nel mondo PC Gaming
          </p>
        </AnimatedElement>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
