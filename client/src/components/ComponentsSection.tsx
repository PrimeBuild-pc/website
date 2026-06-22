import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

const components = [
  { image: "/cpu.webp", title: "Processori", brands: "AMD & Intel" },
  { image: "/gpu.webp", title: "Schede Video", brands: "NVIDIA & AMD" },
  { image: "/ram.webp", title: "Memorie RAM", brands: "Corsair & G.Skill" },
  { image: "/ssd.webp", title: "Storage", brands: "Samsung & WD" },
  { image: "/cooling.webp", title: "Raffreddamento", brands: "NZXT & Thermalright" },
  { image: "/case.webp", title: "Case", brands: "Lian Li & Phanteks" },
];

const ComponentsSection = () => (
  <section className="section-shell relative overflow-hidden border-y border-white/5 bg-black">
    <div className="section-grid opacity-60" aria-hidden="true" />
    <div className="site-container">
      <AnimatedElement>
        <SectionHeader
          eyebrow="Hardware"
          title="Componenti premium,"
          highlight="scelti con criterio"
          subtitle="Selezioniamo piattaforme affidabili e bilanciate, senza rincorrere specifiche che non portano vantaggi reali."
        />
      </AnimatedElement>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {components.map((component, index) => (
          <AnimatedElement
            key={component.title}
            delay={index * 0.06}
            className={`group surface-card interactive-card min-h-48 p-4 sm:min-h-56 sm:p-6 ${
              index === 0 || index === 5 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={component.image}
                alt={`${component.title} per PC Gaming - ${component.brands} - Componenti premium Prime Build`}
                width={520}
                height={320}
                className="h-full w-full object-cover opacity-45 grayscale-[25%] transition duration-500 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 flex h-full min-h-40 flex-col justify-end sm:min-h-44">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{component.brands}</p>
              <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">{component.title}</h3>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </section>
);

export default ComponentsSection;
