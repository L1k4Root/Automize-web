# AGENTS.md

## Project Overview

This is the standalone Astro commercial site for `Automize`, a premium workflow automation brand. Its job is to convert manual work, scattered data, approvals, and repeated operational tasks into controlled workflow-automation leads.

Treat the product direction as iterative improvement. Future work should refine the current pages, copy, mobile behavior, and conversion flow instead of replacing the existing structure without a clear reason.

## Current Structure

```txt
/
├── astro.config.mjs
├── functions/
│   └── api/
│       └── contact.js
├── public/
│   ├── automize-icon.png
│   └── codex-macos-template.png
├── src/
│   ├── components/
│   │   ├── CardGrid.astro
│   │   ├── ContactSection.astro
│   │   ├── FaqList.astro
│   │   ├── LanguageSwitch.astro
│   │   ├── LeadForm.astro
│   │   ├── SectionIntro.astro
│   │   ├── SiteFooter.astro
│   │   ├── SiteHeader.astro
│   │   └── UseCaseCard.astro
│   ├── config/
│   │   └── landing.ts
│   ├── data/
│   │   ├── automize.ts
│   │   └── i18n.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── agentes-ia.astro
│   │   ├── casos-de-uso.astro
│   │   ├── casos.astro
│   │   ├── como-trabajamos.astro
│   │   ├── diagnostico.astro
│   │   ├── faq.astro
│   │   ├── gracias.astro
│   │   ├── herramientas.astro
│   │   ├── metodo.astro
│   │   ├── servicios.astro
│   │   └── index.astro
│   ├── scripts/
│   │   ├── analytics.ts
│   │   ├── i18n.ts
│   │   ├── landing.ts
│   │   ├── lead-form.ts
│   │   └── navigation.ts
│   └── styles/
│       └── global.css
├── tests/
│   └── contact.test.mjs
└── package.json
```

## Commands

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
pnpm test
```

Use Node `22.13.0` from `.nvmrc`. If the ambient shell uses an older Node version, Astro 6 will fail before build.

Pending work tracking for this repo lives in `PENDING.md`.
Within the parent MetricLogic repo, this project lives at `projects/automize/web`.

## Runtime Contracts

- `src/config/landing.ts` is the public env boundary.
- `PUBLIC_LEAD_FORM_ACTION` controls whether lead capture is active.
- When `PUBLIC_LEAD_FORM_ACTION` is missing, the form must fail closed with `action="#"`.
- `functions/api/contact.js` owns server-side validation, honeypot handling, Resend delivery, structured logs, and `/gracias` redirects.
- Lead emails are sent to `CONTACT_TO_EMAIL`, with `contacto@automize.cl` as the default operational fallback.
- The lead form fields are `name`, `email`, `company`, `industry`, `symptom`, `tools`, `impact`, `source`, `offer`, and honeypot `company_fax`.
- The bilingual layer is static-first: Spanish HTML by default, client-side switch for English.
- Navigation behavior lives in `src/scripts/navigation.ts`: anchor scrolling accounts for sticky header height, click tracking emits analytics events, and the header toggles `is-scrolled` after the user has moved beyond the first part of the viewport.
- Contact Function tests live in `tests/contact.test.mjs` and cover validation, fail-closed behavior, honeypot behavior, optional fields and email rendering.

## Code Rules

- Keep Automize independent from Fluxora navigation, metadata, assets, and deploy assumptions.
- Prefer small Astro components and focused browser modules over adding framework state.
- Keep `src/data/automize.ts` for structured page data and `src/data/i18n.ts` for language copy.
- Do not add runtime dependencies for logo strips, forms, analytics, or i18n unless explicitly requested.
- Keep form behavior production-safe: no fake success when capture is unconfigured.
- Do not log full lead email addresses or secrets. Use request IDs and non-sensitive metadata.
- Preserve the Cloudflare Pages setup: root `projects/automize/web`, build command `pnpm build`, output `dist`, Node `22.13.0`.
- Preserve the current improvement path: polish the existing Automize site, do not restart the page set or rename core contracts casually.

## Copy Direction

- Core message: "Transformamos el trabajo tedioso en procesos automatizados utilizando soluciones de inteligencia artificial."
- Write section and card copy in the language each buyer already uses day to day: sales can say leads, cotizaciones and CRM; support can say tickets, SLA and responsables; administration can say reportes, cobranza and planillas; legal / RR. HH. can say contratos, aprobaciones, permisos and onboarding.
- Keep copy commercial, concrete, and concise. The offer is not generic automation; it is making repeated work run as a controlled process with owners, status, and traceability.

## UX Direction

- The desktop header is sticky and becomes a rounded floating bar after scroll. Keep that transition subtle: it should feel elegant, not like a new component suddenly appears.
- Mobile header behavior has been compacted and validated at `390x844`; repeat visual QA at `320x844` before treating it as fully closed.
- The integration strip should sell continuity across the tools the client already uses. Avoid copy that sounds purely technical or like a list of logos.
- Do not claim the form is live unless `PUBLIC_LEAD_FORM_ACTION` is configured.

## Verification

Minimum check after code changes:

```bash
pnpm build
```

When contact capture behavior changes, also run:

```bash
pnpm test
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
