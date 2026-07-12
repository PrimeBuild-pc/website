import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => (
  <section id="home" className="relative isolate min-h-screen overflow-hidden bg-[#070707] pt-24">
    <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
    <div className="absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[130px]" aria-hidden="true" />
    <div className="absolute right-[-12rem] top-[-10rem] h-[38rem] w-[38rem] rounded-full border border-white/5" aria-hidden="true" />

    <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
      <motion.div initial={false} animate="visible" transition={{ staggerChildren: 0.12 }} className="relative z-10">
        <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-300 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Custom PC · Padova
        </motion.div>

        <motion.h1 variants={reveal} transition={{ duration: 0.65 }} className="max-w-3xl font-montserrat text-[clamp(3.6rem,8vw,7rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
          POTENZA,
          <span className="block text-neutral-500">DISEGNATA</span>
          <span className="block text-primary">PER TE.</span>
          <span className="sr-only">Prime Build assembla PC gaming su misura</span>
        </motion.h1>

        <motion.p variants={reveal} transition={{ duration: 0.6 }} className="mt-8 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Non vendiamo configurazioni standard. Progettiamo macchine uniche, assemblate con precisione e ottimizzate per dare il massimo dal primo avvio.
        </motion.p>

        <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" onClick={() => trackCTAClick("Configura il tuo PC", "hero")} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 font-semibold text-black transition hover:bg-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black">
            Configura il tuo PC
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a href="#builds" onClick={() => trackCTAClick("Esplora le build", "hero")} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 font-medium text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Esplora le build
          </a>
        </motion.div>

        <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-neutral-400">
          {["Consulenza diretta", "Cable management premium", "Supporto post-vendita"].map((item) => (
            <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" aria-hidden="true" />{item}</span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={false} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
        <div className="absolute -inset-10 rounded-full border border-primary/15 hero-orbit" aria-hidden="true" />
        <div className="absolute -inset-20 rounded-full border border-dashed border-white/10 hero-orbit-reverse" aria-hidden="true" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-white/10 bg-neutral-900 shadow-2xl shadow-black">
          <img src="/18.webp" alt="PC gaming Prime Build con illuminazione arancione e scheda grafica GeForce RTX" width={720} height={1280} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Latest build</p>
              <p className="mt-1 font-montserrat text-xl font-semibold">Obsidian / 01</p>
            </div>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">RTX Series</span>
          </div>
        </div>
        <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-8 top-16 hidden rounded-2xl border border-white/10 bg-black/70 p-4 shadow-xl backdrop-blur-xl sm:block">
          <p className="text-2xl font-semibold text-white">100%</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">Su misura</p>
        </motion.div>
      </motion.div>
    </div>

    <a href="#services" aria-label="Vai ai servizi" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:text-white md:flex">
      Scopri <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
    </a>
  </section>
);

export default HeroSection;
