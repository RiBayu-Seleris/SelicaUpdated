<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
defineProps({
  href: {
    type: String,
    required: true,
  },
});

// Fungsi scroll ke elemen dengan id tertentu
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Tentukan offset berdasarkan ID
  let yOffset = -20; // default offset untuk kebanyakan section
  if (id === "about") {
    yOffset = -100; // offset lebih besar agar tidak tertutup navbar
  } else if (id === "howapplicationwork") {
    yOffset = -400; // offset lebih besar agar tidak tertutup navbar
  }

  // Hitung posisi elemen + offset
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  // Scroll dengan animasi halus
  window.scrollTo({ top: y, behavior: "smooth" });

  // Update hash di URL tanpa reload halaman
  if (history.pushState) {
    history.pushState(null, null, `#${id}`);
  } else {
    window.location.hash = `#${id}`;
  }
}
</script>

<template>
  <button
    aria-label="Nav Link Product"
    v-if="href.startsWith('#')"
    @click="scrollToId(href.replace('#', ''))"
    :class="[
      'relative inline-block font-medium',
      route.path === '/product/lifins'
        ? 'text-[#374151]'
        : route.path === '/'
          ? 'text-[#374151]'
          : route.path === href
            ? 'text-[#374151]'
            : '',
    ]"
  >
    <slot />
  </button>
  <!-- Router-link jika href adalah path -->
  <router-link
    v-else
    :to="href"
    :class="[
      'relative inline-block font-medium',
      route.path === '/product/lifins'
        ? 'text-[#374151]'
        : route.path === '/'
          ? 'text-[#374151]'
          : route.path === href
            ? 'text-[#374151]'
            : '',
    ]"
  >
    <slot />
  </router-link>
</template>
