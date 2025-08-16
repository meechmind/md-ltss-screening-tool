// Utility function to convert a display string to a tel: link
export function toTelHref(display) {
  // Prefer the last phone-like substring in the text (covers MAP-LINK (xxx))
  const matches = display.match(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  const raw = (matches?.[matches.length - 1] || display).replace(/\D/g, "");
  const withCountry = raw.length === 10 ? `1${raw}` : raw;
  return `tel:+${withCountry}`;
}
