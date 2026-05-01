export type ContentCard = {
  i18nKey?: string;
  tag?: string;
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
    detail: "Elegimos el flujo que mas frena al equipo",
  },
  {
    i18nKey: "hero.flow.build",
    title: "Implementacion",
    detail: "Lo dejamos corriendo con reglas, IA y responsables",
  },
  {
    i18nKey: "hero.flow.growth",
    title: "Mejora continua",
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
    detail: "No queda claro quien responde, que falta, que vencio ni donde se atasco.",
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
    detail: "La salida queda documentada: CRM actualizado, reporte generado, tarea creada o aprobacion registrada.",
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
    result: "Automatizamos captura, alerta, CRM y proxima tarea comercial",
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
    result: "Automatizamos conciliacion, validacion y reporte",
  },
  {
    i18nKey: "problems.legal",
    tag: "Legal / RR. HH.",
    icon: "OK",
    title: "Contratos, aprobaciones y onboarding detenidos",
    detail: "Solicitudes, documentos y permisos se mueven por correo o carpetas; cuesta saber que falta, quien aprueba y que esta vencido.",
    result: "Automatizamos solicitud, revision, aprobacion y registro",
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
    title: "Diagnostico",
    detail: "Para empresas que saben que hay trabajo manual, pero no tienen claro que automatizar primero.",
    fit: "Cuando hay varios dolores y necesitas elegir el flujo con mejor retorno antes de construir.",
    includes: ["Mapa del proceso", "Riesgos y excepciones", "Quick wins", "Plan de implementacion"],
    result: "Mapa del proceso, puntos criticos, prioridad y plan de implementacion",
  },
  {
    i18nKey: "services.build",
    tag: "02",
    title: "Implementacion",
    detail: "Para equipos que ya tienen un proceso elegido y necesitan dejarlo funcionando con herramientas reales.",
    fit: "Cuando el proceso ya esta priorizado y el equipo necesita operarlo con reglas, alertas y responsables.",
    includes: ["Workflow conectado", "Validaciones y reglas", "Excepciones humanas", "Documentacion operativa"],
    result: "Workflow conectado, probado, documentado y listo para operar",
  },
  {
    i18nKey: "services.growth",
    tag: "03",
    title: "Mejora continua",
    detail: "Para mantener los flujos vivos: errores, cambios de reglas, soporte y nuevas automatizaciones.",
    fit: "Cuando el flujo ya opera y necesitas soporte, ajustes y nuevas mejoras sin perder control.",
    includes: ["Monitoreo de fallos", "Ajustes de reglas", "Soporte mensual", "Mejoras priorizadas"],
    result: "Monitoreo, ajustes, soporte mensual y mejoras priorizadas",
  },
];

export const impactProofs: ImpactProof[] = [
  {
    i18nKey: "impact.sales",
    metric: "Ventas",
    title: "Seguimiento sin depender de memoria",
    detail: "Lead entra, se registra, avisa al responsable y crea la proxima tarea sin esperar revision manual.",
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
    detail: "Definimos que puede correr solo, que requiere aprobacion y que debe volver a una persona.",
  },
  {
    i18nKey: "principles.errors",
    tag: "Errores",
    title: "Los fallos quedan visibles",
    detail: "Si una integracion falla o falta informacion, el flujo debe avisar, registrar y permitir correccion.",
  },
  {
    i18nKey: "principles.operation",
    tag: "Operacion",
    title: "El equipo entiende el flujo",
    detail: "La automatizacion se documenta para que no dependa de una caja negra ni de una persona externa.",
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
