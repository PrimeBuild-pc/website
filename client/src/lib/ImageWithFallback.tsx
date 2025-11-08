import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

/**
 * ImageWithFallback swaps between .jpg and .png if the first source fails,
 * and finally falls back to /logo.png to avoid broken images in static builds.
 */
export default function ImageWithFallback({ src, alt, fallbackSrc = "/logo.png", loading, ...rest }: Props) {
  const [current, setCurrent] = React.useState(src);
  const triedRef = React.useRef<Set<string>>(new Set([src]));

  const onError = () => {
    const next = computeNextSrc(current, fallbackSrc);
    if (next && !triedRef.current.has(next)) {
      triedRef.current.add(next);
      setCurrent(next);
    }
  };

  // Default to lazy loading unless explicitly overridden
  const effectiveLoading: React.ImgHTMLAttributes<HTMLImageElement>["loading"] = loading ?? "lazy";

  return <img src={current} alt={alt} onError={onError} loading={effectiveLoading} {...rest} />;
}

function computeNextSrc(current: string, fallback: string): string | null {
  const url = new URL(current, "http://dummy");
  const pathname = url.pathname;
  const dot = pathname.lastIndexOf(".");
  if (dot > -1) {
    const base = pathname.slice(0, dot);
    const ext = pathname.slice(dot + 1).toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return base + ".png";
    if (ext === "png") return base + ".jpg";
  }
  // final fallback
  return fallback;
}
