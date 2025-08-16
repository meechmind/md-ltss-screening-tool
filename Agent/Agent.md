# LTSS_ChatGPT.md — Project Handoff & Runbook
_Last updated: August 15, 2025_

This document is a complete handoff for the **Maryland LTSS Options Screening Tool**. It’s written so a new helper (human or LLM) can jump in and ship changes without prior context.

---


## 1) Vision & Scope

**Goal:** A simple, accessible screening tool to help older adults (and caregivers) in **Maryland** understand **Long-Term Services & Supports (LTSS)** options. The user answers a few questions; we compute an outcome and show **clear next steps + contact information** (MAP, SSA, VA).

**V1 scope (MVP):**
- Single-page React app with **4 screening questions** → results card(s).
- Results include: summary, Medicare note (conditional), and **Next steps & contacts**.
- **Print-friendly** output (PDF handoff), **Copy summary**, **Copy link**.
- **FAQ** page (content from config), visually an accordion; **interactive** via React state.

**Audience:** Older adults and caregivers. Results may be printed and **handed to the older adult** → tone and layout matter.

**Design system:** Use **Maryland Digital Service** + **USWDS** defaults.
- Font: **Source Sans Pro** (base 16px; use relative sizes for headings).
- Use **USWDS** for components and tokens; where unspecified, follow USWDS guidance.

---

## 2) Tech Stack & Project Setup

**Stack**
- **React** + **Vite** (ESM).  
- **React Router** for `/`, `/results`, `/faq`.  
- **USWDS CSS via CDN** (no USWDS JS bundled for now, intentional).  
- **ESLint v9 (flat config)** with `react`, `react-hooks`, `jsx-a11y`.  
- **Vitest** for unit tests.  
- **Husky + lint-staged**: lint on commit; tests on push.  
- **axe-core/react** in dev for runtime a11y checks (console-only).

**Install & run**
```bash
npm ci          # or: npm install
npm run dev     # local dev server
npm run build   # production build
npm run preview # serve the build locally
```

**Quality / CI**
```bash
npm run lint      # ESLint (a11y recs)
npm run lint:fix  # ESLint autofix
npm run test      # Vitest watch mode
npm run test:run  # Vitest CI run
```

**Husky hooks**
- `pre-commit`: `lint-staged` runs ESLint on staged files (`*.js,*.jsx`).  
- `pre-push`: `npm run test:run`.  
- Hooks are the **new style** (no sourcing `_/husky.sh`).

**Why CDN for USWDS CSS?** Importing `@uswds/uswds` via NPM caused specifier resolution errors under Vite. We use the official CDN CSS for stability. If dynamic USWDS components are added later, revisit bundling JS intentionally.

---

## 3) Environment & Versions (pin these)

**Node**: prefer **18.20.3** (use `.nvmrc`).  
**React**: 18.x.  
**Vite**: 7.x.  
**USWDS CSS (CDN)**: 3.8.0 (in `index.html`).

Create/commit:
```bash
# .nvmrc
v18.20.3
```

Optional in `package.json`:
```json
"engines": { "node": ">=18.20.3 <19" }
```

---

## 4) Repository Layout (key files)

```
src/
  App.jsx
  main.jsx
  styles/
    global.css            # app-level styles + print tuning
  components/
    Container.jsx
    Header.jsx
    Footer.jsx            # disclaimer source (from config.meta.disclaimer)
    StepIndicator.jsx
    ResultCard.jsx        # { title, className, children } + data-title on body for print
    CTAList.jsx
  pages/
    Questions.jsx
    Results.jsx
    FAQ.jsx
  utils/
    logic.js              # core rules; reads config.json
    phone.js              # toTelHref()
    __tests__/
      logic.test.js
      phone.test.js
config.json               # content + thresholds, contacts, FAQ, meta
index.html                # includes USWDS CSS from CDN
eslint.config.js          # ESLint v9 flat config
```

---

## 5) Content & Configuration

All mutable content lives in **`src/config.json`** (JSON so non-devs can edit; future: admin page). Suggested shape:

```json
{
  "meta": {
    "appTitle": "Maryland LTSS Options Screening Tool",
    "disclaimer": "This is a screening tool, not an application or guarantee of eligibility..."
  },
  "contacts": [
    { "label": "Call Maryland Access Point (MAP)", "value": "1-844-MAP-LINK (1-844-627-5465)" },
    { "label": "Social Security Administration", "value": "1-800-772-1213" },
    { "label": "VA Maryland Health Care System", "value": "1-800-949-1003" }
  ],
  "faq": [
    { "q": "Does Medicare cover long-term services and supports (LTSS)?",
      "a": [
        "Medicare is health insurance designed for medical recovery, not for long-term custodial care.",
        "Medicare may cover short-term, skilled care to help you rehabilitate after a hospital stay or specific medical event.",
        "Medicare does not cover ongoing personal support like help with bathing, dressing, or cooking. This is why Medicaid programs can be important."
      ]
    }
  ],
  "thresholds": {
    "incomeLow": 1250,
    "incomeMid": 2900,
    "assetCap": 2000
  }
}
```

**Where it’s used**
- `Footer.jsx` → `meta.disclaimer`.  
- `CTAList.jsx` → `contacts` with tel: formatting via `toTelHref()`.  
- `FAQ.jsx` → `faq`.  
- `logic.js` → `thresholds` + mapping to compute results.

---

## 6) Business Logic (overview)

Questions (V1):  
1) Situation (A–D)  
2) Payer help (A–C: LTC / VA / None)  
3) Financial picture (A–C) vs thresholds in `config.thresholds`  
4) Medicare enrollment (A/B)

**URL encoding**: answers carried via querystring `?a1=…&a2=…&a3=…&a4=…` so results are refresh-safe/shareable (non-PII).

**Key functions (`src/utils/logic.js`)**
- `computeResult({ a1, a2, a3, a4 }) → {{title, summary[], showMedicareNote}}`
- `medicareNoteNeeded(flag) → string[] | null`
- `buildCTAs() → [ {{ label, value }} ]`
- `getFAQ()`, `getMeta()`

**Tests**
- `logic.test.js`: outcome paths & Medicare note permutations.
- `phone.test.js`: `toTelHref()` covers MAP-LINK pattern.

---

## 7) Accessibility

- All four questions **required**; “See my results” disabled until complete; live region prompt.  
- **Error summary** anchors focus the first radio in each group.  
- Landmarks/headings are logical (`main` role).  
- High-contrast links (blue-70v/80v), darker hint text → **AAA** on white.  
- Fallback **focus ring**.  
- **FAQ accordion**: keyboard accessible (Enter/Space), `aria-expanded`, `aria-controls`, `role="region"`, and prints expanded.  
- **axe-core/react** logs in dev; color-contrast & interaction warnings resolved.  
  - Firefox panel may show one “generic / keyboard” item from tooling; ESLint + axe are truth.

**ESLint v9 (flat)**: `react`, `react-hooks`, `jsx-a11y` recommended rules; lint on commit, tests on push.

---

## 8) Print & Export

- Buttons hidden in print; **“Printed on: {{date}}”** line.  
- Print-only **“Question responses”** card lists user answers.  
- All cards render a **uniform printed header** (from `data-title` on `.usa-card__body`).  
- **Hanging bullets** align with headers.  
- **FAQs** print expanded with simple headers.  
- **Copy summary** (optional include answers) and **Copy link** on results.

---

## 9) UI Components (quick notes)

- **Header.jsx**: App title + link to FAQ (`<Link to="/faq">`).
- **Footer.jsx**: single source of truth for the **disclaimer** (from `config.meta.disclaimer`).
- **StepIndicator.jsx**: simple 2-step display (current step prop).
- **ResultCard.jsx**: wraps sections in USWDS card markup; accepts `className` and sets `data-title` for print headings.
- **CTAList.jsx**: renders contacts as a list with tel links using `toTelHref()`.
- **Questions.jsx**: four fieldsets with radios; form parses → navigate to `/results?…`.
- **FAQ.jsx**: interactive accordion (React state; single-open).

---

## 10) Decisions (and why)

- **USWDS via CDN CSS**: avoids Vite specifier issues; JS not needed yet.  
- **React FAQ accordion**: smaller, accessible, no external JS.  
- **Disclaimer** in Footer only.  
- **Query params** for shareable results; no server.  
- **AAA contrast** tweak for links/hints.  
- **Print titles via `data-title`** to make headers consistent across cards.  
- **Tooling**: ESLint v9 flat config, Husky, Vitest, axe in dev.

---

## 11) What’s Done

- ✅ Vite + React Router scaffolding  
- ✅ USWDS CSS + MD brand basics  
- ✅ 4-question flow + Results  
- ✅ Contacts with tel links  
- ✅ FAQ page (interactive)  
- ✅ Print polish: titles, “Printed on,” answers card, hanging bullets  
- ✅ A11y: axe wiring, contrast fixes, keyboard focus, focus ring  
- ✅ Lint/test/CI: ESLint v9, Vitest, Husky  
- ✅ Unit tests for logic and phone util

---

## 12) Backlog (prioritized)

**A. Content & copy (senior-friendly)** — plain language pass; ensure clarity per outcome.  
**B. Admin for thresholds/content** — tiny admin to edit `config.json`, with validation + preview; version & rollback.  
**C. Tests** — expand logic tests to cover all permutations + threshold edges.  
**D. A11y automation** — component-level axe tests in Vitest (Testing Library).  
**E. i18n (future)** — prep for Spanish; keep English now.  
**F. Visual pass** — spacing rhythm, card visuals (post-MVP).  
**G. Hosting & CI/CD** — deploy (GH Pages / Netlify / Vercel).  
**H. Privacy note** — clarify that URLs include selections; optional “Clear answers”.  
**I. FAQ enhancements** — multi-open option; deep links (`/faq#id`).

---

## 13) Deployment Recipes (SPA routing)

**Netlify** — add `_redirects` in the build output (or repo root if configured):
```
/*  /index.html  200
```

**Vercel** — `vercel.json`:
```json
{ "rewrites": [{{ "source": "/(.*)", "destination": "/" }}] }
```

**GitHub Pages** — two options:
- Use **HashRouter** (`import {{ HashRouter as Router }} from 'react-router-dom'`) for zero-config routing, **or**
- Add a SPA 404 fallback (serve `index.html` for unknown paths).

---

## 14) Continuous Integration (GitHub Actions)

Create `.github/workflows/ci.yml`:
```yaml
name: CI
on:
  push: {{ branches: [main] }}
  pull_request: {{ branches: [main] }}
jobs:
  build-test-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18.20.3'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:run
      - run: npm run build
```

---

## 15) Config Schema (validate `src/config.json`)

Add `src/config.schema.json`:
```json
{{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["meta","contacts","faq","thresholds"],
  "properties": {{
    "meta": {{
      "type": "object",
      "required": ["appTitle","disclaimer"],
      "properties": {{
        "appTitle": {{ "type": "string", "minLength": 1 }},
        "disclaimer": {{ "type": "string", "minLength": 1 }}
      }}
    }},
    "contacts": {{
      "type": "array",
      "items": {{
        "type": "object",
        "required": ["label","value"],
        "properties": {{
          "label": {{ "type": "string" }},
          "value": {{ "type": "string" }}
        }}
      }}
    }},
    "faq": {{
      "type": "array",
      "items": {{
        "type": "object",
        "required": ["q","a"],
        "properties": {{
          "q": {{ "type": "string" }},
          "a": {{ "type": "array", "items": {{ "type": "string" }} }}
        }}
      }}
    }},
    "thresholds": {{
      "type": "object",
      "required": ["incomeLow","incomeMid","assetCap"],
      "properties": {{
        "incomeLow": {{ "type": "number" }},
        "incomeMid": {{ "type": "number" }},
        "assetCap": {{ "type": "number" }}
      }}
    }}
  }},
  "additionalProperties": false
}}
```

_Optional validation in CI:_ add `ajv` and a small node script to fail the build if the JSON is invalid.

---

## 16) Outcome Matrix (template)

Fill this with your **current** outputs to make future edits trivial:

```
a2 (payer)  a3 (finances)  a1 (situation)  a4 (Medicare)  → Result title                        → Notes / Medicare
----------- -------------- ---------------- --------------  ------------------------------------  --------------------
A (LTC)     *              *                *               Your LTC policy is your first step     Note if needed
B (VA)      *              *                *               Explore VA LTSS options                Note if needed
C (None)    A (lowest)     *                A/B             Medicaid track …                        Note if needed
C (None)    B (mid)        *                A/B             …                                       …
C (None)    C (higher)     *                A/B             Private pay resources …                 …
```

---

## 17) Browser Support & QA Matrix

**Supported browsers**: Chrome/Edge/Firefox (latest 2), Safari ≥ 16, iOS ≥ 15.  
**Manual QA checklist** (each release):
- Keyboard-only form completion and submit (Tab/Shift+Tab; Space/Enter on radios).
- Error summary links focus the correct question.
- Results buttons: Print / Copy summary / Copy link.
- FAQ toggles via mouse **and** keyboard; print shows expanded answers.
- Print preview: titles, bullets, date, disclaimer present; no card splits.
- Axe (dev console): 0 violations.

---

## 18) LLM Onboarding Prompt

“You are assisting on a small React + Vite project for the Maryland LTSS screening tool. Be concise, senior-friendly, and follow USWDS design guidance. **Don’t introduce a backend.** Content and thresholds live in `src/config.json`. If you change thresholds or logic, update unit tests. Keep accessibility high: use semantic elements, ARIA only when necessary, and verify with axe (dev). Use our print conventions: card titles are printed via `data-title`, FAQs print expanded, and buttons are hidden. When in doubt, propose small, reversible patches with copy-pasteable code, and prefer testable changes.”

---

## 19) Annual Update Playbook (thresholds)

1. Edit `src/config.json` → `thresholds` values.  
2. Update boundary tests in `logic.test.js`.  
3. `npm run test:run` (all green).  
4. Sanity check `/results` for each financial tier; verify print view.  
5. Update “Last updated” date in this file; open a PR.

---

## 20) Release Checklist

- [ ] Lint/test pass (`npm run lint`, `npm run test:run`).  
- [ ] Axe (dev console): **0 violations**.  
- [ ] Print preview OK (titles, bullets, date, disclaimer).  
- [ ] Update “Last updated” in `LTSS_ChatGPT.md`.  
- [ ] Tag release in Git (`vYYYY.MM.DD`).  
- [ ] Deploy + spot-check routes (FAQ, direct `/results?...`).

---

## 21) License & Ownership

Choose a license (MIT/Apache-2.0). Include attribution notes consistent with Maryland Digital Service/USWDS usage.

---

## 22) Privacy Note

Results URLs contain the user’s selections (non-PII). Consider:  
- A small UI note near **Copy link** about this.  
- A **Clear answers** action that routes back to `/` without query params.

---

## 23) How-To Guides (quick)

**Update thresholds/contacts/FAQ**
1. Edit `src/config.json`.  
2. Run tests + print preview.

**Add/change a question**
- Update `Questions.jsx` + `Results.jsx` URL parser.  
- Update `logic.js` + tests.  
- Extend the “Question responses” mapping.

**Make FAQ multi-open**
- Replace `openIdx` with a `Set` of open indices; toggle logic accordingly.

---

## 24) Troubleshooting

- Vite “not found” → `npm install` or `npm ci`.  
- USWDS import errors → use CDN CSS in `index.html` only.  
- Blank page → check console for JSX syntax; restart dev.  
- ESLint “Unexpected token <” → ensure `eslint.config.js` has `ecmaFeatures.jsx = true`.  
- Husky deprecation warnings → hooks should be one-line commands (no `_/husky.sh`).

---

## 25) Open Questions / Future Decisions

- Admin auth approach (GitHub OAuth? simple token?).
- Hosting target and environment banner.
- Spanish translation timeline and content review by Maryland agencies.
- Privacy stance on sharable results URLs.
---

## 26) Snippets (reference)

**`eslint.config.js` (flat)**
```js
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**','dist/**','build/**','coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: { react: reactPlugin, 'react-hooks': hooks, 'jsx-a11y': jsxA11y },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'jsx-a11y/no-autofocus': 'off'
    }
  }
];
```

**`package.json` scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix"
  }
}
```

**`toTelHref()`**
```js
export function toTelHref(display) {
  const matches = display.match(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  const raw = (matches?.[matches.length - 1] || display).replace(/\D/g, '');
  const withCountry = raw.length === 10 ? `1{raw}` : raw;
  return `tel:+${withCountry}`;
}
```
