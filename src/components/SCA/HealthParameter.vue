<template>
  <div class="w-full h-auto flex flex-col over-smallest:gap-y-5 gap-y-10">
    <!-- Header -->
    <div class="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 xls:px-32">
      <div
        class="lg:max-w-xl mx-auto w-full flex flex-col gap-y-2 justify-center items-center text-center"
      >
        <p
          class="text-[#374151] font-[600] over-smallest:text-[18px] text-[24px] md:text-[32px] xl:text-[40px] leading-tight"
        >
          {{ $t("parameters.heading") }}
        </p>
        <p
          class="text-[#374151] font-[400] over-smallest:text-[12px] text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px]"
        >
          {{ $t("parameters.subheading") }}
        </p>
      </div>
    </div>

    <!-- Carousel Kartu Parameter -->
    <div class="relative w-full">
      <!-- Tombol panah kiri -->
      <button
        type="button"
        :aria-label="$t('common.scrollLeft')"
        :disabled="!canScrollLeft"
        @click="scrollCards(-1)"
        :class="[
          'absolute top-1/2 -translate-y-1/2 left-2 md:left-4 lg:left-5 z-20',
          'w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-gray-200',
          'shadow-[0_4px_20px_rgba(15,39,68,0.22)] grid place-items-center',
          'transition-all duration-200',
          canScrollLeft
            ? 'opacity-100 hover:bg-gray-50 hover:scale-105 cursor-pointer'
            : 'opacity-0 pointer-events-none',
        ]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F2744"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m14.5 5-7 7 7 7" />
        </svg>
      </button>

      <!-- Tombol panah kanan -->
      <button
        type="button"
        :aria-label="$t('common.scrollRight')"
        :disabled="!canScrollRight"
        @click="scrollCards(1)"
        :class="[
          'absolute top-1/2 -translate-y-1/2 right-2 md:right-4 lg:right-5 z-20',
          'w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-gray-200',
          'shadow-[0_4px_20px_rgba(15,39,68,0.22)] grid place-items-center',
          'transition-all duration-200',
          canScrollRight
            ? 'opacity-100 hover:bg-gray-50 hover:scale-105 cursor-pointer'
            : 'opacity-0 pointer-events-none',
        ]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F2744"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9.5 5 7 7-7 7" />
        </svg>
      </button>

      <!-- Track kartu -->
      <div
        ref="scroller"
        @scroll.passive="updateArrows"
        @wheel.passive="resetTarget"
        @touchstart.passive="resetTarget"
        @pointerdown="resetTarget"
        class="w-full flex flex-row gap-x-5 overflow-x-auto scrollbar-hide snap-x scroll-smooth px-3 sm:px-6 md:px-8 lg:px-10 xls:px-14 scroll-px-3 sm:scroll-px-6 md:scroll-px-8 lg:scroll-px-10 xls:scroll-px-14 py-2"
      >
        <article
          v-for="category in categories"
          :key="category.id"
          data-param-card
          class="snap-start shrink-0 relative w-[350px] h-[560px] md:h-[640px] rounded-2xl bg-white border border-[#DCF2E4] shadow-[0_6px_24px_rgba(16,74,45,0.08)] overflow-hidden"
        >
          <!-- Gradasi hijau tipis seperti pada desain referensi -->
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_100%_0%,#EAF9F0_0%,transparent_62%)]"
          ></div>

          <div class="relative flex flex-col h-full px-4 pt-6 pb-5">
            <p class="text-[32px] md:text-[36px] font-extrabold leading-none text-[#22C55E]/80">
              {{ category.order }}
            </p>

            <h3 class="mt-4 text-[19px] md:text-[21px] font-bold text-[#22C55E] leading-tight">
              {{ category.label }}
            </h3>
            <p class="mt-1.5 text-[13px] leading-snug text-[#334155]">
              {{ category.description }}
            </p>

            <!-- Daftar parameter, scroll sendiri bila melebihi tinggi kartu -->
            <div class="relative mt-5 flex-1 min-h-0">
              <ul
                :ref="(el) => registerList(el, category.id)"
                @scroll.passive="syncFade(category.id)"
                class="h-full overflow-y-auto scrollbar-hide flex flex-col gap-y-4"
              >
                <li
                  v-for="(param, index) in category.parameters"
                  :key="index"
                  class="flex flex-row gap-x-3"
                >
                  <span
                    class="shrink-0 mt-0.5 w-8 h-8 rounded-[10px] bg-white border border-gray-100 shadow-[0_1px_4px_rgba(15,39,68,0.08)] grid place-items-center"
                  >
                    <img
                      v-if="paramIcons[param.icon]"
                      :src="paramIcons[param.icon]"
                      alt=""
                      width="24"
                      height="24"
                      loading="lazy"
                      decoding="async"
                      class="w-6 h-6 object-contain"
                    />
                    <svg
                      v-else
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      :stroke="category.iconColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      v-html="iconMarkup[category.icon]"
                    ></svg>
                  </span>
                  <div class="min-w-0">
                    <p class="text-[14px] font-semibold text-[#334155] leading-snug">
                      {{ param.title }}
                    </p>
                    <p class="text-[12px] text-[#64748B] leading-snug mt-0.5">
                      {{ param.description }}
                    </p>
                  </div>
                </li>
              </ul>
              <!-- Petunjuk bahwa daftar masih berlanjut; hilang begitu sampai dasar -->
              <div
                v-show="listCanScroll[category.id]"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-200"
              ></div>
            </div>

            <div
              class="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#22C55E]/45 to-transparent"
            ></div>

            <div
              class="mt-4 rounded-xl bg-[#EAF9F0] py-2.5 text-center text-[13px] font-semibold text-[#22C55E]"
            >
              {{ category.total }} Parameter Total
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-16 xls:px-32">
      <div
        class="bg-[#0F2744] rounded-2xl flex flex-col gap-y-5 md:flex-row items-center justify-between px-4 py-5"
      >
        <div class="flex items-center gap-4">
          <div class="bg-[#1A3A5C] rounded-xl p-3">
            <img src="@/assets/icons/microscope.svg" alt="" loading="lazy" decoding="async" />
          </div>
          <div class="w-full h-auto flex flex-col lg:gap-y-2">
            <p class="text-white font-bold text-[14px] md:text-[16px] xl:text-[18px]">
              {{ $t("parameters.footer.title") }}
            </p>
            <p class="text-gray-400 text-[12px] md:text-[12px] lg:text-[14px] xl:text-[16px] pr-3">
              {{ $t("parameters.footer.description") }}
            </p>
          </div>
        </div>

        <!-- Button membuka modal PDF -->
        <button
          @click="openModal"
          class="w-full md:w-auto justify-center flex bg-white text-[#0F2744] font-semibold px-3 lg:px-6 py-3 rounded-xl text-sm whitespace-nowrap hover:bg-gray-100 transition"
        >
          <span class="text-[12px]">{{ $t("parameters.footer.button") }}</span>
        </button>
      </div>
    </div>

    <!-- PDF Preview Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isPdfModalOpen" class="modal-backdrop" @click.self="closeModal">
          <Transition name="slide-up">
            <div v-if="isPdfModalOpen" class="modal">
              <!-- Modal Header -->
              <div class="modal-header">
                <div class="header-left">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6c63ff"
                    stroke-width="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span class="modal-title">{{
                    footerInfo.pdfFileName ?? $t("parameters.footer.pdfFallback")
                  }}</span>
                </div>
                <button class="close-btn" @click="closeModal">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <!-- Modal Toolbar -->
              <div class="modal-toolbar">
                <div class="toolbar-center" v-if="totalPages > 0">
                  <button class="nav-btn" @click="prevPage" :disabled="currentPage <= 1">
                    &#8592;
                  </button>
                  <span class="page-info">
                    <input
                      type="number"
                      v-model.number="inputPage"
                      @change="goToPage"
                      min="1"
                      :max="totalPages"
                      class="page-input"
                    />
                    / {{ totalPages }}
                  </span>
                  <button class="nav-btn" @click="nextPage" :disabled="currentPage >= totalPages">
                    &#8594;
                  </button>
                </div>

                <div class="toolbar-right" v-if="totalPages > 0">
                  <button class="zoom-btn" @click="zoomOut">−</button>
                  <span class="zoom-label">{{ Math.round(scale * 100) }}%</span>
                  <button class="zoom-btn" @click="zoomIn">+</button>
                  <button class="zoom-btn" @click="resetZoom">⊡</button>
                </div>
              </div>

              <!-- Modal Body -->
              <div class="modal-body">
                <div v-if="loading" class="loading-state">
                  <div class="spinner"></div>
                  <p>{{ $t("home.pdfLoading") }}</p>
                </div>
                <div v-if="error && !loading" class="empty-state">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#555"
                    stroke-width="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>{{ $t("home.pdfFailed") }}</p>
                </div>
                <canvas v-show="!loading && !error" ref="pdfCanvas" class="pdf-canvas"></canvas>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
import {
  parameterCategories,
  footerInfo,
} from "@/Data/Products/CareApplicator/HealthParameters.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Ganti path sesuai lokasi PDF Anda di src/assets/
import pdfAsset from "@/assets/pdf/example-result.pdf";

// Set worker dari npm, tidak perlu CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const { t } = useI18n();

/**
 * Daftar kartu kategori: strukturnya dari src/Data, kalimatnya dari berkas
 * bahasa. Digabung di sini supaya template tinggal memakainya seperti daftar
 * biasa, dan ikut berganti sendiri saat pengunjung menukar bahasa.
 */
const categories = computed(() =>
  parameterCategories.map((kategori) => ({
    ...kategori,
    label: t(`parameters.categories.${kategori.id}.label`),
    description: t(`parameters.categories.${kategori.id}.description`),
    parameters: kategori.parameters.map((param, i) => ({
      ...param,
      title: t(`parameters.items.${kategori.id}.${i}.title`),
      description: t(`parameters.items.${kategori.id}.${i}.description`),
    })),
  })),
);

// Ikon per parameter dari icon-pack; di-resolve saat build supaya ikut di-hash.
// ?no-inline: jangan di-inline jadi base64 supaya tetap file terpisah —
// bisa di-cache browser dan loading="lazy" pada <img loading="lazy" decoding="async"> benar-benar bekerja.
const paramIconModules = import.meta.glob("../../assets/icons/parameters/*.png", {
  eager: true,
  query: "?no-inline",
  import: "default",
});
const paramIcons = Object.fromEntries(
  Object.entries(paramIconModules).map(([path, url]) => [
    path.split("/").pop().replace(".png", ""),
    url,
  ]),
);

// Ikon per kategori — cadangan untuk parameter yang belum punya gambar sendiri.
const iconMarkup = {
  heart:
    '<path d="M12 20.3 4.5 13a4.5 4.5 0 1 1 6.4-6.3l1.1 1.1 1.1-1.1A4.5 4.5 0 1 1 19.5 13l-7.5 7.3Z"/>',
  ruler:
    '<circle cx="12" cy="4.5" r="2"/><path d="M12 8v7"/><path d="M8.5 9.5 12 8l3.5 1.5"/><path d="m9 21 3-6 3 6"/>',
  activity: '<polyline points="3 12 7 12 9.5 5.5 14.5 18.5 17 12 21 12"/>',
  brain: '<circle cx="12" cy="12" r="8.5"/><path d="M8 13.5c1-2 2-2 3 0s2 2 3 0 2-2 2-2"/>',
  droplet: '<path d="M12 3.5s5.5 5.6 5.5 9.2A5.5 5.5 0 0 1 6.5 12.7C6.5 9.1 12 3.5 12 3.5Z"/>',
  layers:
    '<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/>',
  shield:
    '<path d="M12 21s7-3.2 7-8.6V5.9l-7-2.6-7 2.6v6.5C5 17.8 12 21 12 21Z"/><path d="M12 8.5v4"/><path d="M12 15.6v.01"/>',
};

// Fade di dasar daftar hanya muncul selama masih ada isi di bawahnya.
const listCanScroll = reactive({});
const listEls = new Map();

// Hanya mencatat elemennya. Jangan menulis state reaktif di sini: fungsi ref
// dipanggil setiap render, sehingga akan memicu render ulang tanpa henti.
function registerList(el, id) {
  if (el) listEls.set(id, el);
  else listEls.delete(id);
}

function syncFade(id) {
  const el = listEls.get(id);
  if (!el) return;
  // toleransi 2px untuk pembulatan sub-pixel saat sudah mentok bawah
  const next = el.scrollHeight - el.scrollTop - el.clientHeight > 2;
  if (listCanScroll[id] !== next) listCanScroll[id] = next;
}

function syncAllFades() {
  listEls.forEach((_, id) => syncFade(id));
}

// Scroll horizontal + status tombol panah
const scroller = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let resizeObserver = null;

function onResize() {
  updateArrows();
  syncAllFades();
}

function updateArrows() {
  const el = scroller.value;
  if (!el) return;
  const maxScroll = el.scrollWidth - el.clientWidth;
  canScrollLeft.value = el.scrollLeft > 4;
  canScrollRight.value = el.scrollLeft < maxScroll - 4;
}

// Posisi tujuan dilacak sendiri supaya klik beruntun tetap menumpuk
// (scrollBy saat animasi smooth masih berjalan menghitung ulang dari posisi saat itu).
let targetLeft = null;

function scrollCards(direction) {
  const el = scroller.value;
  if (!el) return;
  const card = el.querySelector("[data-param-card]");
  // Lebar satu kartu + gap (gap-x-5 = 20px); fallback ke 80% lebar area terlihat.
  const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
  const maxScroll = el.scrollWidth - el.clientWidth;
  const base = targetLeft ?? el.scrollLeft;
  targetLeft = Math.max(0, Math.min(maxScroll, base + direction * step));
  el.scrollTo({ left: targetLeft, behavior: "smooth" });
}

// Begitu pengguna menggeser sendiri, tujuan yang dilacak tidak berlaku lagi.
function resetTarget() {
  targetLeft = null;
}

onMounted(async () => {
  await nextTick();
  updateArrows();
  syncAllFades();
  if (typeof ResizeObserver !== "undefined" && scroller.value) {
    resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(scroller.value);
  }
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", onResize);
});

// Modal & PDF state
const isPdfModalOpen = ref(false);
const pdfCanvas = ref(null);
const pdfDoc = shallowRef(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref(1.2);
const loading = ref(false);
const error = ref(false);
const inputPage = ref(1);

// Lock body scroll saat modal terbuka
watch(isPdfModalOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

async function openModal() {
  isPdfModalOpen.value = true;

  // Hanya load sekali, tidak perlu load ulang
  if (pdfDoc.value) return;

  loading.value = true;
  error.value = false;

  try {
    pdfDoc.value = await pdfjsLib.getDocument(pdfAsset).promise;
    totalPages.value = pdfDoc.value.numPages;
    await renderPage(1);
  } catch (err) {
    console.error("Gagal memuat PDF:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  isPdfModalOpen.value = false;
}

async function renderPage(pageNum) {
  if (!pdfDoc.value) return;
  loading.value = true;
  try {
    const page = await pdfDoc.value.getPage(pageNum);
    const viewport = page.getViewport({ scale: scale.value });
    const canvas = pdfCanvas.value;
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    inputPage.value = pageNum;
  } finally {
    loading.value = false;
  }
}

async function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    await renderPage(currentPage.value);
  }
}
async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    await renderPage(currentPage.value);
  }
}
async function goToPage() {
  const page = Math.min(Math.max(1, inputPage.value), totalPages.value);
  currentPage.value = page;
  inputPage.value = page;
  await renderPage(currentPage.value);
}
async function zoomIn() {
  scale.value = Math.min(scale.value + 0.2, 3);
  await renderPage(currentPage.value);
}
async function zoomOut() {
  scale.value = Math.max(scale.value - 0.2, 0.4);
  await renderPage(currentPage.value);
}
async function resetZoom() {
  scale.value = 1.2;
  await renderPage(currentPage.value);
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal {
  background: #1e1e2e;
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  border: 1px solid #2e2e45;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: #16162a;
  border-bottom: 1px solid #2e2e45;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.modal-title {
  color: #ddd;
  font-size: 14px;
  font-weight: 600;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.close-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition:
    color 0.2s,
    background 0.2s;
}
.close-btn:hover {
  color: #fff;
  background: #3a3a55;
}

.modal-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: #2a2a3d;
  border-bottom: 1px solid #3a3a55;
  flex-wrap: wrap;
  gap: 8px;
}
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-btn,
.zoom-btn {
  background: #3a3a55;
  border: none;
  color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s;
}
.nav-btn:hover:not(:disabled),
.zoom-btn:hover {
  background: #4e4e72;
}
.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.page-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ccc;
  font-size: 13px;
}
.page-input {
  width: 40px;
  text-align: center;
  background: #1e1e2e;
  border: 1px solid #4e4e72;
  color: #fff;
  border-radius: 4px;
  padding: 3px 4px;
  font-size: 13px;
}
.page-input:focus {
  outline: none;
  border-color: #6c63ff;
}
.zoom-label {
  color: #ccc;
  font-size: 12px;
  min-width: 36px;
  text-align: center;
}

.modal-body {
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  background: #12121c;
}
.pdf-canvas {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  max-width: 100%;
}
.empty-state,
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #555;
  margin: auto;
  font-size: 13px;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #3a3a55;
  border-top-color: #6c63ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(24px);
  opacity: 0;
}
</style>
