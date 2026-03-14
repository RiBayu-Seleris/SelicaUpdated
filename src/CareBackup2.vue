<script setup>
import { onMounted, onUnmounted, ref } from "vue"; // ✅ tambah onUnmounted

import HeroText from "@/Components/HeroText.vue";
import PhoneHero from "@/Components/PhoneHero.vue";
import AboutUs from "@/Components/AboutUs.vue";
import AboutUsDescription from "@/Components/AboutUsDescription.vue";
import DownloadStore from "@/Components/DownloadStore.vue";
import ApplicationWorkText from "@/Components/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@/Components/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@/Components/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@/Components/ClientCardFrameProduct.vue";
import FaqFrame from "@/Components/FaqFrame.vue";
import DownloadFrame from "@/Components/DownloadFrame.vue";
import BookDemoProduct from "@/Components/BookDemoProduct.vue";
import TestimonialCommentFrame from "@/Components/TestimonialCommentFrame.vue";
import Circle from "@/Components/Svg/Circle.vue";
import CardWithIcon from "@/Components/CardWithIcon.vue";
import EasyQuickText from "@/Components/EasyQuickText.vue";
import InnovationIcon from "@/assets/icons/innovation.svg";
import ArrowRight from "@/assets/Products/icons/arrow-right.svg";
import CareOrnament from "@/Components/Svg/CareOrnament.vue";
import CareOrnament2 from "@/Components/Svg/CareOrnament2.vue";
import CareOrnament3 from "@/Components/Svg/CareOrnament3.vue";
import CareOrnament4 from "@/Components/Svg/CareOrnament4.vue";
import imageAbout from "@/assets/Products/images/Care/about-care.png";
import FrameLineWorks from "@/Components/Svg/HealthCareDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-care.png";
import DownloadImage from "@/assets/Products/images/Care/download-care.png";

// HealthCare Data
import { healthCheck } from "@/Data/Products/HealthCare/healthCheck";
import { faq } from "@/Data/Products/HealthCare/faq.js";
import { careWorkSteps } from "@/Data/Products/HealthCare/careworkSteps.js";
import { testimonials } from "@/Data/Products/HealthCare/testimonials";
import { whatsSelerisCare } from "@/Data/Products/CareApplicator/WhatsSelerisCare.js";
import { clientLogos } from "@/Data/Products/HealthCare/CareClients";

const work1 = ref(false);
let interval = null;
const activeIndex = ref(0);

const stepsWithPath = careWorkSteps.map((step) => ({
  ...step,
  image: new URL(`/src/assets/Products/images/Care/${step.image}`, import.meta.url).href,
}));

// ✅ registerFlow carousel
const registerFlow = [
  {
    id: 1,
    title: "Register Akun",
    description:
      "Daftarkan akun Seleris Applicator melalui browser dengan mengunjungi sca.seleriscare.ai, lalu lengkapi seluruh data yang diperlukan untuk proses pendaftaran.",
    image: new URL("@/assets/Products/images/Care/result.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Download Seleris Care",
    description:
      "Unduh aplikasi Seleris Care melalui Google Play Store, kemudian instal aplikasi tersebut di perangkat Anda sebelum memulai proses deteksi.",
    image: new URL("@/assets/Products/images/Care/download-care.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Login Seleris Care",
    description:
      "Masuk ke aplikasi Seleris Care menggunakan akun yang telah Anda daftarkan sebelumnya untuk mulai melakukan proses deteksi kesehatan.",
    image: new URL("@/assets/Products/images/Care/face-scan.png", import.meta.url).href,
  },
];

const currentIndex = ref(0);
const showDescription = ref(false);

// ✅ scroll indicator
const scrollContainer = ref(null);
const currentStep = ref(0);
const scrollProgress = ref(0);

// const steps = [
//   {
//     title: "Remote Photoplethysmography Technology",
//     description:
//       "Seleris harnesses rPPG technology to evaluate various vital signs that represent a customer's health condition.",
//   },
//   {
//     title: "Artificial Intelligence and Machine Learning Adoption",
//     description:
//       "Seleris capitalizes on cutting-edge AI and ML algorithms to evaluate underwriting decisions and furnish comprehensive coverage advice.",
//   },
//   {
//     title: "Data Security and Privacy Compliance",
//     description:
//       "Seleris securely stores and processes customer data, ensuring compliance with global regulations while protecting sensitive information.",
//   },
// ];

// ✅ simpan referensi listener agar bisa di-remove
let scrollListener = null;

onMounted(() => {
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

  // ✅ scroll indicator logic
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
});

// ✅ cleanup saat komponen di-unmount
onUnmounted(() => {
  clearInterval(interval);
  if (scrollContainer.value && scrollListener) {
    scrollContainer.value.removeEventListener("scroll", scrollListener);
  }
});
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20" id="hero">
      <div
        class="w-full flex flex-col gap-y-8 h-[480px] md:h-[720px] lg:h-[710px] rounded-[20px] z-20"
      >
        <HeroText
          title="Smarter Corporate Health Monitoring"
          subtitle="Application"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#13B89C]"
          description=" Empower your organization with AI-driven employee wellness, preventive insights, and health cost control."
          descriptioncolor="text-[#6F6F6F]"
        />
        <div class="w-full max-w-lg h-auto mx-auto flex flex-row gap-x-3 md:gap-x-5 justify-center">
          <!-- Button 1: width mengikuti teks -->
          <a
            href="https://sca.seleriscare.ai/register"
            target="_blank"
            aria-label="Daftar Jadi SCA"
            class="w-fit h-auto"
          >
            <div
              class="w-auto h-auto flex py-2 md:py-2.5 px-5 justify-center items-center bg-[#13B89C] rounded-[24px] shadow-[0px_10px_15.1px_0px_rgba(19,184,156,0.25)]"
            >
              <p
                class="text-[#FFFFFF] font-[500] text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px]"
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
            class="w-fit h-auto"
          >
            <div
              class="w-auto h-full p-[3px] rounded-[24px] animated-border-wrapper-contact cursor-pointer"
            >
              <div
                class="w-auto h-full flex px-5 justify-center items-center bg-[#FFFFFF] rounded-[24px]"
              >
                <p
                  class="text-[#7AC5B8] font-[500] text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px]"
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
      <div class="w-full max-w-sm mx-auto h-auto mt-10 md:mt-20">
        <DownloadStore />
      </div>
    </section>

    <!-- About Us -->
    <section class="relative w-full h-auto" id="about">
      <CareOrnament3
        positionClass="top-[50px] sm:-top-5 xl:-top-7"
        heightClass="w-full h-auto lg:h-full"
      />
      <CareOrnament2
        positionClass="bottom-[200px] sm:bottom-0 xl:top-44"
        heightClass="w-full h-auto lg:h-full"
      />
      <div
        class="relative w-full flex flex-col max-w-[1440px] mx-auto justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 px-8"
      >
        <AboutUs title="About Us" subtitle="Seleris Care" subtitleColor="text-[#42C5AF]" />
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
        class="w-full h-auto py-10 md:py-14 px-4 md:px-8 lg:px-10 xl:px-32 flex flex-col gap-y-14 rounded-xl"
      >
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

              index === activeIndex
                ? 'animated-border-wrapper -translate-y-2 shadow-[0_21px_16.9px_0_#0000001A]'
                : 'border-2 border-[#E6F0ED]',
            ]"
          >
            <div
              class="w-full h-full flex flex-col justify-between bg-white rounded-2xl p-4 lg:p-3 xl:p-4"
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

    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 xl:mt-20"
      id="howapplicationwork"
    >
      <div class="relative w-full flex flex-col gap-y-10 justify-center items-center z-20">
        <ApplicationWorkText productname="Seleris Care" textcolor="text-[#42C5AF]" />

        <div class="w-full h-[500px] flex flex-row px-28">
          <!-- ✅ hapus bg-purple-700 -->

          <!-- Kolom kiri (untuk video/gambar) -->
          <div class="w-[35%] shrink-0 h-auto">
            <Transition name="img-fade" mode="out-in">
              <img
                :key="currentIndex"
                :src="registerFlow[currentIndex].image"
                alt=""
                class="w-full h-full object-contain"
              />
            </Transition>
          </div>
          <!-- ✅ hapus bg-red-700 -->

          <div class="w-full h-full flex flex-row">
            <!-- ✅ hapus bg-green-700 -->

            <!-- Scroll Indicator -->
            <div class="relative w-[30%] shrink-0 h-full">
              <div class="absolute left-0 top-0 h-full flex flex-col items-center z-10 w-full">
                <!-- ✅ Ganti div garis lurus → SVG arc curved ke kanan -->
                <svg
                  class="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 120 300"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M 30 0 C 100 40, 170 200, 30 300"
                    stroke="#E5E7EB"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 30 0 C 100 40, 170 200, 30 300"
                    stroke="#22C55E"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                    stroke-dasharray="420"
                    :stroke-dashoffset="
                      currentIndex === registerFlow.length - 1
                        ? 0
                        : 420 - (380 * (currentIndex + 1)) / registerFlow.length
                    "
                    class="transition-all duration-500 ease-out"
                  />
                </svg>

                <!-- Titik-titik — tidak ada yang berubah dari sebelumnya -->
                <div class="relative z-20 h-full flex flex-col justify-around py-0">
                  <div
                    v-for="(register, index) in registerFlow"
                    :key="index"
                    :class="[
                      'w-10 h-10 rounded-full border-2 transition-all duration-300 bg-white relative flex justify-center items-center',
                      currentIndex >= index ? 'border-green-500 scale-110' : 'border-gray-300',
                      index === 1 ? 'ml-[250%]' : 'ml-[100%]',
                    ]"
                  >
                    <div
                      v-if="currentIndex >= index"
                      class="absolute inset-0.5 bg-green-500 rounded-full transition-all duration-300 flex justify-center items-center"
                    >
                      <span class="text-[14px] font-[500] text-white">{{ index + 1 }}</span>
                    </div>
                    <span v-else class="text-[14px] font-[500] text-green-500">{{
                      index + 1
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- registerFlow carousel -->
            <div class="flex flex-col w-full h-full gap-y-0 transition-all duration-500 ease-out">
              <div
                v-for="(register, index) in registerFlow"
                :key="index"
                class="relative w-full h-full flex flex-col items-center gap-y-0 lg:gap-y-0 transition-all lg:justify-between duration-500 ease-out"
                :class="index === 0 || index === 2 ? '-ml-3' : 'ml-10'"
              >
                <div
                  class="absolute left-0 w-full flex items-center transition-all duration-500 ease-out"
                  :class="[
                    index === currentIndex
                      ? 'top-0 h-[40px] lg:h-[60px] xl:h-[90px]'
                      : 'h-full top-1/2 -translate-y-1/2',
                  ]"
                >
                  <p
                    class="font-[500] leading-snug tracking-normal transition-all duration-500 ease-out text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[24px] max-[321px]:!text-[14px] max-[376px]:!text-[14px]"
                    :class="index === currentIndex ? 'text-[#13B89C]' : 'text-[#D6D6D6]'"
                  >
                    {{ register.title }}
                  </p>
                </div>
                <div
                  v-if="index === currentIndex && showDescription"
                  class="absolute bottom-0 sm:bottom-3 lg:-bottom-3 xl:-bottom-1 xls:bottom-3 max-[321px]:!bottom-4 left-0 w-full h-auto transition-all duration-500 ease-out animate__animated animate__fadeIn"
                >
                  <p
                    class="font-[400] text-[#515E71] text-[12px] sm:text-[16px] lg:text-[12px] xl:text-[14px] xls:text-[16px] max-[321px]:!text-[10px] leading-snug tracking-wide"
                  >
                    {{ register.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Easy Quick -->
    <section class="relative w-full h-auto max-w-[1440px] mx-auto px-8 mt-20" id="easyquick">
      <div class="w-full h-auto flex flex-col px-8 pt-14 pb-20 bg-[#F3F4F6] rounded-[20px]">
        <div class="w-full h-auto flex flex-col gap-y-2">
          <EasyQuickText
            title="Smarter Health Management with"
            subtitle="AI-Powered Automation"
            subtitlecolor="text-[#42C5AF]"
            subsubtitle="Seleris Meditekno Internasional"
          />
        </div>
        <div
          class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-8 md:gap-y-8 lg:gap-12 mt-10 lg:mt-16"
        >
          <div v-for="(data, index) in healthCheck" :key="index" class="w-full h-auto">
            <CardWithIcon
              :icon="data.icon"
              :title="data.title"
              :description="data.description"
              :subtitleClass="data.subtitleClass"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 xl:mt-56 scroll-mt-[80px]"
      id="howapplicationwork"
    >
      <!-- Application Work Slider -->
      <div class="relative w-full flex flex-col justify-center items-center z-20">
        <ApplicationWorkText productname="Seleris Care" textcolor="text-[#42C5AF]" />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#23C4BA] to-[#4ADDD4]"
            textcolor="text-[#38C1AA]"
            :steps="stepsWithPath"
          >
            <FrameLineWorks />
          </ApplicationWorkSlider>
        </div>
      </div>
    </section>

    <!-- Client -->
    <section class="relative w-full h-auto max-w-[1440px] mx-auto lg:px-8 mt-20" id="client">
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

    <!-- Testimonial -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 md:mt-28 lg:mt-40"
      id="testimonial"
    >
      <div class="relative w-full flex flex-col justify-center items-center z-20 pt-20">
        <div class="w-full h-auto px-8">
          <TitleAndSubCard
            title="Testimonial"
            subtitle="Seleris Meditekno Internasional"
            subtitleColor="text-[#42C5AF]"
          />
        </div>
        <TestimonialCommentFrame :Testimonials="testimonials" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-20" id="faq">
      <div class="relative w-full z-30">
        <div class="relative w-full flex flex-col justify-center items-center z-20 pt-20">
          <div class="w-full h-auto px-8">
            <TitleAndSubCard
              title="FAQ's"
              subtitle="Seleris Meditekno Internasional"
              subtitleColor="text-[#42C5AF]"
            />
          </div>
        </div>
        <div class="w-full mx-auto mt-10 md:mt-10">
          <FaqFrame :Faq="faq" opencolortext="text-[#2AB857]" />
        </div>
      </div>
    </section>

    <!-- Download App -->
    <section class="relative w-full h-auto mt-20 lg:mt-40" id="download">
      <CareOrnament4
        positionClass="top-[150px] sm:-top-5 top-[100px] lg:-top-[130px] xl:-top-[180px]"
        heightClass="w-full h-auto lg:h-full"
      />
      <div class="w-full h-auto md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto relative z-30">
        <DownloadFrame
          appname="Seleris Care"
          description="Enable smarter employee health monitoring with real-time wellness insights, AI-powered preventive analytics, and proactive health cost management — all in one secure corporate platform."
          :img="DownloadImage"
        />
      </div>
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
  background: linear-gradient(180deg, rgba(59, 227, 201, 0) 20%, #3be3c9 100%);
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
  transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1); /* lebih smooth */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* geser dikit ke atas */
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
