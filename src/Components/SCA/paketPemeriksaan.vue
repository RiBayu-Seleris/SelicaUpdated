<script setup>
import { computed } from "vue";

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

const isEssential = computed(() => props.pkg.id === "essential");
const isCore = computed(() => props.pkg.id === "core");
const isPrime = computed(() => props.pkg.id === "prime");
</script>
<template>
  <div
    :class="[
      'w-full h-auto p-[2px] rounded-xl overflow-hidden transition',
      isEssential
        ? 'bg-[#D1D5DB]/60'
        : isCore
          ? 'bg-gradient-to-tr from-[#2BE1C2] to-[#EDFCF9] shadow-[0px_40px_30.8px_0px_rgba(43,225,194,0.1)]'
          : 'bg-gradient-to-bl from-[#70A7FF] to-[#70A7FF]/0 shadow-[0px_40px_30.8px_0px_rgba(66,115,194,0.1)]',
    ]"
  >
    <div class="w-full flex flex-col gap-y-5 bg-white rounded-xl p-5">
      <!-- Title -->
      <div
        class="flex items-center gap-x-2 font-[600]"
        :class="[
          isEssential
            ? 'text-[#42A2C2]'
            : isCore
              ? 'text-[#21CBAF]'
              : 'text-[#4273C2] ',
        ]"
      >
        <p class="text-[20px]">
          {{ pkg.label }}
        </p>
        <span v-if="pkg.badge" class="text-[14px]"> ({{ pkg.badge }}) </span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-x-1">
        <p class="text-[#374151] font-semibold text-[26px]">
          Rp {{ formatRupiah(pkg.price) }}
        </p>
        <p class="text-[#A0A3BD] text-[16px]">/Scan</p>
      </div>

      <!-- Features -->
      <div class="flex flex-col gap-y-5 h-[300px]">
        <div
          v-for="feature in pkg.features"
          :key="feature"
          class="flex items-start gap-x-3"
        >
          <div
            class="w-6 h-6 flex justify-center items-center bg-[#10F492]/20 rounded-full p-1"
          >
            <img src="@/assets/icons/green-checklist.svg" />
          </div>
          <p class="text-[#515E71] text-[16px]">
            {{ feature }}
          </p>
        </div>
      </div>

      <div class="w-full h-[2px] bg-[#E2E7EF]" />

      <!-- Commission -->
      <div class="flex flex-col gap-y-5">
        <p class="text-[#515E71] font-semibold text-[16px]">
          Potensi Komisi SCA
        </p>

        <div class="flex justify-between">
          <p class="text-[#515E71]">Direct Income</p>
          <p class="text-[#515E71] font-[600]">
            Rp {{ formatRupiah(pkg.commission.direct) }}
          </p>
        </div>

        <div class="flex justify-between">
          <p class="text-[#515E71]">Team Income</p>
          <p class="text-[#515E71] font-[600]">
            Rp {{ formatRupiah(pkg.commission.team) }}
          </p>
        </div>

        <!-- Button -->
        <div
          @click="emit('show-detail', pkg)"
          :class="[
            'w-full flex justify-center items-center py-3 rounded-md cursor-pointer font-semibold transition',
            isEssential
              ? 'bg-[#C4EAFF] text-[#2C78A3]'
              : isCore
                ? 'bg-[#27DCBD] text-[#FFFFFF] shadow-[0px_10px_13.3px_0px_rgba(43,225,194,0.2)]'
                : 'bg-[#4273C2] text-[#FFFFFF] ',
          ]"
        >
          Lihat Detail {{ pkg.label }}
        </div>
      </div>
    </div>
  </div>
</template>
