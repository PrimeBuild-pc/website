import { CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Cog } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const backgrounds = ["geometry", "matrix", "gears"] as const;
type Background = (typeof backgrounds)[number];

const pickBackground = (): Background => {
  const requested = new URLSearchParams(location.search).get("background");
  if (backgrounds.includes(requested as Background)) return requested as Background;

  try {
    const previous = sessionStorage.getItem("primebuild-background");
    const choices = backgrounds.filter((item) => item !== previous);
    const selected = choices[Math.floor(Math.random() * choices.length)];
    sessionStorage.setItem("primebuild-background", selected);
    return selected;
  } catch {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }
};

const HeroBackground = ({ variant }: { variant: Background }) => {
  if (variant === "matrix") {
    return (
      <div className="matrix-field absolute inset-0" aria-hidden="true">
        <div className="matrix-reticle"><span /><span /><span /></div>
        <div className="matrix-panel matrix-panel-a"><b>PRIME // CORE</b><span>BUILD STATUS: READY</span><span>THERMAL LINK: STABLE</span></div>
        <div className="matrix-panel matrix-panel-b"><b>SYS.01</b><span>LATENCY 01.6MS</span><span>FRAME SYNC ACTIVE</span></div>
        <div className="matrix-bracket matrix-bracket-left" />
        <div className="matrix-bracket matrix-bracket-right" />
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="matrix-column"
            style={{
              left: `${1 + index * 5.7}%`,
              animationDuration: `${8 + (index % 5) * 1.3}s`,
              animationDelay: `${-index * 0.73}s`,
            }}
          >
            {index % 3 === 0 ? "01001101011010010100110101101001" : "10110010100101100110100100110110"}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "gears") {
    const gears = [
      ["5%", "10%", "17rem", "gear-clockwise"],
      ["23%", "56%", "11rem", "gear-counter"],
      ["56%", "5%", "23rem", "gear-counter"],
      ["71%", "59%", "15rem", "gear-clockwise"],
      ["87%", "27%", "9rem", "gear-counter"],
      ["45%", "73%", "7rem", "gear-clockwise"],
    ];
    return (
      <div className="gear-field absolute inset-0" aria-hidden="true">
        <div className="hero-glow" />
        <div className="gear-belt gear-belt-a" />
        <div className="gear-belt gear-belt-b" />
        <div className="gear-blueprint gear-blueprint-a">DRIVE TRAIN / 01</div>
        <div className="gear-blueprint gear-blueprint-b">TORQUE SYNC / ACTIVE</div>
        {gears.map(([left, top, size, animation], index) => (
          <div
            key={`${left}-${top}`}
            className={`hero-gear ${animation}`}
            style={{ left, top, width: size, height: size, animationDelay: `${-index * 1.7}s` } as CSSProperties}
          >
            <Cog className="gear-icon" strokeWidth={0.8} />
            <span className="gear-inner" />
            <span className="gear-hub" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hero-geometry absolute inset-0" aria-hidden="true">
      <div className="hero-glow" />
      <div className="hero-ring hero-ring-one" />
      <div className="hero-ring hero-ring-two" />
      <div className="hero-prism" />
      <div className="hero-scan" />
    </div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [background] = useState(pickBackground);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className={`relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#050505] pt-24 ${isVisible ? "" : "motion-idle"}`}>
      <HeroBackground variant={background} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 text-center sm:px-8">
        <p className="hero-enter mx-auto mb-7 flex max-w-full w-fit items-center justify-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-300 backdrop-blur-xl sm:text-[0.68rem] sm:tracking-[0.22em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
          Montegrotto Terme · 35036 (PD)
        </p>

        <h1 className="mx-auto font-montserrat font-semibold uppercase leading-[0.77] tracking-[-0.075em]" aria-label="Prime Build — PC gaming su misura">
          <span className="brand-enter-left block text-[clamp(4.2rem,15vw,12.5rem)] text-white">Prime</span>
          <span className="brand-enter-right block text-[clamp(4.2rem,15vw,12.5rem)] text-primary">Build</span>
        </h1>

        <div className="mx-auto mt-10 max-w-2xl">
          <p className="text-base leading-relaxed text-neutral-300 sm:text-lg md:text-xl">
            PC gaming progettati intorno a te. Consulenza reale, assemblaggio preciso e prestazioni ottimizzate senza sprechi.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" onClick={() => trackCTAClick("Configura il tuo PC", "hero")} className="button-primary group">
              Configura il tuo PC
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#services" className="button-secondary">Scopri Prime Build</a>
          </div>
        </div>

        <div className="hero-enter hero-enter-delay mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-neutral-400 sm:text-sm">
          {["Preventivo gratuito", "Componenti selezionati", "Supporto post-vendita"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {item}
            </span>
          ))}
        </div>
      </div>

      <a href="#services" aria-label="Vai ai servizi" className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-neutral-500 transition hover:text-white sm:flex">
        Esplora <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
};

export default HeroSection;
