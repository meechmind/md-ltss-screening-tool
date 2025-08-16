// Header component
// /src/components/header.jsx

import Container from "./Container.jsx";
import { getMeta } from "../utils/logic.js";
import { Link } from "react-router-dom";

export default function Header() {
  const { appTitle } = getMeta();

  return (
    <header className="usa-header usa-header--basic">
      <a className="usa-skipnav" href="#main">Skip to main content</a>
      <div className="usa-nav-container">
        <Container className="usa-navbar" as="div">
          <div className="usa-logo" id="logo">
            <em className="usa-logo__text">
              <Link to="/" title={appTitle}>{appTitle}</Link>
            </em>
          </div>
          <nav className="margin-left-2">
            <Link className="usa-link" to="/faq">FAQ</Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}