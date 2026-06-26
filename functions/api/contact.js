const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_COMPANY_LENGTH = 160;
const MAX_SERVICE_TYPE_LENGTH = 120;
const MAX_INDUSTRY_LENGTH = 120;
const MAX_SYMPTOM_LENGTH = 3000;
const MAX_TOOLS_LENGTH = 2000;
const MAX_IMPACT_LENGTH = 2000;
const DEFAULT_SOURCE = "automize-landing";
const DEFAULT_OFFER = "workflow-automation-review";
const DEFAULT_CONTACT_TO_EMAIL = "contacto@automize.cl";
const THANK_YOU_PATH = "/gracias";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const FIELD_LIMITS = {
  name: MAX_NAME_LENGTH,
  email: MAX_EMAIL_LENGTH,
  company: MAX_COMPANY_LENGTH,
  serviceType: MAX_SERVICE_TYPE_LENGTH,
  industry: MAX_INDUSTRY_LENGTH,
  symptom: MAX_SYMPTOM_LENGTH,
  tools: MAX_TOOLS_LENGTH,
  impact: MAX_IMPACT_LENGTH,
};

const jsonError = (message, status = 400, requestId = "") =>
  new Response(JSON.stringify({ ok: false, message }), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(requestId ? { "x-request-id": requestId } : {}),
    },
  });

const trimField = (value) => (typeof value === "string" ? value.trim() : "");
const withDefault = (value, fallback) => trimField(value) || fallback;

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const getEmailDomain = (value) => value.split("@")[1] || "unknown";

const redirectToThanks = (request) => Response.redirect(new URL(THANK_YOU_PATH, request.url), 303);

export const readLeadPayload = (formData) => ({
  name: trimField(formData.get("name")),
  email: trimField(formData.get("email")),
  company: trimField(formData.get("company")),
  serviceType: trimField(formData.get("service_type")),
  industry: trimField(formData.get("industry")),
  symptom: trimField(formData.get("symptom")),
  tools: trimField(formData.get("tools")),
  impact: trimField(formData.get("impact")),
  source: withDefault(formData.get("source"), DEFAULT_SOURCE),
  offer: withDefault(formData.get("offer"), DEFAULT_OFFER),
});

export const validateLeadPayload = (payload) => {
  if (!payload.name || !payload.email || !payload.company) {
    return "Faltan campos obligatorios.";
  }

  if (payload.name.length > FIELD_LIMITS.name) {
    return "El nombre es demasiado largo.";
  }

  if (payload.email.length > FIELD_LIMITS.email || !isValidEmail(payload.email)) {
    return "El email no es valido.";
  }

  if (payload.company.length > FIELD_LIMITS.company) {
    return "El nombre de la empresa es demasiado largo.";
  }

  if ((payload.serviceType || "").length > FIELD_LIMITS.serviceType) {
    return "El tipo de servicio es demasiado largo.";
  }

  if (payload.industry.length > FIELD_LIMITS.industry) {
    return "El rubro es demasiado largo.";
  }

  if (payload.symptom.length > FIELD_LIMITS.symptom) {
    return "La descripcion del proceso es demasiado larga.";
  }

  if (payload.tools.length > FIELD_LIMITS.tools) {
    return "La descripcion de herramientas es demasiado larga.";
  }

  if (payload.impact.length > FIELD_LIMITS.impact) {
    return "La descripcion del impacto es demasiado larga.";
  }

  return "";
};

const readEmailConfig = (env) => ({
  resendApiKey: trimField(env.RESEND_API_KEY),
  contactToEmail: trimField(env.CONTACT_TO_EMAIL) || DEFAULT_CONTACT_TO_EMAIL,
  contactFromEmail: trimField(env.CONTACT_FROM_EMAIL) || "Automize <onboarding@resend.dev>",
});

const renderOptionalHtmlField = (label, value) =>
  value ? [`<p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`] : [];

const renderOptionalTextField = (label, value) => (value ? ["", `${label}:`, value] : []);

export const renderHtmlBody = ({ name, email, company, serviceType, industry, symptom, tools, impact, source, offer }) =>
  [
    "<h2>Nuevo lead desde Automize</h2>",
    `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>`,
    ...renderOptionalHtmlField("Servicio a cotizar", serviceType),
    ...renderOptionalHtmlField("Mensaje", symptom),
    ...renderOptionalHtmlField("Rubro", industry),
    ...renderOptionalHtmlField("Herramientas actuales", tools),
    ...renderOptionalHtmlField("Impacto si falla o se atrasa", impact),
    `<p><strong>Source:</strong> ${escapeHtml(source)}</p>`,
    `<p><strong>Offer:</strong> ${escapeHtml(offer)}</p>`,
  ].join("");

export const renderTextBody = ({ name, email, company, serviceType, industry, symptom, tools, impact, source, offer }) =>
  [
    "Nuevo lead desde Automize",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company}`,
    `Source: ${source}`,
    `Offer: ${offer}`,
    ...renderOptionalTextField("Servicio a cotizar", serviceType),
    ...renderOptionalTextField("Mensaje", symptom),
    ...renderOptionalTextField("Rubro", industry),
    ...renderOptionalTextField("Herramientas actuales", tools),
    ...renderOptionalTextField("Impacto si falla o se atrasa", impact),
  ].join("\n");

const sendLeadEmail = async ({ payload, config, requestId }) =>
  fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": requestId,
    },
    body: JSON.stringify({
      from: config.contactFromEmail,
      to: [config.contactToEmail],
      subject: `Nuevo lead Automize: ${payload.name}`,
      reply_to: payload.email,
      html: renderHtmlBody(payload),
      text: renderTextBody(payload),
      tags: [
        { name: "source", value: DEFAULT_SOURCE },
        { name: "channel", value: "lead-form" },
      ],
    }),
  });

export async function onRequestPost(context) {
  const { request, env } = context;
  const requestId = crypto.randomUUID();
  let formData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("El payload del formulario no es valido.", 400, requestId);
  }

  const companyFax = trimField(formData.get("company_fax"));
  if (companyFax) {
    console.warn("lead_capture_honeypot_triggered", { requestId });
    return redirectToThanks(request);
  }

  const payload = readLeadPayload(formData);
  const validationError = validateLeadPayload(payload);
  if (validationError) {
    return jsonError(validationError, 400, requestId);
  }

  const config = readEmailConfig(env);
  if (!config.resendApiKey || !config.contactToEmail) {
    console.error("lead_capture_misconfigured", {
      requestId,
      hasResendApiKey: Boolean(config.resendApiKey),
      hasContactToEmail: Boolean(config.contactToEmail),
    });
    return jsonError("La captura de leads no esta disponible ahora.", 503, requestId);
  }

  const resendResponse = await sendLeadEmail({ payload, config, requestId });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error("lead_capture_delivery_failed", {
      requestId,
      status: resendResponse.status,
      resendError,
      emailDomain: getEmailDomain(payload.email),
      source: payload.source,
    });
    return jsonError("No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.", 502, requestId);
  }

  const resendBody = await resendResponse.json();
  console.log("lead_capture_delivered", {
    requestId,
    resendId: resendBody?.id,
    emailDomain: getEmailDomain(payload.email),
    source: payload.source,
    offer: payload.offer,
  });

  return redirectToThanks(request);
}

export function onRequestGet() {
  return jsonError("Metodo no permitido.", 405);
}
