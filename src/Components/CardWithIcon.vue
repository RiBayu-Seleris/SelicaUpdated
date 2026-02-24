<script setup>
defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageClass: {
    type: String,
    default: "",
  },
  subtitleClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <!-- Desktop -->
  <div class="flex w-full h-auto">
    <div class="flex flex-row w-full h-full gap-x-5">
      <!-- w-[15%] xl:w-[25%]  -->
      <div class="flex w-full max-w-max h-full">
        <img
          :src="icon"
          alt="Icon"
          class="w-[45px] h-[45px] md:w-[45px] md:h-[45px] lg:w-[45px] lg:h-[45px] xl:w-[50px] xl:h-[50px] p-1 md:p-2 xl:p-2 object-contain bg-white dark:bg-[#323232] rounded-full shadow-lg"
        />
      </div>
      <div
        class="flex flex-col w-[85%] xl:w-full h-auto justify-start items-start space-y-1 lg:space-y-2"
      >
        <div class="flex w-full h-auto text-[#195279] dark:text-[#FAFAFA]">
          <p class="text-[14px] md:text-[19px] lg:text-[16px] xl:text-[20px]">
            {{ title }}
          </p>
        </div>
        <div
          :class="`flex w-full h-auto text-[#4F90BC] dark:text-[#6F6F6F] ${subtitleClass}`"
        >
          <p class="text-[12px] md:text-[14px] lg:text-[16px]">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
