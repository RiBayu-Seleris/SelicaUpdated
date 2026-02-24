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
  <figure
    :class="[`hidden sm:flex sm:absolute ${positionClass} ${heightClass} `]"
  >
    <img
      src="@/assets/Products/images/CareOrnament2.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat w-full h-full"
    />
  </figure>
</template>
