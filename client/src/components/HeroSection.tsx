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
            <svg
              className="h-24 w-24 mx-auto"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="black" stroke="white" strokeWidth="2" />
              <text
                x="50%"
                y="35%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontFamily="Montserrat, sans-serif"
                fontWeight="bold"
                letterSpacing="1"
              >
                PRIME
              </text>
              <g transform="translate(50, 50) scale(0.4)">
                <rect x="-25" y="-25" width="50" height="50" fill="none" stroke="white" strokeWidth="5" />
                <line x1="-25" y1="-15" x2="25" y2="-15" stroke="white" strokeWidth="5" />
                <line x1="-25" y1="0" x2="25" y2="0" stroke="white" strokeWidth="5" />
                <line x1="-25" y1="15" x2="25" y2="15" stroke="white" strokeWidth="5" />
                <line x1="-15" y1="-25" x2="-15" y2="25" stroke="white" strokeWidth="5" />
                <line x1="15" y1="-25" x2="15" y2="25" stroke="white" strokeWidth="5" />
                <line x1="-25" y1="-25" x2="0" y2="0" stroke="white" strokeWidth="5" />
              </g>
              <text
                x="50%"
                y="75%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontFamily="Montserrat, sans-serif"
                fontWeight="bold"
                letterSpacing="1"
              >
                BUILD
              </text>
              <circle cx="15" cy="50" r="3" fill="white" />
              <circle cx="85" cy="50" r="3" fill="white" />
            </svg>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold font-montserrat mb-4"
          >
            <span className="block">PRIME</span>
            <span className="text-[#FF5722]">BUILD</span>
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
              className="bg-[#FF5722] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
            >
              Scopri le Build
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white hover:border-[#FF5722] hover:text-[#FF5722] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105"
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
