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
  underline = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : ""}`}>
      <h2
        className={`text-3xl md:text-4xl font-bold font-montserrat mb-4 inline-block ${
          underline ? "border-b-2 border-primary pb-2" : ""
        }`}
      >
        <span className="text-white">{title}</span>{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-lg max-w-2xl mx-auto text-neutral-300">{subtitle}</p>
      )}
      {italicText && (
        <p className="text-base max-w-2xl mx-auto text-neutral-400 mt-4 italic">
          {italicText}
        </p>
      )}
    </div>
  );
}


