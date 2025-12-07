import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

/**
 * ImageWithFallback tries WebP first for better performance, then falls back to
 * .jpg/.png if WebP fails, and finally falls back to /logo.png to avoid broken images.
 */
export default function ImageWithFallback({ src, alt, fallbackSrc = "/logo.png", loading, ...rest }: Props) {
  const originalSrc = React.useRef(src);

  const [current, setCurrent] = React.useState(() => {
    // Try WebP first if original is jpg/png
    const dot = src.lastIndexOf(".");
    if (dot > -1) {
      const ext = src.slice(dot + 1).toLowerCase();
      if (ext === "jpg" || ext === "jpeg" || ext === "png") {
        return src.slice(0, dot) + ".webp";
      }
    }
    return src;
  });
  const triedRef = React.useRef<Set<string>>(new Set([current]));

  const onError = () => {
    const next = computeNextSrc(current, originalSrc.current, fallbackSrc);
    if (next && !triedRef.current.has(next)) {
      triedRef.current.add(next);
      setCurrent(next);
    }
  };

  // Default to lazy loading unless explicitly overridden
  const effectiveLoading: React.ImgHTMLAttributes<HTMLImageElement>["loading"] = loading ?? "lazy";

  return <img src={current} alt={alt} onError={onError} loading={effectiveLoading} {...rest} />;
}

function computeNextSrc(current: string, original: string, fallback: string): string | null {
  const url = new URL(current, "http://dummy");
  const pathname = url.pathname;
  const dot = pathname.lastIndexOf(".");
  if (dot > -1) {
    const base = pathname.slice(0, dot);
    const ext = pathname.slice(dot + 1).toLowerCase();
    // WebP failed, try original format
    if (ext === "webp") return original;
    // Try alternate format
    if (ext === "jpg" || ext === "jpeg") return base + ".png";
    if (ext === "png") return base + ".jpg";
  }
  // final fallback
  return fallback;
}
