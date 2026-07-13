interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  italicText?: string;
  alignment?: "left" | "center";
  underline?: boolean;
}

export function SectionHeader({
  title,
  highlight,
  subtitle,
  italicText,
  alignment = "center",
}: SectionHeaderProps) {
  const centered = alignment === "center";

  return (
    <header className={`mb-12 md:mb-16 ${centered ? "text-center" : "text-left"}`}>
      <span className="section-kicker">Prime Build</span>
      <h2 className="font-montserrat text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
        {title}{title && highlight ? " " : ""}
        {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      {italicText && <p className={`mt-3 max-w-2xl text-sm text-neutral-400 ${centered ? "mx-auto" : ""}`}>{italicText}</p>}
    </header>
  );
}
