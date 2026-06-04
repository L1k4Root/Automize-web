# Automize Landing

Landing estatica independiente para `Automize`, enfocada en automatizacion de procesos, IA, integraciones y workflows operables.

El trabajo pendiente de esta web vive en `PENDING.md`.

## Stack

- Astro con salida estatica (`output: "static"`)
- TypeScript en componentes, datos y scripts del navegador
- Cloudflare Pages para hosting
- Cloudflare Pages Functions para `POST /api/contact`
- Resend como proveedor de email transaccional del lead

Node esperado:

```bash
nvm use
```

El repo incluye `.nvmrc` con `22.13.0`. Si el shell usa una version menor, Astro 6 falla el build.

## Estructura

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
│   │   ├── LanguageSwitch.astro
│   │   └── LeadForm.astro
│   ├── config/
│   │   └── landing.ts
│   ├── data/
│   │   ├── automize.ts
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

## Comandos

Instalar dependencias:

```bash
pnpm install
```

Desarrollo Astro:

```bash
pnpm dev
```

Build estatico:

```bash
pnpm build
```

Preview Astro:

```bash
pnpm preview
```

Si tu shell no esta usando Node `22.13.0`, usa temporalmente:

```bash
PATH=$HOME/.nvm/versions/node/v22.13.0/bin:$PATH pnpm build
```

## Configuracion publica

La landing falla cerrado si `PUBLIC_LEAD_FORM_ACTION` no existe. En ese estado el formulario no envia datos y muestra un mensaje operativo.

Variables publicas recomendadas:

```bash
PUBLIC_LEAD_FORM_ACTION="/api/contact"
PUBLIC_LEAD_FORM_PROVIDER="pages-function"
PUBLIC_CALENDAR_URL="https://cal.com/automize/evaluacion"
PUBLIC_ANALYTICS_PROVIDER="plausible"
```

Contrato en codigo:

- `src/config/landing.ts` lee las variables `PUBLIC_*`
- `src/components/LeadForm.astro` renderiza `action="#"` si la captura no esta configurada
- `src/scripts/lead-form.ts` valida required fields, bloquea doble submit y maneja errores JSON de la Function
- Campos enviados: `name`, `email`, `company`, `industry`, `symptom`, `tools`, `impact`, `source`, `offer` y honeypot `company_fax`

## Captura de leads

Para Cloudflare Pages Functions, configura estas variables privadas en Cloudflare:

```bash
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_TO_EMAIL="contacto@automize.cl"
CONTACT_FROM_EMAIL="Automize <contacto@automize.cl>"
```

`CONTACT_TO_EMAIL` tiene fallback en codigo a `contacto@automize.cl`, pero conviene dejarlo tambien en Cloudflare para que el contrato operativo quede explicito. `CONTACT_FROM_EMAIL` debe ser un remitente permitido por Resend; si `automize.cl` no esta verificado en Resend, Resend puede rechazar el envio aunque la Function este correcta.

Flujo:

1. El formulario envia `POST /api/contact`
2. `functions/api/contact.js` valida campos obligatorios, email y largos maximos
3. El honeypot `company_fax` redirige a `/gracias` sin enviar email
4. La Function envia el lead a Resend con `Idempotency-Key`
5. Si Resend responde OK, la Function redirige a `/gracias`
6. Si falla, devuelve JSON `{ ok: false, message }` con `x-request-id`

Para desarrollo local con Functions:

```bash
pnpm build
npx wrangler pages dev dist
```

Usa `.dev.vars` para las variables privadas:

```bash
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_TO_EMAIL="contacto@automize.cl"
CONTACT_FROM_EMAIL="Automize <contacto@automize.cl>"
```

## Idiomas

El HTML base se renderiza en espanol. El switch `ES / EN` cambia texto, metadata, placeholders, tooltips y estados del formulario en cliente.

- Copy estructural de la landing: `src/data/automize.ts`
- Diccionario bilingue: `src/data/i18n.ts`
- Runtime de cambio de idioma: `src/scripts/i18n.ts`
- Componente del selector: `src/components/LanguageSwitch.astro`

Se puede forzar ingles con:

```txt
/?lang=en
```

## Copy y mensaje comercial

Mensaje central:

```txt
Transformamos el trabajo tedioso en procesos automatizados utilizando soluciones de inteligencia artificial.
```

La landing debe hablar en el lenguaje operativo de cada area:

- Ventas: leads, cotizaciones, CRM, seguimiento y proxima tarea comercial.
- Soporte: tickets, prioridad, SLA, responsable y estado.
- Administracion: reportes, cobranza, planillas, conciliacion y validacion.
- Legal / RR. HH.: contratos, aprobaciones, permisos, onboarding, vencimientos y registro.

El hero actual reduce el mensaje a `Automatizacion, IA y workflows`. El bloque de integraciones vende continuidad entre apps: el trabajo debe avanzar sin depender de copiar, perseguir o recordar manualmente. La seccion de problemas debe mantenerse concreta y orientada a procesos automatizables, no a automatizacion generica.

## UX actual

- Header sticky con estado `is-scrolled` al bajar la pagina.
- En desktop, el header pasa a una barra flotante con margen lateral, bordes redondeados, sombra y fondo mas solido.
- La navegacion por anclas calcula offset en base a la altura real del header.
- El carrusel de integraciones mezcla iconos remotos y assets locales definidos en `src/data/automize.ts`.
- La version movil todavia requiere refinamiento visual del header; no debe marcarse como cerrada hasta validar que se vea elegante y no tape el hero.

## Analytics

La pagina emite eventos con:

```js
CustomEvent("automize:analytics")
```

Tambien llama `window.plausible` o `window.gtag` si existen.

Eventos actuales:

- `cta_click`
- `language_switch`
- `lead_form_validation_error`
- `lead_form_unconfigured`
- `lead_form_submit`
- `lead_form_delivery_error`
- `lead_form_network_error`
- `calendar_click`

## Deploy en Cloudflare Pages

Configuracion recomendada:

```txt
Framework preset: Astro
Root directory: projects/automize/web
Build command: pnpm build
Build output directory: dist
Node.js version: 22.13.0
```

Cada push a GitHub redeploya el proyecto si Pages esta conectado al repo.

## Decisiones cerradas

- Automize se publica como landing independiente, no como subruta de Fluxora.
- El hook comercial visible queda como `Desde USD 900`.
- El formulario debe fallar cerrado cuando no existe `PUBLIC_LEAD_FORM_ACTION`.
- La captura real usa Cloudflare Pages Functions y Resend.
- El selector bilingue es client-side para mantener el sitio estatico simple.
- La mejora del proyecto debe continuar como refinamiento progresivo de la landing actual.
