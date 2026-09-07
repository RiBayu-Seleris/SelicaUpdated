<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  pkg: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["show-detail"]);

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const getPriceDeleted = (price) => {
  return Math.ceil((price / 0.6 + 1000) / 1000) * 1000;
};

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const isEssential = computed(() => props.pkg.id === "essential");
const isCore = computed(() => props.pkg.id === "core");
const isPrime = computed(() => props.pkg.id === "prime");

// ── Mobile expand/collapse ────────────────────────────────
const expanded = ref(false);
const contentRef = ref(null);
const contentHeight = ref(0);

const toggleExpand = () => {
  contentHeight.value = contentRef.value?.scrollHeight ?? 0;
  expanded.value = !expanded.value;
};

// ── Mobile popup ──────────────────────────────────────────
const showPopup = ref(false);
</script>

<template>
  <!-- ===================== MOBILE (< md) ===================== -->
  <div class="flex flex-col gap-y-5 md:hidden w-full">
    <div
      class="p-[1px] rounded-[10px]"
      :class="isCore ? 'bg-gradient-to-b from-[#26DBBD] from-[20%] to-[#26DBBD]/0' : 'bg-[#DADADA]'"
    >
      <div class="relative bg-white rounded-[10px] flex flex-col">
        <!-- Top accent bar untuk CORE -->
        <div
          v-if="isCore"
          class="w-[50%] h-1.5 absolute top-0 left-1/2 -translate-x-1/2 bg-[#27DBBD] rounded-b-full"
        />

        <!-- HEADER -->
        <div class="flex justify-between px-5 pt-5 pb-3">
          <div>
            <p class="text-[12px] text-[#374151]">
              {{ pkg.badgeMobile }}
            </p>
            <p
              class="text-[20px] font-[600] uppercase"
              :class="[
                isEssential ? 'text-[#42A2C2]' : isCore ? 'text-[#21CBAF]' : 'text-[#4273C2]',
              ]"
            >
              {{ pkg.label }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <del class="text-[#9CA3AF] decoration-[#E22F4A]">
              <p class="text-[#CDCDCD] font-[400] text-[12px] lg:text-[16px]">
                Rp {{ formatRupiah(getPriceDeleted(pkg.price)) }}
              </p>
            </del>
            <span
              class="text-[18px] font-[600]"
              :class="[
                isEssential ? 'text-[#42A2C2]' : isCore ? 'text-[#21CBAF]' : 'text-[#4273C2]',
              ]"
            >
              Rp {{ formatRupiah(pkg.price) }}
            </span>
          </div>
        </div>

        <div class="h-[1px] bg-[#DADADA]" />

        <!-- CONTENT -->
        <div
          ref="contentRef"
          class="relative overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]"
          :style="{
            maxHeight: expanded ? contentHeight + 'px' : '160px',
          }"
        >
          <!-- Gradient overlay saat collapsed -->
          <Transition name="fade-gradient">
            <div
              v-if="!expanded"
              class="absolute inset-0 z-10 bg-gradient-to-b from-white/30 to-white pointer-events-none"
            />
          </Transition>

          <ul
            class="px-5 py-5 mx-5 list-disc list-outside pl-5 flex flex-col gap-y-3 text-[14px] md:text-[16px]"
          >
            <li v-for="feature in pkg.features" :key="feature.name">
              {{ capitalizeFirst(feature.name) }}
            </li>
          </ul>
        </div>

        <!-- BUTTON -->
        <div class="px-5 py-3">
          <div
            class="rounded-[8px] py-2 text-center cursor-pointer"
            :class="[
              isEssential
                ? 'bg-[#C4EAFF] text-[#2C78A3]'
                : isCore
                  ? 'bg-[#27DCBD] text-[#FFFFFF] shadow-[0px_10px_13.3px_0px_rgba(43,225,194,0.2)]'
                  : 'bg-[#4273C2] text-[#FFFFFF]',
            ]"
            @click="emit('show-detail', pkg)"
          >
            <span class="font-[600] text-[14px]">Lihat paket {{ pkg.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== DESKTOP (>= md) — TIDAK DIUBAH ===================== -->
  <div
    :class="[
      'hidden md:flex w-full h-full p-[2px] rounded-xl overflow-hidden transition',
      isEssential
        ? 'bg-[#D1D5DB]/60'
        : isCore
          ? 'bg-gradient-to-tr from-[#2BE1C2] to-[#EDFCF9] shadow-[0px_40px_30.8px_0px_rgba(43,225,194,0.1)]'
          : 'bg-gradient-to-bl from-[#70A7FF] to-[#70A7FF]/0 shadow-[0px_40px_30.8px_0px_rgba(66,115,194,0.1)]',
    ]"
  >
    <div class="w-full flex flex-col gap-y-5 bg-white rounded-xl px-3 lg:px-5 py-5">
      <!-- Title -->
      <div
        class="flex items-center gap-x-1 font-[600]"
        :class="[isEssential ? 'text-[#42A2C2]' : isCore ? 'text-[#21CBAF]' : 'text-[#4273C2]']"
      >
        <p class="text-[16px] lg:text-[20px]">{{ pkg.label }}</p>
        <span v-if="pkg.badge" class="text-[12px] lg:text-[14px]"> ({{ pkg.badge }}) </span>
      </div>

      <!-- Price -->
      <div class="flex flex-col justify-center">
        <del class="text-[#9CA3AF] decoration-[#E22F4A]">
          <p class="text-[#CDCDCD] font-[400] text-[12px] lg:text-[16px]">
            Rp {{ formatRupiah(getPriceDeleted(pkg.price)) }}
          </p>
        </del>
        <div class="w-full h-auto flex flex-row items-center gap-x-1">
          <p class="text-[#374151] font-semibold md:text-[18px] lg:text-[26px]">
            Rp {{ formatRupiah(pkg.price) }}
          </p>
          <p class="text-[#A0A3BD] text-[12px] lg:text-[16px]">/Scan</p>
        </div>
      </div>

      <!-- Features -->
      <div class="flex flex-col gap-y-4 lg:gap-y-5 h-[280px] lg:h-[300px]">
        <div
          v-for="feature in pkg.features"
          :key="feature"
          class="flex flex-row items-start gap-x-2 lg:gap-x-3"
        >
          <div
            class="w-5 h-5 lg:w-6 lg:h-6 shrink-0 flex justify-center items-center bg-[#10F492]/20 rounded-full p-1"
          >
            <img src="@/assets/icons/green-checklist.svg" />
          </div>
          <div class="w-full h-full flex items-center">
            <p class="text-[#515E71] text-[14px] lg:text-[16px] capitalize">
              {{ capitalizeFirst(feature.name) }}
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="w-full h-[2px] bg-[#E2E7EF]" /> -->

      <!-- Commission -->
      <div class="flex flex-col gap-y-5">
        <!-- <p class="text-[#515E71] font-semibold text-[14px] lg:text-[16px]">
          Potensi komisi SELICA Partner
        </p>

        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="flex justify-between">
            <p class="text-[#515E71] text-[12px] lg:text-[16px]">
              Pendapatan <br class="block lg:hidden" />
              langsung
            </p>
            <p class="text-[#515E71] text-[12px] lg:text-[16px] font-[600]">
              Rp {{ formatRupiah(pkg.commission.direct) }}
            </p>
          </div>
          <div class="flex justify-between">
            <p class="text-[#515E71] text-[12px] lg:text-[16px]">
              Pendapatan <br class="block lg:hidden" />
              jaringan
            </p>
            <p class="text-[#515E71] text-[12px] lg:text-[16px] font-[600]">
              Rp {{ formatRupiah(pkg.commission.team) }}
            </p>
          </div>
        </div> -->

        <!-- Button -->
        <div
          @click="emit('show-detail', pkg)"
          :class="[
            'w-full flex justify-center items-center py-3 rounded-md cursor-pointer font-semibold transition',
            isEssential
              ? 'bg-[#C4EAFF] text-[#2C78A3]'
              : isCore
                ? 'bg-[#27DCBD] text-[#FFFFFF] shadow-[0px_10px_13.3px_0px_rgba(43,225,194,0.2)]'
                : 'bg-[#4273C2] text-[#FFFFFF]',
          ]"
        >
          <span class="text-[14px] lg:text-[16px]">Lihat paket {{ pkg.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-gradient-enter-active,
.fade-gradient-leave-active {
  transition: opacity 0.2s ease;
}
.fade-gradient-enter-from,
.fade-gradient-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
