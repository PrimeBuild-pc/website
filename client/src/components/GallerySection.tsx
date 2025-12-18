import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import ImageWithFallback from "@/lib/ImageWithFallback";

interface GalleryImage { src: string; alt: string }

const SCROLL_SPEED_PX_PER_SEC = 300; // configurabile (px/s)

export default function GallerySection() {
  const images: GalleryImage[] = [
    { src: "/1.jpg", alt: "Workstation potente assemblata a Montegrotto Terme" },
    { src: "/2.jpg", alt: "Dettaglio interno PC gaming RGB Padova" },
    { src: "/3.jpg", alt: "Setup gaming compatto custom build" },
    { src: "/4.jpg", alt: "Illuminazione LED laterale PC gaming Veneto" },
    { src: "/5.jpg", alt: "Cable management ordinato Prime Build" },
    { src: "/6.jpg", alt: "Ventole RGB sincronizzate assemblaggio PC Padova" },
    { src: "/7.jpg", alt: "Case mid tower in vetro temperato" },
    { src: "/8.jpg", alt: "Raffreddamento a liquido AIO installato a Montegrotto" },
    { src: "/9.jpg", alt: "Setup produttività multi-monitor professionale" },
    { src: "/10.jpg", alt: "Scheda video gaming alta fascia" },
    { src: "/11.jpg", alt: "PC gaming minimalista bianco" },
    { src: "/12.jpg", alt: "Dissipatore ad aria ottimizzato" },
    { src: "/13.jpg", alt: "Build PC full white custom" },
    { src: "/14.jpg", alt: "Case high airflow per massime prestazioni" },
    { src: "/15.jpg", alt: "Cavi sleevati custom PC Padova" },
    { src: "/16.jpg", alt: "Installazione SSD NVMe veloce" },
    { src: "/17.jpg", alt: "Postazione gaming completa Prime Build" }
  ];

  // Duplicate once for seamless CSS marquee
  const loopImages = useMemo(() => [...images, ...images], [images]);

  // Measure the exact pixel distance for half track and compute duration = distance / speed
  const trackRef = useRef<HTMLDivElement>(null);
  const [styleVars, setStyleVars] = useState<React.CSSProperties>({});

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
    <section id="galleria" className="py-20 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-black">
  <div className="w-full px-0">
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Galleria</h2>
        </AnimatedElement>
        <div className="mt-10 relative overflow-hidden" aria-label="Galleria a scorrimento continuo" role="list">
          <style>{`
            @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(calc(-1 * var(--marquee-distance))); } }
          `}</style>
          <div ref={trackRef} className="flex gap-4 flex-nowrap will-change-transform" style={{ ...styleVars, animation: `marqueeX var(--marquee-duration) linear infinite` }}>
            {loopImages.map((img, i) => (
              <div
                key={i}
                role="listitem"
                className="flex-shrink-0 w-[140px] h-[248px] sm:w-[160px] sm:h-[285px] md:w-[200px] md:h-[356px] lg:w-[225px] lg:h-[400px] rounded-xl"
              >
                <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Gradient edges, reduced width to minimize side gaps */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black via-black/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}


