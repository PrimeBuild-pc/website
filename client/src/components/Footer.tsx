import { FaInstagram, FaDiscord, FaPaypal } from "react-icons/fa";
import { Link } from "wouter";
import { trackSocialClick, trackExternalLink } from "@/lib/analytics";

const Footer = () => {
  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url);
  };

  const handlePayPalClick = () => {
    trackExternalLink('PayPal Donation Footer', 'https://paypal.me/PrimeBuildOfficial');
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black py-14" role="contentinfo">
      <div className="section-glow -bottom-80 left-1/2 -translate-x-1/2 opacity-30" aria-hidden="true" />
      <div className="site-container">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[1.35fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 mr-2 relative">
                  <img
                    src="/logo.png"
                    alt="Prime Build Logo"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold font-montserrat">
                  PRIME<span className="text-primary">BUILD</span>
                </span>
              </div>
              <p className="mb-6 max-w-sm text-sm leading-6 text-neutral-400">
                Realizziamo PC Gaming su misura per un'esperienza di gioco senza compromessi
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/prime_build_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguici su Instagram"
                  onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:border-primary/30 hover:text-primary"
                >
                  <FaInstagram aria-hidden="true" />
                </a>
                <a
                  href="https://discord.gg/jBNk2vXKKd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Unisciti al nostro Discord"
                  onClick={() => handleSocialClick('Discord', 'https://discord.gg/jBNk2vXKKd')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:border-primary/30 hover:text-primary"
                >
                  <FaDiscord aria-hidden="true" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-neutral-200 font-montserrat">
                Link Rapidi
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <a href="#home" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Servizi
                  </a>
                </li>
                <li>
                  <a href="#builds" className="hover:text-primary transition-colors">
                    Le Nostre Build
                  </a>
                </li>
                <li>
                  <a href="#apps" className="hover:text-primary transition-colors">
                    App
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contatti
                  </a>
                </li>
                <li>
                  <a
                    href="https://paypal.me/PrimeBuildOfficial?country.x=IT&locale.x=it_IT"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handlePayPalClick}
                    aria-label="Supportaci con una donazione su PayPal"
                    className="text-[#0070BA] hover:text-[#003087] transition-colors flex items-center"
                  >
                    <FaPaypal className="mr-2" aria-hidden="true" /> Supportaci
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-neutral-200 font-montserrat">
                Servizi
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    PC Gaming Custom
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Riparazioni e Assistenza
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Ottimizzazione
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Consulenza Hardware
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-6 md:flex-row">
            <p className="text-neutral-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © {new Date().getFullYear()} Prime Build. Tutti i diritti riservati.
            </p>
            <nav className="flex space-x-6 text-neutral-500 text-sm order-1 md:order-2" aria-label="Link legali">
              <Link href="/privacy">
                <a className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/privacy">
                <a className="hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


