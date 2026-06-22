import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaInstagram, FaDiscord } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
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
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5",
        scrolled ? "translate-y-0" : "md:pt-5"
      )}
      role="navigation"
      aria-label="Menu principale"
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 transition duration-300 sm:px-4",
          scrolled
            ? "border-white/10 bg-black/80 shadow-2xl shadow-black/40 backdrop-blur-xl"
            : "border-white/10 bg-black/35 backdrop-blur-md"
        )}
      >
        <Link href="/" className="flex items-center rounded-xl pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="relative mr-2 h-10 w-10">
            <img
              src="/logo.png"
              alt="Prime Build Logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-base font-bold tracking-tight font-montserrat sm:text-lg">
            PRIME<span className="text-primary">BUILD</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 md:flex">
          <a href="/#home" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">Home</a>
          <a href="/#services" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">Servizi</a>
          <a href="/#builds" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">Build</a>
          <a href="/#apps" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">App</a>
          <Link href="/guides" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">
            Guide
          </Link>
          <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3">
            <a
              href="https://www.instagram.com/prime_build_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:border-primary/40 hover:text-primary"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href="https://discord.gg/jBNk2vXKKd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unisciti al nostro Discord"
              onClick={() => handleSocialClick('Discord', 'https://discord.gg/jBNk2vXKKd')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:border-primary/40 hover:text-primary"
            >
              <FaDiscord aria-hidden="true" />
            </a>
            <a href="/#contact" className="button-primary ml-1 min-h-9 px-4 py-2 text-sm">
              Preventivo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
          className="z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            role="menu"
          >
            <a href="/#home" onClick={closeMenu} role="menuitem" className="block rounded-xl px-4 py-3 font-medium text-neutral-200 hover:bg-white/5">Home</a>
            <a href="/#services" onClick={closeMenu} role="menuitem" className="block rounded-xl px-4 py-3 font-medium text-neutral-200 hover:bg-white/5">Servizi</a>
            <a href="/#builds" onClick={closeMenu} role="menuitem" className="block rounded-xl px-4 py-3 font-medium text-neutral-200 hover:bg-white/5">Build</a>
            <a href="/#apps" onClick={closeMenu} role="menuitem" className="block rounded-xl px-4 py-3 font-medium text-neutral-200 hover:bg-white/5">App</a>
            <Link href="/guides" onClick={closeMenu} role="menuitem" className="block rounded-xl px-4 py-3 font-medium text-neutral-200 hover:bg-white/5">
              Guide
            </Link>
            <a href="/#contact" onClick={closeMenu} role="menuitem" className="button-primary mt-2 w-full">Richiedi preventivo</a>
            <div className="mt-3 flex gap-3 border-t border-white/10 p-3 pt-4">
              <a
                href="https://www.instagram.com/prime_build_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguici su Instagram"
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-primary"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://discord.gg/jBNk2vXKKd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unisciti al nostro Discord"
                onClick={() => handleSocialClick('Discord', 'https://discord.gg/jBNk2vXKKd')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-primary"
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


