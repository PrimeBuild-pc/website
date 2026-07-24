import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { buildSchema } from "@/lib/schema";

const SchemaMarkup = () => {
  const [location] = useLocation();
  const schema = useMemo(() => buildSchema(location), [location]);

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
