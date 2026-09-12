import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import VueApexCharts from "vue3-apexcharts";

import App from "./App.vue";
import { useSidebarStore } from "@/stores/sidebar"; // ✅ import store
import { useLanguageStore } from "@/stores/language";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);
app.component("apexchart", VueApexCharts);

router.beforeEach((to, from, next) => {
  document.title = "Selica | " + (to.meta.title || "Seleris");
  next();
});

useSidebarStore().initRouterGuard(router); // << PENTING

useLanguageStore().loadLanguage();

AOS.init({
  duration: 600,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

app.mount("#app");
// Aos.init();
