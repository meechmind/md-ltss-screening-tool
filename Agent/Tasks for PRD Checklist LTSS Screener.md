# Tasks for PRD Checklist: LTSS Screener

<aside>

August 13, 2025 

**Canvas: tasks-prd-ltss-screening-tool (parent tasks)**

Project: LTSS Screening Tool

</aside>

## **1.0 Project Setup & Planning**

- [x]  Create GitHub repository with README, license, and .gitignore.
- [x]  Configure React + Vite project structure.
- [x]  Set up Netlify/Vercel deployment pipeline.
- [x]  Define branching strategy (e.g., feature branches, main branch for production).
- [x]  Document development workflow.

## **2.0 Design System & Visual Foundation**

- [x]  Install and configure USWDS and Maryland Digital Service design tokens.
- [x]  Apply Source Sans Pro as primary font.
- [x]  Implement base layout components (header, footer, container).
- [x]  Define responsive grid and spacing system.

## **3.0 Information Architecture & Routing**

- [x]  Implement routing for / (questions) and /results (results page).
- [x]  Pass state between routes.
- [x]  Handle refresh and direct-link scenarios for results.

## **4.0 Content & Logic Integration**

- [x]  Parse “LTSS Options Screening Tool” into structured data.
- [x]  Encode decision logic as functions.
- [x]  Unit test each logic path.

## **5.0 Configurable Data Layer**

- [x]  Create config.json for thresholds, contact numbers.
- [ ]  Load JSON at runtime.
- [x]  Validate data structure and provide error handling.

## **6.0 Questionnaire Experience**

- [x]  Build accessible form for 4 questions.
- [ ]  Implement state management.
- [x]  Add progress indicator.
- [x]  Validate inputs before allowing navigation.

## **7.0 Results Generation & Presentation**

- [x]  Map answers to correct logic path.
- [x]  Render plain-language summary.
- [x]  Render program cards with details.
- [x]  Display CTA blocks (MAP, SSA, VA).
- [x]  Show disclaimer.

## **8.0 Actions: Print & Copy**

- [x]  Implement print-friendly styles for results.
- [x]  Add “Print Results” button.
- [x]  Add “Copy Summary” button (plain text only).

## **9.0 Accessibility & Compliance**

- [x]  Perform axe-core audit.
- [x]  Add ARIA labels where necessary.
- [x]  Ensure keyboard navigation.
- [x]  Test with screen readers.
- [x]  Verify color contrast meets AAA.

## **10.0 Privacy & Analytics**

- [ ]  Integrate Plausible/umami analytics.
- [ ]  Track only non-PII events.
- [ ]  Provide opt-out link.

## **11.0 QA & Testing**

- [ ]  Write unit tests for logic.
- [ ]  Write integration tests for form flow.
- [ ]  Manually test each logic path.
- [ ]  Cross-browser/device testing.
- [ ]  Accessibility testing.

## **12.0 Deployment**

- [ ]  Configure CI/CD build previews.
- [ ]  Set environment configs.
- [ ]  Production deploy.
- [ ]  Verify site functions post-deployment.

## **13.0 Documentation**

- [ ]  Complete README with setup instructions.
- [ ]  Contributor Guide.
- [ ]  JSON thresholds update guide.
- [ ]  Content governance documentation.

## **14.0 Maintenance & Governance**

- [ ]  Define yearly update process for thresholds.
- [ ]  Assign update roles.
- [ ]  Implement version control for config.
- [ ]  Keep changelog.

## **15.0 Roadmap Scaffolding (Post-v1)**

- [ ]  Add hooks for admin mini-tool for config edits.
- [ ]  Prepare for i18n.
- [ ]  Design layout for additional pages.
- [ ]  Identify CTAs for expanded content.