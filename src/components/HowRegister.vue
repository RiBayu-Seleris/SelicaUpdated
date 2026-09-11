<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  currentIndex: {
    type: Number,
    required: true,
  },
  showDescription: {
    type: Boolean,
    default: true,
  },
});

const windowWidth = ref(window.innerWidth);

const onResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));

const dashConfig = computed(() => {
  const w = windowWidth.value;
  if (w < 768) {
    return { initial: 550, total: 700, range: 450 };
  } else if (w < 1024) {
    // md
    return { initial: 600, total: 700, range: 430 };
  } else {
    // lg ke atas
    return { initial: 650, total: 700, range: 450 };
  }
});

const strokeDashoffset = computed(() => {
  const { initial, total, range } = dashConfig.value;
  if (props.currentIndex === 0) return initial;
  if (props.currentIndex === props.steps.length - 1) return 0;
  return total - (range * (props.currentIndex + 1)) / props.steps.length;
});
</script>

<template>
  <div class="w-full h-[500px] hidden lg:flex flex-row px-20">
    <!-- Kolom kiri: gambar aktif -->
    <div class="w-[35%] shrink-0 h-auto flex">
      <Transition name="img-fade" mode="out-in">
        <img
          :key="currentIndex"
          :src="steps[currentIndex].image"
          alt=""
          class="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Transition>
    </div>

    <div class="w-full h-full flex flex-row">
      <!-- Scroll Indicator (SVG arc + dots) -->
      <div class="relative w-[30%] shrink-0 h-full">
        <div class="absolute left-0 top-0 h-full flex flex-col items-center z-10 w-full">
          <!-- SVG arc curved ke kanan -->
          <svg
            class="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 120 300"
            preserveAspectRatio="none"
            fill="none"
          >
            <!-- Track abu -->
            <path
              d="M 30 0 C 100 40, 170 200, 30 300"
              stroke="#E5E7EB"
              stroke-width="3"
              stroke-linecap="round"
              fill="none"
            />
            <!-- Progress hijau -->
            <path
              d="M 30 0 C 100 40, 170 200, 30 300"
              stroke="#13B89C"
              stroke-width="3"
              stroke-linecap="round"
              fill="none"
              stroke-dasharray="420"
              :stroke-dashoffset="
                currentIndex === steps.length - 1
                  ? 0
                  : 420 - (380 * (currentIndex + 1)) / steps.length
              "
              class="transition-all duration-500 ease-out"
            />
          </svg>

          <!-- Dots -->
          <div class="relative z-20 h-full flex flex-col justify-around py-0">
            <div
              v-for="(step, index) in steps"
              :key="index"
              :class="[
                'w-12 h-12 rounded-full border-2 transition-all duration-300 bg-white relative flex justify-center items-center',
                currentIndex >= index ? 'border-[#13B89C] scale-110' : 'border-gray-300',
                index === 1
                  ? 'ml-[200%] lg:ml-[150%] xl:ml-[200%]'
                  : 'ml-[80%] lg:ml-[65%] xl:ml-[80%]',
              ]"
            >
              <div
                v-if="currentIndex >= index"
                class="absolute inset-0.5 bg-[#13B89C] rounded-full transition-all duration-300 flex justify-center items-center"
              >
                <span class="text-[18px] font-[500] text-white">{{ index + 1 }}</span>
              </div>
              <span v-else class="text-[18px] font-[500] text-[#13B89C]">{{ index + 1 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step titles + description -->
      <div class="flex flex-col w-full h-full gap-y-0 transition-all duration-500 ease-out">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative w-full h-full flex flex-col items-center gap-y-0 lg:gap-y-0 transition-all xl:justify-between duration-500 ease-out"
          :class="index === 0 || index === 2 ? 'ml-3 lg:-ml-2' : 'ml-14 lg:ml-8'"
        >
          <!-- Title -->
          <div
            class="absolute left-0 w-full flex items-center transition-all duration-500 ease-out"
            :class="[
              index === currentIndex
                ? 'top-0 h-[40px] lg:h-[60px] xl:h-[90px]'
                : 'h-full top-1/2 -translate-y-1/2',
            ]"
          >
            <p
              class="font-[500] leading-snug tracking-normal transition-all duration-500 ease-out text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[24px]"
              :class="index === currentIndex ? 'text-[#13B89C]' : 'text-[#D6D6D6]'"
            >
              {{ step.title }}
            </p>
          </div>

          <!-- Description (hanya step aktif) -->
          <div
            v-if="index === currentIndex && showDescription"
            class="absolute bottom-0 sm:bottom-3 lg:-bottom-3 xl:-bottom-1 xls:bottom-3 left-0 w-full h-auto transition-all duration-500 ease-out animate__animated animate__fadeIn"
            :class="{ 'xls:bottom-10': index === steps.length - 1 }"
          >
            <p
              class="font-[400] text-[#515E71] text-[12px] sm:text-[16px] lg:text-[12px] xl:text-[14px] xls:text-[16px] leading-snug tracking-wide"
              v-html="step.description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-auto flex lg:hidden flex-col gap-y-5 justify-center items-center">
    <div class="w-full h-[300px] md:h-[400px] flex justify-center items-center">
      <Transition name="img-fade" mode="out-in">
        <img
          :key="currentIndex"
          :src="steps[currentIndex].image"
          alt=""
          class="w-auto h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </Transition>
    </div>

    <!-- ✅ relative agar SVG absolute bisa mengikuti parent -->
    <div class="relative w-full h-[100px] md:h-[200px] flex">
      <svg
        class="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 440 310"
        preserveAspectRatio="none"
        fill="none"
      >
        <!-- Track abu -->
        <path
          d="M 0 290 Q 220 -70, 440 290"
          stroke="#E5E7EB"
          stroke-width="7"
          stroke-linecap="round"
          fill="none"
        />
        <!-- Progress hijau -->
        <path
          d="M 0 290 Q 220 -70, 440 290"
          stroke="#13B89C"
          stroke-width="7"
          stroke-linecap="round"
          fill="none"
          stroke-dasharray="700"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-500 ease-out"
        />
      </svg>
      <div
        class="w-full h-auto relative z-20 flex flex-row justify-between items-center py-0 px-20"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="[
            'w-8 h-8 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 bg-white relative flex justify-center items-center',
            currentIndex >= index ? 'border-[#13B89C] scale-110' : 'border-gray-300',
            index === 1 ? '-mt-[10%]' : 'mt-[2%] md:mt-[10%]',
          ]"
        >
          <div
            v-if="currentIndex >= index"
            class="absolute inset-0.5 bg-[#13B89C] rounded-full transition-all duration-300 flex justify-center items-center"
          >
            <span class="text-[14px] md:text-[18px] font-[500] text-white">{{ index + 1 }}</span>
          </div>
          <span v-else class="text-[18px] font-[500] text-[#13B89C]">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
    <div
      class="relative w-full h-auto flex flex-col justify-center items-center -mt-5 md:-mt-10 z-10"
    >
      <div
        :key="currentIndex"
        class="animate__animated animate__fadeIn flex flex-col items-center w-full px-10 md:px-24 gap-y-5 transition-all duration-500"
      >
        <!-- Title -->
        <p
          class="font-[500] leading-snug tracking-normal text-[20px] md:text-[26px] text-[#13B89C] text-center"
        >
          {{ steps[currentIndex].title }}
        </p>

        <!-- Description -->
        <p
          class="font-[400] text-[#515E71] text-[12px] md:text-[16px] leading-normal tracking-wide text-center h-10 md:h-16"
          v-html="steps[currentIndex].description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-fade-enter-active,
.img-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.img-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.img-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
