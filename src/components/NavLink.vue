<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

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

function scrollToId(id) {
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

  <!-- EXTERNAL LINK -->
  <a
    v-else-if="isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
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
  </a>

  <!-- INTERNAL ROUTE — buka tab baru jika target="_blank" -->
  <a
    v-else-if="target === '_blank'"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
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
  </a>

  <!-- INTERNAL ROUTE biasa -->
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
