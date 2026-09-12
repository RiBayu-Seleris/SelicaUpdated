<script setup>
/**
 * Halaman Selica Partner.
 *
 * ARAH RANCANGANNYA: "PERAMBATAN YANG BERHENTI"
 *
 * Masalah halaman ini bukan menjelaskan komisi. Angkanya sederhana: 15% dari
 * skrining sendiri, 10% dari dua lapis jaringan. Masalahnya kepercayaan —
 * kata "jaringan", "downline", dan "komisi" dalam satu halaman membangunkan
 * kecurigaan yang wajar pada siapa pun yang pernah mendengar skema piramida.
 *
 * Yang membedakan program ini dari skema semacam itu ada pada satu hal:
 * strukturnya BERHENTI di dua lapis. Maka seluruh bahasa visual halaman ini
 * dibangun dari satu gagasan itu — cahaya yang merambat dari satu simpul,
 * melewati dua sambungan, lalu padam di sebuah cincin kecil. Latar hero
 * menjalankannya (lihat MedanJaringan.vue), daftar tarif di hero
 * menampilkannya sebagai baris keempat yang nilainya "—", dan diagram di
 * simulasi membuktikannya: tidak ada lingkaran ketiga.
 *
 * Nada tampilan bagian penjelasannya bersudut tajam dan bergaris rambut,
 * seperti panel alat ukur: tanpa kartu membulat, tanpa bayangan tebal, angka
 * memakai lebar tetap, label kecil memakai huruf mesin tik.
 *
 * SATU BAGIAN SENGAJA KELUAR DARI ATURAN ITU: KALKULATOR KOMISI
 * Bagian 04 memakai rupa kartu terang bersudut 18px, sama persis dengan
 * kalkulator komisi di halaman Care (lihat Care.vue, bagian #komisi). Itu
 * bukan kelalaian. Dua bagian itu alat yang sama untuk pekerjaan yang sama,
 * dan kalau rupanya berbeda, keduanya terbaca seperti dibuat dua tim yang
 * tidak saling bicara. Aturan halaman ini berlaku untuk yang MENJELASKAN;
 * yang MENGHITUNG mengikuti rupa kalkulator yang sudah ada di situs.
 *
 * SEMUA ANGKA DAN KALIMAT TETAP DARI SUMBER YANG SAMA
 * Persentase komisi tetap diambil dari berkas paket kesehatan, dan seluruh
 * kalimat tetap dari berkas bahasa. Tidak ada satu pun angka atau kalimat
 * yang ditulis ulang di berkas ini.
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import MedanJaringan from "@/components/SelicaPartner/MedanJaringan.vue";
import IkonPartner from "@/components/SelicaPartner/IkonPartner.vue";
import JaringanPartner from "@/components/Svg/JaringanPartner.vue";
import GlobeRelasi from "@/components/Svg/GlobeRelasi.vue";
import DashboardPreview from "@/components/SCA/dashboardPreview.vue";
import HowRegister from "@/components/HowRegister.vue";
import ApplicationWorkText from "@/components/ApplicationWorkText.vue";

import { vMuncul } from "@/utils/munculSaatTerlihat";
import { vMagnet } from "@/utils/magnet";
import { pasangKemajuan } from "@/utils/kemajuanGulir";
import { useLocalizedList } from "@/utils/i18nList";
import { formatRupiahSmart } from "@/Helper/numberFormat.js";
import { useAngkaBerjalan } from "@/utils/angkaBerjalan";
import { pasangParallax } from "@/utils/parallax";
import {
  statusLevels,
  principles,
  benefits,
  referralFlows,
  heroFeatures,
  bagiJaringan,
  DIRECT_PERCENT,
  PASSIVE_PERCENT,
} from "@/Data/Products/SelicaPartner/PartnerContent";
import { packages } from "@/Data/Products/CareApplicator/HealthPackage";

const { t } = useI18n();
const LINK_DAFTAR = "https://sca.seleriscare.ai/register";

// Sebagian orang menyetel sistemnya untuk mengurangi animasi. Grafiknya ikut
// menghormati setelan itu: batangnya langsung tampil, tidak tumbuh dari nol.
const kurangiGerak =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ================= ISI HALAMAN ================= */
const status = useLocalizedList("partner.status", statusLevels, ["nama", "ringkas", "detail"]);
const prinsip = useLocalizedList("partner.about.principles", principles, ["judul", "isi"]);
const manfaat = useLocalizedList("partner.benefits.items", benefits, ["judul", "isi"]);

/**
 * Manfaat dibelah dua: yang pertama dan kedua ("daftar gratis" dan "15% per
 * skrining") adalah dua keberatan terbesar calon partner, dan keduanya
 * dijawab di sini. Karena itu keduanya diberi ukuran besar dan barisnya
 * sendiri; sisanya menyusul di bawah sebagai keterangan.
 */
const manfaatUtama = computed(() => manfaat.value.slice(0, 2));
const manfaatLain = computed(() => manfaat.value.slice(2));
const alurReferral = computed(() =>
  referralFlows.map((alur, i) => ({
    ...alur,
    judul: t(i === 0 ? "partner.referral.partnerTitle" : "partner.referral.customerTitle"),
    langkah: alur.langkah.map((_, j) => ({
      judul: t(`partner.referral.flows.${i}.${j}.judul`),
      isi: t(`partner.referral.flows.${i}.${j}.isi`),
    })),
  })),
);

const fiturHero = useLocalizedList("partner.hero.features", heroFeatures, ["judul", "isi"]);

/**
 * Judul hero dibelah di koma pertama menjadi dua baris.
 *
 * KENAPA DI KOMA, BUKAN DI TENGAH KALIMAT
 * Tagline resminya memang dua bagian yang setara — "Skrining mudah, komisi
 * nyata" / "Simple screening, real commission". Komanya adalah engsel
 * kalimat itu. Membelah di sana membuat baris kedua bisa diberi warna
 * sinyal tanpa memutus artinya, dan tetap benar di kedua bahasa tanpa
 * seorang pun perlu menandai titik potongnya di berkas bahasa.
 *
 * Kalau kalimatnya suatu saat diganti dan tidak berkoma, seluruhnya jatuh ke
 * baris pertama dan baris kedua tidak dirender — tidak ada yang rusak.
 */
const belahJudul = computed(() => {
  const utuh = t("partner.hero.headline");
  const koma = utuh.indexOf(",");
  if (koma === -1) return { atas: utuh, bawah: "" };
  return { atas: utuh.slice(0, koma + 1), bawah: utuh.slice(koma + 1).trim() };
});

/* ================= SIMULASI KOMISI ================= */
const daftarHarga = packages.map((p) => p.price);
const harga = ref(daftarHarga[0]);
const sim = reactive({ skriningSendiri: 8, jumlahDownline: 5, skriningPerDownline: 4 });
const kontrolSimulasi = [
  { kunci: "skriningSendiri", label: "simOwn", maks: 40 },
  { kunci: "jumlahDownline", label: "simDownline", maks: 50 },
  // `butuhDownline` menandai kendali yang tidak ada gunanya selama downline
  // masih nol: berapa pun diisi, hasilnya dikalikan nol.
  { kunci: "skriningPerDownline", label: "simPerDownline", maks: 20, butuhDownline: true },
];

/**
 * Apakah kendali ini sedang tidak bisa mengubah apa pun.
 *
 * Tanpa downline, "rata-rata skrining tiap downline" dikalikan nol — digeser
 * ke mana pun angkanya, komisi jaringan tetap nol. Kendali yang bisa disentuh
 * tapi tidak mengubah apa-apa itu menyesatkan: pengunjung menaikkannya,
 * menunggu angkanya bergerak, lalu menyimpulkan kalkulatornya rusak. Lebih
 * jujur dimatikan, dengan satu kalimat yang menyebut apa yang perlu diisi
 * lebih dulu.
 */
const kendaliMati = (kontrol) => Boolean(kontrol.butuhDownline) && sim.jumlahDownline === 0;

const skriningJaringan = computed(() => sim.jumlahDownline * sim.skriningPerDownline);
const komisiLangsung = computed(() => harga.value * DIRECT_PERCENT * sim.skriningSendiri);
const komisiJaringan = computed(() => harga.value * PASSIVE_PERCENT * skriningJaringan.value);
const komisiTotal = computed(() => komisiLangsung.value + komisiJaringan.value);
const tampilLangsung = useAngkaBerjalan(komisiLangsung);
const tampilJaringan = useAngkaBerjalan(komisiJaringan);
const tampilTotal = useAngkaBerjalan(komisiTotal);

/**
 * Nilai SATU skrining untuk tiap tarif, mengikuti paket yang sedang dipilih.
 *
 * Persentase saja sulit dipakai orang untuk membayangkan penghasilan; yang
 * langsung terbayang adalah rupiahnya. Dua angka ini yang tampil di kartu
 * tarif, dan keduanya ikut berubah begitu harga paketnya diganti.
 */
const perSkriningSendiri = computed(() => harga.value * DIRECT_PERCENT);
const perSkriningJaringan = computed(() => harga.value * PASSIVE_PERCENT);

// Pembagian simpul untuk diagram. Diambil dari berkas data supaya angka di
// keterangan dan simpul yang digambar tidak mungkin berbeda.
const jaringan = computed(() => bagiJaringan(sim.jumlahDownline));

const rupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
const persen = (pecahan) => `${Math.round(pecahan * 100)}%`;

/**
 * Mengubah "#0E9A82" jadi "14, 154, 130" supaya bisa dipakai di dalam rgba().
 *
 * Dibutuhkan penanda di rel status: cahaya di sekeliling intinya memakai
 * warna tingkat status itu sendiri dengan kepekatan rendah, dan box-shadow
 * tidak punya cara menurunkan kepekatan warna selain lewat rgba().
 */
const keRgb = (heks) => {
  const n = parseInt(heks.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};
const nol = (angka) => String(angka).padStart(2, "0");

/**
 * Tiga baris tabel tarif. Warnanya sengaja sama dengan warna kartu tarif di
 * simulasi: biru untuk komisi dari tangan sendiri, hijau untuk komisi dari
 * jaringan. Dua layer memakai warna yang sama karena tarifnya memang sama.
 */
const ringkasKomisi = [
  { kunci: "rowDirect", nilai: DIRECT_PERCENT, berCatatan: true, warna: "#2D71DD" },
  { kunci: "rowLayer1", nilai: PASSIVE_PERCENT, berCatatan: false, warna: "#00B171" },
  { kunci: "rowLayer2", nilai: PASSIVE_PERCENT, berCatatan: false, warna: "#00B171" },
];

/**
 * Rumus yang sedang berlaku, ditulis apa adanya di bawah tiap hasil.
 * Kalimatnya sudah ada di berkas bahasa sejak awal tapi belum pernah
 * dipakai. Menampilkannya penting: simulasi yang hanya memuntahkan angka
 * besar minta dipercaya, sedangkan simulasi yang menunjukkan hitungannya
 * bisa diperiksa sendiri oleh pembacanya.
 */
const rumusLangsung = computed(() =>
  t("partner.commission.simFormulaDirect", {
    jumlah: sim.skriningSendiri,
    harga: rupiah(harga.value),
    persen: persen(DIRECT_PERCENT),
  }),
);
const rumusJaringan = computed(() =>
  t("partner.commission.simFormulaNetwork", {
    jumlah: skriningJaringan.value,
    harga: rupiah(harga.value),
    persen: persen(PASSIVE_PERCENT),
  }),
);

/**
 * Menaik-turunkan angka simulasi satu langkah.
 *
 * KENAPA TOMBOL, BUKAN PENGGESER
 * Penggeser bagus untuk mencari-cari nilai, tapi buruk untuk MENYEBUT nilai.
 * Orang yang sudah tahu dirinya sanggup dua belas skrining sebulan harus
 * menggeser sampai angkanya pas — dan di layar sentuh itu hampir selalu
 * meleset. Di sini angkanya bisa diketik langsung, dan tombolnya untuk
 * membetulkan satu-satu. Bentuk ini juga yang dipakai kalkulator di halaman
 * Care, jadi orang yang sudah pernah memakainya tidak perlu belajar lagi.
 */
const ubahAngka = (kontrol, langkah) => {
  const nilai = sim[kontrol.kunci] + langkah;
  sim[kontrol.kunci] = Math.min(Math.max(nilai, 0), kontrol.maks);
};

/**
 * Menjaga angka yang DIKETIK tetap masuk akal.
 *
 * Kolom angka bisa diisi apa saja: kosong, huruf, minus, atau seribu. Tanpa
 * penjaga ini satu ketikan salah membuat seluruh hasil simulasi jadi NaN,
 * dan yang terbaca pengunjung adalah "Rp NaN" — kesalahan yang paling
 * merusak kepercayaan di halaman yang isinya hitungan uang.
 */
const rapikanAngka = (kontrol) => {
  const nilai = Number(sim[kontrol.kunci]);
  sim[kontrol.kunci] = Number.isFinite(nilai)
    ? Math.min(Math.max(Math.round(nilai), 0), kontrol.maks)
    : 0;
};

/* ================= ALUR PENDAFTARAN =================

   Bagian "cara menjadi partner" memakai komponen dan isi yang sama dengan
   bagian <!-- How Register --> di Care.vue. Di sana bagian itu memang sudah
   dikomentari, dan judulnya pun berbunyi "Register Selica Partner" — isinya
   memang milik halaman ini, cuma belum pernah dipindah.

   Gambar dan kalimatnya dibaca dari sumber yang sama persis dengan yang
   dipakai Care.vue (`home.registerFlow.*`), jadi kalau kalimatnya diperbarui
   di berkas bahasa, kedua halaman ikut berubah bersama-sama.
=================================================================== */
const gambarAlurDaftar = [
  new URL("@/assets/Products/images/Care/register-akun2.png", import.meta.url).href,
  new URL("@/assets/Products/images/Care/download-sca2.webp", import.meta.url).href,
  new URL("@/assets/Products/images/Care/login-work.webp", import.meta.url).href,
];

const alurDaftar = computed(() =>
  gambarAlurDaftar.map((gambar, i) => ({
    id: i + 1,
    title: t(`home.registerFlow.${i}.title`),
    description: t(`home.registerFlow.${i}.description`),
    image: gambar,
  })),
);

const langkahAktif = ref(0);
const tampilkanKeterangan = ref(false);
let idAlurDaftar = null;

/* Carousel-nya berputar sendiri: keterangan disembunyikan dulu, langkahnya
   maju, lalu keterangannya muncul lagi — jadi tulisannya tidak terlihat
   berganti mendadak di tengah perpindahan.

   Penghitung waktunya DISIMPAN supaya bisa dihentikan saat halaman
   ditinggalkan. Tanpa itu ia terus berjalan dan menumpuk tiap kali halaman
   ini dibuka lagi. */
const DURASI_SLIDE = 4000;
const DURASI_JUDUL = 500;

onMounted(() => {
  tampilkanKeterangan.value = true;
  idAlurDaftar = setInterval(() => {
    tampilkanKeterangan.value = false;
    langkahAktif.value = (langkahAktif.value + 1) % alurDaftar.value.length;
    setTimeout(() => {
      tampilkanKeterangan.value = true;
    }, DURASI_JUDUL);
  }, DURASI_SLIDE);
});

onBeforeUnmount(() => {
  if (idAlurDaftar) clearInterval(idAlurDaftar);
});

/* ================= GRAFIK PERBANDINGAN =================

   Bentuk dan setelannya mengikuti grafik kalkulator di halaman Care: batang
   bersudut bulat, kisi putus-putus, sumbu tanpa garis tepi. Dua halaman yang
   sama-sama menghitung komisi sebaiknya memakai grafik yang sama rupanya —
   kalau berbeda, keduanya terbaca seperti dibuat dua tim yang tidak saling
   bicara.

   Warnanya diambil dari dua kartu tarif tepat di sebelahnya, jadi batang
   mana milik sumber mana tidak perlu diterangkan legenda.
=================================================================== */
const seriKomisi = computed(() => [
  {
    name: t("partner.commission.simResultTotal"),
    data: [Math.round(komisiLangsung.value), Math.round(komisiJaringan.value)],
  },
]);

const opsiGrafik = computed(() => {
  const singkat = (nilai) => "Rp " + formatRupiahSmart(nilai);
  const kategori = [
    t("partner.commission.simResultDirect"),
    t("partner.commission.simResultNetwork"),
  ];

  return {
    chart: {
      type: "bar",
      height: "100%",
      parentHeightOffset: 0,
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
      animations: { enabled: !kurangiGerak },
    },
    plotOptions: {
      bar: {
        columnWidth: "52%",
        borderRadius: 10,
        // Lengkungnya hanya di UJUNG batang, tidak mengelilinginya.
        // Tanpa ini, batang yang nilainya kecil — misalnya jaringan yang baru
        // empat skrining — lebih pendek daripada diameter lengkungnya sendiri,
        // dan tergambar sebagai kapsul melayang, bukan sebagai batang.
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    // Dengan `distributed`, ApexCharts menganggap tiap batang satu seri dan
    // memunculkan legenda berisi nama kategori yang sudah tertulis di sumbunya.
    legend: { show: false },
    colors: ["#83C5FF", "#4FE3C1"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 2,
      padding: { left: 10, right: 10 },
    },
    xaxis: {
      categories: kategori,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    yaxis: {
      labels: {
        formatter: singkat,
        style: { fontSize: "12px", colors: "#9CA3AF" },
      },
    },
    tooltip: { y: { formatter: (nilai) => rupiah(nilai) } },
    responsive: [
      {
        /* Di layar sempit batangnya DIPUTAR jadi mendatar.
 
           Nama kedua sumber komisi panjang — "Dari skrining Anda" dan "Dari
           jaringan" — dan berdiri di bawah batang tegak, keduanya tidak muat
           bersebelahan: ApexCharts diam-diam menyembunyikan salah satunya,
           jadi ada batang tanpa keterangan. Dimiringkan, namanya jadi punya
           satu baris penuh masing-masing.
 
           Kedua sumbu ditulis ULANG lengkap di sini, tidak cuma ukuran
           hurufnya: ApexCharts mengganti seluruh objek `labels`, bukan
           menggabungkannya, sehingga pemformat rupiah ikut terbuang kalau
           tidak disebut lagi. Itu yang membuat sumbunya sempat menampilkan
           "600000" alih-alih "Rp 600rb". */
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "58%",
              borderRadius: 8,
              borderRadiusApplication: "end",
              distributed: true,
            },
          },
          xaxis: {
            categories: kategori,
            // Jumlah tanda skala dibatasi jadi tiga label saja. Setelan
            // bawaannya memasang tujuh sepanjang sumbu, dan sesudah nama
            // kategori mengambil bagian kiri, sisa lebarnya cuma sekitar
            // seratus delapan puluh piksel — ketujuhnya bertumpuk jadi satu
            // baris yang tak terbaca.
            tickAmount: 2,
            labels: {
              formatter: singkat,
              style: { fontSize: "10px", colors: "#9CA3AF" },
            },
          },
          yaxis: {
            labels: {
              formatter: (nilai) => nilai,
              style: { fontSize: "10px", colors: "#6B7280" },
            },
          },
        },
      },
    ],
  };
});

/* ================= GERAK YANG MENGIKUTI GULIRAN ================= */
const relStatus = ref(null);
pasangKemajuan(relStatus);
pasangParallax();

/* ================= NAVIGASI ================= */
const keBagian = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
</script>

<template>
  <div class="partner relative w-full bg-[#FFFFFF]">
    <!-- ============================================================
         01 — HERO

         Susunannya dua kolom: argumennya di kiri, angkanya di kanan.
         Kartu tarif di kanan dikelilingi tiga cincin orbit yang berputar —
         ada pusat, dan ada yang bergerak mengelilinginya. Bentuk itu yang
         paling dekat dengan isi kartunya: nilai yang berangkat dari satu
         skrining lalu berkeliling di jaringan sekitarnya.
    ============================================================ -->
    <section
      id="sinyal"
      class="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#FFFFFF]"
    >
      <MedanJaringan warna="#14B89B" :jarak-simpul="104" :kepekatan="1.6" />

      <!-- Dua kabut: satu di belakang judul, satu di belakang kartu. Yang
           kanan tertinggal sedikit saat halaman digulir, dan itulah yang
           membuat latar terasa berada jauh di belakang tulisannya. -->
      <div
        class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(105%_70%_at_8%_-10%,rgba(20,184,155,0.10),transparent_58%)]"
      />
      <div
        class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(46%_46%_at_76%_46%,rgba(20,184,155,0.10),transparent_70%)]"
        :style="{ transform: 'translate3d(0, calc(var(--gulir, 0px) * 0.18), 0)' }"
      />

      <div
        class="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-8 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28 lg:px-16 xls:px-32"
      >
        <div
          class="grid flex-1 items-center gap-y-16 py-4 md:gap-y-20 md:py-8 lg:grid-cols-12 lg:gap-x-16"
        >
          <!-- ---------- KIRI: ARGUMENNYA ---------- -->
          <div class="lg:col-span-7">
            <p v-muncul class="pil">
              <span class="ubin ubin-kecil"><IkonPartner nama="orang" class="h-4 w-4" /></span>
              <span class="label !text-[#0E7F6C]">{{ $t("partner.hero.eyebrow") }}</span>
            </p>

            <h1
              class="mt-8 text-[clamp(2.5rem,5.9vw,4.6rem)] font-bold leading-[1.03] tracking-[-0.035em]"
            >
              <span class="topeng-baris">
                <span v-muncul class="block text-[#0E3B4D]">{{ belahJudul.atas }}</span>
              </span>

              <!-- Baris kedua diberi warna sinyal dan sapuan cahaya di
                   bawahnya. Sapuannya di luar topeng, bukan di dalam:
                   topeng memotong apa pun yang lewat batas barisnya, dan
                   sapuan ini memang harus keluar dari batas itu. -->
              <span v-if="belahJudul.bawah" class="relative inline-block">
                <span class="topeng-baris">
                  <span v-muncul="110" class="block text-[#0E9A82]">{{ belahJudul.bawah }}</span>
                </span>
                <svg
                  class="sapuan"
                  viewBox="0 0 300 22"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="sapuanWarna" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#14B89B" stop-opacity="0" />
                      <stop offset="28%" stop-color="#14B89B" stop-opacity="0.9" />
                      <stop offset="72%" stop-color="#0E9A82" />
                      <stop offset="100%" stop-color="#0E9A82" stop-opacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M3 17C58 5 168 3 297 11"
                    stroke="url(#sapuanWarna)"
                    stroke-width="9"
                    stroke-linecap="round"
                    opacity="0.22"
                  />
                  <path
                    d="M3 17C58 5 168 3 297 11"
                    stroke="url(#sapuanWarna)"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p v-muncul="320" class="tubuh mt-8 max-w-[48ch] text-[15px] md:text-[17px]">
              {{ $t("partner.hero.sub") }}
            </p>

            <div
              v-muncul="400"
              class="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            >
              <a
                v-magnet="12"
                :href="LINK_DAFTAR"
                target="_blank"
                rel="noopener noreferrer"
                class="tombol tombol-utama"
              >
                <span class="isi-tombol">
                  <span>{{ $t("partner.hero.ctaPrimary") }}</span>
                  <!-- <IkonPartner nama="panah" class="panah h-[18px] w-[18px]" /> -->
                </span>
                <span class="lencana"><IkonPartner nama="panah" class="h-4 w-4" /></span>
              </a>

              <button type="button" class="tombol tombol-kedua" @click="keBagian('cara-kerja')">
                <span>{{ $t("partner.hero.ctaSecondary") }}</span>
                <span class="lencana"><IkonPartner nama="putar" class="h-4 w-4" /></span>
              </button>
            </div>

            <ul class="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-3 md:mt-14">
              <li
                v-for="(f, i) in fiturHero"
                :key="i"
                v-muncul="480 + i * 80"
                class="flex items-start gap-x-3.5"
              >
                <span class="ubin"><IkonPartner :nama="f.ikon" class="h-5 w-5" /></span>
                <span class="min-w-0">
                  <span class="block text-[15px] font-semibold leading-snug text-[#0E3B4D]">
                    {{ f.judul }}
                  </span>
                  <span class="tubuh mt-1 block text-[13px]">{{ f.isi }}</span>
                </span>
              </li>
            </ul>
          </div>

          <!-- ---------- KANAN: ANGKANYA, DIKELILINGI ORBIT ---------- -->
          <div class="relative lg:col-span-5">
            <div v-muncul="200" class="kartu relative z-10">
              <p class="label px-6 pb-5 pt-6 md:px-8 md:pt-7">
                {{ $t("partner.commission.heading") }}
              </p>

              <dl class="px-3 md:px-4">
                <div
                  v-for="(k, i) in ringkasKomisi"
                  :key="k.kunci"
                  class="baris-tarif"
                  :class="[i === 0 && 'sorot', i === 2 && 'garis border-t']"
                >
                  <dt
                    class="order-2 min-w-0 text-[14px] leading-snug text-[#3F5C6B] md:text-[15px]"
                  >
                    {{ $t(`partner.commission.${k.kunci}`) }}
                    <span v-if="k.berCatatan" class="mono mt-1 block text-[12px] text-[#557782]">
                      {{ $t("partner.commission.perTransaction") }}
                    </span>
                  </dt>
                  <dd
                    class="order-1 w-[82px] shrink-0 whitespace-nowrap text-[32px] font-bold leading-none tabular-nums text-[#0E9A82] md:w-[96px] md:text-[38px]"
                  >
                    {{ persen(k.nilai) }}
                  </dd>
                </div>
              </dl>

              <!-- Batas jaringannya, diberi tempat sendiri di kaki kartu.
                   Tiga baris di atas menjelaskan berapa yang didapat; baris
                   ini menjelaskan sampai mana — dan justru itu yang paling
                   sering ditanyakan orang. -->
              <div class="garis mx-6 border-t md:mx-8" />
              <div class="flex items-start gap-x-4 px-6 py-6 md:px-8 md:py-7">
                <span class="ubin"><IkonPartner nama="lapis" class="h-5 w-5" /></span>
                <div class="min-w-0">
                  <p class="text-[16px] font-semibold text-[#0E3B4D]">
                    {{ $t("partner.about.principles.3.judul") }}
                  </p>
                  <p class="tubuh mt-1.5 text-[13px] md:text-[14px]">
                    {{ $t("partner.about.principles.3.isi") }}
                  </p>
                </div>
              </div>

              <div class="garis mx-6 border-t md:mx-8" />
              <!-- Jenjang statusnya, seukuran keterangan kaki: bukan untuk
                   dibaca lengkap di sini — bagian 03 yang menjelaskannya —
                   melainkan supaya sejak layar pertama sudah terlihat bahwa
                   program ini punya arah, bukan cuma tarif. -->
              <ol class="flex flex-wrap items-center gap-x-7 gap-y-2 px-6 py-5 md:px-8">
                <li v-for="(s, i) in status" :key="i" class="flex items-center gap-x-2.5">
                  <span
                    class="h-[6px] w-[6px] shrink-0"
                    :style="{ backgroundColor: s.warna }"
                    aria-hidden="true"
                  />
                  <span
                    class="mono text-[10px] uppercase tracking-[0.16em]"
                    :style="{ color: s.warna }"
                  >
                    {{ s.nama }}
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="isyarat-gulir mx-auto flex flex-col items-center gap-y-2.5 pb-2"
          :aria-label="$t('partner.hero.ctaSecondary')"
          @click="keBagian('cara-kerja')"
        >
          <span class="mono text-[10px] tracking-[0.28em] text-[#557782]">SCROLL</span>
          <IkonPartner nama="tetikus" class="h-7 w-7 text-[#0E9A82]/55" />
        </button>
      </div>
    </section>

    <!-- ============================================================
         02 — APA ITU PROGRAMNYA
         Judulnya menempel di layar sementara kelima prinsipnya lewat satu
         per satu. Yang terbaca: satu pokok bahasan dengan lima bukti, bukan
         enam blok terpisah.
    ============================================================ -->
    <section id="cara-kerja" class="garis relative w-full border-t bg-[#FFFFFF]">
      <div class="mx-auto max-w-[1440px] px-8 py-24 md:px-12 md:py-32 lg:px-16 xls:px-32">
        <div class="grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div class="lg:col-span-5">
            <div class="lg:sticky lg:top-36">
              <h2 v-muncul class="judul">{{ $t("partner.about.heading") }}</h2>
              <p v-muncul="120" class="tubuh mt-7 max-w-[44ch] text-[15px] md:text-[16px]">
                {{ $t("partner.about.intro") }}
              </p>
            </div>
          </div>

          <div class="lg:col-span-7">
            <p v-muncul class="label !text-[#0E9A82]">
              {{ $t("partner.about.principlesHeading") }}
            </p>
            <ul class="garis mt-8 border-t">
              <li
                v-for="(p, i) in prinsip"
                :key="i"
                v-muncul="i * 70"
                class="baris garis grid grid-cols-[2.6rem_1fr] items-start gap-x-4 border-b py-6 md:grid-cols-[4rem_1fr] md:gap-x-6 md:py-7"
              >
                <span class="mono indeks pt-0.5 text-[12px] tabular-nums">{{ nol(i + 1) }}</span>
                <div>
                  <p class="judul-kecil">{{ p.judul }}</p>
                  <p class="tubuh mt-2 max-w-[52ch] text-[14px] md:text-[15px]">{{ p.isi }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         03 — TIGA TINGKAT STATUS
         Satu-satunya daftar di halaman ini yang benar-benar berurutan, jadi
         satu-satunya yang digambar sebagai perjalanan: relnya terisi
         mengikuti guliran, dan tiap tingkat terkunci di tempatnya.
    ============================================================ -->
    <section id="status" ref="relStatus" class="garis relative w-full border-t bg-[#F4FBF9]">
      <div class="mx-auto max-w-[1440px] px-8 py-24 md:px-12 md:py-32 lg:px-16 xls:px-32">
        <h2 v-muncul class="judul max-w-[16ch]">{{ $t("partner.hero.ladderTitle") }}</h2>

        <!-- ---------- TANGGA TAHAPAN ----------

             Tiga status ini BUKAN tiga pilihan yang setara — ia urutan yang
             harus dinaiki: Inactive dulu, lalu Active sesudah self-screening,
             baru Leader sesudah punya downline. Susunan lama menggambarnya
             sebagai tiga kolom sejajar, dan bentuk itu justru mengatakan
             kebalikannya: ketiganya terbaca sebagai pilihan yang bisa diambil
             mana saja.

             Sebagai tangga, urutannya terbaca sebelum satu kata pun dibaca.
             Tiap kartu duduk di anak tangga yang makin tinggi, dan anak
             tangganya saling menempel (tanpa jarak antarkolom) supaya
             siluetnya menerus seperti tangga sungguhan — bukan tiga balok
             yang kebetulan berbeda tinggi.
        -->
        <ol class="tangga mt-12 md:mt-16">
          <li
            v-for="(s, i) in status"
            :key="i"
            v-muncul="i * 110"
            class="anak"
            :style="{
              '--warna': s.warna,
              '--warna-rgb': keRgb(s.warna),
              '--ambang': i / status.length,
              '--tinggi-tapak': `${i * 64}px`,
            }"
          >
            <div class="kartu-putih anak-kartu">
              <div class="flex items-center gap-x-3">
                <span class="anak-penanda" aria-hidden="true">
                  <span class="anak-inti" />
                </span>
                <span class="anak-urut">{{ nol(i + 1) }} / {{ nol(status.length) }}</span>
              </div>

              <p class="anak-nama">{{ s.nama }}</p>
              <p class="anak-ringkas">{{ s.ringkas }}</p>
              <p class="tubuh mt-4 text-[13px] md:text-[14px]">{{ s.detail }}</p>
            </div>

            <!-- Badan anak tangganya. Tingginya bertambah tiap tingkat, dan
                 karena seluruh baris disejajarkan di DASARNYA, yang naik
                 adalah kartunya. -->
            <span class="anak-tapak" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </section>

    <section id="manfaat" class="garis relative isolate w-full overflow-hidden border-t">
      <GlobeRelasi
        position-class="hidden sm:block sm:right-[-55%] sm:top-1/2 sm:h-[170%] sm:w-[110%] sm:-translate-y-1/2"
        warna="#14B89B"
        :opasitas="0.18"
      />

      <div class="relative mx-auto max-w-[1440px] px-8 py-24 md:px-12 md:py-32 lg:px-16 xls:px-32">
        <h2 v-muncul class="judul max-w-[18ch]">{{ $t("partner.benefits.heading") }}</h2>
        <div class="mt-10 grid gap-5 md:mt-14 lg:grid-cols-2">
          <div
            v-for="(b, i) in manfaatUtama"
            :key="i"
            v-muncul="i * 90"
            class="kartu-putih p-6 md:p-9"
          >
            <span class="ubin"><IkonPartner :nama="b.ikon" class="h-5 w-5" /></span>
            <p
              class="mt-6 text-[19px] font-[600] leading-tight tracking-[-0.015em] text-[#0E3B4D] md:text-[22px]"
            >
              {{ b.judul }}
            </p>
            <p class="tubuh mt-2.5 max-w-[42ch] text-[14px] md:text-[15px]">{{ b.isi }}</p>
          </div>
        </div>

        <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(b, i) in manfaatLain" :key="i" v-muncul="i * 70" class="kartu-putih p-6">
            <span class="ubin ubin-kecil">
              <IkonPartner :nama="b.ikon" class="h-[1.05rem] w-[1.05rem]" />
            </span>
            <p class="mt-5 text-[15px] font-[600] leading-snug text-[#0E3B4D] md:text-[16px]">
              {{ b.judul }}
            </p>
            <p class="tubuh mt-2 text-[13px] md:text-[14px]">{{ b.isi }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         04 — KOMISI DAN SIMULASINYA
         Bagian terpenting halaman. Tabel tarifnya tetap ada karena kalimat
         pengantar simulasi merujuknya, tapi bentuknya bacaan alat: dua
         kolom, bergaris rambut, angka rata kanan.
    ============================================================ -->
    <section id="komisi" class="garis relative w-full border-t bg-[#F4FBF9]">
      <div class="mx-auto max-w-[1440px] px-8 py-24 md:px-12 md:py-32 lg:px-16 xls:px-32">
        <div class="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
          <div class="lg:col-span-5">
            <h2 v-muncul class="judul">{{ $t("partner.commission.heading") }}</h2>
          </div>
          <p
            v-muncul="120"
            class="tubuh max-w-[52ch] text-[15px] md:text-[16px] lg:col-span-7 lg:self-end"
          >
            {{ $t("partner.commission.intro") }}
          </p>
        </div>

        <!-- ---------- TABEL TARIF ----------
             Tetap berbentuk tabel karena pengantar simulasi di bawah memang
             merujuknya sebagai tabel. Yang diganti rupanya: dulu tiap baris
             membawa batang panjang sebagai pembanding 15% lawan 10% — padahal
             dua angka sesederhana itu sudah langsung terbandingkan begitu
             dibaca, dan batangnya cuma menambah bidang yang harus dipindai.
        -->
        <div v-muncul class="kartu-putih mt-10 px-5 py-4 md:mt-14 md:px-7 md:py-5">
          <div class="flex items-center justify-between border-b border-[#EFEFEF] pb-3">
            <span class="ket-kartu">{{ $t("partner.commission.colSource") }}</span>
            <span class="ket-kartu">{{ $t("partner.commission.colRate") }}</span>
          </div>
          <div
            v-for="(k, i) in ringkasKomisi"
            :key="k.kunci"
            class="flex items-center justify-between gap-x-6 py-4"
            :class="i < ringkasKomisi.length - 1 ? 'border-b border-[#F4F4F4]' : ''"
          >
            <p class="flex min-w-0 items-center gap-x-3">
              <span
                class="h-2 w-2 shrink-0 rounded-full"
                :style="{ backgroundColor: k.warna }"
                aria-hidden="true"
              />
              <span class="text-[12px] font-[400] text-[#374151] md:text-[14px]">
                {{ $t(`partner.commission.${k.kunci}`) }}
                <span v-if="k.berCatatan" class="text-[10px] text-[#B8B8B8] md:text-[11px]">
                  {{ $t("partner.commission.perTransaction") }}
                </span>
              </span>
            </p>
            <p class="shrink-0 text-[18px] font-[600] md:text-[20px]" :style="{ color: k.warna }">
              {{ persen(k.nilai) }}
            </p>
          </div>
        </div>

        <!-- ---------- KALKULATOR KOMISI ----------

             Rupanya mengikuti kalkulator di halaman Care: alas abu muda,
             sudut membulat, kartu putih bergaris sangat tipis, dua kartu
             tarif berwarna, dan panel hasil biru tua. Dua halaman yang
             sama-sama menghitung komisi harus terasa dari produk yang sama;
             sebelumnya bagian ini memakai bahasa rupa sendiri — garis rambut,
             label huruf kapital renggang, angka berimbuh nol — yang tidak
             dipakai di mana pun lagi di situs ini.
        -->
        <div v-muncul class="mt-8 rounded-[16px] p-4 md:mt-10 md:p-8 xl:p-10">
          <h3 class="text-[16px] font-[600] text-[#374151] lg:text-[24px] xl:text-[26px]">
            {{ $t("partner.commission.simHeading") }}
          </h3>
          <p
            class="mt-2 max-w-[62ch] text-[12px] font-[400] leading-relaxed text-[#6F6F6F] md:text-[14px]"
          >
            {{ $t("partner.commission.simIntro") }}
          </p>

          <div class="mt-6 flex flex-col gap-5 lg:flex-row md:mt-8">
            <!-- ---------- KOLOM KIRI: YANG BISA DIATUR ---------- -->
            <div class="flex w-full flex-col gap-5 lg:w-1/2">
              <!-- Harga paket -->
              <div class="kartu-putih px-5 py-4">
                <p class="ket-kartu">{{ $t("partner.commission.simPackage") }}</p>
                <div
                  class="mt-3 grid grid-cols-3 gap-2 sm:gap-3"
                  role="group"
                  :aria-label="$t('partner.commission.simPackage')"
                >
                  <button
                    v-for="h in daftarHarga"
                    :key="h"
                    type="button"
                    class="tombol-harga"
                    :class="harga === h ? 'terpilih' : ''"
                    :aria-pressed="harga === h"
                    @click="harga = h"
                  >
                    {{ rupiah(h) }}
                  </button>
                </div>
              </div>

              <!-- Dua kartu tarif. Selain persentasenya, keduanya menyebut
                   rupiah per satu skrining — angka yang paling gampang
                   dibayangkan orang, dan yang ikut berubah saat paketnya
                   diganti. -->
              <div class="flex flex-col gap-5 sm:flex-row">
                <div class="kartu-tarif bg-[#83C5FF]">
                  <div class="lapis-putih" />
                  <div class="isi-tarif">
                    <span class="text-[12px] font-[500] text-[#195279] md:text-[14px]">
                      {{ $t("partner.commission.simResultDirect") }}
                    </span>
                    <span class="text-[22px] font-[600] text-[#2D71DD] md:text-[26px]">
                      {{ persen(DIRECT_PERCENT) }}
                    </span>
                    <span class="text-[12px] font-[500] text-[#2D71DD]">
                      {{ rupiah(perSkriningSendiri) }}
                      <span class="font-[400] text-[#2D71DD]/75">
                        {{ $t("partner.commission.perTransaction") }}
                      </span>
                    </span>
                  </div>
                </div>

                <div class="kartu-tarif bg-[#82F9CF]">
                  <div class="lapis-putih" />
                  <div class="isi-tarif">
                    <span class="text-[12px] font-[500] text-[#00B692] md:text-[14px]">
                      {{ $t("partner.commission.simResultNetwork") }}
                    </span>
                    <span class="text-[22px] font-[600] text-[#00B171] md:text-[26px]">
                      {{ persen(PASSIVE_PERCENT) }}
                    </span>
                    <span class="text-[12px] font-[500] text-[#00B171]">
                      {{ rupiah(perSkriningJaringan) }}
                      <span class="font-[400] text-[#00B171]/75">
                        {{ $t("partner.commission.perTransaction") }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Tiga angka yang diatur sendiri oleh pengunjung.

                   Kartu ini yang MENYERAP selisih tinggi antara dua kolom.
                   Kolom kanan lebih tinggi (kartu hasil ditambah grafik),
                   jadi tanpa peredam, kolom kiri berhenti lebih awal dan
                   dasar keduanya menggantung tidak rata. Barisnya dibuat
                   sama-sama membesar, bukan ditumpuk di atas dengan ruang
                   kosong di bawahnya — jadi yang bertambah jarak antarbaris,
                   sesuatu yang terbaca sebagai daftar yang lapang, bukan
                   sebagai kartu yang kepanjangan. -->
              <div class="kartu-putih px-5 py-2 lg:flex lg:flex-1 lg:flex-col">
                <div
                  v-for="(k, i) in kontrolSimulasi"
                  :key="k.kunci"
                  class="flex items-center justify-between gap-x-4 py-3.5 lg:flex-1"
                  :class="i < kontrolSimulasi.length - 1 ? 'border-b border-[#F4F4F4]' : ''"
                >
                  <div class="min-w-0">
                    <label
                      :for="k.kunci"
                      class="block text-[12px] font-[400] leading-snug md:text-[14px]"
                      :class="kendaliMati(k) ? 'text-[#A9A9A9]' : 'text-[#374151]'"
                    >
                      {{ $t(`partner.commission.${k.label}`) }}
                    </label>
                    <p
                      v-if="kendaliMati(k)"
                      class="mt-0.5 text-[11px] text-[#8C8C8C] md:text-[12px]"
                    >
                      {{ $t("partner.commission.simNeedsDownline") }}
                    </p>
                  </div>

                  <div class="stepper" :class="kendaliMati(k) ? 'stepper-mati' : ''">
                    <button
                      type="button"
                      class="kenop"
                      tabindex="-1"
                      aria-hidden="true"
                      :disabled="kendaliMati(k)"
                      @click="ubahAngka(k, -1)"
                    >
                      &minus;
                    </button>
                    <input
                      :id="k.kunci"
                      v-model.number="sim[k.kunci]"
                      type="number"
                      min="0"
                      :max="k.maks"
                      class="angka-stepper"
                      :disabled="kendaliMati(k)"
                      @change="rapikanAngka(k)"
                      @blur="rapikanAngka(k)"
                    />
                    <button
                      type="button"
                      class="kenop"
                      tabindex="-1"
                      aria-hidden="true"
                      :disabled="kendaliMati(k)"
                      @click="ubahAngka(k, 1)"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Baris ini yang menjembatani kendali dengan rumus di panel
                     hasil. Tanpanya, angka "20 skrining jaringan" di rumus
                     muncul entah dari mana: pembaca memasukkan 5 dan 4, lalu
                     harus mengalikannya sendiri di kepala untuk tahu 20 itu
                     hasil apa. Di sini perkaliannya ditulis terang-terangan,
                     tepat di bawah dua angka yang membentuknya. -->
                <div
                  class="flex items-center justify-between gap-x-4 border-t border-[#EFEFEF] py-3.5 lg:flex-1"
                >
                  <span class="min-w-0 text-[12px] font-[500] text-[#374151] md:text-[14px]">
                    {{ $t("partner.commission.simNetworkTotal") }}
                  </span>
                  <span class="flex shrink-0 items-baseline gap-x-2">
                    <span class="text-[11px] text-[#B8B8B8] md:text-[12px]">
                      {{ sim.jumlahDownline }} &times; {{ sim.skriningPerDownline }} =
                    </span>
                    <!-- Angka ini duduk di kolom yang sama persis dengan angka
                         di dalam stepper baris-baris atasnya: lebarnya memakai
                         sifat yang sama, dan di kanannya disisakan ruang
                         selebar tombol "+". Tanpa itu, subtotalnya melenceng
                         ke kanan dan deretan angka di kartu ini jadi tidak
                         punya satu pun garis tegak yang lurus. -->
                    <span class="sel-angka text-[16px] font-[600] text-[#00B171] md:text-[18px]">
                      {{ skriningJaringan }}
                    </span>
                    <span class="sel-kenop" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            <!-- ---------- KOLOM KANAN: HASILNYA ---------- -->
            <div class="flex w-full flex-col gap-5 lg:w-1/2">
              <div
                class="rounded-[18px] border-[0.3px] border-[#CCCCCC] bg-[#114365] px-5 py-5 xl:px-8"
              >
                <p class="text-[12px] font-[400] text-[#5BC8E3] md:text-[14px]">
                  {{ $t("partner.commission.simResultTotal") }}
                </p>
                <p
                  class="mt-1.5 text-[26px] font-[600] tracking-wide text-[#37D5BC] md:text-[32px] xl:text-[36px]"
                  aria-live="polite"
                >
                  {{ rupiah(tampilTotal) }}
                </p>

                <div class="my-4 h-[1px] w-full bg-[#185F8F]" />

                <div class="flex flex-col gap-y-3.5">
                  <!-- Angka rupiahnya dipusatkan terhadap SELURUH blok di
                       kirinya — nama sumber beserta rumusnya — bukan
                       disejajarkan dengan baris pertama saja.

                       Sebelumnya angka dan nama sumber duduk dalam satu baris
                       ber-`items-baseline`, sedangkan rumusnya menggantung
                       sebagai baris kedua di bawahnya. Akibatnya angka itu
                       terbaca rata atas: seolah milik nama sumbernya saja,
                       padahal justru rumus di bawahnya yang menghasilkannya. -->
                  <div class="flex items-center justify-between gap-x-4">
                    <div class="min-w-0">
                      <p class="text-[12px] font-[400] text-[#9CC5DE] md:text-[13px]">
                        {{ $t("partner.commission.simResultDirect") }}
                      </p>
                      <p class="mt-1 text-[11px] leading-relaxed text-[#A9CFE4] md:text-[12px]">
                        {{ rumusLangsung }}
                      </p>
                    </div>
                    <span class="shrink-0 text-[14px] font-[600] text-[#FFFFFF] md:text-[16px]">
                      {{ rupiah(tampilLangsung) }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between gap-x-4">
                    <div class="min-w-0">
                      <p class="text-[12px] font-[400] text-[#9CC5DE] md:text-[13px]">
                        {{ $t("partner.commission.simResultNetwork") }}
                      </p>
                      <p class="mt-1 text-[11px] leading-relaxed text-[#A9CFE4] md:text-[12px]">
                        {{ rumusJaringan }}
                      </p>
                    </div>
                    <span class="shrink-0 text-[14px] font-[600] text-[#FFFFFF] md:text-[16px]">
                      {{ rupiah(tampilJaringan) }}
                    </span>
                  </div>
                </div>

                <div class="my-4 h-[1px] w-full bg-[#185F8F]" />

                <p class="text-[10px] leading-relaxed text-[#8FB9D6] md:text-[11px]">
                  {{ $t("partner.commission.disclaimer") }}
                </p>
              </div>

              <!-- Grafik perbandingan dua sumber komisi -->
              <div
                class="kartu-putih flex h-[196px] items-end justify-end p-2 sm:h-[240px] lg:h-auto lg:min-h-[228px] lg:flex-1"
              >
                <apexchart
                  class="h-full w-full"
                  type="bar"
                  height="100%"
                  :options="opsiGrafik"
                  :series="seriKomisi"
                />
              </div>
            </div>
          </div>

          <!-- ---------- BENTUK JARINGAN ---------- -->
          <div class="kartu-putih mt-5 px-5 py-5 md:px-7 md:py-6">
            <p class="text-[14px] font-[600] text-[#374151] md:text-[16px]">
              {{ $t("partner.network.heading") }}
            </p>

            <div
              class="mt-4 grid items-center gap-x-10 gap-y-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]"
            >
              <JaringanPartner
                :jumlah-downline="sim.jumlahDownline"
                class="mx-auto max-w-[240px] md:mx-0"
              />

              <div class="min-w-0">
                <!-- Dulu di sini ada dua baris lagi, "Layer 1" dan "Layer 2",
                     lengkap dengan angkanya. Angka itu bukan data: keduanya
                     sisa bagi dari batas gambar enam simpul, jadi mengisi
                     lima belas downline memunculkan "Layer 2: 9" — sembilan
                     relasi milik orang ini diakui sebagai relasi orang lain.
                     Yang tersisa sekarang cuma angka yang benar-benar ia
                     masukkan sendiri. -->
                <div
                  class="flex items-center justify-between gap-x-4 border-b border-[#F4F4F4] py-3"
                >
                  <span class="flex min-w-0 items-center gap-x-3">
                    <span class="h-2 w-2 shrink-0 rounded-full bg-[#49D89C]" aria-hidden="true" />
                    <span class="text-[12px] font-[500] text-[#374151] md:text-[14px]">
                      {{ $t("partner.network.layer1") }}
                    </span>
                  </span>
                  <span class="flex shrink-0 items-baseline gap-x-3">
                    <span class="text-[18px] font-[600] text-[#374151] md:text-[20px]">
                      {{ sim.jumlahDownline }}
                    </span>
                    <span class="w-8 text-right text-[11px] text-[#B8B8B8]">
                      {{ persen(PASSIVE_PERCENT) }}
                    </span>
                  </span>
                </div>

                <p v-if="jaringan.sisa" class="mt-2.5 text-[11px] text-[#B8B8B8]">
                  {{ $t("partner.network.more", { jumlah: jaringan.sisa }) }}
                </p>
                <p
                  class="mt-3 max-w-[52ch] text-[12px] leading-relaxed text-[#6F6F6F] md:text-[13px]"
                >
                  {{ $t("partner.network.note") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="hub" class="garis relative w-full overflow-hidden border-t">
      <div
        class="mx-auto max-w-[1440px] px-8 pb-14 pt-24 md:px-12 md:pb-16 md:pt-32 lg:px-16 xls:px-32"
      >
        <h2 v-muncul class="judul max-w-[18ch]">{{ $t("partner.hub.heading") }}</h2>
      </div>

      <div v-muncul class="relative mx-auto max-w-[1440px] pb-16 pt-14 md:pb-20 md:pt-0">
        <DashboardPreview />
      </div>
    </section>

    <!-- ============================================================
         07 — CARA MENDAFTAR

         Memakai komponen dan isi yang sama dengan bagian <!== How Register ==>
         di Care.vue. Di sana bagian itu sudah dikomentari dan tidak aktif,
         padahal judulnya sendiri berbunyi "Register Selica Partner" — isinya
         memang milik halaman ini.

         Susunan lama di sini (lima langkah bernomor pada satu garis tegak
         yang terisi mengikuti guliran) diganti seluruhnya, termasuk rel
         kemajuan tegaknya.
    ============================================================ -->
    <section id="gabung" class="garis relative w-full border-t bg-[#FFFFFF]">
      <div
        class="mx-auto flex max-w-[1440px] flex-col gap-y-10 px-0 py-24 md:py-32 lg:gap-y-20 xl:px-12"
      >
        <div class="flex h-auto w-full px-8 md:px-0">
          <ApplicationWorkText
            :title="$t('partner.join.heading')"
            productname="Selica"
            textcolor="text-[#42C5AF]"
          />
        </div>

        <HowRegister
          :steps="alurDaftar"
          :current-index="langkahAktif"
          :show-description="tampilkanKeterangan"
        />
      </div>
    </section>

    <!-- ============================================================
         08 — KODE REFERRAL
         Dua peran yang saling berhadapan, dipisah satu garis tegak. Itu
         bentuk yang paling jujur untuk isinya: yang satu membagikan, yang
         satu memakai.
    ============================================================ -->
    <!-- ============================================================
         SEMENTARA DISEMBUNYIKAN — CARA PAKAI KODE REFERRAL

         Dimatikan lewat `v-if="false"`, bukan dibungkus komentar: di dalam
         section ini ada beberapa komentar HTML, dan komentar tidak bisa
         disarangkan — pembungkusnya akan tertutup lebih awal di komentar
         pertama dan sisa markup-nya bocor keluar sebagai tag rusak.

         Isinya dibiarkan utuh supaya bisa dinyalakan lagi cukup dengan
         membuang satu baris ini.
    ============================================================ -->
    <section v-if="false" id="referral" class="garis relative w-full border-t bg-[#F4FBF9]">
      <div class="mx-auto max-w-[1440px] px-8 py-24 md:px-12 md:py-32 lg:px-16 xls:px-32">
        <div class="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
          <div class="lg:col-span-5">
            <h2 v-muncul class="judul">{{ $t("partner.referral.heading") }}</h2>
          </div>
          <p
            v-muncul="120"
            class="tubuh max-w-[52ch] text-[15px] md:text-[16px] lg:col-span-7 lg:self-end"
          >
            {{ $t("partner.referral.intro") }}
          </p>
        </div>

        <div class="garis mt-14 grid border-t md:mt-16 lg:grid-cols-2">
          <article
            v-for="(alur, idx) in alurReferral"
            :key="alur.key"
            v-muncul="idx * 120"
            class="garis py-9 lg:py-10"
            :class="
              idx === 1
                ? 'border-t lg:border-l lg:border-t-0 lg:pl-12 xl:pl-16'
                : 'lg:pr-12 xl:pr-16'
            "
          >
            <div class="flex items-center gap-x-3">
              <span
                class="h-1.5 w-1.5 shrink-0"
                :style="{ backgroundColor: alur.warna }"
                aria-hidden="true"
              />
              <h3 class="text-[17px] font-semibold text-[#0E3B4D] md:text-[19px]">
                {{ alur.judul }}
              </h3>
            </div>

            <ol class="mt-7 flex flex-col">
              <li
                v-for="(l, i) in alur.langkah"
                :key="i"
                class="garis grid grid-cols-[3rem_1fr] items-start gap-x-4 border-t py-6 md:grid-cols-[3.8rem_1fr]"
              >
                <!-- Nomornya besar dan nyaris pudar. Bagian 02 dan 07 sudah
                     memakai nomor kecil; di sini bentuknya dibalik supaya
                     bagian ini punya sidik jarinya sendiri. -->
                <span
                  class="mono text-[28px] font-bold leading-none tabular-nums opacity-30 md:text-[34px]"
                  :style="{ color: alur.warna }"
                >
                  {{ nol(i + 1) }}
                </span>
                <div>
                  <h4 class="text-[15px] font-semibold text-[#0E3B4D]">{{ l.judul }}</h4>
                  <p class="tubuh mt-1.5 max-w-[46ch] text-[14px]">{{ l.isi }}</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         09 — AJAKAN PENUTUP
         Jaringannya kembali, lebih redup. Ajakannya rata kiri, bukan di
         tengah: halaman ini dibaca dari kiri sejak awal, dan tidak ada
         alasan menggeser matanya di baris terakhir.
    ============================================================ -->
    <section class="garis relative isolate w-full overflow-hidden border-t bg-[#F4FBF9]">
      <MedanJaringan warna="#0E9A82" :jarak-simpul="88" :kepekatan="1.4" :interaktif="false" />

      <div class="relative mx-auto max-w-[1440px] px-8 py-28 md:px-12 md:py-40 lg:px-16 xls:px-32">
        <p v-muncul class="label !text-[#0E9A82]">{{ $t("partner.hero.eyebrow") }}</p>
        <h2
          v-muncul="60"
          class="mt-6 max-w-[13ch] text-[clamp(2.4rem,7vw,5rem)] font-bold leading-[0.94] tracking-[-0.035em] text-[#0E3B4D]"
        >
          {{ $t("partner.cta.heading") }}
        </h2>
        <p v-muncul="140" class="tubuh mt-6 max-w-[44ch] text-[15px] md:text-[17px]">
          {{ $t("partner.cta.sub") }}
        </p>

        <div v-muncul="200" class="mt-10">
          <a
            v-magnet="14"
            :href="LINK_DAFTAR"
            target="_blank"
            rel="noopener noreferrer"
            class="tombol tombol-utama"
          >
            <span class="isi-tombol">
              <span>{{ $t("partner.cta.button") }}</span>
              <!-- <IkonPartner nama="panah" class="panah h-[18px] w-[18px]" /> -->
            </span>
            <span class="lencana"><IkonPartner nama="panah" class="h-4 w-4" /></span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================================
   SISTEM RUPA

   Warna, huruf, dan bentuk BAGIAN PENJELAS halaman ini dikumpulkan di sini
   supaya tetap satu suara. Tiga hal yang membuatnya terasa seperti panel
   alat ukur, dan bukan seperti halaman pemasaran:

   1. TIDAK ADA SUDUT MEMBULAT. Satu-satunya lengkung di bagian ini adalah
      simpul jaringan dan titik penanda — yang memang harus bulat.
   2. GARIS RAMBUT, BUKAN KOTAK. Pembatas selalu setebal satu piksel dan
      nyaris tidak terlihat; ia memandu mata tanpa memenjarakan isinya.
   3. ANGKA BERLEBAR TETAP. Semua angka memakai tabular-nums, jadi digitnya
      tidak bergeser-geser saat angkanya diubah.

   Kalkulator komisi di bagian 04 TIDAK memakai aturan ini — alasannya
   ditulis di kepala berkas dan di blok "KALKULATOR KOMISI" di bawah.
============================================================ */
.partner {
  --garis: rgba(20, 184, 155, 0.2);
  color-scheme: light;

  /* Lebar tombol dan kolom angka pada pengatur angka di kalkulator komisi.
     Ditulis sekali di sini karena dua tempat memakainya: stepper itu sendiri
     dan baris subtotal di bawahnya. Waktu keduanya memakai angka
     sendiri-sendiri, subtotalnya melenceng beberapa piksel ke kanan — cukup
     untuk membuat deretan angka terlihat miring, dan cukup halus untuk lolos
     dari pemeriksaan. */
  --lebar-kenop: 30px;
  --lebar-angka: 44px;
}
@media (min-width: 768px) {
  .partner {
    --lebar-kenop: 36px;
    --lebar-angka: 52px;
  }
}

/* Satu-satunya sumber warna garis di halaman ini. Dipasang sebagai kelas,
   bukan lewat utilitas Tailwind, supaya nilainya cukup ditulis sekali. */
.garis {
  border-color: var(--garis);
}

.mono {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}

/* Label kecil huruf mesin tik: penanda bagian, satuan, keterangan sumbu.
   Perannya sama dengan cetakan kecil pada alat ukur — memberi konteks tanpa
   pernah bersaing dengan angkanya. */
.label {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #557782;
}

.tubuh {
  color: #4a6472;
  line-height: 1.72;
}

.judul {
  color: #0e3b4d;
  font-weight: 600;
  letter-spacing: -0.022em;
  line-height: 1.06;
  font-size: clamp(1.8rem, 3.7vw, 2.9rem);
}

.judul-kecil {
  color: #0e3b4d;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .label {
    font-size: 11px;
  }
  .judul-kecil {
    font-size: 17px;
  }
}

/* ============================================================
   PANEL DAN LAYAR

   Sudutnya membulat mengikuti kartu di hero. Bidang besar memakai lengkung
   yang lebih besar daripada bidang kecil (28px lawan 18px): kalau semua
   memakai angka yang sama, bidang lebar terlihat terlalu tajam dan bidang
   sempit terlihat terlalu bulat — mata membacanya dari perbandingan lengkung
   terhadap luasnya, bukan dari angkanya.
============================================================ */
/* Bagian dashboard: satu-satunya blok terang di halaman gelap. Isinya
   dipotong di lengkungnya sendiri, karena gambar dashboard-nya memang
   sengaja menembus ke kanan. */
.layar {
  border-radius: 28px;
  border: 1px solid var(--garis);
  background: #f4fbf9;
  overflow: hidden;
}

/* ============================================================
   KALKULATOR KOMISI

   Bagian ini sengaja TIDAK memakai bahasa rupa halaman ini — tanpa garis
   rambut, tanpa label huruf kapital renggang, tanpa sudut tajam. Rupanya
   diambil dari kalkulator komisi di halaman Care, karena keduanya alat yang
   sama untuk pekerjaan yang sama, dan pengunjung yang sudah pernah memakai
   yang satu tidak perlu belajar membaca yang lain.

   Nilai-nilainya disalin apa adanya dari sana: garis tepi 0,3px warna
   #CCCCCC yang nyaris tak terlihat, sudut 18px, alas abu #FAFAFA, dan panel
   hasil biru tua #114365.
============================================================ */
.kartu-putih {
  border-radius: 18px;
  border: 0.3px solid rgba(204, 204, 204, 0.5);
  background: #ffffff;
}

/* Keterangan kecil di dalam kartu. Kalimat biasa, bukan huruf kapital
   renggang: di kartu sekecil ini label yang berteriak selalu menang atas
   angkanya sendiri. */
.ket-kartu {
  font-size: 10px;
  font-weight: 400;
  color: #6f6f6f;
}
@media (min-width: 768px) {
  .ket-kartu {
    font-size: 12px;
  }
}

/* ---------- PILIHAN HARGA PAKET ---------- */
.tombol-harga {
  border-radius: 10px;
  border: 0.5px solid #e2e2e2;
  background: #fbfbfb;
  padding: 0.6rem 0.25rem;
  font-size: 11px;
  font-weight: 500;
  color: #6f6f6f;
  white-space: nowrap;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
}
@media (min-width: 640px) {
  .tombol-harga {
    font-size: 12px;
  }
}
@media (min-width: 768px) {
  .tombol-harga {
    font-size: 13px;
  }
}
.tombol-harga:hover {
  color: #374151;
  border-color: #bdbdbd;
}
/* Yang terpilih memakai hijau merek, sama dengan kartu tarif jaringan di
   bawahnya — bukan warna baru yang cuma dipakai di satu tempat. */
.tombol-harga.terpilih {
  border-color: #49d89c;
  background: rgba(73, 216, 156, 0.12);
  color: #00b171;
  font-weight: 600;
}

/* ---------- KARTU TARIF ---------- */
/* Lapis putih separuh tembus di atas warna dasarnya: itu yang membuat biru
   dan hijaunya turun jadi warna pastel, dan tulisan gelap di atasnya tetap
   terbaca. Cara yang sama dipakai kartu tarif di halaman Care. */
.kartu-tarif {
  position: relative;
  width: 100%;
  min-height: 112px;
  border-radius: 18px;
}
@media (min-width: 768px) {
  .kartu-tarif {
    min-height: 125px;
  }
}
.lapis-putih {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: #ffffff;
  opacity: 0.3;
}
.isi-tarif {
  position: relative;
  display: flex;
  height: 100%;
  min-height: inherit;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.35rem;
  padding: 1.1rem 1.25rem;
}

/* ---------- PENGATUR ANGKA ---------- */
/* Lebar tombol dan kolom angkanya ditulis SEKALI sebagai sifat khusus, lalu
   dipakai bersama oleh stepper dan oleh baris subtotal di bawahnya. Waktu
   keduanya memakai angka sendiri-sendiri, subtotalnya melenceng beberapa
   piksel ke kanan — cukup untuk membuat deretan angka di kartu ini terlihat
   miring, dan cukup halus untuk lolos dari pemeriksaan. */
.stepper {
  display: grid;
  flex: none;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  border-radius: 6px;
  border: 0.5px solid #d9d9d9;
  background: rgba(223, 223, 223, 0.35);
}
.kenop {
  width: var(--lebar-kenop);
  padding: 0.3rem 0;
  font-size: 16px;
  line-height: 1;
  color: #6f6f6f;
  transition: color 0.2s ease;
}
.kenop:hover {
  color: #00b171;
}
.angka-stepper {
  width: var(--lebar-angka);
  border: none;
  background: transparent;
  padding: 0.3rem 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  outline: none;
}
@media (min-width: 768px) {
  .angka-stepper {
    font-size: 16px;
  }
}

/* ---------- KEADAAN MATI ---------- */
/* Dipakai saat downline masih nol, sehingga "rata-rata skrining tiap
   downline" tidak bisa mengubah apa pun. Warnanya diturunkan lewat warna
   tersendiri, bukan lewat `opacity` pada barisnya: kalau seluruh baris
   diredupkan, kalimat petunjuk di bawah labelnya ikut pudar — padahal
   justru kalimat itu yang harus tetap terbaca. */
.stepper-mati {
  border-color: #e8e8e8;
  background: rgba(223, 223, 223, 0.16);
}
.kenop:disabled,
.kenop:disabled:hover {
  color: #c9c9c9;
  cursor: not-allowed;
}
.angka-stepper:disabled {
  color: #c9c9c9;
  cursor: not-allowed;
  /* Safari di iOS memaksakan warnanya sendiri pada kolom yang dimatikan dan
     mengabaikan `color`; hanya sifat ini yang didengarnya. */
  -webkit-text-fill-color: #c9c9c9;
  opacity: 1;
}

/* Dua sel kosong yang menyamakan baris subtotal dengan stepper di atasnya.
   `.sel-kenop` menggantikan tombol "+", `.sel-angka` menampung angkanya di
   kolom yang sama dengan kolom angka stepper. */
.sel-kenop {
  display: block;
  flex: none;
  width: var(--lebar-kenop);
}
.sel-angka {
  flex: none;
  width: var(--lebar-angka);
  text-align: center;
}
/* Panah bawaan kolom angka disembunyikan: lebarnya berbeda-beda tiap
   browser, dan di sebelah tombol tambah-kurang sendiri ia cuma jadi
   pasangan tombol kedua yang membingungkan. */
.angka-stepper::-webkit-outer-spin-button,
.angka-stepper::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.angka-stepper[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* ============================================================
   GERAK MASUK

   Dipicu arahan v-muncul (lihat src/utils/munculSaatTerlihat.js).
   Lengkung geraknya cepat berangkat lalu mengendap panjang — bentuk yang
   terasa seperti benda berbobot yang didorong, bukan seperti kotak yang
   dipindahkan komputer.
============================================================ */
[data-muncul] {
  transition:
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--jeda-muncul, 0ms),
    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--jeda-muncul, 0ms);
}
[data-muncul="belum"] {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
}
[data-muncul="ya"] {
  opacity: 1;
  transform: none;
}

/* Topeng judul: tiap BARIS naik dari balik tepi yang tak terlihat.

   KENAPA PER BARIS, BUKAN PER KATA
   Judulnya cuma dua baris dan keduanya sudah berbeda warna. Memecahnya lagi
   per kata membuat enam gerak kecil yang saling berebut, dan warna baris
   keduanya jadi tidak terbaca sebagai satu kesatuan. Dua gerak berturutan
   lebih tegas.

   Ruang bawahnya dilebihkan supaya ekor huruf seperti g dan y tidak
   terpotong oleh topengnya sendiri. */
.topeng-baris {
  display: block;
  overflow: hidden;
  padding-bottom: 0.14em;
}
.topeng-baris > [data-muncul="belum"] {
  opacity: 1;
  transform: translate3d(0, 105%, 0);
}

/* Sapuan cahaya di bawah baris kedua. Lebarnya mengikuti lebar tulisannya
   sendiri karena induknya inline-block, jadi ia tetap pas di kedua bahasa
   tanpa angka yang disetel tangan. */
.sapuan {
  position: absolute;
  left: 0;
  bottom: -0.05em;
  width: 100%;
  height: 0.34em;
  overflow: visible;
}
.sapuan path {
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  animation: menyapu 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
}
@keyframes menyapu {
  to {
    stroke-dashoffset: 0;
  }
}

/* ============================================================
   BARIS YANG MENJAWAB TUNJUKAN
============================================================ */
.baris {
  position: relative;
}
/* Garis sinyal yang melebar dari kiri saat baris ditunjuk. Menggantikan
   perubahan warna latar: pada latar segelap ini, sorotan latar terlihat
   seperti noda, sedangkan garis terbaca sebagai penanda. */
.baris::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 100%;
  background: #14b89b;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.baris:hover::after {
  transform: scaleX(1);
}
.indeks {
  color: #74939e;
  transition: color 0.4s ease;
}
.baris:hover .indeks {
  color: #14b89b;
}

/* ============================================================
   TOMBOL

   Keduanya pil dengan lencana bulat di ujung kanan. Lencananya bukan hiasan:
   ia yang membuat sasaran klik terbaca sampai ke tepi tombol, dan yang
   memberi tempat bagi ikon untuk bergerak saat ditunjuk.
============================================================ */
.tombol {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* space-between, bukan center: di ponsel tombolnya melebar penuh, dan
     dengan center isinya menggumpal di tengah sementara lencananya ikut
     tertarik masuk. Dengan space-between, tulisannya tetap di kiri dan
     lencananya tetap menempel di tepi kanan pada lebar berapa pun. */
  justify-content: space-between;
  gap: 0.9rem;
  border-radius: 999px;
  padding: 0.6rem 0.6rem 0.6rem 1.9rem;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.005em;
  white-space: nowrap;
  will-change: transform;
}
.tombol > * {
  position: relative;
  z-index: 1;
}
.isi-tombol {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

/* Lencana bulat di ujung kanan. */
.lencana {
  display: inline-flex;
  height: 2.1rem;
  width: 2.1rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.35s ease;
}

.tombol-utama {
  overflow: hidden;
  background: linear-gradient(105deg, #14b89b 0%, #2ac5a8 55%, #0e9a82 100%);
  color: #04231d;
  box-shadow:
    0 14px 34px -14px rgba(20, 184, 155, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
/* Isian terang yang menyapu dari kiri. Sapuan, bukan pergantian warna,
   supaya arahnya sama dengan arah perambatan cahaya di latar. */
.tombol-utama::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, #14b89b 0%, #3fd3ba 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.tombol-utama:hover::before {
  transform: scaleX(1);
}
.tombol-utama .lencana {
  background: rgba(3, 24, 30, 0.16);
}
.tombol-utama:hover .lencana {
  transform: translateX(3px);
  background: rgba(3, 24, 30, 0.28);
}

.tombol-kedua {
  border: 1px solid rgba(20, 184, 155, 0.3);
  background: rgba(20, 184, 155, 0.05);
  color: #0e3b4d;
  transition:
    border-color 0.35s ease,
    background-color 0.35s ease;
}
.tombol-kedua:hover {
  border-color: rgba(20, 184, 155, 0.55);
  background: rgba(20, 184, 155, 0.1);
}
.tombol-kedua .lencana {
  background: rgba(20, 184, 155, 0.14);
  color: #14b89b;
}
.tombol-kedua:hover .lencana {
  transform: scale(1.06);
  background: rgba(20, 184, 155, 0.26);
}

.panah {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.tombol:hover .panah {
  transform: translateX(4px);
}

/* ============================================================
   PIL, UBIN, DAN KARTU
============================================================ */

/* Pil label di atas judul. */
.pil {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(20, 184, 155, 0.24);
  background: rgba(20, 184, 155, 0.06);
  padding: 0.45rem 1.1rem 0.45rem 0.45rem;
}

/* Ubin ikon. Sudutnya membulat, bukan lingkaran penuh: lingkaran membuat
   ikon garis di dalamnya terlihat mengambang, sedangkan kotak membulat
   memberinya bidang untuk berdiri. */
.ubin {
  display: inline-flex;
  height: 2.6rem;
  width: 2.6rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.85rem;
  border: 1px solid rgba(20, 184, 155, 0.24);
  background: rgba(20, 184, 155, 0.08);
  color: #14b89b;
}
.ubin-kecil {
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 999px;
}

/* Kartu struktur komisi.

   TIDAK ADA backdrop-filter DI SINI, DAN ITU DISENGAJA.
   Sebelumnya ada. Elemen ber-backdrop-filter adalah pola yang dikenal
   memicu bug kompositor: ia bisa tergambar di ATAS saudara yang z-index-nya
   lebih tinggi, ketika leluhur bersama mereka bukan stacking context —
   persis susunan di sini, karena kolom pembungkusnya memang sengaja tidak
   dijadikan stacking context supaya lapis depan cincin bisa naik ke atas
   kartu. Kalau bug itu kena, separuh depan cincinnya diam-diam tenggelam ke
   belakang dan tidak ada pesan galat apa pun yang muncul.

   Efeknya sendiri nyaris tidak ada ruginya dibuang: latar di belakang kartu
   sudah nyaris hitam, jadi tidak ada apa pun yang perlu dikaburkan.

   Latarnya tetap sedikit tembus pandang. Pita cincin yang lewat di
   BELAKANG jadi terbaca samar menembus permukaannya — bersama pita yang
   lewat di depan, itulah yang membuat kartu ini terbaca berada di dalam
   cincin, bukan di sebelahnya.

   Bayangannya satu-satunya di halaman ini, dan memang perlu: tanpa itu
   kartu dan cincin menempel jadi satu bidang datar. */
.kartu {
  border-radius: 28px;
  border: 1px solid rgba(20, 184, 155, 0.22);
  background: #ffffff;
  box-shadow:
    0 28px 60px -34px rgba(14, 59, 77, 0.45),
    0 2px 8px -4px rgba(14, 59, 77, 0.06);
}

.baris-tarif {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  border-radius: 18px;
  padding: 1.15rem 0.85rem;
}
@media (min-width: 768px) {
  .baris-tarif {
    padding: 1.3rem 1rem;
  }
}
/* Baris pertama disorot karena itu satu-satunya komisi yang bisa didapat
   TANPA punya jaringan sama sekali — dan itu yang paling perlu dilihat
   orang yang baru mempertimbangkan. */
.sorot {
  background: rgba(20, 184, 155, 0.09);
  box-shadow: inset 0 0 0 1px rgba(20, 184, 155, 0.18);
}

/* ============================================================
   ISYARAT DAN DENYUT
============================================================ */
/* Isyarat gulir di kaki hero. Roda tetikusnya yang bergerak (lihat
   IkonPartner.vue); di sini cukup dinaikkan sedikit saat ditunjuk supaya
   terasa bisa ditekan — dan memang bisa. */
.isyarat-gulir {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.isyarat-gulir:hover {
  transform: translateY(3px);
}

/* ============================================================
   KEMAJUAN YANG MENGIKUTI GULIRAN

   Angkanya ditulis ke elemen sebagai `--maju` oleh pasangKemajuan(), lalu
   dibaca di sini. Karena CSS yang membacanya, menggulir halaman tidak
   membuat satu komponen Vue pun digambar ulang.
============================================================ */
/* ============================================================
   TANGGA TAHAPAN

   Tiga status partner adalah urutan yang dinaiki, bukan tiga pilihan yang
   setara. Bentuk tangga mengatakan itu sebelum satu kata pun dibaca.

   Anak tangganya SALING MENEMPEL — tidak ada jarak antarkolom — supaya
   siluetnya menerus seperti tangga sungguhan. Jarak antarkartu diberikan
   lewat margin kartunya sendiri, bukan lewat celah kolom, justru supaya
   badan tangganya tetap utuh.
============================================================ */
.tangga {
  display: grid;
  gap: 1.5rem 0;
}
@media (min-width: 1024px) {
  .tangga {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    /* Disejajarkan di DASARNYA. Karena tiap anak tangga punya tinggi
       berbeda, yang naik justru kartunya — itulah tangganya. */
    align-items: end;
    gap: 0;
  }
}

.anak {
  display: flex;
  flex-direction: column;
  /* Seberapa terang tingkat ini, 0..1.

     Dihitung dari `--maju` (kemajuan guliran yang ditulis pasangKemajuan ke
     elemen section) dikurangi ambang milik tingkat ini, lalu dikali besar
     supaya peralihannya tegas tapi tidak mengejut. clamp() menjepitnya ke
     0..1, jadi tingkat yang belum terlewati tetap redup dan yang sudah
     terlewati tidak pernah lebih terang dari penuh.

     Ambangnya angka tetap (0, 1/3, 2/3) yang dikirim dari template, bukan
     hasil mengukur tata letak — jadi tidak ada yang perlu dihitung ulang
     saat jendela berubah ukuran. */
  --nyala: clamp(0, calc((var(--maju, 0) - var(--ambang)) * 26), 1);
}

.anak-kartu {
  padding: 1.4rem 1.25rem 1.5rem;
}
@media (min-width: 1024px) {
  .anak-kartu {
    /* Margin inilah yang memberi jarak antarkartu, menggantikan celah kolom
       yang sengaja dinolkan demi keutuhan badan tangganya. */
    margin: 0 0.6rem;
    padding: 1.6rem 1.5rem 1.75rem;
  }
}

/* Badan anak tangga. Tingginya bertambah tiap tingkat; yang pertama nol,
   karena ia memang berdiri di permukaan tanah. */
.anak-tapak {
  display: none;
}
@media (min-width: 1024px) {
  .anak-tapak {
    display: block;
    height: var(--tinggi-tapak, 0px);
    margin-top: 1.25rem;
    background: rgba(var(--warna-rgb), 0.1);
    /* Garis atas penuh warna: itu permukaan tapak yang diinjak. */
    border-top: 3px solid var(--warna);
    opacity: calc(0.4 + var(--nyala) * 0.6);
    transition: opacity 0.45s ease;
  }
}

/* Penanda lingkaran ganda di kepala tiap kartu. Bentuknya sama dengan simpul
   jaringan di seluruh halaman ini; intinya menyala saat guliran mencapai
   tingkat tersebut. */
.anak-penanda {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 1.5px solid var(--warna);
  opacity: calc(0.35 + var(--nyala) * 0.65);
  transition: opacity 0.45s ease;
}
.anak-inti {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--warna);
  opacity: calc(0.3 + var(--nyala) * 0.7);
  box-shadow: 0 0 0 calc(var(--nyala) * 4px) rgba(var(--warna-rgb), 0.16);
  transition:
    opacity 0.45s ease,
    box-shadow 0.45s ease;
}

.anak-urut {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #8aa2ab;
  font-variant-numeric: tabular-nums;
}
.anak-nama {
  margin-top: 0.9rem;
  color: var(--warna);
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .anak-nama {
    font-size: 30px;
  }
}
.anak-ringkas {
  margin-top: 0.55rem;
  font-size: 12.5px;
  color: #6f6f6f;
}

/* Garis fokus bawaan browser bertumpukan dengan garis rambut di halaman ini
   dan mudah terlewat, padahal halaman ini penuh kendali yang dipakai dengan
   papan ketik. Warnanya sengaja versi paling pekat dari aksennya, bukan
   warna aksen biasa: garis fokus harus menang atas apa pun yang ada di
   bawahnya. */
.partner :focus-visible {
  outline: 2px solid #0e9a82;
  outline-offset: 3px;
}

/* ============================================================
   KURANGI GERAK

   Semua gerak yang JALAN SENDIRI dimatikan: sapuan di bawah judul, cincin
   orbit, roda tetikus. Gerak yang MENJAWAB AKSI pengunjung — angka
   berjalan, simpul diagram yang berpindah — sudah punya penanganannya
   sendiri di berkas masing-masing.
============================================================ */
@media (prefers-reduced-motion: reduce) {
  .sapuan path {
    animation: none;
    stroke-dashoffset: 0;
  }
  [data-muncul],
  .baris::after,
  .tombol-utama::before,
  .panah,
  .lencana,
  .isyarat-gulir {
    transition: none;
  }
}
</style>
