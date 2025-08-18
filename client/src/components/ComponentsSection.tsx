import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedElement from "@/lib/AnimatedElement";
import { useIsMobile } from "@/hooks/use-mobile";

interface Component {
  image: string;
  title: string;
  brands: string;
}

const ComponentsSection = () => {
  const components: Component[] = [
    {
      image: "https://i.postimg.cc/W4MBFXXM/cpu.png",
      title: "Processori",
      brands: "AMD & Intel"
    },
    {
      image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Schede Video",
      brands: "NVIDIA & AMD"
    },
    {
      image: "https://i.postimg.cc/Gtk8Z0Q4/ram.png",
      title: "Memorie RAM",
      brands: "Corsair & G.Skill"
    },
    {
      image: "https://i.postimg.cc/28VgFz0j/ssd.jpg",
      title: "Storage",
      brands: "Samsung & WD"
    },
    {
      image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Raffreddamento",
      brands: "NZXT & Thermalright"
    },
    {
      image: "https://i.postimg.cc/FK1WyGrf/case.png",
      title: "Case",
      brands: "Lian Li & Phanteks"
    }
  ];

  // 3D Wheel state and helpers
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0); // degrees
  const rotationRef = useRef(0);
  // velocity state removed to reduce extra renders
  const velocityRef = useRef(0);
  const [radius, setRadius] = useState(300);
  const [dragging, setDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastXRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const step = 360 / components.length;

  const hasWindow = typeof window !== "undefined";
  const cssSupports = (prop: string, value: string) => (hasWindow && (window.CSS?.supports?.(prop, value) ?? false));
  const supports3D = cssSupports("transform", "translateZ(1px)") || cssSupports("perspective", "1px");
  const prefersReduced = hasWindow && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const isMobile = useIsMobile();
  const enable3D = supports3D; // show 3D; if reduced motion, we dampen inertia

  // Compute radius responsively (smaller on mobile to reduce offscreen drawing)
  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.clientWidth || 1024;
      const base = isMobile ? 0.24 : 0.3;
      const minR = isMobile ? 140 : 160;
      const maxR = isMobile ? 340 : 420;
      const r = Math.max(minR, Math.min(maxR, w * base));
      setRadius(r);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isMobile]);

  // Inertia + snapping loop
  useEffect(() => {
    if (!enable3D) return;

    const animate = () => {
      if (!dragging) {
        const damping = isMobile ? 0.84 : (prefersReduced ? 0.88 : 0.95);
        const v = velocityRef.current * damping;
        if (Math.abs(v) > 0.01) {
          velocityRef.current = v;
          setRotation((r) => {
            const nr = r + v;
            rotationRef.current = nr;
            return nr;
          });
        } else {
          // Snap to nearest card (ease faster on mobile)
          const snapped = Math.round(rotationRef.current / step) * step;
          const diff = snapped - rotationRef.current;
          if (Math.abs(diff) > 0.5) {
            const nr = rotationRef.current + diff * (isMobile ? 0.35 : 0.2);
            rotationRef.current = nr;
            setRotation(nr);
          } else {
            rotationRef.current = snapped;
            setRotation(snapped);
          }
        }
      }
      // Update active index
      const idx = ((Math.round((-rotationRef.current) / step) % components.length) + components.length) % components.length;
      setActiveIndex(idx);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dragging, step, enable3D, components.length, isMobile, prefersReduced]);

  // Pointer interactions
  useEffect(() => {
    let lastT = 0;
    const onMove = (clientX: number) => {
      if (!dragging) return;
      const now = performance.now();
      if (isMobile && now - lastT < 16) return; // throttle on mobile ~60fps
      lastT = now;
      if (lastXRef.current === null) {
        lastXRef.current = clientX;
        return;
      }
      const dx = clientX - lastXRef.current;
      lastXRef.current = clientX;
      const sensitivity = isMobile ? 0.22 : 0.3;
      const delta = -dx * sensitivity;
      setRotation((r) => {
        const nr = r + delta;
        rotationRef.current = nr;
        return nr;
      });
      velocityRef.current = delta;
    };
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX);
    const onPointerUp = () => {
      setDragging(false);
      lastXRef.current = null;
      // Snap to nearest immediately on mobile to avoid idle RAF
      const snapped = Math.round(rotationRef.current / step) * step;
      rotationRef.current = snapped;
      setRotation(snapped);
    };
    if (dragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp, { once: true });
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, isMobile]);

  const onWheel = (e: React.WheelEvent) => {
    if (!enable3D) return;
    const delta = e.deltaY * (isMobile ? 0.06 : 0.1);
    setRotation((r) => {
      const nr = r + delta;
      rotationRef.current = nr;
      return nr;
    });
    velocityRef.current = delta;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!enable3D) return;
    if (e.key === "ArrowLeft") {
      velocityRef.current = 0;
      setRotation((r) => {
        const nr = r + step;
        rotationRef.current = nr;
        return nr;
      });
    } else if (e.key === "ArrowRight") {
      velocityRef.current = 0;
      setRotation((r) => {
        const nr = r - step;
        rotationRef.current = nr;
        return nr;
      });
    } else if (e.key === "Enter" || e.key === " ") {
      // Snap to active
      const snapped = Math.round(rotationRef.current / step) * step;
      rotationRef.current = snapped;
      setRotation(snapped);
    }
  };

  // Fallback grid for no 3D or reduced motion
  if (!enable3D) {
    return (
      <section className="py-20 bg-dark-gradient bg-diagonal-grid noise-overlay">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              Componenti <span className="text-[#ff7514]">premium</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-neutral-300">
              Ecco alcuni dei marchi che trovi nelle nostre build
            </p>
          </AnimatedElement>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {components.map((component, index) => (
              <AnimatedElement
                key={index}
                className="bg-neutral-900 p-5 rounded-xl text-center hover:bg-neutral-800 transition-colors"
                delay={0.1 * index}
              >
                <img
                  src={component.image}
                  alt={component.title}
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-lg"
                />
                <h3 className="font-medium text-[#ff7514]">{component.title}</h3>
                <p className="text-xs text-neutral-400">{component.brands}</p>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-dark-gradient bg-diagonal-grid noise-overlay" onWheel={onWheel}>
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Componenti <span className="text-[#ff7514]">premium</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Ecco alcuni dei marchi che trovi nelle nostre build
          </p>
        </AnimatedElement>

        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-4 h-[420px] md:h-[480px] flex items-center justify-center overflow-visible"          role="listbox"
          aria-label="Carosello componenti"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            setDragging(true);
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            lastXRef.current = e.clientX;
          }}
          style={{ perspective: isMobile ? "800px" : "1100px",perspectiveOrigin: isMobile ? "46% 50%" : "41% 50%", ["--wheel-offset" as any]: isMobile ? "-130px" : "-160px",} as React.CSSProperties}
        >

          {/* 3D stage with slight top-down tilt */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transformStyle: "preserve-3d", transform: "translateX(var(--wheel-offset)) rotateX(20deg)", }}
          >
            {components.map((component, i) => {
              const angle = i * step + rotation;
              const norm = ((angle % 360) + 360) % 360;
              const isActive = Math.abs(norm) < step / 2;
              const backface = norm > 90 && norm < 270; // backside culling
              const transform = `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle}deg)`; // rotation handled; stage has rotateX for top-down
              const depth = Math.cos((norm * Math.PI) / 180);
              return (
                <div
                  key={i}
                  role="option"
                  aria-selected={isActive}
                  aria-label={`${component.title} - ${component.brands}`}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-center ${isMobile ? 'bg-neutral-900' : 'bg-neutral-900/80 backdrop-blur-sm'} border border-white/5 transition-colors ${isActive && !isMobile ? "scale-105 shadow-[0_0_24px_rgba(255,117,20,0.25)]" : "scale-95 opacity-90"}`}
                  style={{ transform, willChange: isMobile ? "auto" : "transform, opacity",  pointerEvents: backface ? "none" : "auto",  zIndex: Math.round(1000 + depth * 1000), opacity: backface ? 0.5 : 1}}
                >
                  <div className="p-5 w-52 md:w-64">
                    <img
                      src={component.image}
                      alt={component.title}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover mx-auto mb-4 rounded-lg"
                    />
                    <h3 className="font-medium text-[#ff7514]">{component.title}</h3>
                    <p className="text-xs text-neutral-400">{component.brands}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
