<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { formatRupiahSmart } from "@/Helper/numberFormat.js";

// HealthCare Components
import HeroText from "@/Components/HeroText.vue";
import AboutUs from "@/Components/AboutUs.vue";
import AboutUsDescription from "@/Components/AboutUsDescription.vue";
import DownloadStore from "@/Components/DownloadStore.vue";
import ApplicationWorkText from "@/Components/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@/Components/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@/Components/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@/Components/ClientCardFrameProduct.vue";
import DownloadFrame from "@/Components/DownloadFrame.vue";
import BookDemoProduct from "@/Components/BookDemoProduct.vue";
import CareOrnament from "@/Components/Svg/CareOrnament.vue";
import CareOrnament2 from "@/Components/Svg/CareOrnament2.vue";
import CareOrnament3 from "@/Components/Svg/CareOrnament3.vue";
import CareOrnament4 from "@/Components/Svg/CareOrnament4.vue";
import imageAbout from "@/assets/Products/images/Care/about-care.png";
import FrameLineWorks from "@/Components/Svg/HealthCareDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-care.png";
import DownloadImage from "@/assets/Products/images/Care/download-care.png";

// HealthCare Data
import { careWorkSteps } from "@/Data/Products/HealthCare/careworkSteps.js";
import { whatsSelerisCare } from "@/Data/Products/CareApplicator/WhatsSelerisCare.js";
import { clientLogos } from "@/Data/Products/HealthCare/CareClients";

// SCA Components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import PaketPemeriksaan from "@/components/SCA/paketPemeriksaan.vue";
import HealthParameter from "@/Components/SCA/HealthParameter.vue";
import DashboardPreview from "./Components/SCA/dashboardPreview.vue";
import Disclaimer from "@/Components/SCA/Disclaimer.vue";
import Faq from "@/Components/SCA/Faq.vue";
import Downline from "@/Components/Downline.vue";

// SCA Data
import { testimonials as scaTestimonials } from "@/Data/Products/CareApplicator/Testimonials.js";
import { whatsSCAList } from "@/Data/Products/CareApplicator/WhatsSCAList.js";
import { benefits } from "@/Data/Products/CareApplicator/benefits.js";
import { packages } from "@/Data/Products/CareApplicator/HealthPackage";
import HowRegister from "@/Components/HowRegister.vue";

const modules = [Navigation, Pagination, Autoplay];

// ── HealthCare state ──────────────────────────────────────────
let interval = null;
const activeIndex = ref(0);

const stepsWithPath = careWorkSteps.map((step) => ({
  ...step,
  image: new URL(`/src/assets/Products/images/Care/${step.image}`, import.meta.url).href,
}));

const registerFlow = [
  {
    id: 1,
    title: "Register Akun",
    description: `Daftarkan akun Anda melalui website <a href="https://sca.seleriscare.ai" target="_blank" class="text-[#01A488] hover:underline">sca.seleriscare.ai</a> dan lakukan pembelian produk sebagai bagian dari proses pendaftaran`,
    image: new URL("@/assets/Products/images/Care/register-akun.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Download Seleris Care",
    description: `Unduh aplikasi <a href="https://sca.seleriscare.ai" target="_blank" class="text-[#01A488] hover:underline">Seleris Care</a> melalui Google Play Store, kemudian instal aplikasi tersebut di perangkat Anda sebelum memulai proses deteksi.`,
    image: new URL("@/assets/Products/images/Care/download-sca.png", import.meta.url).href,
  },
  {
    id: 3,
    title: "Login Seleris Care",
    description: `Masuk ke aplikasi Seleris Care menggunakan akun Anda dan mulai gunakan layanan yang tersedia`,
    image: new URL("@/assets/Products/images/Care/login-sca.png", import.meta.url).href,
  },
];

const stepApplicationWorks = [
  {
    id: 1,
    title: "Login akun",
    content: `Masuk ke aplikasi <a href="https://sca.seleriscare.ai" target="_blank" class="text-[#01A488] hover:underline">Seleris Care</a> menggunakan email dan kata sandi yang telah Anda daftarkan sebelumnya.`,
    image: new URL("@/assets/Products/images/Care/login-work.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Home page",
    content: `Pilih layanan pemeriksaan kesehatan dan lakukan pembelian produk untuk memulai proses pengecekan.`,
    image: new URL("@/assets/Products/images/Care/homepage-work.png", import.meta.url).href,
  },
  {
    id: 3,
    title: "Face scanning",
    content: `Ikuti proses pemindaian wajah dengan mengarahkan wajah Anda ke kamera sesuai petunjuk untuk melakukan analisis kesehatan`,
    image: new URL("@/assets/Products/images/Care/face-scanning-work.png", import.meta.url).href,
  },
  {
    id: 4,
    title: "Vital result",
    content: `Aplikasi akan menampilkan hasil analisis kesehatan Anda yang dapat dilihat dan diunduh langsung melalui aplikasi`,
    image: new URL("@/assets/Products/images/Care/vital-result-work.png", import.meta.url).href,
  },
];

const downlineData = [
  {
    id: 1,
    title: "Register akun",
    content: `
    Daftarkan akun Anda melalui website <a href="https://sca.seleriscare.ai" target="_blank" class="text-[#01A488] hover:underline">sca.seleriscare.ai</a> menggunakan email aktif untuk memulai proses pendaftaran`,
    image: new URL("@/assets/Products/images/Care/downline/monitor.svg", import.meta.url).href,
  },
  {
    id: 2,
    title: "Masukkan kode referral",
    content: `Masukkan kode referral dari SC Affiliator yang mengundang Anda untuk bergabung ke dalam jaringan Seleris Care`,
    image: new URL("@/assets/Products/images/Care/downline/referral.svg", import.meta.url).href,
  },
  {
    id: 3,
    title: "Selesai",
    content: `Pendaftaran selesai! Anda kini resmi menjadi bagian dari SC Affiliator dan siap memulai perjalanan bersama kami`,
    image: new URL("@/assets/Products/images/Care/downline/finish.svg", import.meta.url).href,
  },
];

const currentIndex = ref(0);
const showDescription = ref(false);

const scrollContainer = ref(null);
const currentStep = ref(0);
const scrollProgress = ref(0);

let scrollListener = null;

// ── SCA state ─────────────────────────────────────────────────
const contentRefs = ref([]);
const contentHeights = ref([]);

const selectedPackage = ref(null);
const showModal = ref(false);

const targetPerDay = ref(1);
const MIN_TARGET = 1;
const MAX_TARGET = 999;
const PRICE_PER_SCAN = 300000;
const DIRECT_PERCENT = 0.15;
const PASSIVE_PERCENT = 0.1;
const DAYS_PER_MONTH = 30;

const activeHover = ref(null);

const activeBenefitCard = ref(-1);
let benefitInterval = null;
const isMobileView = ref(false);

const checkMobileView = () => {
  isMobileView.value = window.innerWidth <= 768;
  if (isMobileView.value) {
    if (!benefitInterval) {
      activeBenefitCard.value = 0;
      benefitInterval = setInterval(() => {
        activeBenefitCard.value = activeBenefitCard.value === 0 ? 1 : 0;
      }, 3000);
    }
  } else {
    clearInterval(benefitInterval);
    benefitInterval = null;
    activeBenefitCard.value = -1;
  }
};

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

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const openDetail = (pkg) => {
  selectedPackage.value = pkg;
  showModal.value = true;
};

const getPriceDeleted = (price) => {
  return Math.ceil((price / 0.6 + 1000) / 1000) * 1000;
};

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
  dataLabels: { enabled: false },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 2,
    padding: { left: 10, right: 10 },
  },
  xaxis: {
    categories: ["Direct (Personal)", "Passive (Team Est.)"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: { fontSize: "12px", colors: "#6B7280" },
    },
  },
  yaxis: {
    labels: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
      style: { fontSize: "12px", colors: "#9CA3AF" },
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        grid: { padding: { left: 10, right: 10 } },
        xaxis: { labels: { style: { fontSize: "10px" } } },
        yaxis: { labels: { style: { fontSize: "10px" } } },
      },
    },
  ],
  tooltip: {
    y: { formatter: (val) => "Rp " + val.toLocaleString("id-ID") },
  },
};

const displaySizeClass = computed(() => {
  const len = String(targetPerDay.value).length;
  if (len >= 4) return "text-[12px]";
  if (len === 3) return "text-[14px]";
  return "text-[16px]";
});

const totalParameters = computed(() => {
  if (!selectedPackage.value) return 0;
  return selectedPackage.value.modalValues.reduce((sum, section) => {
    return sum + section.values.length;
  }, 0);
});

const increase = () => {
  if (targetPerDay.value < MAX_TARGET) targetPerDay.value++;
};

const decrease = () => {
  if (targetPerDay.value > MIN_TARGET) targetPerDay.value--;
};

watch(targetPerDay, (val) => {
  const numeric = Number(val);
  if (isNaN(numeric)) {
    targetPerDay.value = MIN_TARGET;
    return;
  }
  if (numeric < MIN_TARGET) targetPerDay.value = MIN_TARGET;
  else if (numeric > MAX_TARGET) targetPerDay.value = MAX_TARGET;
  else targetPerDay.value = numeric;
});

watch(showModal, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// ── Lifecycle ─────────────────────────────────────────────────
onMounted(async () => {
  // Carousel whatsSelerisCare
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % whatsSelerisCare.length;
  }, 3000);

  // registerFlow carousel
  const SLIDE_DURATION = 4000;
  const TITLE_ANIM_DURATION = 500;
  showDescription.value = true;

  setInterval(() => {
    showDescription.value = false;
    currentIndex.value = (currentIndex.value + 1) % registerFlow.length;
    setTimeout(() => {
      showDescription.value = true;
    }, TITLE_ANIM_DURATION);
  }, SLIDE_DURATION);

  // scroll indicator logic
  const el = scrollContainer.value;
  if (el) {
    const stepElements = el.querySelectorAll(".step");

    scrollListener = () => {
      let current = 0;
      stepElements.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          current = index;
        }
      });
      currentStep.value = current;

      const maxScroll = el.scrollHeight - el.clientHeight;
      scrollProgress.value = Math.min((el.scrollTop / maxScroll) * 100, 100);
    };

    el.addEventListener("scroll", scrollListener);
    scrollListener();
  }

  // Content heights (SCA)
  await nextTick();
  contentHeights.value = contentRefs.value.map((el) => el.scrollHeight);

  // Benefit cards mobile auto-animate (SCA)
  checkMobileView();
  window.addEventListener("resize", checkMobileView);
});

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(benefitInterval);
  if (scrollContainer.value && scrollListener) {
    scrollContainer.value.removeEventListener("scroll", scrollListener);
  }
  window.removeEventListener("resize", checkMobileView);
});
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20" id="hero">
      <div
        class="w-full flex flex-col gap-y-8 max-smallest:h-[500px] h-[480px] md:h-[720px] lg:h-[710px] rounded-[20px] z-20"
      >
        <HeroText
          title="Smarter Corporate Health Monitoring"
          subtitle="Application"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#13B89C]"
          description=" Empower your organization with AI-driven employee wellness, preventive insights, and health cost control."
          descriptioncolor="text-[#6F6F6F]"
        />
        <div
          class="w-full max-w-lg h-auto mx-auto flex flex-row max-smallest:flex-col-reverse max-smallest:gap-5 gap-3 md:gap-5 justify-center max-smallest:px-10 px-0"
        >
          <!-- Button 1: width mengikuti teks -->
          <a
            href="https://sca.seleriscare.ai/register"
            target="_blank"
            aria-label="Daftar Jadi SCA"
            class="w-fit max-smallest:w-full h-auto"
          >
            <div
              class="w-auto h-auto flex py-2 md:py-2.5 px-5 justify-center items-center bg-[#13B89C] rounded-[24px] shadow-[0px_10px_15.1px_0px_rgba(19,184,156,0.25)]"
            >
              <p
                class="text-[#FFFFFF] font-[500] max-smallest:text-[10px] text-[12px] md:text-[14px] lg:text-[16px]"
              >
                Daftar Seleris Applicator!
              </p>
            </div>
          </a>

          <!-- Button 2: width mengikuti teks -->
          <a
            href="https://seleris.ai/contact"
            target="_blank"
            aria-label="Daftar Jadi SCA"
            class="w-fit max-smallest:w-full h-auto"
          >
            <div
              class="w-auto h-full p-[3px] rounded-[24px] animated-border-wrapper-contact cursor-pointer"
            >
              <div
                class="w-auto h-full flex px-5 max-smallest:py-1.5 py-0 justify-center items-center bg-[#FFFFFF] rounded-[24px]"
              >
                <p
                  class="text-[#7AC5B8] font-[500] max-smallest:text-[10px] text-[12px] md:text-[14px] lg:text-[16px]"
                >
                  Hubungi Kami
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!-- Image Phone -->
      <div class="relative w-full h-auto flex -mt-[120px] md:-mt-[250px]">
        <CareOrnament positionClass="top-[10px] md:-top-[30px] xl:-top-5" />
        <div class="w-full h-auto flex xl:-mt-[0px]">
          <div class="w-full h-auto flex justify-center items-center">
            <figure class="w-auto max-w-max h-auto flex">
              <img
                src="/assets/images/care.png"
                alt=""
                class="w-full h-[190px] md:h-[300px] lg:h-[450px] object-contain drop-shadow-[-5px_8px_5px_rgba(0,0,0,0.15)] md:drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.3)] lg:drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
              />
            </figure>
          </div>
        </div>
      </div>
      <!-- DownloadStore -->
      <div class="w-full max-w-sm mx-auto h-auto max-smallest:px-8 px-0 mt-10 md:mt-20">
        <DownloadStore />
      </div>
    </section>

    <!-- About Us -->
    <section class="relative w-full h-auto" id="about">
      <CareOrnament3
        positionClass="top-[50px] sm:-top-5 xl:-top-48"
        heightClass="w-full h-auto lg:h-full"
      />
      <CareOrnament2
        positionClass="bottom-[200px] sm:bottom-0 xl:top-44"
        heightClass="w-full h-auto lg:h-full"
      />
      <div
        class="relative w-full flex flex-col max-w-[1440px] mx-auto justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 md:px-12 xl:px-8"
      >
        <div class="w-full h-auto flex justify-center max-smallest:mt-3 mt-0">
          <AboutUs title="About Us" subtitle="Seleris Care" subtitleColor="text-[#42C5AF]" />
        </div>
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-10">
          <AboutUsDescription
            :image="imageAbout"
            title="AI Health Metrics Assistance Application"
            description="Seleris Care is an AI-powered platform built for corporate health and wellness. It automates employee health monitoring, delivers real-time preventive care insights, and helps companies optimize wellness programs while reducing medical costs by up to 20%"
          />
        </div>
      </div>
    </section>

    <section class="relative w-full h-full max-w-[1440px] mx-auto lg:mt-20 xl:mt-56">
      <div
        class="w-full h-auto py-10 md:py-14 px-8 md:px-12 lg:px-10 xl:px-32 flex flex-col gap-y-14 rounded-xl"
      >
        <div
          class="w-full h-auto grid over-smallest:grid-cols-1 grid-cols-2 lg:flex lg:flex-row over-smallest:gap-5 gap-4 md:gap-8 lg:gap-6 xl:gap-5"
        >
          <div
            v-for="(data, index) in whatsSelerisCare"
            :key="data.id"
            :class="[
              'relative w-full over-smallest:h-[160px] h-[190px] sm:h-[150px] md:h-[180px] lg:h-[190px] xl:h-[180px] p-[2px] rounded-2xl cursor-default',
              'transition-all duration-300 ease-out',
              (data.id === 2 || data.id === 4) && 'over-smallest:mt-0 mt-8 md:mt-14',

              index === activeIndex
                ? 'animated-border-wrapper -translate-y-2 shadow-[0_21px_16.9px_0_#0000001A]'
                : 'border-2 border-[#E6F0ED]',
            ]"
          >
            <div
              class="w-full h-full flex flex-col justify-between bg-white px-4 py-4 lg:px-3 lg:py-3 xl:px-4 xl:py-4 rounded-2xl"
            >
              <div
                class="w-auto h-auto"
                :class="[index === activeIndex ? 'text-white' : 'text-[#39D5BC]']"
              >
                <component
                  :is="data.icon"
                  class="w-8 h-8 md:w-10 md:h-10 object-contain p-1 md:p-2 rounded-[8px]"
                  :class="[index === activeIndex ? 'bg-[#39D5BC]' : 'bg-[#D8F7F2]']"
                />
              </div>
              <div class="w-full h-auto flex flex-col gap-y-1.5">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#374151] font-[600] over-smallest:text-[14px] text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] over-smallest:leading-normal leading-snug"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div class="w-full h-auto flex">
                  <span class="text-[#8E98A8] text-[12px] md:text-[12px] leading-normal font-[400]">
                    {{ data.content }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 xl:mt-56 scroll-mt-[80px]"
      id="howapplicationwork"
    >
      <CareOrnament2
        positionClass="bottom-[200px] sm:bottom-0 md:-top-[70%] xl:-top-48"
        heightClass="w-full h-auto lg:h-full"
        :mirror="true"
      />
      <!-- Application Work Slider -->
      <div class="relative w-full flex flex-col z-20">
        <div class="w-full h-auto px-8">
          <ApplicationWorkText productname="Seleris Care" textcolor="text-[#42C5AF]" />
        </div>
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <div
            class="w-full h-auto pt-4 pb-8 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pl-4 pr-4 md:scroll-pl-0 md:pl-0 md:pr-0 xl:scroll-pl-20 xl:pl-20 xl:pr-20 hide-scrollbar"
          >
            <div class="relative flex flex-row gap-x-14 md:gap-x-14 xl:gap-x-20 w-max h-auto">
              <div
                class="absolute px-[100px] sm:px-[130px] md:px-[170px] lg:px-[150px] top-0 w-full h-full py-4 flex"
              >
                <div
                  class="w-full h-1 relative left-0 top-[72%] sm:top-[70%] md:top-[70.5%] xl:top-[70.8%]"
                >
                  <div class="w-full h-full bg-[#B2D4CE]" />
                </div>
              </div>
              <div
                v-for="(workData, index) in stepApplicationWorks"
                :key="index"
                class="snap-start w-[200px] sm:w-[270px] md:h-[550px] xl:h-[650px] flex flex-col justify-center items-center shrink-0"
              >
                <div class="w-full h-[70%] shrink-0 flex justify-center items-start">
                  <img
                    :src="workData.image"
                    alt=""
                    srcset=""
                    class="w-full h-[90%] object-contain"
                  />
                </div>
                <div class="relative w-full h-[30%] shrink-0 flex flex-col items-center">
                  <div
                    class="relative w-8 h-8 md:w-10 md:h-10 -top-3 sm:-top-5 flex justify-center items-center p-2 bg-[#13B89C] border-2 border-white rounded-full"
                  >
                    <span class="text-[#FFFFFF] max-smallest:text-[14px] text-[18px]">{{
                      index + 1
                    }}</span>
                  </div>
                  <div
                    class="w-full h-full flex flex-col gap-y-3 md:gap-y-3 xl:gap-y-5 items-center md:px-10 lg:px-0"
                  >
                    <p class="text-center text-[#374151] font-[600] md:text-[18px] xl:text-[24px]">
                      {{ workData.title }}
                    </p>
                    <p
                      class="text-center text-[#515E71] font-[400] text-[12px] md:text-[14px] xl:text-[16px]"
                      v-html="workData.content"
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APA ITU SCA -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-20 md:mt-32 lg:mt-44"
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
                  class="text-[#FFFFFF] max-smallest:text-[16px] text-[18px] sm:text-[28px] md:text-[32px] lg:text-[24px] xl:text-[42px] xls:text-[42px] font-[600] leading-snug"
                >
                  Apa itu Seleris Care <br />
                  Applicator (SCA) ?
                </span>
              </div>
              <div class="w-full h-auto flex">
                <span
                  class="max-smallest:text-[10px] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] xls:text-[16px] text-[#FFFFFF] leading-snug font-[400]"
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
                  class="w-auto h-auto flex flex-row bg-[#47D2B4]/40 max-smallest:gap-x-2 gap-x-1.5 md:gap-x-3 px-3 md:py-1.5 sm:px-5 py-2 lg:py-2.5 xl:py-3 lg:px-4 xl:px-6 rounded-full"
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
                      class="text-white over-smallest:!pr-0 max-smallest:pr-10 text-[10px] sm:text-[14px] lg:text-[12px] xl:text-[16px] xls:text-[16px]"
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
              <div
                class="w-full h-auto flex flex-row max-smallest:flex-col gap-5 xl:gap-5 xls:gap-5"
              >
                <div
                  class="w-[50%] max-smallest:w-full h-auto flex flex-col max-smallest:flex-row bg-[#DDDDDD]/40 gap-3 md:gap-5 lg:gap-3 xl:gap-5 border-[#FFFFFF]/20 border-[1px] max-smallest:px-4 px-5 lg:px-3 xl:px-5 max-smallest:py-3 py-5 md:py-10 lg:py-3 xl:py-10 rounded-[12px]"
                >
                  <div
                    class="w-full max-smallest:w-fit max-smallest:flex max-smallest:items-center h-auto"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon1.png"
                      alt=""
                      class="max-smallest:w-10 max-smallest:h-10 w-14 h-14 md:w-auto md:h-auto lg:w-12 lg:h-12 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col gap-y-2">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] max-smallest:text-[12px] text-[16px] md:text-[24px] lg:text-[16px] xl:text-[24px] leading-tight"
                      >
                        Partner Resmi
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px] lg:text-[10px] xl:text-[14px]"
                      >
                        Telah melalui proses verifikasi dan sertifikasi
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-[50%] max-smallest:w-full h-auto flex flex-col max-smallest:flex-row bg-[#DDDDDD]/40 gap-3 md:gap-5 lg:gap-3 xl:gap-5 border-[#FFFFFF]/20 border-[1px] max-smallest:px-4 px-5 lg:px-3 xl:px-5 max-smallest:py-3 py-5 md:py-10 lg:py-3 xl:py-10 rounded-[12px]"
                >
                  <div
                    class="w-full max-smallest:w-fit max-smallest:flex max-smallest:items-center h-auto"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon2.png"
                      alt=""
                      class="max-smallest:w-10 max-smallest:h-10 w-14 h-14 md:w-auto md:h-auto lg:w-12 lg:h-12 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col gap-y-2">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] max-smallest:text-[12px] text-[16px] md:text-[24px] lg:text-[16px] xl:text-[24px] leading-tight"
                      >
                        Solusi Kesehatan
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px] lg:text-[10px] xl:text-[14px]"
                      >
                        Didukung teknologi scanning modern
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto">
                <div
                  class="w-full h-auto max-smallest:hidden flex flex-row gap-x-5 md:gap-x-5 px-5 py-5 md:py-8 lg:py-6 xl:py-8 xls:py-8 bg-[#FFFFFF]/40 border-[1px] border-[#DDDDDD]/20 rounded-[12px]"
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
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px]"
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
                <div
                  class="w-full h-auto max-smallest:flex hidden flex-col max-smallest:flex-row bg-[#DDDDDD]/40 gap-3 md:gap-5 lg:gap-3 xl:gap-5 border-[#FFFFFF]/20 border-[1px] max-smallest:px-4 px-5 lg:px-3 xl:px-5 max-smallest:py-3 py-5 md:py-10 lg:py-3 xl:py-10 rounded-[12px]"
                >
                  <div
                    class="w-full max-smallest:w-fit max-smallest:flex max-smallest:items-center h-auto"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/digital-ecosystem-icon2.png"
                      alt=""
                      class="max-smallest:w-10 max-smallest:h-10 w-14 h-14 md:w-auto md:h-auto lg:w-12 lg:h-12 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col gap-y-2">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] max-smallest:text-[12px] text-[16px] md:text-[24px] lg:text-[16px] xl:text-[24px] leading-tight"
                      >
                        Platform Digital Pintar
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px] lg:text-[10px] xl:text-[14px]"
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
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-0 md:px-12 lg:px-16 xls:px-32 mt-32 lg:mt-44"
    >
      <HealthParameter />
    </section>

    <!-- How Register -->
    <section
      class="flex relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 xl:mt-56 px-0 lg:px-12"
      id="howregister"
    >
      <div class="relative w-full flex flex-col gap-y-10 lg:gap-y-20 z-20">
        <div class="w-full h-auto flex px-8 md:px-12 lg:px-0">
          <ApplicationWorkText
            title="Register Seleris Care Applicator"
            productname="Seleris Care"
            textcolor="text-[#42C5AF]"
          />
        </div>

        <HowRegister
          :steps="registerFlow"
          :current-index="currentIndex"
          :show-description="showDescription"
        />
      </div>
    </section>

    <!-- Paket Pemeriksaan Kesehatan -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-10 lg:px-16 xls:px-32 mt-32 lg:mt-44"
    >
      <div class="w-full h-auto flex">
        <div class="w-full h-auto flex flex-col gap-y-10">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[24px] md:text-[28px] lg:text-[36px] text-[#374151] font-[600] text-center leading-tight tracking-wider"
            >
              Pilih paket kesehatan <br />
              sesuai kebutuhan anda
            </span>
          </div>
          <div class="w-full h-auto flex flex-col gap-y-6">
            <!-- <div class="flex items-center justify-center gap-6">
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
            </div> -->
            <div class="w-full h-auto mx-auto">
              <div class="w-full h-auto flex flex-col gap-y-5 md:flex-row gap-x-5">
                <PaketPemeriksaan
                  v-for="pkg in packages"
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

    <!-- Dashboard Preview -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] mt-20 md:mt-32 lg:mt-44"
      id="keunggulan"
    >
      <DashboardPreview />
    </section>

    <!-- Komisi -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-14 md:mt-32 pt-20"
      id="komisi"
    >
      <div class="w-full h-auto bg-[#FAFAFA] rounded-[16px]">
        <div
          class="w-full h-auto flex flex-col lg:flex-row gap-x-5 py-12 px-4 md:px-12 lg:px-8 xl:px-20 xls:px-14 rounded-[16px]"
        >
          <div class="w-full h-auto flex flex-col gap-y-5">
            <div class="w-full h-auto flex justify-center lg:justify-start">
              <span class="text-[#374151] font-[600] text-[16px] lg:text-[24px] xl:text-[26px]">
                Struktur komisi & <br class="hidden lg:block" />
                simulasi penghasilan
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
                    Harga layanan
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
                    <span class="text-[#B8B8B8] text-[10px]">/ skrining</span>
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span class="text-[#49D89C] font-[600] text-[12px] md:text-[14px]">
                    Terjangkau
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full h-auto flex max-smallest:flex-col flex-col sm:flex-row gap-5">
              <div
                class="relative w-full over-smallest:h-[110px] h-[120px] md:h-[125px] bg-[#83C5FF] px-5 over-smallest:py-0 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 over-smallest:py-0 max-smallest:py-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#195279] text-[12px] md:text-[14px] font-[500]">
                      Komisi langsung
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[22px] md:text-[26px] font-[600] text-[#2D71DD]"> 15% </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] md:text-[12px] text-[#2D71DD] font-[500]">
                      ± Rp 45.000 / skrining
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="relative w-full over-smallest:h-[110px] h-[120px] md:h-[125px] bg-[#82F9CF] px-5 over-smallest:py-0 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 over-smallest:py-0 max-smallest:py-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#00B692] text-[12px] md:text-[14px] font-[500]">
                      Komisi jaringan
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[22px] md:text-[26px] font-[600] text-[#00B171]"> 10% </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] md:text-[12px] text-[#00B171] font-[500]">
                      ± Rp 30.000 / skrining
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-5 px-4 xl:px-8 py-5 bg-[#114365] border-[0.3px] border-[#CCCCCC] rounded-[18px]"
            >
              <div
                class="w-full h-auto flex over-smallest:flex-col over-smallest:gap-y-3 flex-row justify-between"
              >
                <div class="w-auto h-auto flex items-center">
                  <span
                    class="over-smallest:text-[14px] text-[12px] md:text-[18px] lg:text-[14px] xls:text-[16px] text-[#FFFFFF] font-[600]"
                  >
                    Target skrining per Hari
                  </span>
                </div>
                <div class="w-auto h-auto flex justify-end">
                  <div
                    class="w-full h-full grid grid-cols-3 bg-[#DFDFDF]/50 border-[0.5px] border-[#799BB2] rounded-[6px]"
                  >
                    <div
                      class="over-smallest:w-full w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center md:pl-5 py-1 cursor-pointer"
                      @click="decrease"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]"> - </span>
                    </div>
                    <div
                      class="over-smallest:w-full w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center py-1"
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
                      class="over-smallest:w-full w-[30px] md:w-[55px] lg:w-[40px] xl:w-[45px] h-full flex justify-center items-center md:pr-5 py-1 cursor-pointer"
                      @click="increase"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]"> + </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto flex flex-col over-smallest:gap-y-2 gap-y-1">
                <div
                  class="w-full h-auto flex over-smallest:flex-col over-smallest:gap-y-2 flex-row justify-between"
                >
                  <div class="w-full md:w-auto h-auto flex items-center">
                    <span
                      class="text-[12px] md:text-[18px] lg:text-[14px] text-[#37B3D5] font-[400]"
                    >
                      Potensi pendapatan bulanan anda
                    </span>
                  </div>
                  <div
                    class="w-full md:w-auto h-auto flex items-center over-smallest:justify-start justify-end"
                  >
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

    <!-- Benefit SCA -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 xl:px-20 xls:px-32 mt-20 md:mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#FAFAFA] max-smallest:px-2 px-4 md:px-6 py-10 md:py-20 gap-y-8 md:gap-y-10 lg:gap-y-14 rounded-[20px] md:rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-5">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] text-[20px] sm:text-[32px] lg:text-[40px] xl:text-[44px] font-[600] text-center"
            >
              Benefit menjadi SCA
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
          class="md:max-w-4xl lg:max-w-3xl xl:max-w-4xl md:mx-auto w-full h-auto flex flex-col sm:flex-row gap-y-10 sm:gap-x-4 xl:gap-x-8 px-4"
        >
          <div
            :class="[
              'w-full h-auto p-0.5 rounded-xl overflow-hidden transition-all duration-500',
              isMobileView && activeBenefitCard === 0
                ? 'animated-border-wrapper-blue-active'
                : 'animated-border-wrapper-blue',
            ]"
          >
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
                      class="max-smallest:w-8 w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="max-smallest:text-[12px] text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
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
          <div
            :class="[
              'w-full h-auto p-0.5 rounded-xl overflow-hidden transition-all duration-500',
              isMobileView && activeBenefitCard === 1
                ? 'animated-border-wrapper-teal-active'
                : 'animated-border-wrapper-teal',
            ]"
          >
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
                      class="max-smallest:w-8 w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="max-smallest:text-[12px] text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
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

    <section class="flex relative w-full h-auto mx-auto mt-14 lg:mt-20 xl:mt-44" id="downline">
      <div class="relative w-full flex flex-col gap-y-0 z-20">
        <div class="w-full h-auto flex max-w-[1440px] mx-auto px-8 md:px-0">
          <ApplicationWorkText
            title="Seleris Care Downline"
            productname="Seleris Care"
            textcolor="text-[#42C5AF]"
          />
        </div>
        <Downline :items="downlineData" />
      </div>
    </section>

    <!-- Testimonial -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] lg:px-0 xl:max-w-[1440px] xl:px-0 pt-32"
      id="testimonial"
    >
      <div class="w-full h-auto flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 pb-10">
        <div class="w-full h-auto flex flex-col gap-y-10 lg:gap-y-10">
          <div
            class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-4 max-[375px]:!px-6 px-8 md:px-12 lg:px-20 xl:px-32"
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
            <div class="absolute w-full h-full z-10 top-1/2 -translate-y-1/2 px-0 xl:px-0">
              <img
                src="@/assets/Products/images/Care-Applicator/testimonial-background.png"
                alt=""
                class="w-full h-[300px] sm:h-[340px] md:h-[300px] lg:h-[345px] xl:h-[430px] object-fill object-top"
              />
            </div>
            <div
              class="relative w-full h-auto group mt-10 xl:mt-6 z-20 bg-transparent px-0 lg:px-16 xl:px-32"
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
                <SwiperSlide v-for="(item, index) in scaTestimonials" :key="index">
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

    <!-- Client -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto lg:px-8 mt-20 xl:mt-32"
      id="client"
    >
      <div class="w-full h-auto flex flex-col">
        <TitleAndSubCard
          title="Our Client"
          subtitle="Seleris Meditekno Internasional"
          subtitleColor="text-[#42C5AF]"
        />
        <div class="mt-10 lg:px-12">
          <ClientCardFrameProduct :client-logos="clientLogos" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-14 md:mt-32 pt-20 py-10"
      id="faq"
    >
      <Faq />
    </section>

    <!-- Download App -->
    <section class="relative w-full h-auto mt-20 lg:mt-40 xl:mt-56" id="download">
      <CareOrnament4
        positionClass="max-smallest:top-[30px] top-[0px] sm:-top-5 top-[100px] lg:-top-[130px] xl:-top-[250px]"
        heightClass="w-full h-auto lg:h-full"
      />
      <div class="w-full h-auto md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto relative z-30">
        <DownloadFrame
          appname="Selica"
          description="Enable smarter employee health monitoring with real-time wellness insights, AI-powered preventive analytics, and proactive health cost management — all in one secure corporate platform."
          :img="DownloadImage"
        />
      </div>
      <CareOrnament4
        positionClass="max-smallest:bottom-[50px] bottom-[10px] sm:bottom-5 bottom-[100px] lg:-bottom-[130px] xl:-bottom-[300px]"
        heightClass="w-full h-auto lg:h-full"
        :mirror="true"
      />
    </section>

    <!-- ========== SCA SECTIONS ========== -->

    <!-- DISCLAIMER -->
    <section
      class="relative w-full h-full z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-16 xl:px-20 xls:px-32 mt-20 xl:mt-52 py-10 bg-[#FAFAFA]"
    >
      <Disclaimer />
    </section>

    <!-- Book Demo -->
    <section
      class="relative w-full h-auto max-w-7xl mx-auto mt-20 lg:mt-40 px-8 lg:px-16 xl:px-10"
      id="bookdemo"
    >
      <BookDemoProduct
        title="Seleris Care A Complete Solution for Your Health Needs"
        :framebookdemo="medinsframebook"
        colorarrow="text-[#42C5AF]"
      />
    </section>

    <!-- MODALS -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 transition-all duration-300 overflow-y-auto bg-[#FFFFFF]"
      >
        <transition name="zoom">
          <div
            v-if="selectedPackage"
            class="w-full lg:max-w-4xl xl:max-w-5xl mx-auto relative z-50 flex flex-col gap-y-6 lg:gap-y-14 xls:gap-y-16 pt-10 px-0"
          >
            <div class="w-full h-auto flex px-10 lg:px-0">
              <button
                @click="handleCloseModal()"
                class="w-auto h-auto flex flex-row bg-[#2EDFC1]/70 rounded-full cursor-pointer"
              >
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center p-2 bg-[#3DDAC1] text-white rounded-full shadow-[0_4px_12px_0_rgba(61,218,193,0.2)]"
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
                <div class="w-auto pl-3 pr-4 h-auto flex justify-center items-center">
                  <span class="text-[#FFFFFF] font-[500] text-[14px] md:text-[16px]"
                    >Kembali ke beranda</span
                  >
                </div>
              </button>
            </div>

            <div
              class="w-full h-auto xls:h-auto flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 gap-x-0"
            >
              <!-- LEFT -->
              <div class="w-full lg:w-[45%] shrink-0 h-auto relative px-10 lg:px-0">
                <div class="sticky top-10 w-full h-auto flex flex-col gap-y-5 items-start">
                  <div class="w-full h-[45px] flex items-start">
                    <div
                      class="w-auto h-auto shrink-0 flex p-[2px] bg-gradient-to-r from-[#4273C2] to-[#4273C2]/0 rounded-full"
                    >
                      <div class="w-auto h-auto bg-[#C4EAFF] px-10 py-2 rounded-full">
                        <span class="text-[#4273C2] font-[600] text-[14px] lg:text-[16px]">
                          Paket
                          <span class="uppercase">
                            {{ selectedPackage.label }}
                            <!-- ✅ fix: .name → .label -->
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="w-full h-auto flex flex-col sm:flex-row lg:flex-col gap-y-3">
                    <div class="w-full h-auto flex flex-col gap-y-3">
                      <div class="w-full h-auto flex">
                        <span
                          class="text-[20px] md:text-[28px] lg:text-[38px] text-[#374151] font-[600] leading-tight tracking-wider"
                        >
                          Kesehatan anda, <br />
                          analisis
                          <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-[#13B89C] to-[#2EDFC1]"
                          >
                            tanpa <br class="hidden sm:block" />jarum
                          </span>
                        </span>
                      </div>
                      <div class="w-full h-auto flex">
                        <span
                          class="text-[#8E98A8] font-[400] text-[16px] leading-relaxed tracking-wide"
                        >
                          Solusi cepat untuk pemantauan <br />rutin kesehatan dasar Anda.
                        </span>
                      </div>
                    </div>
                    <div
                      class="w-full sm:w-[70%] h-auto flex flex-col gap-y-2 items-start bg-[#FAFAFA] px-5 py-4 rounded-[24px]"
                    >
                      <div class="w-full h-auto flex">
                        <span class="text-[16px] font-[500] text-[#374151]"
                          >Harga detail layanan</span
                        >
                      </div>
                      <div class="w-full h-auto flex flex-col">
                        <del class="text-[#9CA3AF] decoration-[#E22F4A]">
                          <p class="text-[#CDCDCD] font-[400] text-[12px] lg:text-[16px]">
                            Rp {{ formatRupiah(getPriceDeleted(selectedPackage.price)) }}
                          </p>
                        </del>
                        <span class="text-[20px] md:text-[28px] font-[600] text-[#374151]">
                          Rp {{ formatRupiah(selectedPackage.price) }}
                          <!-- ✅ fix: tambah formatRupiah -->
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
                          <span class="text-[#374151] text-[14px] lg:text-[12px] xl:text-[16px]">
                            Hasil keluar dalam 5 Menit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://sca.seleriscare.ai/register"
                    aria-label="Daftar Jadi SCA"
                    class="w-full lg:w-[83%] h-auto inline-flex justify-center items-center gap-x-3 py-2.5 md:py-2 lg:py-3 bg-[#3DDAC1] rounded-[8px]"
                  >
                    <span
                      class="text-white whitespace-nowrap text-[14px] md:text-[16px] lg:text-[18px] font-[500]"
                    >
                      Daftar SCA & mulai jualan
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
                  </a>
                </div>
              </div>

              <!-- RIGHT -->
              <div class="w-full h-auto overflow-y-auto flex flex-col gap-y-8">
                <div class="w-full h-auto flex px-10 lg:px-5">
                  <div
                    class="w-full h-auto flex flex-wrap gap-5 bg-[#FFFFFF] p-5 border-[0.5px] border-[#DADADA] rounded-[16px] shadow-lg"
                  >
                    <div
                      v-for="feature in selectedPackage.modalValues"
                      :key="feature"
                      class="flex flex-row items-start gap-x-2 lg:gap-x-2"
                    >
                      <div
                        class="w-5 h-5 lg:w-6 lg:h-6 shrink-0 flex justify-center items-center bg-[#10F492]/20 rounded-full p-1"
                      >
                        <img src="@/assets/icons/green-checklist.svg" />
                      </div>
                      <div class="w-full h-auto flex items-center">
                        <p class="text-[#515E71] text-[14px] lg:text-[16px]">
                          {{ capitalizeFirst(feature.name) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-3 lg:px-5">
                  <div class="w-full h-auto flex items-center flex-shrink-0 px-10 lg:px-0">
                    <span class="text-[20px] font-[600] text-[#374151]">
                      Detail parameter ({{ totalParameters }})
                    </span>
                  </div>
                  <div
                    class="w-full h-auto flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-8 pb-10 overflow-x-auto px-10 lg:px-0 snap-x snap-mandatory lg:overflow-x-visible lg:snap-none scrollbar-hide"
                  >
                    <div
                      v-for="data in selectedPackage.modalValues"
                      :key="data.name"
                      class="shrink-0 snap-center w-[85vw] lg:w-full h-full lg:h-auto flex flex-col bg-[#FFFFFF] gap-3 px-6 py-6 border-[0.5px] border-[#DADADA] rounded-[16px] shadow-lg"
                    >
                      <div class="w-full h-auto flex">
                        <span class="text-[#374151] font-[600] text-[18px]">
                          {{ capitalizeFirst(data.name) }}
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
                              class="text-[#374151] text-[12px] sm:text-[14px] lg:text-[12px] xl:text-[14px]"
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
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
input[type="number"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
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
  transform: scale(0.5);
}
.zoom-enter-to,
.zoom-leave-from {
  opacity: 1;
  transform: scale(1);
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

/* ===== ABOUT CARD (whatsSelerisCare) ===== */
.animated-border-wrapper-contact {
  background: conic-gradient(
    from var(--angle),
    #f0faf3 0%,
    #e8f7ed 15%,
    #d4f0df 30%,
    #a8dfc0 45%,
    #5cbd8a 60%,
    #2ebd60 70%,
    #5cbd8a 80%,
    #d4f0df 90%,
    #f0faf3 100%
  );
  animation: spin-border 4s linear infinite;
}

/* ===== ABOUT CARD (whatsSelerisCare) ===== */
.animated-border-wrapper {
  background: conic-gradient(
    from var(--angle),
    #eaf8ee 0%,
    #dff4e6 25%,
    #bde9cb 50%,
    #2ab857 75%,
    #eaf8ee 100%
  );
  animation: spin-border 4s linear infinite;
}

/* ===== BENEFIT CARD - BLUE ===== */
.animated-border-wrapper-blue {
  background: linear-gradient(180deg, rgba(66, 198, 176, 0) 20%, #54b5ff 100%);
  animation: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Desktop: hover */
.animated-border-wrapper-blue:hover {
  background: conic-gradient(
    from var(--angle),
    #42c5af00 0%,
    #54b5ff 40%,
    #54b5ff 60%,
    #42c5af00 100%
  );
  animation: spin-border 4s linear infinite;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(84, 181, 255, 0.25);
}

/* Mobile/tablet: auto-animate aktif */
.animated-border-wrapper-blue-active {
  background: conic-gradient(
    from var(--angle),
    #42c5af00 0%,
    #54b5ff 40%,
    #54b5ff 60%,
    #42c5af00 100%
  );
  animation: spin-border 4s linear infinite;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(84, 181, 255, 0.25);
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
}

/* ===== BENEFIT CARD - TEAL ===== */
.animated-border-wrapper-teal {
  background: linear-gradient(0deg, rgba(59, 227, 201, 0) 20%, #3be3c9 100%);
  animation: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Desktop: hover */
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

/* Mobile/tablet: auto-animate aktif */
.animated-border-wrapper-teal-active {
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
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
}

/* ===== SCROLLBAR ===== */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.img-fade-enter-active,
.img-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.img-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.img-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
