export default function StepIndicator({ current = 1 }) {
  // current: 1 = Questions, 2 = Results
  return (
    <nav className="usa-step-indicator" aria-label="progress">
      <ol className="usa-step-indicator__segments">
        <li className={`usa-step-indicator__segment${current === 1 ? " usa-step-indicator__segment--current" : current > 1 ? " usa-step-indicator__segment--complete" : ""}`}>
          <span className="usa-step-indicator__segment-label">Questions</span>
        </li>
        <li className={`usa-step-indicator__segment${current === 2 ? " usa-step-indicator__segment--current" : ""}`}>
          <span className="usa-step-indicator__segment-label">Results</span>
        </li>
      </ol>
      <div className="usa-step-indicator__header">
        <h2 className="usa-step-indicator__heading">
          <span className="usa-step-indicator__current-step">{current}</span>
          <span className="usa-step-indicator__total-steps">of 2</span>
        </h2>
      </div>
    </nav>
  );
}