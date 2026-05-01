const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 160;
const MAX_WEBSITE_LENGTH = 240;
const MAX_SYMPTOM_LENGTH = 3000;
const DEFAULT_SOURCE = "automize-landing";
const DEFAULT_OFFER = "workflow-automation-diagnostic";
const DEFAULT_CONTACT_TO_EMAIL = "contacto@automize.cl";
const THANK_YOU_PATH = "/gracias";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const FIELD_LIMITS = {
  name: MAX_NAME_LENGTH,
  email: MAX_EMAIL_LENGTH,
  website: MAX_WEBSITE_LENGTH,
  symptom: MAX_SYMPTOM_LENGTH,
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

const isValidUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const redirectToThanks = (request) => Response.redirect(new URL(THANK_YOU_PATH, request.url), 303);

const readLeadPayload = (formData) => ({
  name: trimField(formData.get("name")),
  email: trimField(formData.get("email")),
  website: trimField(formData.get("website")),
  symptom: trimField(formData.get("symptom")),
  source: withDefault(formData.get("source"), DEFAULT_SOURCE),
  offer: withDefault(formData.get("offer"), DEFAULT_OFFER),
});

const validateLeadPayload = (payload) => {
  if (!payload.name || !payload.email || !payload.website || !payload.symptom) {
    return "Faltan campos obligatorios.";
  }

  if (payload.name.length > FIELD_LIMITS.name) {
    return "El nombre es demasiado largo.";
  }

  if (payload.email.length > FIELD_LIMITS.email || !isValidEmail(payload.email)) {
    return "El email no es valido.";
  }

  if (payload.website.length > FIELD_LIMITS.website || !isValidUrl(payload.website)) {
    return "La URL del sitio debe comenzar con http:// o https://.";
  }

  if (payload.symptom.length > FIELD_LIMITS.symptom) {
    return "La descripcion es demasiado larga.";
  }

  return "";
};

const readEmailConfig = (env) => ({
  resendApiKey: trimField(env.RESEND_API_KEY),
  contactToEmail: trimField(env.CONTACT_TO_EMAIL) || DEFAULT_CONTACT_TO_EMAIL,
  contactFromEmail: trimField(env.CONTACT_FROM_EMAIL) || "Automize <onboarding@resend.dev>",
});

const renderHtmlBody = ({ name, email, website, symptom, source, offer }) =>
  [
    "<h2>Nuevo lead desde Automize</h2>",
    `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Empresa o sitio web:</strong> ${escapeHtml(website)}</p>`,
    `<p><strong>Proceso o tarea a diagnosticar:</strong><br>${escapeHtml(symptom).replace(/\n/g, "<br>")}</p>`,
    `<p><strong>Source:</strong> ${escapeHtml(source)}</p>`,
    `<p><strong>Offer:</strong> ${escapeHtml(offer)}</p>`,
  ].join("");

const renderTextBody = ({ name, email, website, symptom, source, offer }) =>
  [
    "Nuevo lead desde Automize",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa o sitio web: ${website}`,
    `Source: ${source}`,
    `Offer: ${offer}`,
    "",
    "Proceso o tarea a diagnosticar:",
    symptom,
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
