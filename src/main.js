// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n";
import AOS from "aos";
import "aos/dist/aos.css";
// style.css HARUS diimpor SETELAH aos.css.
//
// Berkas CSS pustaka dan berkas CSS project ini sama-sama memakai pemilih
// atribut seperti [data-aos="zoom-in"], jadi kekuatannya persis sama — dan
// pada kekuatan yang sama, yang menang adalah yang datang BELAKANGAN.
// Sebelumnya style.css diimpor lebih dulu, sehingga setiap penyesuaian yang
// ditulis di sana untuk AOS diam-diam tidak berlaku sama sekali: tidak ada
// galat, tidak ada peringatan, hanya nilai yang tidak pernah terpakai.
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

// ✅ Set title per halaman
router.beforeEach((to, from, next) => {
  document.title = "Seleris | " + (to.meta.title || "Seleris");
  next();
});

// ✅ Inisialisasi router guard dari sidebar store
useSidebarStore().initRouterGuard(router); // << PENTING

// ✅ Pulihkan pilihan bahasa pengunjung dari kunjungan sebelumnya
useLanguageStore().loadLanguage();

// ✅ Animasi muncul saat digulir.
//
// once: true  -> tiap elemen beranimasi SEKALI saja. Kalau diulang setiap
//                kali dilewati, halaman terasa gelisah saat digulir naik-turun.
// duration    -> cukup singkat; animasi masuk yang lambat membuat halaman
//                terasa lamban, bukan halus.
//
// AOS membaca posisi gulir dari window, dan Lenis memang menggulir window
// secara normal (bukan memindahkan isi halaman), jadi keduanya bisa hidup
// berdampingan tanpa penyesuaian tambahan.
AOS.init({
  duration: 600,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
  // Pengunjung yang menyalakan "kurangi animasi" di setelan sistemnya tidak
  // mendapat animasi ini.
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

app.mount("#app");
// Aos.init();
