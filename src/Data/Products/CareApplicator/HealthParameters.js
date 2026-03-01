export const tabs = [
  { id: "cardiovascular-1", label: "Kardiovaskular" },
  { id: "metabolic-1", label: "Metabolik" },
  { id: "metabolic-2", label: "Nutrisi & Organ" },
  { id: "cardiovascular-2", label: "Stres & Mental" },
  { id: "metabolic-3", label: "Fisik & Vitalitas" },
  { id: "advanced", label: "Advanced AI" },
];

export const tabContents = {
  "cardiovascular-1": {
    parameters: [
      { title: "Darah Sistolik", description: "Puncak tekanan jantung." },
      { title: "Darah Diastolik", description: "Jantung saat istirahat." },
      { title: "Detak Jantung", description: "Denyut per menit." },
      { title: "Variabilitas Jantung", description: "Interval antar detak." },
      { title: "Saturasi Oksigen", description: "Oksigen dalam darah." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Kardiovaskular" },
  },
  "metabolic-1": {
    parameters: [
      { title: "Gula Darah", description: "Estimasi glukosa darah." },
      { title: "Kolesterol Total", description: "Kadar lemak darah." },
      { title: "Kadar Trigliserida", description: "Lemak dalam darah." },
      { title: "Massa Tubuh", description: "Rasio berat tinggi." },
      { title: "Metabolisme Basal", description: "Kalori saat istirahat." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Metabolik" },
  },
  "metabolic-2": {
    parameters: [
      { title: "Fungsi Hati", description: "Kesehatan organ hati." },
      { title: "Fungsi Ginjal", description: "Ginjal menyaring racun." },
      { title: "Kadar Hemoglobin", description: "Pembawa oksigen darah." },
      { title: "Vitamin D", description: "Kecukupan vitamin D." },
      { title: "Asam Urat", description: "Kadar asam urat." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Nutrisi & Organ" },
  },
  "cardiovascular-2": {
    parameters: [
      { title: "Tingkat Stres", description: "Respons stres tubuh." },
      { title: "Indeks Kelelahan", description: "Kelelahan fisik mental." },
      { title: "Kualitas Tidur", description: "Pemulihan saat tidur." },
      { title: "Saraf Otonom", description: "Saraf simpatik parasimpatik." },
      { title: "Indeks Relaksasi", description: "Kondisi tubuh tenang." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Stres & Mental" },
  },
  "metabolic-3": {
    parameters: [
      { title: "Lemak Tubuh", description: "Proporsi lemak tubuh." },
      { title: "Massa Otot", description: "Total massa otot." },
      { title: "Usia Biologis", description: "Usia fisiologis tubuh." },
      { title: "Kapasitas VO2", description: "Kapasitas oksigen maksimal." },
      { title: "Indeks Vitalitas", description: "Energi tubuh keseluruhan." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Fisik & Vitalitas" },
  },
  advanced: {
    parameters: [
      { title: "Risiko Jantung", description: "Risiko kardiovaskular AI." },
      { title: "Risiko Diabetes", description: "Risiko gula darah." },
      { title: "Risiko Hipertensi", description: "Risiko tekanan tinggi." },
      { title: "Skor Kesehatan", description: "Skor holistik tubuh." },
      { title: "Rekomendasi AI", description: "Saran personal AI." },
    ],
    highlight: { count: 5, prefix: "Parameter", label: "Advanced AI" },
  },
};

export const footerInfo = {
  icon: "microscope",
  title: "Total 30 Parameter Kesehatan",
  description: "Semua laporan disajikan dalam format yang mudah dimengerti (Bahasa Indonesia).",
  buttonLabel: "Lihat Contoh Laporan PDF",
  buttonLink: "#",
};
