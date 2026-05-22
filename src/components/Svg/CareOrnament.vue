<script setup>
defineProps({
  positionClass: {
    type: String,
  },
});
</script>

<template>
  <!-- w-auto -->
  <figure :class="[`absolute w-full h-full ${positionClass}`]">
    <img
      src="@/assets/Products/images/CareOrnament.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat w-full h-full"
    />
  </figure>
</template>
