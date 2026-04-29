import { track } from "./analytics";
import { getCopyValue } from "./i18n";

type StatusTone = "error" | "success";

const setFormStatus = (status: HTMLElement | null, message: string, tone: StatusTone) => {
  if (!status) return;
  status.classList.toggle("is-error", tone === "error");
  status.classList.toggle("is-success", tone === "success");
  status.textContent = message;
};

const setSubmitState = (form: HTMLFormElement, submitting: boolean) => {
  const submitButton = form.querySelector<HTMLButtonElement>("button[type='submit']");
  const labelNode = submitButton?.querySelector<HTMLElement>("[data-submit-copy]");
  if (!submitButton || !labelNode) return;

  const defaultLabel = form.dataset.submitLabel || "Solicitar revision inicial";
  submitButton.disabled = submitting;
  submitButton.setAttribute("aria-busy", String(submitting));
  labelNode.textContent = submitting ? getCopyValue("form.submitting") : defaultLabel;
};

const clearSubmitState = (form: HTMLFormElement) => {
  delete form.dataset.submitting;
  setSubmitState(form, false);
};

const readErrorMessage = async (response: Response) => {
  const fallback = getCopyValue("form.deliveryError");
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const payload = (await response.json()) as { message?: string };
      return typeof payload.message === "string" && payload.message.trim() ? payload.message.trim() : fallback;
    } catch {
      return fallback;
    }
  }

  const text = (await response.text()).trim();
  return text || fallback;
};

const submitSameOriginForm = async (form: HTMLFormElement, actionUrl: URL, status: HTMLElement | null) => {
  const provider = form.dataset.formProvider || "manual";

  try {
    const response = await fetch(actionUrl.toString(), {
      method: "POST",
      body: new FormData(form),
    });

    if (response.redirected) {
      window.location.assign(response.url);
      return;
    }

    if (response.ok) {
      setFormStatus(status, getCopyValue("form.success"), "success");
      form.reset();
      clearSubmitState(form);
      return;
    }

    setFormStatus(status, await readErrorMessage(response), "error");
    track("lead_form_delivery_error", { provider, status: response.status });
    clearSubmitState(form);
  } catch {
    setFormStatus(status, getCopyValue("form.networkError"), "error");
    track("lead_form_network_error", { provider });
    clearSubmitState(form);
  }
};

export const initCalendarFallback = () => {
  const form = document.querySelector<HTMLFormElement>("[data-lead-form]");

  document.querySelectorAll<HTMLAnchorElement>("[data-calendar-cta]").forEach((cta) => {
    cta.addEventListener("click", (event) => {
      const configuredUrl = cta.dataset.calendarUrl?.trim();
      track("calendar_click", { configured: Boolean(configuredUrl) });

      if (!configuredUrl) {
        event.preventDefault();
        document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
        window.setTimeout(() => form?.querySelector<HTMLInputElement>("input[name='name']")?.focus(), 450);
      }
    });
  });
};

export const initLeadForm = () => {
  const form = document.querySelector<HTMLFormElement>("[data-lead-form]");
  const status = document.querySelector<HTMLElement>("[data-form-status]");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    if (form.dataset.submitting === "true") {
      event.preventDefault();
      return;
    }

    form.querySelectorAll("[aria-invalid='true']").forEach((element) => {
      element.removeAttribute("aria-invalid");
    });

    const action = form.getAttribute("action")?.trim();
    const provider = form.dataset.formProvider || "manual";
    const configured = form.dataset.leadConfigured === "true" && Boolean(action && action !== "#");

    if (!form.checkValidity()) {
      event.preventDefault();
      const invalidField = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(":invalid");
      invalidField?.setAttribute("aria-invalid", "true");
      invalidField?.focus();
      setFormStatus(status, getCopyValue("form.validationError"), "error");
      track("lead_form_validation_error", { provider });
      return;
    }

    if (!configured) {
      event.preventDefault();
      setFormStatus(status, getCopyValue("form.unconfiguredError"), "error");
      track("lead_form_unconfigured", { provider });
      return;
    }

    form.dataset.submitting = "true";
    setSubmitState(form, true);
    setFormStatus(status, getCopyValue("form.submitting"), "success");
    track("lead_form_submit", { provider, configured });

    const actionUrl = new URL(action, window.location.origin);
    if (actionUrl.origin !== window.location.origin) return;

    event.preventDefault();
    await submitSameOriginForm(form, actionUrl, status);
  });
};
