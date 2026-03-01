<script setup>
import { ref } from "vue";

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

const work1 = ref(false);

import { clientLogos } from "@/Data/Products/HealthCare/CareClients";

// gabungkan otomatis base path + nama file
const stepsWithPath = careWorkSteps.map((step) => ({
  ...step,
  image: new URL(`/src/assets/Products/images/Care/${step.image}`, import.meta.url).href,
}));
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20" id="hero">
      <div class="w-full h-[450px] md:h-[700px] lg:h-[650px] rounded-[20px] z-20">
        <HeroText
          title="Smarter Corporate Health Monitoring"
          subtitle="Application"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#13B89C]"
          description=" Empower your organization with AI-driven employee wellness, preventive insights, and health cost control."
          descriptioncolor="text-[#6F6F6F]"
        />
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
