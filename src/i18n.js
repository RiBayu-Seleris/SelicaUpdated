// i18n.js
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

export const SUPPORTED_LOCALES = ["en", "id"];
export const DEFAULT_LOCALE = "en";

let savedLocale = null;
try {
  savedLocale = localStorage.getItem("locale");
} catch {
  /* localStorage diblokir (mode penyamaran): pakai bahasa bawaan saja */
}

// Set lebih awal (sebelum Vue mount) supaya atribut lang di <html> langsung
// benar dan tidak ada kedipan memakai bahasa yang salah.
document.documentElement.setAttribute(
  "lang",
  SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE,
);

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, id },
});

export default i18n;
