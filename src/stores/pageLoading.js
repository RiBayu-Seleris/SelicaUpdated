import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Penghubung antara halaman dan layar loading di App.vue.
 *
 * MASALAH YANG DISELESAIKAN
 * Layar loading dulu hanya menghitung waktu (2 detik), tanpa tahu apakah isi
 * halaman sudah siap. Kalau datanya baru datang di detik ke-3, layar loading
 * sudah menutup lebih dulu — halaman tampil kosong sebentar, footer sempat
 * melompat ke atas, lalu isinya baru muncul.
 *
 * CARA KERJA
 * Halaman yang mengambil data memberi tahu store ini saat mulai dan selesai.
 * App.vue menutup layar loading hanya kalau DUA syarat terpenuhi:
 *   1. waktu minimum sudah lewat, DAN
 *   2. tidak ada lagi pengambilan data yang berjalan.
 *
 * Jadi yang menentukan adalah mana yang lebih lama di antara keduanya.
 *
 * CARA MEMAKAI di sebuah halaman:
 *
 *   import { usePageLoadingStore } from "@/stores/pageLoading";
 *   const pageLoading = usePageLoadingStore();
 *
 *   pageLoading.start();          // sebelum mulai ambil data
 *   try {
 *     await ambilData();
 *   } finally {
 *     pageLoading.done();         // WAJIB di finally, supaya tetap jalan
 *   }                             // walaupun pengambilan datanya gagal
 *
 * Halaman yang tidak mengambil data apa pun tidak perlu melakukan apa-apa —
 * layar loading akan menutup setelah waktu minimum, seperti sebelumnya.
 */
export const usePageLoadingStore = defineStore("pageLoading", () => {
  // Jumlah pengambilan data yang sedang berjalan. Memakai penghitung, bukan
  // true/false, karena satu halaman bisa mengambil beberapa data sekaligus
  // (misalnya daftar artikel + artikel terpopuler).
  const pending = ref(0);

  const start = () => {
    pending.value += 1;
  };

  const done = () => {
    // Jaga-jaga supaya tidak pernah minus kalau done() terpanggil berlebih
    if (pending.value > 0) pending.value -= 1;
  };

  // Dipanggil saat berpindah halaman: pengambilan data halaman lama tidak
  // relevan lagi, jadi hitungannya dimulai bersih.
  const reset = () => {
    pending.value = 0;
  };

  return { pending, start, done, reset };
});
