import { faqs } from "@/data/faqs";
import { guides } from "@/data/guides";
import { getService, services } from "@/data/services";
import { assetUrl, pagePath, pageUrl, SITE_URL } from "@/lib/site";

export const buildSchema = (location: string) => {
  const path = pagePath(location);
  const business = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: "Prime Build",
    alternateName: "PrimeBuild",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: assetUrl("/logo.png"), width: 302, height: 302 },
    image: assetUrl("/og-image.png"),
    email: "preventivi@primebuild.website",
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
    sameAs: [
      "https://www.instagram.com/prime_build_/",
      "https://discord.gg/ERUwSxE79q",
      "https://github.com/PrimeBuild-pc",
    ],
    knowsAbout: ["PC gaming custom", "Assemblaggio PC", "Assistenza tecnica PC", "Ottimizzazione PC", "Latenza gaming"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi Prime Build",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, url: pageUrl(`/servizi/${service.slug}`) },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Prime Build",
    alternateName: "PrimeBuild",
    inLanguage: "it-IT",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  const graph: Record<string, unknown>[] = [business, website];

  if (path === "/") {
    graph.push(
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "PC Gaming su Misura a Padova | Prime Build",
        description: "Assemblaggio PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "it-IT",
      },
      {
        "@type": "ItemList",
        name: "Servizi Prime Build",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: pageUrl(`/servizi/${service.slug}`),
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
  } else if (path.startsWith("/servizi/")) {
    const service = getService(path.split("/").filter(Boolean).pop() ?? "");
    if (service) {
      const url = pageUrl(`/servizi/${service.slug}`);
      graph.push(
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: [{ "@type": "City", name: "Padova" }, { "@type": "Country", name: "Italia" }],
        },
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: service.title,
          description: service.metaDescription,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: { "@id": `${url}#service` },
          inLanguage: "it-IT",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Servizi", item: `${SITE_URL}/#services` },
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
  } else if (path === "/guides/") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${pageUrl("/guides")}#webpage`,
      url: pageUrl("/guides"),
      name: "Guide PC gaming e ottimizzazione",
      description: "Guide su PC gaming, latenza, rete, audio e ottimizzazione.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "it-IT",
    });
  } else if (path.startsWith("/guides/")) {
    const guide = guides.find((item) => pagePath(`/guides/${item.slug}`) === path);
    if (guide) {
      const url = pageUrl(path);
      graph.push(
        {
          "@type": "Article",
          "@id": `${url}#article`,
          headline: guide.title,
          description: guide.description,
          image: assetUrl(guide.image),
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
          author: { "@id": `${SITE_URL}/#business` },
          publisher: { "@id": `${SITE_URL}/#business` },
          mainEntityOfPage: { "@id": `${url}#webpage` },
          inLanguage: "it-IT",
        },
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: guide.title,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Guide", item: pageUrl("/guides") },
            { "@type": "ListItem", position: 3, name: guide.title, item: url },
          ],
        },
      );
    }
  } else if (path === "/chi-siamo/") {
    const url = pageUrl(path);
    graph.push({
      "@type": "AboutPage",
      "@id": `${url}#webpage`,
      url,
      name: "Chi siamo | Prime Build",
      description: "Metodo, servizi e contatti del team tecnico Prime Build a Montegrotto Terme, Padova.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "it-IT",
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};
