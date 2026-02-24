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
  <div
    class="w-full h-auto pt-[90px] md:pt-[100px] lg:pt-[120px] space-y-5 md:space-y-6"
  >
    <div
      class="w-full h-auto flex flex-col mx-auto justify-center px-10 md:px-0"
    >
      <p
        :class="[
          `text-[24px] md:text-[37px] lg:text-[40px] font-medium ${titlecolor} text-center leading-[35px] md:px-10 md:justify-center md:leading-relaxed`,
        ]"
      >
        {{ title }}
        <span :class="[`font-[600] block ${subtitlecolor}`]">{{
          subtitle
        }}</span>
      </p>
    </div>
    <div
      class="xl:w-[700px] px-10 sm:px-16 h-auto flex flex-col mx-auto justify-center"
    >
      <p
        :class="[
          `${descriptioncolor} text-[14px] sm:text-[16px] md:text-[20px] lg:text-[20px] text-center font-[400]`,
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
