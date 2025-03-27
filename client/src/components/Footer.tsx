import { FaInstagram, FaDiscord, FaPaperPlane, FaPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 mr-2 relative">
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
              </div>
              <p className="text-neutral-400 text-sm mb-6">
                Realizziamo PC Gaming su misura per un'esperienza di gioco senza compromessi
              </p>
              <div className="flex space-x-4">
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
            
            <div>
              <h4 className="text-lg font-bold font-montserrat mb-4 text-[#FF5722]">
                Link Rapidi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="#home" className="hover:text-[#FF5722] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#FF5722] transition-colors">
                    Servizi
                  </a>
                </li>
                <li>
                  <a href="#builds" className="hover:text-[#FF5722] transition-colors">
                    Le Nostre Build
                  </a>
                </li>
                <li>
                  <a href="#apps" className="hover:text-[#FF5722] transition-colors">
                    App
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#FF5722] transition-colors">
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
              <h4 className="text-lg font-bold font-montserrat mb-4 text-[#FF5722]">
                Servizi
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="#services" className="hover:text-[#FF5722] transition-colors">
                    PC Gaming Custom
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#FF5722] transition-colors">
                    Riparazioni e Assistenza
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#FF5722] transition-colors">
                    Ottimizzazione
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#FF5722] transition-colors">
                    Consulenza Hardware
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold font-montserrat mb-4 text-[#FF5722]">
                Newsletter
              </h4>
              <p className="text-neutral-400 text-sm mb-4">
                Iscriviti alla nostra newsletter per ricevere aggiornamenti e offerte speciali
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="bg-neutral-800 border border-neutral-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
                <button
                  type="button"
                  className="bg-[#FF5722] text-white px-4 py-2 rounded-r-md"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © {new Date().getFullYear()} Prime Build. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-neutral-500 text-sm order-1 md:order-2">
              <a href="#" className="hover:text-[#FF5722] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FF5722] transition-colors">
                Termini di Servizio
              </a>
              <a href="#" className="hover:text-[#FF5722] transition-colors">
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
