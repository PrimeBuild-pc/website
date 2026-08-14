import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
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
      className="fixed inset-x-0 top-0 z-50 px-3"
      role="navigation"
      aria-label="Menu principale"
    >
      <div className={cn(
        "mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:px-5",
        scrolled ? "border-white/15 bg-black/85 shadow-2xl shadow-black/40 backdrop-blur-2xl" : "border-white/10 bg-black/45 backdrop-blur-xl"
      )}>
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png?v=20260814" alt="Prime Build" width={38} height={38} className="h-9 w-9 object-contain" />
          <span className="font-montserrat text-sm font-semibold tracking-[0.12em]">
            PRIME<span className="text-primary">BUILD</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-7 md:flex">
          <a href="/#services" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">Servizi</a>
          <a href="/#builds" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">Build</a>
          <a href="/#apps" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">App</a>
          <Link href="/guides/" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">Guide</Link>
          <Link href="/chi-siamo/" className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">Chi siamo</Link>
          <a href="/#contact" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-primary">Parliamone</a>
          <div className="ml-1 flex gap-2">
            <a
              href="https://www.instagram.com/prime_build_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition hover:border-primary/50 hover:text-primary"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href="https://discord.gg/ERUwSxE79q"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unisciti al nostro Discord"
              onClick={() => handleSocialClick('Discord', 'https://discord.gg/ERUwSxE79q')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition hover:border-primary/50 hover:text-primary"
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
          className="z-50 rounded-full border border-white/10 p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {isOpen ? <FaTimes className="text-2xl" aria-hidden="true" /> : <FaBars className="text-2xl" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu-enter mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-black/95 px-4 pb-4 pt-2 shadow-2xl backdrop-blur-2xl md:hidden"
            role="menu"
          >
            <a href="/#home" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">Home</a>
            <a href="/#services" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">Servizi</a>
            <a href="/#builds" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">Build</a>
            <a href="/#apps" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">App</a>
            <Link href="/guides/" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">
              Guide
            </Link>
            <Link href="/chi-siamo/" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">
              Chi siamo
            </Link>
            <a href="/#contact" onClick={closeMenu} role="menuitem" className="block py-2 px-4 hover:bg-neutral-800 rounded focus-visible:ring-2 focus-visible:ring-primary">Contatti</a>
            <div className="flex space-x-4 p-4">
              <a
                href="https://www.instagram.com/prime_build_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguici su Instagram"
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
                className="bg-neutral-800 hover:bg-primary p-2 rounded-full flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href="https://discord.gg/ERUwSxE79q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unisciti al nostro Discord"
                onClick={() => handleSocialClick('Discord', 'https://discord.gg/ERUwSxE79q')}
                className="bg-neutral-800 hover:bg-primary p-2 rounded-full flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary"
              >
                <FaDiscord aria-hidden="true" />
              </a>
            </div>
          </div>
      )}
    </nav>
  );
};

export default NavBar;


