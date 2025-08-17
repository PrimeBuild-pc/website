import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedElement from "@/lib/AnimatedElement";
import { useIsMobile } from "@/hooks/use-mobile";


interface GalleryImage { src: string; alt: string }

const Carousel = ({ images }: { images: GalleryImage[] }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const hasWindow = typeof window !== "undefined";
  const prefersReduced = hasWindow && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const effectFactor = prefersReduced ? 0.5 : 1;

  const scrollByAmount = (delta: number) => scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  const scheduleUpdate = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(updateTransforms);
  };

  const updateTransforms = () => {
    rafRef.current = null;
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const delta = cardCenter - center;
      const norm = delta / card.clientWidth; // position relative to width

      // Visual model: cards on a table with subtle tilt
      const tiltX = -6 * effectFactor; // degrees, slight backward tilt like on a table
      const rotateY = Math.max(-30, Math.min(30, -norm * 25 * effectFactor));
      const depth = 220 * (1 - Math.min(1, Math.abs(norm)));
      const translateZ = (depth - 180) * effectFactor;
      const scale = 1 + Math.max(0, 0.08 * (1 - Math.abs(norm)));
      const opacity = 0.6 + 0.4 * (1 - Math.min(1, Math.abs(norm))); // stronger fade on sides

      if (Math.abs(delta) < Math.abs(bestDist)) {
        bestIdx = i;
        bestDist = delta;
      }

      card.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${tiltX}deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.willChange = "transform, opacity";
      (card.style as any).backfaceVisibility = "hidden";
      card.style.boxShadow = Math.abs(norm) < 0.4 ? "0 0 40px rgba(255,117,20,0.45)" : "0 0 0 rgba(0,0,0,0)";
      card.setAttribute("aria-selected", (Math.abs(norm) < 0.5).toString());
    });

    setActiveIndex(bestIdx);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateTransforms();
    // Center the first card after layout
    requestAnimationFrame(() => scrollToIndex(0));

    const onScroll = () => scheduleUpdate();
    const onResize = () => {
      scheduleUpdate();
      // keep centered on resize
      requestAnimationFrame(() => scrollToIndex(activeIndex));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    const card = cardRefs.current[idx];
    if (!el || !card) return;
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const target = cardCenter - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const onWheel = (e: React.WheelEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // Step one card at a time to maintain perfect centering
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(images.length - 1, activeIndex + dir));
      scrollToIndex(next);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startScrollRef.current = el.scrollLeft;
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const dx = e.clientX - startXRef.current;
      el.scrollLeft = startScrollRef.current - dx;
      scheduleUpdate();
    };
    const onUp = () => {
      draggingRef.current = false;
      // snap to nearest card
      scrollToIndex(activeIndex);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") scrollToIndex(Math.max(0, activeIndex - 1));
    if (e.key === "ArrowRight") scrollToIndex(Math.min(images.length - 1, activeIndex + 1));
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-400)}
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full backdrop-blur-sm"
      >
        ‹
      </button>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-12 md:gap-14 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar pr-2 cursor-grab active:cursor-grabbing md:-mt-4"
        style={{ WebkitOverflowScrolling: "touch", perspective: "1000px", transformStyle: "preserve-3d", translate: "0 -12%" }}
        aria-label="Galleria di immagini"
        role="listbox"
        tabIndex={0}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            role="option"
            className="rounded-lg overflow-hidden min-w-[250px] md:min-w-[300px] lg:min-w-[360px] snap-center bg-neutral-900/60 backdrop-blur-sm border border-white/5"
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity", backfaceVisibility: "hidden" as any }}
          >
            <AnimatedElement>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="h-64 w-full"
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatedElement>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(400)}
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full backdrop-blur-sm"
      >
        ›
      </button>

      {/* Removed progress indicators intentionally */}
    </div>
  );

};

const DeckCarousel = ({ images }: { images: GalleryImage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));
  const currentRef = useRef(0); // float position
  const targetRef = useRef(0); // target index
  const rafRef = useRef<number | null>(null);

  const hasWindow = typeof window !== "undefined";
  const cssSupports = (prop: string, value: string) => (hasWindow && (window.CSS?.supports?.(prop, value) ?? false));
  const supports3D = cssSupports("transform", "translateZ(1px)") || cssSupports("perspective", "1px");

  const isMobile = useIsMobile();
  const prefersReduced = hasWindow && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Arc layout parameters (tuned for spacing and semicircular depth)
  const θStep = isMobile ? 0.30 : 0.26; // increase spacing between cards
  const rotFactor = isMobile ? 0.50 : 0.62; // inward rotation amount
  const depthBoost = isMobile ? 1.30 : 1.55; // stronger semicircular depth (semicircular stage look)
  const cardWidth = 208; // 13rem = 208px
  const arrowWidth = 40; // approximate arrow button width

  const clampIndex = (v: number) => Math.max(0, Math.min(images.length - 1, v));
  const setTargetIndex = (idx: number) => {
    targetRef.current = clampIndex(idx);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const calculateArcRadius = () => {
    const containerWidth = containerRef.current?.clientWidth || 1024;
    const availableWidth = containerWidth - (arrowWidth * 2) - 40; // padding
    const maxX = availableWidth / 2;
    
    // Calculate max offset from center
    const kmax = Math.min(3, Math.floor(images.length / 2));
    const θMax = kmax * θStep;
    
    // Calculate radius to fit within bounds
    const R = θMax > 0 ? (maxX - cardWidth/2) / Math.sin(θMax) : 300;
    return Math.max(250, Math.min(500, R));
  };

  const applyTransforms = () => {
    const current = currentRef.current;
    const R = calculateArcRadius();
    const kmax = Math.min(3, Math.floor(images.length / 2));
    
    let bestIdx = 0;
    let bestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      
      const offset = i - current;
      const k = Math.max(-kmax, Math.min(kmax, offset));
      const θ = k * θStep;
      
      // Arc positioning
      const x = R * Math.sin(θ);
      const z = -R * (1 - Math.cos(θ)) * depthBoost; // sides recede away from the viewer
      const rotY = -θ * rotFactor * (180 / Math.PI); // face inward toward the center

      // Visual enhancements
      const absK = Math.abs(k);
      const scale = 1.06 - Math.min(0.06, 0.06 * absK);
      const opacity = Math.max(0.2, 0.25 + 0.75 * Math.max(0, 1 - absK)); // stronger fade for non-active

      const isActive = absK < 0.5;
      const glow = isActive ? "0 0 45px rgba(255,117,20,0.55)" : "0 0 0 rgba(0,0,0,0)";

      // Include centering translate to avoid overriding Tailwind's -translate utilities
      card.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) rotateX(-6deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.willChange = isMobile ? "auto" : "transform, opacity"; // lighten on mobile
      (card.style as any).backfaceVisibility = "hidden";
      card.style.boxShadow = glow;
      // Ensure correct stacking order with center card on top
      card.style.zIndex = String(1000 + Math.round(z));
      card.setAttribute("aria-current", isActive ? "true" : "false");

      const dist = Math.abs(offset);
      if (dist < bestDist) { bestDist = dist; bestIdx = i; }
    });

    setActiveIndex(bestIdx);
  };

  const tick = () => {
    rafRef.current = null;
    const target = targetRef.current;
    const current = currentRef.current;
    const delta = target - current;
    const ease = isMobile ? 0.18 : 0.12; // faster settle on mobile
    if (Math.abs(delta) > 0.001) {
      currentRef.current = current + delta * ease;
      applyTransforms();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      currentRef.current = target;
      applyTransforms();
    }
  };

  useEffect(() => {
    // Initialize with center card
    const mid = Math.floor(images.length / 2);
    currentRef.current = mid;
    targetRef.current = mid;
    setActiveIndex(mid);
    applyTransforms();
    
    const onResize = () => {
      applyTransforms();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images.length]);

  // Interactions
  const onWheel = (e: React.WheelEvent) => {
    if (!supports3D) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      setTargetIndex(targetRef.current + (e.deltaY > 0 ? 1 : -1));
    }
  };

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startCurrentRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!supports3D) return;
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startCurrentRef.current = currentRef.current;
  };

  useEffect(() => {
    let lastT = 0;
    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      const now = performance.now();
      // Throttle pointer move on mobile to 60hz-ish
      if (isMobile && now - lastT < 16) return;
      lastT = now;
      const R = calculateArcRadius();
      const dx = ev.clientX - startXRef.current;
      // Map pixel drag to index delta based on arc step along the circumference (~R * θStep)
      const pxPerIndex = R * θStep;
      currentRef.current = startCurrentRef.current - dx / pxPerIndex;
      currentRef.current = clampIndex(currentRef.current);
      applyTransforms();
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setTargetIndex(Math.round(currentRef.current));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setTargetIndex(targetRef.current - 1);
    if (e.key === "ArrowRight") setTargetIndex(targetRef.current + 1);
    if (e.key === "Home") setTargetIndex(0);
    if (e.key === "End") setTargetIndex(images.length - 1);
  };

  if (!supports3D) {
    return <Carousel images={images} />;
  }

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Left Arrow */}
      <button
        aria-label="Previous"
        onClick={() => setTargetIndex(targetRef.current - 1)}
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full backdrop-blur-sm"
      >
        ‹
      </button>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative max-w-6xl mx-auto h-[26rem] md:-mt-4"
        style={{ perspective: "1000px", transformStyle: "preserve-3d", translate: "0 -12%" }}
        role="listbox"
        tabIndex={0}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        aria-label="Galleria di immagini (carte)"
      >
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            role="option"
            aria-current={index === activeIndex}
            className="absolute top-1/2 left-1/2 rounded-xl overflow-hidden bg-neutral-900/60 backdrop-blur-sm border border-white/5"
            style={{ width: isMobile ? "12rem" : "13rem", height: isMobile ? "16rem" : "17rem", transformStyle: "preserve-3d", willChange: isMobile ? "auto" : "transform, opacity", backfaceVisibility: "hidden" as any }}
          >
            <AnimatedElement>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="w-full h-full">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatedElement>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        aria-label="Next"
        onClick={() => setTargetIndex(targetRef.current + 1)}
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full backdrop-blur-sm"
      >
        ›
      </button>
    </div>
  );
};

export default function GallerySection() {
  const galleryImages = [
    {
      src: "https://i.postimg.cc/3wZK1FbM/1.jpg",
      alt: "PC gaming di alta qualità"
    },
    {
      src: "https://i.postimg.cc/8Pqb6DF6/2.jpg",
      alt: "PC Gaming custom con illuminazione RGB"
    },
    {
      src: "https://i.postimg.cc/GpjPVyXF/5.jpg",
      alt: "Setup completo da gaming"
    },
    {
      src: "https://i.postimg.cc/s2z9Tc4f/4.jpg",
      alt: "Componenti hardware di ultima generazione"
    },
    {
      src: "https://i.postimg.cc/3xmFj6pb/3.jpg",
      alt: "Case PC con cable management professionale"
    }
  ];

  return (
    <section className="py-16 bg-dark-gradient bg-diagonal-grid">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-3">
            La <span className="text-[#ff7514]">nostra galleria</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Alcuni dei nostri lavori più recenti
          </p>
        </AnimatedElement>

        <DeckCarousel images={galleryImages} />
      </div>
    </section>
  );
};


