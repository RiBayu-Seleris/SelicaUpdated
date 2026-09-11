import { emptyItems } from "@/utils/i18nList";

/**
 * Struktur isi halaman SELICA Partner.
 *
 * POLA YANG DIPAKAI
 * Berkas ini HANYA menyimpan strukturnya: warna, ikon, angka, dan berapa
 * banyak itemnya. Semua kalimatnya ada di src/locales/en.json dan id.json,
 * digabungkan di komponen memakai useLocalizedList(). Dengan begitu satu
 * kalimat cuma ditulis sekali dan otomatis ikut berganti saat pengunjung
 * menukar bahasa.
 *
 * Sumber isi: SELICA Partner & Leader Manual v1.0 (2025), Bab 1-5.
 */

/**
 * Tiga tingkat status partner. Ini SATU-SATUNYA daftar di halaman ini yang
 * benar-benar berurutan, jadi hanya di sini penomoran dibenarkan.
 */
export const statusLevels = [
  { key: "inactive", warna: "#78899F" }, // abu: belum bisa merekrut
  { key: "active", warna: "#0E9A82" }, // teal merek: sudah aktif
  { key: "leader", warna: "#195279" }, // biru tua: tingkat tertinggi
];

/**
 * Tiga butir pendukung di hero. `ikon` merujuk nama di IkonPartner.vue.
 *
 * Ini BUKAN daftar manfaat yang di bawah — itu enam butir yang menjelaskan
 * program. Tiga ini tugasnya lain: menahan orang cukup lama di layar pertama
 * untuk membaca kalimat berikutnya, jadi isinya yang paling langsung
 * menjawab "apa untungnya buat saya".
 */
export const heroFeatures = [{ ikon: "orang" }, { ikon: "perisai" }, { ikon: "medali" }];

/** Lima prinsip program. Urutannya harus sama dengan yang di berkas bahasa. */
export const principles = emptyItems(5);

/** Benefit menjadi partner. `ikon` merujuk kunci di peta ikon komponennya. */
export const benefits = [
  { ikon: "gratis" },
  { ikon: "komisi" },
  { ikon: "jaringan" },
  { ikon: "panduan" },
  { ikon: "dashboard" },
  { ikon: "fleksibel" },
];

/** Langkah pendaftaran, lima tahap berurutan. */
export const joinSteps = emptyItems(5);

/**
 * Dua sisi kode referral: bagaimana partner membagikannya, dan bagaimana
 * pelanggan memakainya. Masing-masing tiga langkah.
 */
export const referralFlows = [
  { key: "partner", warna: "#0E9A82", langkah: emptyItems(3) },
  { key: "customer", warna: "#195279", langkah: emptyItems(3) },
];

/** Delapan kemampuan dashboard SelicaHUB. */
export const hubFeatures = emptyItems(8);

/**
 * Persentase komisi. Diambil dari sumber yang sama dengan halaman paket
 * supaya tidak pernah berbeda: kalau angkanya berubah di sana, halaman ini
 * ikut berubah sendiri.
 */
export { DIRECT_PERCENT, PASSIVE_PERCENT } from "@/Data/Products/CareApplicator/HealthPackage";

/* ------------------------------------------------------------
   Batas gambar diagram jaringan

   PENTING — KESALAHAN YANG PERNAH ADA DI SINI
   Versi sebelumnya membatasi lingkaran dalam di enam simpul, lalu melempar
   KELEBIHANNYA ke lingkaran kedua. Niatnya cuma menjaga gambar tetap
   terbaca, tapi akibatnya diagram mengubah ARTI angkanya: pengunjung yang
   mengisi lima belas downline langsung melihat sembilan di antaranya
   digambar sebagai downline milik orang lain, padahal yang ia isi adalah
   relasinya sendiri. Angka "Layer 1: 6 / Layer 2: 9" di keterangan sebelah
   diagram pun bukan data sama sekali — itu murni sisa bagi dari batas enam
   tadi, tapi bentuknya seperti hasil hitungan.

   Sekarang batasnya membatasi saja: yang tidak muat TIDAK DIGAMBAR, dan
   jumlahnya disebut apa adanya lewat kalimat "+N lainnya tidak digambar".
   Tidak ada satu pun simpul yang berpindah lapis.

   Angka komisinya sendiri tidak pernah bergantung pada pembagian ini —
   kedua lapis sama-sama 10% — jadi perubahan ini murni soal kejujuran
   gambar dan keterangannya.
------------------------------------------------------------ */

/**
 * Berapa banyak downline yang muat digambar mengelilingi satu lingkaran.
 * Di atas angka ini simpulnya mulai berdempet dan tidak lagi bisa dihitung
 * dengan mata, jadi sisanya lebih jujur disebut lewat tulisan.
 */
export const MAKS_GAMBAR_DOWNLINE = 18;

/**
 * @param {number} total Jumlah downline aktif dari kendali simulasi
 * @returns {{digambar: number, sisa: number}} Berapa simpul yang digambar
 *   mengelilingi "Anda", dan berapa yang tidak muat.
 */
export function bagiJaringan(total) {
  const aman = Math.max(Math.floor(total) || 0, 0);
  return {
    digambar: Math.min(aman, MAKS_GAMBAR_DOWNLINE),
    sisa: Math.max(aman - MAKS_GAMBAR_DOWNLINE, 0),
  };
}
