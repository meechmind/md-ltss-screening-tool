// Results page that reads URL & renders content

import React from "react";
import { useLocation, Link } from "react-router-dom";
import { computeResult, medicareNoteNeeded } from "../utils/logic.js";
import StepIndicator from "../components/StepIndicator.jsx";
import ResultCard from "../components/ResultCard.jsx";
import CTAList from "../components/CTAList.jsx";

function useAnswersFromURL() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    a1: params.get("a1") || "",
    a2: params.get("a2") || "",
    a3: params.get("a3") || "",
    a4: params.get("a4") || "",
  };
}

export default function Results() {
  const answers = useAnswersFromURL();
  const result = computeResult(answers);
  const medicareNote = medicareNoteNeeded(result.showMedicareNote);

  const hasAll = answers.a1 && answers.a2 && answers.a3 && answers.a4;

  return (
    <div className="measure-6">
      <h1 className="margin-top-2">Your results</h1>
      <StepIndicator current={2} />

      {!hasAll && (
        <div className="usa-alert usa-alert--warning margin-top-2">
          <div className="usa-alert__body">
            <p className="usa-alert__text">
              We couldn’t find all your answers. Please start over and complete all four questions.
            </p>
          </div>
        </div>
      )}

      <ResultCard title="What this means for you">
        <h2 className="usa-sr-only">Summary</h2>
        <p className="margin-top-0 text-bold">{result.title}</p>
        <ul className="usa-list">
          {result.summary.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </ResultCard>

      {medicareNote && (
        <ResultCard title="A critical note on Medicare enrollment">
          <h2 className="usa-sr-only">Medicare note</h2>
          <ul className="usa-list">
            {medicareNote.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </ResultCard>
      )}

      <ResultCard title="Next steps & contacts">
        <CTAList />
      </ResultCard>

      <div className="margin-top-3 no-print results-actions">
        <button className="usa-button" onClick={() => window.print()}>
          Print results
        </button>
        <button
          className="usa-button usa-button--outline margin-left-1"
          onClick={() => {
            const lines = [
              `Result: ${result.title}`,
              ...result.summary.map((s) => `• ${s}`),
              ...(medicareNote ? ["", "Medicare note:", ...medicareNote.map((s) => `• ${s}`)] : []),
              "",
              "Contacts:",
              // simple text version of CTA list (same as on page)
              "• Call Maryland Access Point (MAP): 1-844-MAP-LINK (1-844-627-5465)",
              "• Social Security Administration: 1-800-772-1213",
              "• VA Maryland Health Care System: 1-800-949-1003",
            ];
            navigator.clipboard.writeText(lines.join("\n"));
            alert("Summary copied to clipboard.");
          }}
        >
          Copy summary
        </button>
        <Link className="usa-button usa-button--unstyled margin-left-2" to="/">
          Start over
        </Link>
      </div>
    </div>
  );
}