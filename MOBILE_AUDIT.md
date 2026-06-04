# Auditoria movil Automize

Fecha: 2026-04-29  
Entorno auditado: `http://127.0.0.1:4324/` desde el checkout actual de `projects/automize/web`  
Viewports usados: `390x844` y `320x844` con Chrome DevTools Protocol

Actualizacion documental: 2026-06-04. El sitio actual ya incluye paginas internas comerciales y tests de la Function de contacto. La evidencia visual de esta auditoria sigue siendo la registrada el 2026-04-29; no se agrego nueva captura en esta actualizacion.

## Estado general

La version movil auditada era funcional y visualmente consistente, pero todavia no estaba optimizada para retener y convertir. Despues de la implementacion del 2026-04-29, se resolvieron o mitigaron las fricciones principales en `390x844`: header demasiado alto, CTA inconsistente, hero generico, orden de apps y falta de prueba de impacto. Queda pendiente repetir la verificacion visual en `320x844`.

## Implementacion aplicada

Fecha: 2026-04-29  
Estado: cambios aplicados sobre la landing actual y verificados en `390x844`.

- Header movil compactado: baja de `245px` a `123px` en `390x844`.
- CTA principal unificado a `Solicitar diagnostico` en header, hero y formulario.
- Hero reorientado desde categoria generica a dolor/resultado: menos trabajo manual y mas control operativo.
- Flujo movil ajustado de `Build / Growth` a `Implementacion / Mejora continua`.
- Apps reordenadas para mostrar herramientas operativas antes de IA.
- Nuevo bloque `Impacto esperado` antes de servicios para justificar retorno antes de construir.
- CTAs intermedios agregados despues de problemas y servicios.
- El contrato fail-closed del formulario se mantiene: sin canal configurado, no simula exito.

## Evidencia post-implementacion

- `390x844`: `scrollWidth=390`, `horizontalOverflow=0`, `scrollHeight=8973`.
- Header movil medido en `390x844`: `123px`.
- H1 post-cambio: `Menos trabajo manual, mas control operativo`, `330px` de ancho y `116px` de alto.
- Consola: sin errores de aplicacion detectados; solo logs de Vite dev client.
- Build validado con `PATH=/opt/homebrew/bin:$PATH pnpm build`.
- Capturas post-cambio:
  - `/private/tmp/automize-mobile-audit-390/home.png`
  - `/private/tmp/automize-mobile-audit-390/problema.png`
  - `/private/tmp/automize-mobile-audit-390/servicios.png`
  - `/private/tmp/automize-mobile-audit-390/metodo.png`
  - `/private/tmp/automize-mobile-audit-390/contacto.png`
  - `/private/tmp/automize-mobile-audit-390/contacto-form.png`

Pendiente de re-verificacion: repetir captura post-cambio en `320x844`. El entorno bloqueo esa segunda ejecucion por limite de aprobacion, asi que no se registra como verificada.

## Estado actual de documentacion

- `README.md` y `AGENTS.md` registran el sitio como proyecto comercial estatico, no solo landing de una pagina.
- `PENDING.md` mantiene como activo solo la re-verificacion `320x844` y la confirmacion de captura real en Cloudflare Pages.
- `tests/contact.test.mjs` cubre el contrato principal de la Function de contacto.

## Evidencia tecnica

- `390x844`: `scrollWidth=390`, `horizontalOverflow=0`, `scrollHeight=7747`.
- `320x844`: `scrollWidth=320`, `horizontalOverflow=0`, `scrollHeight=8379`.
- Header movil medido: `245px` de alto en ambos anchos.
- H1 medido:
  - `390px`: `330px` de ancho, `83px` de alto.
  - `320px`: `272px` de ancho, `115px` de alto.
- Consola: sin errores de aplicacion detectados; solo logs de Vite dev client.
- Capturas locales generadas:
  - `/private/tmp/automize-mobile-audit-390/home.png`
  - `/private/tmp/automize-mobile-audit-390/problema.png`
  - `/private/tmp/automize-mobile-audit-390/servicios.png`
  - `/private/tmp/automize-mobile-audit-390/metodo.png`
  - `/private/tmp/automize-mobile-audit-390/contacto.png`
  - `/private/tmp/automize-mobile-audit-390/contacto-form.png`
  - `/private/tmp/automize-mobile-audit-320/home.png`
  - `/private/tmp/automize-mobile-audit-320/contacto.png`

## Lo que se mantiene

- No hay overflow horizontal real en los viewports probados.
- La identidad visual oscura, verde y tecnica se siente consistente con una marca premium de automatizacion.
- El flujo movil del hero `Diagnostico -> Build -> Growth` ayuda a explicar el servicio sin depender del diagrama desktop.
- Las secciones de problemas son las mas fuertes: ventas, soporte, administracion y legal/RR. HH. hablan en lenguaje de negocio.
- El formulario es usable en movil: inputs grandes, buen contraste, labels claras y textarea legible.
- La pagina respeta el contrato fail-closed: el formulario queda bloqueado cuando la captura no esta configurada.

## Hallazgos criticos

### P0 - Header movil demasiado alto

Estado: resuelto en `390x844`; pendiente confirmar en `320x844`.

El header sticky ocupa cerca de `245px`, casi un 29% del alto visible en `390x844`. En cada anchor, el usuario vuelve a ver logo, nav, idioma y CTA antes del contenido. Esto reduce retencion porque cada seccion empieza con friccion visual y menos contenido vendible.

Impacto: alto. La landing se siente pesada, especialmente al navegar a `Servicios`, `Metodo` o `Contacto`.

Propuesta: compactar el header movil a una sola fila o dos filas maximo. Dejar logo + CTA principal visibles y mover idioma/nav a un menu compacto o reducirlos despues del primer scroll.

### P0 - CTA inconsistente por estado no configurado

Estado: parcialmente resuelto. El texto visible se unifico, pero produccion todavia requiere configurar captura real.

El header muestra `Preparar diagnostico`, pero el hero usa `Solicitar diagnostico`. Como cliente, `Preparar` suena a sitio incompleto o a accion menos directa. El formulario tambien termina en `Preparar diagnostico ->` y muestra que la captura esta en preparacion.

Impacto: alto para conversion. Esto es correcto tecnicamente si falta `PUBLIC_LEAD_FORM_ACTION`, pero no es una experiencia publicable para vender.

Propuesta: para produccion, configurar captura real. Si se mantiene fail-closed en local, evitar evaluar conversion final con ese estado.

### P0 - Falta prueba de impacto antes del formulario

Estado: resuelto con el bloque `Impacto esperado`.

La pagina explica que automatiza, pero no demuestra suficientemente el retorno: tiempo ahorrado, errores evitados, ejemplos de antes/despues, SLA, volumen o dinero recuperado. Como comprador, necesito una razon concreta para pagar un diagnostico desde USD 900.

Impacto: alto. La propuesta se entiende, pero no termina de justificar compra.

Propuesta: agregar un bloque movil corto antes de contacto con 2-3 casos cuantificados o pseudo-casos claros: `reportes semanales`, `leads sin seguimiento`, `tickets sin SLA`.

## Hallazgos importantes

### P1 - Hero correcto visualmente, pero generico comercialmente

Estado: resuelto en copy inicial.

`Automatizacion, IA y workflows` comunica categoria, no dolor. El subtitulo es mejor, pero en movil aparece despues de un header grande y un H1 amplio. Para retencion, el primer mensaje deberia decir que problema de negocio se resuelve.

Propuesta: probar un H1 mas comercial, por ejemplo orientado a trabajo manual, trazabilidad y control.

### P1 - Primera pantalla no muestra suficiente valor antes del scroll

Estado: mejorado. Header compactado y H1 mas comercial; todavia conviene revisar si el precio/oferta debe subir mas en mobile.

En `390x844`, el primer viewport muestra header, eyebrow, H1, subtitulo y parte del flujo. El precio/oferta y CTAs reales aparecen despues. En `320x844`, el contenido se alarga mas.

Propuesta: reducir header y comprimir hero para que entren H1, subtitulo, CTA principal y una prueba de valor en el primer viewport.

### P1 - `Build` y `Growth` pueden sonar internos

Estado: resuelto en etiquetas visibles.

El flujo `Diagnostico -> Build -> Growth` es ordenado, pero mezcla ingles con una pagina comercial en espanol. Para un comprador no tecnico, `Implementacion` y `Mejora continua` pueden retener mejor.

Propuesta: mantener el concepto, cambiar la etiqueta visible en movil.

### P1 - Carousel de apps prioriza IA antes que operacion

Estado: resuelto en orden visual.

El strip empieza destacando Claude, Gemini, Codex y OpenAI. Eso refuerza IA, pero puede verse mas como vitrina de herramientas que como solucion operacional. Para el buyer, Slack, Sheets, Notion, Airtable, CRM o WhatsApp pueden conectar mejor con problemas reales.

Propuesta: reordenar o agrupar primero herramientas operativas y luego IA como motor.

### P1 - Contacto llega tarde y con mucha altura previa

Estado: mitigado con CTAs intermedios; la pagina sigue siendo larga.

La pagina movil es larga: `7747px` en 390 y `8379px` en 320. No es malo si retiene, pero el CTA principal debe repetirse en puntos de decision y el contacto debe sentirse como siguiente paso natural, no como final largo.

Propuesta: insertar CTA contextual despues de problemas y despues de servicios.

## Hallazgos menores

### P2 - Botones de idioma bajo target recomendado

Estado: mitigado por header mas simple; pendiente si se exige objetivo tactil estricto por boton.

Los botones `ES` y `EN` miden `36x34`, bajo el objetivo tactil de 44px. No bloquea la compra, pero es friccion.

Propuesta: elevarlos a minimo `44x44` o reducir su presencia en header movil.

### P2 - Anchors funcionan, pero el header domina el destino

Los anchors llegan a secciones correctas con scroll controlado, pero el header deja poco espacio para contenido. El problema no es el offset, es la altura sticky.

### P2 - Result chips largos en cards

Algunos chips de resultado, como `Mapa del proceso, puntos criticos...`, son utiles pero largos para movil. Funcionan, aunque visualmente compiten con el texto de la card.

Propuesta: partirlos en dos lineas controladas o convertirlos en bullets cortos.

## Prioridad de solucion

1. Compactar header movil.
2. Definir estado de CTA publicable: captura real o copy fail-closed menos anticompra.
3. Reescribir hero para dolor/resultado concreto.
4. Agregar prueba de impacto antes de contacto.
5. Reordenar apps y ajustar lenguaje `Build/Growth`.
6. Ajustar idioma/tap targets y chips largos.

## Criterio de compra

No compraria todavia en esta version movil porque entiendo el servicio, pero no tengo suficiente evidencia de retorno ni un CTA que se sienta completamente operativo. Compraria despues de ver, en el primer recorrido movil, un problema concreto, una promesa medible, un ejemplo realista y un siguiente paso claro.
