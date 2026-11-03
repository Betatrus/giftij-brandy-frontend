/**
 * Add responsive Cloudinary delivery transformations without changing
 * non-Cloudinary image URLs. f_auto negotiates modern formats (AVIF/WebP)
 * and q_auto balances file size with visual quality.
 */
export function storefrontImageUrl(source: string, width: number): string {
  if (!source || !source.includes("res.cloudinary.com") || !source.includes("/image/upload/")) {
    return source;
  }

  const marker = "/image/upload/";
  const index = source.indexOf(marker);
  const prefix = source.slice(0, index + marker.length);
  const remainder = source.slice(index + marker.length);
  if (/^(?:f_auto|q_auto|w_\d+|c_limit)(?:,|\/)/.test(remainder)) {
    return source;
  }

  return `${prefix}f_auto,q_auto,w_${width},c_limit,dpr_auto/${remainder}`;
}
