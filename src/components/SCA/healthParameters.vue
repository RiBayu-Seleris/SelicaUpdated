<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  defaultTab: {
    type: String,
    default: null,
  },
});

const activeTab = ref(props.defaultTab || props.tabs[0]?.id);

watch(
  () => props.defaultTab,
  (val) => {
    if (val) activeTab.value = val;
  },
);

const setTab = (id) => {
  activeTab.value = id;
};
</script>

<template>
  <div class="w-full h-auto flex flex-col gap-y-10">
    <!-- Pills -->
    <div class="flex space-x-2 p-2 rounded-full">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="setTab(tab.id)"
        :class="[
          'px-4 py-2 rounded-full text-sm transition-all duration-300',
          activeTab === tab.id
            ? 'bg-[#34C9B1] text-[#FFFFFF] font-500 shadow-[0px_21px_24px_0px_rgba(163,237,225,0.4)]'
            : 'bg-[#ECF5F8] text-[#7BA4BD] font-500 ',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->
    <div>
      <slot :activeTab="activeTab" />
    </div>
  </div>
</template>
