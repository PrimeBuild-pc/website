import { useEffect, useRef, useMemo } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

interface Build {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  level: string;
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
      name: "PRIME STARTER",
      shortName: "STARTER",
      tagline: "Gaming 1080p fluido",
      level: "Entry Level",
      price: "750€",
      description:
        "La configurazione ideale per chi vuole entrare nel mondo del gaming ad alte prestazioni senza spendere una fortuna.",
  image: "/low.jpg",
      specs: [
        { name: "Processore", value: "AMD Ryzen 5 5700x", performance: 60 },
        { name: "Scheda Video", value: "NVIDIA RTX 5060 8GB", performance: 62 },
        { name: "RAM", value: "32GB DDR4 3600MHz", performance: 70 },
        { name: "Storage", value: "NVMe SSD 1TB", performance: 75 },
        { name: "Raffreddamento", value: "Air Cooling", performance: 60 },
      ],
    },
    {
      name: "PRIME PERFORMER",
      shortName: "PERFORMER",
      tagline: "Gaming 1440p premium",
      level: "Mid Range",
      price: "1500€",
      description:
        "Potenza e prestazioni bilanciate per gaming in 1440p e multitasking intenso.",
  image: "/mid.jpg",
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
      name: "PRIME ELITE",
      shortName: "ELITE",
      tagline: "Gaming 4K | Streaming | Workstation",
      level: "High End",
      price: "2900€",
      description:
        "La soluzione definitiva per gaming 4K, streaming professionale e carichi di lavoro intensi.",
  image: "/high.jpg",
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
    <section id="builds" className="section-shell relative overflow-hidden bg-[#08090b]" ref={specBarsRef}>
      <div className="section-glow -left-72 top-1/3 opacity-50" aria-hidden="true" />
      <div className="site-container">
        <AnimatedElement>
          <SectionHeader
            eyebrow="Configurazioni"
            title="Una base solida,"
            highlight="costruita intorno a te"
            subtitle="Configurazioni di PC Gaming su misura per ogni esigenza e budget"
            italicText="Esempi di build che puoi trovare da noi"
          />
        </AnimatedElement>

        <div className="mx-auto max-w-6xl space-y-8">
          {builds.map((build, index) => (
            <AnimatedElement
              key={index}
              delay={0.08 * index}
            >
              <div
                className="surface-card interactive-card grid overflow-hidden lg:grid-cols-[0.92fr_1.08fr]"
              >
                <div className={`relative min-h-[280px] overflow-hidden sm:min-h-[360px] ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <ImageWithFallback
                    src={build.image}
                    alt={`PC Gaming ${build.name} - ${build.tagline} - Build gaming custom Prime Build`}
                    width={720}
                    height={520}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <span className="eyebrow border-white/10 bg-black/50 text-neutral-200">{build.level}</span>
                    <p className="mt-3 text-lg font-semibold text-white">{build.tagline}</p>
                  </div>
                </div>

                <div className={`relative z-10 p-6 sm:p-8 lg:p-10 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold tracking-tight font-montserrat">
                      PRIME{" "}
                      <span className="text-primary">{build.shortName}</span>
                    </h3>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-bold text-orange-300">
                      Da {build.price}
                    </span>
                  </div>
                  <p className="mb-7 leading-7 text-neutral-400">{build.description}</p>

                  <div className="space-y-5">
                    {build.specs.map((spec, i) => (
                      <div key={i}>
                        <div className="mb-2 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                          <span className="font-medium text-neutral-300">{spec.name}</span>
                          <span className="text-neutral-500 sm:text-right">{spec.value}</span>
                        </div>
                        <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="spec-bar-fill absolute h-full w-0 rounded-full bg-gradient-to-r from-primary to-amber-400 transition-all duration-1000 ease-out"
                            data-width={spec.performance}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-9">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfXO6-BVQ3x1WLDlxpp7B534U8xIxymD7QbP8MId0fcf_9Yqw/viewform?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                    >
                      Richiedi Preventivo
                    </a>
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


