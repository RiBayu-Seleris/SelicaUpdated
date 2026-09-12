import { onBeforeUnmount, onMounted } from "vue";

export function pasangKemajuan(rujukan) {
  let idFrame = null;
  let pengamat = null;
  let jalan = false;

  const kurangiGerak =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const hitung = () => {
    idFrame = null;
    const el = rujukan.value;
    if (!el) return;

    const kotak = el.getBoundingClientRect();
    const layar = window.innerHeight;

    const mulai = layar * 0.66;
    const akhir = -kotak.height + layar * 0.34;
    const maju = (mulai - kotak.top) / (mulai - akhir);

    el.style.setProperty("--maju", String(Math.max(0, Math.min(1, maju))));
  };

  const jadwalkan = () => {
    if (idFrame || !jalan) return;
    idFrame = requestAnimationFrame(hitung);
  };

  onMounted(() => {
    const el = rujukan.value;
    if (!el) return;

    // Pengunjung yang menyalakan "kurangi animasi" langsung mendapat keadaan
    // penuh: garisnya terisi, hanya tidak mengikuti guliran.
    if (kurangiGerak) {
      el.style.setProperty("--maju", "1");
      return;
    }

    el.style.setProperty("--maju", "0");

    pengamat = new IntersectionObserver(
      ([masuk]) => {
        jalan = masuk.isIntersecting;
        if (jalan) hitung();
      },
      { threshold: 0 },
    );
    pengamat.observe(el);

    window.addEventListener("scroll", jadwalkan, { passive: true });
    window.addEventListener("resize", jadwalkan);
  });

  onBeforeUnmount(() => {
    if (idFrame) cancelAnimationFrame(idFrame);
    pengamat?.disconnect();
    window.removeEventListener("scroll", jadwalkan);
    window.removeEventListener("resize", jadwalkan);
  });
}
