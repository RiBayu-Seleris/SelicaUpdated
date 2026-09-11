<script setup>
/**
 * Bola dunia dengan cincin relasi, dipotong tepi kanan layar.
 *
 * KENAPA BENTUKNYA BEGINI
 * Dua hal yang dijanjikan bagian ini, digabung jadi satu gambar:
 * 1. Kerjanya tidak terikat tempat — "bisa dijalankan dari mana saja". Itu
 *    bola dunianya.
 * 2. Penghasilannya datang dari orang di sekeliling Anda, dan makin jauh
 *    lingkarannya makin sedikit yang sampai. Itu cincin-cincinnya: simpul
 *    duduk di cincin yang berbeda-beda jaraknya, dan cincin yang lebih luar
 *    digambar lebih samar.
 *
 * KENAPA SETENGAH
 * Seluruh gambar ini bulat dan terpusat, lalu pemanggilnya menggesernya
 * setengah badan keluar tepi kanan — persis cara pratinjau dashboard di
 * bagian Selica Hub menembus ke kanan. Yang memotong adalah `overflow-hidden`
 * milik section, bukan bingkai SVG-nya, jadi potongannya jatuh tepat di tepi
 * layar dan bukan di garis tak terlihat di tengah halaman.
 *
 * Karena itu seluruh isinya muat utuh di dalam bingkai dan dipusatkan: begitu
 * separuh kanannya keluar layar, yang tersisa adalah separuh kiri yang rapi,
 * bukan potongan yang kebetulan.
 *
 * SEMUANYA LINGKARAN DAN ELIPS, TIDAK ADA KURVA YANG DIGAMBAR TANGAN
 * Bentuk bola diturunkan dari rumus, jadi tiap garis lintangnya benar-benar
 * duduk di permukaan bola yang sama — bukan didekati dengan kurva yang
 * "kira-kira mirip". Itu yang membuatnya tidak terlihat penyok.
 */
defineProps({
  // Kelas posisi dari komponen pemanggil, mis. "inset-y-0 right-[-25%] w-1/2".
  positionClass: { type: String, default: "" },
  // Dibuat sebagai prop supaya satu ornamen ini bisa dipakai di atas latar
  // terang maupun gelap.
  warna: { type: String, default: "#14B89B" },
  opasitas: { type: Number, default: 0.2 },
});

/* Bingkai bujur sangkar, semuanya berbagi satu titik pusat di tengahnya.
   Cincin terluar sengaja masih di dalam bingkai — kalau ia melebihi bingkai,
   ia akan terpotong lurus oleh tepi SVG, dan potongan lurus di tengah halaman
   itu yang membuat ornamen terlihat seperti gambar yang salah ukur. */
const PUSAT = 480;
const JARI = 210;

const SIN = 0.342; // sin 20°, sudut pandang di atas khatulistiwa
const COS = 0.94; // cos 20°

/* ------------------------------------------------------------
   Bola dunia

   Dari satu sudut pandang 20 derajat itu semuanya mengikuti:
   - garis lintang pada ketinggian h punya jari-jari √(R² − h²);
   - ia tergambar sebagai elips setinggi jari-jari × sin 20°;
   - dan pusatnya bergeser sejauh h × cos 20°.

   Karena ketiganya diturunkan dari sudut yang sama, tidak ada garis lintang
   yang menyembul keluar batas bolanya — kesalahan yang paling cepat membuat
   gambar bola terlihat salah.
------------------------------------------------------------ */
const lintang = [0, 105, 170].flatMap((h) => {
  const jari = Math.sqrt(JARI * JARI - h * h);
  const rx = +jari.toFixed(1);
  const ry = +(jari * SIN).toFixed(1);
  const geser = +(h * COS).toFixed(1);
  return h === 0
    ? [{ cy: PUSAT, rx, ry }]
    : [
        { cy: PUSAT - geser, rx, ry },
        { cy: PUSAT + geser, rx, ry },
      ];
});

// Garis bujur: elips setinggi penuh dengan lebar yang menyempit ke tengah.
const bujur = [+(JARI * 0.667).toFixed(1), +(JARI * 0.333).toFixed(1)];

/* ------------------------------------------------------------
   Cincin relasi dan simpulnya

   Sudut simpul dipilih di rentang 90°–270°, yaitu separuh KIRI lingkaran.
   Separuh kanan berada di luar layar, jadi simpul yang diletakkan di sana
   tidak akan pernah terlihat siapa pun.

   Koordinatnya dihitung di sini dari sudut dan jari-jarinya. Kalau ditulis
   tangan satu per satu, satu salah ketik cukup untuk membuat sebuah simpul
   melayang lepas dari cincinnya.
------------------------------------------------------------ */
const cincin = [
  { r: 280, tebal: 1.5, alpha: 0.55 },
  { r: 350, tebal: 1.4, alpha: 0.4 },
  { r: 415, tebal: 1.2, alpha: 0.28 },
  { r: 470, tebal: 1.1, alpha: 0.18 },
];

const simpul = [
  { r: 280, sudut: 148, ukuran: 9 },
  { r: 280, sudut: 212, ukuran: 5.5 },
  { r: 350, sudut: 116, ukuran: 7 },
  { r: 350, sudut: 248, ukuran: 9.5 },
  { r: 415, sudut: 168, ukuran: 6 },
  { r: 415, sudut: 199, ukuran: 7.5 },
  { r: 470, sudut: 132, ukuran: 5 },
  { r: 470, sudut: 228, ukuran: 5.5 },
].map(({ r, sudut, ukuran }) => {
  const rad = (sudut * Math.PI) / 180;
  return {
    ukuran,
    cx: +(PUSAT + r * Math.cos(rad)).toFixed(1),
    cy: +(PUSAT + r * Math.sin(rad)).toFixed(1),
  };
});
</script>

<template>
  <!-- `meet` (bawaan): seluruh gambar dikecilkan sampai muat, tidak dipotong
       sama sekali dari dalam. Pemotongannya diserahkan sepenuhnya pada tepi
       section — itulah yang membuat bolanya terbelah tepat di tepi layar. -->
  <svg
    :class="['pointer-events-none absolute select-none', positionClass]"
    viewBox="0 0 960 960"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    aria-hidden="true"
    :style="{ opacity: opasitas }"
  >
    <!-- Cincin relasi. Digambar lebih dulu supaya bola dunianya duduk di atas. -->
    <g :stroke="warna" fill="none">
      <circle
        v-for="(c, i) in cincin"
        :key="`cincin-${i}`"
        :cx="PUSAT"
        :cy="PUSAT"
        :r="c.r"
        :stroke-width="c.tebal"
        :opacity="c.alpha"
      />
    </g>

    <g :fill="warna">
      <circle
        v-for="(n, i) in simpul"
        :key="`simpul-${i}`"
        :cx="n.cx"
        :cy="n.cy"
        :r="n.ukuran"
        opacity="0.85"
      />
    </g>

    <!-- Bola dunia. Permukaannya ditutup lebih dulu supaya cincin yang lewat
         di belakangnya tidak terlihat menembusnya. -->
    <circle :cx="PUSAT" :cy="PUSAT" :r="JARI" :fill="warna" opacity="0.07" />

    <g :stroke="warna" fill="none">
      <circle :cx="PUSAT" :cy="PUSAT" :r="JARI" stroke-width="1.6" />

      <g stroke-width="1.1" opacity="0.7">
        <ellipse
          v-for="(l, i) in lintang"
          :key="`lintang-${i}`"
          :cx="PUSAT"
          :cy="l.cy"
          :rx="l.rx"
          :ry="l.ry"
        />
        <ellipse
          v-for="(rx, i) in bujur"
          :key="`bujur-${i}`"
          :cx="PUSAT"
          :cy="PUSAT"
          :rx="rx"
          :ry="JARI"
        />
        <line :x1="PUSAT" :y1="PUSAT - JARI" :x2="PUSAT" :y2="PUSAT + JARI" />
      </g>
    </g>
  </svg>
</template>
