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
      "knowsAbout": ["PC Gaming Custom", "Assemblaggio PC", "Assistenza Tecnica PC", "Ottimizzazione PC", "Build Gaming", "Workstation"],
      "sameAs": [
        "https://www.instagram.com/prime_build_/",
        "https://discord.gg/BcPsRQqJ4s"
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
        "postalCode": "35036",
        "addressRegion": "PD",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.3166667,
        "longitude": 11.7666667
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      "priceRange": "€€",
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

    const schemas = [organizationSchema, localBusinessSchema, serviceSchema, breadcrumbSchema, websiteSchema];

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
