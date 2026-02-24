// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

import App from "./App.vue";
import { useSidebarStore } from "@/stores/sidebar"; // ✅ import store

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

// ✅ Set title per halaman
router.beforeEach((to, from, next) => {
  document.title = "Seleris | " + (to.meta.title || "Seleris");
  next();
});

// ✅ Inisialisasi router guard dari sidebar store
useSidebarStore().initRouterGuard(router); // << PENTING

app.mount("#app");
// Aos.init();
