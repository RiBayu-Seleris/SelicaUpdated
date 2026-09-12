<script setup>
import { computed } from "vue";

const props = defineProps({
  arah: {
    type: String,
    default: "kanan",
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
  props.mirror ? ({ atas: "bawah", bawah: "atas" }[props.arah] ?? props.arah) : props.arah,
);
</script>

<template>
  <figure
    :data-aos="`garis-${arahTampil}`"
    data-aos-duration="1200"
    :class="[
      `pointer-events-none absolute sm:flex sm:absolute ${positionClass} ${heightClass}`,
      { 'scale-y-[-1]': mirror },
    ]"
  >
    <img
      src="@/assets/Products/images/CareOrnament2.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat object-contain lg:object-cover w-full h-full opacity-40"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>
