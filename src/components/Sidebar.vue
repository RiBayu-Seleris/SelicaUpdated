<script setup>
import { ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@/components/NavLink.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useProductLogo } from "@/Data/Products/useProductLogo.js";

const sidebar = useSidebarStore();
const route = useRoute();

// Tutup saat pindah halaman
watch(
  () => route.fullPath,
  () => {
    sidebar.close();
  },
);

// Dropdown toggle
const isProductOpen = ref(false);
const isTechnologyOpen = ref(false);

const handleProduct = () => {
  isProductOpen.value = !isProductOpen.value;
  isTechnologyOpen.value = false;
};
const handleTechnology = () => {
  isTechnologyOpen.value = !isTechnologyOpen.value;
  isProductOpen.value = false;
};

// Logo yang sama dengan yang dipakai navbar, jadi kepala sidebar dan navbar
// tidak bisa menampilkan identitas yang berbeda.
const { logo } = useProductLogo();

// Menu hanya menyimpan alamat tujuan dan KUNCI bahasanya; teksnya di locale.
const defaultProductMenu = [
  { href: "#hero", labelKey: "nav.home" },
  { href: "#about", labelKey: "nav.about" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "https://seleris.ai/book-a-demo", labelKey: "nav.contact" },
  { href: "/medical-disclaimer", labelKey: "nav.disclaimer" },
  { href: "/selica-partner", labelKey: "nav.partner" },
  {
    href: "https://sca.seleriscare.ai/",
    labelKey: "nav.hub",
    target: "_blank",
  },
];
</script>

<template>
  <transition name="fade">
    <div
      v-if="sidebar.isOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="sidebar.close"></div>

      <!-- Sidebar -->
      <transition name="slide">
        <div class="ml-auto w-full h-auto px-4 pt-6">
          <div
            class="w-full h-full bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center py-6 px-5 rounded-xl"
          >
            <div class="flex flex-row w-full h-auto justify-between items-center">
              <!-- Dulu di sini tertulis "Seleris {nama halaman}", disusun dari
                   daftar rute yang ditulis tangan. Di rute yang tidak ada di
                   daftar itu — Selica Partner dan Medical Disclaimer — yang
                   tampil cuma kata "Seleris" menggantung tanpa lanjutan.
                   Logo tidak punya masalah itu, dan sekaligus menyamakan
                   kepala sidebar dengan navbar. -->
              <div class="h-auto w-[80%]">
                <img
                  v-if="logo"
                  :src="logo"
                  alt="Logo"
                  class="h-[44px] w-auto object-contain md:h-[52px]"
                />
              </div>
              <div class="w-[20%] h-auto flex justify-end">
                <button
                  :aria-label="$t('common.closeMenu')"
                  type="button"
                  id="sidebar-button"
                  @click="sidebar.close"
                  class="ml-auto text-2xl font-bold text-gray-700 hover:text-black dark:text-[#FAFAFA]"
                >
                  <MenuIconClose />
                </button>
              </div>
            </div>
            <!-- Tiap menu diberi ruang napas sendiri dan dipisah garis rambut.
                 Sebelumnya ketujuhnya berjarak 8px saja, jadi terbaca sebagai
                 satu blok tulisan, bukan sebagai daftar yang bisa dipilih. -->
            <nav class="mt-7 flex w-full flex-col font-semibold text-gray-800">
              <div
                v-for="(menuDefault, index) in defaultProductMenu"
                :key="index"
                class="h-auto w-full border-b border-[#F3F4F6] py-3.5 last:border-b-0 dark:border-white/10"
              >
                <Navlink
                  class="text-[15px]"
                  :href="menuDefault.href"
                  :target="menuDefault?.target || '_self'"
                >
                  {{ $t(menuDefault.labelKey) }}
                </Navlink>
              </div>
            </nav>

            <!-- Pemilih bahasa untuk tampilan mobile -->
            <div class="w-full h-auto mt-6 pt-5 border-t border-[#F3F4F6] flex justify-start">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
