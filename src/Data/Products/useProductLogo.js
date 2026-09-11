// src/Data/Products/useProductLogo.js
import { computed } from "vue";

/**
 * Logo yang dipakai navbar dan footer.
 *
 * Dulu logonya dipilih berdasarkan halaman yang sedang dibuka. Sekarang situs
 * ini hanya punya satu halaman, jadi logonya selalu sama — computed tetap
 * dipertahankan supaya cara pemakaiannya di komponen tidak berubah.
 */
export function useProductLogo() {
  const logo = computed(
    () => new URL("@/assets/Products/images/Logo/Care-Logo.png", import.meta.url).href,
  );

  return { logo };
}
