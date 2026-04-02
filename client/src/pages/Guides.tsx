import { Link } from "wouter";
import { motion } from "framer-motion";
import { guides } from "@/data/guides";
import BackgroundEffect from "@/components/BackgroundEffect";
import useSEO from "@/hooks/useSEO";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Guides = () => {
  useSEO({
    title: "Guide Tecniche | Prime Build",
    description:
      "Analisi tecniche, configurazioni avanzate e report per ottimizzare le tue performance competitive.",
  });

  return (
    <section className="relative isolate min-h-[calc(100vh-8rem)] bg-black text-white pt-28 pb-16 px-4 overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto relative z-10">
        <header className="mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-montserrat text-primary">
            Report Tecnici
          </h1>
          <p className="mt-3 text-sm md:text-base text-zinc-400 max-w-2xl">
            Analisi tecniche, configurazioni avanzate e report per ottimizzare le tue performance competitive.
          </p>
        </header>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {guides.map((guide) => (
            <motion.div key={guide.id} variants={cardVariants}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group block bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="aspect-square bg-zinc-900 overflow-hidden border-b border-white/10 grid place-items-center">
                  {guide.image ? (
                    <img
                      src={guide.image}
                      alt={`Copertina guida ${guide.title}`}
                      className="w-full h-full object-contain object-center"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 grid place-items-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-300/80">
                        Cover Preview
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary">
                    {guide.date}
                  </p>
                  <h2 className="mt-2 text-white font-bold text-lg leading-tight">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {guide.description}
                  </p>
                  <p className="mt-4 text-[11px] text-zinc-500 uppercase tracking-wider">
                    slug: {guide.slug}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Guides;

