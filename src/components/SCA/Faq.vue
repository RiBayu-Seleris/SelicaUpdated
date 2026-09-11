<template>
  <div class="max-w-3xl mx-auto space-y-4">
    <h2
      class="text-center max-smallest:text-[20px] text-[28px] md:text-[32px] lg:text-[38px] xl:text-[48px] font-[600] text-[#374151] mb-10 tracking-tight"
    >
      {{ $t("home.faqHeading") }}
    </h2>
    <div
      v-for="(item, index) in faqs"
      :key="index"
      class="p-[2px] rounded-xl transition-all duration-300"
      :class="
        activeIndex === index
          ? 'bg-gradient-to-br from-[#24BAA0] to-[#24BAA0]/0 shadow-[0px_30px_24px_0px_rgba(163,237,225,0.2)]'
          : 'bg-transparent border border-slate-200'
      "
    >
      <!-- Inner white card -->
      <div class="bg-white rounded-[10px] overflow-hidden">
        <!-- Header button -->
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none group"
          @click="toggle(index)"
        >
          <span
            class="max-smallest:text-[12px] text-[14px] sm:text-[16px] font-semibold transition-colors duration-200"
            :class="activeIndex === index ? 'text-[#13B89C]' : 'text-[#374151]'"
          >
            {{ item.question }}
          </span>
          <span
            class="ml-4 flex-shrink-0 transition-transform duration-300"
            :class="activeIndex === index ? 'rotate-180 text-teal-500' : 'text-slate-400'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <!-- Answer animated -->
        <transition
          name="accordion"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
          @after-leave="onAfterLeave"
        >
          <div v-if="activeIndex === index">
            <p class="px-6 pb-5 text-slate-500 leading-relaxed max-smallest:text-xs text-sm">
              {{ item.answer }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

const { t } = useI18n();

const activeIndex = ref(null);

// Enam pertanyaan; kalimatnya ada di berkas bahasa pada kunci home.faq.*
const faqs = computed(() =>
  Array.from({ length: 6 }, (_, i) => ({
    question: t(`home.faq.${i}.question`),
    answer: t(`home.faq.${i}.answer`),
  })),
);

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

// Smooth height animation handlers
function onEnter(el) {
  el.style.height = "0";
  el.style.overflow = "hidden";
  requestAnimationFrame(() => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";
  });
}

function onAfterEnter(el) {
  el.style.height = "";
  el.style.overflow = "";
  el.style.transition = "";
}

function onLeave(el) {
  el.style.height = el.scrollHeight + "px";
  el.style.overflow = "hidden";
  requestAnimationFrame(() => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = "0";
    el.style.opacity = "0";
  });
}

function onAfterLeave(el) {
  el.style.height = "";
  el.style.overflow = "";
  el.style.transition = "";
  el.style.opacity = "";
}
</script>

<style scoped>
.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  opacity: 0;
}
</style>
