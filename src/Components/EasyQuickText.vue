<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  subtitlecolor: {
    type: String,
  },
  subsubtitle: {
    type: String,
  },
});
</script>

<template>
  <div class="w-full mx-auto h-auto flex justify-center items-center">
    <p
      class="text-[#2E504E] font-[500] md:text-[27px] lg:text-[37px] text-center leading-normal lg:leading-snug"
    >
      {{ title }}
      <span class="block">{{ subtitle }} </span>
    </p>
  </div>
  <div class="w-full h-auto flex justify-center items-center">
    <p
      :class="[
        `${subtitlecolor} md:text-[15px] lg:text-[21px] font-[400] text-center md:text-start`,
      ]"
    >
      {{ subsubtitle }}
    </p>
  </div>
</template>
