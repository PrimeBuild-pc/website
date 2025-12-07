import { useEffect, useRef } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";

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

  const builds: Build[] = [
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
  ];

  return (
    <section id="builds" className="py-20 bg-neutral-900" ref={specBarsRef}>
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 inline-block border-b-2 border-[#ff7514] pb-2">
            <span className="text-white">Le</span> <span className="text-[#ff7514]">nostre build</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Configurazioni di PC Gaming su misura per ogni esigenza e budget
          </p>
          <p className="text-base max-w-2xl mx-auto text-neutral-400 mt-4 italic">
            Esempi di build che puoi trovare da noi
          </p>
        </AnimatedElement>

        <div className="max-w-6xl mx-auto">
          {builds.map((build, index) => (
            <AnimatedElement
              key={index}
              className={`mb-24 ${index === builds.length - 1 ? "mb-0" : ""}`}
              delay={0.2}
            >
              <div
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? "md:order-first" : ""}`}
              >
                <div className="order-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold font-montserrat">
                      PRIME{" "}
                      <span className="text-[#ff7514]">{build.shortName}</span>
                    </h3>
                    <span className="text-[#ff7514] text-xl font-bold border border-[#ff7514] rounded-md px-3 py-1">
                      {build.price}
                    </span>
                  </div>
                  <p className="text-neutral-300 mb-6">{build.description}</p>

                  <div className="space-y-4">
                    {build.specs.map((spec, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{spec.name}</span>
                          <span className="text-[#ff7514]">{spec.value}</span>
                        </div>
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="spec-bar-fill absolute h-full bg-[#ff7514] rounded-full w-0 transition-all duration-1000 ease-out"
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
                      className="inline-block bg-[#ff7514] hover:bg-[#e06500] text-black font-semibold py-3 px-8 rounded-md transition-all transform hover:scale-105"
                    >
                      Richiedi Preventivo
                    </a>
                  </div>
                </div>

                <div
                  className={`relative rounded-xl overflow-hidden group order-2 ${index % 2 !== 0 ? "md:order-1" : "md:order-2"}`}
                >
                  <ImageWithFallback
                    src={build.image}
                    alt={build.name}
                    width={600}
                    height={384}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <span className="inline-block bg-[#ff7514] text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {build.level}
                      </span>
                      <h3 className="text-2xl font-bold font-montserrat">
                        {build.name}
                      </h3>
                      <p className="text-neutral-300">{build.tagline}</p>
                    </div>
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
