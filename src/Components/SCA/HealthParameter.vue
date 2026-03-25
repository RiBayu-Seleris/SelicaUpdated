<template>
  <div class="w-full h-auto flex flex-col gap-y-10">
    <!-- Header -->
    <div
      class="lg:max-w-xl mx-auto w-full flex flex-col gap-y-2 justify-center items-center text-center px-8 sm:px-0"
    >
      <p class="text-[#374151] font-[600] text-[24px] md:text-[32px] lg:text-[40px] leading-tight">
        {{ totalParameters }} Parameter Kesehatan
      </p>
      <p class="text-[#374151] font-[400] text-[14px] md:text-[16px]">
        Teknologi AI kami menganalisis spektrum kesehatan tubuh secara mendalam hanya dalam satu
        sesi pemindaian.
      </p>
    </div>

    <!-- Tabs -->
    <div
      class="w-full flex flex-row justify-between lg:justify-center gap-x-3 px-8 md:px-0 overflow-x-auto snap-x snap-mandatory lg:overflow-x-visible lg:snap-none scrollbar-hide"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-10 xl:px-5 py-2 rounded-full text-sm font-medium transition-all shrink-0',
          activeTab === tab.id
            ? 'bg-teal-500 text-white font-semibold'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        <span class="text-[12px] sm:text-[14px]">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="currentContent" class="grid grid-cols-2 md:grid-cols-3 gap-4 px-8 sm:px-0">
      <div
        v-for="(param, index) in currentContent.parameters"
        :key="index"
        class="w-full h-[180px] md:h-[170px] lg:h-[150px] bg-[#EFF9F9] rounded-2xl flex justify-end p-3 md:p-5 flex-col"
      >
        <p
          class="w-full h-10 md:h-12 lg:h-auto font-bold text-[#1E293B] text-sm md:text-md lg:text-lg flex-wrap"
        >
          {{ param.title }}
        </p>
        <p
          class="w-full h-14 md:h-8 lg:h-auto text-gray-400 text-xs md:text-[12px] lg:text-[14px] mt-1 leading-normal"
        >
          {{ param.description }}
        </p>
      </div>

      <div
        v-if="currentContent.highlight"
        class="w-full h-[180px] md:h-[170px] lg:h-[150px] bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex flex-col items-center justify-center text-white"
      >
        <p class="text-[28px] lg:text-[34px] font-bold">{{ currentContent.highlight.count }}</p>
        <p class="text-sm md:text-md lg:text-lg font-semibold mt-2 px-3 lg:px-0 text-center">
          <span class="block">Parameter</span>
          <span class="block">{{ currentContent.highlight.label }}</span>
        </p>
      </div>
    </div>

    <!-- Footer Banner -->
    <div
      class="bg-[#0F2744] rounded-2xl mx-4 md:mx-0 flex flex-col gap-y-5 md:flex-row items-center justify-between px-4 py-5"
    >
      <div class="flex items-center gap-4">
        <div class="bg-[#1A3A5C] rounded-xl p-3">
          <img src="@/assets/icons/microscope.svg" alt="Health Parameter Icon" />
        </div>
        <div class="w-full h-auto flex flex-col lg:gap-y-2">
          <p class="text-white font-bold text-[14px] md:text-[16px] lg:text-[18px]">
            {{ footerInfo.title }}
          </p>
          <p class="text-gray-400 text-[12px] md:text-[12px] lg:text-[16px] pr-3">
            {{ footerInfo.description }}
          </p>
        </div>
      </div>

      <!-- Button membuka modal PDF -->
      <button
        @click="openModal"
        class="w-full md:w-auto justify-center flex bg-white text-[#0F2744] font-semibold px-3 lg:px-6 py-3 rounded-xl text-sm whitespace-nowrap hover:bg-gray-100 transition"
      >
        <span class="text-[12px]">{{ footerInfo.buttonLabel }}</span>
      </button>
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
                  <span class="modal-title">{{ footerInfo.pdfFileName ?? "Dokumen PDF" }}</span>
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
                  <p>Memuat PDF...</p>
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
                  <p>Gagal memuat PDF.</p>
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
import { ref, computed, watch, shallowRef } from "vue";
import { tabs, tabContents, footerInfo } from "@/Data/Products/CareApplicator/HealthParameters.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Ganti path sesuai lokasi PDF Anda di src/assets/
import pdfAsset from "@/assets/pdf/example-result.pdf";

// Set worker dari npm, tidak perlu CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Tab logic
const activeTab = ref(tabs[0].id);
const currentContent = computed(() => tabContents[activeTab.value] ?? null);
const totalParameters = computed(() =>
  Object.values(tabContents).reduce((total, tab) => total + tab.parameters.length, 0),
);

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
