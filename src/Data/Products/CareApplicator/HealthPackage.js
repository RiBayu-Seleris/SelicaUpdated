// Di-export supaya halaman SELICA Partner memakai angka yang sama persis.
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
const paketData = [
  {
    id: "essential",
    price: 300000,
    // Paket dasar tidak punya badge di tampilan desktop.
    badge: null,
    badgeMobile: "dasar",
    benefits: [
      { kategori: "vital", param: [0, 1, 2, 3, 4] },
      { kategori: "fisik", param: [5, 6, 7, 8, 9] },
      { kategori: "fisiologis", param: [10, 11, 12] },
      { kategori: "mental", param: [13] },
      { kategori: "darah", param: [14, 15, 16, 17, 18] },
    ],
  },
  {
    id: "core",
    price: 400000,
    badge: "populer",
    badgeMobile: "populer",
    benefits: [
      { kategori: "vital", param: [0, 1, 2, 3, 4] },
      { kategori: "fisik", param: [5, 6, 7, 8, 9] },
      { kategori: "fisiologis", param: [10, 11, 12] },
      { kategori: "mental", param: [13] },
      { kategori: "darah", param: [14, 15, 16, 17, 18] },
      { kategori: "komposisi", param: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { kategori: "risiko", param: [31, 32, 33, 34, 35, 36, 37, 38] },
    ],
  },
  {
    id: "prime",
    price: 500000,
    badge: "terlengkap",
    badgeMobile: "terlengkap",
    benefits: [
      { kategori: "vital", param: [0, 1, 2, 3, 4] },
      { kategori: "fisik", param: [5, 6, 7, 8, 9] },
      { kategori: "fisiologis", param: [10, 11, 12] },
      { kategori: "mental", param: [13] },
      { kategori: "darah", param: [14, 15, 16, 17, 18] },
      { kategori: "komposisi", param: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { kategori: "risiko", param: [31, 32, 33, 34, 35, 36, 37, 38] },
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
