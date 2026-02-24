// stores/scroll.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useScrollStore = defineStore("scroll", () => {
  const isScrolled = ref(false);

  const updateScroll = () => {
    isScrolled.value = window.scrollY > 10;
  };

  return { isScrolled, updateScroll };
});
