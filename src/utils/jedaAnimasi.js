import { onBeforeUnmount, onMounted } from "vue";

/**
 * Menghentikan animasi CSS pada bagian halaman yang sedang tidak terlihat.
 *
 * MASALAH YANG DISELESAIKAN
 * Beberapa hiasan di halaman ini memakai animasi tak terbatas — yang paling
 * mahal adalah tepi kartu berputar, karena yang dianimasikan adalah SUDUT
 * sebuah conic-gradient. Gradien kerucut tidak bisa dipercepat kartu grafis,
 * jadi browser menggambar ulang gradien itu dari nol enam puluh kali per
 * detik, TERUS-MENERUS — bahkan saat elemennya sudah jauh di luar layar.
 *
 * Pada halaman sepanjang ini, artinya browser selalu sibuk menggambar sesuatu
 * yang tidak dilihat siapa pun, dan gulirnya jadi terasa berat.
 *
 * CARA KERJANYA
 * Tiap <section> diawasi. Begitu keluar layar, kelas `jeda-animasi` dipasang;
 * kelas itu menghentikan seluruh animasi di dalamnya. Saat masuk layar lagi,
 * animasinya dilanjutkan dari posisi terakhir — bukan diulang dari awal, jadi
 * tidak ada kedipan.
 *
 * Ambangnya diberi margin 200px supaya animasinya sudah berjalan sedikit
 * sebelum bagian itu benar-benar terlihat.
 */
export function pasangJedaAnimasi() {
  let pengamat = null;

  const mulai = () => {
    if (typeof IntersectionObserver === "undefined") return;

    pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          e.target.classList.toggle("jeda-animasi", !e.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" },
    );

    document.querySelectorAll("section").forEach((el) => pengamat.observe(el));
  };

  onMounted(() => {
    // Ditunda satu putaran supaya seluruh isi halaman sudah terpasang.
    requestAnimationFrame(mulai);
  });

  onBeforeUnmount(() => {
    pengamat?.disconnect();
    document.querySelectorAll(".jeda-animasi").forEach((el) => el.classList.remove("jeda-animasi"));
  });
}
