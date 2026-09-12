export const DIRECT_PERCENT = 0.15;
export const PASSIVE_PERCENT = 0.1;

const rentang = (dari, sampai) => Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i);

const paketData = [
  {
    id: "essential",
    price: 300000,
    badge: null,
    badgeMobile: "dasar",
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

export const packages = paketData.map((pkg) => ({
  id: pkg.id,
  labelKey: `packages.names.${pkg.id}`,
  badgeKey: pkg.badge ? `packages.badges.${pkg.badge}` : null,
  badgeMobileKey: `packages.badges.${pkg.badgeMobile}`,
  price: pkg.price,
  parameterTotal: pkg.benefits.reduce((sum, b) => sum + b.param.length, 0),
  features: pkg.benefits.map((b) => ({
    nameKey: `packages.benefitCategories.${b.kategori}`,
    count: b.param.length,
  })),
  commission: {
    direct: pkg.price * DIRECT_PERCENT,
    team: pkg.price * PASSIVE_PERCENT,
  },
  modalValues: pkg.benefits.map((b) => ({
    nameKey: `packages.benefitCategories.${b.kategori}`,
    valueKeys: b.param.map((i) => `packages.params.${i}`),
  })),
}));
