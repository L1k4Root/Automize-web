import { initLanguageSwitcher } from "./i18n";
import { initCalendarFallback, initLeadForm } from "./lead-form";
import { initAnchorNavigation, initHeaderScrollState, initTrackedClicks } from "./navigation";

const initLandingPage = () => {
  initLanguageSwitcher();
  initHeaderScrollState();
  initTrackedClicks();
  initAnchorNavigation();
  initCalendarFallback();
  initLeadForm();
};

initLandingPage();
