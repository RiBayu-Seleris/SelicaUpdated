<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // [{ image, title, content }]
  },
});
</script>

<template>
  <div class="hidden md:flex relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
    <div class="w-full h-auto py-0 flex justify-center">
      <div class="relative w-full h-auto bg-red-700">
        <!-- SVG Arc Line -->
        <div class="absolute -top-[3%] xl:top-[0%] left-0 w-full h-full py-0 flex">
          <div class="w-full h-full relative" style="top: 0; left: 0">
            <svg
              class="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 440 310"
              preserveAspectRatio="none"
              fill="none"
            >
              <!-- Track abu -->
              <path
                d="M 0 290 Q 220 100, 440 290"
                stroke="#E5E7EB"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
              />
              <!-- Progress hijau -->
              <path
                d="M 0 290 Q 220 100, 440 290"
                stroke="#13B89C"
                stroke-width="3"
                stroke-linecap="round"
                fill="none"
                stroke-dasharray="700"
                class="transition-all duration-500 ease-out"
              />
            </svg>
          </div>
        </div>

        <!-- Cards -->
        <div class="w-full h-auto flex flex-row justify-between px-12 xl:px-32">
          <div
            v-for="(data, index) in items"
            :key="index"
            class="bg-red-500 w-[200px] h-[400px] xl:w-[350px] xl:h-[500px] flex flex-col gap-y-10 xl:gap-y-0 justify-start xl:justify-center items-center shrink-0"
            :class="index === 1 ? '' : ''"
          >
            <!-- Image -->
            <div
              class="w-full h-[50%] xl:h-[70%] shrink-0 flex justify-center bg-yellow-500"
              :class="index === 1 ? 'items-start xl:items-start' : 'items-start xl:items-end'"
            >
              <img
                :src="data.image"
                :alt="data.title"
                class="w-full h-full xl:h-[90%] object-contain"
              />
            </div>

            <!-- Number + Text -->
            <div
              class="relative w-full h-[30%] shrink-0 flex flex-col gap-y-8 xl:gap-y-10 items-center bg-blue-600"
            >
              <div
                class="relative w-10 h-10 xl:w-12 xl:h-12 top-0 flex justify-center items-center p-2 bg-[#13B89C] border-4 border-white rounded-full shadow-[0px_10px_15.1px_0px_rgba(19,184,156,0.25)]"
              >
                <span class="text-[#FFFFFF] text-[18px]">{{ index + 1 }}</span>
              </div>
              <div class="w-full h-full flex flex-col gap-y-2 items-center">
                <p class="text-center text-[#374151] font-[600] text-[16px] xl:text-[24px]">
                  {{ data.title }}
                </p>
                <p
                  class="text-center text-[#515E71] font-[400] text-[12px] xl:text-[16px]"
                  v-html="data.content"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
