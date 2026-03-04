export const tabs = [
  { id: "vital", label: "Vital" },
  { id: "kardio", label: "Kardio" },
  { id: "metabolik", label: "Metabolik" },
  { id: "tubuh", label: "Tubuh" },
  { id: "mental", label: "Mental" },
  { id: "risiko-ai", label: "Risiko AI" },
];

export const tabContents = {
  vital: {
    parameters: [
      { title: "Detak Jantung", description: "Denyut jantung per menit." },
      { title: "Tekanan Darah Sistolik", description: "Tekanan saat jantung memompa." },
      { title: "Tekanan Darah Diastolik", description: "Tekanan saat jantung relaksasi." },
      { title: "Saturasi Oksigen (SpO2)", description: "Kadar oksigen dalam darah." },
      { title: "Tingkat Pernapasan", description: "Jumlah napas per menit." },
      { title: "Cardiac Output", description: "Volume darah dipompa per menit." },
    ],
    highlight: { count: 6, prefix: "Parameter", label: "Vital" },
  },

  kardio: {
    parameters: [
      { title: "Variabilitas Detak Jantung (HRV)", description: "Variasi interval antar detak." },
      { title: "Pulse-Respiratory Quotient (PRQ)", description: "Rasio denyut & pernapasan." },
    ],
    highlight: { count: 2, prefix: "Parameter", label: "Kardio" },
  },

  metabolik: {
    parameters: [
      { title: "Glukosa Darah", description: "Kadar gula dalam darah." },
      {
        title: "Hemoglobin Terglikasi (HbA1c)",
        description: "Rata-rata gula darah jangka panjang.",
      },
      { title: "Kolesterol Total", description: "Total kolesterol tubuh." },
      { title: "Asam Urat", description: "Kadar asam urat dalam darah." },
      { title: "Basal Metabolic Rate (BMR)", description: "Estimasi kebutuhan kalori dasar." },
      { title: "Hemoglobin", description: "Protein pembawa oksigen darah." },
    ],
    highlight: { count: 6, prefix: "Parameter", label: "Metabolik" },
  },

  tubuh: {
    parameters: [
      { title: "Indeks Massa Tubuh (BMI)", description: "Rasio berat & tinggi badan." },
      { title: "Indeks Bentuk Tubuh", description: "Analisis proporsi tubuh." },
      { title: "Rasio Lingkar Pinggang / Tinggi", description: "Indikator distribusi lemak." },
      { title: "Tingkat Otot", description: "Persentase massa otot." },
      { title: "Rasio Lemak Tubuh", description: "Persentase lemak total." },
      { title: "Lemak Visceral", description: "Lemak di sekitar organ vital." },
      { title: "Lemak Subkutan", description: "Lemak di bawah kulit." },
      { title: "Massa Otot (Kg)", description: "Total berat otot." },
      { title: "Massa Lemak (Kg)", description: "Total berat lemak." },
      { title: "Massa Tulang", description: "Estimasi berat tulang." },
      { title: "Body Shape Analysis", description: "Analisis bentuk tubuh menyeluruh." },
      { title: "Persentase Air Tubuh", description: "Kadar cairan tubuh." },
      { title: "Tingkat Protein", description: "Komposisi protein tubuh." },
      { title: "Massa Protein (Kg)", description: "Total berat protein tubuh." },
    ],
    highlight: { count: 14, prefix: "Parameter", label: "Tubuh" },
  },

  mental: {
    parameters: [
      { title: "Tingkat Stres", description: "Indikator kondisi stres fisiologis." },
      { title: "Usia Biologis", description: "Estimasi kondisi tubuh saat ini." },
      { title: "Usia Kulit", description: "Estimasi kondisi kesehatan kulit." },
    ],
    highlight: { count: 3, prefix: "Parameter", label: "Mental" },
  },

  "risiko-ai": {
    parameters: [
      { title: "Risiko Hipertensi", description: "Potensi tekanan darah tinggi." },
      { title: "Risiko Diabetes Tipe 2", description: "Potensi gangguan gula darah." },
      {
        title: "Risiko Penyakit Kardiovaskular",
        description: "Potensi gangguan jantung & pembuluh darah.",
      },
      { title: "Risiko Hiperkolesterolemia", description: "Potensi kolesterol tinggi." },
      { title: "Risiko Hipertrigliseridemia", description: "Potensi trigliserida tinggi." },
      { title: "Risiko Serangan Jantung", description: "Analisis potensi gangguan jantung." },
      { title: "Risiko Stroke", description: "Analisis potensi gangguan pembuluh otak." },
      {
        title: "Glukosa Darah Puasa Abnormal",
        description: "Indikator gula darah puasa tidak normal.",
      },
    ],
    highlight: { count: 8, prefix: "Parameter", label: "Risiko AI" },
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
