<script setup>
import { ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@/components/NavLink.vue";

import { aboutList } from "@/Data/AboutList";
import { productList } from "@/Data/ProductList";
import { technologyList } from "@/Data/technologyList";
import { usecaseList } from "@/Data/UseCaseList";
import { industryList } from "@/Data/IndustryList";

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

const titleSidebar = () => {
  if (route.path === "/product/lifins") {
    return "Lifins";
  }
  if (route.path === "/product/credit-cover") {
    return "Credit Cover";
  }
  if (route.path === "/product/medins") {
    return "Medins";
  }
  if (route.path === "/") {
    return "Care";
  }
  if (route.path === "/product/seleris-credit") {
    return "Credit";
  }
  if (route.path === "/product/seleris-care-applicator") {
    return "Credit Applicator";
  }
};

const defaultProductMenu = [
  {
    href: "#hero",
    label: "Home",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#testimonial",
    label: "Testimonial",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "https://seleris.ai/book-a-demo",
    label: "Contact",
  },
  {
    href: "https://sca.seleriscare.ai/",
    label: "SELICA Partner",
    target: "_blank", // ← tambahkan ini
  },
];

const careApplicatorProductMenu = [
  {
    href: "#tentang",
    label: "Tentang",
  },
  {
    href: "#keunggulan",
    label: "Keunggulan",
  },
  {
    href: "#komisi",
    label: "Komisi",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "https://seleris.ai/book-a-demo",
    label: "Contact",
  },
  {
    href: "https://sca.seleriscare.ai/register",
    label: "Gabung SCA",
    target: "_blank", // ← tambahkan ini
  },
];

const isSelerisCareApplicator = ref(route.path === "/sca");
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
              <div class="w-[80%] h-auto">
                <p
                  class="text-[#195279] dark:text-[#FAFAFA] font-semibold text-md md:text-[1.7rem]"
                >
                  Seleris {{ titleSidebar() }}
                </p>
              </div>
              <div class="w-[20%] h-auto flex justify-end">
                <button
                  aria-label="Sidebar Close Product"
                  type="button"
                  id="sidebar-button"
                  @click="sidebar.close"
                  class="ml-auto text-2xl font-bold text-gray-700 hover:text-black dark:text-[#FAFAFA]"
                >
                  <MenuIconClose />
                </button>
              </div>
            </div>
            <nav
              v-if="isSelerisCredit"
              class="w-full flex flex-wrap mt-8 text-lg font-semibold text-gray-800 gap-y-2"
            >
              <div
                class="w-full h-auto"
                v-for="(menuDefault, index) in creditProductMenu"
                :key="index"
              >
                <Navlink class="text-[11pt]" :href="menuDefault.href">
                  {{ menuDefault.label }}
                </Navlink>
              </div>
            </nav>
            <nav
              v-if="isSelerisCareApplicator"
              class="w-full flex flex-wrap mt-8 text-lg font-semibold text-gray-800 gap-y-2"
            >
              <div
                class="w-full h-auto"
                v-for="(scaMenu, index) in careApplicatorProductMenu"
                :key="index"
              >
                <Navlink class="text-[11pt]" :href="scaMenu.href">
                  {{ scaMenu.label }}
                </Navlink>
              </div>
            </nav>
            <nav
              v-else
              class="w-full flex flex-wrap mt-8 text-lg font-semibold text-gray-800 gap-y-2"
            >
              <div
                class="w-full h-auto"
                v-for="(menuDefault, index) in defaultProductMenu"
                :key="index"
              >
                <Navlink
                  class="text-[11pt]"
                  :href="menuDefault.href"
                  :target="menuDefault?.target || '_self'"
                >
                  {{ menuDefault.label }}
                </Navlink>
              </div>
            </nav>
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
