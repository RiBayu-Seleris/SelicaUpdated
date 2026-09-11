<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: null,
  },
});

const isExternal = computed(
  () => props.href.startsWith("http://") || props.href.startsWith("https://"),
);

/**
 * Apakah tautan ini menunjuk halaman yang SEDANG dibuka.
 *
 * Tautan yang membuka tab baru tidak pernah dihitung sedang dibuka: halaman
 * itu tidak menggantikan halaman ini, jadi menandainya sebagai posisi
 * pengunjung sekarang justru menyesatkan.
 *
 * CATATAN soal menu berawalan #
 * "#about" dan "#faq" menunjuk bagian di dalam beranda, bukan halaman
 * tersendiri. Untuk tahu bagian mana yang sedang dibaca, halaman perlu
 * pelacak posisi gulir — dan itu belum ada. Karena itu hanya "#hero" yang
 * diperlakukan sebagai penanda beranda; dua sisanya tidak pernah menyala,
 * dan itu lebih baik daripada menyalakan ketiganya sekaligus.
 */
const sedangDibuka = computed(() => {
  if (isExternal.value || props.target === "_blank") return false;

  if (props.href.startsWith("#")) {
    return route.path === "/" && props.href === "#hero";
  }

  return route.path === props.href;
});

/**
 * Warna tautan.
 *
 * KENAPA DIHITUNG SEKALI DI SINI
 * Sebelumnya rangkaian syarat yang sama ditulis ulang di keempat macam
 * tautan di bawah. Keempat salinan itu identik dan semuanya berujung pada
 * warna yang sama, sehingga tautan halaman yang sedang dibuka tidak pernah
 * benar-benar ditandai. Sekarang cukup satu tempat, dan keempatnya tidak
 * bisa lagi berbeda diam-diam.
 *
 * Halaman yang sedang dibuka memakai warna merek. Ini penting di halaman
 * berlatar gelap: dulu tautannya justru dibuat abu-abu tua di sana, dan
 * satu-satunya menu yang menandai posisi pengunjung malah jadi yang paling
 * sulit dibaca.
 */
const WARNA_AKTIF = "text-[#14B89B]";

// Dua halaman ini memaksa tulisan gelap untuk SEMUA menunya, terlepas dari
// latar navbarnya. Perilaku lama, dipertahankan apa adanya supaya tampilan
// beranda tidak ikut berubah oleh perbaikan ini.
const kelasDiam = computed(() =>
  route.path === "/" || route.path === "/product/lifins" ? "text-[#374151]" : "",
);

const kelasTautan = computed(() => [
  "relative inline-block font-medium transition-colors duration-300",
  sedangDibuka.value ? WARNA_AKTIF : kelasDiam.value,
]);

function scrollToId(id) {
  // Menu "#hero", "#about", dan sejenisnya menunjuk bagian yang hanya ada di
  // beranda. Kalau pengunjung sedang membuka halaman lain, bagian itu tidak
  // ditemukan dan dulu tombolnya jadi diam saja. Sekarang dia dibawa ke
  // beranda lebih dulu, lalu App.vue yang menggulirkannya ke bagian tersebut.
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  let yOffset = -20;
  if (id === "about") {
    yOffset = -100;
  } else if (id === "howapplicationwork") {
    yOffset = -400;
  }

  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });

  if (history.pushState) {
    history.pushState(null, null, `#${id}`);
  } else {
    window.location.hash = `#${id}`;
  }
}
</script>

<template>
  <!-- HASH LINK -->
  <button
    v-if="href.startsWith('#')"
    aria-label="Nav Link Product"
    :class="kelasTautan"
    :aria-current="sedangDibuka ? 'page' : undefined"
    @click="scrollToId(href.replace('#', ''))"
  >
    <slot />
  </button>

  <!-- EXTERNAL LINK -->
  <a
    v-else-if="isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="kelasTautan"
  >
    <slot />
  </a>

  <!-- INTERNAL ROUTE — buka tab baru jika target="_blank" -->
  <a
    v-else-if="target === '_blank'"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="kelasTautan"
  >
    <slot />
  </a>

  <!-- INTERNAL ROUTE biasa -->
  <router-link
    v-else
    :to="href"
    :class="kelasTautan"
    :aria-current="sedangDibuka ? 'page' : undefined"
  >
    <slot />
  </router-link>
</template>
