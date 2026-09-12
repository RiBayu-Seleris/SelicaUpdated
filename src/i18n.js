// i18n.js
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

export const SUPPORTED_LOCALES = ["en", "id"];
// Produk ini dipakai di Indonesia, jadi kunjungan pertama dibuka dalam
// bahasa Indonesia. Pengunjung yang pernah menukar bahasa tetap mendapat
// pilihannya, karena pilihan itu disimpan di localStorage dan dibaca di bawah.
//
// Ini juga menentukan `fallbackLocale`: kunci yang belum diterjemahkan di
// berkas bahasa lain akan jatuh ke kalimat Indonesianya, bukan ke Inggris.
export const DEFAULT_LOCALE = "id";

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
