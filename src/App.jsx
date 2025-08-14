import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Container from "./components/Container.jsx";

/* Import styles */
import "./styles/uswds.css";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main id="main" className="main-container">
        <Container>
          <section aria-labelledby="welcome">
            <h1 id="welcome" className="margin-top-2">Welcome</h1>
            <p>
              The project scaffold is ready. USWDS styles, Source Sans Pro, header, footer, and
              responsive layout are in place. We’ll add the questionnaire and results in the next steps.
            </p>
            <button className="usa-button">Primary action</button>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}