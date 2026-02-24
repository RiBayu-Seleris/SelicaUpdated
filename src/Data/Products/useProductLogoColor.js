// src/Data/Products/Logo.js
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useProductLogoColor() {
  const route = useRoute();

  const logo = computed(() => {
    if (route.path === "/product/credit-cover") {
      return new URL("@/assets/Products/images/Logo/CC-logo-color.png", import.meta.url).href;
    }
    if (route.path === "/product/medins") {
      return new URL("@/assets/Products/images/Logo/medins-logo-color.png", import.meta.url).href;
    }
    if (route.path === "/product/lifins") {
      return new URL("@/assets/Products/images/Logo/Lifins-logo.png", import.meta.url).href;
    }
    if (route.path === "/") {
      return new URL("@/assets/Products/images/Logo/Care-logo.png", import.meta.url).href;
    }
    if (route.path === "/product/seleris-credit") {
      return new URL("@/assets/Products/images/Logo/Credit-logo.png", import.meta.url).href;
    }
    if (route.path === "/product/seleris-care-applicator") {
      return new URL("@/assets/Products/images/Logo/Care-logo.png", import.meta.url).href;
    }
    return null; // fallback
  });

  return { logo };
}
