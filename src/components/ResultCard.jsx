// This component represents a card in the results section
// src/components/ResultCard.jsx
export default function ResultCard({ title, children, className = "" }) {
  return (
    <section className={`usa-card margin-top-2 ${className}`}>
      <div className="usa-card__container">
        <header className="usa-card__header">
          <h3 className="usa-card__heading">{title}</h3>
        </header>
        {/* data-title fuels the print-only heading */}
        <div className="usa-card__body" data-title={title}>
          {children}
        </div>
      </div>
    </section>
  );
}
