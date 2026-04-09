<script setup>
defineProps({
  title: {
    type: String,
  },
  titlecolor: {
    type: String,
    default: "text-[#FAFAFA]",
  },
  subtitle: {
    type: String,
  },
  subtitlecolor: {
    type: String,
    default: "text-[#FAFAFA]",
  },
  description: {
    type: String,
  },
  descriptioncolor: {
    type: String,
    default: "text-[#FAFAFA]",
  },
});
</script>

<template>
  <div class="w-full h-auto pt-[120px] md:pt-[150px] lg:pt-[120px] space-y-5 md:space-y-6">
    <div class="w-full h-auto flex flex-col mx-auto justify-center sm:px-10 md:px-0">
      <p
        :class="[
          `max-smallest:text-[14px] text-[16px] sm:text-[26px] md:text-[36px] lg:text-[40px] font-medium ${titlecolor} text-center sm:leading-[35px] md:px-10 md:justify-center md:leading-relaxed`,
        ]"
      >
        {{ title }}
        <span :class="[`font-[600] block ${subtitlecolor}`]">{{ subtitle }}</span>
      </p>
    </div>
    <div class="xl:w-[700px] px-10 sm:px-16 h-auto flex flex-col mx-auto justify-center">
      <p
        :class="[
          `${descriptioncolor} max-smallest:text-[10px] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center font-[400]`,
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
