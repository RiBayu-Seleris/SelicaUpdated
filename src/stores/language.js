// stores/language.js
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import i18n from "@/i18n";

// Daftar bahasa yang tampil di switcher navbar.
// Tambah bahasa baru cukup dengan menambah objek di array ini.
export const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "id", short: "ID", label: "Bahasa Indonesia" },
];

const DEFAULT_LOCALE = "en";

export const useLanguageStore = defineStore("language", () => {
  const locale = ref(DEFAULT_LOCALE);

  const languages = computed(() => LANGUAGES);

  const current = computed(
    () =>
      LANGUAGES.find((lang) => lang.code === locale.value) ||
      LANGUAGES.find((lang) => lang.code === DEFAULT_LOCALE),
  );

  const applyLanguage = () => {
    document.documentElement.setAttribute("lang", locale.value);
    i18n.global.locale.value = locale.value;
  };

  const loadLanguage = () => {
    let saved = null;
    try {
      saved = localStorage.getItem("locale");
    } catch {
      /* localStorage diblokir: pakai bahasa bawaan */
    }
    const isKnown = LANGUAGES.some((lang) => lang.code === saved);
    locale.value = isKnown ? saved : DEFAULT_LOCALE;
    applyLanguage();
  };

  const setLocale = (code) => {
    if (!LANGUAGES.some((lang) => lang.code === code)) return;
    locale.value = code;
    applyLanguage();
    try {
      localStorage.setItem("locale", code);
    } catch {
      /* diabaikan: bahasa tetap berganti, hanya tidak diingat */
    }
  };

  watch(locale, applyLanguage);

  return { locale, languages, current, setLocale, loadLanguage };
});
