import { track } from "./analytics";

export const initHeaderScrollState = () => {
  const siteHeader = document.querySelector<HTMLElement>("[data-nav]");
  let headerFrame: number | null = null;

  if (!siteHeader) return;

  const syncHeaderOffset = () => {
    const headerHeight = Math.ceil(siteHeader.getBoundingClientRect().height);
    const headerTop = Number.parseFloat(window.getComputedStyle(siteHeader).top) || 0;
    document.documentElement.style.setProperty("--header-offset", `${headerHeight + headerTop + 16}px`);
  };

  const syncHeaderState = () => {
    const compactThreshold = Math.max(32, siteHeader.getBoundingClientRect().height * 0.5);
    siteHeader.classList.toggle("is-scrolled", window.scrollY > compactThreshold);
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

export const initTrackedClicks = () => {
  document.querySelectorAll<HTMLElement>("[data-track-click]").forEach((element) => {
    element.addEventListener("click", () => {
      track("cta_click", { id: element.dataset.trackClick || "unknown" });
    });
  });
};

export const initAnchorNavigation = () => {
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
