import { useEffect } from "react";

const SchemaMarkup = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Prime Build",
  "url": "https://primebuild.website/",
  "logo": "https://primebuild.website/logo.png",
      "description": "Prime Build realizza PC Gaming su misura per un'esperienza di gioco senza compromessi. Assemblaggio, assistenza tecnica e ottimizzazione PC a Padova, Italia.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Padova",
        "addressRegion": "PD",
        "addressCountry": "IT"
      },
      "email": "primebuild.official@gmail.com",
      "sameAs": [
        "https://www.instagram.com/prime_build_/",
        "https://discord.gg/jBNk2vXKKd"
      ],
      "offers": [
        {
          "@type": "Offer",
          "name": "PRIME STARTER",
          "description": "La configurazione ideale per chi vuole entrare nel mondo del gaming ad alte prestazioni senza spendere una fortuna.",
          "price": "750",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "PRIME PERFORMER",
          "description": "Potenza e prestazioni bilanciate per gaming in 1440p e multitasking intenso.",
          "price": "1450",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "PRIME ELITE",
          "description": "La soluzione definitiva per gaming 4K, streaming professionale e carichi di lavoro intensi.",
          "price": "3800",
          "priceCurrency": "EUR"
        }
      ],
      "service": [
        {
          "@type": "Service",
          "name": "PC Gaming Custom",
          "description": "Assembliamo il PC Gaming dei tuoi sogni con componenti di alta qualità, selezionati in base alle tue esigenze e al tuo budget."
        },
        {
          "@type": "Service",
          "name": "Riparazioni e Assistenza",
          "description": "Servizio di riparazione e assistenza tecnica professionale per risolvere qualsiasi problema hardware o software del tuo PC."
        },
        {
          "@type": "Service",
          "name": "Ottimizzazione",
          "description": "Massimizza le prestazioni del tuo PC con i nostri servizi di ottimizzazione, tweaking e boost per gaming e produttività."
        }
      ]
    };

    // Aggiunge lo schema JSON-LD alla pagina
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Questo componente non renderizza nulla visivamente
};

export default SchemaMarkup;