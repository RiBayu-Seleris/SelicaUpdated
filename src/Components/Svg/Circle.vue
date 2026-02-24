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
  <figure :class="[`absolute max-w-full  ${positionClass} ${heightClass} `]">
    <img
      src="@/assets/Products/images/circle.png"
      alt="Circle"
      class="object-contain w-full h-full"
    />
  </figure>
</template>
