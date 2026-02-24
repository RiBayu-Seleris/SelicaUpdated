<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/Components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();

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
    href: "/contact",
    label: "Contact",
  },
  {
    href: "https://seleris.ai/product/seleris-care-applicator",
    label: "Seleris Care Applicator",
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
    href: "/contact",
    label: "Contact",
  },
];

const isSelerisCareApplicator = ref(route.path === "/sca");
</script>

<template>
  <ul
    v-if="isSelerisCareApplicator"
    :class="[
      'flex items-center text-md font-[400]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500] '
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#374151]',
    ]"
  >
    <li v-for="(scaMenu, index) in careApplicatorProductMenu" :key="index">
      <Navlink class="text-[11pt]" :href="scaMenu.href">
        {{ scaMenu.label }}
      </Navlink>
    </li>
  </ul>
  <ul
    v-else
    :class="[
      'flex items-center text-md font-[400]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500] '
        : isSelerisCredit
          ? 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#374151]'
          : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#FAFAFA]',
    ]"
  >
    <li v-for="(menuDefault, index) in defaultProductMenu" :key="index">
      <Navlink class="text-[11pt]" :href="menuDefault.href">
        {{ menuDefault.label }}
      </Navlink>
    </li>
  </ul>
</template>
