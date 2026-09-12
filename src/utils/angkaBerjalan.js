import { onUnmounted, ref, watch } from "vue";

export function useAngkaBerjalan(sumber, durasi = 420) {
  const tampil = ref(sumber.value);
  let idFrame = null;

  const kurangiGerak =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
        tampil.value = tujuan;
        idFrame = null;
      }
    };

    idFrame = requestAnimationFrame(langkah);
  });

  onUnmounted(berhenti);

  return tampil;
}
