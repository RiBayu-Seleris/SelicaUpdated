<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import Tooltip from "@/assets/images/tooltip.png";

/**
 * Tombol "kembali ke atas" dengan cincin kemajuan.
 *
 * Cincinnya terisi mengikuti posisi gulir: kosong saat di puncak halaman,
 * penuh 100% saat sudah sampai dasar (setelah footer).
 */

const scrollStore = useScrollStore();

// Tombol baru muncul setelah pengunjung mulai menggulir.
const tampil = computed(() => scrollStore.isScrolled);

/**
 * Keliling lingkaran cincin: 2 x pi x jari-jari.
 *
 * Jari-jarinya 16 pada kanvas 36x36 (lihat viewBox di bawah). Angka ini
 * dipakai untuk menggambar cincin dengan trik garis putus-putus:
 * - stroke-dasharray  = panjang satu "garis" = satu keliling penuh
 * - stroke-dashoffset = berapa panjang yang DISEMBUNYIKAN
 *
 * Jadi saat offset-nya satu keliling penuh, cincinnya tidak terlihat sama
 * sekali; saat offset-nya 0, cincinnya tergambar utuh.
 */
const KELILING = 2 * Math.PI * 16;

// Kemajuan gulir dalam persen, 0 sampai 100.
const kemajuan = ref(0);

const sisaCincin = computed(() => KELILING * (1 - kemajuan.value / 100));

/**
 * Seberapa jauh halaman bisa digulir, DISIMPAN.
 *
 * KENAPA TIDAK DIHITUNG TIAP KALI
 * Membaca scrollHeight memaksa browser menghitung ulang tata letak seluruh
 * halaman. Kalau dilakukan tiap gambar layar saat menggulir, gerakannya jadi
 * tersendat. Tingginya hanya berubah saat layar diubah ukuran atau isi
 * halaman berganti, jadi cukup dihitung ulang pada saat itu saja.
 */
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

  // Toleransi 2 piksel: gulir halus bergerak dalam pecahan piksel, jadi posisi
  // paling bawah bisa berhenti di 7999,6 dari 8000. Tanpa toleransi ini
  // cincinnya tidak pernah benar-benar menutup di dasar halaman.
  const sisaJarak = bisaDigulir - posisi;
  kemajuan.value = sisaJarak <= 2 ? 100 : (posisi / bisaDigulir) * 100;
};

// Diredam dengan requestAnimationFrame supaya perhitungannya paling banyak
// sekali per gambar layar, bukan tiap kali kejadian gulir datang.
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

  // Tinggi halaman juga berubah saat gambar selesai dimuat atau bagian yang
  // bisa dilipat dibuka — resize saja tidak menangkap itu.
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
      <!-- Cincin kemajuan.
           -rotate-90 memutar titik mulainya ke atas; tanpa itu cincin mulai
           terisi dari sisi kanan, bukan dari puncak. -->
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
        <!-- Bagian yang terisi mengikuti kemajuan gulir -->
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
/* Transisi muncul/hilang tombol. */
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
