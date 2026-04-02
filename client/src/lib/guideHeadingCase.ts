const UPPERCASE_TOKENS = new Set([
  "DLSS",
  "RTX",
  "FPS",
  "VRAM",
  "CPU",
  "GPU",
  "MPO",
  "HAGS",
  "VRR",
  "HDR",
  "G-SYNC",
  "NIS",
  "FSR",
  "DLAA",
  "MSI",
  "BIOS",
  "USB",
  "PCI",
  "PCIE",
  "QHD",
  "UHD",
  "4K",
  "8K",
  "QoS",
]);

const PROPER_CASE_TOKENS: Record<string, string> = {
  nvidia: "NVIDIA",
  windows: "Windows",
  inspector: "Inspector",
  app: "App",
  profile: "Profile",
  youtube: "YouTube",
};

const WORD_PATTERN = /[A-Za-zÀ-ÿ0-9]+(?:['’][A-Za-zÀ-ÿ0-9]+)?/g;

export const normalizeHeadingCase = (value: string): string => {
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (!trimmed) {
    return value;
  }

  const normalizedWords = trimmed.replace(WORD_PATTERN, (token) => {
    const upper = token.toUpperCase();
    const lower = token.toLowerCase();

    if (UPPERCASE_TOKENS.has(upper)) {
      return upper;
    }

    if (PROPER_CASE_TOKENS[lower]) {
      return PROPER_CASE_TOKENS[lower];
    }

    return lower;
  });

  return normalizedWords.replace(/^([^A-Za-zÀ-ÿ]*)([A-Za-zÀ-ÿ])/, (_match, prefix: string, firstLetter: string) => {
    return `${prefix}${firstLetter.toUpperCase()}`;
  });
};

export const normalizeHeadingElements = (root: ParentNode) => {
  const headings = Array.from(root.querySelectorAll("h1, h2, h3, h4"));

  headings.forEach((heading) => {
    if (heading.childElementCount > 0) {
      return;
    }

    const originalText = heading.textContent ?? "";
    heading.textContent = normalizeHeadingCase(originalText);
  });
};
