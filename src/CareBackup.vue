<script setup>
import { onMounted, ref } from "vue";

import HeroText from "@/components/HeroText.vue";
import PhoneHero from "@/components/PhoneHero.vue";
import AboutUs from "@/components/AboutUs.vue";
import AboutUsDescription from "@/components/AboutUsDescription.vue";
import DownloadStore from "@/components/DownloadStore.vue";
import ApplicationWorkText from "@/components/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@/components/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@/components/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@/components/ClientCardFrameProduct.vue";
import FaqFrame from "@/components/FaqFrame.vue";
import DownloadFrame from "@/components/DownloadFrame.vue";
import BookDemoProduct from "@/components/BookDemoProduct.vue";

import TestimonialCommentFrame from "@/components/TestimonialCommentFrame.vue";
import Circle from "@/components/Svg/Circle.vue";

import CardWithIcon from "@/components/CardWithIcon.vue";
import EasyQuickText from "@/components/EasyQuickText.vue";
import InnovationIcon from "@/assets/icons/innovation.svg";
import ArrowRight from "@/assets/Products/icons/arrow-right.svg";

import CareOrnament from "@/components/Svg/CareOrnament.vue";
import CareOrnament2 from "@/components/Svg/CareOrnament2.vue";
import CareOrnament3 from "@/components/Svg/CareOrnament3.vue";
import CareOrnament4 from "@/components/Svg/CareOrnament4.vue";

import imageAbout from "@/assets/Products/images/Care/about-care.png";
import FrameLineWorks from "@/components/Svg/HealthCareDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-care.png";

import DownloadImage from "@/assets/Products/images/Care/download-care.png";

// HealthCare Data
import { healthCheck } from "@/Data/Products/HealthCare/healthCheck";
import { faq } from "@/Data/Products/HealthCare/faq.js";
import { careWorkSteps } from "@/Data/Products/HealthCare/careworkSteps.js";
import { testimonials } from "@/Data/Products/HealthCare/testimonials";
import { whatsSelerisCare } from "@/Data/Products/CareApplicator/WhatsSelerisCare.js";

const work1 = ref(false);
let interval = null;
const activeIndex = ref(0);

import { clientLogos } from "@/Data/Products/HealthCare/CareClients";

// gabungkan otomatis base path + nama file
const stepsWithPath = careWorkSteps.map((step) => ({
  ...step,
  image: new URL(`/src/assets/Products/images/Care/${step.image}`, import.meta.url).href,
}));

const checkMobileView = () => {
  isMobileView.value = window.innerWidth <= 768;
  if (isMobileView.value) {
    if (!benefitInterval) {
      activeBenefitCard.value = 0; // mulai dari card biru
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

onMounted(() => {
  // Carousel whatsSelerisCare
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % whatsSelerisCare.length;
  }, 3000);
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
</style>
