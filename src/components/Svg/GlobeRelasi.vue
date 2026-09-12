<script setup>
defineProps({
  positionClass: { type: String, default: "" },
  warna: { type: String, default: "#14B89B" },
  opasitas: { type: Number, default: 0.2 },
});

const PUSAT = 480;
const JARI = 210;

const SIN = 0.342; // sin 20°, sudut pandang di atas khatulistiwa
const COS = 0.94; // cos 20°

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

const bujur = [+(JARI * 0.667).toFixed(1), +(JARI * 0.333).toFixed(1)];

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
  <svg
    :class="['pointer-events-none absolute select-none', positionClass]"
    viewBox="0 0 960 960"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    aria-hidden="true"
    :style="{ opacity: opasitas }"
  >
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
