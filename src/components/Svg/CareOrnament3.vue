<script setup>
defineProps({
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
});
</script>

<template>
  <figure
    :data-aos="`garis-${arah}`"
    data-aos-duration="1200"
    :class="[`pointer-events-none absolute sm:flex sm:absolute ${positionClass} ${heightClass}`]"
  >
    <img
      src="@/assets/Products/images/CareOrnament3.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat w-full h-full"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>
