// Results page that reads URL & renders content

import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  computeResult,
  buildCTAs,
  medicareNoteNeeded,
  getDisclaimer
} from "../utils/logic.js";

function useAnswersFromURL() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    a1: params.get('a1') || '',
    a2: params.get('a2') || '',
    a3: params.get('a3') || '',
    a4: params.get('a4') || ''
  };
}

export default function Results() {
  const answers = useAnswersFromURL();
  const result = computeResult(answers);
  const ctas = buildCTAs();
  const medicareNote = medicareNoteNeeded(result.showMedicareNote);

  const hasAll = answers.a1 && answers.a2 && answers.a3 && answers.a4;

  return (
    <div className="measure-6">
      <h1 className="margin-top-2">Your results</h1>

      {!hasAll && (
        <div className="usa-alert usa-alert--warning margin-bottom-2">
          <div className="usa-alert__body">
            <p className="usa-alert__text">
              We couldn’t find all your answers. Please start over and complete all four questions.
            </p>
          </div>
        </div>
      )}

      <section className="margin-top-2">
        <h2 className="margin-top-0">{result.title}</h2>
        <ul className="usa-list">
          {result.summary.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </section>

      {medicareNote && (
        <section className="margin-top-2">
          <h3>A critical note on Medicare enrollment</h3>
          <ul className="usa-list">
            {medicareNote.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      )}

      <section className="margin-top-2">
        <h3>Next steps / Contacts</h3>
        <ul className="usa-list">
          {ctas.map((c, i) => (
            <li key={i}>
              <strong>{c.label}:</strong> {c.value}
            </li>
          ))}
        </ul>
      </section>

      <div className="margin-top-3 no-print">
        <button className="usa-button" onClick={() => window.print()}>Print results</button>
        <button
          className="usa-button usa-button--outline margin-left-1"
          onClick={() => {
            const text = [
              `Result: ${result.title}`,
              ...result.summary.map(s => `• ${s}`),
              ...(medicareNote ? ['\nMedicare note:', ...medicareNote.map(s => `• ${s}`)] : []),
              '\nContacts:',
              ...ctas.map(c => `• ${c.label}: ${c.value}`),
              '\nDisclaimer:',
              getDisclaimer()
            ].join('\n');
            navigator.clipboard.writeText(text);
            alert('Summary copied to clipboard.');
          }}
        >
          Copy summary
        </button>
        <Link className="usa-button usa-button--unstyled margin-left-2" to="/">Start over</Link>
      </div>

      <section className="margin-top-4">
        <p className="font-sans-2xs">{getDisclaimer()}</p>
      </section>
    </div>
  );
}