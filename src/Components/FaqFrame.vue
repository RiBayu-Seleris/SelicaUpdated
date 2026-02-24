<script setup>
import { computed, ref } from "vue";
import { useAttrs } from "vue";

const props = defineProps({
  Faq: { type: Array, required: true },
  opencolortext: { type: String },
});

const attrs = useAttrs();

const leftFaqs = computed(() => props.Faq.filter((_, i) => i % 2 === 0));
const rightFaqs = computed(() => props.Faq.filter((_, i) => i % 2 !== 0));

const openedIndex = ref([]);
function toggle(key) {
  const idx = openedIndex.value.indexOf(key);
  if (idx > -1) openedIndex.value.splice(idx, 1);
  else openedIndex.value.push(key);
}

const openedIndexMobile = ref(null);

const toggleMobile = (index) => {
  openedIndexMobile.value = openedIndexMobile.value === index ? null : index;
};
</script>
<template>
  <div
    v-bind="attrs"
    class="hidden md:grid md:grid-cols-2 lg:max-w-7xl mx-auto gap-y-5 gap-x-10 px-8 lg:px-16 xl:px-10"
  >
    <!-- KIRI -->
    <div class="flex flex-col gap-y-5">
      <div
        v-for="(faq, i) in leftFaqs"
        :key="`left-${i}`"
        class="rounded-lg shadow-md bg-white dark:bg-gray-800"
      >
        <button
          aria-label="Open FAQ"
          class="w-full flex items-center gap-x-3 px-6 py-4"
          @click="toggle(`left-${i}`)"
        >
          <span class="text-[14px] lg:text-[18px]">
            <span
              v-if="openedIndex.includes(`left-${i}`)"
              :class="opencolortext"
              >–</span
            >
            <span v-else class="text-blue-800 dark:text-white">+</span>
          </span>

          <span
            :class="[
              'flex-1 text-start font-medium text-[14px] lg:text-[14px]',
              openedIndex.includes(`left-${i}`)
                ? opencolortext
                : 'text-blue-800 dark:text-white',
            ]"
            >{{ faq.question }}</span
          >
        </button>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="openedIndex.includes(`left-${i}`)"
            class="overflow-hidden transition-all duration-500"
          >
            <div
              class="px-6 pb-4 text-sm text-gray-700 dark:text-gray-100"
              v-html="faq.answer"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- KANAN (struktur sama, ganti key dan warna ikon) -->
    <div class="flex flex-col gap-y-5">
      <div
        v-for="(faq, i) in rightFaqs"
        :key="`right-${i}`"
        class="rounded-lg shadow-md bg-white dark:bg-gray-800"
      >
        <button
          aria-label="Open FAQ"
          class="w-full flex items-center gap-x-3 px-6 py-4"
          @click="toggle(`right-${i}`)"
        >
          <span class="text-[14px] lg:text-[18px]">
            <span
              v-if="openedIndex.includes(`right-${i}`)"
              class="text-green-500"
              >–</span
            >
            <span v-else class="text-blue-800 dark:text-white">+</span>
          </span>

          <span
            :class="[
              'flex-1 text-start font-medium text-[14px] lg:text-[14px]',
              openedIndex.includes(`right-${i}`)
                ? opencolortext
                : 'text-blue-800 dark:text-white',
            ]"
            >{{ faq.question }}</span
          >
        </button>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="openedIndex.includes(`right-${i}`)"
            class="overflow-hidden"
          >
            <div
              class="px-6 pb-4 text-sm text-gray-700 dark:text-gray-100"
              v-html="faq.answer"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Mobile -->
  <div class="w-full flex md:hidden flex-col px-8 gap-y-5">
    <div
      v-for="(faq, index) in props.Faq"
      :key="index"
      class="w-full h-auto p-[0.7px] rounded-lg dark:bg-gradient-to-tr dark:from-[#565656] from-0% dark:to-[#BCBCBC]"
    >
      <div class="w-full rounded-lg shadow-md bg-[#FFFFFF] dark:bg-[#323232]">
        <button
          aria-label="Open FAQ"
          class="w-full flex flex-row gap-x-3 items-center px-6 py-4"
          @click="toggleMobile(index)"
        >
          <span class="text-[14px]">
            <span
              v-if="openedIndexMobile === index"
              class="text-[#2AB857] dark:text-[#52BD95]"
              >−</span
            >
            <span v-else class="text-[#195279] dark:text-[#FAFAFA]">+</span>
          </span>
          <span
            class="text-[14px] justify-start text-start"
            :class="
              openedIndexMobile === index
                ? 'text-[#2AB857] font-medium'
                : 'text-[#195279] dark:text-[#FAFAFA] font-medium'
            "
          >
            {{ faq.question }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-500"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="openedIndexMobile === index"
            class="px-6 pb-4 text-[#363049] dark:text-[#FFFFFF] text-[14px]"
            v-html="faq.answer"
          ></div>
        </transition>
      </div>
    </div>
  </div>
</template>
