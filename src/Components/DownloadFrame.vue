<script setup>
import DownloadStore from "@/components/DownloadStore.vue";

defineProps({
  appname: {
    type: String,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex flex-col-reverse md:flex-row justify-between gap-x-20 px-0 md:px-10 lg:px-14"
  >
    <div
      class="w-full h-auto flex flex-col justify-center items-center px-8 md:pl-0 gap-y-6 md:gap-y-8 mt-10"
    >
      <div class="w-full h-auto">
        <p
          class="text-[#2E504E] text-[24px] sm:text-[34px] lg:text-[38px] xl:text-[46px] font-[500] leading-tight text-center md:text-left"
        >
          Download
          <br class="hidden md:block" />
          {{ appname }}
        </p>
      </div>
      <div class="w-full h-auto">
        <p
          class="text-[#535862] text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[20px] font-[400] text-center md:text-left"
        >
          {{ description }}
        </p>
      </div>
      <!-- DownloadStore -->
      <div class="w-full h-auto">
        <DownloadStore />
      </div>
    </div>
    <div class="w-full h-auto">
      <figure class="w-auto max-w-max mx-auto h-auto flex">
        <img
          :src="img"
          alt=""
          class="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-auto object-contain drop-shadow-[-5px_8px_5px_rgba(0,0,0,0.15)] md:drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
        />
      </figure>
    </div>
  </div>
</template>
