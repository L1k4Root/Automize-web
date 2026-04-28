type AnalyticsProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (command: string, eventName: string, props?: AnalyticsProps) => void;
  }
}

const track = (eventName: string, props: AnalyticsProps = {}) => {
  window.dispatchEvent(
    new CustomEvent("automatize:analytics", {
      detail: { eventName, props },
    }),
  );

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, props);
  }
};

const setFormStatus = (status: HTMLElement | null, message: string, tone: "error" | "success") => {
  if (!status) return;
  status.classList.toggle("is-error", tone === "error");
  status.classList.toggle("is-success", tone === "success");
  status.textContent = message;
};

const setSubmitState = (form: HTMLFormElement, submitting: boolean) => {
  const submitButton = form.querySelector<HTMLButtonElement>("button[type='submit']");
  if (!submitButton) return;

  const defaultLabel = form.dataset.submitLabel || "Solicitar revision inicial";
  submitButton.disabled = submitting;
  submitButton.setAttribute("aria-busy", String(submitting));

  const labelNode = submitButton.firstChild;
  if (labelNode) {
    labelNode.textContent = submitting ? "Enviando solicitud " : defaultLabel;
  }
};

const initHeaderScrollState = () => {
  const siteHeader = document.querySelector<HTMLElement>("[data-nav]");
  let headerFrame: number | null = null;

  if (!siteHeader) return;

  const syncHeaderOffset = () => {
    const headerHeight = Math.ceil(siteHeader.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-offset", `${headerHeight + 16}px`);
  };

  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
    syncHeaderOffset();
    headerFrame = null;
  };

  const requestHeaderSync = () => {
    if (headerFrame === null) {
      headerFrame = window.requestAnimationFrame(syncHeaderState);
    }
  };

  syncHeaderState();
  window.addEventListener("resize", syncHeaderOffset, { passive: true });
  window.addEventListener("scroll", requestHeaderSync, { passive: true });
};

const initTrackedClicks = () => {
  document.querySelectorAll<HTMLElement>("[data-track-click]").forEach((element) => {
    element.addEventListener("click", () => {
      track("cta_click", { id: element.dataset.trackClick || "unknown" });
    });
  });
};

const initAnchorNavigation = () => {
  const header = document.querySelector<HTMLElement>("[data-nav]");
  const getAnchorOffset = () => (header?.getBoundingClientRect().height ?? 0) + 16;

  const scrollToHash = (hash: string, behavior: ScrollBehavior) => {
    const targetId = hash.replace(/^#/, "");
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const destination = Math.max(0, Math.min(targetTop - getAnchorOffset(), maxScroll));

    window.scrollTo({ top: destination, behavior });
  };

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.replaceState(null, "", hash);
      scrollToHash(hash, "smooth");
    });
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash, "auto");
    });
  }
};

const initCalendarFallback = () => {
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

const initLeadForm = () => {
  const form = document.querySelector<HTMLFormElement>("[data-lead-form]");
  const status = document.querySelector<HTMLElement>("[data-form-status]");

  if (!form) return;

  form.addEventListener("submit", (event) => {
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
      setFormStatus(status, "Completa los campos requeridos para pedir el diagnostico.", "error");
      track("lead_form_validation_error", { provider });
      return;
    }

    if (!configured) {
      event.preventDefault();
      setFormStatus(
        status,
        "No pudimos enviar la solicitud porque el canal de captura todavia no esta activo.",
        "error",
      );
      track("lead_form_unconfigured", { provider });
      return;
    }

    form.dataset.submitting = "true";
    setSubmitState(form, true);
    setFormStatus(status, "Enviando solicitud", "success");
    track("lead_form_submit", { provider, configured });
  });
};

const initLandingPage = () => {
  initHeaderScrollState();
  initTrackedClicks();
  initAnchorNavigation();
  initCalendarFallback();
  initLeadForm();
};

initLandingPage();

export {};
