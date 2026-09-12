import { onBeforeUnmount, onMounted } from "vue";

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
    document.documentElement.style.removeProperty("--gulir");
  });
}
