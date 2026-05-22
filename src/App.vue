<script setup>
// ================= IMPORT =================
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";

import Navbar from "@/components/Navbars.vue";
import Navbar3 from "@/components/Navbar3.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";

import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";
import { useSidebarStore } from "@/stores/sidebar";

import Tooltip from "@/assets/images/tooltip.png";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ================= STORE & ROUTE =================
const route = useRoute();
const scrollStore = useScrollStore();
const themeStore = useThemeStore();
const sidebarStore = useSidebarStore();

// ================= STATE =================
const isLoad = ref(false);
const isTooltipOpen = ref(false);

// ================= COMPUTED =================
const showTooltip = computed(() => scrollStore.isScrolled);

const isSelerisCareApplicator = computed(() => route.path === "/sca");

// Scroll progress
const scrollProgress = computed(() => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
});

// ================= METHODS =================
const handleScroll = () => {
  scrollStore.updateScroll();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value;
};

// Scroll ke hash (retry system)
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
  window.addEventListener("scroll", handleScroll);

  // Loading hanya di homepage
  if (route.path === "/") {
    isLoad.value = false;
    setTimeout(() => {
      isLoad.value = true;
    }, 2000);
  } else {
    isLoad.value = true;
  }

  // Init AOS
  AOS.init({
    duration: 800,
    once: true,
    disable: false,
  });

  // Scroll ke hash jika ada
  if (route.hash) {
    scrollToHash(route.hash);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// ================= WATCHERS =================
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    // Loading tiap pindah halaman
    if (newPath !== oldPath) {
      isLoad.value = false;
      setTimeout(() => {
        isLoad.value = true;
      }, 1000);
    }

    // Handle hash navigation
    if (route.hash) {
      scrollToHash(route.hash);
    }
  },
);

watch(
  () => scrollStore.isScrolled,
  (isScrolled) => {
    if (!isScrolled) {
      isTooltipOpen.value = false;
    }
  },
);
</script>

<template>
  <!-- ⏳ Initial Loading Screen -->
  <!-- && !route.path.startsWith('/blog/') -->
  <div
    v-if="!isLoad"
    class="fixed inset-0 flex flex-col items-center justify-center bg-[#F9F9F9] dark:bg-[#17181A] z-[9999]"
  >
    <!-- Loader Frame -->
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] object-cover object-center dark:hidden"
    >
      <source src="@/assets/videos/loading.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- ✅ Main App Content -->
  <template v-else>
    <div
      class="relative w-full mx-auto font-poppins animate__animated animate__fadeIn animate__slower"
    >
      <main class="relative w-full mx-auto">
        <header v-if="!isSelerisCareApplicator" class="fixed top-0 w-full z-50">
          <transition name="slide-down" mode="out-in">
            <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
          </transition>
        </header>
        <header v-else class="fixed top-0 w-full z-50">
          <transition name="slide-down" mode="out-in">
            <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar3" />
          </transition>
        </header>

        <!-- Scroll Tooltip -->
        <transition name="fade-slide">
          <div
            v-if="showTooltip"
            @click="scrollToTop"
            class="flex fixed justify-center cursor-pointer items-center bottom-5 right-5 lg:right-10 w-9 h-9 lg:w-12 lg:h-12 z-50 bg-white dark:bg-[#17181A] shadow-md border-[0.5px] dark:border-[0.1px] text-white rounded-full p-1 md:p-2"
          >
            <img :src="Tooltip" alt="Tooltip" class="w-full h-full" />
          </div>
        </transition>

        <Sidebar />
        <!-- router-view produk -->
        <router-view />
      </main>

      <footer class="w-full max-w-[1440px] h-auto px-8 mx-auto mt-20 lg:mt-40">
        <Footer />
      </footer>
    </div>
  </template>
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
