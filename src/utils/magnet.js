/**
 * Arahan `v-magnet`: tombol yang sedikit MENDEKAT ke arah kursor.
 *
 * KENAPA ADA
 * Ini satu-satunya gerak di halaman yang tugasnya murni soal rasa. Sasaran
 * klik yang bergeser mengikuti kursor membuat tombol terasa punya bobot dan
 * merespons — kursor seolah menariknya. Dipakai HANYA pada dua ajakan utama
 * (daftar), supaya efeknya tetap terasa istimewa; kalau semua tombol
 * bergerak, tidak ada yang terasa penting.
 *
 * BATASNYA DISENGAJA KECIL
 * Pergeseran maksimum sekitar seperempat ukuran tombol. Lebih dari itu,
 * tombolnya "lari" dari kursor dan justru sulit diklik.
 *
 *   <a v-magnet>Daftar</a>
 *   <a v-magnet="10">Daftar</a>   // pergeseran maksimum 10 piksel
 */

const bisaMelayang = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

const kurangiGerak = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const vMagnet = {
  mounted(el, ikatan) {
    // Di layar sentuh tidak ada kursor untuk diikuti, dan memasang pendengar
    // pointermove di sana hanya membuang tenaga.
    if (!bisaMelayang() || kurangiGerak()) return;

    const kekuatan = Number(ikatan.value ?? 14);
    let idFrame = null;
    let dx = 0;
    let dy = 0;

    const terapkan = () => {
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      idFrame = null;
    };

    // Diredam requestAnimationFrame: pointermove bisa datang lebih sering
    // daripada layar digambar, dan menulis transform tiap kejadian berarti
    // browser menghitung tata letak untuk gambar yang tidak pernah tampil.
    const jadwalkan = () => {
      if (idFrame) return;
      idFrame = requestAnimationFrame(terapkan);
    };

    const ikuti = (peristiwa) => {
      const kotak = el.getBoundingClientRect();
      // Jarak kursor dari pusat tombol, dinormalkan ke rentang -1..1.
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

    // Disimpan di elemennya supaya unmounted() bisa mencabut pendengar yang
    // sama persis.
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
