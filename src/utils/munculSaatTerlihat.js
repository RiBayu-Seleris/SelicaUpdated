/**
 * Arahan `v-muncul`: menampilkan elemen saat pertama kali masuk layar.
 *
 * KENAPA TIDAK MEMAKAI AOS
 * AOS sudah dipakai di halaman lain dan tetap di sana. Tapi AOS menempelkan
 * transisinya sendiri (translate + opacity, durasi seragam) dan tidak bisa
 * menahan animasi sampai elemen INDUKNYA siap. Halaman Selica Partner
 * memerlukan dua hal yang tidak disediakan AOS:
 *
 * 1. Beberapa macam gerak masuk yang berbeda peran — garis yang MELEBAR,
 *    tulisan yang NAIK dari balik topeng, blok yang MEMUDAR. Perbedaan itu
 *    yang membuat mata membaca urutan kepentingan, bukan sekadar "semua
 *    bergerak".
 * 2. Satu pengamat untuk seluruh halaman. AOS memasang satu pemeriksa posisi
 *    pada peristiwa scroll; di halaman sepanjang ini, IntersectionObserver
 *    jauh lebih murah karena pekerjaannya dilakukan browser di luar thread
 *    utama.
 *
 * CARA PAKAI
 *
 *   <p v-muncul>...</p>            // muncul begitu terlihat
 *   <p v-muncul="120">...</p>      // ditunda 120 milidetik
 *
 * Gerak masuknya sendiri ditulis di CSS halaman, dipilih lewat atribut
 * `data-muncul` yang diubah arahan ini dari "belum" menjadi "ya". Dengan
 * begitu setiap halaman bebas menentukan bentuk geraknya sendiri, dan berkas
 * ini tidak perlu tahu apa-apa soal tampilan.
 */

const kurangiGerak = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Satu pengamat dipakai bersama semua elemen. Membuat satu pengamat per
// elemen berarti browser menyimpan puluhan pengamat untuk pekerjaan yang
// sama persis.
let pengamat = null;

const ambilPengamat = () => {
  if (pengamat) return pengamat;

  pengamat = new IntersectionObserver(
    (daftar) => {
      for (const masuk of daftar) {
        if (!masuk.isIntersecting) continue;
        masuk.target.dataset.muncul = "ya";
        // Sekali muncul, selesai. Kalau diulang tiap kali dilewati, halaman
        // terasa gelisah saat digulir naik-turun.
        pengamat.unobserve(masuk.target);
      }
    },
    {
      // Sedikit ke dalam layar: elemen baru dianggap "terlihat" setelah
      // benar-benar masuk, bukan saat piksel pertamanya menyentuh tepi.
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.01,
    },
  );

  return pengamat;
};

export const vMuncul = {
  mounted(el, ikatan) {
    // Pengunjung yang menyalakan "kurangi animasi" langsung mendapat
    // keadaan akhir: isinya tetap lengkap, hanya tanpa gerak.
    if (kurangiGerak()) {
      el.dataset.muncul = "ya";
      return;
    }

    const jeda = Number(ikatan.value ?? 0);
    if (jeda) el.style.setProperty("--jeda-muncul", `${jeda}ms`);

    // Ditulis di mounted() — yaitu sebelum browser menggambar — supaya tidak
    // ada kedipan isi yang sempat tampil penuh lalu tiba-tiba disembunyikan.
    el.dataset.muncul = "belum";
    ambilPengamat().observe(el);
  },

  unmounted(el) {
    pengamat?.unobserve(el);
  },
};
