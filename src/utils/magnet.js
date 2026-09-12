const bisaMelayang = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

const kurangiGerak = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const vMagnet = {
  mounted(el, ikatan) {
    if (!bisaMelayang() || kurangiGerak()) return;

    const kekuatan = Number(ikatan.value ?? 14);
    let idFrame = null;
    let dx = 0;
    let dy = 0;

    const terapkan = () => {
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      idFrame = null;
    };

    const jadwalkan = () => {
      if (idFrame) return;
      idFrame = requestAnimationFrame(terapkan);
    };

    const ikuti = (peristiwa) => {
      const kotak = el.getBoundingClientRect();
      const relX = (peristiwa.clientX - (kotak.left + kotak.width / 2)) / (kotak.width / 2);
      const relY = (peristiwa.clientY - (kotak.top + kotak.height / 2)) / (kotak.height / 2);
      dx = Math.max(-1, Math.min(1, relX)) * kekuatan;
      dy = Math.max(-1, Math.min(1, relY)) * kekuatan * 0.6;
      jadwalkan();
    };

    const lepas = () => {
      dx = 0;
      dy = 0;
      jadwalkan();
    };

    el.addEventListener("pointermove", ikuti);
    el.addEventListener("pointerleave", lepas);

    el._magnet = { ikuti, lepas, batal: () => idFrame && cancelAnimationFrame(idFrame) };
  },

  unmounted(el) {
    if (!el._magnet) return;
    el.removeEventListener("pointermove", el._magnet.ikuti);
    el.removeEventListener("pointerleave", el._magnet.lepas);
    el._magnet.batal();
    delete el._magnet;
  },
};
