import { track } from "./analytics";

type SupportedLanguage = "es" | "en";
type LanguageDictionary = Record<string, string>;
type LanguageCopy = Record<SupportedLanguage, LanguageDictionary>;

const LANGUAGE_STORAGE_KEY = "automize-language";
const fallbackLanguage: SupportedLanguage = "es";

let activeLanguage: SupportedLanguage = fallbackLanguage;
let languageCopy: LanguageCopy = { es: {}, en: {} };

const isSupportedLanguage = (language: string | null): language is SupportedLanguage =>
  language === "es" || language === "en";

const getStoredLanguage = () => {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
};

const setStoredLanguage = (language: SupportedLanguage) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    return;
  }
};

export const getCopyValue = (key: string, language = activeLanguage) =>
  languageCopy[language]?.[key] ?? languageCopy[fallbackLanguage]?.[key] ?? "";

const getInitialLanguage = (): SupportedLanguage => {
  const searchLanguage = new URLSearchParams(window.location.search).get("lang");
  if (isSupportedLanguage(searchLanguage)) return searchLanguage;

  const storedLanguage = getStoredLanguage();
  if (isSupportedLanguage(storedLanguage)) return storedLanguage;

  return fallbackLanguage;
};

const applyTextCopy = (language: SupportedLanguage) => {
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = key ? getCopyValue(key, language) : "";
    if (value) {
      element.textContent = value;
    }
  });
};

const applyAttributeCopy = (language: SupportedLanguage) => {
  const attributeBindings = [
    { selector: "[data-i18n-aria-label]", dataKey: "i18nAriaLabel", attribute: "aria-label" },
    { selector: "[data-i18n-content]", dataKey: "i18nContent", attribute: "content" },
    { selector: "[data-i18n-tooltip]", dataKey: "i18nTooltip", attribute: "data-tooltip" },
  ] as const;

  attributeBindings.forEach((binding) => {
    document.querySelectorAll<HTMLElement>(binding.selector).forEach((element) => {
      const key = element.dataset[binding.dataKey];
      const value = key ? getCopyValue(key, language) : "";
      if (value) {
        element.setAttribute(binding.attribute, value);
      }
    });
  });
};

const applyFormCopy = (language: SupportedLanguage) => {
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = key ? getCopyValue(key, language) : "";
    if (value) {
      element.placeholder = value;
    }
  });

  document.querySelectorAll<HTMLFormElement>("[data-i18n-submit-label]").forEach((form) => {
    const key = form.dataset.i18nSubmitLabel;
    const value = key ? getCopyValue(key, language) : "";
    if (value) {
      form.dataset.submitLabel = value;
    }
  });
};

const syncLanguageControls = (language: SupportedLanguage) => {
  document.querySelectorAll<HTMLElement>("[data-language-current]").forEach((element) => {
    element.textContent = language.toUpperCase();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-language-option]").forEach((button) => {
    const isActive = button.dataset.languageOption === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
};

const applyLanguage = (language: SupportedLanguage, persist = true) => {
  activeLanguage = language;
  const dictionary = languageCopy[language] ?? languageCopy[fallbackLanguage];

  document.documentElement.lang = language;

  const pageTitleKey = document.documentElement.dataset.pageTitleKey;
  const title = pageTitleKey ? getCopyValue(pageTitleKey, language) : dictionary["meta.title"];
  if (title) {
    document.title = title;
  }

  applyTextCopy(language);
  applyAttributeCopy(language);
  applyFormCopy(language);
  syncLanguageControls(language);

  if (persist) {
    setStoredLanguage(language);
    track("language_switch", { language });
  }

  window.dispatchEvent(new Event("resize"));
};

const readLanguageCopy = (): LanguageCopy => {
  const copyNode = document.querySelector<HTMLScriptElement>("#language-copy");
  if (!copyNode?.textContent) return { es: {}, en: {} };

  try {
    return JSON.parse(copyNode.textContent) as LanguageCopy;
  } catch {
    return { es: {}, en: {} };
  }
};

export const initLanguageSwitcher = () => {
  languageCopy = readLanguageCopy();

  document.querySelectorAll<HTMLElement>("[data-language-switch]").forEach((switcher) => {
    const trigger = switcher.querySelector<HTMLButtonElement>("[data-language-trigger]");
    const menu = switcher.querySelector<HTMLElement>("[data-language-menu]");

    if (!trigger || !menu) return;

    const closeMenu = () => {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    };

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (menu.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    switcher.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        trigger.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target as Node)) {
        closeMenu();
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.languageOption;
      const switcher = button.closest<HTMLElement>("[data-language-switch]");
      const trigger = switcher?.querySelector<HTMLButtonElement>("[data-language-trigger]");
      const menu = switcher?.querySelector<HTMLElement>("[data-language-menu]");

      if (trigger && menu) {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      }

      if (!isSupportedLanguage(nextLanguage) || nextLanguage === activeLanguage) return;
      applyLanguage(nextLanguage);
    });
  });

  applyLanguage(getInitialLanguage(), false);
};
