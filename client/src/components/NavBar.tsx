import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaInstagram, FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { trackSocialClick } from "@/lib/analytics";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleSocialClick = useCallback((platform: string, url: string) => {
    trackSocialClick(platform, url);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
      )}
      role="navigation"
      aria-label="Menu principale"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <div className="h-12 w-12 mr-2 relative">
              <img
                src="/logo.png"
                alt="Prime Build Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-bold font-montserrat">
              PRIME<span className="text-[#ff7514]">BUILD</span>
            </span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="font-medium hover:text-[#ff7514] transition-colors">Home</a>
          <a href="#services" className="font-medium hover:text-[#ff7514] transition-colors">Servizi</a>
          <a href="#builds" className="font-medium hover:text-[#ff7514] transition-colors">Build</a>
          <a href="#apps" className="font-medium hover:text-[#ff7514] transition-colors">App</a>
          <a href="#contact" className="font-medium hover:text-[#ff7514] transition-colors">Contatti</a>
          <div className="flex space-x-4 ml-4">
            <a
              href="https://www.instagram.com/prime_build_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
              className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href="https://discord.gg/jBNk2vXKKd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unisciti al nostro Discord"
              onClick={() => handleSocialClick('Discord', 'https://discord.gg/jBNk2vXKKd')}
              className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
            >
              <FaDiscord aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          className="md:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7514] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md p-1 z-50"
        >
          {isOpen ? <FaTimes className="text-2xl" aria-hidden="true" /> : <FaBars className="text-2xl" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-95 pb-4 px-4 overflow-hidden"
            role="menu"
          >
            <a href="#home" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-[#ff7514]">Home</a>
            <a href="#services" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-[#ff7514]">Servizi</a>
            <a href="#builds" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-[#ff7514]">Build</a>
            <a href="#apps" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-[#ff7514]">App</a>
            <a href="#contact" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-[#ff7514]">Contatti</a>
            <div className="flex space-x-4 p-4">
              <a
                href="https://www.instagram.com/prime_build_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguici su Instagram"
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
                className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#ff7514]"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://discord.gg/jBNk2vXKKd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unisciti al nostro Discord"
                onClick={() => handleSocialClick('Discord', 'https://discord.gg/jBNk2vXKKd')}
                className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#ff7514]"
              >
                <FaDiscord aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
