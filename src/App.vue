<script setup>
// ================= IMPORT =================
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

import Navbar from "@/components/Navbar.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";

import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";
import { useSidebarStore } from "@/stores/sidebar";
import { usePageLoadingStore } from "@/stores/pageLoading";
import { pasangJedaAnimasi } from "@/utils/jedaAnimasi";
import {
  pasangSmoothScroll,
  hentikanSmoothScroll,
  jalankanSmoothScroll,
  gulirKePuncakSeketika,
} from "@/utils/smoothScroll";

import AOS from "aos";

import loadingWebm from "@/assets/videos/loading.webm";
import loadingTerang from "@/assets/videos/loading-terang.mp4";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ================= STORE & ROUTE =================
const route = useRoute();
const router = useRouter();
const scrollStore = useScrollStore();
const themeStore = useThemeStore();

/* Animasi loading dipilih menurut MESIN PERAMBANNYA.

   WebM VP9 membawa kanal alpha sungguhan, jadi satu berkas cukup untuk tema
   terang maupun gelap — dan itu yang dipakai di Blink dan Gecko.

   WebKit — Safari, dan SEMUA peramban di iOS termasuk Chrome dan Firefox di
   sana — bisa memutar WebM-nya tapi MENGABAIKAN bidang alpha-nya, sehingga
   yang tampil hanya data warnanya: latar hitam pekat. Untuk mesin itu dipakai
   MP4 H.264 yang latarnya sudah disatukan dengan #F9F9F9.

   Karena latar berkasnya dipatok satu warna, piringan di bawahnya ikut
   dipatok #F9F9F9 di WebKit — termasuk saat tema gelap. Kalau piringannya
   dibiarkan ikut tema, di mode gelap latar terang milik videonya akan
   tergambar sebagai persegi panjang terang di atas piringan gelap.

   KENAPA HARUS DIDETEKSI, BUKAN CUKUP URUTAN <source>
   Peramban memilih <source> PERTAMA yang sanggup ia putar. Safari 14.1+
   sanggup memutar WebM VP9, jadi ia akan mengambilnya lebih dulu dan kembali
   menampilkan latar hitam. Urutan sumber tidak bisa membedakan "bisa
   memutar" dari "menghormati alpha".

   `navigator.vendor` dipakai karena ia menandai MESINNYA, bukan mereknya:
   WebKit selalu melaporkan "Apple Computer, Inc.", termasuk pada Chrome di
   iOS yang di dalamnya memang WebKit. Kalau yang diperiksa nama peramban,
   Chrome di iOS akan salah dikira Blink dan kebagian WebM yang hitam. */
const mesinWebkit = typeof navigator !== "undefined" && /apple/i.test(navigator.vendor || "");

const loadingAnimation = mesinWebkit ? loadingTerang : loadingWebm;

const tipeLoading = mesinWebkit ? "video/mp4" : "video/webm";

const sidebarStore = useSidebarStore();
const pageLoading = usePageLoadingStore();

// ================= STATE =================
const isLoad = ref(false);

/* ------------------------------------------------------------
   Kapan logo di dalam lingkaran boleh tampil

   Berkas animasinya perlu waktu untuk diunduh. Pada kunjungan
   PERTAMA, kalau langsung ditampilkan, kotaknya kosong dulu lalu logonya
   muncul mendadak. Karena itu ada efek memudar masuk.

   Tapi efek itu cuma berguna sekali. Pada kunjungan berikutnya — termasuk
   setiap kali halaman dimuat ulang — berkasnya sudah tersimpan di cache
   browser dan sebenarnya siap seketika. Memudar dari nol di situ justru
   membuat logonya terlihat "hilang sebentar" tiap kali refresh.

   Solusinya: sekali videonya berhasil dimuat, catat di localStorage.
   Kunjungan berikutnya langsung mulai dari tampil penuh.
------------------------------------------------------------ */
const KUNCI_VIDEO_PERNAH_DIMUAT = "seleriscare:loading-video-pernah-dimuat";

const pernahDimuat = (() => {
  try {
    return localStorage.getItem(KUNCI_VIDEO_PERNAH_DIMUAT) === "1";
  } catch {
    return false; // localStorage diblokir (mode penyamaran)
  }
})();

// Kunjungan berulang: langsung true, jadi gambar PERTAMA sudah tampil penuh.
const animasiLoadingSiap = ref(pernahDimuat);

const tandaiAnimasiSiap = () => {
  animasiLoadingSiap.value = true;
  try {
    localStorage.setItem(KUNCI_VIDEO_PERNAH_DIMUAT, "1");
  } catch {
    /* diabaikan: hanya membuat efek memudar tetap jalan tiap kali */
  }
};

// Pengaman: kalau kejadian "siap diputar" tidak pernah terkirim (mis. browser
// menolak memutar otomatis), videonya tetap ditampilkan setelah 0,6 detik.
setTimeout(tandaiAnimasiSiap, 600);

/**
 * Penanda supaya piringan logo MENDARAT saat pertama kali tampil.
 *
 * Saat refresh, gerbang langsung terpasang dalam keadaan tertutup — jadi kalau
 * piringannya langsung digambar pada ukuran penuh, tidak ada perubahan yang
 * bisa dianimasikan dan dia muncul begitu saja. Karena itu gambar pertama
 * dibuat sedikit lebih kecil (95%), lalu dinaikkan ke 100% satu gambar layar
 * kemudian di onMounted.
 */
const garisTumbuh = ref(false);

/* ------------------------------------------------------------
   Sirkuit cahaya

   Garis dan lingkaran digambar sebagai SATU jalur SVG, bukan dua elemen
   terpisah. Itu sebabnya cahayanya bisa berjalan menyambung: turun di garis,
   memutari tepi lingkaran, lalu turun lagi.

   Jalurnya dihitung di JavaScript, bukan ditulis tetap, karena panjangnya
   bergantung ukuran layar sedangkan jari-jari lingkarannya tetap dalam piksel
   (harus sama persis dengan ukuran piringan logo di bawahnya).
------------------------------------------------------------ */
const sisiSirkuit = ref(0);
const jariLingkaran = ref(85);

const hitungSirkuit = () => {
  sisiSirkuit.value = Math.max(window.innerWidth, window.innerHeight);
  const lebar = window.innerWidth;
  // Harus sama dengan setengah ukuran piringan logo: 170 / 240 / 280 px
  jariLingkaran.value = lebar >= 1024 ? 140 : lebar >= 768 ? 120 : 85;
};

/**
 * Lintasan yang selalu terlihat: garis atas, garis bawah, dan lingkaran
 * PENUH. Ditulis sebagai tiga potongan terpisah (tiap "M" mengangkat pena)
 * supaya garisnya berhenti di tepi lingkaran dan tidak memotong bagian
 * dalamnya — kalau memotong, garisnya akan tergambar menyeberangi logo.
 */
const lintasanSirkuit = computed(() => {
  const sisi = sisiSirkuit.value;
  const t = sisi / 2;
  const r = jariLingkaran.value;
  return [
    `M ${t} 0 L ${t} ${t - r}`,
    `M ${t} ${t + r} L ${t} ${sisi}`,
    `M ${t} ${t - r} A ${r} ${r} 0 1 1 ${t} ${t + r} A ${r} ${r} 0 1 1 ${t} ${t - r}`,
  ].join(" ");
});

/**
 * Jalur yang dilalui cahaya — DUA buah, kembar. Keduanya sama persis kecuali
 * sisi lingkaran yang dilewati: satu memutar ke kanan, satu ke kiri. Karena
 * panjangnya identik, cahayanya berjalan serempak: menyatu di garis lurus,
 * BERPISAH dua saat mengenai lingkaran, lalu bertemu lagi di bawahnya.
 *
 * Bedanya cuma satu angka: "sweep flag" pada perintah A (busur).
 */
const jalurCahaya = computed(() => {
  const sisi = sisiSirkuit.value;
  const t = sisi / 2;
  const r = jariLingkaran.value;
  const masuk = `M ${t} 0 L ${t} ${t - r}`;
  const keluar = `L ${t} ${sisi}`;
  return [
    `${masuk} A ${r} ${r} 0 0 1 ${t} ${t + r} ${keluar}`,
    `${masuk} A ${r} ${r} 0 0 0 ${t} ${t + r} ${keluar}`,
  ];
});

/**
 * Penanda: cahaya boleh berjalan atau belum.
 *
 * Animasi CSS mulai berjalan begitu elemennya dibuat — yaitu saat gerbang BARU
 * MULAI menutup. Akibatnya, begitu gerbang selesai menutup, cahayanya sudah
 * berada di tengah jalur. Karena itu kelas animasinya baru dipasang SETELAH
 * gerbang benar-benar tertutup.
 */
const cahayaJalan = ref(false);

const mulaiCahaya = () => {
  cahayaJalan.value = false;
  // Dua langkah: lepas kelasnya dulu sampai benar-benar tergambar, baru pasang
  // lagi. Kalau langsung false lalu true dalam satu tarikan, browser tidak
  // pernah melihat keadaan "tanpa kelas" dan animasinya meneruskan yang lama.
  nextTick(() => {
    requestAnimationFrame(() => {
      cahayaJalan.value = true;
    });
  });
};

/* ------------------------------------------------------------
   Waktu dan jeda daun gerbang

   Membuka dibuat lebih lambat daripada menutup: menutup terasa seperti
   keputusan (cepat, tegas), membuka terasa seperti persembahan (perlahan).

   Daun kanan berangkat 70 ms di belakang daun kiri. Selisih sekecil itu tidak
   terbaca sebagai "terlambat", tapi terasa: dua bidang yang bergerak persis
   serempak terbaca sebagai hasil hitungan komputer.

   Angka-angka ini HARUS sama dengan duration-[...] dan delay-[...] di template.
------------------------------------------------------------ */
const JEDA_DAUN_MS = 70;
const DURASI_TUTUP_MS = 700 + JEDA_DAUN_MS;
// Kedua angka ini HARUS sama dengan duration-[...] di template. Dulu angka
// 1100 ditulis lepas di tempat pemakaiannya, jauh dari angka 700 di atas —
// dan dua angka yang harus berubah bersamaan tidak boleh berjauhan begitu.
const DURASI_BUKA_MS = 1100 + JEDA_DAUN_MS;
const gerbangTampil = ref(true);
const gerbangMembuka = ref(false);
let penghitungGerbang = null;

/* ============================================================
   Layar loading

   Menutup hanya kalau DUA syarat terpenuhi:
     1. waktu minimum sudah lewat, DAN
     2. semua pengambilan data halaman sudah selesai
   Jadi yang menentukan adalah mana yang lebih lama.

   Dulu layar ini hanya menghitung waktu. Kalau data halaman baru datang
   setelah hitungan habis, halaman tampil kosong sebentar dan footer melompat
   ke atas sebelum isinya muncul.
============================================================ */
const MIN_LOADING_MS = 2000; // muat pertama / refresh
// Pindah halaman. Lebih pendek karena gerbangnya sudah terlihat lebih dulu
// selama 0,7 detik saat menutup.
const MIN_LOADING_PINDAH_MS = 1200;
const MAX_LOADING_MS = 10000; // pengaman: jangan sampai tertahan selamanya

let baruDitutupUntukPindah = false;
const waktuMinimumLewat = ref(false);
let penghitungMinimum = null;
let penghitungMaksimum = null;

/**
 * Smooth scroll hanya boleh jalan setelah layar loading menutup.
 *
 * Selama gerbang masih menutupi layar, gulir ditahan supaya halaman di baliknya
 * tidak ikut tergeser saat pengunjung memutar roda tetikus.
 */
const perbaruiSmoothScroll = () => {
  if (isLoad.value) {
    jalankanSmoothScroll();
  } else {
    hentikanSmoothScroll();
  }
};

const cobaTutupLayarLoading = () => {
  if (waktuMinimumLewat.value && pageLoading.pending === 0) {
    clearTimeout(penghitungMaksimum);
    isLoad.value = true;
  }
};

const mulaiLayarLoading = () => {
  clearTimeout(penghitungMinimum);
  clearTimeout(penghitungMaksimum);
  clearTimeout(penghitungGerbang);

  isLoad.value = false;
  waktuMinimumLewat.value = false;
  gerbangTampil.value = true; // gerbang dipasang lagi, dalam keadaan tertutup
  gerbangMembuka.value = false;
  pageLoading.reset(); // pengambilan data halaman sebelumnya tidak relevan lagi

  // Dipanggil di sini karena pada titik ini gerbangnya SUDAH tertutup.
  mulaiCahaya();

  // Halaman baru harus dibuka dari puncaknya. Kalau alamatnya membawa #bagian,
  // biarkan router yang menentukan tujuannya.
  if (!route.hash) gulirKePuncakSeketika();

  const waktuMinimum = baruDitutupUntukPindah ? MIN_LOADING_PINDAH_MS : MIN_LOADING_MS;
  baruDitutupUntukPindah = false;

  penghitungMinimum = setTimeout(() => {
    waktuMinimumLewat.value = true;
    cobaTutupLayarLoading();
  }, waktuMinimum);

  // Kalau ada pengambilan data yang menggantung, layar loading tetap menutup
  // daripada pengunjung terjebak selamanya.
  penghitungMaksimum = setTimeout(() => {
    isLoad.value = true;
  }, MAX_LOADING_MS);
};

/**
 * Menutup gerbang, lalu memberi tahu kalau animasinya sudah selesai.
 *
 * Satu hal yang mudah terlewat: daun gerbang dipasang dalam keadaan TERBUKA
 * dulu (posisinya di luar layar, jadi tidak terlihat), baru satu gambar layar
 * kemudian disuruh menutup. Kalau langsung dipasang tertutup, tidak ada
 * perubahan posisi yang bisa dianimasikan browser.
 */
const tutupGerbang = () =>
  new Promise((selesai) => {
    clearTimeout(penghitungGerbang);

    // Sudah terpasang dan tertutup: tidak ada yang perlu dianimasikan.
    if (gerbangTampil.value && !gerbangMembuka.value) {
      selesai();
      return;
    }

    // Kunci gulir selama peralihan, supaya halaman lama tidak ikut tergeser.
    document.body.style.overflow = "hidden";
    hentikanSmoothScroll();

    cahayaJalan.value = false; // cahaya diam selama gerbang menutup

    gerbangTampil.value = true;
    gerbangMembuka.value = true; // posisi awal: terbuka (di luar layar)

    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gerbangMembuka.value = false; // -> menutup
          penghitungGerbang = setTimeout(selesai, DURASI_TUTUP_MS);
        });
      });
    });
  });

/**
 * Menahan perpindahan halaman sampai gerbangnya selesai menutup.
 *
 * Yang sengaja DILEWATI (gerbang tidak menutup):
 * - muat pertama, karena belum ada halaman yang perlu ditutupi
 * - tautan #anchor, yaitu perpindahan yang alamatnya sama dan hanya beda
 *   bagian. Ini penting: menu "lompat ke bagian" secara teknis tetap terhitung
 *   pindah rute, dan tanpa pengecualian ini gerbangnya akan menutup setiap
 *   kali orang mengklik menu.
 */
/* ------------------------------------------------------------
   Refresh lewat papan ketik (F5 / Ctrl+R / Cmd+R)

   TUJUANNYA
   Supaya refresh pun terasa seperti pindah halaman: gerbang menutup dulu,
   baru halaman dimuat ulang. Tanpa ini, refresh memutus semuanya di tengah —
   layar berkedip, lalu gerbangnya muncul lagi dari nol.

   CARA KERJANYA — bagian yang penting dipahami
   Muat ulang aslinya TIDAK dibatalkan, hanya DITUNDA sampai gerbangnya
   selesai menutup. Saat itu layar sudah tertutup penuh warna solid, jadi
   proses muat ulang browser berlangsung di baliknya tanpa terlihat: dokumen
   baru menggambar latar dengan warna yang sama persis (aturannya ditulis
   langsung di <head> pada index.html, jadi berlaku sebelum JavaScript apa pun
   berjalan), dan gerbangnya juga sudah dalam keadaan tertutup.

   Karena muat ulangnya asli, berkas aplikasi tetap diambil ulang — jadi
   setelah deploy, pengunjung yang menekan F5 tetap mendapat versi terbaru.

   BATASNYA
   Hanya berlaku untuk refresh lewat papan ketik. Tombol reload di toolbar
   browser dan Enter di address bar tidak bisa dicegat oleh JavaScript sama
   sekali — itu di luar halaman, dan browser memang sengaja tidak
   memberitahukannya ke kode kita.
------------------------------------------------------------ */
let sedangMuatUlang = false;

const tanganiTombolRefresh = (e) => {
  if (sedangMuatUlang) return; // sudah berjalan, jangan dipicu dua kali

  const F5 = e.key === "F5" && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  const ctrlR =
    (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (e.key === "r" || e.key === "R");

  // Ctrl+Shift+R / Ctrl+F5 = muat ulang paksa (abaikan cache). Sengaja
  // dibiarkan apa adanya, karena itu dipakai justru saat menelusuri masalah —
  // menggantinya dengan muat ulang biasa malah menghalangi.
  if (!F5 && !ctrlR) return;

  e.preventDefault();
  sedangMuatUlang = true;

  tutupGerbang().then(() => {
    window.location.reload();
  });
};

const lepasPenjagaRute = router.beforeEach(async (to, from) => {
  if (!from.name) return true;
  if (to.path === from.path) return true;

  await tutupGerbang();
  baruDitutupUntukPindah = true;
  return true;
});

// ================= METHODS =================
const handleScroll = () => {
  scrollStore.updateScroll();
};

// Scroll ke hash (retry system)
/**
 * Alamat #bagian yang menunggu layar loading selesai.
 *
 * KENAPA PERLU DITUNDA
 * Selama gerbang tertutup, smooth scroll sengaja dihentikan supaya halaman di
 * baliknya tidak ikut tergeser. Kalau gulir ke #bagian dijalankan saat itu,
 * perintahnya diterima tapi tidak menggerakkan apa pun — dan tidak diulang,
 * karena elemennya memang sudah ketemu. Akibatnya halaman terbuka di puncak,
 * bukan di bagian yang dituju.
 */
const hashTertunda = ref(null);

const scrollToHash = async (hash) => {
  if (!hash) return;

  let attempt = 0;
  const maxAttempt = 20;

  const tryScroll = () => {
    const el = document.querySelector(hash);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (attempt < maxAttempt) {
      attempt++;
      setTimeout(tryScroll, 200);
    }
  };

  await nextTick();
  setTimeout(tryScroll, 400);
};

// ================= LIFECYCLE =================
onMounted(() => {
  themeStore.loadTheme();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", tanganiTombolRefresh);

  hitungSirkuit();
  window.addEventListener("resize", hitungSirkuit);

  // Smooth scroll dipasang sekali untuk seluruh situs. Semua kodenya ada di
  // src/utils/smoothScroll.js — komponen lain tidak perlu tahu apa-apa.
  pasangSmoothScroll();
  perbaruiSmoothScroll();

  // Menghentikan animasi hiasan di bagian yang sedang tidak terlihat.
  pasangJedaAnimasi();

  // Satu gambar layar setelah terpasang, supaya piringan logonya MENDARAT
  // (95% -> 100%) dan tidak muncul begitu saja.
  requestAnimationFrame(() => {
    garisTumbuh.value = true;
  });

  mulaiLayarLoading();

  // Scroll ke hash jika ada — ditunda sampai layar loading selesai.
  if (route.hash) {
    hashTertunda.value = route.hash;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", tanganiTombolRefresh);
  window.removeEventListener("resize", hitungSirkuit);
  clearTimeout(penghitungMinimum);
  clearTimeout(penghitungMaksimum);
  clearTimeout(penghitungGerbang);
  lepasPenjagaRute();
});

// ================= WATCHERS =================
// Layar loading menutup begitu SEMUA pengambilan data halaman selesai —
// tapi tetap menunggu waktu minimum lewat.
watch(() => pageLoading.pending, cobaTutupLayarLoading);

// Begitu konten dinyatakan siap, gerbangnya membuka lalu dilepas dari halaman.
watch(isLoad, (siap) => {
  if (!siap) return;

  // Cahaya berhenti begitu gerbang mulai membuka. Kalau dibiarkan jalan,
  // ia masih berkedip di daun yang sedang meluncur ke tepi — gerakan yang
  // menarik mata justru ke arah yang sedang ditinggalkan.
  cahayaJalan.value = false;
  gerbangMembuka.value = true;
  document.body.style.overflow = "";
  perbaruiSmoothScroll();

  // Gulir ke #bagian baru dijalankan sekarang, saat gulir sudah hidup kembali.
  if (hashTertunda.value) {
    scrollToHash(hashTertunda.value);
    hashTertunda.value = null;
  }

  /* AOS diukur ulang setelah gerbang membuka.
     AOS.init() di main.js menghitung posisi tiap elemen saat aplikasi
     dipasang — dan pada saat itu gerbang loading masih menutupi layar, gulir
     masih dikunci, dan halaman baru saja terbentuk. Angka yang diambilnya di
     situ belum tentu posisi akhir. refreshHard() memindai ulang seluruh
     elemen setelah semuanya benar-benar duduk di tempatnya; tanpa ini,
     section bisa terlewat pemicunya dan tetap tak terlihat.
     nextTick menunggu Vue selesai menggambar dulu. */
  nextTick(() => AOS.refreshHard());

  clearTimeout(penghitungGerbang);
  // Daunnya baru boleh dilepas setelah animasi gesernya benar-benar selesai.
  penghitungGerbang = setTimeout(() => {
    gerbangTampil.value = false;
  }, DURASI_BUKA_MS);
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    // Gerbang sudah ditutup oleh penjaga rute di atas; di sini tinggal
    // memulai hitungan layar loading untuk halaman yang baru.
    if (newPath !== oldPath && route.path !== oldPath?.split("#")[0]) {
      mulaiLayarLoading();
    }

    if (route.hash) {
      // Tautan #bagian di dalam halaman yang SAMA tidak memunculkan layar
      // loading, jadi isLoad tidak berubah dan penundaan tidak akan pernah
      // dilepas. Untuk kasus itu gulirnya dijalankan langsung.
      if (isLoad.value) {
        scrollToHash(route.hash);
      } else {
        hashTertunda.value = route.hash;
      }
    }
  },
);
</script>

<template>
  <!-- ⏳ Layar loading berbentuk gerbang dua daun.
       Saat konten siap, keduanya BERGESER ke tepi (bukan memudar).
       "overflow-hidden" menahan daun yang sudah keluar layar supaya tidak
       memunculkan batang gulir mendatar. -->
  <div
    v-if="gerbangTampil"
    :class="['fixed inset-0 z-[9999] overflow-hidden', gerbangMembuka ? 'pointer-events-none' : '']"
  >
    <!-- Daun kanan -->
    <div
      :class="[
        'absolute bottom-0 left-0 w-full h-1/2 lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:w-1/2 lg:h-full bg-[#F9F9F9] dark:bg-[#17181A] transition-transform',
        gerbangMembuka ? 'duration-[1100ms]' : 'duration-[700ms]',
        gerbangMembuka ? 'ease-[cubic-bezier(.16,1,.3,1)]' : 'ease-[cubic-bezier(.6,0,.15,1)]',
        'delay-[70ms]',
        gerbangMembuka
          ? 'translate-y-full lg:translate-y-0 lg:translate-x-full'
          : 'translate-x-0 translate-y-0',
      ]"
    ></div>

    <!-- Daun kiri.
         Digeser lebih jauh dari lebarnya sendiri (tambahan 11rem = 176px)
         supaya lingkaran yang menempel di tepinya ikut keluar layar
         sepenuhnya. Angkanya HARUS lebih besar dari jari-jari lingkaran
         terbesar (280px : 2 = 140px). Kalau ukuran lingkaran diubah, angka ini
         ikut disesuaikan. z-20 supaya lingkarannya lewat DI ATAS daun kanan. -->
    <div
      :class="[
        'absolute top-0 left-0 w-full h-1/2 lg:w-1/2 lg:h-full z-20 bg-[#F9F9F9] dark:bg-[#17181A] transition-transform',
        gerbangMembuka ? 'duration-[1100ms]' : 'duration-[700ms]',
        gerbangMembuka ? 'ease-[cubic-bezier(.16,1,.3,1)]' : 'ease-[cubic-bezier(.6,0,.15,1)]',
        gerbangMembuka
          ? 'translate-y-[calc(-100%_-_11rem)] lg:translate-y-0 lg:translate-x-[calc(-100%_-_11rem)]'
          : 'translate-x-0 translate-y-0',
      ]"
    >
      <!-- Lingkaran tengah.
           Titik tengahnya pas di garis belah, jadi terlihat di tengah layar —
           tapi badannya milik daun KIRI, bukan elemen berdiri sendiri. Itu
           sebabnya dia tetap utuh dan bergeser penuh mengikuti daun kiri.

           Tugasnya: jadi ALAS bagi animasi loading, dan membingkainya lewat
           bayangan lembut. -->
      <div
        :class="[
          'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 flex items-center justify-center w-[170px] h-[170px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full shadow-2xl -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]',
          mesinWebkit ? 'bg-[#F9F9F9]' : 'bg-[#F9F9F9] dark:bg-[#17181A]',
          garisTumbuh && !gerbangMembuka ? 'scale-100' : 'scale-95',
        ]"
      >
        <!-- Animasi loading. Memudarnya sengaja cepat (0,2 detik) dan
             preload="auto" menyuruh peramban mengunduhnya sesegera mungkin.

             Berkasnya berbeda menurut mesin peramban — WebM yang tembus
             pandang untuk Blink dan Gecko, MP4 sewarna piringan untuk WebKit.
             Alasan lengkapnya ada di bagian `mesinWebkit` di atas.

             `:key` dipasang pada elemennya supaya video benar-benar dimuat
             ulang saat sumbernya berganti. Tanpa itu, mengganti tema di
             WebKit hanya menukar atribut src sementara video yang lama tetap
             diputar. -->
        <video
          :key="loadingAnimation"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
          @contextmenu.prevent
          @loadeddata="tandaiAnimasiSiap"
          @canplay="tandaiAnimasiSiap"
          :class="[
            'w-[132px] md:w-[186px] lg:w-[218px] h-auto object-contain transition-opacity duration-200 ease-out',
            animasiLoadingSiap ? 'opacity-100' : 'opacity-0',
          ]"
        >
          <source :src="loadingAnimation" :type="tipeLoading" />
        </video>
      </div>

      <!-- Sirkuit cahaya.
           Garis dan lingkaran adalah SATU jalur SVG, jadi cahayanya berjalan
           menyambung: turun di garis, memutari tepi lingkaran, lalu turun lagi.

           Ditulis SETELAH piringan logo supaya tergambar di atas tepinya.
           Jalurnya tidak pernah memotong bagian dalam lingkaran, jadi cahayanya
           tidak akan menyeberangi logo.

           Kanvasnya sisi terpanjang layar supaya tetap membentang penuh baik
           saat tegak maupun mendatar. -->
      <svg
        aria-hidden="true"
        :width="sisiSirkuit"
        :height="sisiSirkuit"
        :class="[
          'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 pointer-events-none -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 origin-center',
          // Di bawah lg sumbu gerbangnya mendatar, jadi sirkuitnya diputar 90
          // derajat sebagai posisi dasar; di lg ke atas kembali tegak.
          'rotate-90 lg:rotate-0',
        ]"
      >
        <!-- Lintasannya: garis samar yang selalu terlihat -->
        <path
          :d="lintasanSirkuit"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          class="text-black/10 dark:text-white/15"
        />

        <!-- Cahaya yang berjalan, dua jalur kembar: satu memutar lewat sisi
             kanan lingkaran, satu lewat kiri.

             Warnanya #13B89C — teal merek Seleris Care.

             Transparansinya dipasang di elemen <g>, BUKAN di tiap jalur.
             Sebabnya: dua garis setengah tembus pandang yang bertumpuk akan
             saling menumpuk warnanya, jadi bagian lurus tampak lebih pekat
             daripada busurnya.

             pathLength="100" membuat panjang jalur dianggap 100 satuan berapa
             pun ukuran layarnya, jadi animasinya tidak perlu dihitung ulang
             saat jendela diubah ukurannya. -->
        <g opacity="0.85">
          <path
            v-for="(jalur, i) in jalurCahaya"
            :key="i"
            :d="jalur"
            pathLength="100"
            fill="none"
            stroke="#13B89C"
            stroke-width="2"
            stroke-linecap="round"
            :class="['sirkuit-cahaya', cahayaJalan ? 'sirkuit-cahaya-jalan' : '']"
          />
        </g>
      </svg>
    </div>
  </div>

  <!-- ✅ Konten utama.
       Sengaja TIDAK memakai v-else, supaya konten dibuat sejak awal dan bisa
       memuat datanya di balik layar loading (yang menutupinya penuh karena
       posisinya fixed inset-0). Kalau konten baru dibuat setelah layar loading
       menutup, footer sempat melompat sebelum isinya datang. -->
  <div
    :class="[
      'relative w-full mx-auto font-poppins',
      // Kelas animasi baru dipasang saat isLoad true. Animasi CSS berjalan
      // sekali, tepat ketika kelasnya menempel — kalau ditulis langsung,
      // animasinya habis di balik layar loading.
      // Dipakai 'faster' (0,5 detik), bukan 'slower' (3 detik), supaya konten
      // sudah pekat sebelum gerbang terbuka separuh.
      isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
    ]"
  >
    <main class="relative w-full mx-auto">
      <header class="fixed top-0 w-full z-50">
        <transition name="slide-down" mode="out-in">
          <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
        </transition>
      </header>

      <!-- Tombol kembali ke atas (dengan cincin kemajuan gulir) -->
      <ScrollTopButton />

      <Sidebar />
      <!-- router-view produk -->
      <router-view />
    </main>

    <footer class="w-full max-w-[1440px] h-auto px-8 mx-auto mt-20 lg:mt-40">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.bouncing-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.bouncing-loader > div {
  animation: bounce 0.6s infinite alternate;
}
@keyframes bounce {
  to {
    transform: translateY(-16px);
    opacity: 0.5;
  }
}
</style>
