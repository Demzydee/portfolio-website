/**
 * Generates a self-contained placeholder image (data URI, no network request).
 * Swap these calls out for real <img src="/assets/..."> paths once you have
 * final artwork -- every call site is sized to match the original spec.
 */
export function placeholderImg(width: number, height: number, label: string): string {
  const fontSize = Math.max(12, Math.min(width, height) / 12);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1c1c22" />
          <stop offset="100%" stop-color="#0c0c0c" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" stroke="#3a3a42" stroke-width="1" />
      <text
        x="50%"
        y="50%"
        fill="#8a8f9c"
        font-family="sans-serif"
        font-size="${fontSize}"
        text-anchor="middle"
        dominant-baseline="middle"
      >${label}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
