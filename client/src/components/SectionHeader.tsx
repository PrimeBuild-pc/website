interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  italicText?: string;
  eyebrow?: string;
  alignment?: "left" | "center";
  underline?: boolean;
}

export function SectionHeader({
  title,
  highlight,
  subtitle,
  italicText,
  eyebrow,
  alignment = "center",
  underline = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${alignment === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl md:text-5xl font-montserrat mb-5 inline-block ${
          underline ? "border-b-2 border-primary pb-2" : ""
        }`}
      >
        <span className="text-white">{title}</span>{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`text-base leading-7 text-neutral-400 md:text-lg ${alignment === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}>{subtitle}</p>
      )}
      {italicText && (
        <p className={`mt-4 max-w-2xl text-sm text-neutral-500 ${alignment === "center" ? "mx-auto" : ""}`}>
          {italicText}
        </p>
      )}
    </div>
  );
}


