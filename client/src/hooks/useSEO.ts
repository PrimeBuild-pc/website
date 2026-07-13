import { useEffect } from "react";

type SEOOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

const SITE_URL = "https://primebuild.website";

const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const useSEO = ({ title, description, path, image = "/og-image.png", noindex = false }: SEOOptions) => {
  useEffect(() => {
    const pathname = path ?? window.location.pathname;
    const canonicalUrl = new URL(pathname, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
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
  }, [title, description, path, image, noindex]);
};

export default useSEO;
