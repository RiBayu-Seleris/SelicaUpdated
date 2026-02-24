// src/data/CareersListData.js
import { generateSlug } from "@/components/Helper/slugUtil.js";

export const division_list = [
  { id: 1, name: "Product" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Marketing" },
];

export const location_list = [
  { id: 1, name: "Jakarta" },
  { id: 2, name: "Bandung" },
  { id: 3, name: "Surabaya" },
];

export const job_type_list = [
  { id: 1, name: "Experienced" },
  { id: 2, name: "Internship" },
  { id: 3, name: "Part-time" },
];

export const employment_level_list = [
  { id: 1, name: "Intern" },
  { id: 2, name: "Junior" },
  { id: 3, name: "Middle" },
  { id: 4, name: "Senior" },
  { id: 5, name: "Lead" },
];

// ==== Daftar Lowongan ====
export const jobPosts = [
  {
    id: 1,
    title: "Technical Writer",
    division_category: 1,
    location_category: 1,
    job_type_category: 1,
    employment_level: 3,
    salary_status: true,
    salary_min: 8000000,
    salary_max: 15000000,
    salary_currency: "IDR",
    skills: ["Documentation", "Writing", "Research"],
    description:
      "Menulis dan mengelola dokumentasi produk secara komprehensif, termasuk panduan pengguna, dokumentasi API, release notes, dan konten teknis lainnya. Technical Writer berperan memastikan setiap dokumen mudah dipahami, akurat, dan selaras dengan perkembangan fitur produk. Anda akan berkolaborasi dengan tim produk, engineer, dan QA untuk menyusun konten yang informatif serta menjaga konsistensi gaya penulisan.",
    responsibilities:
      "Menyusun dokumentasi internal dan eksternal, membuat panduan implementasi, memperbarui dokumen sesuai perubahan produk, melakukan riset untuk memahami fitur secara mendalam, dan memastikan dokumentasi selalu up to date. Mengatur struktur dokumentasi agar mudah diakses, melakukan review konten, serta menjaga standar penulisan yang konsisten.",
    requirements:
      "Minimal 2 tahun pengalaman sebagai Technical Writer atau posisi serupa. Mampu memahami konsep teknis dengan cepat, memiliki kemampuan menulis yang jelas dan terstruktur, terbiasa menggunakan tools dokumentasi seperti Notion, Confluence, atau GitBook, serta memiliki perhatian tinggi terhadap detail.",
    // benefits: "BPJS, asuransi kesehatan, remote work",
    positions_available: 1,
    experience_years: 2,
    education_level: "S1 Informatika",
    apply_url: null,
    apply_email: "hr@company.com",
    posted_at: "2025-10-29T08:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-10-29T08:00:00Z",
  },

  {
    id: 2,
    title: "Frontend Developer",
    division_category: 2,
    location_category: 1,
    job_type_category: 1,
    employment_level: 3,
    salary_status: false,
    salary_min: 9000000,
    salary_max: 17000000,
    salary_currency: "IDR",
    skills: ["Vue.js", "JavaScript", "CSS"],
    description:
      "Mengembangkan antarmuka pengguna modern yang responsif dan optimal dengan menggunakan teknologi frontend terkini. Peran ini membutuhkan pemahaman mendalam tentang UI/UX, implementasi komponen reusable, serta optimasi performa. Anda akan bekerja erat dengan tim desain dan backend untuk memastikan aplikasi berjalan lancar dan konsisten.",
    responsibilities:
      "Membangun dan memelihara komponen UI, melakukan integrasi API, meningkatkan performa tampilan, mengimplementasikan desain yang diberikan oleh tim UI/UX, menangani issue terkait tampilan, serta mengikuti standar coding yang baik. Berpartisipasi dalam code review dan memberikan masukan teknis.",
    requirements:
      "Minimal 2 tahun pengalaman di frontend development, menguasai JavaScript modern, memahami framework seperti Vue atau React, mampu bekerja dengan REST API, memahami responsivitas dan aksesibilitas UI, serta terbiasa menggunakan Git.",
    benefits: "BPJS, bonus, remote work",
    positions_available: 2,
    experience_years: 2,
    education_level: "S1 Informatika",
    apply_url: null,
    apply_email: "frontend@company.com",
    posted_at: "2025-10-30T08:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-10-30T08:00:00Z",
  },

  {
    id: 3,
    title: "Backend Developer",
    division_category: 2,
    location_category: 2,
    job_type_category: 1,
    employment_level: 3,
    salary_status: true,
    salary_min: 9000000,
    salary_max: 18000000,
    salary_currency: "IDR",
    skills: ["Node.js", "Express", "PostgreSQL"],
    description:
      "Membangun dan memelihara sistem backend yang scalable, aman, dan memiliki performa tinggi. Backend Developer akan bertanggung jawab membuat API, mengelola database, mengimplementasikan struktur arsitektur yang efisien, serta memastikan integrasi dengan layanan lain berjalan tanpa hambatan. Anda juga berperan aktif dalam meningkatkan kualitas sistem.",
    responsibilities:
      "Merancang dan mengembangkan API, mengelola database, melakukan optimasi query, menerapkan standar keamanan, memperbaiki bug sistem, membuat dokumentasi teknis, serta bekerja sama dengan tim frontend dan DevOps dalam integrasi aplikasi.",
    requirements:
      "Minimal 2 tahun pengalaman backend, menguasai Node.js/Express, memahami konsep REST API, berpengalaman dengan PostgreSQL atau database lain, memahami arsitektur microservices, serta memiliki pemahaman dasar DevOps seperti Docker.",
    benefits: "BPJS, tunjangan kesehatan",
    positions_available: 1,
    experience_years: 2,
    education_level: "S1 Teknik Informatika",
    apply_url: null,
    apply_email: "backend@company.com",
    posted_at: "2025-10-31T08:30:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-10-31T08:30:00Z",
  },

  {
    id: 4,
    title: "Mobile Developer",
    division_category: 2,
    location_category: 3,
    job_type_category: 1,
    employment_level: 2,
    salary_status: true,
    salary_min: 6000000,
    salary_max: 12000000,
    salary_currency: "IDR",
    skills: ["Flutter", "Dart", "Firebase"],
    description:
      "Mengembangkan aplikasi mobile berkualitas tinggi dengan performa optimal menggunakan Flutter. Anda akan berpartisipasi mulai dari perancangan fitur, pembangunan UI/UX, hingga deployment aplikasi. Peran ini memerlukan perhatian pada detail, kemampuan debugging, dan pemahaman konsep mobile architecture.",
    responsibilities:
      "Mengembangkan fitur baru, memperbaiki bug aplikasi, membuat UI responsif, mengintegrasikan API, melakukan testing dasar, dan terus meningkatkan stabilitas aplikasi. Bekerja sama dengan tim backend untuk integrasi layanan.",
    requirements:
      "Minimal 1 tahun pengalaman Flutter, memahami state management seperti Provider/Bloc, mampu membuat desain mobile responsif, memahami Firebase, dan terbiasa menggunakan Git.",
    benefits: "BPJS, remote partial",
    positions_available: 2,
    experience_years: 1,
    education_level: "S1 Informatika",
    apply_url: null,
    apply_email: "mobile@company.com",
    posted_at: "2025-11-01T07:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-01T07:00:00Z",
  },

  {
    id: 5,
    title: "UI/UX Designer",
    division_category: 1,
    location_category: 2,
    job_type_category: 1,
    employment_level: 3,
    salary_status: true,
    salary_min: 7000000,
    salary_max: 14000000,
    salary_currency: "IDR",
    skills: ["Figma", "Prototyping", "Wireframing"],
    description:
      "Merancang pengalaman pengguna yang intuitif dan efektif melalui proses riset, wireframing, prototyping, dan pembuatan desain final. Anda akan bekerja erat dengan tim produk, frontend, dan backend untuk memastikan setiap desain dapat diimplementasikan dengan baik tanpa mengurangi kualitas pengalaman pengguna.",
    responsibilities:
      "Membuat wireframe, mockup, user flow, melakukan usability testing, mengembangkan prototipe interaktif, mengidentifikasi masalah UX, serta menyusun design system. Berkolaborasi dengan engineer untuk memastikan hasil implementasi sesuai desain.",
    requirements:
      "Minimal 2 tahun pengalaman sebagai UI/UX Designer, menguasai Figma, memahami prinsip desain, memiliki kemampuan analisis kebutuhan pengguna, menguasai wireframing dan prototyping, serta mampu berkomunikasi dengan baik.",
    benefits: "BPJS, tunjangan makan",
    positions_available: 1,
    experience_years: 2,
    education_level: "S1 Desain Komunikasi Visual",
    apply_url: null,
    apply_email: "design@company.com",
    posted_at: "2025-11-02T09:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-02T09:00:00Z",
  },

  {
    id: 6,
    title: "DevOps Engineer",
    division_category: 2,
    location_category: 1,
    job_type_category: 1,
    employment_level: 4,
    salary_status: true,
    salary_min: 12000000,
    salary_max: 22000000,
    salary_currency: "IDR",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    description:
      "Mengelola infrastruktur, pipeline CI/CD, dan proses automasi untuk memastikan aplikasi dapat dikembangkan, diuji, dan di-deploy dengan efisien. Peran ini membutuhkan pemahaman mendalam tentang cloud infrastructure, observability, serta peningkatan performa dan stabilitas sistem.",
    responsibilities:
      "Mengembangkan dan memelihara pipeline CI/CD, melakukan automasi deployment, memonitor performa sistem, mengelola container menggunakan Docker/Kubernetes, memperbaiki issue terkait server, dan memastikan lingkungan produksi selalu stabil.",
    requirements:
      "Minimal 3 tahun pengalaman DevOps, menguasai Docker/Kubernetes, memahami konsep IaC seperti Terraform, berpengalaman menggunakan CI/CD tools (GitHub Actions, GitLab CI, Jenkins), memahami monitoring tools seperti Prometheus/Grafana, serta terbiasa bekerja dengan cloud provider.",
    benefits: "BPJS, bonus tahunan",
    positions_available: 1,
    experience_years: 3,
    education_level: "S1 Teknik Informatika",
    apply_url: null,
    apply_email: "devops@company.com",
    posted_at: "2025-11-03T10:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-03T10:00:00Z",
  },

  {
    id: 7,
    title: "Quality Assurance Engineer",
    division_category: 2,
    location_category: 1,
    job_type_category: 1,
    employment_level: 2,
    salary_status: true,
    salary_min: 6000000,
    salary_max: 11000000,
    salary_currency: "IDR",
    skills: ["Manual Testing", "Automation", "Cypress"],
    description:
      "Melakukan proses pengujian aplikasi secara menyeluruh untuk memastikan produk berjalan stabil, bebas dari bug kritis, dan siap digunakan pengguna. QA Engineer berperan penting dalam menjaga standar kualitas melalui kombinasi pengujian manual dan automation testing.",
    responsibilities:
      "Membuat dan menjalankan test case, melakukan regression testing, membuat automation script, mendeteksi serta mendokumentasikan bug, berkoordinasi dengan tim developer, serta memastikan setiap perubahan fitur telah diuji dengan benar.",
    requirements:
      "Minimal 1 tahun pengalaman QA, memahami testing flow, mampu membuat test scenario, berpengalaman dengan tools automation seperti Cypress atau Selenium, memahami dasar API testing, dan memiliki perhatian tinggi terhadap detail.",
    benefits: "BPJS, tunjangan performa",
    positions_available: 2,
    experience_years: 1,
    education_level: "S1 Informatika",
    apply_url: null,
    apply_email: "qa@company.com",
    posted_at: "2025-11-04T12:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-04T12:00:00Z",
  },

  {
    id: 8,
    title: "Digital Marketing Specialist",
    division_category: 3,
    location_category: 1,
    job_type_category: 1,
    employment_level: 3,
    salary_status: true,
    salary_min: 7000000,
    salary_max: 13000000,
    salary_currency: "IDR",
    skills: ["SEO", "SEM", "Content Strategy"],
    description:
      "Mengembangkan dan menjalankan strategi pemasaran digital untuk meningkatkan brand awareness dan menghasilkan konversi yang optimal. Anda akan bertanggung jawab merancang konten, mengelola campaign, menganalisis performa, serta mengoptimalkan strategi pemasaran berdasarkan data.",
    responsibilities:
      "Membuat dan mengelola kampanye digital, mengoptimalkan SEO/SEM, menganalisis performa campaign menggunakan tools analitik, membuat konten marketing, bekerja sama dengan tim desain, dan menyusun laporan perkembangan pemasaran.",
    requirements:
      "Minimal 2 tahun pengalaman digital marketing, memahami SEO/SEM, berpengalaman membuat konten, mampu menggunakan tools seperti Google Analytics/Search Console, memahami strategi social media, dan memiliki kemampuan analisis yang baik.",
    benefits: "BPJS, bonus",
    positions_available: 1,
    experience_years: 2,
    education_level: "S1 Marketing",
    apply_url: null,
    apply_email: "marketing@company.com",
    posted_at: "2025-11-05T09:30:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-05T09:30:00Z",
  },

  {
    id: 9,
    title: "Product Manager",
    division_category: 1,
    location_category: 1,
    job_type_category: 1,
    employment_level: 4,
    salary_status: true,
    salary_min: 15000000,
    salary_max: 25000000,
    salary_currency: "IDR",
    skills: ["Product Strategy", "Roadmapping", "Leadership"],
    description:
      "Memimpin proses pengembangan produk mulai dari riset, perencanaan, hingga eksekusi. Product Manager bertanggung jawab menyusun roadmap, mengumpulkan kebutuhan pengguna, menentukan prioritas fitur, dan memastikan produk berkembang sesuai visi perusahaan. Anda akan bekerja lintas tim untuk mencapai hasil terbaik.",
    responsibilities:
      "Menyusun product roadmap, mengumpulkan dan menganalisis kebutuhan pengguna, mengoordinasikan tim lintas divisi, menyusun dokumen produk, melakukan evaluasi fitur, serta mengukur keberhasilan produk melalui data.",
    requirements:
      "Minimal 3 tahun pengalaman product management, memahami siklus pengembangan produk, mampu melakukan analisis kebutuhan, terbiasa dengan riset pasar, memahami dasar UI/UX, memiliki kemampuan komunikasi dan kepemimpinan yang baik.",
    benefits: "BPJS, asuransi lengkap, bonus",
    positions_available: 1,
    experience_years: 3,
    education_level: "S1 Manajemen / Informatika",
    apply_url: null,
    apply_email: "product@company.com",
    posted_at: "2025-11-06T08:00:00Z",
    is_active: true,
    slug: null,
    meta: null,
    created_at: "2025-11-06T08:00:00Z",
  },
].map((post) => ({
  ...post,
  slug: `${generateSlug(post.title)}-${post.id}`,
}));
