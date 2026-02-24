<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router"; // ✅ Tambahkan ini

import MenuNav from "@/Components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
// import ThemeToggle from "@/components/reusable/ThemeToggle.vue";

import { useSidebarStore } from "@/stores/sidebar";
import { useProductLogo } from "@/Data/Products/useProductLogo.js";

const sidebarStore = useSidebarStore();
const route = useRoute(); // ✅ Ambil route saat ini

// Tutup saat pindah halaman
watch(
  () => route.fullPath,
  () => {
    sidebarStore.close();
  },
);

const { logo } = useProductLogo();
const LogoLink = computed(() => {
  if (route.path === "/product/seleris-credit") {
    return "/product/seleris-credit";
  }
  if (route.path === "/sca") {
    return "/sca";
  }
  return "";
});

const isSelerisCareApplicator = computed(() => route.path === "/sca");
</script>

<template>
  <div
    class="relative flex justify-center w-full h-auto items-center max-w-[1440px] mx-auto px-8 md:px-14 lg:px-28 xl:px-32 xls:px-48 pt-4 md:pt-6 xl:pt-8"
  >
    <!-- Desktop Navbar -->
    <div
      class="hidden relative lg:flex flex-row w-full h-auto bg-[#FFFFFF] px-10 py-1.5 rounded-[40px] border-[#E9EAEC] border-[1px] shadow-[0px_18px_32px_0px_rgba(0,0,0,0.06)]"
    >
      <router-link :to="LogoLink" class="absolute w-auto h-full left-10 top-0 py-3">
        <img v-if="logo" :src="logo" alt="Logo" class="w-full h-full object-contain" />
      </router-link>
      <div class="w-full h-full py-3">
        <MenuNav />
      </div>

      <a
        href="https://sca.seleriscare.ai/register"
        v-if="isSelerisCareApplicator"
        class="absolute w-auto h-full right-10 top-0 py-3"
      >
        <div
          class="w-auto h-full flex items-center justify-center px-6 bg-[#13B89C] shadow-[0px_4px_8px_0px_#13B89C40] rounded-[24px]"
        >
          <span class="text-[#FFFFFF] font-[600] text-[14px]">Gabung SCA</span>
        </div>
      </a>
    </div>

    <!-- Mobile Navbar -->
    <div class="w-full h-auto flex lg:hidden flex-row justify-between">
      <router-link :to="LogoLink" class="w-[40%] h-auto flex">
        <img v-if="logo" :src="logo" alt="Logo" class="w-[80px] h-[56px] object-contain" />
      </router-link>
      <div class="w-[60%] h-auto flex items-center flex-row justify-end">
        <div class="w-[30%] md:w-[15%] h-auto flex items-center justify-end">
          <button
            aria-label="Open Sidebar Care"
            type="button"
            id="sidebar-button"
            class="bg-white p-2 rounded-lg shadow-md text-[#1485CB]"
            @click="sidebarStore.open"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
