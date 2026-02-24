// src/stores/sidebar.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = ref(false);

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  // Optional: disable scroll saat terbuka
  watch(isOpen, (val) => {
    document.body.style.overflow = val ? "hidden" : "";
  });

  // ✅ Fungsi ini akan dipanggil di main.js
  function initRouterGuard(router) {
    router.beforeEach(() => {
      close(); // tutup sidebar sebelum navigasi halaman
      return true;
    });
  }

  return { isOpen, toggle, open, close, initRouterGuard };
});
