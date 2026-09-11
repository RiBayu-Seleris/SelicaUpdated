// Sumber: Parameters.pdf — 62 parameter, 7 kategori.
//
// BERKAS INI HANYA MENYIMPAN STRUKTURNYA: id, ikon, warna, dan tier.
// Semua judul dan keterangannya ada di src/locales/en.json dan id.json pada
// kunci `parameters.*`, digabungkan di komponen memakai useLocalizedList().
// Urutan di sini HARUS sama dengan urutan di berkas bahasa.
//
// `tier` = paket terendah yang sudah mencakup parameter tsb (insight ⊂ intellect ⊂ oracle).
export const tabs = [
  {
    id: "vital",
    icon: "heart",
    iconColor: "#EF4444",
  },
  {
    id: "fisik",
    icon: "ruler",
    iconColor: "#6366F1",
  },
  {
    id: "fisiologis",
    icon: "activity",
    iconColor: "#06B6D4",
  },
  {
    id: "mental",
    icon: "brain",
    iconColor: "#8B5CF6",
  },
  {
    id: "darah",
    icon: "droplet",
    iconColor: "#F43F5E",
  },
  {
    id: "komposisi",
    icon: "layers",
    iconColor: "#F59E0B",
  },
  {
    id: "risiko",
    icon: "shield",
    iconColor: "#F97316",
  },
];

export const tabContents = {
  vital: {
    parameters: [
      { icon: "detak-jantung", tier: "insight" },
      { icon: "spo2", tier: "insight" },
      { icon: "sistolik", tier: "insight" },
      { icon: "diastolik", tier: "insight" },
      { icon: "cardiac-output", tier: "intellect" },
      { icon: "tekanan-nadi", tier: "oracle" },
    ],
  },

  fisik: {
    parameters: [
      { icon: "bmi", tier: "insight" },
      { icon: "rasio-pinggang", tier: "insight" },
      { icon: "index-bentuk-tubuh", tier: "insight" },
      { icon: "usia-biologis", tier: "insight" },
      { icon: "usia-kulit", tier: "insight" },
      { icon: "usia-jantung", tier: "intellect" },
      { icon: "usia-vaskular", tier: "intellect" },
      { icon: "body-roundness-index", tier: "intellect" },
      {
        tier: "oracle",
      },
    ],
  },

  fisiologis: {
    parameters: [
      { icon: "hrv", tier: "insight" },
      { icon: "respirotary-rate", tier: "insight" },
      { icon: "prq", tier: "insight" },
      { icon: "hrv-vlf", tier: "intellect" },
      { icon: "hrv-lf", tier: "oracle" },
      { icon: "hrv-hf", tier: "oracle" },
      { icon: "hrv-sd2", tier: "oracle" },
      { icon: "hrv-pointarea", tier: "oracle" },
    ],
  },

  mental: {
    parameters: [
      { icon: "tingkat-stres", tier: "insight" },
      { icon: "aktifitas-parasimpatis", tier: "insight" },
      { icon: "aktifitas-simpatis", tier: "insight" },
      { icon: "hrv-rmssd", tier: "intellect" },
      { icon: "hrv-pnn50", tier: "intellect" },
      { icon: "hrv-meanrr", tier: "oracle" },
      { icon: "hrv-meanrr-1", tier: "oracle" },
      { tier: "oracle" },
      { icon: "hrv-lfhf-ratio", tier: "oracle" },
      { tier: "oracle" },
    ],
  },

  darah: {
    parameters: [
      { icon: "glukosa-darah", tier: "insight" },
      { icon: "klorestrol-total", tier: "insight" },
      { icon: "hemogoblin", tier: "insight" },
      { icon: "asam-urat", tier: "intellect" },
      { icon: "hba1c", tier: "intellect" },
    ],
  },

  komposisi: {
    parameters: [
      { icon: "tinggat-otot", tier: "insight" },
      { icon: "rasio-lemak-tubuh", tier: "insight" },
      { icon: "persentase-air", tier: "insight" },
      { icon: "massa-tulang", tier: "insight" },
      { icon: "bmr", tier: "insight" },
      { icon: "tingkar-protein", tier: "insight" },
      { icon: "lemak-viscal", tier: "intellect" },
      { icon: "lemak-subkutan", tier: "intellect" },
      { icon: "massa-otot", tier: "oracle" },
      { icon: "massa-lemak", tier: "oracle" },
      { icon: "massa-protein", tier: "oracle" },
      {
        tier: "oracle",
      },
    ],
  },

  risiko: {
    parameters: [
      { icon: "risiko-hipertensi", tier: "insight" },
      { icon: "risiko-diabetes-2", tier: "insight" },
      { icon: "risiko-kardiovaskular", tier: "insight" },
      { icon: "risiko-hiperkolestor", tier: "insight" },
      { icon: "risiko-hipertrigliseridemia", tier: "insight" },
      { icon: "risiko-serangan-jantung", tier: "intellect" },
      { icon: "risiko-stroke", tier: "intellect" },
      { icon: "glukosa-abnormal", tier: "intellect" },
      { icon: "risiko-ascvd", tier: "oracle" },
      {
        tier: "oracle",
      },
      {
        tier: "oracle",
      },
      {
        tier: "oracle",
      },
    ],
  },
};

// Hanya strukturnya. Judul, keterangan, dan label tombolnya ada di berkas
// bahasa pada kunci `parameters.footer.*`.
export const footerInfo = {
  icon: "microscope",
  buttonLink: "#",
};

// Daftar kartu parameter: metadata kategori digabung dengan isi parameternya.
export const parameterCategories = tabs.map((tab, index) => ({
  ...tab,
  order: String(index + 1).padStart(2, "0"),
  parameters: tabContents[tab.id]?.parameters ?? [],
  total: tabContents[tab.id]?.parameters.length ?? 0,
}));
