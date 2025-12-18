import { useEffect } from "react";

const SchemaMarkup = () => {
  useEffect(() => {
    // Main Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Prime Build",
      "url": "https://primebuild.website/",
      "logo": "https://primebuild.website/logo.png",
      "description": "Prime Build realizza PC Gaming su misura per un'esperienza di gioco senza compromessi. Assemblaggio, assistenza tecnica e ottimizzazione PC a Montegrotto Terme (PD) e Padova.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montegrotto Terme",
        "postalCode": "35036",
        "addressRegion": "PD",
        "addressCountry": "IT"
      },
      "email": "primebuild.official@gmail.com",
      "sameAs": [
        "https://www.instagram.com/prime_build_/",
        "https://discord.gg/jBNk2vXKKd"
      ]
    };

    // LocalBusiness schema for better local SEO
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Prime Build",
      "image": "https://primebuild.website/logo.png",
      "url": "https://primebuild.website/",
      "email": "primebuild.official@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montegrotto Terme",
        "postalCode": "35036",
        "addressRegion": "PD",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.3166667,
        "longitude": 11.7666667
      },
      "priceRange": "€€",
      "servesCuisine": "PC Gaming Custom, Assistenza Tecnica",
      "areaServed": [
        {
          "@type": "City",
          "name": "Montegrotto Terme"
        },
        {
          "@type": "City",
          "name": "Padova"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "PC Gaming Build",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "PRIME STARTER",
              "description": "La configurazione ideale per chi vuole entrare nel mondo del gaming ad alte prestazioni senza spendere una fortuna."
            },
            "price": "750",
            "priceCurrency": "EUR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "PRIME PERFORMER",
              "description": "Potenza e prestazioni bilanciate per gaming in 1440p e multitasking intenso."
            },
            "price": "1450",
            "priceCurrency": "EUR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "PRIME ELITE",
              "description": "La soluzione definitiva per gaming 4K, streaming professionale e carichi di lavoro intensi."
            },
            "price": "3800",
            "priceCurrency": "EUR"
          }
        ]
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quali servizi offre Prime Build?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prime Build offre assemblaggio di PC Gaming custom, riparazioni e assistenza tecnica, e servizi di ottimizzazione delle prestazioni per PC."
          }
        },
        {
          "@type": "Question",
          "name": "Dove si trova Prime Build?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prime Build ha sede a Montegrotto Terme (PD). Offriamo servizi anche su Padova. Puoi contattarci via email o attraverso i nostri canali social (Instagram e Discord)."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto costa un PC Gaming custom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I nostri PC Gaming partono da 750 euro per la configurazione PRIME STARTER, 1450 euro per PRIME PERFORMER, fino a 3800 euro per PRIME ELITE. Offriamo anche configurazioni personalizzate su richiesta."
          }
        },
        {
          "@type": "Question",
          "name": "Come posso richiedere un preventivo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puoi richiedere un preventivo compilando il modulo di contatto sul nostro sito, oppure contattandoci su Instagram (@prime_build_) o Discord."
          }
        }
      ]
    };

    // WebSite schema for sitelinks search box
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Prime Build",
      "url": "https://primebuild.website/"
    };

    const schemas = [organizationSchema, localBusinessSchema, faqSchema, websiteSchema];

    const scripts: HTMLScriptElement[] = [];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-markup-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};

export default SchemaMarkup;