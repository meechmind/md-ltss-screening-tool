// Footer component
// src/components/Footer.jsx

import Container from "./Container.jsx";
import { getDisclaimer, getContacts } from "../utils/logic.js";

export default function Footer() {
  const contacts = getContacts();

  return (
    <footer className="usa-footer usa-footer--slim">
      <div className="usa-footer__primary-section">
        <Container>
          <div className="grid-row grid-gap">
            <div className="grid-col-12">
              <p className="usa-footer__contact-heading">
                Need help now? Call Maryland Access Point (MAP):{" "}
                <strong>{contacts.map}</strong>
              </p>
              <p className="margin-top-1">
                Social Security Administration: <strong>{contacts.ssa}</strong>{" "}
                &nbsp;|&nbsp; VA Maryland HCS: <strong>{contacts.va}</strong>
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="usa-footer__secondary-section">
        <Container>
          <p className="font-sans-2xs text-base">{getDisclaimer()}</p>
        </Container>
      </div>
    </footer>
  );
}
