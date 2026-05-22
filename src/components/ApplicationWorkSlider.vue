<script setup>
import WorkPhone from "@/components/WorkPhone.vue";
import WorkLine from "@/components/WorkLine.vue";

defineProps({
  circleColor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  steps: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="relative flex flex-row w-full h-auto pb-8 overflow-x-auto snap-x snap-mandatory scroll-pl-[15%] pl-[15%] pr-20 md:scroll-pl-[20%] md:pl-[50%] md:pr-20 xl:scroll-pl-0 xl:pl-[50%] xl:pr-[50%] hide-scrollbar"
  >
    <template v-for="(step, index) in steps" :key="index">
      <!-- Phone -->
      <WorkPhone :image="step.image" />
      <!-- Line Frame -->
      <WorkLine
        :circleColor="circleColor"
        :textcolor="textcolor"
        :title="step.title"
        :description="step.description"
        :isLast="index === steps.length - 1"
        :index="index"
      >
        <slot />
      </WorkLine>
    </template>
    <!-- Phone -->
    <!-- <WorkPhone /> -->
  </div>
</template>
