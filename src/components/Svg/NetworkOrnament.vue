<script setup>
/**
 * Ornamen jaringan: titik-titik yang saling terhubung garis melengkung.
 *
 * KENAPA BENTUKNYA BEGINI
 * Dua alasan, bukan sekadar hiasan:
 * 1. Logo SELICA memakai motif kepala dengan simpul-simpul yang terhubung —
 *    ornamen ini mengulang bahasa visual yang sama.
 * 2. Program SELICA Partner strukturnya memang jaringan (upline, downline,
 *    dua layer). Jadi bentuknya ikut menjelaskan isi halamannya.
 *
 * Digambar sebagai SVG langsung, bukan berkas gambar, supaya ringan dan
 * warnanya bisa mengikuti latar tempat dia dipasang.
 */
defineProps({
  // Kelas posisi dari komponen pemanggil, mis. "top-10 -left-20 w-[420px]".
  positionClass: { type: String, default: "" },
  // Warna garis dan titik. Dibuat sebagai prop supaya satu ornamen ini bisa
  // dipakai di atas latar gelap maupun terang.
  warna: { type: String, default: "#13B89C" },
  opasitas: { type: Number, default: 0.25 },
});
</script>

<template>
  <svg
    :class="['pointer-events-none absolute select-none', positionClass]"
    viewBox="0 0 400 300"
    fill="none"
    aria-hidden="true"
    :style="{ opacity: opasitas }"
  >
    <!-- Garis penghubung. Melengkung, bukan lurus, supaya terbaca sebagai
         jaringan organik dan bukan diagram teknis. -->
    <g :stroke="warna" stroke-width="1.2" fill="none">
      <path d="M40 210 C 110 190, 120 90, 196 74" />
      <path d="M196 74 C 260 62, 300 120, 344 96" />
      <path d="M40 210 C 120 250, 210 240, 268 196" />
      <path d="M268 196 C 310 166, 316 124, 344 96" />
      <path d="M196 74 C 210 130, 236 168, 268 196" />
    </g>

    <!-- Simpulnya. Ukurannya sengaja berbeda-beda: simpul besar membaca
         sebagai upline, yang kecil sebagai downline. -->
    <g :fill="warna">
      <circle cx="40" cy="210" r="7" />
      <circle cx="196" cy="74" r="10" />
      <circle cx="344" cy="96" r="6" />
      <circle cx="268" cy="196" r="8" />
      <circle cx="120" cy="140" r="3.5" />
      <circle cx="300" cy="150" r="3" />
      <circle cx="150" cy="235" r="3" />
    </g>
  </svg>
</template>
