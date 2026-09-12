<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  warna: { type: String, default: "#4ED7BE" },
  jarakSimpul: { type: Number, default: 96 },
  kepekatan: { type: Number, default: 1 },
  interaktif: { type: Boolean, default: true },
});

const kanvas = ref(null);

let ctx = null;
let dasar = null; // kanvas bayangan berisi jaringan yang diam
let simpul = [];
let tetangga = [];
let nyala = []; // seberapa terang tiap simpul saat ini, 0..1
let gelombang = [];
let cincin = []; // penanda batas di ujung lapis 2
let lebar = 0;
let tinggi = 0;
let rasio = 1;
let idFrame = null;
let waktuTerakhir = 0;
let jedaNyala = 0;
let pengamat = null;
let pengamatUkuran = null;
let induk = null;
let sorot = null; // simpul terdekat dengan kursor

const KECEPATAN = 440; // piksel per detik untuk cahaya yang berjalan
const LAPIS_MAKS = 2; // inilah aturannya: berhenti di dua
const CABANG_LAPIS_1 = 4; // berapa tetangga yang ikut menyala di lapis pertama
const CABANG_LAPIS_2 = 2; // di lapis kedua lebih sedikit, supaya tidak jadi banjir cahaya
const JEDA_ANTAR_GELOMBANG = 1900; // milidetik
const GELOMBANG_MAKS = 2;
const PUDAR_NYALA = 1.35; // seberapa cepat pijar simpul meredup, per detik
const UMUR_CINCIN = 720; // milidetik

const kurangiGerak =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const keRgb = (heks) => {
  const n = parseInt(heks.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};
const rgb = keRgb(props.warna);

function bangunJaringan() {
  // Di layar kecil jaraknya dilebarkan: simpul yang sama rapatnya dengan
  // desktop akan terlihat berdesakan dan membebani perangkat kecil.
  const jarak = lebar < 768 ? props.jarakSimpul * 1.35 : props.jarakSimpul;
  const kolom = Math.ceil(lebar / jarak) + 2;
  const baris = Math.ceil(tinggi / jarak) + 2;
  const goyang = jarak * 0.3;

  simpul = [];
  for (let b = 0; b < baris; b++) {
    for (let k = 0; k < kolom; k++) {
      simpul.push({
        x: (k - 0.5) * jarak + (Math.random() * 2 - 1) * goyang,
        y: (b - 0.5) * jarak + (Math.random() * 2 - 1) * goyang,
      });
    }
  }

  const jangkauan = jarak * 1.55;
  tetangga = simpul.map(() => []);

  for (let i = 0; i < simpul.length; i++) {
    const dekat = [];
    for (let j = 0; j < simpul.length; j++) {
      if (i === j) continue;
      const dx = simpul[i].x - simpul[j].x;
      const dy = simpul[i].y - simpul[j].y;
      const kuadrat = dx * dx + dy * dy;
      if (kuadrat <= jangkauan * jangkauan) dekat.push({ j, kuadrat });
    }
    dekat.sort((a, b) => a.kuadrat - b.kuadrat);
    tetangga[i] = dekat.slice(0, 5).map((d) => d.j);
  }

  nyala = Array.from({ length: simpul.length }, () => 0);
  gelombang = [];
  cincin = [];
  sorot = null;
}

function gambarDasar() {
  dasar.width = Math.round(lebar * rasio);
  dasar.height = Math.round(tinggi * rasio);

  const d = dasar.getContext("2d");
  d.setTransform(rasio, 0, 0, rasio, 0, 0);
  d.clearRect(0, 0, lebar, tinggi);

  const jalur = new Path2D();
  for (let i = 0; i < simpul.length; i++) {
    for (const j of tetangga[i]) {
      if (j <= i) continue; // tiap sambungan cukup digambar sekali
      jalur.moveTo(simpul[i].x, simpul[i].y);
      jalur.lineTo(simpul[j].x, simpul[j].y);
    }
  }
  d.strokeStyle = `rgba(${rgb}, ${0.1 * props.kepekatan})`;
  d.lineWidth = 1;
  d.stroke(jalur);

  const titik = new Path2D();
  for (const s of simpul) {
    titik.moveTo(s.x + 1.4, s.y);
    titik.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
  }
  d.fillStyle = `rgba(${rgb}, ${0.26 * props.kepekatan})`;
  d.fill(titik);
}

function ukurUlang() {
  const el = kanvas.value;
  if (!el) return;

  const kotak = el.getBoundingClientRect();

  if (!kotak.width || !kotak.height) return;

  lebar = kotak.width;
  tinggi = kotak.height;

  rasio = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.round(lebar * rasio);
  el.height = Math.round(tinggi * rasio);
  ctx.setTransform(rasio, 0, 0, rasio, 0, 0);

  bangunJaringan();
  gambarDasar();
}

const buatPelari = (a, b, lapis) => {
  const dx = simpul[b].x - simpul[a].x;
  const dy = simpul[b].y - simpul[a].y;
  return { a, b, lapis, jarak: Math.hypot(dx, dy), maju: 0 };
};

function nyalakan(sumber) {
  if (gelombang.length >= GELOMBANG_MAKS) return;
  if (!tetangga[sumber]) return;

  const dikunjungi = new Set([sumber]);
  const pelari = tetangga[sumber].slice(0, CABANG_LAPIS_1).map((b) => {
    dikunjungi.add(b);
    return buatPelari(sumber, b, 1);
  });

  if (!pelari.length) return;

  nyala[sumber] = 1;
  gelombang.push({ dikunjungi, pelari });
}

function majukan(dt) {
  for (let g = gelombang.length - 1; g >= 0; g--) {
    const w = gelombang[g];
    const lanjutan = [];

    for (let p = w.pelari.length - 1; p >= 0; p--) {
      const pel = w.pelari[p];
      pel.maju += (KECEPATAN * dt) / pel.jarak;
      if (pel.maju < 1) continue;

      w.pelari.splice(p, 1);
      nyala[pel.b] = 1;

      if (pel.lapis < LAPIS_MAKS) {
        // Masih boleh merambat: cari tetangga yang belum tersentuh.
        let cabang = 0;
        for (const c of tetangga[pel.b]) {
          if (cabang >= CABANG_LAPIS_2) break;
          if (w.dikunjungi.has(c)) continue;
          w.dikunjungi.add(c);
          lanjutan.push(buatPelari(pel.b, c, pel.lapis + 1));
          cabang++;
        }
      } else {
        cincin.push({ x: simpul[pel.b].x, y: simpul[pel.b].y, umur: 0 });
      }
    }

    w.pelari.push(...lanjutan);
    if (!w.pelari.length) gelombang.splice(g, 1);
  }

  for (let i = 0; i < nyala.length; i++) {
    if (nyala[i] > 0) nyala[i] = Math.max(0, nyala[i] - PUDAR_NYALA * dt);
  }

  for (let c = cincin.length - 1; c >= 0; c--) {
    cincin[c].umur += dt * 1000;
    if (cincin[c].umur >= UMUR_CINCIN) cincin.splice(c, 1);
  }
}

function gambar() {
  if (!simpul.length || !dasar.width) return;

  ctx.clearRect(0, 0, lebar, tinggi);
  ctx.drawImage(dasar, 0, 0, lebar, tinggi);

  for (let i = 0; i < simpul.length; i++) {
    const n = nyala[i];
    if (n <= 0.01) continue;
    const s = simpul[i];
    const jari = 2 + n * 5;

    const kilau = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, jari * 3.2);
    kilau.addColorStop(0, `rgba(${rgb}, ${0.5 * n})`);
    kilau.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = kilau;
    ctx.beginPath();
    ctx.arc(s.x, s.y, jari * 3.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, 0.35 + n)})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, jari * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const w of gelombang) {
    for (const pel of w.pelari) {
      const a = simpul[pel.a];
      const b = simpul[pel.b];
      const t = Math.min(1, pel.maju);
      const ekor = Math.max(0, t - 0.32);

      const x1 = a.x + (b.x - a.x) * ekor;
      const y1 = a.y + (b.y - a.y) * ekor;
      const x2 = a.x + (b.x - a.x) * t;
      const y2 = a.y + (b.y - a.y) * t;

      const kuat = pel.lapis === 1 ? 1 : 0.55;

      const garis = ctx.createLinearGradient(x1, y1, x2, y2);
      garis.addColorStop(0, `rgba(${rgb}, 0)`);
      garis.addColorStop(1, `rgba(${rgb}, ${0.9 * kuat})`);
      ctx.strokeStyle = garis;
      ctx.lineWidth = pel.lapis === 1 ? 1.8 : 1.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Cincin batas: mengembang sambil memudar, lalu tidak ada apa-apa lagi.
  for (const c of cincin) {
    const p = c.umur / UMUR_CINCIN;
    ctx.strokeStyle = `rgba(${rgb}, ${0.4 * (1 - p)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 4 + p * 22, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (sorot !== null) {
    const s = simpul[sorot];
    ctx.strokeStyle = `rgba(${rgb}, 0.55)`;
    ctx.lineWidth = 1;
    const r = 9;
    ctx.beginPath();
    ctx.moveTo(s.x - r, s.y - r + 4);
    ctx.lineTo(s.x - r, s.y - r);
    ctx.lineTo(s.x - r + 4, s.y - r);
    ctx.moveTo(s.x + r - 4, s.y + r);
    ctx.lineTo(s.x + r, s.y + r);
    ctx.lineTo(s.x + r, s.y + r - 4);
    ctx.stroke();
  }
}

function langkah(sekarang) {
  const dt = Math.min((sekarang - waktuTerakhir) / 1000, 0.05); // dipagari supaya
  waktuTerakhir = sekarang; // tab yang lama tidak aktif tidak melompat jauh

  jedaNyala -= dt * 1000;
  if (jedaNyala <= 0 && simpul.length) {
    nyalakan(Math.floor(Math.random() * simpul.length));
    jedaNyala = JEDA_ANTAR_GELOMBANG * (0.7 + Math.random() * 0.6);
  }

  majukan(dt);
  gambar();
  idFrame = requestAnimationFrame(langkah);
}

function jalan() {
  if (idFrame || kurangiGerak) return;
  waktuTerakhir = performance.now();
  idFrame = requestAnimationFrame(langkah);
}

function berhenti() {
  if (idFrame) cancelAnimationFrame(idFrame);
  idFrame = null;
}

const cariTerdekat = (x, y) => {
  if (!simpul.length) return null;

  let terdekat = null;
  let terpendek = 150 * 150;
  for (let i = 0; i < simpul.length; i++) {
    const dx = simpul[i].x - x;
    const dy = simpul[i].y - y;
    const kuadrat = dx * dx + dy * dy;
    if (kuadrat < terpendek) {
      terpendek = kuadrat;
      terdekat = i;
    }
  }
  return terdekat;
};

const gerakKursor = (peristiwa) => {
  const kotak = kanvas.value.getBoundingClientRect();
  sorot = cariTerdekat(peristiwa.clientX - kotak.left, peristiwa.clientY - kotak.top);
};

const keluarKursor = () => {
  sorot = null;
};

const tekan = () => {
  if (sorot !== null) nyalakan(sorot);
};

onMounted(() => {
  const el = kanvas.value;
  ctx = el.getContext("2d");
  dasar = document.createElement("canvas");

  pengamatUkuran = new ResizeObserver(() => {
    ukurUlang();
    if (kurangiGerak) gambar();
  });
  pengamatUkuran.observe(el);

  if (kurangiGerak) return;

  pengamat = new IntersectionObserver(([masuk]) => (masuk.isIntersecting ? jalan() : berhenti()), {
    threshold: 0,
  });
  pengamat.observe(el);

  if (props.interaktif && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) {
    induk = el.parentElement;
    induk?.addEventListener("pointermove", gerakKursor);
    induk?.addEventListener("pointerleave", keluarKursor);
    induk?.addEventListener("pointerdown", tekan);
  }
});

onBeforeUnmount(() => {
  berhenti();
  pengamat?.disconnect();
  pengamatUkuran?.disconnect();
  induk?.removeEventListener("pointermove", gerakKursor);
  induk?.removeEventListener("pointerleave", keluarKursor);
  induk?.removeEventListener("pointerdown", tekan);
});
</script>

<template>
  <canvas
    ref="kanvas"
    class="medan pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>

<style scoped>
.medan {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #000 18%,
    #000 72%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 72%, transparent 100%);
}
</style>
