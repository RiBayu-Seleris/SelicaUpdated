import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HealthCare",
    component: () => import("@/Care.vue"),
    meta: { title: "Health Care" },
  },
  {
    path: "/sca",
    name: "sca",
    component: () => import("@/CareApplicator.vue"),
    meta: { title: "SCA" },
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
