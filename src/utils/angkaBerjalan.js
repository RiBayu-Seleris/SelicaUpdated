import { onUnmounted, ref, watch } from "vue";

/**
 * Membuat angka BERJALAN menuju nilai barunya, bukan melompat begitu saja.
 *
 * KENAPA PERLU
 * Di simulasi komisi, angka rupiah berubah setiap kali penggeser digerakkan.
 * Kalau langsung melompat, mata sulit menangkap arah perubahannya: naik atau
 * turun, banyak atau sedikit. Dengan berjalan sebentar, perubahannya terbaca.
 *
 * Ini gerakan yang MENJAWAB AKSI pengunjung — bukan animasi yang jalan
 * sendiri saat halaman dibuka.
 *
 * CARA PAKAI
 *
 *   const total = computed(() => hargaSatuan * jumlah);
 *   const totalTampil = useAngkaBerjalan(total);
 *   // lalu tampilkan totalTampil, bukan total
 *
 * @param {import('vue').Ref<number>} sumber Angka aslinya
 * @param {number} durasi Lama perjalanan dalam milidetik
 * @returns {import('vue').Ref<number>} Angka yang sedang berjalan
 */
export function useAngkaBerjalan(sumber, durasi = 420) {
  const tampil = ref(sumber.value);
  let idFrame = null;

  // Sebagian orang menyetel sistemnya untuk mengurangi animasi, biasanya
  // karena gerakan membuat mereka pusing. Setelan itu kita hormati: angkanya
  // langsung berganti tanpa berjalan.
  const kurangiGerak =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /**
   * Pelan di ujung, cepat di tengah. Tanpa ini perjalanannya terasa mekanis
   * karena kecepatannya rata dari awal sampai akhir.
   */
  const perlambat = (x) => 1 - Math.pow(1 - x, 3);

  const berhenti = () => {
    if (idFrame) cancelAnimationFrame(idFrame);
    idFrame = null;
  };

  watch(sumber, (tujuan) => {
    berhenti();

    if (kurangiGerak) {
      tampil.value = tujuan;
      return;
    }

    const awal = tampil.value;
    const selisih = tujuan - awal;
    if (selisih === 0) return;

    const mulai = performance.now();

    const langkah = (sekarang) => {
      const lewat = Math.min((sekarang - mulai) / durasi, 1);
      tampil.value = awal + selisih * perlambat(lewat);

      if (lewat < 1) {
        idFrame = requestAnimationFrame(langkah);
      } else {
        // Dipastikan mendarat tepat di angka tujuan, supaya tidak berhenti
        // di pecahan akibat pembulatan.
        tampil.value = tujuan;
        idFrame = null;
      }
    };

    idFrame = requestAnimationFrame(langkah);
  });

  onUnmounted(berhenti);

  return tampil;
}
