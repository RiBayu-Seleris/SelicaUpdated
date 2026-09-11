<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

const isOpen = ref(false);
const rootEl = ref(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (code) => {
  languageStore.setLocale(code);
  isOpen.value = false;
};

// Menutup daftar saat pengunjung mengklik di luar kotaknya.
const handleClickOutside = (event) => {
  if (!isOpen.value) return;
  if (rootEl.value && !rootEl.value.contains(event.target)) isOpen.value = false;
};

const handleEscape = (event) => {
  if (event.key === "Escape") isOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <div ref="rootEl" class="relative shrink-0">
    <button
      type="button"
      :aria-label="$t('common.changeLanguage')"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggleMenu"
      class="h-9 lg:h-10 px-2.5 sm:px-3 rounded-lg bg-white border-[0.5px] border-[#DEDEDE] shadow-[inset_0px_0px_17px_-3px_rgba(0,0,0,0.1)] cursor-pointer flex items-center gap-1.5 transition-all duration-300 hover:border-[#13B89C]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B89C]/60"
    >
      <!-- Ikon globe -->
      <svg
        class="hidden sm:block w-[18px] h-[18px] text-[#13B89C]"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 010 18a15 15 0 010-18z" />
      </svg>

      <span class="text-[13px] sm:text-sm font-medium text-[#374151] leading-none">
        {{ languageStore.current.short }}
      </span>

      <!-- Panah -->
      <svg
        class="w-3.5 h-3.5 text-[#878787] transition-transform duration-300"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <!-- Daftar bahasa -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-show="isOpen"
        role="listbox"
        class="absolute right-0 top-full mt-2 w-max min-w-[11rem] max-w-[calc(100vw-2rem)] py-1.5 rounded-lg bg-white border-[0.5px] border-[#DEDEDE] shadow-lg z-50 overflow-hidden"
      >
        <li v-for="lang in languageStore.languages" :key="lang.code">
          <button
            type="button"
            role="option"
            :aria-selected="languageStore.locale === lang.code"
            @click="selectLanguage(lang.code)"
            class="w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-[13px] sm:text-sm transition-colors duration-200 hover:bg-[#13B89C]/10"
            :class="
              languageStore.locale === lang.code ? 'text-[#13B89C] font-medium' : 'text-[#374151]'
            "
          >
            <span class="whitespace-nowrap">{{ lang.label }}</span>
            <svg
              v-if="languageStore.locale === lang.code"
              class="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span v-else class="shrink-0 text-[11px] text-[#878787]">
              {{ lang.short }}
            </span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>
