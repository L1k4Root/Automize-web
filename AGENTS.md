# AGENTS.md

## Project Overview

This is the standalone Astro landing for `Automize`, a premium workflow automation brand. It is not a Fluxora route or shared subproject. Its job is to convert manual work, scattered data, approvals, and repeated operational tasks into controlled workflow-automation leads.

## Current Structure

```txt
/
├── astro.config.mjs
├── functions/
│   └── api/
│       └── contact.js
├── public/
│   ├── automatize-icon.png
│   └── codex-macos-template.png
├── src/
│   ├── components/
│   │   ├── CardGrid.astro
│   │   ├── LanguageSwitch.astro
│   │   └── LeadForm.astro
│   ├── config/
│   │   └── landing.ts
│   ├── data/
│   │   ├── automatize.ts
│   │   └── i18n.ts
│   ├── pages/
│   │   ├── gracias.astro
│   │   └── index.astro
│   ├── scripts/
│   │   ├── analytics.ts
│   │   ├── i18n.ts
│   │   ├── landing.ts
│   │   ├── lead-form.ts
│   │   └── navigation.ts
│   └── styles/
│       └── global.css
└── package.json
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Use Node `22.12.0` from `.nvmrc`. If the ambient shell uses an older Node version, Astro 6 will fail before build.

## Runtime Contracts

- `src/config/landing.ts` is the public env boundary.
- `PUBLIC_LEAD_FORM_ACTION` controls whether lead capture is active.
- When `PUBLIC_LEAD_FORM_ACTION` is missing, the form must fail closed with `action="#"`.
- `functions/api/contact.js` owns server-side validation, honeypot handling, Resend delivery, structured logs, and `/gracias` redirects.
- The lead form fields are `name`, `email`, `website`, `symptom`, `source`, `offer`, and honeypot `company_fax`.
- The bilingual layer is static-first: Spanish HTML by default, client-side switch for English.

## Code Rules

- Keep Automize independent from Fluxora navigation, metadata, assets, and deploy assumptions.
- Prefer small Astro components and focused browser modules over adding framework state.
- Keep `src/data/automatize.ts` for structured page data and `src/data/i18n.ts` for language copy.
- Do not add runtime dependencies for logo strips, forms, analytics, or i18n unless explicitly requested.
- Keep form behavior production-safe: no fake success when capture is unconfigured.
- Do not log full lead email addresses or secrets. Use request IDs and non-sensitive metadata.
- Preserve the Cloudflare Pages setup: root `web/automize`, build command `pnpm build`, output `dist`, Node `22.12.0`.

## Verification

Minimum check after code changes:

```bash
pnpm build
```

If lead-capture logic changes, also check:

```bash
node --check functions/api/contact.js
```

For local Function testing:

```bash
pnpm build
npx wrangler pages dev dist
```
