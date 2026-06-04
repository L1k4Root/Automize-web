# Future Web Expansion

Automize has grown from a single landing into a small static commercial website. Future expansion should keep the current operating thesis: automate repeated work without turning the client operation into a black box.

## Current Source of Truth

- `src/data/automize.ts`: structured page content, cases, offer ladder, method, FAQ.
- `src/data/i18n.ts`: visible ES/EN copy and form microcopy.
- `src/pages/index.astro`: page composition and section order.
- `src/components/LeadForm.astro`: lead intake UI.
- `src/components/ContactSection.astro`: shared conversion section.
- `src/layouts/BaseLayout.astro`: shared metadata, header, footer and script wiring.
- `functions/api/contact.js`: server-side validation, honeypot, Resend delivery and redirect contract.
- `tests/contact.test.mjs`: contact Function contract tests.

Keep this split. Add pages by reusing the same data shapes before inventing a CMS.

## Implemented Routes

- `/diagnostico`: dedicated diagnostic offer page with deliverables, fit, constraints and expected inputs.
- `/servicios`: concrete service offers for controlled automation.
- `/casos-de-uso`: highlighted operational AI use cases.
- `/casos`: grouped use-case library.
- `/herramientas`: how Automize works with WhatsApp, Sheets, CRM, Notion, n8n, Make and AI providers.
- `/agentes-ia`: supervised AI agent positioning.
- `/metodo` and `/como-trabajamos`: process, controls, documentation and support model.
- `/faq`: expanded objections and buying questions.

## Future Routes

- `/recursos`: practical guides for identifying automatable workflows.
- Individual use-case detail pages if search demand or sales conversations justify them.

## Reusable Components

- `UseCaseCard`: implemented for reusable use-case cards.
- `FaqList`: implemented for grouped FAQ entries.
- `ContactSection`: implemented for shared lead-capture sections.
- `SectionIntro`: implemented for consistent section headers.
- Future `OfferCard`: render ladder items such as diagnostic, first workflow and agent pilot when duplication increases.
- Future `ProcessSteps`: render diagnostic/mapping/build/testing/support flows when method pages need more structure.
- `LeadForm`: support compact and full diagnostic modes without changing the backend contract.

## Future Diagnostic Flow

The next step after the static form can be an assisted diagnostic:

1. Classify the submitted process: sales, support, admin, documents, tickets or other.
2. Score impact and effort from user-provided context.
3. Ask for missing context only when needed.
4. Route the lead to a Notion/CRM database.
5. Send a human-readable next-step email.

Do not make it fully automatic until the qualification criteria are proven with real leads.

## Copy Rules

- No fake clients, fake metrics or guaranteed outcomes.
- Do not lead with "we do AI"; lead with the operational problem.
- Keep "assigned person, visible status, alerts, human review and documentation" as the trust spine.
- Explain AI in terms of classification, extraction, summarization, context handling and bounded tasks.
- Keep pricing tied to a concrete diagnostic deliverable.

## Deferred QA

Add browser QA once the site grows beyond this landing:

- Mobile screenshots at `390x844` and `320x844`.
- Desktop screenshot at `1440x1000`.
- No horizontal overflow.
- Hero CTA visible early on mobile.
- Language switch has no blank or stale text.
- Form success/error paths remain clear.

This should use a browser runner only when the page count or release cadence justifies the dependency.
