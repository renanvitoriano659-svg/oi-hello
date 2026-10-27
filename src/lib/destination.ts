const attributionKeys = /^(utm_[a-z0-9_]+|gclid|fbclid|ttclid)$/i;

/** Sem destino real, os links continuam na apresentação do livro. */
export function buildDestinationUrl(
  destination: string,
  search = "",
  origin?: string,
): string | null {
  if (!destination.trim()) return null;
  try {
    const url = origin ? new URL(destination, origin) : new URL(destination);
    if (!/^https?:$/.test(url.protocol)) return null;
    new URLSearchParams(search).forEach((value, key) => {
      if (attributionKeys.test(key) && !url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return null;
  }
}

export function absoluteAsset(path: string, siteUrl: string): string {
  if (!siteUrl) return path;
  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return path;
  }
}
