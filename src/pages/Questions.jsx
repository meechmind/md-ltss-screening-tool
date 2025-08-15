import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator.jsx";

export default function Questions() {
  const navigate = useNavigate();

  const [q1, setQ1] = useState(""); // situation
  const [q2, setQ2] = useState(""); // LTC insurance / VA / none
  const [q3, setQ3] = useState(""); // financial picture
  const [q4, setQ4] = useState(""); // Medicare enrolled

  const [errors, setErrors] = useState({}); // { q1: true, q2: true, ... }
  const errorRef = useRef(null);

  function validate() {
    const next = {};
    if (!q1) next.q1 = true;
    if (!q2) next.q2 = true;
    if (!q3) next.q3 = true;
    if (!q4) next.q4 = true;
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      // focus the error summary for screen readers/keyboard users
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }
    const params = new URLSearchParams({ a1: q1, a2: q2, a3: q3, a4: q4 });
    navigate(`/results?${params.toString()}`);
  }

  // helper for fieldset props when there's an error
  const groupProps = (key) => ({
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined
  });

  return (
    <form className="measure-6" onSubmit={handleSubmit} noValidate>
      <h1 className="margin-top-2">Find the Right Support for You</h1>
      <StepIndicator current={1} />
      <p>Answer four quick questions to see programs and next steps.</p>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div
          className="usa-alert usa-alert--error margin-top-2"
          role="alert"
          tabIndex={-1}
          ref={errorRef}
        >
          <div className="usa-alert__body">
            <h2 className="usa-alert__heading">Please answer all required questions</h2>
            <div className="usa-alert__text">
              <ul className="usa-list">
                {errors.q1 && <li><a href="#q1">Question 1: Your current situation</a></li>}
                {errors.q2 && <li><a href="#q2">Question 2: Insurance or VA benefits</a></li>}
                {errors.q3 && <li><a href="#q3">Question 3: Financial picture</a></li>}
                {errors.q4 && <li><a href="#q4">Question 4: Medicare enrollment</a></li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Q1 */}
      <fieldset id="q1" className="usa-fieldset margin-top-2" {...groupProps("q1")}>
        <legend className="usa-legend">
          1) What best describes your current situation?
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q1 && (
          <p id="q1-error" className="usa-error-message">Select one option.</p>
        )}

        <div className="usa-radio">
          <input
            className="usa-radio__input"
            id="q1a"
            type="radio"
            name="q1"
            value="A"
            required
            checked={q1 === "A"}
            onChange={() => setQ1("A")}
          />
          <label className="usa-radio__label" htmlFor="q1a">
            A) I’m living at home or with family, but daily tasks are becoming difficult.
          </label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q1b" type="radio" name="q1" value="B"
            checked={q1 === "B"} onChange={() => setQ1("B")} />
          <label className="usa-radio__label" htmlFor="q1b">
            B) I am in a hospital or rehab and planning to return home.
          </label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q1c" type="radio" name="q1" value="C"
            checked={q1 === "C"} onChange={() => setQ1("C")} />
          <label className="usa-radio__label" htmlFor="q1c">
            C) I am in a hospital or rehab and may need to move to a nursing home.
          </label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q1d" type="radio" name="q1" value="D"
            checked={q1 === "D"} onChange={() => setQ1("D")} />
          <label className="usa-radio__label" htmlFor="q1d">
            D) I am currently living in a nursing home for long-term care.
          </label>
        </div>
      </fieldset>

      {/* Q2 */}
      <fieldset id="q2" className="usa-fieldset margin-top-3" {...groupProps("q2")}>
        <legend className="usa-legend">
          2) Do you have either of the following to help pay for care?
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q2 && (
          <p id="q2-error" className="usa-error-message">Select one option.</p>
        )}

        <div className="usa-radio">
          <input className="usa-radio__input" id="q2a" type="radio" name="q2" value="A"
            required checked={q2 === "A"} onChange={() => setQ2("A")} />
          <label className="usa-radio__label" htmlFor="q2a">A) Long-Term Care Insurance</label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q2b" type="radio" name="q2" value="B"
            checked={q2 === "B"} onChange={() => setQ2("B")} />
          <label className="usa-radio__label" htmlFor="q2b">B) Access to VA (Veterans) benefits</label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q2c" type="radio" name="q2" value="C"
            checked={q2 === "C"} onChange={() => setQ2("C")} />
          <label className="usa-radio__label" htmlFor="q2c">C) None of the above</label>
        </div>
      </fieldset>

      {/* Q3 */}
      <fieldset id="q3" className="usa-fieldset margin-top-3" {...groupProps("q3")}>
        <legend className="usa-legend">
          3) Which of these best describes your financial picture?
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q3 && (
          <p id="q3-error" className="usa-error-message">Select one option.</p>
        )}

        <div className="usa-radio">
          <input className="usa-radio__input" id="q3a" type="radio" name="q3" value="A"
            required checked={q3 === "A"} onChange={() => setQ3("A")} />
          <label className="usa-radio__label" htmlFor="q3a">
            A) Monthly income &lt; ~$1,250 AND savings/assets &lt; $2,000
          </label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q3b" type="radio" name="q3" value="B"
            checked={q3 === "B"} onChange={() => setQ3("B")} />
          <label className="usa-radio__label" htmlFor="q3b">
            B) Monthly income ~$1,250–$2,900 AND savings/assets &lt; $2,000
          </label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q3c" type="radio" name="q3" value="C"
            checked={q3 === "C"} onChange={() => setQ3("C")} />
          <label className="usa-radio__label" htmlFor="q3c">
            C) Monthly income &gt; ~$2,900 OR savings/assets &gt; $2,000
          </label>
        </div>
      </fieldset>

      {/* Q4 */}
      <fieldset id="q4" className="usa-fieldset margin-top-3" {...groupProps("q4")}>
        <legend className="usa-legend">
          4) Are you enrolled in Medicare?
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q4 && (
          <p id="q4-error" className="usa-error-message">Select one option.</p>
        )}

        <div className="usa-radio">
          <input className="usa-radio__input" id="q4a" type="radio" name="q4" value="A"
            required checked={q4 === "A"} onChange={() => setQ4("A")} />
          <label className="usa-radio__label" htmlFor="q4a">A) Yes</label>
        </div>

        <div className="usa-radio">
          <input className="usa-radio__input" id="q4b" type="radio" name="q4" value="B"
            checked={q4 === "B"} onChange={() => setQ4("B")} />
          <label className="usa-radio__label" htmlFor="q4b">B) No</label>
        </div>
      </fieldset>

      <div className="margin-top-4">
        <button className="usa-button" type="submit">See my results</button>
      </div>
    </form>
  );
}