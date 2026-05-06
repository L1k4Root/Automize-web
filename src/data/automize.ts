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
  problem: string;
  workflow: string;
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
    value: "responsable y siguiente paso",
    tone: "ready",
  },
];

export const heroFlowSteps: HeroFlowStep[] = [
  {
    i18nKey: "hero.flow.diagnostic",
    title: "Diagnostico",
    detail: "Elegimos el flujo que más frena al equipo",
  },
  {
    i18nKey: "hero.flow.build",
    title: "Implementacion",
    detail: "Lo dejamos corriendo con reglas, IA y responsables",
  },
  {
    i18nKey: "hero.flow.growth",
    title: "Soporte y mejoras",
    detail: "Medimos fallos, ajustes y oportunidades nuevas",
  },
];

export const problemFlow: ProblemFlowItem[] = [
  {
    i18nKey: "problemFlow.scattered",
    label: "Entrada dispersa",
    detail: "Correos, formularios, WhatsApp y planillas abren tareas sin un flujo unico.",
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
    detail: "No queda claro quién responde, qué falta, qué venció ni dónde se atascó.",
    tone: "control",
  },
];

export const systemSteps: SystemStep[] = [
  {
    i18nKey: "system.intake",
    label: "01",
    title: "Entrada unica",
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
    title: "Responsable visible",
    detail: "Cada caso queda asignado con estado, alerta y siguiente paso para que nadie dependa de perseguir avances.",
    tone: "owner",
  },
  {
    i18nKey: "system.exception",
    label: "04",
    title: "Excepcion humana",
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
    result: "Automatizamos entrada, prioridad, SLA y responsable",
  },
  {
    i18nKey: "problems.admin",
    tag: "Administracion",
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

export const services: ContentCard[] = [
  {
    i18nKey: "services.diagnostic",
    tag: "01",
    badge: "Empieza aqui",
    title: "Diagnostico operativo",
    detail: "Ordenamos un proceso manual y te decimos que conviene automatizar primero.",
    fit: "Para decidir rápido sin comprometer una implementación completa.",
    includes: ["Mapa del proceso", "Brechas", "Quick wins", "Primer workflow recomendado"],
    result: "Duracion: 3-5 dias habiles",
  },
  {
    i18nKey: "services.build",
    tag: "02",
    badge: "Mas solicitado",
    title: "Primer workflow funcionando",
    detail: "Construimos una automatización acotada, probada y lista para operar.",
    fit: "Para leads, reportes, solicitudes, agenda, documentos o planillas.",
    includes: ["Workflow conectado", "Pruebas", "Documentacion operativa", "Salida lista para operar"],
    result: "Duracion: 7-10 dias habiles",
  },
  {
    i18nKey: "services.tracking",
    tag: "03",
    badge: "Venta y seguimiento",
    title: "Sistema de Seguimiento Comercial",
    detail: "Centralizamos leads, responsable, estado y próxima acción para que nadie quede sin respuesta.",
    fit: "Para inmobiliarias, B2B, clinicas, agencias y negocios con consultas frecuentes.",
    includes: ["Registro centralizado", "Responsable", "Estado y próxima acción", "Alertas"],
    result: "Duracion: 7-12 dias habiles",
  },
  {
    i18nKey: "services.agent",
    tag: "04",
    badge: "IA con control",
    title: "Piloto de agente operativo",
    detail: "Probamos IA en una tarea concreta: clasificar, resumir, extraer o preparar información.",
    fit: "Para correos, documentos, tickets, solicitudes y reportes.",
    includes: ["Agente acotado a una tarea", "Reglas", "Pruebas", "Revision humana cuando corresponde"],
    result: "Duracion: 10-15 dias habiles",
  },
];

export const useCases: UseCase[] = [
  {
    i18nKey: "useCases.leads",
    problem: "Leads sin seguimiento",
    workflow: "Lead entra por WhatsApp o formulario, se registra, se asigna responsable y se crea próxima acción.",
  },
  {
    i18nKey: "useCases.schedule",
    problem: "Agenda manual",
    workflow: "Paciente o cliente solicita hora, se registra, se confirma y se envia recordatorio.",
  },
  {
    i18nKey: "useCases.reports",
    problem: "Reportes a mano",
    workflow: "Datos de ventas o pagos se consolidan, se genera reporte y se envia al responsable.",
  },
  {
    i18nKey: "useCases.requests",
    problem: "Solicitudes internas",
    workflow: "Solicitud entra por correo o formulario, se clasifica, se asigna y queda estado visible.",
  },
  {
    i18nKey: "useCases.documents",
    problem: "Documentos repetitivos",
    workflow: "Formulario, plantilla, documento, carpeta y aviso quedan conectados en un flujo.",
  },
  {
    i18nKey: "useCases.tickets",
    problem: "Tickets o consultas",
    workflow: "Mensaje entra, IA resume o clasifica, se asigna prioridad y el responsable recibe alerta.",
  },
];

export const scopeIncludes: ContentCard[] = [
  { i18nKey: "scope.include.1", title: "Revisamos procesos manuales o repetitivos", detail: "" },
  { i18nKey: "scope.include.2", title: "Disenamos workflows simples", detail: "" },
  { i18nKey: "scope.include.3", title: "Conectamos herramientas existentes", detail: "" },
  { i18nKey: "scope.include.4", title: "Aplicamos IA donde aporta valor", detail: "" },
  { i18nKey: "scope.include.5", title: "Dejamos responsables, estados y alertas", detail: "" },
  { i18nKey: "scope.include.6", title: "Documentamos el flujo", detail: "" },
  { i18nKey: "scope.include.7", title: "Proponemos siguientes mejoras", detail: "" },
];

export const scopeExcludes: ContentCard[] = [
  { i18nKey: "scope.exclude.1", title: "Automatizar toda la empresa de una vez", detail: "" },
  { i18nKey: "scope.exclude.2", title: "Prometer resultados comerciales garantizados", detail: "" },
  { i18nKey: "scope.exclude.3", title: "Crear SaaS propio", detail: "" },
  { i18nKey: "scope.exclude.4", title: "Implementar sistemas enterprise complejos", detail: "" },
  { i18nKey: "scope.exclude.5", title: "Vender agentes autonomos sin control", detail: "" },
  { i18nKey: "scope.exclude.6", title: "Hacer soporte 24/7", detail: "" },
  { i18nKey: "scope.exclude.7", title: "Integraciones críticas sin diagnóstico previo", detail: "" },
];

export const impactProofs: ImpactProof[] = [
  {
    i18nKey: "impact.sales",
    metric: "Ventas",
    title: "Seguimiento sin depender de memoria",
    detail: "Lead entra, se registra, avisa al responsable y crea la próxima tarea sin esperar revisión manual.",
  },
  {
    i18nKey: "impact.ops",
    metric: "Operacion",
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
    tag: "Limites",
    title: "Lo automatico no decide todo",
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
    tag: "Operacion",
    title: "El equipo entiende el flujo",
    detail: "La automatización se documenta para que no dependa de una caja negra ni de una persona externa.",
  },
];

export const methodSteps: ContentCard[] = [
  {
    i18nKey: "method.critical",
    title: "Puntos criticos",
    detail: "Detectamos donde se pierde tiempo, dinero o control antes de automatizar.",
  },
  {
    i18nKey: "method.performance",
    title: "Rendimiento",
    detail: "Construimos flujos simples, medibles y rapidos de operar, no sistemas pesados.",
  },
  {
    i18nKey: "method.optimization",
    title: "Optimizacion",
    detail: "Ajustamos reglas, excepciones y prioridades con uso real, no con supuestos.",
  },
];
