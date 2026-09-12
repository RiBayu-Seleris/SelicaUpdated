<script setup>
import { computed } from "vue";

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
