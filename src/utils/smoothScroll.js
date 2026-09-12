import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis = null;

let scrollToAsli = null;
let scrollIntoViewAsli = null;

const lengkungGerak = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const hitungDurasi = (jarak) =>
  Math.min(1.4, Math.max(0.6, 0.45 + Math.sqrt(Math.abs(jarak)) / 90));

function belokkanPerintahGulir() {
  scrollToAsli = window.scrollTo.bind(window);
  scrollIntoViewAsli = Element.prototype.scrollIntoView;

  window.scrollTo = function (...argumen) {
    const opsi = argumen[0];
    const mintaHalus =
      argumen.length === 1 &&
      typeof opsi === "object" &&
      opsi !== null &&
      opsi.behavior === "smooth";

    if (!lenis || !mintaHalus) {
      return scrollToAsli(...argumen);
    }
    const tujuan = opsi.top ?? 0;
    lenis.scrollTo(tujuan, {
      duration: hitungDurasi(tujuan - window.scrollY),
      easing: lengkungGerak,
    });
  };

  // elemen.scrollIntoView({ behavior: "smooth" })
  // Alasan yang sama seperti di atas: argumen diteruskan apa adanya.
  Element.prototype.scrollIntoView = function (...argumen) {
    const opsi = argumen[0];
    const mintaHalus = typeof opsi === "object" && opsi !== null && opsi.behavior === "smooth";

    if (!lenis || !mintaHalus) {
      return scrollIntoViewAsli.apply(this, argumen);
    }
    // Jarak ke elemen = posisinya terhadap layar saat ini.
    const jarak = this.getBoundingClientRect().top;
    lenis.scrollTo(this, {
      duration: hitungDurasi(jarak),
      easing: lengkungGerak,
    });
  };
}

export function pasangSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.14,

    allowNestedScroll: true,

    anchors: true,

    autoRaf: true,
  });

  belokkanPerintahGulir();
  return lenis;
}

export function gulirCepatKe(posisi) {
  if (!lenis) {
    window.scrollTo({ top: posisi, behavior: "smooth" });
    return;
  }
  lenis.scrollTo(posisi, {
    duration: 0.45,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}

export function hentikanSmoothScroll() {
  lenis?.stop();
}

export function jalankanSmoothScroll() {
  if (!lenis) return;
  lenis.start();
  lenis.resize();
}

export function gulirKePuncakSeketika() {
  lenis?.scrollTo(0, { immediate: true, force: true });
}

export function copotSmoothScroll() {
  if (scrollToAsli) window.scrollTo = scrollToAsli;
  if (scrollIntoViewAsli) Element.prototype.scrollIntoView = scrollIntoViewAsli;
  lenis?.destroy();
  lenis = null;
}
