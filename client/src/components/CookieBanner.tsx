import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initializeAnalytics } from "@/lib/analytics";
import { Link } from "wouter";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to avoid layout shift on initial load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      // Initialize analytics if previously accepted
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    initializeAnalytics();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Informativa Cookie
                </h3>
                <p className="text-sm text-neutral-300">
                  Utilizziamo cookie tecnici e di analisi (Google Analytics) per migliorare
                  la tua esperienza di navigazione. I dati raccolti sono anonimi e servono
                  solo a capire come viene utilizzato il sito.{" "}
                  <Link href="/privacy">
                    <a className="text-[#ff7514] hover:underline">
                      Leggi la Privacy Policy
                    </a>
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 text-sm font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  Rifiuta
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-[#ff7514] hover:bg-[#e56812] rounded-lg transition-colors"
                >
                  Accetta
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
