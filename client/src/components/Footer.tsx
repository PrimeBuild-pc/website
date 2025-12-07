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
    <footer className="bg-black py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
                  PRIME<span className="text-[#ff7514]">BUILD</span>
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
            
            <div>
              <h4 className="text-lg font-bold font-montserrat mb-4 text-[#ff7514]">
                Link Rapidi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="#home" className="hover:text-[#ff7514] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#ff7514] transition-colors">
                    Servizi
                  </a>
                </li>
                <li>
                  <a href="#builds" className="hover:text-[#ff7514] transition-colors">
                    Le Nostre Build
                  </a>
                </li>
                <li>
                  <a href="#apps" className="hover:text-[#ff7514] transition-colors">
                    App
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#ff7514] transition-colors">
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
              <h4 className="text-lg font-bold font-montserrat mb-4 text-[#ff7514]">
                Servizi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="#services" className="hover:text-[#ff7514] transition-colors">
                    PC Gaming Custom
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#ff7514] transition-colors">
                    Riparazioni e Assistenza
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#ff7514] transition-colors">
                    Ottimizzazione
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#ff7514] transition-colors">
                    Consulenza Hardware
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © {new Date().getFullYear()} Prime Build. Tutti i diritti riservati.
            </p>
            <nav className="flex space-x-6 text-neutral-500 text-sm order-1 md:order-2" aria-label="Link legali">
              <Link href="/privacy">
                <a className="hover:text-[#ff7514] transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/privacy">
                <a className="hover:text-[#ff7514] transition-colors">
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
