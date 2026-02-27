<script setup>
defineProps({
  positionClass: {
    type: String,
  },
  heightClass: {
    type: String,
  },
});
</script>

<template>
  <!-- w-auto -->
  <figure :class="[`absolute sm:flex sm:absolute ${positionClass} ${heightClass}`]">
    <img
      src="@/assets/Products/images/Care/frame-download.png"
      alt="CareOrnament"
      class="object-center w-full h-full lg:object-contain 2xls:object-fill"
    />
  </figure>
</template>
