// Features List
export const features = [
  "Total Parameter",
  "Vital Signs",
  "Pemeriksaan Fisik",
  "Pemeriksaan Fisiologis",
  "Pemeriksaan Darah",
  "Komposisi Tubuh",
  "Kesehatan Mental",
  "Analisis Risiko Penyakit",
];

// HEALTH PACKAGE
export const packages = [
  {
    label: "Paket Dasar",
    name: "Essential",
    price: "Rp 300.000",
    priceColor: "text-[#355F7C]",
    highlight: false,
    expanded: false,

    // DESKTOP (TABEL)
    values: [
      "15 Parameter",
      "4 Parameter",
      "3 Parameter",
      null,
      "3 Parameter",
      "3 Parameter Dasar",
      null,
      "2 Kondisi",
    ],

    // MOBILE (CARD)
    mobileValues: [
      "Total Parameter (15 Parameter)",
      "Vital Signs (4 Parameter)",
      "Pemeriksaan Fisik (3 Parameter)",
      "Pemeriksaan Fisiologis (-)",
      "Pemeriksaan Darah (3 Parameter)",
      "Komposisi Tubuh (3 Parameter)",
      "Kesehatan Mental (-)",
      "Analisis Risiko Penyakit (2 Kondisi)",
    ],

    modalValues: [
      {
        title: "Vital Signs",
        values: [
          "Detak Jantung (Heart Rate)",
          "Ketersediaan Oksigen dalam Darah (SpO2)",
          "Tekanan Darah Sistolik",
          "Tekanan Darah Diastolik",
        ],
      },
      {
        title: "Pemeriksaan Fisik",
        values: [
          "Indeks Massa Tubuh (BMI)",
          "Rasio Lingkar Pinggang terhadap Tinggi Badan",
          "Indeks Bentuk Tubuh",
        ],
      },
      {
        title: "Pemeriksaan Darah",
        values: ["Glukosa Darah", "Kolesterol Total", "Hemoglobin"],
      },
      {
        title: "Pemeriksaan Komposisi Tubuh",
        values: [
          "Tingkat Otot",
          "Rasio Lemak Tubuh",
          "Persentase Air dalam Tubuh",
        ],
      },
      {
        title: "Analisis Risiko Penyakit",
        values: ["Risiko Hipertensi", "Risiko Diabetes Tipe 2"],
      },
    ],
  },

  {
    label: "Paling Populer",
    name: "Core",
    price: "Rp 400.000",
    priceColor: "text-[#355F7C]",
    highlight: true,
    expanded: false,

    values: [
      "32 Parameter",
      "5 Parameter",
      "5 Parameter",
      "3 Parameter",
      "5 Parameter",
      "8 Parameter",
      "1 Parameter",
      "5 Kondisi",
    ],

    mobileValues: [
      "Total Parameter (27 Parameter)",
      "Vital Signs (5 Parameter)",
      "Pemeriksaan Fisik (5 Parameter)",
      "Pemeriksaan Fisiologis (3 Parameter)",
      "Pemeriksaan Darah (5 Parameter)",
      "Komposisi Tubuh (8 Parameter)",
      "Kesehatan Mental (1 Parameter)",
      "Analisis Risiko Penyakit (5 Kondisi)",
    ],

    modalValues: [
      {
        title: "Vital Signs",
        values: [
          "Detak Jantung (Heart Rate)",
          "Ketersediaan Oksigen dalam Darah (SpO2)",
          "Tekanan Darah Sistolik",
          "Tekanan Darah Diastolik",
          "Cardiac Output",
        ],
      },
      {
        title: "Pemeriksaan Fisik",
        values: [
          "Indeks Massa Tubuh (BMI)",
          "Rasio Lingkar Pinggang terhadap Tinggi Badan",
          "Indeks Bentuk Tubuh",
          "Usia Biologis",
          "Usia Kulit",
        ],
      },
      {
        title: "Pemeriksaan Fisiologis",
        values: [
          "Variabilitas Detak Jantung (HRV)",
          "Tingkat Pernapasan",
          "Pulse-Respiratory Quotient (PRQ)",
        ],
      },
      {
        title: "Pemeriksaan Darah",
        values: [
          "Glukosa Darah",
          "Kolesterol Total",
          "Hemoglobin",
          "Asam Urat",
          "Hemoglobin Terglikasi (HbA1c)",
        ],
      },
      {
        title: "Pemeriksaan Komposisi Tubuh",
        values: [
          "Tingkat Otot",
          "Rasio Lemak Tubuh",
          "Persentase Air dalam Tubuh",
          "Massa Tulang",
          "Rentang Metabolisme Basal (BMR)",
          "Tingkat Protein",
          "Lemak Visceral",
          "Lemak Subkutan",
        ],
      },
      {
        title: "Kesehatan Mental",
        values: ["Tingkat Stress"],
      },
      {
        title: "Analisis Risiko Penyakit",
        values: [
          "Risiko Hipertensi",
          "Risiko Diabetes Tipe 2",
          "Risiko Penyakit Kardiovaskular",
          "Risiko Hiperkolesterolemia",
          "Risiko Hipertrigliseridemia",
        ],
      },
    ],
  },

  {
    label: "Komprehensif",
    name: "Prime",
    price: "Rp 500.000",
    priceColor: "text-[#355F7C]",
    highlight: false,
    expanded: false,

    values: [
      "39 Parameter",
      "5 Parameter",
      "5 Parameter",
      "3 Parameter",
      "5 Parameter",
      "12 Parameter",
      "1 Parameter",
      "8 Kondisi",
    ],

    mobileValues: [
      "Total Parameter (39 Parameter)",
      "Vital Signs (5 Parameter)",
      "Pemeriksaan Fisik (5 Parameter)",
      "Pemeriksaan Fisiologis (3 Parameter)",
      "Pemeriksaan Darah (5 Parameter)",
      "Komposisi Tubuh (12 Parameter)",
      "Kesehatan Mental (1 Parameter)",
      "Analisis Risiko Penyakit (8 Kondisi)",
    ],

    modalValues: [
      {
        title: "Vital Signs",
        values: [
          "Detak Jantung (Heart Rate)",
          "Ketersediaan Oksigen dalam Darah (SpO2)",
          "Tekanan Darah Sistolik",
          "Tekanan Darah Diastolik",
          "Cardiac Output",
        ],
      },
      {
        title: "Pemeriksaan Fisik",
        values: [
          "Indeks Massa Tubuh (BMI)",
          "Rasio Lingkar Pinggang terhadap Tinggi Badan",
          "Indeks Bentuk Tubuh",
          "Usia Biologis",
          "Usia Kulit",
        ],
      },
      {
        title: "Pemeriksaan Fisiologis",
        values: [
          "Variabilitas Detak Jantung (HRV)",
          "Tingkat Pernapasan",
          "Pulse-Respiratory Quotient (PRQ)",
        ],
      },
      {
        title: "Pemeriksaan Darah",
        values: [
          "Glukosa Darah",
          "Kolesterol Total",
          "Hemoglobin",
          "Asam Urat",
          "Hemoglobin Terglikasi (HbA1c)",
        ],
      },
      {
        title: "Pemeriksaan Komposisi Tubuh",
        values: [
          "Tingkat Otot",
          "Rasio Lemak Tubuh",
          "Persentase Air dalam Tubuh",
          "Massa Tulang",
          "Rentang Metabolisme Basal (BMR)",
          "Tingkat Protein",
          "Lemak Visceral",
          "Lemak Subkutan",
          "Massa Otot (Kg)",
          "Massa Lemak (Kg)",
          "Massa Protein (Kg)",
          "Body Shape Analysis",
        ],
      },
      {
        title: "Kesehatan Mental",
        values: ["Tingkat Stress"],
      },
      {
        title: "Analisis Risiko Penyakit",
        values: [
          "Risiko Hipertensi",
          "Risiko Diabetes Tipe 2",
          "Risiko Penyakit Kardiovaskular",
          "Risiko Hiperkolesterolemia",
          "Risiko Hipertrigliseridemia",
          "Risiko Serangan Jantung",
          "Risiko Stroke",
          "Kadar Glukosa Darah Puasa Abnormal",
        ],
      },
    ],
  },
];
