<script setup>
defineProps({
  title: {
    type: String,
    default: "How Application Work",
  },
  productname: {
    type: String,
  },
  textcolor: {
    type: String,
  },
});
</script>

<template>
  <div
    class="relative w-full flex flex-col justify-center items-center z-20 pl-8 md:pl-12 lg:pl-16 xls:pl-20"
  >
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto flex px-0">
        <p
          class="text-[#2E504E] text-[20px] md:text-[36px] lg:text-[32px] xl:text-[50px] font-[500]"
        >
          <!-- How Application Work -->
          {{ title }}
        </p>
      </div>
      <div class="w-full h-auto flex pl-0">
        <p :class="[`${textcolor} text-[18px] md:text-[24px] lg:text-[26px] font-[500]`]">
          {{ productname }}
        </p>
      </div>
    </div>
  </div>
</template>
