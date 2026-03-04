<template>
  <div class="w-full h-auto flex flex-col gap-y-10">
    <!-- Header -->
    <div
      class="lg:max-w-xl mx-auto w-full flex flex-col gap-y-2 justify-center items-center text-center px-8 sm:px-0"
    >
      <p class="text-[#374151] font-[600] text-[24px] md:text-[32px] lg:text-[40px] leading-tight">
        {{ totalParameters }} Parameter Kesehatan
      </p>
      <p class="text-[#374151] font-[400] text-[14px] md:text-[16px]">
        Teknologi AI kami menganalisis spektrum kesehatan tubuh secara mendalam hanya dalam satu
        sesi pemindaian.
      </p>
    </div>

    <!-- Tabs -->
    <div
      class="w-full flex flex-row justify-start lg:justify-center gap-x-3 px-8 lg:px-0 overflow-x-auto snap-x snap-mandatory lg:overflow-x-visible lg:snap-none scrollbar-hide"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-5 py-2 rounded-full text-sm font-medium transition-all shrink-0',
          activeTab === tab.id
            ? 'bg-teal-500 text-white font-semibold'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        <span class="text-[12px] sm:text-[14px]">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="currentContent" class="grid grid-cols-2 md:grid-cols-3 gap-4 px-8 lg:px-4">
      <!-- Parameter Cards -->
      <div
        v-for="(param, index) in currentContent.parameters"
        :key="index"
        class="w-full h-[160px] md:h-[140px] lg:h-[150px] bg-[#EFF9F9] rounded-2xl flex justify-end p-5 flex-col"
      >
        <p class="font-bold text-[#1E293B] text-sm md:text-md lg:text-lg">{{ param.title }}</p>
        <p class="text-gray-400 text-xs md:text-[12px] lg:text-[14px] mt-1 leading-normal">
          {{ param.description }}
        </p>
      </div>

      <!-- Highlight Card -->
      <div
        v-if="currentContent.highlight"
        class="w-full h-[160px] md:h-[140px] lg:h-[150px] bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex flex-col items-center justify-center text-white"
      >
        <p class="text-[28px] lg:text-[34px] font-bold">{{ currentContent.highlight.count }}</p>
        <p class="text-sm md:text-md lg:text-lg font-semibold mt-2 px-3 lg:px-0 text-center">
          <span class="block">Parameter</span>
          <span class="block">{{ currentContent.highlight.label }}</span>
        </p>
      </div>
    </div>

    <!-- Footer Banner -->
    <div
      class="bg-[#0F2744] rounded-2xl mx-4 md:mx-8 flex flex-col gap-y-5 md:flex-row items-center justify-between px-4 py-5"
    >
      <div class="flex items-center gap-4">
        <div class="bg-[#1A3A5C] rounded-xl p-3">
          <!-- Icon placeholder -->
          <img src="@/assets/icons/microscope.svg" alt="Health Parameter Icon" srcset="" />
        </div>
        <div class="w-full h-auto flex flex-col lg:gap-y-2">
          <p class="text-white font-bold text-[14px] md:text-[16px] lg:text-[18px]">
            {{ footerInfo.title }}
          </p>
          <p class="text-gray-400 text-[12px] md:text-[12px] lg:text-[16px] pr-3">
            {{ footerInfo.description }}
          </p>
        </div>
      </div>
      <a
        :href="footerInfo.buttonLink"
        class="w-full md:w-auto justify-center flex bg-white text-[#0F2744] font-semibold px-3 lg:px-6 py-3 rounded-xl text-sm whitespace-nowrap hover:bg-gray-100 transition"
      >
        <span class="text-[12px]">{{ footerInfo.buttonLabel }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { tabs, tabContents, footerInfo } from "@/Data/Products/CareApplicator/HealthParameters.js";

const activeTab = ref(tabs[0].id);

const currentContent = computed(() => tabContents[activeTab.value] ?? null);
const totalParameters = computed(() =>
  Object.values(tabContents).reduce((total, tab) => total + tab.parameters.length, 0),
);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
