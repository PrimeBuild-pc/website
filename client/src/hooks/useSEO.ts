import { useEffect } from "react";
import { assetUrl, pageUrl } from "@/lib/site";

type SEOOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  datePublished?: string;
  dateModified?: string;
};

const setMeta = (selector: string, attribute: "name" | "property", key: string, content?: string) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  if (!existing) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const useSEO = ({
  title,
  description,
  path,
  image = "/og-image.png",
  noindex = false,
  type = "website",
  datePublished,
  dateModified,
}: SEOOptions) => {
  useEffect(() => {
    const canonicalUrl = pageUrl(path ?? window.location.pathname);
    const imageUrl = assetUrl(image);

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[property="article:published_time"]', "property", "article:published_time", datePublished);
    setMeta('meta[property="article:modified_time"]', "property", "article:modified_time", dateModified);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, path, image, noindex, type, datePublished, dateModified]);
};

export default useSEO;
