import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedElement from "@/lib/AnimatedElement";

const GallerySection = () => {
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
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            La <span className="text-[#ff7514]">nostra galleria</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Alcuni dei nostri lavori più recenti
          </p>
        </AnimatedElement>

        <Carousel />
      </div>
    </section>
  );
};

export default GallerySection;

const Carousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
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
        className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar pr-2"
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-label="Galleria di immagini"
        role="listbox"
      >
        {galleryImages.map((image, index) => (
          <AnimatedElement key={index} className="rounded-lg overflow-hidden min-w-[250px] md:min-w-[300px] lg:min-w-[360px] snap-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="h-64 w-full"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatedElement>
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

