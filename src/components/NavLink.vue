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

const sedangDibuka = computed(() => {
  if (isExternal.value || props.target === "_blank") return false;

  if (props.href.startsWith("#")) {
    return route.path === "/" && props.href === "#hero";
  }

  return route.path === props.href;
});

const WARNA_AKTIF = "text-[#14B89B]";

const kelasDiam = computed(() =>
  route.path === "/" || route.path === "/product/lifins" ? "text-[#374151]" : "",
);

const kelasTautan = computed(() => [
  "relative inline-block font-medium transition-colors duration-300",
  sedangDibuka.value ? WARNA_AKTIF : kelasDiam.value,
]);

function scrollToId(id) {
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
  <button
    v-if="href.startsWith('#')"
    aria-label="Nav Link Product"
    :class="kelasTautan"
    :aria-current="sedangDibuka ? 'page' : undefined"
    @click="scrollToId(href.replace('#', ''))"
  >
    <slot />
  </button>

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

  <router-link
    v-else
    :to="href"
    :class="kelasTautan"
    :aria-current="sedangDibuka ? 'page' : undefined"
  >
    <slot />
  </router-link>
</template>
