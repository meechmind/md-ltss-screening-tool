import { Link } from "react-router-dom";
import { getMeta } from "../utils/logic.js";

export default function Intro() {
  const { appTitle } = getMeta();
  return (
    <section className="usa-hero">
      <div className="grid-container">
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading">{appTitle}</h1>
          <p className="usa-intro">Find services and supports that fit your needs.</p>
          <Link className="usa-button usa-button--accent-cool" to="/questions">
            Start screening
          </Link>
        </div>
      </div>
    </section>
  );
}
