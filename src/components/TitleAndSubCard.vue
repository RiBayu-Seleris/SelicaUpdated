<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  subtitleColor: {
    type: String,
  },
});
</script>

<template>
  <div class="w-full h-auto flex flex-col justify-center gap-y-2">
    <div class="w-full h-auto flex justify-center items-center">
      <p
        class="text-[#2E504E] font-[500] md:text-[27px] lg:text-[37px] text-center"
      >
        {{ title }}
      </p>
    </div>
    <div class="w-full h-auto flex justify-center items-center">
      <p
        :class="[
          ` md:text-[15px] lg:text-[21px] font-[400] text-center md:text-start ${subtitleColor}`,
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
