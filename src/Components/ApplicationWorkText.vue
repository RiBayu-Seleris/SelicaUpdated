<script setup>
defineProps({
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
    class="relative w-full flex flex-col justify-center items-center z-20 lg:pl-10 xls:pl-20"
  >
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto flex px-8">
        <p
          class="text-[#2E504E] text-[24px] md:text-[37px] lg:text-[57px] font-[500]"
        >
          How Application Work
        </p>
      </div>
      <div class="w-full h-auto flex pl-8">
        <p
          :class="[
            `${textcolor} text-[19px] md:text-[23px] lg:text-[27px] font-[500]`,
          ]"
        >
          {{ productname }}
        </p>
      </div>
    </div>
  </div>
</template>
