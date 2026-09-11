// Di-export supaya halaman Selica Partner memakai angka yang sama persis.
// Kalau persentasenya berubah, cukup diubah di sini.
export const DIRECT_PERCENT = 0.15;
export const PASSIVE_PERCENT = 0.1;

/**
 * Paket pemeriksaan kesehatan.
 *
 * BERKAS INI HANYA MENYIMPAN STRUKTURNYA: id, harga, dan parameter apa saja
 * yang masuk tiap paket. Semua namanya ada di src/locales/en.json dan id.json
 * pada kunci `packages.*`, jadi ikut berganti saat pengunjung menukar bahasa.
 *
 * ANGKA PADA `param` ITU NOMOR URUT, bukan kode.
 * Nomor 0 merujuk `packages.params.0` di berkas bahasa, 1 ke `params.1`, dan
 * seterusnya. Kalau menambah parameter baru, tambahkan kalimatnya di KEDUA
 * berkas bahasa pada nomor yang sama, baru pakai nomornya di sini.
 */
/* Nomor parameter mengikuti urutan pada selica_Parameter_per_Paket.docx,
   yaitu urutan PAKET PRIME — satu-satunya paket yang memuat seluruh
   parameter. Essensial dan Core adalah himpunan bagiannya, jadi nomornya
   selalu ikut daftar yang sama dan tidak mungkin bergeser sendiri.

     vital       0-5     fisik       6-14    fisiologis  15-22
     mental      23-32   darah       33-37   komposisi   38-49
     risiko      50-61
*/
const rentang = (dari, sampai) => Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i);

const paketData = [
  {
    id: "essential",
    price: 300000,
    // Paket dasar tidak punya badge di tampilan desktop.
    badge: null,
    badgeMobile: "dasar",
    // 29 parameter
    benefits: [
      { kategori: "vital", param: rentang(0, 3) },
      { kategori: "fisik", param: rentang(6, 10) },
      { kategori: "fisiologis", param: rentang(15, 17) },
      { kategori: "mental", param: rentang(23, 25) },
      { kategori: "darah", param: rentang(33, 35) },
      { kategori: "komposisi", param: rentang(38, 43) },
      { kategori: "risiko", param: rentang(50, 54) },
    ],
  },
  {
    id: "core",
    price: 400000,
    badge: "populer",
    badgeMobile: "populer",
    // 43 parameter
    benefits: [
      { kategori: "vital", param: rentang(0, 4) },
      { kategori: "fisik", param: rentang(6, 13) },
      { kategori: "fisiologis", param: rentang(15, 18) },
      { kategori: "mental", param: rentang(23, 27) },
      { kategori: "darah", param: rentang(33, 37) },
      { kategori: "komposisi", param: rentang(38, 45) },
      { kategori: "risiko", param: rentang(50, 57) },
    ],
  },
  {
    id: "prime",
    price: 500000,
    badge: "terlengkap",
    badgeMobile: "terlengkap",
    // 62 parameter — seluruhnya
    benefits: [
      { kategori: "vital", param: rentang(0, 5) },
      { kategori: "fisik", param: rentang(6, 14) },
      { kategori: "fisiologis", param: rentang(15, 22) },
      { kategori: "mental", param: rentang(23, 32) },
      { kategori: "darah", param: rentang(33, 37) },
      { kategori: "komposisi", param: rentang(38, 49) },
      { kategori: "risiko", param: rentang(50, 61) },
    ],
  },
];

/**
 * Bentuk siap pakai untuk komponen.
 *
 * Yang keluar dari sini adalah KUNCI BAHASA, bukan kalimat jadi — komponen
 * yang menerjemahkannya lewat $t(). Angka (harga dan komisi) tetap dihitung
 * di sini karena angka tidak perlu diterjemahkan.
 */
export const packages = paketData.map((pkg) => ({
  id: pkg.id,
  labelKey: `packages.names.${pkg.id}`,
  badgeKey: pkg.badge ? `packages.badges.${pkg.badge}` : null,
  badgeMobileKey: `packages.badges.${pkg.badgeMobile}`,
  price: pkg.price,
  parameterTotal: pkg.benefits.reduce((sum, b) => sum + b.param.length, 0),
  // Nama kategori pemeriksaan yang tampil di kartu paket.
  features: pkg.benefits.map((b) => ({
    nameKey: `packages.benefitCategories.${b.kategori}`,
  })),
  commission: {
    direct: pkg.price * DIRECT_PERCENT,
    team: pkg.price * PASSIVE_PERCENT,
  },
  // Rincian per kategori, dipakai modal "lihat paket" di beranda.
  modalValues: pkg.benefits.map((b) => ({
    nameKey: `packages.benefitCategories.${b.kategori}`,
    valueKeys: b.param.map((i) => `packages.params.${i}`),
  })),
}));
