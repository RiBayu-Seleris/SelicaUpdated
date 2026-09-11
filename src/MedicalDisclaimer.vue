<script setup>
import Disclaimer from "@/components/SCA/Disclaimer.vue";

/**
 * Halaman Medical Disclaimer & Legal Notice.
 *
 * Isinya diambil dari komponen yang sudah ada, jadi teks hukumnya cuma
 * tersimpan di SATU tempat — kalau nanti direvisi, tidak ada versi kembar
 * yang tertinggal.
 *
 * KENAPA HERO-NYA TIDAK GELAP
 * Halaman ini tidak mendaftarkan `heroGelap` di router, sehingga tulisan menu
 * otomatis memakai warna gelap. Itu memang yang diinginkan: dokumen hukum
 * dibaca, bukan dipamerkan, jadi latarnya dibuat terang dan tenang.
 *
 * Navbar dan footer tidak ditulis di sini — keduanya sudah dipasang sekali di
 * App.vue untuk semua halaman.
 *
 * Dua blok di bawah memakai `data-aos` seperti halaman lain. Kepalanya cukup
 * memudar di tempat karena sudah terlihat saat halaman dibuka; isi
 * dokumennya naik sedikit saat digulir.
 */
</script>

<template>
  <div class="relative w-full min-h-screen bg-white">
    <!-- Kepala halaman. Garis bawah tipis memisahkannya dari isi dokumen,
         tanpa perlu kotak atau latar berwarna. -->
    <header data-aos="fade" class="w-full border-b border-[#E8EEF1]">
      <div class="max-w-[900px] mx-auto px-8 md:px-10 pt-36 pb-10 md:pt-44 md:pb-12">
        <h1 class="text-[#0E3B4D] font-bold text-[30px] md:text-[40px] leading-tight">
          {{ $t("nav.disclaimer") }}
        </h1>
      </div>
    </header>

    <!-- Lebar dibatasi 900px supaya barisnya tidak terlalu panjang untuk
         dibaca. Teks hukum panjang, dan baris yang melebar penuh layar
         membuat mata kehilangan posisi saat pindah baris. -->
    <div data-aos="fade-up" class="max-w-[900px] mx-auto px-8 md:px-10 py-12 md:py-16">
      <Disclaimer />
    </div>
  </div>
</template>
