import { Link } from "wouter";
import { FaHome, FaExclamationTriangle, FaDesktop, FaEnvelope, FaTools } from "react-icons/fa";

export default function NotFound() {
  const quickLinks = [
    { href: "/#services", icon: <FaDesktop />, label: "I nostri servizi" },
    { href: "/#builds", icon: <FaTools />, label: "Le nostre build" },
    { href: "/#contact", icon: <FaEnvelope />, label: "Contattaci" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-xl">
        <FaExclamationTriangle className="text-[#ff7514] text-6xl mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-5xl md:text-6xl font-bold font-montserrat text-white mb-4">
          4<span className="text-[#ff7514]">0</span>4
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Pagina non trovata
        </h2>
        <p className="text-neutral-400 mb-8">
          La pagina che stai cercando non esiste o potrebbe essere stata spostata.
          Prova uno dei link qui sotto o torna alla home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <a className="inline-flex items-center justify-center bg-[#ff7514] hover:bg-[#e06500] text-black font-semibold py-3 px-8 rounded-md transition-all transform hover:scale-105">
              <FaHome className="mr-2" aria-hidden="true" />
              Torna alla Home
            </a>
          </Link>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <p className="text-neutral-500 text-sm mb-4">Link utili:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center text-neutral-400 hover:text-[#ff7514] transition-colors"
              >
                <span className="mr-2" aria-hidden="true">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
