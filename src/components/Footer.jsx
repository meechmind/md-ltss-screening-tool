// Footer component
// src/components/Footer.jsx

import React from "react";
import Container from "./Container.jsx";

export default function Footer() {
  return (
    <footer className="usa-footer usa-footer--slim">
      <div className="usa-footer__primary-section">
        <Container>
          <div className="grid-row grid-gap">
            <div className="grid-col-12">
              <p className="usa-footer__contact-heading">
                Need help now? Call Maryland Access Point (MAP): <strong>1-844-MAP-LINK (1-844-627-5465)</strong>
              </p>
              <p className="margin-top-1">
                Social Security Administration: <strong>1-800-772-1213</strong> &nbsp;|&nbsp; VA Maryland HCS: <strong>1-800-949-1003</strong>
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="usa-footer__secondary-section">
        <Container>
          <p className="font-sans-2xs text-base">
            Disclaimer: This is a screening tool, not an application or a guarantee of eligibility. Figures are estimates and subject to change.
          </p>
        </Container>
      </div>
    </footer>
  );
}