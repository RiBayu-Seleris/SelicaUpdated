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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ================= STORE & ROUTE =================
const route = useRoute();
const router = useRouter();
const scrollStore = useScrollStore();
const themeStore = useThemeStore();

const mesinWebkit = typeof navigator !== "undefined" && /apple/i.test(navigator.vendor || "");

const loadingAnimation = mesinWebkit ? loadingTerang : loadingWebm;

const tipeLoading = mesinWebkit ? "video/mp4" : "video/webm";

const sidebarStore = useSidebarStore();
const pageLoading = usePageLoadingStore();

// ================= STATE =================
const isLoad = ref(false);

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

const garisTumbuh = ref(false);

const sisiSirkuit = ref(0);
const jariLingkaran = ref(85);

const hitungSirkuit = () => {
  sisiSirkuit.value = Math.max(window.innerWidth, window.innerHeight);
  const lebar = window.innerWidth;
  // Harus sama dengan setengah ukuran piringan logo: 170 / 240 / 280 px
  jariLingkaran.value = lebar >= 1024 ? 140 : lebar >= 768 ? 120 : 85;
};

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

const cahayaJalan = ref(false);

const mulaiCahaya = () => {
  cahayaJalan.value = false;
  nextTick(() => {
    requestAnimationFrame(() => {
      cahayaJalan.value = true;
    });
  });
};

const JEDA_DAUN_MS = 70;
const DURASI_TUTUP_MS = 700 + JEDA_DAUN_MS;
const DURASI_BUKA_MS = 1100 + JEDA_DAUN_MS;
const gerbangTampil = ref(true);
const gerbangMembuka = ref(false);
let penghitungGerbang = null;

const MIN_LOADING_MS = 2000; // muat pertama / refresh
const MIN_LOADING_PINDAH_MS = 1200;
const MAX_LOADING_MS = 10000; // pengaman: jangan sampai tertahan selamanya

let baruDitutupUntukPindah = false;
const waktuMinimumLewat = ref(false);
let penghitungMinimum = null;
let penghitungMaksimum = null;

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

  mulaiCahaya();

  if (!route.hash) gulirKePuncakSeketika();

  const waktuMinimum = baruDitutupUntukPindah ? MIN_LOADING_PINDAH_MS : MIN_LOADING_MS;
  baruDitutupUntukPindah = false;

  penghitungMinimum = setTimeout(() => {
    waktuMinimumLewat.value = true;
    cobaTutupLayarLoading();
  }, waktuMinimum);

  penghitungMaksimum = setTimeout(() => {
    isLoad.value = true;
  }, MAX_LOADING_MS);
};

const tutupGerbang = () =>
  new Promise((selesai) => {
    clearTimeout(penghitungGerbang);

    // Sudah terpasang dan tertutup: tidak ada yang perlu dianimasikan.
    if (gerbangTampil.value && !gerbangMembuka.value) {
      selesai();
      return;
    }

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

let sedangMuatUlang = false;

const tanganiTombolRefresh = (e) => {
  if (sedangMuatUlang) return; // sudah berjalan, jangan dipicu dua kali

  const F5 = e.key === "F5" && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  const ctrlR =
    (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (e.key === "r" || e.key === "R");

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

  pasangSmoothScroll();
  perbaruiSmoothScroll();

  pasangJedaAnimasi();

  requestAnimationFrame(() => {
    garisTumbuh.value = true;
  });

  mulaiLayarLoading();

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

watch(() => pageLoading.pending, cobaTutupLayarLoading);

watch(isLoad, (siap) => {
  if (!siap) return;

  cahayaJalan.value = false;
  gerbangMembuka.value = true;
  document.body.style.overflow = "";
  perbaruiSmoothScroll();

  if (hashTertunda.value) {
    scrollToHash(hashTertunda.value);
    hashTertunda.value = null;
  }

  nextTick(() => AOS.refreshHard());

  clearTimeout(penghitungGerbang);
  penghitungGerbang = setTimeout(() => {
    gerbangTampil.value = false;
  }, DURASI_BUKA_MS);
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath && route.path !== oldPath?.split("#")[0]) {
      mulaiLayarLoading();
    }

    if (route.hash) {
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
  <div
    v-if="gerbangTampil"
    :class="['fixed inset-0 z-[9999] overflow-hidden', gerbangMembuka ? 'pointer-events-none' : '']"
  >
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
      <div
        :class="[
          'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 flex items-center justify-center w-[170px] h-[170px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full shadow-2xl -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]',
          mesinWebkit ? 'bg-[#F9F9F9]' : 'bg-[#F9F9F9] dark:bg-[#17181A]',
          garisTumbuh && !gerbangMembuka ? 'scale-100' : 'scale-95',
        ]"
      >
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

      <svg
        aria-hidden="true"
        :width="sisiSirkuit"
        :height="sisiSirkuit"
        :class="[
          'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 pointer-events-none -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 origin-center',
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

  <div
    :class="[
      'relative w-full mx-auto font-poppins',
      isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
    ]"
  >
    <main class="relative w-full mx-auto">
      <header class="fixed top-0 w-full z-50">
        <transition name="slide-down" mode="out-in">
          <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
        </transition>
      </header>

      <ScrollTopButton />

      <Sidebar />
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
