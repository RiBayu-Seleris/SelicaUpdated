<script setup>
import { computed } from "vue";

/**
 * Ornamen garis.
 *
 * `arah` menentukan dari mana garisnya tersingkap: "kiri", "kanan", "atas",
 * "bawah", atau "dalam" (dari tengah melebar ke dua sisi). Geraknya sendiri
 * ditulis di src/style.css sebagai animasi AOS buatan sendiri, jadi
 * pemicunya sama persis dengan section tempatnya berada.
 */
const props = defineProps({
  arah: {
    type: String,
    default: "kiri",
  },
  positionClass: {
    type: String,
  },
  heightClass: {
    type: String,
  },
  mirror: {
    type: Boolean,
    default: false,
  },
});

/**
 * Ornamen ini dicerminkan pada sumbu mendatar (scale-x) saat `mirror` menyala.
 *
 * Potongan clip-path bekerja pada ruang koordinat elemen SEBELUM transform,
 * jadi bukaan yang dimulai dari satu sisi akan TERLIHAT dimulai dari sisi
 * seberangnya. Arahnya dibalik di sini supaya pemanggil cukup menyebut arah
 * yang ingin dilihat, tanpa perlu ingat ornamen mana yang dicerminkan.
 */
const arahTampil = computed(() =>
  props.mirror ? ({ kiri: "kanan", kanan: "kiri" }[props.arah] ?? props.arah) : props.arah,
);
</script>

<template>
  <figure
    :data-aos="`garis-${arahTampil}`"
    data-aos-duration="1200"
    :class="[
      `pointer-events-none absolute sm:flex sm:absolute ${positionClass} ${heightClass}`,
      { 'scale-x-[-1]': mirror },
    ]"
  >
    <img
      src="@/assets/Products/images/Care/frame-download.png"
      alt="CareOrnament"
      class="object-center w-full h-full lg:object-contain 2xls:object-fill"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>
