// Sumber: Parameters.pdf — 62 parameter, 7 kategori.
// `tier` = paket terendah yang sudah mencakup parameter tsb (insight ⊂ intellect ⊂ oracle).
export const tabs = [
  { id: "vital", label: "Vital Signs" },
  { id: "fisik", label: "Fisik" },
  { id: "fisiologis", label: "Fisiologis" },
  { id: "mental", label: "Mental" },
  { id: "darah", label: "Darah" },
  { id: "komposisi", label: "Komposisi" },
  { id: "risiko", label: "Risiko" },
];

export const tabContents = {
  vital: {
    parameters: [
      { title: "Detak Jantung", description: "Denyut jantung per menit.", tier: "insight" },
      {
        title: "Saturasi Oksigen (SpO2)",
        description: "Kadar oksigen dalam darah.",
        tier: "insight",
      },
      {
        title: "Tekanan Darah Sistolik",
        description: "Tekanan saat jantung memompa.",
        tier: "insight",
      },
      {
        title: "Tekanan Darah Diastolik",
        description: "Tekanan saat jantung relaksasi.",
        tier: "insight",
      },
      {
        title: "Cardiac Output",
        description: "Volume darah dipompa per menit.",
        tier: "intellect",
      },
      {
        title: "Tekanan Nadi (Pulse Pressure)",
        description: "Selisih tekanan sistolik & diastolik.",
        tier: "oracle",
      },
    ],
    highlight: { count: 6, prefix: "Parameter", label: "Vital Signs" },
  },

  fisik: {
    parameters: [
      {
        title: "Indeks Massa Tubuh (BMI)",
        description: "Rasio berat & tinggi badan.",
        tier: "insight",
      },
      {
        title: "Rasio Lingkar Pinggang / Tinggi",
        description: "Indikator distribusi lemak.",
        tier: "insight",
      },
      { title: "Indeks Bentuk Tubuh", description: "Analisis proporsi tubuh.", tier: "insight" },
      {
        title: "Usia Biologis",
        description: "Estimasi kondisi tubuh saat ini.",
        tier: "insight",
      },
      {
        title: "Usia Kulit",
        description: "Estimasi kondisi kesehatan kulit.",
        tier: "insight",
      },
      {
        title: "Usia Jantung (Heart Age)",
        description: "Estimasi usia fungsional jantung.",
        tier: "intellect",
      },
      {
        title: "Usia Vaskular (Vascular Age)",
        description: "Estimasi usia pembuluh darah.",
        tier: "intellect",
      },
      {
        title: "Body Roundness Index (BRI)",
        description: "Indeks kebulatan bentuk tubuh.",
        tier: "intellect",
      },
      {
        title: "Conicity Index (CI)",
        description: "Indeks distribusi lemak perut.",
        tier: "oracle",
      },
    ],
    highlight: { count: 9, prefix: "Parameter", label: "Fisik" },
  },

  fisiologis: {
    parameters: [
      {
        title: "Variabilitas Detak Jantung (HRV)",
        description: "Variasi interval antar detak.",
        tier: "insight",
      },
      { title: "Tingkat Pernapasan", description: "Jumlah napas per menit.", tier: "insight" },
      {
        title: "Pulse-Respiratory Quotient (PRQ)",
        description: "Rasio denyut & pernapasan.",
        tier: "insight",
      },
      {
        title: "HRV – VLF Power",
        description: "Daya HRV frekuensi sangat rendah.",
        tier: "intellect",
      },
      { title: "HRV – LF Power", description: "Daya HRV frekuensi rendah.", tier: "oracle" },
      { title: "HRV – HF Power", description: "Daya HRV frekuensi tinggi.", tier: "oracle" },
      { title: "HRV – SD2", description: "Variabilitas detak jangka panjang.", tier: "oracle" },
      {
        title: "HRV – S (Poincaré Area)",
        description: "Luas sebaran plot Poincaré.",
        tier: "oracle",
      },
    ],
    highlight: { count: 8, prefix: "Parameter", label: "Fisiologis" },
  },

  mental: {
    parameters: [
      {
        title: "Tingkat Stres",
        description: "Indikator kondisi stres fisiologis.",
        tier: "insight",
      },
      {
        title: "Aktivitas Parasimpatik",
        description: "Aktivitas saraf pemulihan tubuh.",
        tier: "insight",
      },
      {
        title: "Aktivitas Simpatik",
        description: "Aktivitas saraf saat tubuh siaga.",
        tier: "insight",
      },
      {
        title: "HRV – RMSSD",
        description: "Indikator variasi detak jangka pendek.",
        tier: "intellect",
      },
      {
        title: "HRV – PNN50",
        description: "Persentase interval selisih > 50 ms.",
        tier: "intellect",
      },
      { title: "HRV – Mean RR", description: "Rata-rata interval antar detak.", tier: "oracle" },
      { title: "HRV – CV RR", description: "Koefisien variasi interval detak.", tier: "oracle" },
      { title: "HRV – SDSD", description: "Simpangan selisih antar interval.", tier: "oracle" },
      {
        title: "HRV – LF/HF Ratio",
        description: "Keseimbangan saraf simpatik & parasimpatik.",
        tier: "oracle",
      },
      { title: "HRV – SD1", description: "Variabilitas detak jangka pendek.", tier: "oracle" },
    ],
    highlight: { count: 10, prefix: "Parameter", label: "Mental" },
  },

  darah: {
    parameters: [
      { title: "Glukosa Darah", description: "Kadar gula dalam darah.", tier: "insight" },
      { title: "Kolesterol Total", description: "Total kolesterol tubuh.", tier: "insight" },
      { title: "Hemoglobin", description: "Protein pembawa oksigen darah.", tier: "insight" },
      { title: "Asam Urat", description: "Kadar asam urat dalam darah.", tier: "intellect" },
      {
        title: "Hemoglobin Terglikasi (HbA1c)",
        description: "Rata-rata gula darah jangka panjang.",
        tier: "intellect",
      },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Darah" },
  },

  komposisi: {
    parameters: [
      { title: "Tingkat Otot", description: "Persentase massa otot.", tier: "insight" },
      { title: "Rasio Lemak Tubuh", description: "Persentase lemak total.", tier: "insight" },
      { title: "Persentase Air Tubuh", description: "Kadar cairan tubuh.", tier: "insight" },
      { title: "Massa Tulang", description: "Estimasi berat tulang.", tier: "insight" },
      {
        title: "Basal Metabolic Rate (BMR)",
        description: "Estimasi kebutuhan kalori dasar.",
        tier: "insight",
      },
      { title: "Tingkat Protein", description: "Komposisi protein tubuh.", tier: "insight" },
      {
        title: "Lemak Visceral",
        description: "Lemak di sekitar organ vital.",
        tier: "intellect",
      },
      { title: "Lemak Subkutan", description: "Lemak di bawah kulit.", tier: "intellect" },
      { title: "Massa Otot (Kg)", description: "Total berat otot.", tier: "oracle" },
      { title: "Massa Lemak (Kg)", description: "Total berat lemak.", tier: "oracle" },
      { title: "Massa Protein (Kg)", description: "Total berat protein tubuh.", tier: "oracle" },
      {
        title: "TDEE (Total Daily Energy Expenditure)",
        description: "Estimasi total kalori harian.",
        tier: "oracle",
      },
    ],
    highlight: { count: 12, prefix: "Parameter", label: "Komposisi" },
  },

  risiko: {
    parameters: [
      {
        title: "Risiko Hipertensi",
        description: "Potensi tekanan darah tinggi.",
        tier: "insight",
      },
      {
        title: "Risiko Diabetes Tipe 2",
        description: "Potensi gangguan gula darah.",
        tier: "insight",
      },
      {
        title: "Risiko Penyakit Kardiovaskular",
        description: "Potensi gangguan jantung & pembuluh darah.",
        tier: "insight",
      },
      {
        title: "Risiko Hiperkolesterolemia",
        description: "Potensi kolesterol tinggi.",
        tier: "insight",
      },
      {
        title: "Risiko Hipertrigliseridemia",
        description: "Potensi trigliserida tinggi.",
        tier: "insight",
      },
      {
        title: "Risiko Serangan Jantung",
        description: "Analisis potensi gangguan jantung.",
        tier: "intellect",
      },
      {
        title: "Risiko Stroke",
        description: "Analisis potensi gangguan pembuluh otak.",
        tier: "intellect",
      },
      {
        title: "Glukosa Darah Puasa Abnormal",
        description: "Indikator gula darah puasa tidak normal.",
        tier: "intellect",
      },
      {
        title: "Risiko ASCVD",
        description: "Potensi penyakit aterosklerosis kardiovaskular.",
        tier: "oracle",
      },
      {
        title: "Risiko Anemia / Hemoglobin Rendah",
        description: "Potensi kadar hemoglobin rendah.",
        tier: "oracle",
      },
      {
        title: "Risiko Gagal Jantung",
        description: "Potensi penurunan fungsi jantung.",
        tier: "oracle",
      },
      {
        title: "Risiko Perlemakan Hati (Fatty Liver)",
        description: "Potensi penumpukan lemak di hati.",
        tier: "oracle",
      },
    ],
    highlight: { count: 12, prefix: "Parameter", label: "Risiko" },
  },
};

const totalParameters = Object.values(tabContents).reduce(
  (total, tab) => total + tab.parameters.length,
  0,
);

export const footerInfo = {
  icon: "microscope",
  title: `Total ${totalParameters} Parameter Kesehatan`,
  description: "Semua laporan disajikan dalam format yang mudah dimengerti (Bahasa Indonesia).",
  buttonLabel: "Lihat Contoh Laporan PDF",
  buttonLink: "#",
};
