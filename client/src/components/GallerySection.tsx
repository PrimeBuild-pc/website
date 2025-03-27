import { motion } from "framer-motion";
import AnimatedElement from "@/lib/AnimatedElement";

const GallerySection = () => {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "PC Gaming custom con illuminazione RGB"
    },
    {
      src: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Setup completo da gaming"
    },
    {
      src: "https://images.unsplash.com/photo-1591489378430-ef2f4c26b779?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Componenti hardware di ultima generazione"
    },
    {
      src: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Case PC con cable management professionale"
    }
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            La <span className="text-[#FF5722]">Nostra Galleria</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Alcuni dei nostri lavori più recenti
          </p>
        </AnimatedElement>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <AnimatedElement 
              key={index} 
              className="rounded-lg overflow-hidden" 
              delay={0.1 * index}
            >
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
      </div>
    </section>
  );
};

export default GallerySection;
