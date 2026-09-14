import { emptyItems } from "@/utils/i18nList";

export const statusLevels = [
  { key: "inactive", warna: "#78899F" }, // abu: belum bisa merekrut
  { key: "active", warna: "#0E9A82" }, // teal merek: sudah aktif
  { key: "leader", warna: "#195279" }, // biru tua: tingkat tertinggi
];

export const heroFeatures = [{ ikon: "orang" }, { ikon: "perisai" }, { ikon: "medali" }];

export const principles = emptyItems(5);

export const benefits = [
  { ikon: "gratis" },
  { ikon: "komisi" },
  { ikon: "jaringan" },
  { ikon: "dashboard" },
  { ikon: "fleksibel" },
];

export const joinSteps = emptyItems(5);

export const referralFlows = [
  { key: "partner", warna: "#0E9A82", langkah: emptyItems(3) },
  { key: "customer", warna: "#195279", langkah: emptyItems(3) },
];

export const hubFeatures = emptyItems(8);

export { DIRECT_PERCENT, PASSIVE_PERCENT } from "@/Data/Products/CareApplicator/HealthPackage";

export const MAKS_GAMBAR_DOWNLINE = 18;

export function bagiJaringan(total) {
  const aman = Math.max(Math.floor(total) || 0, 0);
  return {
    digambar: Math.min(aman, MAKS_GAMBAR_DOWNLINE),
    sisa: Math.max(aman - MAKS_GAMBAR_DOWNLINE, 0),
  };
}
