import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  onRequestPost,
  renderHtmlBody,
  renderTextBody,
  validateLeadPayload,
} from "../functions/api/contact.js";

const originalFetch = globalThis.fetch;

const baseFields = {
  name: "Ana Perez",
  email: "ana@empresa.cl",
  company: "Empresa Demo",
};

const createRequest = (fields) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return new Request("https://automize.test/api/contact", {
    method: "POST",
    body: formData,
  });
};

const postLead = (fields, env = {}) =>
  onRequestPost({
    request: createRequest(fields),
    env,
  });

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("lead payload validation", () => {
  it("accepts the publication payload without optional fields", () => {
    assert.equal(validateLeadPayload({
      ...baseFields,
      industry: "",
      symptom: "",
      tools: "",
      impact: "",
      source: "automize-landing",
      offer: "workflow-automation-review",
    }), "");
  });

  it("rejects missing required fields", () => {
    assert.equal(validateLeadPayload({
      ...baseFields,
      company: "",
      industry: "",
      symptom: "",
      tools: "",
      impact: "",
      source: "automize-landing",
      offer: "workflow-automation-review",
    }), "Faltan campos obligatorios.");
  });

  it("rejects invalid email addresses", () => {
    assert.equal(validateLeadPayload({
      ...baseFields,
      email: "ana",
      industry: "",
      symptom: "",
      tools: "",
      impact: "",
      source: "automize-landing",
      offer: "workflow-automation-review",
    }), "El email no es valido.");
  });
});

describe("lead email rendering", () => {
  it("omits blank optional fields from email bodies", () => {
    const payload = {
      ...baseFields,
      industry: "",
      symptom: "",
      tools: "",
      impact: "",
      source: "automize-landing",
      offer: "workflow-automation-review",
    };

    assert.equal(renderHtmlBody(payload).includes("Rubro"), false);
    assert.equal(renderHtmlBody(payload).includes("Mensaje"), false);
    assert.equal(renderTextBody(payload).includes("Herramientas actuales"), false);
    assert.equal(renderTextBody(payload).includes("undefined"), false);
  });
});

describe("contact function", () => {
  it("delivers publication payloads and redirects to thanks", async () => {
    let outboundPayload;
    globalThis.fetch = async (_url, init) => {
      outboundPayload = JSON.parse(init.body);
      return new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    const response = await postLead(baseFields, {
      RESEND_API_KEY: "test-key",
      CONTACT_TO_EMAIL: "contacto@automize.cl",
      CONTACT_FROM_EMAIL: "Automize <leads@automize.cl>",
    });

    assert.equal(response.status, 303);
    assert.equal(response.headers.get("location"), "https://automize.test/gracias");
    assert.equal(outboundPayload.reply_to, "ana@empresa.cl");
    assert.equal(outboundPayload.html.includes("Rubro"), false);
    assert.equal(outboundPayload.html.includes("Mensaje"), false);
  });

  it("keeps the fail-closed path when email delivery is not configured", async () => {
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response("{}");
    };

    const response = await postLead(baseFields);
    const body = await response.json();

    assert.equal(response.status, 503);
    assert.equal(fetchCalled, false);
    assert.equal(body.ok, false);
  });

  it("redirects honeypot submissions without delivery", async () => {
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response("{}");
    };

    const response = await postLead({
      ...baseFields,
      company_fax: "bot-value",
    });

    assert.equal(response.status, 303);
    assert.equal(response.headers.get("location"), "https://automize.test/gracias");
    assert.equal(fetchCalled, false);
  });
});
