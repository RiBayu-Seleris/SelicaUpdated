<script setup>
import { ref } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

const card = ref(null);
const transformStyle = ref("perspective(1000px)");

function handleMouseMove(e) {
  if (!card.value) return
  
  const cardRect = card.value.getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  const rotateX = (-deltaY / 20).toFixed(2);
  const rotateY = (deltaX / 20).toFixed(2);

  transformStyle.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetTransform() {
  transformStyle.value = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
}
</script>

<template>
  <!-- shadow-md -->
  <div
    ref="card"
    class="group w-[222px] h-[80px] p-[1px] rounded-xl bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] hover:dark:bg-none hover:dark:bg-[#D9D9D9] transition-all duration-300 ease-out"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
    :style="{ transform: transformStyle }"
  >
    <div
      class="flex w-full h-full rounded-xl transition-transform duration-300 ease-out justify-center items-center bg-[#F9FAFB] hover:bg-white dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
    >
      <div class="flex w-full h-full justify-center items-center">
        <img
          :src="image"
          alt="partner logo"
          class="w-[200px] h-full object-contain filter grayscale group-hover:filter-none transition duration-300"
        />
      </div>
    </div>
  </div>
</template>
