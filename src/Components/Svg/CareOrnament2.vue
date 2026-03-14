<script setup>
defineProps({
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
</script>

<template>
  <figure
    :class="[
      `absolute sm:flex sm:absolute ${positionClass} ${heightClass}`,
      { 'scale-y-[-1]': mirror },
    ]"
  >
    <img
      src="@/assets/Products/images/CareOrnament2.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat object-cover w-full h-full opacity-40"
    />
  </figure>
</template>
