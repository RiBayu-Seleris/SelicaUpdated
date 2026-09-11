<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useScrollStore } from "@/stores/scroll";
import Navlink from "@/components/NavLink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();

// Saat halaman digulir, navbar berganti jadi versi berlatar putih sehingga
// tulisannya selalu gelap. Yang perlu diputuskan hanya keadaan paling atas:
// tulisan putih kalau hero halamannya gelap, selain itu gelap.
const tulisanTerang = computed(() => route.meta.heroGelap === true);

// Menu hanya menyimpan alamat tujuan dan KUNCI bahasanya.
// Teksnya sendiri ada di src/locales/en.json dan id.json, jadi ikut berganti
// saat pengunjung menukar bahasa.
const defaultProductMenu = [
  { href: "#hero", labelKey: "nav.home" },
  { href: "#about", labelKey: "nav.about" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "https://seleris.ai/contact", labelKey: "nav.contact" },
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
  <ul
    :class="[
      'flex items-center text-md font-[400]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500]'
        : [
            'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center',
            tulisanTerang ? 'text-[#FAFAFA]' : 'text-[#374151]',
          ],
    ]"
  >
    <li v-for="(menuDefault, index) in defaultProductMenu" :key="index">
      <Navlink class="text-[11pt]" :href="menuDefault.href" :target="menuDefault.target ?? null">
        {{ $t(menuDefault.labelKey) }}
      </Navlink>
    </li>
  </ul>
</template>
