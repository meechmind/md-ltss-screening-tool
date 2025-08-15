// This component displays a list of call-to-action (CTA) items
import { buildCTAs } from "../utils/logic.js";
import { toTelHref } from "../utils/phone.js";

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