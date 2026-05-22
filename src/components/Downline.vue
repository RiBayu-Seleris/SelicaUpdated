<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ image, title, content }]
  },
});

const activeSlide = ref(0);
let touchStartX = 0;
let autoSlideTimer = null;

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 40) return;
  if (dx < 0 && activeSlide.value < props.items.length - 1) activeSlide.value++;
  else if (dx > 0 && activeSlide.value > 0) activeSlide.value--;
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % props.items.length;
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

onMounted(() => startAutoSlide());
onUnmounted(() => clearInterval(autoSlideTimer));
</script>

<template>
  <!-- Mobile Slider (< md) -->
  <div
    class="md:hidden relative w-full overflow-hidden mt-10"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
    >
      <div
        v-for="(data, index) in items"
        :key="index"
        class="w-full shrink-0 flex flex-col items-center gap-y-5 px-6 pb-0 pt-4"
      >
        <!-- Image -->
        <div class="w-auto h-[50%] flex items-center justify-center">
          <img :src="data.image" :alt="data.title" class="w-full h-full object-contain" />
        </div>

        <!-- Number -->
        <div
          class="w-10 h-10 flex justify-center items-center p-2 bg-[#13B89C] border-4 border-white rounded-full shadow-[0px_10px_15.1px_0px_rgba(19,184,156,0.25)]"
        >
          <span class="text-white text-[14px]">{{ index + 1 }}</span>
        </div>

        <!-- Text -->
        <div class="flex flex-col gap-y-2 items-center">
          <p class="text-center text-[#374151] font-[600] text-[18px] sm:text-[22px]">
            {{ data.title }}
          </p>
          <p
            class="text-center text-[#515E71] font-[400] text-[14px] sm:text-[18px]"
            v-html="data.content"
          />
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="flex justify-center gap-x-2 mt-0">
      <button
        v-for="(_, i) in items"
        :key="i"
        @click="
          activeSlide = i;
          resetAutoSlide();
        "
        class="h-[8px] rounded-full transition-all duration-300"
        :class="i === activeSlide ? 'w-[24px] bg-[#13B89C]' : 'w-[8px] bg-gray-300'"
      />
    </div>
  </div>

  <!-- Desktop (>= md) -->
  <div
    class="hidden md:flex relative w-full h-auto mt-10 md:mt-12 lg:mt-32 xl:mt-20 max-w-[1440px] mx-auto"
  >
    <div class="w-full h-auto py-0 flex justify-center">
      <div class="relative w-full h-[400px] xl:h-[600px]">
        <!-- SVG Arc Line -->
        <div class="absolute -top-[3%] xl:top-[0%] left-0 w-full h-full py-0 flex">
          <div class="w-full h-full relative" style="top: 0; left: 0">
            <svg
              class="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 440 310"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 0 290 Q 220 100, 440 290"
                stroke="#E5E7EB"
                stroke-width="1"
                stroke-linecap="round"
                fill="none"
              />
              <path
                d="M 0 290 Q 220 100, 440 290"
                stroke="#13B89C"
                stroke-width="1"
                stroke-linecap="round"
                fill="none"
                stroke-dasharray="700"
                class="transition-all duration-500 ease-out"
              />
            </svg>
          </div>
        </div>

        <!-- Cards -->
        <div class="w-full h-auto flex flex-row justify-between px-12 lg:px-16 xl:px-28">
          <div
            v-for="(data, index) in items"
            :key="index"
            class="w-[200px] h-[400px] xl:w-[350px] xl:h-[550px] flex flex-col md:gap-y-5 xl:gap-y-10 justify-start xl:justify-center items-center shrink-0"
            :class="
              index === 1
                ? 'md:mt-[0%] lg:-mt-[4.5%] xl:-mt-[2%]'
                : 'md:mt-[6.5%] lg:mt-[4%] xl:mt-[7.8%]'
            "
          >
            <!-- Image -->
            <div
              class="w-auto shrink-0 flex justify-center"
              :class="
                index === 1
                  ? 'items-start h-[50%] lg:h-[60%] xl:h-[60%]'
                  : 'items-start h-[50%] lg:h-[55%] xl:h-[40%]'
              "
            >
              <img
                :src="data.image"
                :alt="data.title"
                class="w-full h-full xl:h-full object-contain"
              />
            </div>

            <!-- Number + Text -->
            <div
              class="relative w-full h-[30%] shrink-0 flex flex-col gap-y-8 xl:gap-y-12 items-center"
            >
              <div
                class="relative w-10 h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 top-0 flex justify-center items-center p-2 bg-[#13B89C] border-4 border-white rounded-full shadow-[0px_10px_15.1px_0px_rgba(19,184,156,0.25)]"
              >
                <span class="text-[#FFFFFF] text-[16px]">{{ index + 1 }}</span>
              </div>
              <div class="w-full h-full flex flex-col gap-y-2 items-center">
                <p class="text-center text-[#374151] font-[600] text-[14px] xl:text-[20px]">
                  {{ data.title }}
                </p>
                <p
                  class="text-center text-[#515E71] font-[400] text-[10px] xl:text-[14px]"
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
