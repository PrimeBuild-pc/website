import { FaInstagram, FaDiscord, FaPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 mr-2 relative">
                  <img 
                    src="https://i.postimg.cc/FKyRC3Vh/logo.png" 
                    alt="Prime Build Logo" 
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
                  className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://discord.gg/jBNk2vXKKd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-800 hover:bg-[#ff7514] p-2 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1"
                >
                  <FaDiscord />
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
                  <a href="https://paypal.me/PrimeBuildOfficial?country.x=IT&locale.x=it_IT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0070BA] hover:text-[#003087] transition-colors flex items-center">
                    <FaPaypal className="mr-2" /> Supportaci
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
            <div className="flex space-x-6 text-neutral-500 text-sm order-1 md:order-2">
              <a href="#" className="hover:text-[#ff7514] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#ff7514] transition-colors">
                Termini di Servizio
              </a>
              <a href="#" className="hover:text-[#ff7514] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
