import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";
import { trackGalleryView } from "@/lib/analytics";
import { SectionHeader } from "./SectionHeader";

interface GalleryImage { src: string; alt: string }

const SCROLL_SPEED_PX_PER_SEC = 300; // configurabile (px/s)

export default function GallerySection() {
  const images: GalleryImage[] = [
    { src: "/1.webp", alt: "Workstation PC potente con raffreddamento ad aria e illuminazione RGB, assemblata a Montegrotto Terme da Prime Build" },
    { src: "/2.webp", alt: "Dettaglio interno componenti PC gaming con illuminazione RGB sincronizzata e ventole corsair, Padova" },
    { src: "/3.webp", alt: "Setup gaming compatto custom build con scheda video dedicata e dissipatore AIO" },
    { src: "/4.webp", alt: "Illuminazione LED laterale di un PC gaming ad alte prestazioni, assemblaggio professionale Veneto" },
    { src: "/5.webp", alt: "Cable management ordinato e pulito sul retro di un case PC gaming, by Prime Build" },
    { src: "/6.webp", alt: "Configurazione ventole RGB sincronizzate per massimo airflow, assemblaggio PC Gaming Padova" },
    { src: "/7.webp", alt: "Case mid tower in vetro temperato con componenti hardware visibili e illuminazione custom" },
    { src: "/8.webp", alt: "Sistema di raffreddamento a liquido AIO installato su processore ad alte prestazioni a Montegrotto" },
    { src: "/9.webp", alt: "Setup produttività e workstation multi-monitor professionale per content creation e rendering" },
    { src: "/10.webp", alt: "Scheda video gaming di alta fascia installata su scheda madre ATX con RAM RGB" },
    { src: "/11.webp", alt: "PC gaming minimalista total white con componenti abbinati e illuminazione sobria" },
    { src: "/12.webp", alt: "Dissipatore ad aria a doppia torre ottimizzato per processori AMD Ryzen serie 7000" },
    { src: "/13.webp", alt: "Build PC full white custom con cavi sleevati bianchi e dissipatore a liquido" },
    { src: "/14.webp", alt: "Case high airflow con frontale mesh per massime prestazioni termiche in gaming" },
    { src: "/15.webp", alt: "Dettaglio cavi sleevati custom intrecciati per una build esteticamente perfetta, Padova" },
    { src: "/16.webp", alt: "Installazione memoria SSD NVMe PCIe 4.0 ultra veloce su scheda madre gaming" },
    { src: "/17.webp", alt: "Postazione gaming completa Prime Build con monitor curvo, tastiera meccanica e mouse" },
    { src: "/18.webp", alt: "PC gaming ad alte prestazioni con illuminazione LED arancione e scheda video Nvidia GeForce RTX" },
    { src: "/19.webp", alt: "PC gaming enthusiast con illuminazione LED rossa, scheda madre premium e GPU AMD Radeon" },
    { src: "/20.webp", alt: "Nuova build PC gaming Prime Build con airflow ottimizzato e finitura premium" },
    { src: "/21.webp", alt: "Dettaglio interno di configurazione gaming custom con cable management ordinato" },
    { src: "/22.webp", alt: "PC gaming custom con illuminazione RGB e componenti ad alte prestazioni" },
    { src: "/23.webp", alt: "Vista laterale di build Prime Build con case vetrato e hardware di fascia alta" },
    { src: "/24.webp", alt: "Assemblaggio professionale di PC gaming con dissipazione avanzata e look pulito" },
    { src: "/25.webp", alt: "Configurazione PC gaming completa ottimizzata per performance competitive" },
  ];

  // Duplicate once for seamless CSS marquee
  const loopImages = useMemo(() => [...images, ...images], [images]);

  // Measure the exact pixel distance for half track and compute duration = distance / speed
  const trackRef = useRef<HTMLDivElement>(null);
  const [styleVars, setStyleVars] = useState<React.CSSProperties>({});
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Analytics tracking when gallery comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTrackedView.current) {
          trackGalleryView();
          hasTrackedView.current = true;
        }
      },
      { threshold: 0.2 }
    );

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const distance = trackRef.current.scrollWidth / 2; // exact width of a single image set
      const durationSec = distance > 0 && SCROLL_SPEED_PX_PER_SEC > 0
        ? distance / SCROLL_SPEED_PX_PER_SEC
        : 30; // fallback
      setStyleVars({
        ["--marquee-distance" as any]: `${distance}px`,
        ["--marquee-duration" as any]: `${durationSec}s`,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [loopImages.length]);

  return (
    <section id="galleria" className="section-shell overflow-hidden bg-black">
      <div className="site-container">
        <AnimatedElement>
          <SectionHeader
            eyebrow="Realizzazioni"
            title="Dettagli che fanno"
            highlight="la differenza"
            subtitle="Una selezione di build, workstation e setup assemblati da Prime Build."
          />
        </AnimatedElement>
      </div>
      <div className="relative overflow-hidden" aria-label="Galleria a scorrimento continuo" role="list">
          <style>{`
            @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(calc(-1 * var(--marquee-distance))); } }
          `}</style>
          <div ref={trackRef} className="marquee-animate flex flex-nowrap gap-4 will-change-transform motion-reduce:overflow-x-auto motion-reduce:px-4" style={{ ...styleVars, animation: `marqueeX var(--marquee-duration) linear infinite` }}>
            {loopImages.map((img, i) => (
              <div
                key={i}
                role="listitem"
                className="surface-card h-[264px] w-[150px] flex-shrink-0 rounded-2xl p-1.5 sm:h-[320px] sm:w-[180px] md:h-[390px] md:w-[220px]"
              >
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[0.8rem] bg-black">
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    width={225}
                    height={400}
                    className="h-full w-full rounded-[0.8rem] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Gradient edges, reduced width to minimize side gaps */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent sm:w-28" />
      </div>
    </section>
  );
}

