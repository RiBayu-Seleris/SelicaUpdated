import { onBeforeUnmount, onMounted } from "vue";

/**
 * Menggeser elemen lebih lambat daripada halaman saat digulir.
 *
 * KENAPA MEMBUAT KESAN KEDALAMAN
 * Di dunia nyata, benda jauh tampak bergerak lebih lambat daripada benda
 * dekat saat kita berjalan. Kalau ornamen latar digeser hanya sebagian dari
 * jarak gulir halaman, mata membacanya sebagai "ada di belakang".
 *
 * KENAPA LEWAT CSS VARIABLE, BUKAN NILAI REAKTIF
 * Versi sebelumnya mengembalikan nilai reaktif yang dipasang ke :style.
 * Akibatnya Vue menggambar ulang SELURUH komponen setiap kali halaman
 * digulir — enam puluh kali per detik untuk halaman yang isinya panjang — dan
 * gulirnya terasa tersendat.
 *
 * Sekarang posisinya ditulis sebagai custom property `--gulir` di elemen
 * <html>. Nilainya berubah di luar Vue, jadi tidak ada komponen yang perlu
 * digambar ulang; browser cukup menghitung ulang transform-nya saja.
 *
 * CARA PAKAI
 *
 *   pasangParallax();   // sekali saja di komponen halaman
 *
 * lalu di template, kekuatannya ditentukan lewat pengali:
 *
 *   :style="{ transform: 'translate3d(0, calc(var(--gulir) * 0.18), 0)' }"
 *
 * Angka 0.18 berarti bergeser 18% dari jarak gulir. Semakin kecil, semakin
 * jauh benda itu terasa.
 */
export function pasangParallax() {
  let idFrame = null;

  // Pengunjung yang menyalakan "kurangi animasi" tidak mendapat pergeseran
  // sama sekali: nilainya dibiarkan 0.
  const kurangiGerak =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const tulis = () => {
    document.documentElement.style.setProperty("--gulir", `${window.scrollY || 0}px`);
    idFrame = null;
  };

  // Diredam dengan requestAnimationFrame supaya penulisannya paling banyak
  // sekali per gambar layar, bukan tiap kali kejadian gulir datang.
  const tanganiGulir = () => {
    if (idFrame) return;
    idFrame = requestAnimationFrame(tulis);
  };

  onMounted(() => {
    document.documentElement.style.setProperty("--gulir", "0px");
    if (kurangiGerak) return;
    tulis();
    window.addEventListener("scroll", tanganiGulir, { passive: true });
  });

  onBeforeUnmount(() => {
    if (idFrame) cancelAnimationFrame(idFrame);
    window.removeEventListener("scroll", tanganiGulir);
    // Dibersihkan supaya halaman lain tidak mewarisi nilai terakhirnya.
    document.documentElement.style.removeProperty("--gulir");
  });
}
