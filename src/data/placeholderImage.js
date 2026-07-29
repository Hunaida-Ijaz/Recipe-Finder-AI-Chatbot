// Generates a themed placeholder image (SVG data URI) so desi recipe cards
// always render something on-brand, even without a network image fetch.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function placeholderFor(label, emoji) {
  const safeLabel = escapeXml(label);
  const safeEmoji = escapeXml(emoji);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="400" height="300" fill="#A3B18A" />
      <rect x="10" y="10" width="380" height="280" fill="none" stroke="#FFF8F0" stroke-width="2" stroke-dasharray="6 6" opacity="0.6" />
      <text x="50%" y="45%" font-size="64" text-anchor="middle" dominant-baseline="middle">${safeEmoji}</text>
      <text x="50%" y="72%" font-size="22" font-family="Georgia, serif" fill="#4E342E" text-anchor="middle">${safeLabel}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
