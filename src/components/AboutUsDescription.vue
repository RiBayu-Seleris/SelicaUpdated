<script setup>
defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex flex-col md:flex-row justify-center md:gap-x-10 xl:gap-x-16 lg:px-10"
  >
    <figure class="w-full lg:w-[35%] justify-center h-auto flex">
      <img :src="image" alt="" class="h-[270px] md:h-auto lg:h-auto xl:h-auto" />
    </figure>
    <div
      class="w-full lg:w-1/2 h-auto flex flex-col px-8 md:px-0 pt-10 md:pt-0 space-y-2 md:space-y-4 lg:space-y-8 justify-center"
    >
      <p
        class="text-[#2E504E] max-smallest:text-[18px] text-[22px] md:text-[24px] lg:text-[30px] font-[600]"
      >
        <!-- AI Health Care Application -->
        {{ title }}
      </p>
      <p
        class="text-[#535862] max-smallest:text-[12px] text-[14px] md:text-[14px] lg:text-[16px] xl:text-[18px] md:pr-8 lg:pr-0 xl:pr-20"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
