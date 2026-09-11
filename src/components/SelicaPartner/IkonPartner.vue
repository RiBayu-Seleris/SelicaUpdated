<script setup>
import { computed } from "vue";

/**
 * Kumpulan ikon garis untuk halaman SELICA Partner.
 *
 * KENAPA DIGAMBAR SENDIRI, BUKAN BERKAS GAMBAR
 * Semuanya memakai `currentColor`, jadi satu ikon yang sama bisa dipakai di
 * atas ubin teal, di dalam tombol gelap, atau di keterangan abu-abu tanpa
 * perlu berkas terpisah untuk tiap warna. Ukurannya juga ditentukan dari
 * kelas pemanggil (h-5 w-5 dan seterusnya), bukan dari isi berkasnya.
 *
 * Semua digambar pada kanvas 24x24 dengan tebal garis yang sama, supaya
 * bobotnya seragam saat berjejer.
 */

const props = defineProps({
  nama: { type: String, required: true },
});

/* Dipakai dua kali di bawah: sebagai `lapis` dan sebagai `jaringan`. */
const LAPIS = [
  "M12 3.2 3.4 7.7 12 12.2l8.6-4.5L12 3.2Z",
  "m3.4 12.3 8.6 4.5 8.6-4.5",
  "m3.4 16.6 8.6 4.5 8.6-4.5",
];

/**
 * `garis` = jalur bergaris, `isi` = jalur berisi penuh.
 * Dipisah karena keduanya perlu perlakuan berbeda: yang bergaris memakai
 * stroke, yang berisi memakai fill.
 */
const IKON = {
  // Dua orang: dipakai untuk label program dan untuk butir komisi, karena
  // yang dibicarakan memang hubungan antarorang.
  orang: {
    garis: [
      "M9 11.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z",
      "M2.8 19.8c0-3.1 2.8-5.3 6.2-5.3s6.2 2.2 6.2 5.3",
      "M16.4 5.4a3.4 3.4 0 0 1 0 6.6",
      "M17.8 15c2 .6 3.4 2.1 3.4 4.8",
    ],
  },
  // Perisai bercentang: janji "transparan" itu soal bisa diperiksa, dan
  // centang di dalam perisai adalah tanda "sudah dicek" yang paling terbaca.
  perisai: {
    garis: [
      "M12 2.9 4.8 5.8v5.6c0 4.2 3 7.9 7.2 9.5 4.2-1.6 7.2-5.3 7.2-9.5V5.8L12 2.9Z",
      "m8.9 11.9 2.3 2.3 4-4.4",
    ],
  },
  // Medali: jenjang menuju Leader. Pita di bawahnya yang membuatnya terbaca
  // sebagai pencapaian, bukan sekadar lencana.
  medali: {
    garis: [
      "M12 14.6a5.3 5.3 0 1 0 0-10.6 5.3 5.3 0 0 0 0 10.6Z",
      "m8.6 14 -1.2 7 4.6-2.5 4.6 2.5-1.2-7",
      "m12 6.8 .95 1.93 2.13.31-1.54 1.5.36 2.12L12 11.66l-1.9 1-.37-2.12-1.54-1.5 2.13-.31L12 6.8Z",
    ],
  },
  // Tumpukan lapis: bentuk paling langsung untuk "maksimal dua layer".
  lapis: { garis: LAPIS },
  // Manfaat "komisi jaringan dua layer" menggambarkan hal yang persis sama,
  // jadi memakai gambar yang sama pula — bukan gambar kedua yang artinya
  // sama tapi bentuknya beda sedikit.
  jaringan: { garis: LAPIS },

  // Label harga dengan lubang gantungannya: bicara soal biaya. Dipakai butir
  // "bergabung tanpa biaya", di mana kalimatnyalah yang menyatakan "tanpa".
  gratis: {
    garis: [
      "M13.2 3H3v10.2l7.8 7.8 10.2-10.2L13.2 3Z",
      "M8.5 7a1.5 1.5 0 1 0-3 0 1.5 1.5 0 1 0 3 0Z",
    ],
  },

  // Tanda persen di dalam koin: dua hal yang dibicarakan butir komisi
  // sekaligus, yaitu persentase dan uang.
  komisi: {
    garis: [
      "M21 12a9 9 0 1 0-18 0 9 9 0 1 0 18 0Z",
      "m15 9-6 6",
      "M10.4 9.3a1.1 1.1 0 1 0-2.2 0 1.1 1.1 0 1 0 2.2 0Z",
      "M15.8 14.7a1.1 1.1 0 1 0-2.2 0 1.1 1.1 0 1 0 2.2 0Z",
    ],
  },

  // Lembar bertulis dengan sudut terlipat: materi belajar di dalam sistem.
  panduan: {
    garis: ["M14 3.4H6.4v17.2H18V7.4L14 3.4Z", "M14 3.4v4h4", "M9.2 12.4h5.6", "M9.2 16h5.6"],
  },

  // Bidang yang terbagi jadi beberapa panel: bentuk baku sebuah dasbor.
  dashboard: {
    garis: ["M4.6 4.6h14.8v14.8H4.6V4.6Z", "M11 4.6v14.8", "M11 11.4h8.4"],
  },

  // Jam: butirnya berjudul "waktu dan tempat bebas", dan waktu yang bisa
  // diatur sendiri itu bagian yang paling bisa digambar.
  fleksibel: {
    garis: ["M21 12a9 9 0 1 0-18 0 9 9 0 1 0 18 0Z", "M12 7.4V12l3.2 1.9"],
  },
  panah: {
    garis: ["M4.5 12h14", "m12.6 6.1 5.9 5.9-5.9 5.9"],
  },
  putar: {
    isi: ["M9.6 7.4 16.4 12l-6.8 4.6V7.4Z"],
  },
  // Tetikus dengan roda yang bergerak turun — isyarat gulir.
  tetikus: {
    garis: [
      "M12 2.9c-2.3 0-4.1 1.9-4.1 4.2v9.8c0 2.3 1.8 4.2 4.1 4.2s4.1-1.9 4.1-4.2V7.1c0-2.3-1.8-4.2-4.1-4.2Z",
    ],
    roda: true,
  },
};

const ikon = computed(() => IKON[props.nama] ?? IKON.panah);
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g
      v-if="ikon.garis"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path v-for="(d, i) in ikon.garis" :key="i" :d="d" />
    </g>
    <g v-if="ikon.isi" fill="currentColor">
      <path v-for="(d, i) in ikon.isi" :key="i" :d="d" />
    </g>
    <circle v-if="ikon.roda" class="roda" cx="12" cy="7.6" r="1.15" fill="currentColor" />
  </svg>
</template>

<style scoped>
/* Roda tetikusnya turun berulang. Ini satu-satunya bagian ikon yang bergerak,
   dan hanya karena tugasnya memang memberi tahu bahwa halaman bisa digulir. */
.roda {
  animation: roda 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes roda {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  25%,
  60% {
    opacity: 1;
  }
  100% {
    transform: translateY(5px);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .roda {
    animation: none;
  }
}
</style>
