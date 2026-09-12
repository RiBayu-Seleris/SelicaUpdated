<script setup>
import Disclaimer from "@/components/SCA/Disclaimer.vue";
</script>

<template>
  <div class="relative w-full min-h-screen bg-white">
    <header data-aos="fade" class="w-full border-b border-[#E8EEF1]">
      <div class="max-w-[900px] mx-auto px-8 md:px-10 pt-36 pb-10 md:pt-44 md:pb-12">
        <h1 class="text-[#0E3B4D] font-bold text-[30px] md:text-[40px] leading-tight">
          {{ $t("nav.disclaimer") }}
        </h1>
      </div>
    </header>

    <div data-aos="fade-up" class="max-w-[900px] mx-auto px-8 md:px-10 py-12 md:py-16">
      <Disclaimer />
    </div>
  </div>
</template>
