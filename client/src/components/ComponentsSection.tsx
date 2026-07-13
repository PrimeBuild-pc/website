import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

const components = [
  { image: "/cpu.webp", title: "Processori", brands: "AMD & Intel" },
  { image: "/gpu.webp", title: "Schede video", brands: "NVIDIA & AMD" },
  { image: "/ram.webp", title: "Memorie RAM", brands: "Corsair & G.Skill" },
  { image: "/ssd.webp", title: "Storage", brands: "Samsung & WD" },
  { image: "/cooling.webp", title: "Raffreddamento", brands: "NZXT & Thermalright" },
  { image: "/case.webp", title: "Case", brands: "Lian Li & Phanteks" },
];

const ComponentsSection = () => (
  <section id="components" className="bg-dark-gradient bg-diagonal-grid py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <AnimatedElement>
        <SectionHeader
          title="Solo componenti"
          highlight="che hanno senso"
          subtitle="Scegliamo ogni parte per prestazioni, affidabilità e budget: nessun sovrapprezzo per specifiche che non userai."
        />
      </AnimatedElement>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
        {components.map((component, index) => (
          <AnimatedElement key={component.title} delay={index * 0.06}>
            <div className="surface-card group p-3 text-center sm:p-4">
              <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-black">
                <ImageWithFallback
                  src={component.image}
                  alt={`${component.title} ${component.brands} per PC gaming custom`}
                  width={180}
                  height={180}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-semibold text-white sm:text-base">{component.title}</h3>
              <p className="mt-1 text-xs text-neutral-500">{component.brands}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </section>
);

export default ComponentsSection;
