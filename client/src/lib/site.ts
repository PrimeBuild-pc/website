export const SITE_URL = "https://primebuild.website";

export const pagePath = (path: string) => {
  const pathname = new URL(path, SITE_URL).pathname.replace(/\/+$/, "");
  return pathname ? `${pathname}/` : "/";
};

export const pageUrl = (path: string) => new URL(pagePath(path), SITE_URL).toString();
export const assetUrl = (path: string) => new URL(path, SITE_URL).toString();
