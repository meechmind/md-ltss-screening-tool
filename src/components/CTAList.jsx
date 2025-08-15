// This component displays a list of call-to-action (CTA) items
import { buildCTAs } from "../utils/logic.js";

export default function CTAList() {
  const ctas = buildCTAs();
  return (
    <ul className="usa-list">
      {ctas.map((c, i) => (
        <li key={i}>
          <strong>{c.label}:</strong>{" "}
          <a href={toTelHref(c.value)}>{c.value}</a>
        </li>
      ))}
    </ul>
  );
}

// Tries to pull the last numeric phone (e.g., from “1-844-MAP-LINK (1-844-627-5465)”)
function toTelHref(display) {
  const matches = display.match(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  const raw = (matches?.[matches.length - 1] || display).replace(/\D/g, "");
  const withCountry = raw.length === 10 ? `1${raw}` : raw;
  return `tel:+${withCountry}`;
}