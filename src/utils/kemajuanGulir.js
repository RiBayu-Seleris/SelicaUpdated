import { onBeforeUnmount, onMounted } from "vue";

/**
 * Menulis "sudah sejauh mana bagian ini dilewati" sebagai angka 0..1 pada
 * elemennya sendiri, dalam bentuk custom property `--maju`.
 *
 * KENAPA BUKAN NILAI REAKTIF
 * Alasannya sama dengan parallax.js: kalau angkanya disimpan sebagai ref()
 * dan dipakai di :style, Vue menggambar ulang SELURUH komponen halaman tiap
 * kali halaman digulir. Untuk halaman sepanjang ini, itu berarti puluhan
 * penggambaran ulang per detik demi menggeser satu garis.
 *
 * Dengan menulisnya sebagai custom property langsung ke elemen, tidak ada
 * komponen yang perlu digambar ulang: CSS yang membaca angkanya.
 *
 *   <div ref="rel" class="rel">
 *     <span class="isi" />   // .isi { width: calc(var(--maju, 0) * 100%) }
 *   </div>
 *
 *   pasangKemajuan(rel);
 *
 * KENAPA HANYA DIHITUNG SAAT TERLIHAT
 * Menghitung posisi elemen memaksa browser mengukur ulang tata letak. Kalau
 * dilakukan terus-menerus sepanjang halaman, biayanya dibayar juga saat
 * bagian ini berada jauh di luar layar dan tidak ada yang bisa melihat
 * hasilnya. IntersectionObserver mematikannya di luar layar.
 *
 * @param {import('vue').Ref<HTMLElement|null>} rujukan Elemen yang diamati
 */
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

    /* 0 saat puncak elemen menyentuh sepertiga bawah layar, 1 saat dasarnya
       naik melewati sepertiga atas. Rentang itu dipilih supaya garisnya
       selesai terisi TEPAT ketika bagian terakhirnya terbaca — bukan setelah
       bagian ini sudah lewat, yang membuat kemajuannya terasa terlambat. */
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
