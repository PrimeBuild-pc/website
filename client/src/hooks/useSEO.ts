import { useEffect } from "react";

type SEOOptions = {
  title: string;
  description?: string;
};

const useSEO = ({ title, description }: SEOOptions) => {
  useEffect(() => {
    document.title = title;

    if (!description) {
      return;
    }

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);
  }, [title, description]);
};

export default useSEO;
