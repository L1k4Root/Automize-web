# Automize Landing

Landing estatica independiente para la marca `Automize`, enfocada en automatizacion de flujos de trabajo.

No es una subruta operativa de Fluxora: tiene su propio proyecto Astro, metadata, icono, copy, assets y build.

## Ejecutar

```bash
pnpm install
pnpm dev
```

Build estatico:

```bash
pnpm build
```

## Configuracion operativa

La landing falla cerrado si no existe proveedor de captura configurado:

```bash
PUBLIC_LEAD_FORM_ACTION="https://proveedor.example/form-id"
PUBLIC_LEAD_FORM_PROVIDER="formspree"
PUBLIC_CALENDAR_URL="https://cal.com/automize/evaluacion"
PUBLIC_ANALYTICS_PROVIDER="plausible"
```

La pagina emite `CustomEvent("automatize:analytics")` y usa `window.plausible` o `window.gtag` si existen.

## Decisiones cerradas

- Se publica como landing independiente, no como subruta de Fluxora.
- El hook comercial visible queda como `Desde USD 900`.
- El carrusel usa chips nominales de apps, no logos oficiales externos.
- El deploy recomendado es un proyecto estatico separado con root en `web/automize`.
