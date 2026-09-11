import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HealthCare",
    component: () => import("@/Care.vue"),
    // heroGelap: bagian paling atas halaman berlatar gelap, jadi tulisan menu
    // dibuat putih. Halaman tanpa penanda ini otomatis memakai tulisan gelap.
    meta: { title: "Health Care", heroGelap: true },
  },
  {
    path: "/medical-disclaimer",
    name: "MedicalDisclaimer",
    component: () => import("@/MedicalDisclaimer.vue"),
    // Tanpa heroGelap: latarnya terang, jadi tulisan menu otomatis gelap.
    meta: { title: "Medical Disclaimer" },
  },
  {
    path: "/selica-partner",
    name: "SelicaPartner",
    component: () => import("@/SelicaPartner.vue"),
    // Tanpa heroGelap: hero halaman ini berlatar putih, jadi tulisan menu
    // otomatis gelap seperti di halaman disclaimer.
    meta: { title: "SELICA Partner" },
  },

  // catch-all route (harus di paling bawah)
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     // Saat reload atau navigasi baru, scroll ke atas
//     return { top: 0 };
//   },
// });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Jika menekan tombol "back" browser
    // if (savedPosition) {
    //   return savedPosition;
    // }

    // Jika ada hash (#howapplicationwork)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Default scroll ke atas
    return { top: 0 };
  },
});

export default router;
