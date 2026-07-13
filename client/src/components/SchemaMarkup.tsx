import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { faqs } from "@/data/faqs";
import { guides } from "@/data/guides";
import { getService, services } from "@/data/services";

const SITE = "https://primebuild.website";
const absolute = (path: string) => new URL(path, SITE).toString();

const SchemaMarkup = () => {
  const [location] = useLocation();

  const schema = useMemo(() => {
    const business = {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE}/#business`,
      name: "Prime Build",
      alternateName: "PrimeBuild",
      url: `${SITE}/`,
      logo: { "@type": "ImageObject", url: absolute("/logo.png"), width: 302, height: 302 },
      image: absolute("/og-image.png"),
      email: "primebuild.official@gmail.com",
      description: "Assemblaggio PC gaming su misura, assistenza tecnica e ottimizzazione a Montegrotto Terme, Padova e in tutta Italia.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montegrotto Terme",
        postalCode: "35036",
        addressRegion: "PD",
        addressCountry: "IT",
      },
      geo: { "@type": "GeoCoordinates", latitude: 45.3166667, longitude: 11.7666667 },
      areaServed: [
        { "@type": "City", name: "Montegrotto Terme" },
        { "@type": "City", name: "Padova" },
        { "@type": "Country", name: "Italia" },
      ],
      priceRange: "€€",
      sameAs: ["https://www.instagram.com/prime_build_/", "https://discord.gg/ERUwSxE79q"],
      knowsAbout: ["PC gaming custom", "Assemblaggio PC", "Assistenza tecnica PC", "Ottimizzazione PC", "Latenza gaming"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servizi Prime Build",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.name, url: absolute(`/servizi/${service.slug}`) },
        })),
      },
    };

    const website = {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Prime Build",
      alternateName: "PrimeBuild",
      inLanguage: "it-IT",
      publisher: { "@id": `${SITE}/#business` },
    };

    const graph: Record<string, unknown>[] = [business, website];

    if (location === "/") {
      graph.push(
        {
          "@type": "WebPage",
          "@id": `${SITE}/#webpage`,
          url: `${SITE}/`,
          name: "PC Gaming su Misura a Padova | Prime Build",
          description: "Assemblaggio PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia.",
          isPartOf: { "@id": `${SITE}/#website` },
          about: { "@id": `${SITE}/#business` },
          inLanguage: "it-IT",
        },
        {
          "@type": "ItemList",
          name: "Servizi Prime Build",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: absolute(`/servizi/${service.slug}`),
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      );
    } else if (location.startsWith("/servizi/")) {
      const service = getService(location.split("/").filter(Boolean).pop() ?? "");
      if (service) {
        const url = absolute(`/servizi/${service.slug}`);
        graph.push(
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.name,
            serviceType: service.name,
            description: service.metaDescription,
            url,
            provider: { "@id": `${SITE}/#business` },
            areaServed: [{ "@type": "City", name: "Padova" }, { "@type": "Country", name: "Italia" }],
          },
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: service.title,
            description: service.metaDescription,
            isPartOf: { "@id": `${SITE}/#website` },
            mainEntity: { "@id": `${url}#service` },
            inLanguage: "it-IT",
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Servizi", item: `${SITE}/#services` },
              { "@type": "ListItem", position: 3, name: service.name, item: url },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: service.questions.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        );
      }
    } else if (location === "/guides") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${SITE}/guides#webpage`,
        url: `${SITE}/guides`,
        name: "Guide tecniche Prime Build",
        description: "Guide su PC gaming, latenza, rete, audio e ottimizzazione.",
        isPartOf: { "@id": `${SITE}/#website` },
        inLanguage: "it-IT",
      });
    } else if (location.startsWith("/guides/")) {
      const guide = guides.find((item) => `/guides/${item.slug}` === location);
      if (guide) {
        const url = absolute(location);
        graph.push(
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: guide.title,
            description: guide.description,
            image: absolute(guide.image),
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            author: { "@id": `${SITE}/#business` },
            publisher: { "@id": `${SITE}/#business` },
            mainEntityOfPage: { "@id": `${url}#webpage` },
            inLanguage: "it-IT",
          },
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: guide.title,
            isPartOf: { "@id": `${SITE}/#website` },
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Guide", item: `${SITE}/guides` },
              { "@type": "ListItem", position: 3, name: guide.title, item: url },
            ],
          },
        );
      }
    }

    return { "@context": "https://schema.org", "@graph": graph };
  }, [location]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "primebuild-schema";
    script.text = JSON.stringify(schema);
    document.head.querySelector("#primebuild-schema")?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, [schema]);

  return null;
};

export default SchemaMarkup;
