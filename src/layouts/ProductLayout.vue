<script setup>
import Navbar from "@productComponents/Navbar.vue";
import Navbar3 from "@productComponents/Navbar3.vue";
import NavbarScroll from "@productComponents/NavbarScroll.vue";
import Footer from "@productComponents/Footer.vue";
import Sidebar from "@productComponents/Sidebar.vue";

import { onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";

const scrollStore = useScrollStore();
const route = useRoute();

// Tooltip scroll ke atas
const showTooltip = computed(() => scrollStore.isScrolled);
const handleScroll = () => scrollStore.updateScroll();
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const isSelerisCredit = computed(() => route.path === "/product/seleris-credit");

const isSelerisCareApplicator = computed(() => route.path === "/sca");

// Fungsi scroll ke hash (dengan retry)
const scrollToHash = async (hash) => {
  if (!hash) return;
  let attempt = 0;
  const maxAttempt = 20;

  const tryScroll = () => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempt < maxAttempt) {
      attempt++;
      setTimeout(tryScroll, 200);
    }
  };

  await nextTick();
  setTimeout(tryScroll, 400);
};

// Saat halaman dimount
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.body.style.overflow = "";

  AOS.init({
    duration: 800,
    once: true,
    disable: false,
  });

  // 🔥 Cek hash saat pertama kali masuk ke halaman produk
  if (route.hash) scrollToHash(route.hash);
});

// Pantau perubahan route agar hash juga bekerja setelah navigasi
watch(
  () => route.fullPath,
  (newPath) => {
    const hashIndex = newPath.indexOf("#");
    if (hashIndex !== -1) {
      const hash = newPath.substring(hashIndex);
      scrollToHash(hash);
    }
  },
);

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Icon
import Tooltip from "@/assets/images/tooltip.png";
</script>

<template>
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
