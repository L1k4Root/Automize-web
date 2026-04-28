# AGENTS.md

## Project overview

This is the standalone Astro landing for `Automatize`, a premium workflow automation brand. It is not a subroute or subproject inside Fluxora. Its focus is turning manual work, scattered data, approvals, and repeated operational tasks into controlled workflows.

## Structure

```txt
/
├── package.json
├── astro.config.mjs
├── public/
│   └── automatize-icon.png
└── src/
    ├── components/
    │   ├── CardGrid.astro
    │   └── LeadForm.astro
    ├── config/
    │   └── landing.ts
    ├── data/
    │   └── automatize.ts
    ├── pages/
    │   └── index.astro
    ├── scripts/
    │   └── landing.ts
    └── styles/
        └── global.css
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Rules

- Keep Automatize independent from Fluxora navigation, metadata, and assets.
- Keep the form fail-closed when `PUBLIC_LEAD_FORM_ACTION` is missing.
- Keep the page visually premium and workflow-automation focused.
- Do not add external runtime dependencies for logo strips or integrations unless explicitly requested.
