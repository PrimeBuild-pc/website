import { FaDesktop, FaTools, FaTachometerAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";
import { trackCTAClick } from "@/lib/analytics";
import { services } from "@/data/services";
import { SectionHeader } from "./SectionHeader";

const icons = {
  "pc-gaming-su-misura": <FaDesktop />,
  "assistenza-riparazione-pc": <FaTools />,
  "ottimizzazione-pc-gaming": <FaTachometerAlt />,
};

const ServiceCard = ({
  icon,
  title,
  description,
  features,
  slug,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
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
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <FaCheck className="mr-2.5 text-xs text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={`/servizi/${slug}/`}
        onClick={() => trackCTAClick("Scopri il servizio", "services")}
        className="inline-flex items-center gap-2 font-semibold text-primary"
      >
        Scopri il servizio <FaArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </AnimatedElement>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="bg-[#090909] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedElement>
          <SectionHeader
            title="Servizi PC"
            highlight="su misura"
            subtitle="Prima si ascolta, poi si misura. Ogni intervento resta spiegato e reversibile."
          />
        </AnimatedElement>

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              icon={icons[service.slug as keyof typeof icons]}
              title={service.name}
              description={service.description}
              features={service.benefits.map((benefit) => benefit.title)}
              slug={service.slug}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
