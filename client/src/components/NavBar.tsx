import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaInstagram, FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300", 
        scrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <div className="h-12 w-12 mr-2 relative">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full"
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
            </div>
            <span className="text-xl font-bold font-montserrat">
              PRIME<span className="text-[#FF5722]">BUILD</span>
            </span>
          </a>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="font-medium hover:text-[#FF5722] transition-colors">Home</a>
          <a href="#services" className="font-medium hover:text-[#FF5722] transition-colors">Servizi</a>
          <a href="#builds" className="font-medium hover:text-[#FF5722] transition-colors">Build</a>
          <a href="#apps" className="font-medium hover:text-[#FF5722] transition-colors">App</a>
          <a href="#contact" className="font-medium hover:text-[#FF5722] transition-colors">Contatti</a>
          <div className="flex space-x-4 ml-4">
            <a 
              href="https://www.instagram.com/prime_build_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neutral-800 hover:bg-[#FF5722] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://discord.gg/jBNk2vXKKd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-neutral-800 hover:bg-[#FF5722] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <FaDiscord />
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white focus:outline-none z-50"
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-95 pb-4 px-4 overflow-hidden"
          >
            <a href="#home" onClick={closeMenu} className="block py-2 px-4 hover:bg-neutral-800 rounded">Home</a>
            <a href="#services" onClick={closeMenu} className="block py-2 px-4 hover:bg-neutral-800 rounded">Servizi</a>
            <a href="#builds" onClick={closeMenu} className="block py-2 px-4 hover:bg-neutral-800 rounded">Build</a>
            <a href="#apps" onClick={closeMenu} className="block py-2 px-4 hover:bg-neutral-800 rounded">App</a>
            <a href="#contact" onClick={closeMenu} className="block py-2 px-4 hover:bg-neutral-800 rounded">Contatti</a>
            <div className="flex space-x-4 p-4">
              <a 
                href="https://www.instagram.com/prime_build_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-[#FF5722] p-2 rounded-full flex items-center justify-center transition-all"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://discord.gg/jBNk2vXKKd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-[#FF5722] p-2 rounded-full flex items-center justify-center transition-all"
              >
                <FaDiscord />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
