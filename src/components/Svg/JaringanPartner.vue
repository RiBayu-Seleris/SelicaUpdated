<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { bagiJaringan } from "@/Data/Products/SelicaPartner/PartnerContent";

const props = defineProps({
  jumlahDownline: { type: Number, required: true },
  warnaGaris: { type: String, default: "#E3F4EC" },
  warnaSimpul: { type: String, default: "#49D89C" },
  warnaPusat: { type: String, default: "#114365" },
  warnaTulisanPusat: { type: String, default: "#FFFFFF" },
});

const TENGAH = 160;

const JARI = 104;
const JARI_PUSAT = 34;

const bagian = computed(() => bagiJaringan(props.jumlahDownline));

const jariSimpul = computed(() => {
  const n = bagian.value.digambar;
  if (!n) return 8;
  const jarakTetangga = (2 * Math.PI * JARI) / n;
  return Math.max(Math.min(jarakTetangga * 0.3, 9), 4);
});

const bingkai = computed(() => {
  const jangkauan = JARI + jariSimpul.value + 6;
  return `${TENGAH - jangkauan} ${TENGAH - jangkauan} ${jangkauan * 2} ${jangkauan * 2}`;
});

const tujuan = computed(() =>
  Array.from({ length: bagian.value.digambar }, (_, i) => {
    const sudut = (i / bagian.value.digambar) * Math.PI * 2 - Math.PI / 2;
    return { x: TENGAH + Math.cos(sudut) * JARI, y: TENGAH + Math.sin(sudut) * JARI };
  }),
);

const DURASI = 450;

const kurangiGerak =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const posisi = ref(tujuan.value);

let idFrame = null;

const perlambat = (x) => 1 - Math.pow(1 - x, 3);

// Menyamakan panjang daftar: simpul yang baru muncul dimulai dari tengah
// (seolah tumbuh dari Anda), simpul yang hilang langsung dibuang.
const samakanPanjang = (lama, panjang) => {
  const hasil = lama.slice(0, panjang);
  while (hasil.length < panjang) hasil.push({ x: TENGAH, y: TENGAH });
  return hasil;
};

watch(tujuan, (akhir) => {
  if (idFrame) cancelAnimationFrame(idFrame);

  if (kurangiGerak) {
    posisi.value = akhir;
    return;
  }

  const awal = samakanPanjang(posisi.value, akhir.length);
  const mulai = performance.now();

  const langkah = (sekarang) => {
    const p = Math.min((sekarang - mulai) / DURASI, 1);
    const e = perlambat(p);

    posisi.value = akhir.map((b, i) => ({
      x: awal[i].x + (b.x - awal[i].x) * e,
      y: awal[i].y + (b.y - awal[i].y) * e,
    }));

    idFrame = p < 1 ? requestAnimationFrame(langkah) : null;
  };

  idFrame = requestAnimationFrame(langkah);
});

onUnmounted(() => {
  if (idFrame) cancelAnimationFrame(idFrame);
});
</script>

<template>
  <svg
    :viewBox="bingkai"
    class="h-auto w-full"
    role="img"
    :aria-label="$t('partner.network.alt', { jumlah: jumlahDownline })"
  >
    <circle
      v-if="posisi.length"
      :cx="TENGAH"
      :cy="TENGAH"
      :r="JARI"
      fill="none"
      :stroke="warnaGaris"
      stroke-width="1.5"
    />

    <g :stroke="warnaSimpul" stroke-width="1.6" opacity="0.55">
      <line
        v-for="(n, i) in posisi"
        :key="`garis-${i}`"
        :x1="TENGAH"
        :y1="TENGAH"
        :x2="n.x"
        :y2="n.y"
      />
    </g>

    <g :fill="warnaSimpul">
      <circle v-for="(n, i) in posisi" :key="`simpul-${i}`" :cx="n.x" :cy="n.y" :r="jariSimpul" />
    </g>

    <circle :cx="TENGAH" :cy="TENGAH" :r="JARI_PUSAT + 12" :fill="warnaSimpul" opacity="0.12" />
    <circle :cx="TENGAH" :cy="TENGAH" :r="JARI_PUSAT" :fill="warnaPusat" />
    <text
      :x="TENGAH"
      :y="TENGAH + 5"
      text-anchor="middle"
      :fill="warnaTulisanPusat"
      font-size="15"
      font-weight="600"
    >
      {{ $t("partner.network.you") }}
    </text>
  </svg>
</template>

<style scoped></style>
