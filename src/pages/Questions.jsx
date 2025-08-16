import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator.jsx";
import config from "../config.json";

export default function Questions() {
  const navigate = useNavigate();
  const { questions } = config;

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

  // focus a radio button group
  function focusGroup(e, id) {
    e.preventDefault();
    const firstInput = document.querySelector(`#${id} input[type="radio"]`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    firstInput?.focus();
  }

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
                {errors.q1 && (
                  <li>
                    <a href="#q1" onClick={(e) => focusGroup(e, "q1")}>
                      {questions.a1.errorLabel}
                    </a>
                  </li>
                )}
                {errors.q2 && (
                  <li>
                    <a href="#q2" onClick={(e) => focusGroup(e, "q2")}>
                      {questions.a2.errorLabel}
                    </a>
                  </li>
                )}
                {errors.q3 && (
                  <li>
                    <a href="#q3" onClick={(e) => focusGroup(e, "q3")}>
                      {questions.a3.errorLabel}
                    </a>
                  </li>
                )}
                {errors.q4 && (
                  <li>
                    <a href="#q4" onClick={(e) => focusGroup(e, "q4")}>
                      {questions.a4.errorLabel}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Q1 */}
      <fieldset id="q1" className="usa-fieldset margin-top-2" {...groupProps("q1")}>
        <legend className="usa-legend">
          {questions.a1.legend}
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q1 && (
          <p id="q1-error" className="usa-error-message">Select one option.</p>
        )}

        {Object.entries(questions.a1.options).map(([val, label]) => (
          <div className="usa-radio" key={val}>
            <input
              className="usa-radio__input"
              id={`q1${val.toLowerCase()}`}
              type="radio"
              name="q1"
              value={val}
              required
              checked={q1 === val}
              onChange={() => setQ1(val)}
            />
            <label className="usa-radio__label" htmlFor={`q1${val.toLowerCase()}`}>
              {`${val}) ${label}`}
            </label>
          </div>
        ))}
      </fieldset>

      {/* Q2 */}
      <fieldset id="q2" className="usa-fieldset margin-top-3" {...groupProps("q2")}>
        <legend className="usa-legend">
          {questions.a2.legend}
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q2 && (
          <p id="q2-error" className="usa-error-message">Select one option.</p>
        )}

        {Object.entries(questions.a2.options).map(([val, label]) => (
          <div className="usa-radio" key={val}>
            <input
              className="usa-radio__input"
              id={`q2${val.toLowerCase()}`}
              type="radio"
              name="q2"
              value={val}
              required
              checked={q2 === val}
              onChange={() => setQ2(val)}
            />
            <label className="usa-radio__label" htmlFor={`q2${val.toLowerCase()}`}>
              {`${val}) ${label}`}
            </label>
          </div>
        ))}
      </fieldset>

      {/* Q3 */}
      <fieldset id="q3" className="usa-fieldset margin-top-3" {...groupProps("q3")}>
        <legend className="usa-legend">
          {questions.a3.legend}
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q3 && (
          <p id="q3-error" className="usa-error-message">Select one option.</p>
        )}

        {Object.entries(questions.a3.options).map(([val, label]) => (
          <div className="usa-radio" key={val}>
            <input
              className="usa-radio__input"
              id={`q3${val.toLowerCase()}`}
              type="radio"
              name="q3"
              value={val}
              required
              checked={q3 === val}
              onChange={() => setQ3(val)}
            />
            <label className="usa-radio__label" htmlFor={`q3${val.toLowerCase()}`}>
              {`${val}) ${label}`}
            </label>
          </div>
        ))}
      </fieldset>

      {/* Q4 */}
      <fieldset id="q4" className="usa-fieldset margin-top-3" {...groupProps("q4")}>
        <legend className="usa-legend">
          {questions.a4.legend}
          <span className="usa-sr-only"> (Required)</span>
        </legend>
        {errors.q4 && (
          <p id="q4-error" className="usa-error-message">Select one option.</p>
        )}

        {Object.entries(questions.a4.options).map(([val, label]) => (
          <div className="usa-radio" key={val}>
            <input
              className="usa-radio__input"
              id={`q4${val.toLowerCase()}`}
              type="radio"
              name="q4"
              value={val}
              required
              checked={q4 === val}
              onChange={() => setQ4(val)}
            />
            <label className="usa-radio__label" htmlFor={`q4${val.toLowerCase()}`}>
              {`${val}) ${label}`}
            </label>
          </div>
        ))}
      </fieldset>

      <div className="margin-top-4">
        <button className="usa-button" type="submit">See my results</button>
      </div>
    </form>
  );
}
