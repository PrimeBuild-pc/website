import { useEffect, useRef } from "react";
import AnimatedElement from "@/lib/AnimatedElement";

interface Build {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  level: string;
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
    const specBars = specBarsRef.current?.querySelectorAll('.spec-bar-fill');
    
    if (!specBars) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const width = target.dataset.width;
          if (width) {
            target.style.width = `${width}%`;
          }
        }
      });
    }, { threshold: 0.1 });
    
    specBars.forEach(bar => {
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
      description: "La configurazione ideale per chi vuole entrare nel mondo del gaming ad alte prestazioni senza spendere una fortuna.",
      image: "https://images.unsplash.com/photo-1589282595807-e5f8e56b7b00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
      specs: [
        { name: "Processore", value: "AMD Ryzen 5 5600X", performance: 75 },
        { name: "Scheda Video", value: "NVIDIA RTX 3060", performance: 70 },
        { name: "RAM", value: "16GB DDR4 3200MHz", performance: 65 },
        { name: "Storage", value: "NVMe SSD 1TB + HDD 2TB", performance: 70 },
        { name: "Raffreddamento", value: "Air Cooling", performance: 60 }
      ]
    },
    {
      name: "PRIME PERFORMER",
      shortName: "PERFORMER",
      tagline: "Gaming 1440p premium",
      level: "Mid Range",
      description: "Potenza e prestazioni bilanciate per gaming in 1440p e multitasking intenso.",
      image: "https://images.unsplash.com/photo-1624705473132-ban4ea75c9c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
      specs: [
        { name: "Processore", value: "Intel Core i7-12700K", performance: 85 },
        { name: "Scheda Video", value: "NVIDIA RTX 3080", performance: 85 },
        { name: "RAM", value: "32GB DDR4 3600MHz", performance: 80 },
        { name: "Storage", value: "NVMe SSD 2TB + HDD 4TB", performance: 85 },
        { name: "Raffreddamento", value: "AIO Liquid Cooling 240mm", performance: 80 }
      ]
    },
    {
      name: "PRIME ELITE",
      shortName: "ELITE",
      tagline: "Gaming 4K | Streaming | Workstation",
      level: "High End",
      description: "La soluzione definitiva per gaming 4K, streaming professionale e carichi di lavoro intensi.",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
      specs: [
        { name: "Processore", value: "AMD Ryzen 9 5950X", performance: 95 },
        { name: "Scheda Video", value: "NVIDIA RTX 4090", performance: 98 },
        { name: "RAM", value: "64GB DDR5 5200MHz", performance: 95 },
        { name: "Storage", value: "NVMe SSD 4TB + SSD SATA 4TB", performance: 95 },
        { name: "Raffreddamento", value: "Custom Loop Liquid Cooling", performance: 95 }
      ]
    }
  ];

  return (
    <section id="builds" className="py-20 bg-neutral-900" ref={specBarsRef}>
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-[#FF5722] inline-block border-b-2 border-[#FF5722] pb-2">
            Le Nostre Build
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Configurazioni di PC Gaming su misura per ogni esigenza e budget
          </p>
        </AnimatedElement>
        
        <div className="max-w-6xl mx-auto">
          {builds.map((build, index) => (
            <AnimatedElement 
              key={index} 
              className={`mb-24 ${index === builds.length - 1 ? 'mb-0' : ''}`}
              delay={0.2}
            >
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:order-first' : ''}`}>
                <div className={`${index % 2 !== 0 ? 'order-2 md:order-1' : ''}`}>
                  <h3 className="text-2xl font-bold font-montserrat mb-2">
                    PRIME <span className="text-[#FF5722]">{build.shortName}</span>
                  </h3>
                  <p className="text-neutral-300 mb-6">{build.description}</p>
                  
                  <div className="space-y-4">
                    {build.specs.map((spec, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{spec.name}</span>
                          <span className="text-[#FF5722]">{spec.value}</span>
                        </div>
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="spec-bar-fill absolute h-full bg-[#FF5722] rounded-full w-0 transition-all duration-1000 ease-out"
                            data-width={spec.performance}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <a 
                      href="#contact" 
                      className="inline-block bg-[#FF5722] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
                    >
                      Richiedi Preventivo
                    </a>
                  </div>
                </div>
                
                <div className={`relative rounded-xl overflow-hidden group ${index % 2 !== 0 ? 'order-1 md:order-2' : ''}`}>
                  <img 
                    src={build.image} 
                    alt={build.name} 
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <span className="inline-block bg-[#FF5722] text-white text-xs px-3 py-1 rounded-full mb-3">
                        {build.level}
                      </span>
                      <h3 className="text-2xl font-bold font-montserrat">{build.name}</h3>
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
