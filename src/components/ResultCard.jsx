// This component represents a card in the results section
export default function ResultCard({ title, children }) {
  return (
    <section className="usa-card margin-top-2">
      <div className="usa-card__container">
        <header className="usa-card__header">
          <h3 className="usa-card__heading">{title}</h3>
        </header>
        <div className="usa-card__body">
          {children}
        </div>
      </div>
    </section>
  );
}