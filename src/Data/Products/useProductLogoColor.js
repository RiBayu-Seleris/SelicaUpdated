// src/Data/Products/Logo.js
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useProductLogoColor() {
  const route = useRoute();

  const logo = computed(() => {
    if (route.path === "/") {
      return new URL("@/assets/Products/images/Logo/Care-logo.png", import.meta.url).href;
    }
    if (route.path === "/sca") {
      return new URL("@/assets/Products/images/Logo/Care-logo.png", import.meta.url).href;
    }
    return null; // fallback
  });

  return { logo };
}
