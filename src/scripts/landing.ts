import { initLanguageSwitcher } from "./i18n";
import { initCalendarFallback, initLeadForm } from "./lead-form";
import { initAnchorNavigation, initHeaderScrollState, initTrackedClicks } from "./navigation";
import { initServiceCards } from "./service-cards";

const initLandingPage = () => {
  initLanguageSwitcher();
  initHeaderScrollState();
  initTrackedClicks();
  initAnchorNavigation();
  initServiceCards();
  initCalendarFallback();
  initLeadForm();
};

initLandingPage();
