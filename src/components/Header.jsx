// Header component
// /src/components/header.jsx

import React from "react";
import Container from "./Container.jsx";

export default function Header() {
  return (
    <header className="usa-header usa-header--basic">
      <a className="usa-skipnav" href="#main">Skip to main content</a>
      <div className="usa-nav-container">
        <Container className="usa-navbar" as="div">
          <div className="usa-logo" id="logo">
            <em className="usa-logo__text">
              <a href="/" title="Maryland LTSS Options Screening Tool">
                Maryland LTSS Options Screening Tool
              </a>
            </em>
          </div>
        </Container>
      </div>
    </header>
  );
}