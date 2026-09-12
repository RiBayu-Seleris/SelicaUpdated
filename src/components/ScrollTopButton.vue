<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import Tooltip from "@/assets/images/tooltip.png";

const scrollStore = useScrollStore();

const tampil = computed(() => scrollStore.isScrolled);

const KELILING = 2 * Math.PI * 16;

const kemajuan = ref(0);

const sisaCincin = computed(() => KELILING * (1 - kemajuan.value / 100));

let bisaDigulir = 0;

const ukurTinggiHalaman = () => {
  bisaDigulir = document.documentElement.scrollHeight - document.documentElement.clientHeight;
};

const hitungKemajuan = () => {
  const posisi = window.scrollY || document.documentElement.scrollTop;

  if (bisaDigulir <= 0) {
    kemajuan.value = 0;
    return;
  }

  const sisaJarak = bisaDigulir - posisi;
  kemajuan.value = sisaJarak <= 2 ? 100 : (posisi / bisaDigulir) * 100;
};

let idFrame = null;
const tanganiGulir = () => {
  if (idFrame) return;
  idFrame = requestAnimationFrame(() => {
    hitungKemajuan();
    idFrame = null;
  });
};

const tanganiUkuranBerubah = () => {
  ukurTinggiHalaman();
  tanganiGulir();
};

let pengamatTinggi = null;

onMounted(() => {
  ukurTinggiHalaman();
  hitungKemajuan(); // kalau halaman dibuka dalam keadaan sudah tergulir
  window.addEventListener("scroll", tanganiGulir, { passive: true });
  window.addEventListener("resize", tanganiUkuranBerubah, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    pengamatTinggi = new ResizeObserver(tanganiUkuranBerubah);
    pengamatTinggi.observe(document.body);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", tanganiGulir);
  window.removeEventListener("resize", tanganiUkuranBerubah);
  pengamatTinggi?.disconnect();
  if (idFrame) cancelAnimationFrame(idFrame);
});

const keAtas = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <transition name="fade-slide">
    <div
      v-if="tampil"
      @click="keAtas"
      class="flex fixed justify-center items-center bottom-5 right-5 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 z-50 cursor-pointer rounded-full"
    >
      <svg viewBox="0 0 36 36" class="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
        <!-- Lintasan cincin: samar saja, sekadar penanda batas penuhnya -->
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="text-black/10 dark:text-white/20"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="#13B89C"
          stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="KELILING"
          :stroke-dashoffset="sisaCincin"
          class="transition-[stroke-dashoffset] duration-100 ease-out"
        />
      </svg>

      <img
        :src="Tooltip"
        :alt="$t('common.backToTop')"
        class="relative w-[62%] h-[62%] object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  </transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
