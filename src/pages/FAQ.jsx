// FAQ page

import { Link } from "react-router-dom";
import { getFAQ } from "../utils/logic.js";

export default function FAQ() {
  const items = getFAQ();

  return (
    <div className="measure-6">
      <h1 className="margin-top-2">Frequently Asked Questions</h1>
      {items.length === 0 && <p>No FAQs available.</p>}

      <div className="usa-accordion usa-accordion--bordered margin-top-2">
        {items.map((item, idx) => (
          <div className="usa-accordion__heading" key={`h-${idx}`}>
            <button
              type="button"
              className="usa-accordion__button"
              aria-expanded={idx === 0 ? "true" : "false"}
              aria-controls={`faq-${idx}`}
            >
              {item.q}
            </button>
            <div id={`faq-${idx}`} className="usa-accordion__content">
              {item.a.map((para, i) => (
                <p key={i} className="margin-top-1">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="margin-top-3">
        <Link className="usa-button usa-button--unstyled" to="/">Back to screening</Link>
      </div>
    </div>
  );
}