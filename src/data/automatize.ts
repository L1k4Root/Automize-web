export type ContentCard = {
  title: string;
  detail: string;
};

export type FlowSignal = {
  label: string;
  value: string;
  tone: "manual" | "risk" | "ready";
};

export type AutomationOutcome = ContentCard & {
  metric: string;
};

export type IntegrationLogo = {
  name: string;
  mark: string;
  tone: "ai" | "flow" | "ops";
  logoUrl?: string;
  logoAlt?: string;
};

export const heroSignals: FlowSignal[] = [
  {
    label: "Entrada",
    value: "tarea repetida",
    tone: "manual",
  },
  {
    label: "Riesgo",
    value: "sin responsable claro",
    tone: "risk",
  },
  {
    label: "Salida",
    value: "flujo priorizado",
    tone: "ready",
  },
];

export const problems: ContentCard[] = [
  {
    title: "Operacion por memoria",
    detail: "Pendientes, respuestas y revisiones viven en mensajes sueltos o planillas sin responsable claro.",
  },
  {
    title: "Informacion dispersa",
    detail: "Correo, formularios, CRM, planillas y sistemas internos cuentan partes distintas del mismo proceso.",
  },
  {
    title: "Trabajo repetido",
    detail: "El equipo copia, revisa, clasifica o reporta lo mismo cada semana sin trazabilidad operativa.",
  },
];

export const integrationLogos: IntegrationLogo[] = [
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
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/openai.svg",
    logoAlt: "OpenAI",
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
  {
    name: "n8n",
    mark: "n8n",
    tone: "flow",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/n8n.svg",
    logoAlt: "n8n",
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
    name: "Google Sheets",
    mark: "Gs",
    tone: "ops",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/googlesheets.svg",
    logoAlt: "Google Sheets",
  },
];

export const outcomes: AutomationOutcome[] = [
  {
    metric: "01",
    title: "Mapa del flujo",
    detail: "Entradas, decisiones, responsables, datos, excepciones y salida esperada antes de automatizar.",
  },
  {
    metric: "02",
    title: "Primer flujo operable",
    detail: "Automatizacion acotada con validaciones, estados visibles y limites para mantener control humano.",
  },
  {
    metric: "03",
    title: "Trazabilidad",
    detail: "Registro de lo que entro, que decision se tomo, que fallo y que queda pendiente.",
  },
  {
    metric: "04",
    title: "Mejora continua",
    detail: "Ajustes por uso real, errores encontrados y feedback del equipo que trabaja el flujo.",
  },
];

export const principles: ContentCard[] = [
  {
    title: "Proceso antes que IA",
    detail: "Si el flujo no esta definido, primero se ordena. Automatizar desorden solo acelera el problema.",
  },
  {
    title: "Alcance pequeno",
    detail: "Partimos por una tarea con impacto visible, datos disponibles y riesgo controlado.",
  },
  {
    title: "Control humano",
    detail: "Las decisiones sensibles quedan con aprobacion, revision o fallback manual claro.",
  },
];

export const steps: ContentCard[] = [
  {
    title: "Detectar",
    detail: "Elegimos un proceso concreto donde hoy se pierde tiempo, control o visibilidad.",
  },
  {
    title: "Priorizar",
    detail: "Medimos impacto, esfuerzo, riesgo y datos disponibles para partir por el menor alcance util.",
  },
  {
    title: "Automatizar",
    detail: "Construimos una version inicial con estados, validaciones, excepciones y salida verificable.",
  },
  {
    title: "Ajustar",
    detail: "Mejoramos el flujo con uso real, errores encontrados y feedback del equipo.",
  },
];
