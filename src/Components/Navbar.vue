<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

import MenuNav from "@/Components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { useSidebarStore } from "@/stores/sidebar";
import { useProductLogo } from "@/Data/Products/useProductLogo.js";

const sidebarStore = useSidebarStore();
const route = useRoute();

// Auto close sidebar saat pindah halaman
watch(
  () => route.fullPath,
  () => sidebarStore.close(),
);

const { logo } = useProductLogo();

// 🔥 LogoLink versi scalable
const LogoLink = computed(() => {
  if (route.path.startsWith("/product/")) {
    return route.path;
  }
  return "/";
});
</script>

<template>
  <div
    class="relative flex justify-center w-full h-auto items-center max-w-[1440px] mx-auto px-10 md:px-14 xl:px-16 xls:px-20 pt-4 md:pt-6 xl:pt-8"
  >
    <!-- Desktop Navbar -->
    <div class="hidden lg:grid grid-cols-12 w-full h-auto">
      <div class="col-span-1 h-full">
        <router-link :to="LogoLink" class="w-full h-full">
          <div class="flex w-full h-full items-center">
            <img v-if="logo" :src="logo" alt="Logo" class="w-full h-auto object-contain" />
          </div>
        </router-link>
      </div>
      <div class="flex items-center col-span-10 h-auto">
        <div class="flex w-full h-auto">
          <!-- rounded-full border shadow-[1px_19px_33px_-14px_rgba(0,_0,_0,_0.08)] bg-white z-[999] -->
          <nav class="hidden lg:flex items-center w-full justify-center content-center h-auto">
            <div
              class="w-auto h-full border-[0.5px] rounded-[40px] bg-[#FFFDFD]/30 backdrop-filter backdrop-blur-xl bg-opacity-10 py-3 px-10"
            >
              <MenuNav />
            </div>
          </nav>
        </div>
      </div>
      <div class="flex items-center col-span-1 h-auto" />
    </div>

    <!-- Mobile Navbar -->
    <div class="w-full h-auto flex lg:hidden flex-row justify-between">
      <router-link :to="LogoLink" class="w-[40%] h-auto flex">
        <img v-if="logo" :src="logo" alt="Logo" class="w-[80px] h-[56px] object-contain" />
      </router-link>
      <div class="w-[60%] h-auto flex items-center flex-row justify-end">
        <div class="w-[30%] md:w-[15%] h-auto flex items-center justify-end">
          <button
            aria-label="Open Sidebar Page Product"
            type="button"
            id="sidebar-button"
            class="bg-white p-2 rounded-lg shadow-md text-[#1AB24F]"
            @click="sidebarStore.open"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
