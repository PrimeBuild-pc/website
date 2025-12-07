import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import { FaChevronDown } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <ParticleCanvas />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-6"
          >
            <img
              src="/logo.png"
              alt="Prime Build Logo"
              width={96}
              height={96}
              className="h-24 mx-auto object-contain"
            />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold font-montserrat mb-4"
          >
            <span className="block">PRIME</span>
            <span className="text-[#ff7514]">BUILD</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl font-light mb-8 text-neutral-300"
          >
            Realizziamo PC Gaming su misura <br />per un'esperienza di gioco senza compromessi
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#builds"
              className="bg-[#ff7514] hover:bg-[#e06500] text-black font-semibold py-3 px-8 rounded-md transition-all transform hover:scale-105"
            >
              Scopri le Build
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white hover:border-[#ff7514] hover:text-[#ff7514] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
            >
              Contattaci
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <a
          href="#services"
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          <FaChevronDown className="text-2xl" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
