import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageLoadingStore = defineStore("pageLoading", () => {
  const pending = ref(0);

  const start = () => {
    pending.value += 1;
  };

  const done = () => {
    if (pending.value > 0) pending.value -= 1;
  };

  // Dipanggil saat berpindah halaman: pengambilan data halaman lama tidak
  // relevan lagi, jadi hitungannya dimulai bersih.
  const reset = () => {
    pending.value = 0;
  };

  return { pending, start, done, reset };
});
