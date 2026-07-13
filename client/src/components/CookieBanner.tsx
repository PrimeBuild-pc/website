import { useState, useEffect } from "react";
import { initializeAnalytics } from "@/lib/analytics";
import { Link } from "wouter";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => !localStorage.getItem('cookie-consent'));

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') initializeAnalytics();
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

  if (!isVisible) return null;

  return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Informativa Cookie
                </h3>
                <p className="text-sm text-neutral-300">
                  Usiamo cookie tecnici e, solo con il tuo consenso, Google Analytics.{" "}
                  <Link href="/privacy" className="text-primary hover:underline">Leggi la Privacy Policy</Link>
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
                  className="px-6 py-2.5 text-sm font-semibold text-black bg-primary hover:bg-primary rounded-lg transition-colors"
                >
                  Accetta
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default CookieBanner;


