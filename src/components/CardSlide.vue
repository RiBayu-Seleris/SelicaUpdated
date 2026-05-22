<script setup>
defineProps({ image: String });
</script>

<template>
  <div
    class="flex w-[40%] h-[60px] sm:h-[70px] md:h-[80px] rounded-xl md:rounded-2xl shadow-md border-[0.1px] dark:border-[#FAFAFA]/25"
  >
    <div class="w-full h-full">
      <img :src="image" alt="partner" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
