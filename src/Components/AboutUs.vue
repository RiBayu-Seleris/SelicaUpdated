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
  <div class="w-full h-auto flex flex-col">
    <div class="w-full h-auto flex justify-center">
      <p
        class="text-[#2E504E] text-[37px] md:text-[47px] lg:text-[57px] font-[500]"
      >
        {{ title }}
      </p>
    </div>
    <div class="w-full h-auto flex justify-center">
      <p
        :class="[
          `${subtitleColor} text-[17px] md:text-[23px] lg:text-[27px] font-[500]`,
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
