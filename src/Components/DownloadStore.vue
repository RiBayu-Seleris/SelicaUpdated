<script setup>
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
</script>

<template>
  <div class="w-full h-auto flex flex-row justify-center px-8 md:px-0 gap-x-10">
    <div class="w-full h-full flex justify-center">
      <a
        href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
        target="_blank"
        rel="noopener noreferrer"
        class="flex w-full h-auto justify-start"
      >
        <figure class="w-full h-auto shadow-2xl">
          <img
            :src="playstore"
            alt="Playstore"
            class="w-full h-full object-contain object-center"
          />
        </figure>
      </a>
    </div>
    <div class="relative group w-full h-full">
      <img
        :src="appstore"
        alt="Appstore"
        class="w-full h-full object-contain object-center shadow-2xl"
      />

      <!-- Hover Overlay -->
      <div
        class="absolute flex w-full h-full items-center justify-center inset-0 group-hover:opacity-100 transition duration-300 bg-opacity-60 opacity-0"
      >
        <div
          class="w-full h-full bg-[#FDFDFD] bg-opacity-50 flex items-center justify-center text-white cursor-pointer rounded-md"
        >
          <span class="text-[14px] md:text-[17px] lg:text-[20px]"
            >Coming Soon!</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
