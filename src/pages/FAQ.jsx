import { useState } from "react";
import { Link } from "react-router-dom";
import { getFAQ } from "../utils/logic.js";

export default function FAQ() {
  const items = getFAQ();
  // open the first item by default; use -1 if you prefer all collapsed
  const [openIdx, setOpenIdx] = useState(items.length ? 0 : -1);

  function toggle(idx) {
    setOpenIdx((prev) => (prev === idx ? -1 : idx)); // single-open behavior
  }

  function onHeaderKey(e, idx) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(idx);
    }
  }

  return (
    <div className="measure-6">
      <h1 className="margin-top-2">Frequently Asked Questions</h1>
      {items.length === 0 && <p>No FAQs available.</p>}

      <div className="usa-accordion usa-accordion--bordered margin-top-2">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          const panelId = `faq-panel-${idx}`;
          const buttonId = `faq-button-${idx}`;
          return (
            <section className="usa-accordion__container" key={idx}>
              <h2 className="usa-accordion__heading">
                <button
                  id={buttonId}
                  type="button"
                  className="usa-accordion__button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  onKeyDown={(e) => onHeaderKey(e, idx)}
                >
                  {item.q}
                </button>
              </h2>
              <div
                id={panelId}
                className="usa-accordion__content"
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                {item.a.map((para, i) => (
                  <p key={i} className="margin-top-1">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>

        <div className="margin-top-3">
          <Link className="usa-button usa-button--unstyled" to="/questions">
            Back to screening
          </Link>
        </div>
      </div>
    );
  }
