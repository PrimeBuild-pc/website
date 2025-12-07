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
      "description": "Prime Build offre servizi di assemblaggio PC Gaming su misura a Montegrotto Terme. Dall'idea alla consegna plug and play: build gaming, assistenza tecnica e ottimizzazione PC.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montegrotto Terme",
        "addressRegion": "PD",
        "postalCode": "35036",
        "addressCountry": "IT"
      },
      "email": "primebuild.official@gmail.com",
      "knowsAbout": ["PC Gaming Custom", "Assemblaggio PC", "Assistenza Tecnica PC", "Ottimizzazione PC", "Build Gaming", "Workstation"],
      "sameAs": [
        "https://www.instagram.com/prime_build_/",
        "https://discord.gg/bsqkAQQK5m"
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
      "description": "Servizio di assemblaggio PC Gaming su misura. Dall'idea alla consegna plug and play con supporto post-vendita e community Discord dedicata.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montegrotto Terme",
        "addressRegion": "Veneto",
        "postalCode": "35036",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.3297,
        "longitude": 11.7883
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      "priceRange": "€€",
      "areaServed": [
        {"@type": "City", "name": "Montegrotto Terme"},
        {"@type": "City", "name": "Abano Terme"},
        {"@type": "City", "name": "Padova"},
        {"@type": "AdministrativeArea", "name": "Provincia di Padova"},
        {"@type": "AdministrativeArea", "name": "Veneto"}
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi PC Gaming Build",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PRIME STARTER - Build Gaming Entry Level",
              "description": "Servizio completo di assemblaggio PC Gaming entry level per gaming 1080p. Include consulenza, assemblaggio, configurazione e ottimizzazione."
            },
            "price": "750",
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "750",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PRIME PERFORMER - Build Gaming Mid Range",
              "description": "Servizio completo di assemblaggio PC Gaming mid range per gaming 1440p. Include consulenza, assemblaggio, configurazione e ottimizzazione."
            },
            "price": "1500",
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "1500",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PRIME ELITE - Build Gaming High End",
              "description": "Servizio completo di assemblaggio PC Gaming high end per gaming 4K, streaming e workstation. Include consulenza, assemblaggio, configurazione e ottimizzazione."
            },
            "price": "2900",
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "2900",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true
            }
          }
        ]
      }
    };

    // Service Schema for detailed service descriptions
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Assemblaggio PC Gaming Custom",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Prime Build"
      },
      "areaServed": [
        {"@type": "City", "name": "Montegrotto Terme"},
        {"@type": "City", "name": "Abano Terme"},
        {"@type": "City", "name": "Padova"},
        {"@type": "AdministrativeArea", "name": "Veneto"}
      ],
      "description": "Servizio completo di assemblaggio PC Gaming su misura: dalla consulenza iniziale alla consegna plug and play. Include supporto post-vendita e accesso alla community Discord.",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "750",
        "highPrice": "2900",
        "priceCurrency": "EUR",
        "offerCount": "3"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Prime Build",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Assemblaggio PC Gaming",
              "description": "Servizio completo dall'idea alla consegna plug and play"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Assistenza Tecnica PC",
              "description": "Riparazione, manutenzione e pulizia PC"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ottimizzazione PC",
              "description": "Ottimizzazione software e hardware per massime prestazioni"
            }
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
            "text": "Prime Build offre un servizio completo di assemblaggio PC Gaming custom: dalla consulenza iniziale alla consegna plug and play. Include anche assistenza tecnica, riparazioni, pulizia e ottimizzazione PC. Ogni cliente ha accesso al server Discord con guide, supporto e community."
          }
        },
        {
          "@type": "Question",
          "name": "Dove si trova Prime Build?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prime Build opera a Montegrotto Terme, in provincia di Padova (Veneto). Serviamo clienti da Montegrotto Terme, Abano Terme, Padova e zone limitrofe. Puoi contattarci via email, Instagram (@prime_build_) o Discord."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto costa un PC Gaming custom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I nostri pacchetti completi (servizio + hardware) partono da circa 750€ per PRIME STARTER (gaming 1080p), 1500€ per PRIME PERFORMER (gaming 1440p), fino a 2900€ per PRIME ELITE (gaming 4K e workstation). I prezzi sono indicativi e variano in base al periodo e alla configurazione."
          }
        },
        {
          "@type": "Question",
          "name": "Come posso richiedere un preventivo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puoi richiedere un preventivo compilando il modulo di contatto sul nostro sito, scrivendoci via email a primebuild.official@gmail.com, su Instagram (@prime_build_) o sul nostro server Discord."
          }
        },
        {
          "@type": "Question",
          "name": "Cosa include il servizio post-vendita?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il servizio post-vendita include accesso al server Discord dedicato con guide aggiornate, supporto tecnico, e una community attiva. L'obiettivo è rendere ogni cliente un utente consapevole e attivo, non solo un acquirente."
          }
        }
      ]
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://primebuild.website/"},
        {"@type": "ListItem", "position": 2, "name": "Servizi", "item": "https://primebuild.website/#services"},
        {"@type": "ListItem", "position": 3, "name": "Build PC Gaming", "item": "https://primebuild.website/#builds"},
        {"@type": "ListItem", "position": 4, "name": "Contatti", "item": "https://primebuild.website/#contact"}
      ]
    };

    // WebSite schema for sitelinks search box
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Prime Build",
      "url": "https://primebuild.website/",
      "description": "Servizio di assemblaggio PC Gaming su misura a Montegrotto Terme"
    };

    const schemas = [organizationSchema, localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema, websiteSchema];

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