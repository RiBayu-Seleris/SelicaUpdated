<script setup>
defineProps({
  arah: {
    type: String,
    default: "dalam",
  },
  positionClass: {
    type: String,
  },
});
</script>

<template>
  <figure
    :data-aos="`garis-${arah}`"
    data-aos-duration="1200"
    :class="[`pointer-events-none absolute w-full h-full ${positionClass}`]"
  >
    <img
      src="@/assets/Products/images/CareOrnament.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat w-full h-full"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>
