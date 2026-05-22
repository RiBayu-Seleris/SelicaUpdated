<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="snap-start xl:snap-center shrink-0">
    <figure class="w-full max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex">
      <!-- src="@/assets/Products/images/Single-Phone.png" -->
      <img
        :src="image"
        alt=""
        class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-contain"
      />
    </figure>
  </div>
</template>
