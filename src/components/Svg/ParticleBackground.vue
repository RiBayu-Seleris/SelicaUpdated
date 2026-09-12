<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  warna: { type: String, default: "#13B89C" },
  kerapatan: { type: Number, default: 70 },
});

const kanvas = ref(null);

let ctx = null;
let partikel = [];
let idFrame = null;
let pengamat = null;
let lebar = 0;
let tinggi = 0;

const JARAK_SAMBUNG = 130;

const kurangiGerak =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const acak = (min, maks) => min + Math.random() * (maks - min);

function buatPartikel() {
  // Jumlahnya menyesuaikan luas layar: di ponsel jauh lebih sedikit, supaya
  // tidak membebani perangkat kecil.
  const jumlah = Math.round(props.kerapatan * Math.min(1, (lebar * tinggi) / (1440 * 700)));

  partikel = Array.from({ length: Math.max(jumlah, 18) }, () => ({
    x: acak(0, lebar),
    y: acak(0, tinggi),
    // z: 0 = paling jauh, 1 = paling dekat.
    z: acak(0, 1),
    vx: acak(-0.55, 0.55),
    vy: acak(-0.55, 0.55),
  }));
}

function ukurUlang() {
  const el = kanvas.value;
  if (!el) return;

  const kotak = el.getBoundingClientRect();
  lebar = kotak.width;
  tinggi = kotak.height;

  const rasio = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.round(lebar * rasio);
  el.height = Math.round(tinggi * rasio);
  ctx.setTransform(rasio, 0, 0, rasio, 0, 0);

  buatPartikel();
}

function gambar() {
  ctx.clearRect(0, 0, lebar, tinggi);

  const TINGKAT = 5;
  const kelompok = Array.from({ length: TINGKAT }, () => new Path2D());
  const kuadratJarak = JARAK_SAMBUNG * JARAK_SAMBUNG;

  for (let i = 0; i < partikel.length; i++) {
    for (let j = i + 1; j < partikel.length; j++) {
      const dx = partikel[i].x - partikel[j].x;
      const dy = partikel[i].y - partikel[j].y;
      const kuadrat = dx * dx + dy * dy;
      if (kuadrat > kuadratJarak) continue;

      const dekat = 1 - Math.sqrt(kuadrat) / JARAK_SAMBUNG;
      const dalam = (partikel[i].z + partikel[j].z) / 2;
      const pekat = dekat * (0.35 + dalam);
      const tingkat = Math.min(TINGKAT - 1, Math.floor(pekat * TINGKAT));

      kelompok[tingkat].moveTo(partikel[i].x, partikel[i].y);
      kelompok[tingkat].lineTo(partikel[j].x, partikel[j].y);
    }
  }

  ctx.strokeStyle = props.warna;
  for (let t = 0; t < TINGKAT; t++) {
    ctx.globalAlpha = ((t + 0.5) / TINGKAT) * 0.28;
    ctx.lineWidth = 0.6 + (t / TINGKAT) * 0.5;
    ctx.stroke(kelompok[t]);
  }

  for (const p of partikel) {
    ctx.globalAlpha = 0.25 + p.z * 0.55;
    ctx.fillStyle = props.warna;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 0.8 + p.z * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function langkah() {
  for (const p of partikel) {
    p.x += p.vx * (0.4 + p.z);
    p.y += p.vy * (0.4 + p.z);

    const batas = 40;
    if (p.x < -batas) p.x = lebar + batas;
    if (p.x > lebar + batas) p.x = -batas;
    if (p.y < -batas) p.y = tinggi + batas;
    if (p.y > tinggi + batas) p.y = -batas;
  }

  gambar();
  idFrame = requestAnimationFrame(langkah);
}

function jalan() {
  if (idFrame || kurangiGerak) return;
  idFrame = requestAnimationFrame(langkah);
}

function berhenti() {
  if (idFrame) cancelAnimationFrame(idFrame);
  idFrame = null;
}

onMounted(() => {
  const el = kanvas.value;
  ctx = el.getContext("2d");
  ukurUlang();

  if (kurangiGerak) {
    gambar();
    return;
  }

  window.addEventListener("resize", ukurUlang);

  pengamat = new IntersectionObserver(([masuk]) => (masuk.isIntersecting ? jalan() : berhenti()), {
    threshold: 0,
  });
  pengamat.observe(el);
});

onBeforeUnmount(() => {
  berhenti();
  pengamat?.disconnect();
  window.removeEventListener("resize", ukurUlang);
});
</script>

<template>
  <canvas
    ref="kanvas"
    class="pointer-events-none absolute inset-0 w-full h-full"
    aria-hidden="true"
  />
</template>
