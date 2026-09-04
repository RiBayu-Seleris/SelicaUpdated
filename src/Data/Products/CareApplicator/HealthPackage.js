const DIRECT_PERCENT = 0.15;
const PASSIVE_PERCENT = 0.1;

const idMap = { 1: "essential", 2: "core", 3: "prime" };
const badgeMap = { 1: null, 2: "Populer", 3: "Terlengkap" };
const badgeMobileMap = { 1: "Dasar", 2: "Populer", 3: "Terlengkap" };

export const payPerScanPackages = {
  status: 200,
  data: [
    {
      id: 1,
      packet_name: "PAKET ESSENTIAL",
      packet_price: 300000,
      packet_description: "",
      benefits: [
        {
          name: "PEMERIKSAAN VITAL SIGNS",
          param: [
            "Detak Jantung (Heart Rate)",
            "Ketersediaan Oksigen dalam Darah (SpO2)",
            "Tekanan Darah Sistolik",
            "Tekanan Darah Diastolik",
            "Cardiac Output",
          ],
        },
        {
          name: "PEMERIKSAAN FISIK",
          param: [
            "Indeks Massa Tubuh (BMI)",
            "Rasio Lingkar Pinggang terhadap Tinggi Badan",
            "Indeks Bentuk Tubuh",
            "Usia Biologis",
            "Usia Kulit",
          ],
        },
        {
          name: "PEMERIKSAAN FISIOLOGIS",
          param: [
            "Variabilitas Detak Jantung (HRV)",
            "Tingkat Pernapasan",
            "Pulse-Respiratory Quotient (PRQ)",
          ],
        },
        {
          name: "PEMERIKSAAN MENTAL",
          param: ["Tingkat Stres"],
        },
        {
          name: "PEMERIKSAAN DARAH",
          param: [
            "Glukosa Darah",
            "Kolesterol Total",
            "Hemoglobin",
            "Asam Urat",
            "Hemoglobin Terglikasi (HbA1c)",
          ],
        },
      ],
      is_active: true,
      is_primary: false,
    },
    {
      id: 2,
      packet_name: "PAKET CORE",
      packet_price: 400000,
      packet_description: "",
      benefits: [
        {
          name: "PEMERIKSAAN VITAL SIGNS",
          param: [
            "Detak Jantung (Heart Rate)",
            "Ketersediaan Oksigen dalam Darah (SpO2)",
            "Tekanan Darah Sistolik",
            "Tekanan Darah Diastolik",
            "Cardiac Output",
          ],
        },
        {
          name: "PEMERIKSAAN FISIK",
          param: [
            "Indeks Massa Tubuh (BMI)",
            "Rasio Lingkar Pinggang terhadap Tinggi Badan",
            "Indeks Bentuk Tubuh",
            "Usia Biologis",
            "Usia Kulit",
          ],
        },
        {
          name: "PEMERIKSAAN FISIOLOGIS",
          param: [
            "Variabilitas Detak Jantung (HRV)",
            "Tingkat Pernapasan",
            "Pulse-Respiratory Quotient (PRQ)",
          ],
        },
        {
          name: "PEMERIKSAAN MENTAL",
          param: ["Tingkat Stres"],
        },
        {
          name: "PEMERIKSAAN DARAH",
          param: [
            "Glukosa Darah",
            "Kolesterol Total",
            "Hemoglobin",
            "Asam Urat",
            "Hemoglobin Terglikasi (HbA1c)",
          ],
        },
        {
          name: "PEMERIKSAAN KOMPOSISI TUBUH",
          param: [
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
          name: "ANALISIS RISIKO PENYAKIT",
          param: [
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
      is_active: true,
      is_primary: false,
    },
    {
      id: 3,
      packet_name: "PAKET PRIME",
      packet_price: 500000,
      packet_description: "",
      benefits: [
        {
          name: "PEMERIKSAAN VITAL SIGNS",
          param: [
            "Detak Jantung (Heart Rate)",
            "Ketersediaan Oksigen dalam Darah (SpO2)",
            "Tekanan Darah Sistolik",
            "Tekanan Darah Diastolik",
            "Cardiac Output",
          ],
        },
        {
          name: "PEMERIKSAAN FISIK",
          param: [
            "Indeks Massa Tubuh (BMI)",
            "Rasio Lingkar Pinggang terhadap Tinggi Badan",
            "Indeks Bentuk Tubuh",
            "Usia Biologis",
            "Usia Kulit",
          ],
        },
        {
          name: "PEMERIKSAAN FISIOLOGIS",
          param: [
            "Variabilitas Detak Jantung (HRV)",
            "Tingkat Pernapasan",
            "Pulse-Respiratory Quotient (PRQ)",
          ],
        },
        {
          name: "PEMERIKSAAN MENTAL",
          param: ["Tingkat Stres"],
        },
        {
          name: "PEMERIKSAAN DARAH",
          param: [
            "Glukosa Darah",
            "Kolesterol Total",
            "Hemoglobin",
            "Asam Urat",
            "Hemoglobin Terglikasi (HbA1c)",
          ],
        },
        {
          name: "PEMERIKSAAN KOMPOSISI TUBUH",
          param: [
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
          name: "ANALISIS RISIKO PENYAKIT",
          param: [
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
      is_active: true,
      is_primary: true,
    },
  ],
  message: "Successfully get data.",
};

// ✅ Export transformed data siap pakai untuk component PaketPemeriksaan
export const packages = payPerScanPackages.data.map((pkg) => ({
  id: idMap[pkg.id],
  label: pkg.packet_name.replace("PAKET ", ""),
  badge: badgeMap[pkg.id],
  badgeMobile: badgeMobileMap[pkg.id],
  price: pkg.packet_price,
  parameterTotal: pkg.benefits.reduce((sum, b) => sum + b.param.length, 0),
  // ✅ Sekarang features adalah array of object { name }
  features: pkg.benefits.map((b) => ({
    name: b.name
      .split(" ")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" "),
  })),
  commission: {
    direct: pkg.packet_price * DIRECT_PERCENT,
    team: pkg.packet_price * PASSIVE_PERCENT,
  },
  modalValues: pkg.benefits.map((b) => ({
    name: b.name,
    values: b.param,
  })),
}));
