import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth scroll (gulir berinersia) untuk seluruh situs.
 *
 * APA YANG DILAKUKAN
 * Normalnya, satu putaran roda tetikus = halaman melompat sekian piksel,
 * berhenti mendadak. Lenis membuat halaman "mengejar" posisi itu dengan
 * perlambatan, jadi terasa meluncur dan berhenti perlahan.
 *
 * KENAPA SEMUANYA DIKUMPULKAN DI SATU BERKAS INI
 * Supaya gampang dicabut kalau ternyata tidak cocok. Tidak ada satu pun
 * komponen lain yang perlu meng-import Lenis — cukup App.vue memanggil
 * fungsi-fungsi di bawah. Kalau efek ini mau dihapus, hapus berkas ini dan
 * empat pemanggilannya di App.vue, selesai.
 *
 * CATATAN PENTING soal window.scrollTo
 * Di project ini ada 6 tempat yang menggulir halaman lewat perintah, bukan
 * lewat roda tetikus — tombol "kembali ke atas", daftar isi artikel, menu
 * halaman product, dan seterusnya. Kalau dibiarkan memakai perintah bawaan
 * browser, gerakannya akan berebut dengan Lenis dan hasilnya tersendat.
 *
 * Daripada mengubah 6 berkas itu satu per satu (dan menyebar Lenis ke
 * mana-mana), perintah bawaannya dibelokkan dari sini — lihat
 * belokkanPerintahGulir() di bawah. Jadi kode di komponen tidak perlu tahu
 * apa-apa soal Lenis, dan tetap berfungsi normal kalau berkas ini dihapus.
 */

// Satu-satunya instance Lenis untuk seluruh aplikasi.
let lenis = null;

// Perintah gulir asli milik browser, disimpan supaya bisa dikembalikan.
let scrollToAsli = null;
let scrollIntoViewAsli = null;

/**
 * Lengkung gerak untuk gulir lewat perintah: pelan saat berangkat, cepat di
 * tengah, pelan lagi saat mendekat (ease-in-out).
 *
 * KENAPA BUKAN RUMUS BAWAAN LENIS
 * Rumus yang disarankan Lenis adalah ease-out exponential, dan bentuknya
 * sangat berat di depan: pada sepertiga waktu pertama, halaman sudah
 * menempuh 87% jaraknya. Sisanya cuma merayap pelan yang hampir tak terlihat.
 * Akibatnya, walaupun durasinya 1,4 detik, geraknya TERASA seperti lompatan
 * kilat — itu yang bikin tombol "kembali ke atas" terasa terlalu cepat.
 *
 * Ease-in-out membagi perjalanan lebih rata, jadi geraknya terbaca sebagai
 * meluncur, bukan menyentak. Ini yang paling mendekati gulir halus bawaan
 * browser — yaitu yang dipakai seleris.ai, karena versi produksi memang belum
 * memakai Lenis.
 */
const lengkungGerak = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Menghitung berapa lama gulir lewat perintah harus berlangsung, dalam detik.
 *
 * KENAPA PERLU DIHITUNG
 * Kalau durasinya tidak diisi, Lenis memakai "lerp" — kecepatan yang sebanding
 * dengan jarak. Untuk gulir roda tetikus itu pas, karena jaraknya selalu
 * pendek. Tapi untuk tombol "kembali ke atas" dari dasar halaman, jaraknya
 * ribuan piksel, jadi geraknya melesat.
 *
 * Dengan durasi, lamanya perjalanan yang ditentukan, bukan kecepatannya.
 * Jaraknya tetap ikut diperhitungkan supaya lompatan pendek (misalnya daftar
 * isi artikel) tidak jadi terasa lambat — tapi dibatasi antara 0,6 dan 1,4
 * detik supaya tidak pernah terlalu kilat maupun terlalu bertele-tele.
 *
 * Memakai akar kuadrat, bukan pembagian biasa, karena mata menilai gerak
 * begitu: jarak dua kali lipat tidak perlu waktu dua kali lipat. Rumus
 * pembagian biasa yang dipakai lebih dulu (jarak / 2500) ternyata membuat
 * hampir semua jarak nyata mentok di batas bawah atau batas atas, jadi
 * efeknya cuma dua nilai tanpa gradasi.
 *
 * Hasilnya kira-kira:
 *   300px -> 0,64 dtk | 1.200px -> 0,83 dtk
 * 3.500px -> 1,11 dtk | 8.000px -> 1,40 dtk (batas atas)
 */
const hitungDurasi = (jarak) =>
  Math.min(1.4, Math.max(0.6, 0.45 + Math.sqrt(Math.abs(jarak)) / 90));

/**
 * Membelokkan perintah gulir bawaan browser ke Lenis.
 *
 * Yang dibelokkan HANYA yang meminta gerakan halus (behavior: "smooth").
 * Perintah lompat seketika — misalnya yang dipakai vue-router saat berpindah
 * halaman — sengaja dibiarkan apa adanya, karena memang tidak perlu animasi.
 */
function belokkanPerintahGulir() {
  scrollToAsli = window.scrollTo.bind(window);
  scrollIntoViewAsli = Element.prototype.scrollIntoView;

  // window.scrollTo({ top: 500, behavior: "smooth" })
  //
  // HATI-HATI: perintah ini punya DUA bentuk — scrollTo(opsi) dan
  // scrollTo(x, y) — dan browser memilih yang mana berdasarkan JUMLAH
  // argumen, bukan isinya. Kalau kita menerima (opsi, y) lalu meneruskan
  // keduanya, panggilan satu argumen ikut berubah jadi dua argumen; browser
  // mengiranya bentuk (x, y), objeknya diubah jadi angka menjadi NaN, dan
  // halaman malah lompat ke posisi 0.
  //
  // Itu persis yang sempat terjadi: Lenis menggeser halaman lewat
  // scrollTo({ top, behavior: "instant" }), setiap perintahnya dibatalkan
  // jadi "kembali ke atas" 60 kali per detik, dan halaman sama sekali tidak
  // bisa digulir.
  //
  // Karena itu argumennya ditampung dengan ...argumen lalu diteruskan apa
  // adanya — jumlahnya tetap sama persis seperti saat dipanggil.
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
    // scrollIntoView(true) / scrollIntoView(false) — bentuk lama, selalu
    // seketika, jadi tidak perlu dibelokkan.
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

/**
 * Menyalakan smooth scroll. Aman dipanggil berkali-kali — kalau sudah
 * menyala, panggilan berikutnya tidak melakukan apa-apa.
 */
export function pasangSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    // Seberapa cepat halaman mengejar posisi tujuan. Semakin KECIL semakin
    // lama meluncurnya — dan semakin lama meluncur, semakin lama pula browser
    // harus menggambar ulang halaman, jadi terasa berat.
    //
    // Bawaan Lenis 0.1. Sebelumnya di sini 0.09 (lebih lambat dari bawaan)
    // tanpa alasan kuat, dan itu membuat gulirnya terasa menggantung.
    // 0.14 membuatnya lebih cepat menyusul jari, tetap halus tapi tidak
    // "molor".
    lerp: 0.14,

    // Anak tangga yang TIDAK diubah dari bawaan Lenis, tapi perlu diketahui:
    // - syncTouch: false          -> di ponsel tetap pakai gulir asli. Inersia
    //                                buatan di layar sentuh justru terasa
    //                                lambat dan melawan gerakan jari.
    // - respectReducedMotion: true -> pengunjung yang menyalakan "kurangi
    //                                animasi" di setelan sistemnya otomatis
    //                                dapat gulir biasa.

    // Area bergulir di dalam halaman (isi modal, daftar panjang) tetap
    // bergulir normal sendiri, tidak ikut ditahan Lenis.
    allowNestedScroll: true,

    // Tautan #anchor ditangani Lenis, jadi lompatannya ikut halus.
    anchors: true,

    // Lenis menjalankan loop gambarnya sendiri, jadi tidak perlu menulis
    // requestAnimationFrame manual di App.vue.
    autoRaf: true,
  });

  belokkanPerintahGulir();
  return lenis;
}

/**
 * Gulir cepat ke satu posisi — dipakai untuk paginasi.
 *
 * KENAPA TIDAK MEMAKAI window.scrollTo BIASA
 * Gulir halus situs ini memakai lengkung ease-in-out yang sengaja lambat di
 * awal: pada 30% waktu pertama halaman baru menempuh 11% jarak. Untuk tombol
 * "kembali ke atas" itu terasa tenang, tapi untuk paginasi jendela itu jadi
 * celah — data baru tiba di dalamnya, jadi pengunjung melihat kartunya
 * berganti sebelum halaman sempat naik.
 *
 * Di sini lengkungnya ease-out: berangkat dengan kecepatan penuh sejak
 * gerakan pertama lalu melambat menjelang tujuan, dan durasinya dipendekkan
 * jadi 0,45 detik. Halamannya sudah hampir sampai atas sebelum data tiba.
 *
 * Kalau smooth scroll dicabut dari situs, fungsi ini tetap bekerja — dia
 * jatuh kembali ke gulir halus bawaan browser.
 */
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

/**
 * Menahan gulir. Dipakai selama layar loading tampil — kalau tidak ditahan,
 * halaman di balik layar loading ikut tergeser saat pengunjung memutar roda.
 */
export function hentikanSmoothScroll() {
  lenis?.stop();
}

/**
 * Melanjutkan gulir. resize() dipanggil karena tinggi halaman berubah setelah
 * kontennya selesai dimuat — tanpa itu Lenis masih memakai tinggi yang lama
 * dan gulirnya berhenti sebelum ujung bawah halaman.
 */
export function jalankanSmoothScroll() {
  if (!lenis) return;
  lenis.start();
  lenis.resize();
}

/**
 * Memaksa posisi gulir kembali ke puncak SEKETIKA.
 *
 * MASALAH YANG DISELESAIKAN
 * Saat pindah halaman, Lenis sedang dihentikan (layar loading tampil).
 * Router memang menggeser halaman ke posisi 0 lewat perintah bawaan browser,
 * tapi Lenis menyimpan posisinya sendiri — begitu dijalankan lagi, dia
 * melanjutkan dari posisi halaman SEBELUMNYA dan halaman baru terbuka di
 * tengah-tengah.
 *
 * `immediate` membuat perpindahannya seketika tanpa animasi (tidak terlihat
 * karena tertutup layar loading), dan `force` diperlukan supaya perintah ini
 * tetap dijalankan meski Lenis sedang dihentikan.
 */
export function gulirKePuncakSeketika() {
  lenis?.scrollTo(0, { immediate: true, force: true });
}

/**
 * Mencabut smooth scroll sepenuhnya dan mengembalikan perintah gulir bawaan
 * browser seperti semula. Belum dipakai, disediakan supaya pencabutannya
 * rapi kalau suatu saat dibutuhkan.
 */
export function copotSmoothScroll() {
  if (scrollToAsli) window.scrollTo = scrollToAsli;
  if (scrollIntoViewAsli) Element.prototype.scrollIntoView = scrollIntoViewAsli;
  lenis?.destroy();
  lenis = null;
}
