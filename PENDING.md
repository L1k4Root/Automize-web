# Pending

## Activo

- Revalidar manualmente el header movil en `320x844`; existe captura headless simple, pero falta QA en navegador/in-app.
- Confirmar la configuracion real de captura en Cloudflare Pages antes de evaluar conversion de produccion.

## Criterio esperado

- el header no debe tapar el hero ni dominar el primer viewport
- la version flotante debe sentirse compacta y estable
- la navegacion por anclas debe seguir funcionando con el offset correcto
- el resultado final debe verificarse en mobile despues de cambios de CSS/header
- el formulario debe seguir fallando cerrado cuando `PUBLIC_LEAD_FORM_ACTION` no exista

## Estado conocido

- Header movil compactado y validado en `390x844` segun `MOBILE_AUDIT.md`.
- Evidencia parcial: captura headless simple en `320x844`; pendiente repetir en navegador real/in-app.
- Tests de contacto disponibles con `pnpm test`.
- Previews internos de componentes disponibles solo en dev bajo `/dev-preview/{header,footer,hero,sobre-nosotros,servicios,contacto,hero-diagram}`; `getStaticPaths()` devuelve vacio en produccion para no generar esas rutas en `dist`.
