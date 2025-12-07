import { Link } from "wouter";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-lg">
        <FaExclamationTriangle className="text-[#ff7514] text-6xl mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-5xl md:text-6xl font-bold font-montserrat text-white mb-4">
          4<span className="text-[#ff7514]">0</span>4
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Pagina non trovata
        </h2>
        <p className="text-neutral-400 mb-8">
          La pagina che stai cercando non esiste o e stata spostata.
        </p>
        <Link href="/">
          <a className="inline-flex items-center bg-[#ff7514] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105">
            <FaHome className="mr-2" aria-hidden="true" />
            Torna alla Home
          </a>
        </Link>
      </div>
    </div>
  );
}
