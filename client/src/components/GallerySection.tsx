import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedElement from "@/lib/AnimatedElement";


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
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar pr-2 cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: "touch", perspective: "1000px", transformStyle: "preserve-3d" }}
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

      {/* Scroll indicator */}
      <div className="mt-4 flex justify-center gap-1 text-neutral-500 text-xs select-none">
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
      </div>
    </div>
  );

};

const DeckCarousel = ({ images }: { images: GalleryImage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentRef = useRef(0); // float position
  const targetRef = useRef(0); // target index
  const rafRef = useRef<number | null>(null);

  const hasWindow = typeof window !== "undefined";
  const cssSupports = (prop: string, value: string) => (hasWindow && (window.CSS?.supports?.(prop, value) ?? false));
  const supports3D = cssSupports("transform", "translateZ(1px)") || cssSupports("perspective", "1px");
  const prefersReduced = hasWindow && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const clampIndex = (v: number) => Math.max(0, Math.min(images.length - 1, v));
  const setTargetIndex = (idx: number) => {
    targetRef.current = clampIndex(idx);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const getBaseX = () => {
    const w = containerRef.current?.clientWidth || 1024;
    // Increase base spacing between cards for wider fan layout
    return Math.max(160, Math.min(300, w * 0.32));
  };

  const spread = prefersReduced ? 0.55 : 0.95; // slightly wider spacing
  const baseRotation = 12; // deg
  const depth = 130; // px

  const applyTransforms = () => {
    const current = currentRef.current;
    const baseX = getBaseX();
    let bestIdx = 0;
    let bestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const offset = i - current; // negative left, positive right
      const s = Math.sign(offset);
      const m = Math.abs(offset);
      const eased = Math.pow(m, 0.8);

      const x = s * baseX * eased * spread;
      const rotY = s * baseRotation * eased * spread;
      const z = -m * depth * spread;
      const scale = 1.06 - Math.min(0.06, 0.06 * m);
      const opacity = 0.55 + 0.45 * Math.max(0, 1 - m); // stronger fade for side cards

      const isActive = m < 0.5;
      const glow = isActive ? "0 0 45px rgba(255,117,20,0.55)" : "0 0 0 rgba(0,0,0,0)";

      card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) rotateX(-6deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.willChange = "transform, opacity";
      (card.style as any).backfaceVisibility = "hidden";
      card.style.boxShadow = glow;
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
    if (Math.abs(delta) > 0.001) {
      currentRef.current = current + delta * 0.12; // ease
      applyTransforms();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      currentRef.current = target;
      applyTransforms();
    }
  };

  useEffect(() => {
    // Ensure we start centered on the first card
    currentRef.current = 0;
    targetRef.current = 0;
    applyTransforms();
    const onResize = () => {
      // preserve centering on resize
      applyTransforms();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // interactions
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
    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      const baseX = getBaseX();
      const dx = ev.clientX - startXRef.current;
      currentRef.current = startCurrentRef.current - dx / baseX;
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
    // Fallback to previous horizontal carousel
    return <Carousel images={images} />;
  }

  return (
    <div className="relative" ref={containerRef}>
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
        className="relative max-w-6xl mx-auto h-[22rem] md:-mt-2"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-neutral-900/60 backdrop-blur-sm border border-white/5"
            style={{ width: "13rem", height: "17rem", transformStyle: "preserve-3d", willChange: "transform, opacity", backfaceVisibility: "hidden" as any }}
          >
            <AnimatedElement>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="w-full h-full">
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

      {/* Scroll indicator (decorative) */}
      <div className="mt-4 flex justify-center gap-1 text-neutral-500 text-xs select-none">
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
        <span className="block w-8 h-1 bg-neutral-700 rounded" />
      </div>
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


