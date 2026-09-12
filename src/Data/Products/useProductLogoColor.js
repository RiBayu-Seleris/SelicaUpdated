import { computed } from "vue";

export function useProductLogoColor() {
  const logo = computed(
    () => new URL("@/assets/Products/images/Logo/Care-Logo.png", import.meta.url).href,
  );

  return { logo };
}
