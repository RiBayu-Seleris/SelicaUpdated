// stores/theme.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  const applyTheme = () => {
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const loadTheme = () => {
    const saved = localStorage.getItem("isDark");
    isDark.value = saved === "true";
    applyTheme();
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
    localStorage.setItem("isDark", isDark.value.toString());
  };

  watch(isDark, applyTheme);

  return { isDark, toggleTheme, loadTheme };
});
