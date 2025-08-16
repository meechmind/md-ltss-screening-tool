# AGENTS.md

This guide helps AI assistants and contributors work efficiently in this repository.

## Project overview
React + Vite application serving the Maryland LTSS Options Screening Tool. Content and thresholds live in `src/config.json`. For deeper context and project history, see `Agent/Agent.md`.

## Environment
- Use Node.js ≥18 (LTS recommended).
- Install dependencies with `npm ci` (or `npm install`).

## Common commands
```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # serve build locally

npm run lint     # ESLint (must pass with 0 warnings)
npm run test:run # Vitest in CI mode
```

## Coding conventions
- ES modules with React 18.
- Two‑space indentation, double quotes, and semicolons.
- Keep user‑facing text and thresholds in `src/config.json`.
- Place unit tests near utilities (e.g., `src/utils/__tests__/`).

## Commit checklist
1. `npm run lint`
2. `npm run test:run`
3. Update or add tests/docs/config as needed.
4. Use concise, present‑tense commit messages.

## Useful paths
- App entry: `src/main.jsx`, `src/App.jsx`
- Styles: `src/styles/global.css`
- Runbook: `Agent/Agent.md`

---

### Sources
- Scripts and lint/test commands in `package.json`
- Run/test workflow in `Agent/Agent.md`
- Formatting conventions demonstrated in `src/App.jsx`
