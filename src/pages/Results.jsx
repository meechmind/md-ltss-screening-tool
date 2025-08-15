// Results page that reads URL & renders content

import React, { useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { computeResult, medicareNoteNeeded, buildCTAs } from "../utils/logic.js";
import StepIndicator from "../components/StepIndicator.jsx";
import ResultCard from "../components/ResultCard.jsx";
import CTAList from "../components/CTAList.jsx";

// Custom hook to read answers from the URL
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

// Results page component
export default function Results() {
  const answers = useAnswersFromURL();
  const result = computeResult(answers);
  const medicareNote = medicareNoteNeeded(result.showMedicareNote);

  const [copiedMsg, setCopiedMsg] = useState("");
  const liveRef = useRef(null);

  // Copy text to clipboard and show a polite message
  function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMsg("Copied to clipboard.");
      setTimeout(() => setCopiedMsg(""), 2000);
    });
  }

  // Create a summary text from the result, medicare note, and CTAs
  function makeSummaryText(result, medicareNote, ctas) {
    const lines = [
      `Result: ${result.title}`,
      ...result.summary.map((s) => `• ${s}`),
    ];
    lines.push(
      "",
      "Your question responses:",
      `• Q1: ${answerText.a1[answers.a1] || ""}`,
      `• Q2: ${answerText.a2[answers.a2] || ""}`,
      `• Q3: ${answerText.a3[answers.a3] || ""}`,
      `• Q4: ${answerText.a4[answers.a4] || ""}`
    );
    if (medicareNote) {
      lines.push("", "Medicare note:", ...medicareNote.map((s) => `• ${s}`));
    }
    lines.push("", "Contacts:");
    ctas.forEach((c) => lines.push(`• ${c.label}: ${c.value}`));
    return lines.join("\n");
  }

  // Check if all answers are present
  const hasAll = answers.a1 && answers.a2 && answers.a3 && answers.a4;

  /* Print date */
  const printedOn = new Date().toLocaleDateString('en-US', 
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  
  const answerText = {
  a1: {
    A: "I’m living at home/with family; daily tasks are difficult.",
    B: "In hospital/rehab and planning to return home.",
    C: "In hospital/rehab and may need a nursing home.",
    D: "Currently living in a nursing home for long-term care."
  },
  a2: {
    A: "Long-Term Care Insurance",
    B: "Access to VA (Veterans) benefits",
    C: "None of the above"
  },
  a3: {
    A: "Monthly income < ~$1,250 AND savings/assets < $2,000",
    B: "Monthly income ~$1,250–$2,900 AND savings/assets < $2,000",
    C: "Monthly income > ~$2,900 OR savings/assets > $2,000"
  },
  a4: { A: "Yes", B: "No" }
};

  {/* Results Cards */}
  return (
    <div className="measure-6">
      <h1 className="margin-top-2">Your results</h1>

      {/* Print-only: date */}
      <p className="only-print">Printed on: {printedOn}</p>

      {/* Step indicator */}
      <StepIndicator current={2} />

      {/* Print-only: user's answers */}
      {hasAll && (
        <ResultCard title="Your question responses:" className="only-print">
          <ul className="usa-list">
            <li>Q1: {answerText.a1[answers.a1]}</li>
            <li>Q2: {answerText.a2[answers.a2]}</li>
            <li>Q3: {answerText.a3[answers.a3]}</li>
            <li>Q4: {answerText.a4[answers.a4]}</li>
          </ul>
        </ResultCard>
      )}

      {/* Show a message if not all answers are present */}
      {!hasAll && (
        <div className="usa-alert usa-alert--warning margin-top-2">
          <div className="usa-alert__body">
            <p className="usa-alert__text">
              We couldn’t find all your answers. Please start over and complete all four questions.
            </p>
          </div>
        </div>
      )}

      {/* Show the user's answers */}
      <ResultCard title="What this means for you:">
        <h2 className="usa-sr-only">Summary</h2>
        <p className="margin-top-0 text-bold">{result.title}</p>
        <ul className="usa-list">
          {result.summary.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </ResultCard>

      {/* Medicare note */}
      {medicareNote && (
        <ResultCard title="A critical note on Medicare enrollment:">
          <h2 className="usa-sr-only">Medicare note</h2>
          <ul className="usa-list">
            {medicareNote.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </ResultCard>
      )}

      <ResultCard title="Next steps & contacts:">
        <CTAList />
      </ResultCard>

      {/* Results action buttons */}
      <div className="margin-top-3 no-print results-actions">
        <button className="usa-button" onClick={() => window.print()} aria-label="Print your results">
          Print results
        </button>

        <button
          className="usa-button usa-button--outline margin-left-1"
          onClick={() => {
            const ctas = buildCTAs();
            const text = makeSummaryText(result, medicareNote, ctas);
            copy(text);
          }}
          aria-label="Copy a text summary of your results"
        >
          Copy summary
        </button>

        <button
          className="usa-button usa-button--outline margin-left-1"
          onClick={() => copy(window.location.href)}
          aria-label="Copy a link to your results"
        >
          Copy link
        </button>

        <Link className="usa-button usa-button--unstyled margin-left-2" to="/">
          Start over
        </Link>

        {/* polite screen-reader announcement */}
        <div
          className="usa-sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          ref={liveRef}
        >
          {copiedMsg}
        </div>
      </div>
    </div>
  );
}