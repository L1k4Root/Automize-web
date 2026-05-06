export type ContentCard = {
  i18nKey?: string;
  tag?: string;
  badge?: string;
  icon?: string;
  title: string;
  detail: string;
  fit?: string;
  includes?: string[];
  result?: string;
};

export type FlowSignal = {
  i18nKey?: string;
  label: string;
  value: string;
  tone: "manual" | "risk" | "ready";
};

export type HeroFlowStep = {
  i18nKey?: string;
  title: string;
  detail: string;
};

export type ProblemFlowItem = {
  i18nKey?: string;
  label: string;
  detail: string;
  tone: "leak" | "delay" | "control";
};

export type SystemStep = {
  i18nKey?: string;
  label: string;
  title: string;
  detail: string;
  tone: "input" | "rules" | "owner" | "exception" | "record";
};

export type IntegrationLogo = {
  name: string;
  mark: string;
  tone: "ai" | "flow" | "ops";
  logoUrl?: string;
  logoAlt?: string;
};

export type ImpactProof = {
  i18nKey?: string;
  metric: string;
  title: string;
  detail: string;
};

export type UseCase = {
  i18nKey?: string;
  offer: string;
  problem: string;
  pain: string;
  signal: string;
  automation: string;
  result: string;
  ctaLabel: string;
};

export type FaqItem = {
  i18nKey?: string;
  question: string;
  answer: string;
};

export const heroSignals: FlowSignal[] = [
  {
    i18nKey: "hero.signal.input",
    label: "Entrada",
    value: "solicitud repetida",
    tone: "manual",
  },
  {
    i18nKey: "hero.signal.risk",
    label: "Riesgo",
    value: "estado invisible",
    tone: "risk",
  },
  {
    i18nKey: "hero.signal.output",
    label: "Salida",
    value: "persona asignada y alerta",
    tone: "ready",
  },
];

export const heroFlowSteps: HeroFlowStep[] = [
  {
    i18nKey: "hero.flow.diagnostic",
    title: "Diagnóstico",
    detail: "Elegimos el proceso que más tiempo o control está quitando",
  },
  {
    i18nKey: "hero.flow.build",
    title: "Primer flujo",
    detail: "Lo dejamos con reglas, alertas y revisión humana cuando aplica",
  },
  {
    i18nKey: "hero.flow.growth",
    title: "Soporte y mejoras",
    detail: "Monitoreamos fallos, ajustes y oportunidades nuevas",
  },
];

export const problemFlow: ProblemFlowItem[] = [
  {
    i18nKey: "problemFlow.scattered",
    label: "Entrada dispersa",
    detail: "WhatsApp, correo, formularios y planillas abren tareas sin una bandeja clara.",
    tone: "leak",
  },
  {
    i18nKey: "problemFlow.manual",
    label: "Traspaso manual",
    detail: "Alguien copia datos, pregunta por estado y empuja aprobaciones a mano.",
    tone: "delay",
  },
  {
    i18nKey: "problemFlow.control",
    label: "Control perdido",
    detail: "No queda claro quién toma el caso, qué falta, qué venció ni dónde se atascó.",
    tone: "control",
  },
];

export const systemSteps: SystemStep[] = [
  {
    i18nKey: "system.intake",
    label: "01",
    title: "Entrada única",
    detail: "El flujo recibe correos, formularios, planillas o eventos desde las herramientas que el equipo ya usa.",
    tone: "input",
  },
  {
    i18nKey: "system.rules",
    label: "02",
    title: "Reglas e IA",
    detail: "Validamos datos, clasificamos solicitudes y aplicamos criterios claros antes de mover el proceso.",
    tone: "rules",
  },
  {
    i18nKey: "system.owner",
    label: "03",
    title: "Persona asignada",
    detail: "Cada caso queda con dueño, estado, alerta y siguiente paso para que nadie dependa de perseguir avances.",
    tone: "owner",
  },
  {
    i18nKey: "system.exception",
    label: "04",
    title: "Revisión humana",
    detail: "Lo sensible, incompleto o riesgoso vuelve a una persona con contexto suficiente para decidir.",
    tone: "exception",
  },
  {
    i18nKey: "system.record",
    label: "05",
    title: "Registro operativo",
    detail: "La salida queda documentada: CRM actualizado, reporte generado, tarea creada o aprobación registrada.",
    tone: "record",
  },
];

export const problems: ContentCard[] = [
  {
    i18nKey: "problems.sales",
    tag: "Ventas",
    icon: "$",
    title: "Leads y cotizaciones que pierden seguimiento",
    detail: "El contacto entra por formulario, WhatsApp o email, pero el seguimiento depende de memoria, tiempo disponible o una planilla.",
    result: "Automatizamos captura, alerta, CRM y próxima tarea comercial",
  },
  {
    i18nKey: "problems.support",
    tag: "Soporte",
    icon: "SOS",
    title: "Tickets sin prioridad ni responsable claro",
    detail: "Clientes escriben por correo, WhatsApp o formularios; el equipo responde manual y pierde estado, SLA o responsable.",
    result: "Automatizamos entrada, prioridad, SLA y persona asignada",
  },
  {
    i18nKey: "problems.admin",
    tag: "Administración",
    icon: "DOC",
    title: "Reportes, cobranza y planillas a mano",
    detail: "Datos de ventas, pagos u operaciones viven en herramientas separadas; alguien los copia para cerrar la semana o cobrar.",
    result: "Automatizamos conciliación, validación y reporte",
  },
  {
    i18nKey: "problems.legal",
    tag: "Legal / RR. HH.",
    icon: "OK",
    title: "Contratos, aprobaciones y onboarding detenidos",
    detail: "Solicitudes, documentos y permisos se mueven por correo o carpetas; cuesta saber qué falta, quién aprueba y qué está vencido.",
    result: "Automatizamos solicitud, revisión, aprobación y registro",
  },
];

export const integrationLogos: IntegrationLogo[] = [
  {
    name: "Google Sheets",
    mark: "Gs",
    tone: "ops",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/googlesheets.svg",
    logoAlt: "Google Sheets",
  },
  {
    name: "Airtable",
    mark: "At",
    tone: "ops",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/airtable.svg",
    logoAlt: "Airtable",
  },
  {
    name: "Notion",
    mark: "N",
    tone: "ops",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/notion.svg",
    logoAlt: "Notion",
  },
  {
    name: "Slack",
    mark: "S",
    tone: "ops",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/slack.svg",
    logoAlt: "Slack",
  },
  {
    name: "n8n",
    mark: "n8n",
    tone: "flow",
  },
  {
    name: "Zapier",
    mark: "Z",
    tone: "flow",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/zapier.svg",
    logoAlt: "Zapier",
  },
  {
    name: "Make",
    mark: "Mk",
    tone: "flow",
    logoUrl: "https://www.make.com/favicon.ico",
    logoAlt: "Make",
  },
  {
    name: "Claude",
    mark: "Cl",
    tone: "ai",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/anthropic.svg",
    logoAlt: "Anthropic",
  },
  {
    name: "Gemini",
    mark: "G",
    tone: "ai",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/googlegemini.svg",
    logoAlt: "Google Gemini",
  },
  {
    name: "Codex",
    mark: "Cx",
    tone: "ai",
    logoUrl: "/codex-macos-template.png",
    logoAlt: "Codex para macOS",
  },
  {
    name: "OpenAI",
    mark: "AI",
    tone: "ai",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/openai.svg",
    logoAlt: "OpenAI",
  },
  {
    name: "DeepSeek",
    mark: "DS",
    tone: "ai",
    logoUrl: "https://www.deepseek.com/favicon.ico",
    logoAlt: "DeepSeek",
  },
];

export const mobileIntegrationTools = ["WhatsApp", "Email", "Sheets", "CRM", "Notion", "n8n", "Make", "OpenAI"];

export const services: ContentCard[] = [
  {
    i18nKey: "services.diagnostic",
    tag: "01",
    badge: "Entrada recomendada",
    title: "Diagnóstico operativo",
    detail: "Revisamos un proceso repetido y definimos qué conviene automatizar primero.",
    fit: "Para partir con criterio antes de tocar sistemas o pedir accesos.",
    includes: ["Mapa del flujo", "Cuellos de botella", "Quick wins concretos", "Primer workflow recomendado"],
    result: "Lanzamiento: USD 900 -> USD 600",
  },
  {
    i18nKey: "services.build",
    tag: "02",
    badge: "Primer resultado",
    title: "Primer workflow funcionando",
    detail: "Construimos una automatización acotada, probada y lista para operar.",
    fit: "Para leads, reportes, solicitudes, agenda, documentos o planillas.",
    includes: ["Workflow conectado", "Pruebas", "Documentación operativa", "Salida lista para operar"],
    result: "Duración: 7-10 días hábiles",
  },
  {
    i18nKey: "services.tracking",
    tag: "03",
    badge: "Venta y seguimiento",
    title: "Seguimiento comercial",
    detail: "Centralizamos leads, persona asignada, estado y próxima acción para que nadie quede sin respuesta.",
    fit: "Para inmobiliarias, B2B, clínicas, agencias y negocios con consultas frecuentes.",
    includes: ["Registro centralizado", "Persona asignada", "Estado y próxima acción", "Alertas"],
    result: "Duración: 7-12 días hábiles",
  },
  {
    i18nKey: "services.agent",
    tag: "04",
    badge: "IA con control",
    title: "Piloto de agente operativo",
    detail: "Probamos IA en una tarea concreta: clasificar, resumir, extraer o preparar información con límites claros.",
    fit: "Para correos, documentos, tickets, solicitudes y reportes.",
    includes: ["Agente acotado a una tarea", "Reglas", "Pruebas", "Revisión humana cuando corresponde"],
    result: "Duración: 10-15 días hábiles",
  },
];

export const useCases: UseCase[] = [
  {
    i18nKey: "useCases.leads",
    offer: "sales-follow-up",
    problem: "Leads sin seguimiento",
    pain: "Entradas por WhatsApp, formulario o email quedan repartidas y alguien debe acordarse de responder.",
    signal: "Te aplica si preguntas seguido quién tomó cada lead o si hay cotizaciones que se enfrían.",
    automation: "Capturamos el lead, lo registramos en una base central, asignamos persona, creamos tarea y alerta.",
    result: "Menos oportunidades perdidas por olvido y más visibilidad del estado comercial.",
    ctaLabel: "Ordenar seguimiento",
  },
  {
    i18nKey: "useCases.schedule",
    offer: "schedule-confirmation",
    problem: "Agenda y confirmaciones",
    pain: "Horas, reuniones o visitas se coordinan a mano y el equipo pierde tiempo confirmando una por una.",
    signal: "Te aplica si usas WhatsApp para confirmar, reagendar o recordar citas.",
    automation: "El flujo registra la solicitud, propone horario, confirma, envía recordatorio y avisa excepciones.",
    result: "Menos coordinación manual y menos ausencias por falta de confirmación.",
    ctaLabel: "Revisar agenda",
  },
  {
    i18nKey: "useCases.reports",
    offer: "automatic-reports",
    problem: "Reportes a mano",
    pain: "Alguien copia datos de ventas, pagos u operación para cerrar la semana o preparar seguimiento.",
    signal: "Te aplica si el reporte depende de una persona que junta planillas todos los viernes.",
    automation: "Consolidamos datos, validamos campos, generamos una salida revisable y enviamos aviso.",
    result: "Menos copia manual y reportes disponibles con estado y trazabilidad.",
    ctaLabel: "Automatizar reporte",
  },
  {
    i18nKey: "useCases.requests",
    offer: "internal-requests",
    problem: "Solicitudes internas",
    pain: "Permisos, compras, aprobaciones o tareas internas se pierden en correos y conversaciones.",
    signal: "Te aplica si el equipo pregunta varias veces en qué va una solicitud.",
    automation: "La solicitud entra por formulario o correo, se clasifica, se asigna y queda con estado visible.",
    result: "Menos persecución interna y más claridad sobre quién debe resolver.",
    ctaLabel: "Ordenar solicitudes",
  },
  {
    i18nKey: "useCases.documents",
    offer: "document-workflow",
    problem: "Documentos repetitivos",
    pain: "Contratos, propuestas, certificados o carpetas se arman repitiendo datos entre plantillas.",
    signal: "Te aplica si copias la misma información en documentos, carpetas y correos.",
    automation: "Conectamos formulario, plantilla, documento, carpeta y aviso en un flujo trazable.",
    result: "Menos errores de copia y documentos listos para revisión o envío.",
    ctaLabel: "Revisar documentos",
  },
  {
    i18nKey: "useCases.tickets",
    offer: "ticket-triage",
    problem: "Tickets o consultas",
    pain: "Consultas llegan por varios canales y cuesta distinguir prioridad, responsable y próximo paso.",
    signal: "Te aplica si respondes manualmente y no tienes SLA, prioridad o historial claro.",
    automation: "El mensaje entra, IA resume o clasifica si aporta, se asigna prioridad y se alerta al equipo.",
    result: "Atención más ordenada sin dejar decisiones sensibles en piloto automático.",
    ctaLabel: "Ordenar consultas",
  },
  {
    i18nKey: "useCases.other",
    offer: "custom-process",
    problem: "Otro proceso repetido",
    pain: "Hay una tarea que tu equipo repite todas las semanas, pero todavía no sabes si conviene automatizarla.",
    signal: "Te aplica si puedes describir la tarea, las herramientas y qué pasa cuando falla.",
    automation: "La revisamos, medimos impacto/esfuerzo y proponemos el primer flujo viable.",
    result: "Sales con una decisión concreta: automatizar, ajustar primero o descartar.",
    ctaLabel: "Enviar mi flujo",
  },
];

export const scopeIncludes: ContentCard[] = [
  { i18nKey: "scope.include.1", title: "Revisamos procesos manuales o repetitivos", detail: "" },
  { i18nKey: "scope.include.2", title: "Diseñamos workflows simples", detail: "" },
  { i18nKey: "scope.include.3", title: "Conectamos herramientas existentes", detail: "" },
  { i18nKey: "scope.include.4", title: "Aplicamos IA donde aporta valor", detail: "" },
  { i18nKey: "scope.include.5", title: "Dejamos personas asignadas, estados y alertas", detail: "" },
  { i18nKey: "scope.include.6", title: "Documentamos el flujo", detail: "" },
  { i18nKey: "scope.include.7", title: "Proponemos siguientes mejoras", detail: "" },
];

export const scopeExcludes: ContentCard[] = [
  { i18nKey: "scope.exclude.1", title: "Automatizar toda la empresa de una vez", detail: "" },
  { i18nKey: "scope.exclude.2", title: "Prometer resultados comerciales garantizados", detail: "" },
  { i18nKey: "scope.exclude.3", title: "Crear SaaS propio", detail: "" },
  { i18nKey: "scope.exclude.4", title: "Implementar sistemas enterprise complejos", detail: "" },
  { i18nKey: "scope.exclude.5", title: "Vender agentes autónomos sin control", detail: "" },
  { i18nKey: "scope.exclude.6", title: "Hacer soporte 24/7", detail: "" },
  { i18nKey: "scope.exclude.7", title: "Integraciones críticas sin diagnóstico previo", detail: "" },
];

export const impactProofs: ImpactProof[] = [
  {
    i18nKey: "impact.sales",
    metric: "Oportunidad",
    title: "Seguimiento sin depender de memoria",
    detail: "Lead entra, se registra, avisa al responsable y crea la próxima tarea sin esperar revisión manual.",
  },
  {
    i18nKey: "impact.ops",
    metric: "Tiempo",
    title: "Menos copia manual entre herramientas",
    detail: "Ventas, pagos y planillas se consolidan en una salida revisable con errores visibles.",
  },
  {
    i18nKey: "impact.control",
    metric: "Control",
    title: "Excepciones visibles antes de romper el flujo",
    detail: "Las excepciones vuelven a una persona, quedan registradas y no rompen el proceso completo.",
  },
];

export const principles: ContentCard[] = [
  {
    i18nKey: "principles.limits",
    tag: "Límites",
    title: "Lo automático no decide todo",
    detail: "Definimos qué puede correr solo, qué requiere aprobación y qué debe volver a una persona.",
  },
  {
    i18nKey: "principles.errors",
    tag: "Errores",
    title: "Los fallos quedan visibles",
    detail: "Si una integración falla o falta información, el flujo debe avisar, registrar y permitir corrección.",
  },
  {
    i18nKey: "principles.operation",
    tag: "Operación",
    title: "El equipo entiende el flujo",
    detail: "La automatización se documenta para que no dependa de una caja negra ni de una persona externa.",
  },
];

export const methodSteps: ContentCard[] = [
  {
    i18nKey: "method.diagnostic",
    title: "Diagnóstico",
    detail: "Identificamos el proceso repetido, el costo del problema y las herramientas actuales.",
  },
  {
    i18nKey: "method.mapping",
    title: "Mapa del flujo",
    detail: "Ordenamos entradas, responsables, estados, reglas, excepciones y salidas esperadas.",
  },
  {
    i18nKey: "method.priority",
    title: "Priorización",
    detail: "Elegimos el primer workflow por impacto, esfuerzo, riesgo y facilidad de adopción.",
  },
  {
    i18nKey: "method.build",
    title: "Primer workflow",
    detail: "Construimos una versión acotada, conectada a las herramientas que ya usa el equipo.",
  },
  {
    i18nKey: "method.testing",
    title: "Pruebas",
    detail: "Probamos datos reales o representativos, fallos esperables y revisión humana.",
  },
  {
    i18nKey: "method.docs",
    title: "Documentación",
    detail: "Dejamos el flujo explicado para operar, ajustar y detectar problemas.",
  },
  {
    i18nKey: "method.optimization",
    title: "Soporte y mejora",
    detail: "Ajustamos reglas, excepciones y prioridades con uso real, no con supuestos.",
  },
];

export const faqs: FaqItem[] = [
  {
    i18nKey: "faq.crm",
    question: "¿Necesito tener CRM?",
    answer: "No. Podemos partir con planillas, formularios, WhatsApp, correo o una base simple. Si un CRM aporta, lo proponemos; si no, no lo forzamos.",
  },
  {
    i18nKey: "faq.sheets",
    question: "¿Sirve si hoy usamos planillas y WhatsApp?",
    answer: "Sí. Muchos primeros flujos parten conectando canales simples para dejar registro, estado, persona asignada y alerta.",
  },
  {
    i18nKey: "faq.ai",
    question: "¿La IA es obligatoria?",
    answer: "No. Usamos IA cuando ayuda a clasificar, resumir, extraer contexto o preparar información. Si una regla simple es más segura, usamos la regla.",
  },
  {
    i18nKey: "faq.people",
    question: "¿Automize reemplaza personas?",
    answer: "No es la promesa. La idea es sacar trabajo repetido, avisar cuando algo requiere criterio humano y dejar al equipo con más control.",
  },
  {
    i18nKey: "faq.messy",
    question: "¿Qué pasa si mi proceso está desordenado?",
    answer: "Precisamente por eso partimos con diagnóstico. Antes de automatizar, ordenamos entradas, responsables, estados y excepciones.",
  },
  {
    i18nKey: "faq.time",
    question: "¿Cuánto demora partir?",
    answer: "El diagnóstico suele tomar 3 a 5 días hábiles. Un primer workflow acotado normalmente se estima después de revisar el flujo.",
  },
  {
    i18nKey: "faq.small",
    question: "¿Puedo partir con algo pequeño?",
    answer: "Sí. Preferimos partir por un proceso crítico y acotado antes que intentar automatizar toda la empresa.",
  },
  {
    i18nKey: "faq.after",
    question: "¿Qué pasa después de enviar el formulario?",
    answer: "Revisamos si hay fit, pedimos contexto faltante si hace falta y proponemos el siguiente paso: diagnóstico, primer workflow o descartar por ahora.",
  },
  {
    i18nKey: "faq.badFit",
    question: "¿Qué procesos no conviene automatizar?",
    answer: "Procesos que cambian todos los días, decisiones críticas sin criterio claro o tareas donde el costo de ordenar supera el beneficio.",
  },
];
