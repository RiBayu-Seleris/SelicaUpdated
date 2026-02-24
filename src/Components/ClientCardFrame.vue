<script setup>
import { computed } from "vue";
import CardTilt from "@/components/reusable/CardTilt.vue";
import CardSlide from "@/components/reusable/CardSlide.vue";

const props = defineProps({
  clientLogos: {
    type: Array,
    required: true,
  },
});

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
const columnsPerRow = 5;
const partnerChunks = computed(() =>
  chunkArray(props.clientLogos, columnsPerRow)
);
</script>

<template>
  <div
    v-for="(row, rowIndex) in partnerChunks"
    :key="'row-' + rowIndex"
    class="hidden lg:grid mt-0 gap-x-5 pb-8 mx-auto w-full"
    :class="[
      row.length === 1
        ? 'grid-cols-1 max-w-[240px] px-2 lg:px-10 xl:px-2'
        : row.length === 2
        ? 'grid-cols-2 max-w-[600px] px-10'
        : row.length === 3
        ? 'grid-cols-3 max-w-[1024px]'
        : row.length === 4
        ? 'grid-cols-4 max-w-[1200px]'
        : 'grid-cols-5 max-w-[1400px]',
    ]"
  >
    <div
      v-for="(logo, index) in row"
      :key="`${rowIndex}-${index}`"
      class="flex items-center justify-center"
    >
      <CardTilt
        :image="logo"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        class="w-full"
      />
    </div>
  </div>
  <div class="block lg:hidden">
    <div class="marquee-track animation-row whitespace-nowrap mt-8">
      <div class="flex gap-x-6 w-max pb-5">
        <CardSlide
          v-for="(logo, index) in props.clientLogos"
          :key="index"
          :image="logo"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.marquee-track {
  display: flex;
  width: fit-content;
  white-space: nowrap;
}

.animation-row {
  animation: marquee-left 30s linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
