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
    <footer className="border-t border-white/[0.08] bg-[#050505] py-14" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
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
              <p className="text-neutral-400 text-sm mb-6">
                Realizziamo PC Gaming su misura per un'esperienza di gioco senza compromessi
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/prime_build_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguici su Instagram"
                  onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/prime_build_/')}
                  className="bg-neutral-800 hover:bg-primary p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
                >
                  <FaInstagram aria-hidden="true" />
                </a>
                <a
                  href="https://discord.gg/ERUwSxE79q"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Unisciti al nostro Discord"
                  onClick={() => handleSocialClick('Discord', 'https://discord.gg/ERUwSxE79q')}
                  className="bg-neutral-800 hover:bg-primary p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
                >
                  <FaDiscord aria-hidden="true" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold font-montserrat mb-4 text-primary">
                Link Rapidi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="/#home" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-primary transition-colors">
                    Servizi
                  </a>
                </li>
                <li>
                  <a href="/#builds" className="hover:text-primary transition-colors">
                    Le Nostre Build
                  </a>
                </li>
                <li>
                  <a href="/#apps" className="hover:text-primary transition-colors">
                    App
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-primary transition-colors">
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
                    className="flex items-center text-[#168bd2] transition-colors hover:text-[#4eb2ec]"
                  >
                    <FaPaypal className="mr-2" aria-hidden="true" /> Supportaci
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold font-montserrat mb-4 text-primary">
                Servizi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="/servizi/pc-gaming-su-misura" className="hover:text-primary transition-colors">
                    PC Gaming Custom
                  </a>
                </li>
                <li>
                  <a href="/servizi/assistenza-riparazione-pc" className="hover:text-primary transition-colors">
                    Riparazioni e Assistenza
                  </a>
                </li>
                <li>
                  <a href="/servizi/ottimizzazione-pc-gaming" className="hover:text-primary transition-colors">
                    Ottimizzazione
                  </a>
                </li>
                <li>
                  <a href="/servizi/pc-gaming-su-misura" className="hover:text-primary transition-colors">
                    Consulenza Hardware
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="order-2 mt-4 text-sm text-neutral-400 md:order-1 md:mt-0">
              © {new Date().getFullYear()} Prime Build. Tutti i diritti riservati.
            </p>
            <nav className="order-1 flex space-x-6 text-sm text-neutral-400 md:order-2" aria-label="Link legali">
              <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
              <Link href="/privacy" className="transition-colors hover:text-primary">Cookie Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


