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
  document.querySelectorAll<HTMLButtonElement>("[data-language-option]").forEach((button) => {
    const isActive = button.dataset.languageOption === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const applyLanguage = (language: SupportedLanguage, persist = true) => {
  activeLanguage = language;
  const dictionary = languageCopy[language] ?? languageCopy[fallbackLanguage];

  document.documentElement.lang = language;

  const title = dictionary["meta.title"];
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

  document.querySelectorAll<HTMLButtonElement>("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.languageOption;
      if (!isSupportedLanguage(nextLanguage) || nextLanguage === activeLanguage) return;
      applyLanguage(nextLanguage);
    });
  });

  applyLanguage(getInitialLanguage(), false);
};
