// Questions Page

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * V1 questions (from your doc). We’ll refine wording later, but this is wired.
 */
export default function Questions() {
  const navigate = useNavigate();

  const [q1, setQ1] = useState(""); // situation
  const [q2, setQ2] = useState(""); // LTC insurance / VA / none
  const [q3, setQ3] = useState(""); // financial picture
  const [q4, setQ4] = useState(""); // Medicare enrolled

  const canSubmit = q1 && q2 && q3 && q4;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // Build a refresh-safe, shareable URL
    const params = new URLSearchParams({
      a1: q1, a2: q2, a3: q3, a4: q4
    });
    navigate(`/results?${params.toString()}`);
  }

  return (
    <form className="measure-6" onSubmit={handleSubmit}>
      <h1 className="margin-top-2">Find the Right Support for You</h1>
      <p>Answer four quick questions to see programs and next steps.</p>

      {/* Q1 */}
      <fieldset className="usa-fieldset margin-top-2">
        <legend className="usa-legend">
          1) What best describes your current situation?
        </legend>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q1a" type="radio" name="q1" value="A"
            checked={q1==="A"} onChange={()=>setQ1("A")} />
          <label className="usa-radio__label" htmlFor="q1a">
            A) I'm living at home or with family, but daily tasks are becoming difficult.
          </label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q1b" type="radio" name="q1" value="B"
            checked={q1==="B"} onChange={()=>setQ1("B")} />
          <label className="usa-radio__label" htmlFor="q1b">
            B) I am in a hospital or rehab and planning to return home.
          </label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q1c" type="radio" name="q1" value="C"
            checked={q1==="C"} onChange={()=>setQ1("C")} />
          <label className="usa-radio__label" htmlFor="q1c">
            C) I am in a hospital or rehab and may need to move to a nursing home.
          </label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q1d" type="radio" name="q1" value="D"
            checked={q1==="D"} onChange={()=>setQ1("D")} />
          <label className="usa-radio__label" htmlFor="q1d">
            D) I am currently living in a nursing home for long-term care.
          </label>
        </div>
      </fieldset>

      {/* Q2 */}
      <fieldset className="usa-fieldset margin-top-3">
        <legend className="usa-legend">
          2) Do you have either of the following to help pay for care?
        </legend>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q2a" type="radio" name="q2" value="A"
            checked={q2==="A"} onChange={()=>setQ2("A")} />
          <label className="usa-radio__label" htmlFor="q2a">A) Long-Term Care Insurance</label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q2b" type="radio" name="q2" value="B"
            checked={q2==="B"} onChange={()=>setQ2("B")} />
          <label className="usa-radio__label" htmlFor="q2b">B) Access to VA (Veterans) benefits</label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q2c" type="radio" name="q2" value="C"
            checked={q2==="C"} onChange={()=>setQ2("C")} />
          <label className="usa-radio__label" htmlFor="q2c">C) None of the above</label>
        </div>
      </fieldset>

      {/* Q3 */}
      <fieldset className="usa-fieldset margin-top-3">
        <legend className="usa-legend">3) Which of these best describes your financial picture?</legend>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q3a" type="radio" name="q3" value="A"
            checked={q3==="A"} onChange={()=>setQ3("A")} />
          <label className="usa-radio__label" htmlFor="q3a">
            A) Monthly income &lt; ~$1,250 AND savings/assets &lt; $2,000
          </label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q3b" type="radio" name="q3" value="B"
            checked={q3==="B"} onChange={()=>setQ3("B")} />
          <label className="usa-radio__label" htmlFor="q3b">
            B) Monthly income ~$1,250–$2,900 AND savings/assets &lt; $2,000
          </label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q3c" type="radio" name="q3" value="C"
            checked={q3==="C"} onChange={()=>setQ3("C")} />
          <label className="usa-radio__label" htmlFor="q3c">
            C) Monthly income &gt; ~$2,900 OR savings/assets &gt; $2,000
          </label>
        </div>
      </fieldset>

      {/* Q4 */}
      <fieldset className="usa-fieldset margin-top-3">
        <legend className="usa-legend">4) Are you enrolled in Medicare?</legend>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q4a" type="radio" name="q4" value="A"
            checked={q4==="A"} onChange={()=>setQ4("A")} />
          <label className="usa-radio__label" htmlFor="q4a">A) Yes</label>
        </div>
        <div className="usa-radio">
          <input className="usa-radio__input" id="q4b" type="radio" name="q4" value="B"
            checked={q4==="B"} onChange={()=>setQ4("B")} />
          <label className="usa-radio__label" htmlFor="q4b">B) No</label>
        </div>
      </fieldset>

      <div className="margin-top-4">
        <button className="usa-button" disabled={!canSubmit} type="submit">See my results</button>
      </div>
    </form>
  );
}