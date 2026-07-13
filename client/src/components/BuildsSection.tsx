import { useEffect, useRef, useMemo } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

interface Build {
  tagline: string;
  description: string;
  price: string;
  image: string;
  specs: {
    name: string;
    value: string;
    performance: number;
  }[];
}

const BuildsSection = () => {
  const specBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const specBars = specBarsRef.current?.querySelectorAll(".spec-bar-fill");

    if (!specBars) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const width = target.dataset.width;
            if (width) {
              target.style.width = `${width}%`;
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    specBars.forEach((bar) => {
      observer.observe(bar);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const builds: Build[] = useMemo(() => [
    {
      tagline: "Gaming 1080p fluido",
      price: "750€",
      description:
        "La configurazione ideale per chi vuole entrare nel mondo del gaming ad alte prestazioni senza spendere una fortuna.",
      image: "/low.webp",
      specs: [
        { name: "Processore", value: "AMD Ryzen 5 5500X3D", performance: 60 },
        { name: "Scheda Video", value: "NVIDIA RTX 5060 8GB", performance: 62 },
        { name: "RAM", value: "32GB DDR4 3600MHz", performance: 70 },
        { name: "Storage", value: "NVMe SSD 1TB", performance: 75 },
        { name: "Raffreddamento", value: "Air Cooling", performance: 60 },
      ],
    },
    {
      tagline: "Gaming 1440p premium",
      price: "1500€",
      description:
        "Potenza e prestazioni bilanciate per gaming in 1440p e multitasking intenso.",
      image: "/mid.webp",
      specs: [
        { name: "Processore", value: "AMD Ryzen 7 7800X3D", performance: 85 },
        { name: "Scheda Video", value: "NVIDIA RTX 5070 12GB", performance: 80 },
        { name: "RAM", value: "32GB DDR5 6200MHz", performance: 82 },
        { name: "Storage", value: "NVMe SSD 2TB", performance: 88 },
        {
          name: "Raffreddamento",
          value: "AIO Liquid Cooling 360mm",
          performance: 90,
        },
      ],
    },
    {
      tagline: "Gaming 4K | Streaming | Workstation",
      price: "2900€",
      description:
        "La soluzione definitiva per gaming 4K, streaming professionale e carichi di lavoro intensi.",
      image: "/high.webp",
      specs: [
        { name: "Processore", value: "AMD Ryzen 9 9950X3D", performance: 95 },
        { name: "Scheda Video", value: "NVIDIA RTX 5080", performance: 92 },
        { name: "RAM", value: "64GB DDR5 6400MHz", performance: 97 },
        { name: "Storage", value: "NVMe SSD 4TB", performance: 94 },
        {
          name: "Raffreddamento",
          value: "AIO Liquid Cooling 360mm",
          performance: 90,
        },
      ],
    },
  ], []);

  return (
    <section id="builds" className="bg-[#090909] py-24 md:py-32" ref={specBarsRef}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedElement>
          <SectionHeader
            title="Una base per"
            highlight="ogni obiettivo"
            subtitle="Tre configurazioni indicative, sempre adattate ai prezzi del momento e a ciò che ti serve davvero."
            italicText="Prezzi e componenti sono esempi: ogni preventivo è personalizzato."
          />
        </AnimatedElement>

        <div className="mx-auto max-w-6xl">
          {builds.map((build, index) => (
            <AnimatedElement
              key={build.price}
              className={`mb-20 ${index === builds.length - 1 ? "mb-0" : ""}`}
              delay={0.12}
            >
              <div
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <div className="mb-4">
                    <span className="font-montserrat text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                      da {build.price}
                    </span>
                  </div>
                  <p className="mb-7 max-w-xl leading-relaxed text-neutral-400">{build.description}</p>

                  <div className="space-y-4">
                    {build.specs.map((spec, i) => (
                      <div key={i}>
                        <div className="mb-1.5 flex justify-between gap-4 text-sm">
                          <span className="font-medium text-neutral-300">{spec.name}</span>
                          <span className="text-right text-neutral-400">{spec.value}</span>
                        </div>
                        <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="spec-bar-fill absolute h-full bg-primary rounded-full w-0 transition-all duration-1000 ease-out"
                            data-width={spec.performance}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfXO6-BVQ3x1WLDlxpp7B534U8xIxymD7QbP8MId0fcf_9Yqw/viewform?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                    >
                      Richiedi preventivo
                    </a>
                  </div>
                </div>

                <div className={`group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black ${index % 2 ? "lg:order-1" : ""}`}>
                  <ImageWithFallback
                    src={build.image}
                    alt={`PC Gaming da ${build.price} - ${build.tagline} - Build custom Prime Build`}
                    width={600}
                    height={384}
                    className="h-[22rem] w-full object-cover transition duration-700 group-hover:scale-[1.025] sm:h-[30rem]"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/65 p-4 backdrop-blur-xl">
                    <p className="font-semibold text-white">{build.tagline}</p>
                    <span className="text-sm text-neutral-400">da {build.price}</span>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildsSection;


