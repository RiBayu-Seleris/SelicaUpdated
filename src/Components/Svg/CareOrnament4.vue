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
      { 'scale-x-[-1]': mirror },
    ]"
  >
    <img
      src="@/assets/Products/images/Care/frame-download.png"
      alt="CareOrnament"
      class="object-center w-full h-full lg:object-contain 2xls:object-fill"
    />
  </figure>
</template>
