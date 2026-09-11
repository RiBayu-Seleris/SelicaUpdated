<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { hubFeatures } from "@/Data/Products/SelicaPartner/PartnerContent";
import { useLocalizedList } from "@/utils/i18nList";

// Komponen ini dipakai di dua halaman: beranda dan halaman Selica Partner.
// Teksnya diambil dari berkas bahasa supaya cukup ditulis sekali dan ikut
// berganti saat pengunjung menukar bahasa.
const { t } = useI18n();
const fitur = useLocalizedList("partner.hub.features", hubFeatures, ["teks"]);
const judul = computed(() => t("partner.hub.title"));
</script>
<template>
  <div class="relative w-full h-auto flex flex-row overflow-x-clip">
    <div class="w-full h-auto pl-8 pr-8 md:pl-12 md:pr-12 lg:pl-4 lg:pr-0 xl:pl-20 xls:pl-20">
      <div
        class="w-full h-full flex flex-col gap-y-8 lg:gap-y-5 xl:gap-y-8 items-start justify-start lg:px-10 xl:px-14"
      >
        <div
          class="w-auto h-auto px-3 md:px-6 py-2 bg-[#3BD8BF]/20 flex flex-row gap-x-2 text-[#13B89C] font-[500] rounded-[24px] justify-center items-center"
        >
          <img
            src="@/assets/icons/preview-icon.svg"
            alt=""
            class="w-5 h-5 sm:w-auto sm:h-auto lg:w-5 lg:h-5 xl:w-auto xl:h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <span class="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px]">
            {{ $t("partner.hub.badge") }}
          </span>
        </div>
        <div class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-5">
          <div class="w-full h-auto flex">
            <p
              class="text-[28px] md:text-[32px] lg:text-[28px] xl:text-[42px] font-[600] text-[#374151] leading-snug"
            >
              {{ judul }}
            </p>
          </div>
          <div class="w-full h-auto flex xl:pr-10">
            <p
              class="text-[12px] sm:text-[14px] lg:text-[12px] xl:text-[16px] font-[400] text-[#374151] leading-relaxed tracking-wider"
            >
              {{ $t("partner.hub.intro") }}
            </p>
          </div>
        </div>
        <div class="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-3 xl:gap-5">
          <div
            v-for="(feature, index) in fitur"
            :key="index"
            class="flex flex-row items-start gap-x-2 lg:gap-x-3"
          >
            <div class="w-auto h-full sm:h-auto flex justify-center items-center">
              <div
                class="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0 flex justify-center items-center bg-[#10F492]/20 rounded-full p-1"
              >
                <img
                  src="@/assets/icons/green-checklist.svg"
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div class="w-full h-auto flex items-center pr-0 lg:pr-10 xl:pr-0">
              <p
                class="text-[#515E71] max-smallest:text-[14px] text-[16px] lg:text-[14px] xl:text-[16px] capitalize"
              >
                {{ feature.teks }}
              </p>
            </div>
          </div>
        </div>
        <a
          href="https://sca.seleriscare.ai/register"
          target="_blank"
          :aria-label="$t('home.registerCta')"
          class="inline-flex justify-center sm:justify-between md:justify-start items-center gap-x-5 sm:gap-x-3 w-full sm:w-auto sm:px-8 lg:px-8 xl:px-10 py-3 md:py-3.5 lg:py-3 xl:py-3.5 bg-[#4273C2] rounded-[12px] shadow-[0px_23px_30.8px_0px_rgba(66,115,194,0.1)]"
        >
          <span
            class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-[500]"
          >
            {{ $t("home.dashboardLogin") }}
          </span>

          <div class="w-auto h-auto text-[#FFFFFF] flex items-end justify-center">
            <svg
              class="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.43 18.07L20.5 12L14.43 5.92999"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.50002 12L20.33 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
    <!-- Kolom gambar: gambarnya di-absolute supaya tidak ikut menentukan tinggi row — tinggi
         section murni mengikuti blok teks. Tingginya persen dari tinggi kolom, lebarnya ikut
         rasio asli sehingga menembus ke kanan dan dipotong overflow-x-clip di root. -->
    <div class="w-[43%] xl:w-[40%] shrink-0 hidden lg:block relative">
      <img
        src="@/assets/images/dashboard-preview.svg"
        :alt="$t('home.dashboardAlt')"
        class="absolute left-0 h-[90%] w-auto max-w-none object-contain drop-shadow-[-8px_10px_28px_rgba(0,0,0,0.12)] gambar-berat"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>
