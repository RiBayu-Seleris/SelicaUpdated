<script setup>
/**
 * Medical Disclaimer & Legal Notice.
 *
 * PERHATIAN: ini teks yang mengikat secara hukum. Versi Inggrisnya adalah
 * terjemahan kerja dan BELUM ditinjau penasihat hukum perusahaan. Sebelum
 * tayang, mintalah tim legal memeriksa kunci `disclaimer.*` di
 * src/locales/en.json.
 *
 * Kalimatnya dipecah jadi bagian "Strong" (dicetak tebal) dan "Rest" karena
 * penekanan tebalnya berada di tengah paragraf, bukan di kalimat terpisah.
 */
</script>

<template>
  <div class="w-full h-auto flex flex-col gap-y-5">
    <div class="w-full h-auto flex flex-row gap-x-5">
      <div class="w-8 h-8 md:w-10 md:h-10 shrink-0 flex justify-center items-center">
        <img
          src="@/assets/Products/images/Care-Applicator/disclaimer-icon.svg"
          alt=""
          class="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="w-full h-auto flex justify-start items-center">
        <p class="text-[#374151] font-[600] text-[16px] md:text-[20px]">
          {{ $t("disclaimer.heading") }}
        </p>
      </div>
    </div>
    <div
      class="w-full h-auto flex flex-col gap-y-5 text-[#374151] font-[400] text-[12px] md:text-[16px] tracking-normal leading-relaxed"
    >
      <p>
        <span class="font-[600]">{{ $t("disclaimer.p1Strong") }}</span
        >{{ $t("disclaimer.p1Rest") }}
      </p>
      <p>
        <span class="font-[600]">{{ $t("disclaimer.p2Strong") }}</span
        >{{ $t("disclaimer.p2Rest") }}
      </p>
      <p class="font-[600]">{{ $t("disclaimer.p3") }}</p>
    </div>
  </div>
</template>
