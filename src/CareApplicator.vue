<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { formatRupiahSmart } from "@/Helper/numberFormat.js";

import ThunderIcon from "@/assets/Products/images/Care-Applicator/thunder-icon.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import {
//   features,
//   packages,
// } from "@/Data/Products/CareApplicator/HealthPackage.js";
import { testimonials } from "@/Data/Products/CareApplicator/Testimonials.js";
import { membershipLevels } from "@/Data/Products/CareApplicator/MembershipLevels.js";
import { whatsSelerisCare } from "@/Data/Products/CareApplicator/WhatsSelerisCare.js";
import { whatsSCAList } from "@/Data/Products/CareApplicator/WhatsSCAList.js";
import { whyJoinSCA } from "@/Data/Products/CareApplicator/WhyJoinSCA.js";
import { howToJoin } from "@/Data/Products/CareApplicator/HowToJoin.js";
import { benefits } from "@/Data/Products/CareApplicator/benefits.js";

import ArrowLeft from "@/assets/icons/arrow-left.svg";
import PaketPemeriksaan from "@/components/SCA/paketPemeriksaan.vue";
import HealthParameterTabs from "@/components/SCA/healthParameters.vue";
import { payPerScanPackages } from "@/Data/Products/CareApplicator/HealthPackage";

const modules = [Navigation, Pagination, Autoplay];

const contentRefs = ref([]);
const contentHeights = ref([]);

const selectedPackage = ref(null);
const showModal = ref(false);

const activeIndex = ref(0);
let interval = null;

const targetPerDay = ref(1);
const MIN_TARGET = 1;
const MAX_TARGET = 999;
const PRICE_PER_SCAN = 300000;
const DIRECT_PERCENT = 0.15;
const PASSIVE_PERCENT = 0.1;
const DAYS_PER_MONTH = 30;
const activeHover = ref(null);

const monthlyScan = computed(() => targetPerDay.value * DAYS_PER_MONTH);

const directIncome = computed(() => monthlyScan.value * PRICE_PER_SCAN * DIRECT_PERCENT);

const passiveIncome = computed(() => monthlyScan.value * PRICE_PER_SCAN * PASSIVE_PERCENT);

const paketKeanggotaan = computed(
  () => benefits.find((b) => b.title === "Paket Keanggotaan")?.items || [],
);

const supportBerkelanjutan = computed(
  () => benefits.find((b) => b.title === "Support Berkelanjutan")?.items || [],
);

const pricingType = ref("payPerScan");

const isSubscribe = computed(() => pricingType.value === "subscribe");

const tabs = [
  { id: "Cardiovascular", label: "Cardiovascular" },
  { id: "Metabolic", label: "Metabolic" },
  { id: "Metabolic2", label: "Metabolic2" },
];

const toggle = () => {
  pricingType.value = isSubscribe.value ? "payPerScan" : "subscribe";
};

const toggleExpand = (index) => {
  packages[index].expanded = !packages[index].expanded;
};

const openDetail = (pkg) => {
  selectedPackage.value = pkg;
};

function handleOpenModal(pkg) {
  selectedPackage.value = pkg; // simpan paket yang diklik
  showModal.value = true; // buka modal
  console.log("OPEN CLICKED");
}

function handleCloseModal() {
  showModal.value = false;
  selectedPackage.value = null;
}

const series = computed(() => [
  {
    name: "Income",
    data: [directIncome.value, passiveIncome.value],
  },
]);

const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
    parentHeightOffset: 0,
    toolbar: { show: false },
  },

  plotOptions: {
    bar: {
      columnWidth: "75%",
      borderRadius: 14,
    },
  },

  colors: ["#4FE3C1"],

  dataLabels: {
    enabled: false,
  },

  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 2,
    padding: {
      left: 10,
      right: 10,
    },
  },

  xaxis: {
    categories: ["Direct (Personal)", "Passive (Team Est.)"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        fontSize: "12px",
        colors: "#6B7280",
      },
    },
  },

  yaxis: {
    labels: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
      style: {
        fontSize: "12px",
        colors: "#9CA3AF",
      },
    },
  },

  responsive: [
    // 📱 Mobile
    {
      breakpoint: 640,
      options: {
        grid: {
          padding: {
            left: 10,
            right: 10,
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
      },
    },
  ],

  tooltip: {
    y: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
    },
  },
};
/* FONT SIZE (UI) */
const displaySizeClass = computed(() => {
  const len = String(targetPerDay.value).length;
  if (len >= 4) return "text-[12px]";
  if (len === 3) return "text-[14px]";
  return "text-[16px]";
});

const totalParameters = computed(() => {
  if (!selectedPackage.value) return 0;

  // Jumlahkan semua values di setiap modalValues
  return selectedPackage.value.modalValues.reduce((sum, section) => {
    return sum + section.values.length;
  }, 0);
});

const increase = () => {
  if (targetPerDay.value < MAX_TARGET) {
    targetPerDay.value++;
  }
};

const decrease = () => {
  if (targetPerDay.value > MIN_TARGET) {
    targetPerDay.value--;
  }
};

/* VALIDASI VALUE */
watch(targetPerDay, (val) => {
  const numeric = Number(val);

  if (isNaN(numeric)) {
    targetPerDay.value = MIN_TARGET;
    return;
  }

  if (numeric < MIN_TARGET) {
    targetPerDay.value = MIN_TARGET;
  } else if (numeric > MAX_TARGET) {
    targetPerDay.value = MAX_TARGET;
  } else {
    targetPerDay.value = numeric;
  }
});

onMounted(() => {
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % whatsSelerisCare.length;
  }, 3000);
});

onMounted(async () => {
  await nextTick();
  contentHeights.value = contentRefs.value.map((el) => el.scrollHeight);
});

onUnmounted(() => {
  clearInterval(interval);
});

watch(showModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px]" id="tentang">
      <div class="relative w-full h-auto rounded-[20px] z-20 max-w-[1440px] mx-auto">
        <div
          class="relative w-full h-full flex flex-col lg:flex-row pt-32 px-0 lg:px-16 xl:px-20 xls:px-32 lg:pt-48 xls:pt-56 gap-y-10 lg:gap-x-10 xl:gap-x-0"
        >
          <!-- Phone mobile -->
          <div
            class="relative flex w-full h-auto px-8 md:px-0 lg:hidden flex-row gap-x-5 items-center justify-center lg:items-end lg:justify-end"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Care-Applicator/phone-hero.png"
                alt=""
                class="w-full h-auto sm:h-[350px] object-contain"
              />
            </figure>
          </div>
          <div
            class="relative flex flex-col w-full h-auto gap-y-7 lg:gap-y-10 justify-end px-8 md:px-12 lg:px-0"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-5 justify-start md:justify-normal items-start"
            >
              <div
                class="w-auto h-auto px-3 md:px-6 py-2 bg-[#3BD8BF]/20 flex flex-row gap-x-2 text-[#39D5BC] font-[600] rounded-[24px] justify-center items-center"
              >
                <img
                  src="@/assets/Products/images/Care-Applicator/thunder-icon.png"
                  alt=""
                  class="w-5 h-5 sm:w-auto sm:h-auto object-contain"
                />
                <span
                  class="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] xl:text-[16px]"
                >
                  Peluang Bisnis Tanpa Modal
                </span>
              </div>
              <div class="w-full h-auto flex flex-col gap-y-0 justify-normal items-start">
                <p
                  class="font-[600] text-[18px] sm:text-[24px] md:text-[28px] lg:text-[40px] xl:text-[46px]"
                >
                  <span class="text-[#374151]">
                    Peluang Bisnis <br class="hidden lg:block" />
                    Kesehatan Berbasis
                  </span>
                </p>
                <p
                  class="text-[#1889D1] font-[600] text-[18px] sm:text-[22px] md:text-[22px] lg:text-[38px] xl:text-[40px]"
                >
                  AI Masa Depan
                </p>
              </div>
              <p
                class="text-[#374151] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[18px] w-full"
              >
                Jadilah Seleris Care Applicator (SCA) dan bantu masyarakat memantau kesehatan secara
                non invasif sambil membangun penghasilan fleksibel yang berkelanjutan.
              </p>
            </div>
            <div
              class="w-full h-auto flex flex-col-reverse sm:flex-row gap-y-3 sm:gap-x-14 lg:gap-x-6 lg:justify-between"
            >
              <a
                href="https://sca.seleriscare.ai/register"
                aria-label="Daftar Jadi SCA"
                class="inline-flex justify-between md:justify-start items-center gap-x-3 w-full lg:w-auto px-20 md:px-8 lg:px-4 xl:px-6 py-3 md:py-2 bg-[#3DDAC1] rounded-[12px]"
              >
                <span
                  class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[14px] xl:text-[18px] font-[500]"
                >
                  Daftar Jadi SCA Sekarang
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
              <div
                class="w-full lg:w-auto px-4 lg:px-2 xl:px-4 py-2 bg-[#EBF7FC] rounded-[12px] flex items-center gap-x-4"
              >
                <img
                  src="@/assets/Products/images/Care-Applicator/mitra-pictures.png"
                  alt=""
                  class="h-8 w-auto object-contain"
                />

                <div class="flex flex-col">
                  <span class="text-[12px] font-[600]">500+ Mitra</span>
                  <span class="text-[12px] text-gray-600">Bergabung bulan ini</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Phone Desktop -->
          <div
            class="hidden w-full h-auto relative lg:flex flex-row items-center justify-end md:items-end lg:justify-end pr-12 lg:pr-0"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Care-Applicator/phone-hero.png"
                alt=""
                class="w-full h-[180px] md:h-[300px] lg:h-full xl:h-[450px] object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-40"
    >
      <div
        class="w-full h-auto py-10 md:py-14 px-4 md:px-8 lg:px-10 xl:px-12 bg-[#FAFAFA] flex flex-col gap-y-14 rounded-xl"
      >
        <div class="w-full h-auto flex flex-col gap-y-4">
          <div class="w-full h-auto flex items-center justify-center text-center">
            <span class="font-[600] text-[24px] md:text-[32px]">Apa Itu Seleris Care?</span>
          </div>
          <div class="lg:max-w-2xl mx-auto h-auto flex items-center justify-center text-center">
            <span
              class="text-[12px] md:text-[16px] lg:text-[18px] font-[400] text-[#374151] leading-normal lg:leading-snug"
            >
              Layanan scanning kesehatan berbasis kecerdasan buatan dari PT Seleris Meditekno
              Internasional untuk analisis kondisi kesehatan yang cepat, noninvasif, dan
              akurat.</span
            >
          </div>
        </div>
        <div
          class="w-full h-auto grid grid-cols-2 lg:flex lg:flex-row gap-x-4 md:gap-x-8 lg:gap-x-6 xl:gap-x-5"
        >
          <div
            v-for="(data, index) in whatsSelerisCare"
            :key="data.id"
            :class="[
              'relative w-full h-[190px] sm:h-[150px] md:h-[180px] lg:h-[190px] xl:h-[180px] p-[2px] rounded-2xl cursor-default',
              'transition-all duration-300 ease-out',
              (data.id === 2 || data.id === 4) && 'mt-8 md:mt-14',

              index === activeIndex &&
                'animated-border-wrapper -translate-y-2 shadow-[0_21px_16.9px_0_#0000001A]',
              ,
            ]"
          >
            <div
              class="w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 lg:p-3 xl:p-4"
            >
              <div
                class="w-auto h-auto"
                :class="[index === activeIndex ? 'text-white' : 'text-[#39D5BC]']"
              >
                <ThunderIcon
                  class="w-8 h-8 md:w-10 md:h-10 object-contain p-1 md:p-2 rounded-[8px]"
                  :class="[index === activeIndex ? 'bg-[#39D5BC]' : 'bg-[#D8F7F2]']"
                />
              </div>
              <div class="w-full h-auto flex flex-col gap-y-1.5">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#374151] font-[600] text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-snug"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div class="w-full h-auto flex">
                  <span class="text-[#8E98A8] text-[10px] md:text-[12px] leading-normal font-[400]">
                    {{ data.content }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APA ITU SCA -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-20 md:mt-32 lg:mt-40"
    >
      <!-- Desktop -->
      <div class="flex relative w-full h-auto">
        <figure class="hidden lg:flex w-auto h-auto">
          <img
            src="@/assets/Products/images/Care-Applicator/about-care-applicator-frame.png"
            alt=""
            class="w-full h-auto object-cover"
          />
        </figure>
        <div
          class="lg:absolute z-20 left-0 top-0 w-full h-full flex flex-col lg:flex-row gap-y-5 md:gap-y-10 gap-x-3 p-6 md:p-10 lg:p-0 bg-gradient-to-br from-[#28B1B8] to-[#124F52] lg:bg-none rounded-[20px] lg:rounded-none"
        >
          <div
            class="w-full h-auto flex flex-col lg:px-7 xl:px-10 lg:pt-10 xl:pt-12 gap-y-6 md:gap-y-8 lg:gap-y-6 xl:gap-y-8"
          >
            <div class="w-full h-auto flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-6 xl:gap-y-8">
              <div class="w-full h-auto flex">
                <span
                  class="text-[#FFFFFF] text-[18px] sm:text-[28px] md:text-[32px] lg:text-[24px] xl:text-[42px] xls:text-[42px] font-[600] leading-snug"
                >
                  Apa Itu Seleris Care <br />
                  Applicator (SCA) ?
                </span>
              </div>
              <div class="w-full h-auto flex">
                <span
                  class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] xls:text-[16px] text-[#FFFFFF] leading-snug font-[400]"
                >
                  SCA adalah mitra resmi
                  <span class="font-[600]">Seleris Care</span> yang bertugas memasarkan dan
                  menyediakan layanan scanning kesehatan kepada masyarakat luas menggunakan
                  perangkat dan aplikasi digital kami.
                </span>
              </div>
            </div>
            <div
              class="w-auto h-auto flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6 lg:gap-y-4 xl:gap-y-5 xls:gap-y-5 items-start"
            >
              <div
                v-for="(data, index) in whatsSCAList"
                :key="index"
                class="w-auto h-auto flex flex-row"
              >
                <div
                  class="w-auto h-auto flex flex-row bg-[#47D2B4]/40 gap-x-1.5 md:gap-x-3 px-3 md:py-1.5 sm:px-5 py-2 lg:py-2.5 xl:py-3 lg:px-4 xl:px-6 rounded-full"
                >
                  <div class="flex items-center">
                    <img
                      src="@/assets/Products/images/Care-Applicator/checklist.png"
                      alt=""
                      class="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 xls:w-5 xls:h-5 object-contain shrink-0"
                    />
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-white text-[10px] sm:text-[14px] lg:text-[12px] xl:text-[16px] xls:text-[16px]"
                    >
                      {{ data.content }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full h-auto lg:pt-[110px] xl:pt-[130px] xls:pt-[130px]">
            <div class="w-full h-auto flex flex-col gap-y-5 xls:gap-y-5 lg:pl-2 lg:pr-10">
              <div class="w-full h-auto flex flex-row gap-5 xl:gap-5 xls:gap-5">
                <div
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 lg:py-5 xl:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon1.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto lg:w-14 lg:h-14 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px] lg:text-[18px] xl:text-[24px]"
                      >
                        Partner Resmi
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px]">
                        Telah melalui proses verifikasi dan sertifikasi
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 lg:py-5 xl:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon2.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto lg:w-14 lg:h-14 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px] lg:text-[18px] xl:text-[24px] whitespace-nowrap"
                      >
                        Solusi Kesehatan
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px]">
                        Didukung teknologi scanning modern
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto">
                <div
                  class="w-full h-auto flex flex-row gap-x-5 md:gap-x-5 px-5 py-5 md:py-8 lg:py-6 xl:py-8 xls:py-8 bg-[#FFFFFF]/40 border-[1px] border-[#DDDDDD]/20 rounded-[12px]"
                >
                  <div
                    class="w-auto h-auto flex p-[1px] bg-gradient-to-br from-[#AFEFFF] from-[40%] to-[#AFEFFF]/0 rounded-[12px]"
                  >
                    <div
                      class="w-full h-full flex bg-[#70cff4] p-2 md:p-3 lg:p-2 xl:p-3 rounded-[12px]"
                    >
                      <img
                        src="@/assets/Products/images/Care-Applicator/digital-ecosystem-icon2.png"
                        alt=""
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div class="w-full h-auto flex flex-col justify-center gap-y-1 md:gap-y-0">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[20px] lg:text-[18px] xl:text-[20px]"
                      >
                        Platform Digital Pintar
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px]"
                      >
                        Pelaporan dan pemantauan terintegrasi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 30 Health Parameter -->
    <!-- <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xls:px-32 mt-32 lg:mt-40"
    >
      <div class="w-full h-auto flex flex-col">
        <div
          class="max-w-xl mx-auto w-full h-auto flex flex-col gap-y-2 justify-center items-center text-center"
        >
          <p class="text-[#374151] font-[600] text-[48px]">
            30 Health Parameters
          </p>
          <p class="text-[#374151] font-[400] text-[16px]">
            Teknologi AI kami menganalisis spektrum kesehatan tubuh secara
            mendalam hanya dalam satu sesi pemindaian.
          </p>
        </div>
        <HealthParameterTabs :tabs="tabs">
          <template #default="{ activeTab }">
            <div class="p-4 bg-white rounded shadow">
              <div v-if="activeTab === 'Cardiovascular'">
                <p>Ini isi Tab 1</p>
              </div>
              <div v-else-if="activeTab === 'Metabolic'">
                <p>Ini isi Tab 2</p>
              </div>
              <div v-else-if="activeTab === 'Metabolic2'">
                <p>Ini isi Tab 2</p>
              </div>
              <div v-else>
                <p>Ini isi Tab 3</p>
              </div>
            </div>
          </template>
        </HealthParameterTabs>
      </div>
    </section> -->

    <!-- Paket Pemeriksaan Kesehatan -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xls:px-32 mt-32 lg:mt-40"
    >
      <div class="w-full h-auto flex">
        <div class="w-full h-auto flex flex-col gap-y-10">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[24px] md:text-[28px] lg:text-[36px] text-[#374151] font-[600] text-center leading-tight tracking-wider"
            >
              Pilih Paket Kesehatan <br />
              Sesuai Kebutuhan Anda
            </span>
          </div>
          <div class="w-full h-auto flex flex-col gap-y-6">
            <div class="flex items-center justify-center gap-6">
              <p :class="!isSubscribe ? 'text-black' : 'text-gray-400'">Pay Per Scan</p>
              <div
                @click="toggle"
                class="relative w-20 h-10 bg-white border rounded-full cursor-pointer"
              >
                <div
                  :class="[
                    'absolute w-6 h-6 top-1/2 -translate-y-1/2 left-2 bg-[#FFFFFF] rounded-full border-[2px] border-[#E6E8F0] shadow-[0px_7px_11.8px_0px_#80808026,_inset_0px_8px_6.4px_0px_#0000000F] transition-all duration-300',
                    isSubscribe ? 'left-[calc(100%-36px)]' : 'left-2',
                  ]"
                />
              </div>
              <p :class="isSubscribe ? 'text-black' : 'text-gray-400'">Subscribe</p>
            </div>
            <div class="max-w-5xl w-full h-auto mx-auto">
              <div class="w-full h-auto flex flex-row gap-x-5">
                <PaketPemeriksaan
                  v-for="pkg in payPerScanPackages"
                  :key="pkg.id"
                  :pkg="pkg"
                  @show-detail="openDetail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MODALS -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 w-auto h-auto z-50 flex transition-all justify-center items-center duration-300 overflow-auto bg-[#FFFFFF]"
      >
        <transition name="zoom">
          <div
            v-if="selectedPackage"
            class="w-full h-auto max-w-md lg:max-w-4xl relative z-50 flex flex-col justify-center items-center gap-y-6 lg:gap-y-14 xls:gap-y-16 bg-green-500"
          >
            <div class="w-full h-auto flex">
              <button
                @click="handleCloseModal()"
                class="w-auto h-auto flex flex-row bg-[#2EDFC1]/70 rounded-full cursor-pointer"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center p-2 bg-[#3DDAC1] text-white rounded-full shadow-[0_4px_12px_0_rgba(61,218,193,0.2)]"
                >
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.6345 34.3308L7.30383 23.0001L18.6345 11.6694"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M39.0372 23L7.62122 23"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="w-auto pl-5 pr-4 h-auto flex justify-center items-center">
                  <span class="text-[#FFFFFF] font-[500] text-[16px]"> Kembali ke beranda </span>
                </div>
              </button>
            </div>
            <div class="w-full h-auto xls:h-auto flex flex-col lg:flex-row gap-x-0">
              <div class="w-full h-full flex flex-col gap-y-5 items-start">
                <div class="w-full h-[45px] flex items-start">
                  <div
                    class="w-auto h-auto shrink-0 flex p-[2px] bg-gradient-to-r from-[#4273C2] to-[#4273C2]/0 rounded-full"
                  >
                    <div class="w-auto h-auto bg-[#C4EAFF] px-10 py-2 rounded-full">
                      <span class="text-[#4273C2] font-[600] text-[14px] lg:text-[16px]">
                        Paket
                        <span class="uppercase">
                          {{ selectedPackage.name }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-3">
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[28px] lg:text-[38px] text-[#374151] font-[600] leading-tight tracking-wider"
                    >
                      Kesehatan Anda, <br />
                      Analisis
                      <span
                        class="text-transparent bg-clip-text bg-gradient-to-br from-[#13B89C] to-[#2EDFC1]"
                      >
                        Tanpa <br />
                        Jarum
                      </span>
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[#8E98A8] font-[400] text-[16px] leading-relaxed tracking-wide"
                    >
                      Solusi cepat untuk pemantauan <br />
                      rutin kesehatan dasar Anda.
                    </span>
                  </div>
                </div>
                <div
                  class="w-[70%] h-auto flex flex-col gap-y-2 items-start bg-[#FAFAFA] px-5 py-4 rounded-[24px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[16px] font-[500] text-[#374151]">
                      Harga Retail Layanan
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[28px] font-[600] text-[#374151]">
                      {{ selectedPackage.price }}
                    </span>
                  </div>
                  <div class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-3 rounded-full">
                    <div class="flex items-center">
                      <img
                        src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                        alt=""
                        class="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 object-contain shrink-0"
                      />
                    </div>
                    <div class="flex items-center">
                      <span
                        class="text-[#374151] text-[10px] sm:text-[14px] lg:text-[12px] xl:text-[16px]"
                      >
                        Hasil Keluar dalam 5 Menit
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Daftar Jadi SCA"
                  class="w-[83%] h-auto inline-flex justify-center items-center gap-x-3 py-2.5 md:py-2 lg:py-4 bg-[#3DDAC1] rounded-[8px]"
                >
                  <span
                    class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[18px] font-[500]"
                  >
                    Daftar SCA & Mulai Jualan
                  </span>

                  <div class="w-auto h-auto text-[#FFFFFF] flex items-end justify-center">
                    <svg
                      class="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 xls:w-8 xls:h-8"
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
                </button>
              </div>
              <div class="w-full lg:h-[530px] xls:h-[560px] flex flex-col gap-y-5">
                <div class="w-full h-[45px] flex items-center flex-shrink-0">
                  <span class="text-[24px] font-[600] text-[#374151]">
                    Detail Parameter {{ totalParameters }}
                  </span>
                </div>
                <div class="w-full h-[200px] lg:h-auto flex flex-col gap-y-5 overflow-y-auto pr-3">
                  <div
                    v-for="data in selectedPackage.modalValues"
                    :key="data.title"
                    class="w-full h-auto flex flex-col bg-[#FFFFFF] gap-6 px-6 py-8 border-[0.5px] border-[#DADADA] rounded-[16px]"
                  >
                    <div class="w-full h-auto flex">
                      <span class="text-[#374151] font-[600] text-[20px]">
                        {{ data.title }}
                      </span>
                    </div>
                    <div class="w-full h-auto flex flex-wrap gap-4">
                      <div
                        v-for="item in data.values"
                        :key="item"
                        class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-2 rounded-full"
                      >
                        <div class="w-auto h-auto flex items-center">
                          <div class="w-3 h-3 rounded-full bg-[#2DDBBD]" />
                        </div>
                        <div class="flex items-center">
                          <span
                            class="text-[#374151] text-[10px] sm:text-[14px] lg:text-[12px] xl:text-[16px]"
                          >
                            {{ item }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Mengapa bergabung SCA? -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-20 md:mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#EAFCFA] px-4 md:px-10 xls:px-4 py-10 md:py-20 gap-y-8 md:gap-y-14 rounded-[20px] md:rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-0">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] text-[20px] md:text-[32px] lg:text-[44px] font-[600] text-center"
            >
              Kenapa Bergabung Jadi SCA?
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[12px] md:text-[14px] lg:text-[16px] text-[#374151] font-[400] text-center"
            >
              Membangun bisnis mandiri dengan dukungan korporasi global
            </span>
          </div>
        </div>
        <div class="w-full h-auto grid grid-cols-2 md:grid-cols-3 xl:px-16 gap-5">
          <div
            v-for="(data, index) in whyJoinSCA"
            :key="index"
            class="w-full h-full bg-[#FFFFFF] rounded-[12px]"
          >
            <div
              class="w-full h-full flex flex-col gap-y-2 md:gap-y-4 p-3 md:p-4 lg:p-6 xl:p-10 bg-[#FFFFFF] border-[0.5px] border-[#000000]/10 rounded-[12px]"
            >
              <div class="w-full h-auto flex justify-center items-center">
                <div
                  class="w-auto h-auto flex justify-center items-start bg-[#39D5BC] text-[#FFFFFF] rounded-[12px]"
                >
                  <ThunderIcon
                    class="w-8 h-8 md:w-full md:h-full object-contain p-1 md:p-2 rounded-[8px]"
                  />
                </div>
              </div>
              <div class="w-full h-auto flex flex-col md:gap-y-3">
                <div class="w-full h-[35px] md:h-[45px] lg:h-auto flex justify-center items-center">
                  <span
                    class="text-[#374151] font-[600] text-[12px] md:text-[16px] lg:text-[20px] xl:text-[20px] text-center leading-snug"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div class="w-full h-auto flex sm:justify-center sm:items-center text-center">
                  <span class="font-[400] text-[#8E98A8] text-[10px] sm:text-[12px] leading-normal">
                    {{ data.content }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Level Keanggotaan -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-32"
    >
      <div class="w-full h-auto flex flex-col gap-y-5 sm:gap-y-12 md:gap-y-6 lg:gap-y-8 md:pb-10">
        <div class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-8">
          <div class="w-full h-auto flex justify-center items-center">
            <span class="text-[28px] md:text-[34px] lg:text-[42px] text-[#374151] font-[600]">
              Level Keanggotaan
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span class="text-[#374151] font-[400] text-[12px] md:text-[16px] text-center">
              Pilih jalur karir yang sesuai dengan ambisi Anda
            </span>
          </div>
        </div>
        <div
          class="max-w-2xl w-full h-auto flex flex-col md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5 mx-auto md:pb-8"
        >
          <!-- Starter Level -->
          <div
            class="relative w-full h-[300px] md:h-[380px] flex bg-[#EDFFFC] rounded-xl overflow-hidden"
          >
            <div
              class="absolute w-[180px] h-[180px] md:w-[200px] md:h-[200px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[180px] h-[180px] md:w-[200px] md:h-[200px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div class="relative w-full h-full flex flex-col justify-center z-20 pt-0 md:pb-5">
              <div class="w-full h-auto flex flex-col gap-y-8 px-5">
                <div class="w-full h-auto flex flex-col text-[#374151]">
                  <p class="text-[14px] font-[400]">Starter Level</p>
                  <p class="text-[24px] font-[600]">SCA-01</p>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-7">
                  <div
                    v-for="(data, index) in membershipLevels.starter.features"
                    :key="index"
                    class="w-full h-auto flex flex-row gap-x-2"
                  >
                    <div class="w-auto h-auto flex bg-[#1AC9AD] p-1 rounded-full">
                      <div class="w-full h-full flex items-center justify-center">
                        <img
                          src="@/assets/Products/images/Care-Applicator/checklist-icon.png"
                          alt=""
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div class="w-auto h-auto flex items-center">
                      <span class="text-[#374151] font-[500] text-[14px]">{{ data }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Professional Level -->
          <div
            class="relative w-full h-[300px] md:h-[430px] flex bg-gradient-to-br from-[#38DAC0] to-[#1E7466] rounded-xl shadow-[0_10px_20px_0_#207E6F4D] overflow-hidden"
          >
            <div
              class="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div class="relative w-full h-full flex flex-col justify-center z-20 pt-0 md:pb-5">
              <div class="w-full h-auto flex flex-col gap-y-8 px-5">
                <div class="w-full h-auto flex flex-col text-[#FFFFFF]">
                  <p class="text-[14px] font-[400]">Professional Level</p>
                  <p class="text-[26px] font-[600]">SCA-02</p>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-7">
                  <div
                    v-for="(data, index) in membershipLevels.professional.features"
                    :key="index"
                    class="w-full h-auto flex flex-row gap-x-2"
                  >
                    <div class="w-auto h-auto flex bg-[#FFFFFF] p-1 rounded-full">
                      <div class="w-full h-full flex items-center justify-center">
                        <img
                          src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                          alt=""
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div class="w-auto h-auto flex items-center">
                      <span class="text-[#FFFFFF] font-[500] text-[14px]">
                        {{ data }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="https://sca.seleriscare.ai/register"
          class="w-full md:w-auto md:mx-auto h-auto flex bg-[#38D8BF] justify-center items-center py-3 md:py-2.5 px-10 rounded-[8px] cursor-pointer shadow-[0px_9px_30px_0px_rgba(61,218,193,0.25)]"
        >
          <span class="text-[#FFFFFF] text-[16px] md:text-[16px] lg:text-[20px]">
            Bergabung Sekarang
          </span>
        </a>
      </div>
    </section>

    <!-- Komisi -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-14 md:mt-32 pt-20"
      id="komisi"
    >
      <div class="w-full h-auto bg-[#FAFAFA] rounded-[16px]">
        <div
          class="w-full h-auto flex flex-col lg:flex-row gap-x-5 py-12 px-4 md:px-12 lg:px-8 xl:px-20 xls:px-14 rounded-[16px]"
        >
          <div class="w-full h-auto flex flex-col gap-y-5">
            <div class="w-full h-auto flex justify-center lg:justify-start">
              <span class="text-[#374151] font-[600] text-[16px] lg:text-[24px] xl:text-[26px]">
                Struktur Komisi & <br class="hidden lg:block" />
                Simulasi Penghasilan
              </span>
            </div>
            <div class="flex lg:hidden w-full h-[300px] bg-white rounded-2xl justify-end items-end">
              <div class="w-full h-full flex">
                <apexchart
                  class="w-full h-full"
                  type="bar"
                  height="100%"
                  :options="chartOptions"
                  :series="series"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-2 px-5 py-3.5 bg-[#FFFFFF] border-[0.3px] border-[#CCCCCC]/50 rounded-[18px]"
            >
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span class="text-[#6F6F6F] font-[400] text-[10px] md:text-[12px]">
                    Harga Layanan
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span class="text-[#49D89C] text-[10px] md:text-[12px] font-[500]"> Status </span>
                </div>
              </div>
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span class="text-[#374151] font-[600] text-[14px] md:text-[18px] leading-none">
                    Rp 300.000
                    <span class="text-[#B8B8B8] text-[10px]">/ Scanning</span>
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span class="text-[#49D89C] font-[600] text-[12px] md:text-[14px]">
                    Terjangkau
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full h-auto flex flex-row gap-x-5">
              <div
                class="relative w-full h-[110px] md:h-[125px] bg-[#83C5FF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#195279] text-[12px] md:text-[14px] font-[500]">
                      Komisi Langsung
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[22px] md:text-[26px] font-[600] text-[#2D71DD]"> 15% </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] md:text-[12px] text-[#2D71DD] font-[500]">
                      ± Rp 45.000 / scan
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="relative w-full h-[110px] md:h-[125px] bg-[#82F9CF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#00B692] text-[12px] md:text-[14px] font-[500]">
                      Komisi Jaringan
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[22px] md:text-[26px] font-[600] text-[#00B171]"> 10% </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] md:text-[12px] text-[#00B171] font-[500]">
                      ± Rp 30.000 / scan
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-5 px-4 xl:px-8 py-5 bg-[#114365] border-[0.3px] border-[#CCCCCC] rounded-[18px]"
            >
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-auto h-auto flex items-center">
                  <span
                    class="text-[12px] md:text-[18px] lg:text-[14px] xls:text-[16px] text-[#FFFFFF] font-[600]"
                  >
                    Target Scanning per Hari
                  </span>
                </div>
                <div class="w-auto h-auto flex justify-end">
                  <div
                    class="w-full h-full grid grid-cols-3 bg-[#DFDFDF]/50 border-[0.5px] border-[#799BB2] rounded-[6px]"
                  >
                    <div
                      class="w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center md:pl-5 py-1 cursor-pointer"
                      @click="decrease"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]"> - </span>
                    </div>
                    <div
                      class="w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center py-1"
                    >
                      <input
                        type="number"
                        v-model.number="targetPerDay"
                        min="1"
                        max="999"
                        class="w-full bg-transparent text-center outline-none text-white font-[500] transition-all duration-150"
                        :class="displaySizeClass"
                      />
                    </div>
                    <div
                      class="w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center md:pr-5 py-1 cursor-pointer"
                      @click="increase"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]"> + </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto flex flex-col gap-y-1">
                <div class="w-full h-auto flex flex-row justify-between">
                  <div class="w-full md:w-auto h-auto flex items-center">
                    <span
                      class="text-[12px] md:text-[18px] lg:text-[14px] text-[#37B3D5] font-[400]"
                    >
                      Potensi Income Bulanan Anda
                    </span>
                  </div>
                  <div class="w-full md:w-auto h-auto flex items-center justify-end">
                    <div class="w-auto h-full flex items-center">
                      <span
                        class="text-[14px] md:text-[18px] lg:text-[16px] xl:text-[18px] text-[#37D5BC] font-[600] tracking-widest"
                      >
                        Rp {{ formatRupiahSmart(directIncome) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-full h-[1px] flex bg-[#185F8F]"></div>
                <div class="w-full h-auto flex">
                  <span class="text-[10px] md:text-[12px] text-[#2A74A6]">
                    *Penghasilan tergantung usaha dan performa masing-masing.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="hidden lg:flex w-full h-auto bg-white rounded-2xl justify-end items-end">
            <div class="w-full h-full flex">
              <apexchart
                class="w-full h-full"
                type="bar"
                height="100%"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cara Bergabung -->
    <section class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] mt-32 pt-20">
      <!-- px-8 md:px-12 lg:px-12 -->
      <div class="w-full h-auto hidden lg:flex flex-col gap-y-10">
        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="w-full h-auto flex justify-center items-center">
            <span class="font-[600] text-[#374151] xl:text-[42px] text-center">
              Cara Bergabung
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="font-[400] text-[#374151] text-[12px] md:text-[14px] lg:text-[16px] text-center tracking-tight"
            >
              Mulai langkah sukses anda dalam 3 langkah mudah
            </span>
          </div>
        </div>
        <div class="relative w-full h-[400px] flex">
          <div class="absolute w-full h-auto z-10 top-1/2">
            <img
              src="@/assets/Products/images/Care-Applicator/wave.png"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>
          <div class="relative w-full h-auto z-20 flex flex-row gap-x-28 px-20">
            <div
              v-for="data in howToJoin"
              :key="data.id"
              class="w-full h-full flex flex-col justify-between"
              :class="data.id === 2 ? 'pt-5' : ''"
            >
              <div class="w-full h-full flex justify-center items-end">
                <div
                  @mouseenter="activeHover = data.id"
                  @mouseleave="activeHover = null"
                  class="w-14 h-14 p-1.5 rounded-[8px] flex justify-center items-center transition-all duration-300 shadow-[0px_20px_15.7px_0px_rgba(0,0,0,0.05)]"
                  :class="activeHover === data.id ? 'bg-[#34C9B1]' : 'bg-[#D7F3F1]'"
                >
                  <div
                    class="w-full h-full bg-[#FFFFFF] flex items-center justify-center rounded-[8px] p-2"
                  >
                    <img :src="data.icon" alt="" srcset="" />
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex justify-center items-center">
                <div
                  @mouseenter="activeHover = data.id"
                  @mouseleave="activeHover = null"
                  class="w-10 h-10 bg-[#34C9B1] rounded-full flex justify-center items-center cursor-pointer"
                >
                  <span class="text-white font-[600] text-[21px] text-center">
                    {{ data.id }}
                  </span>
                </div>
              </div>
              <div class="w-full h-full flex">
                <div
                  @mouseenter="activeHover = data.id"
                  @mouseleave="activeHover = null"
                  class="w-full h-auto flex flex-col gap-y-2 items-center cursor-pointer"
                >
                  <div class="w-full h-auto flex items-center justify-center">
                    <span class="text-[#374151] text-[18px] font-[600] text-center">
                      {{ data.step }}
                    </span>
                  </div>
                  <div class="w-full h-auto flex items-center justify-center">
                    <span class="text-[#8E98A8] text-[14px] font-[400] text-center px-10 lg:px-8">
                      {{ data.content }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefit SCA -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 xl:px-20 xls:px-32 mt-20 md:mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#FAFAFA] px-4 md:px-6 py-10 md:py-20 gap-y-8 md:gap-y-10 lg:gap-y-14 rounded-[20px] md:rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-5">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] text-[20px] sm:text-[32px] lg:text-[40px] xl:text-[44px] font-[600] text-center"
            >
              Benefit Menjadi SCA
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center px-6 md:px-0">
            <span
              class="text-[12px] sm:text-[14px] xl:text-[16px] text-[#374151] font-[400] text-center"
            >
              Kami memberikan semua yang Anda butuhkan untuk membangun
              <br class="hidden md:block" />
              bisnis kesehatan yang sukses dan berkelanjutan.
            </span>
          </div>
        </div>
        <div
          class="md:max-w-4xl lg:max-w-3xl xl:max-w-4xl md:mx-auto w-full h-auto flex flex-col sm:flex-row gap-y-5 sm:gap-x-4 xl:gap-x-8 px-4"
        >
          <div class="animated-border-wrapper-blue w-full h-auto p-0.5 rounded-xl overflow-hidden">
            <div
              class="w-full h-full bg-[#FFFFFF] flex flex-col gap-y-7 px-4 lg:px-10 pt-10 pb-10 sm:pt-5 md:pt-10 md:pb-14 xl:pb-20 rounded-xl"
            >
              <div class="w-full h-auto flex flex-row gap-x-3 justify-center items-center">
                <div class="w-auto h-auto flex justify-center items-center">
                  <div
                    class="w-auto h-auto bg-[#A6D8FF] rounded-[8px] md:rounded-[12px] p-1.5 md:p-2"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/Star.png"
                      alt=""
                      class="w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
                  >
                    Paket
                    <span class="sm:block">Keanggotaan</span>
                  </p>
                </div>
              </div>
              <div
                class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-3.5 lg:gap-y-4 xl:gap-y-5 items-start"
              >
                <div
                  v-for="(item, i) in paketKeanggotaan"
                  :key="i"
                  class="w-auto h-auto flex flex-row"
                >
                  <div class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-1.5">
                    <div class="flex items-center p-1">
                      <img
                        src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                        alt=""
                        class="w-5 h-5 md:w-5 md:h-5 xl:w-5 xl:h-5 object-contain"
                      />
                    </div>
                    <div class="flex items-center">
                      <span
                        class="text-[#374151] font-[500] text-[12px] lg:text-[12px] xl:text-[16px]"
                      >
                        {{ item.content }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="animated-border-wrapper-teal w-full h-auto p-0.5 rounded-xl overflow-hidden">
            <div
              class="w-full h-full bg-[#FFFFFF] flex flex-col gap-y-7 px-4 lg:px-10 pt-10 pb-10 sm:pt-5 md:pt-10 md:pb-14 xl:pb-20 rounded-xl"
            >
              <div class="w-full h-auto flex flex-row gap-x-3 justify-center items-center">
                <div class="w-auto h-auto flex justify-center items-center">
                  <div
                    class="w-auto h-auto bg-[#A3EDE1] rounded-[8px] md:rounded-[12px] p-1.5 md:p-2"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/Shield.png"
                      alt=""
                      class="w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
                  >
                    Support
                    <span class="sm:block">Berkelanjutan</span>
                  </p>
                </div>
              </div>
              <div
                class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-3.5 lg:gap-y-4 xl:gap-y-5 items-start"
              >
                <div
                  v-for="(item, i) in supportBerkelanjutan"
                  :key="i"
                  class="w-auto h-auto flex flex-row"
                >
                  <div class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-1.5">
                    <div class="flex items-center p-1">
                      <img
                        src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                        alt=""
                        class="w-5 h-5 md:w-5 md:h-5 xl:w-5 xl:h-5 object-contain"
                      />
                    </div>
                    <div class="flex items-center">
                      <span
                        class="text-[#374151] font-[500] text-[12px] md:text-[12px] lg:text-[12px] xl:text-[16px]"
                      >
                        {{ item.content }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full h-auto flex flex-col bg-[#D0FBF5] gap-y-2 px-5 py-5 text-[#32A897] rounded-xl"
                >
                  <div class="w-full h-auto">
                    <p class="font-[600] text-[16px] md:text-[20px] xl:text-[22px]">Kenapa Kami</p>
                  </div>
                  <div class="w-full h-auto text-[10px] md:text-[12px] xl:text-[14px]">
                    <p>
                      "Kami tidak hanya memberikan alat, tapi kami membangun ekosistem untuk
                      pertumbuhan karir Anda."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] lg:px-0 xls:max-w-full xls:px-14 mt-32"
      id="testimonials"
    >
      <div class="w-full h-auto flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 pb-10">
        <div class="w-full h-auto flex flex-col gap-y-10 lg:gap-y-10">
          <div
            class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-4 max-[375px]:!px-6 px-8 md:px-12 lg:px-20 xls:px-32"
          >
            <div class="w-full h-auto flex justify-center items-center">
              <span
                class="max-[375px]:!text-[20px] text-[28px] md:text-[34px] lg:text-[42px] text-[#374151] font-[600]"
              >
                Apa Kata Mereka?
              </span>
            </div>
            <div class="w-full h-auto flex justify-center items-center">
              <span
                class="text-[#374151] font-[400] max-[375px]:!text-[10px] text-[12px] md:text-[16px] text-center"
              >
                Kisah sukses dari mitra Seleris Care di seluruh Indonesia
              </span>
            </div>
          </div>
          <div class="relative w-full xl:h-[425px] flex justify-center items-center">
            <div class="absolute w-full h-full z-10 top-1/2 -translate-y-1/2 px-0 lg:px-20">
              <img
                src="@/assets/Products/images/Care-Applicator/testimonial-background.png"
                alt=""
                class="w-full h-[300px] sm:h-[340px] md:h-[300px] lg:h-[345px] xl:h-[430px] object-fill object-top"
              />
            </div>
            <div
              class="relative w-full h-auto group mt-10 xl:mt-6 z-20 bg-transparent px-0 lg:px-20"
            >
              <Swiper
                :modules="modules"
                :centered-slides="false"
                :pagination="{ el: '.custom-pagination', clickable: true }"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
                :breakpoints="{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: -30,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: -45,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }"
                class="w-full h-full !overflow-y-visible"
              >
                <SwiperSlide v-for="(item, index) in testimonials" :key="index">
                  <!-- wrapper ini TIDAK mengubah desain -->
                  <div class="pb-6 px-8 sm:px-8 md:px-12 lg:px-0">
                    <div
                      class="w-full max-[375px]:!h-[190px] min-[1439px]:!h-[230px] h-[200px] sm:h-[230px] md:h-[210px] lg:h-[220px] xl:h-[250px] p-[1px] bg-[#D9D9D9] rounded-lg cursor-grab active:cursor-grabbing shadow-[0px_5px_15px_0px_rgba(92,92,92,0.1)]"
                    >
                      <div
                        class="w-full h-full flex flex-col px-6 pt-4 lg:px-4 lg:pt-4 xl:px-8 xl:pt-5 rounded-lg bg-[#FFFFFF]"
                      >
                        <div class="flex flex-col w-full h-auto mb-5 gap-y-0.5 xl:gap-y-1">
                          <h3
                            class="max-[375px]:!text-[16px] text-[18px] sm:text-[18px] md:text-[18px] lg:text-[18px] font-[500] text-[#195279]"
                          >
                            {{ item.name }}
                          </h3>
                          <p
                            class="max-[375px]:!text-[12px] text-[12px] sm:text-[14px] md:text-[14px] lg:text-[14px] text-[#717276]"
                          >
                            {{ item.location }}
                          </p>
                        </div>
                        <div class="w-full h-full">
                          <p
                            class="max-[375px]:!text-[12px] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] text-[#535862] leading-relaxed"
                          >
                            "{{ item.text }}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div
                class="custom-pagination max-[375px]:!mt-2 mt-2 flex justify-center max-[375px]:!gap-2 gap-2"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Akses Eksklusif -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-20 md:mt-32 pt-20"
    >
      <div
        class="w-full h-auto flex flex-col lg:flex-row bg-[#EAFCFA] gap-x-5 gap-y-6 md:gap-y-8 lg:gap-y-0 px-0 md:px-6 lg:px-10 xl:px-20 py-10 md:py-20 xls:py-16 rounded-[20px] md:rounded-[48px]"
      >
        <!-- Phone mobile -->
        <div class="relative flex lg:hidden w-full h-auto items-center justify-center">
          <figure class="w-auto h-auto">
            <img
              src="@/assets/Products/images/Care-Applicator/phone-hero.png"
              alt=""
              class="w-full h-[250px] md:h-[350px] object-contain"
            />
          </figure>
        </div>
        <div
          class="relative flex flex-col w-full h-auto gap-y-8 md:gap-y-6 lg:gap-y-10 justify-end lg:justify-between lg:pt-10 px-8 md:px-12 lg:px-0"
        >
          <div
            class="w-full h-auto flex flex-col gap-y-4 md:gap-y-5 justify-start md:justify-normal items-start"
          >
            <div class="w-full h-auto flex flex-col gap-y-0 justify-normal items-start">
              <p class="font-[600] text-[18px] md:text-[28px] lg:text-[32px] xls:text-[36px]">
                <span class="text-[#374151]">
                  Siap Memulai Bisnis <br class="hidden lg:block" />
                  Kesehatan
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-br from-[#13B89C] to-[#2EDFC1]"
                    >Masa Depan?</span
                  >
                </span>
              </p>
            </div>
            <p
              class="text-[#374151] text-[12px] md:text-[16px] lg:text-[14px] xl:text-[16px] w-full"
            >
              Dapatkan akses eksklusif ke teknologi AI kesehatan terbaik dan bangun penghasilan
              mandiri sekarang juga.
            </p>
          </div>
          <div class="w-full flex flex-col-reverse md:flex-row gap-y-3 md:gap-x-6">
            <!-- PRIMARY BUTTON -->
            <a
              href="https://sca.seleriscare.ai/register"
              aria-label="Daftar Jadi SCA"
              class="inline-flex justify-center items-center gap-x-3 w-full lg:w-auto px-6 md:px-8 lg:px-4 xl:px-6 py-2.5 md:py-2 xl:py-3 bg-[#3DDAC1] rounded-[12px]"
            >
              <span
                class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-[500]"
              >
                Daftar Jadi SCA Sekarang
              </span>
            </a>

            <!-- SECONDARY BUTTON -->
            <a
              href="https://seleris.ai/contact"
              aria-label="Hubungi Admin"
              class="inline-flex justify-center items-center gap-x-3 w-full lg:w-auto px-6 md:px-8 lg:px-4 xl:px-6 py-2.5 md:py-2 xl:py-3 bg-[#31423F] rounded-[12px]"
            >
              <svg
                class="w-5 h-5 sm:w-3 sm:h-3 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.6 19.92L7.124 18.701L7.134 18.693C7.452 18.438 7.613 18.31 7.792 18.219C7.95267 18.137 8.122 18.0777 8.3 18.041C8.499 18 8.706 18 9.122 18H17.803C18.921 18 19.481 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.48 21 15.92 21 14.804V7.197C21 6.079 21 5.519 20.782 5.092C20.59 4.71554 20.2837 4.40957 19.907 4.218C19.48 4 18.92 4 17.8 4H6.2C5.08 4 4.52 4 4.092 4.218C3.71569 4.40974 3.40974 4.71569 3.218 5.092C3 5.52 3 6.08 3 7.2V18.671C3 19.737 3 20.27 3.218 20.543C3.31174 20.6607 3.43083 20.7557 3.56641 20.821C3.70198 20.8863 3.85053 20.9201 4.001 20.92C4.351 20.92 4.767 20.586 5.6 19.92Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span
                class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-[500]"
              >
                Hubungi Admin
              </span>
            </a>
          </div>
        </div>
        <!-- Phone Desktop -->
        <div
          class="hidden w-full h-auto relative lg:flex flex-row items-center justify-end md:items-end lg:justify-end pr-12 lg:pr-0"
        >
          <figure class="w-auto h-auto">
            <img
              src="@/assets/Products/images/Care-Applicator/phone-hero.png"
              alt=""
              class="w-full h-[180px] md:h-[300px] lg:h-[300px] xl:h-[400px] xls:h-[350px] object-contain"
            />
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
input[type="number"] {
  appearance: none; /* ✅ standard */
  -webkit-appearance: none; /* chrome, safari */
  -moz-appearance: textfield; /* firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Overlay fade in/out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Zoom modal dari tengah */
.zoom-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.5); /* mulai dari tengah, kecil */
}
.zoom-enter-to,
.zoom-leave-from {
  opacity: 1;
  transform: scale(1); /* ukuran final */
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to {
    --angle: 360deg;
  }
}

.animated-border-wrapper {
  background: conic-gradient(
    from var(--angle),
    #13b89c00 0%,
    #39d5bc 45%,
    #39d5bc 50%,
    #13b89c00 90%
  );
  animation: spin-border 4s linear infinite;
}

/* Card 1 - Blue */
.animated-border-wrapper-blue {
  background: conic-gradient(
    from var(--angle),
    #42c5af00 0%,
    #54b5ff 40%,
    #54b5ff 60%,
    #42c5af00 100%
  );
  animation: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.animated-border-wrapper-blue:hover {
  animation: spin-border 4s linear infinite;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(84, 181, 255, 0.25);
}

/* Card 2 - Teal - state normal: static, tidak bergerak */
.animated-border-wrapper-teal {
  background: conic-gradient(from 180deg, #18bfa500 0%, #3be3c9 40%, #3be3c9 60%, #18bfa500 100%);
  animation: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Card 2 - Teal - hover: animasi aktif + override background */
.animated-border-wrapper-teal:hover {
  background: conic-gradient(
    from calc(180deg + var(--angle)),
    #18bfa500 0%,
    #3be3c9 40%,
    #3be3c9 60%,
    #18bfa500 100%
  ) !important;
  animation: spin-border 4s linear infinite;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(59, 227, 201, 0.25);
}
</style>
