import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, CheckCircle2, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const trustItems = [
  "Configurazioni su misura",
  "Assemblaggio, test e ottimizzazione",
  "Supporto in tutta Italia",
];

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1 } };

  return (
    <section id="home" className="relative isolate min-h-[92svh] overflow-hidden pt-28 md:pt-32">
      <div className="section-grid" aria-hidden="true" />
      <div className="section-glow -left-48 top-20" aria-hidden="true" />
      <div className="section-glow -right-52 top-1/3 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="site-container flex min-h-[calc(92svh-7rem)] items-center pb-20">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-20">
          <div className="max-w-3xl">
            <motion.div
              {...reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-7"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              PC custom. Performance reale.
            </motion.div>

            <motion.h1
              {...reveal}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance font-montserrat text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              Il tuo prossimo PC,
              <span className="block bg-gradient-to-r from-orange-300 via-primary to-amber-500 bg-clip-text text-transparent">
                costruito senza compromessi.
              </span>
            </motion.h1>

            <motion.p
              {...reveal}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-balance text-lg leading-8 text-neutral-300 sm:text-xl"
            >
              Progettiamo, assembliamo e ottimizziamo PC gaming su misura, con componenti scelti per il tuo budget e il tuo utilizzo reale.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#builds"
                onClick={() => trackCTAClick("Scopri le Build", "hero")}
                className="button-primary"
              >
                Scopri le build
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={() => trackCTAClick("Richiedi un preventivo", "hero")}
                className="button-secondary"
              >
                Richiedi un preventivo
              </a>
            </motion.div>

            <motion.ul
              {...reveal}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 grid gap-3 text-sm text-neutral-400 sm:grid-cols-3"
            >
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { x: 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl lg:mx-0"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="surface-card p-3 sm:p-4">
              <div className="relative aspect-[4/4.25] overflow-hidden rounded-[1.35rem] sm:aspect-[4/3.8]">
                <img
                  src="/high.webp"
                  alt="PC gaming custom Prime Build con componenti di fascia alta"
                  width={720}
                  height={720}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="eyebrow border-white/10 bg-black/50 text-neutral-200">
                    Prime Elite
                  </span>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-neutral-400">Progettata per</p>
                      <p className="mt-1 text-xl font-semibold text-white sm:text-2xl">Gaming 4K e workstation</p>
                    </div>
                    <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary sm:flex">
                      <Gauge className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card absolute -left-3 top-8 flex items-center gap-3 px-4 py-3 sm:-left-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Ogni sistema</p>
                <p className="text-sm font-semibold text-white">Testato e ottimizzato</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Vai alla sezione servizi"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:text-primary md:flex"
      >
        Esplora
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
};

export default HeroSection;
