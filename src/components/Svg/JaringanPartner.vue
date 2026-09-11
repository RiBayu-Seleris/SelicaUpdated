<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { bagiJaringan } from "@/Data/Products/SelicaPartner/PartnerContent";

/**
 * Diagram jaringan partner: Anda di tengah, downline langsung Anda
 * mengelilingi.
 *
 * SATU LINGKARAN, DAN ITU DISENGAJA
 * Kendali di simulasi berbunyi "downline aktif di jaringan Anda" — itu
 * relasi orang yang sedang membaca, bukan relasi bawahannya. Maka semua
 * simpul di sini tersambung LANGSUNG ke pusat.
 *
 * Versi sebelumnya menggambar dua lingkaran: enam yang pertama tersambung ke
 * pusat, sisanya digambar menggantung pada simpul lain sebagai "downline
 * dari downline". Itu keliru — bukan cuma rupanya, melainkan artinya. Orang
 * yang mengisi lima belas melihat sembilan relasinya diakui sebagai relasi
 * orang lain, padahal tidak ada satu pun keterangan yang ia berikan tentang
 * itu. Angka lapis yang ditampilkan di sebelahnya pun ikut karangan.
 *
 * Aturan "jaringan berhenti di dua lapis" tetap disampaikan halaman ini —
 * lewat tabel tarif di atas dan kalimat di samping diagram — tapi tidak lagi
 * lewat gambar yang mengarang datanya sendiri.
 *
 * Gambarnya ikut berubah saat pengunjung menaik-turunkan jumlah downline,
 * jadi geraknya menjawab aksi orang, bukan animasi yang jalan sendiri.
 */

const props = defineProps({
  // Jumlah downline langsung, dari kendali di simulasi komisi.
  jumlahDownline: { type: Number, required: true },
  warnaGaris: { type: String, default: "#E3F4EC" },
  warnaSimpul: { type: String, default: "#49D89C" },
  warnaPusat: { type: String, default: "#114365" },
  warnaTulisanPusat: { type: String, default: "#FFFFFF" },
});

const TENGAH = 160;

/* Jari-jari lingkaran simpul. Jauh lebih lebar daripada 62 yang dipakai
   versi dua lingkaran: karena lingkaran keduanya sudah tidak ada, seluruh
   ruang kanvas bisa dipakai lingkaran ini — dan makin lebar lingkarannya,
   makin banyak simpul yang muat tanpa berdempet. */
const JARI = 104;
const JARI_PUSAT = 34;

const bagian = computed(() => bagiJaringan(props.jumlahDownline));

/**
 * Besar tiap simpul dihitung dari jaraknya ke tetangga.
 *
 * Dengan ukuran tetap, delapan simpul terlihat lega sementara delapan belas
 * saling bersentuhan sampai lingkarannya terbaca seperti satu cincin tebal,
 * bukan seperti sekumpulan orang yang bisa dihitung.
 */
const jariSimpul = computed(() => {
  const n = bagian.value.digambar;
  if (!n) return 8;
  const jarakTetangga = (2 * Math.PI * JARI) / n;
  return Math.max(Math.min(jarakTetangga * 0.3, 9), 4);
});

/* Bingkainya dipaskan ke lingkaran terluar. Kotak yang lebih lebar daripada
   isinya membuat diagram tampil setengah ukuran di tengah ruang kosong, dan
   tulisan di pusatnya ikut mengecil sampai tidak terbaca. */
const bingkai = computed(() => {
  const jangkauan = JARI + jariSimpul.value + 6;
  return `${TENGAH - jangkauan} ${TENGAH - jangkauan} ${jangkauan * 2} ${jangkauan * 2}`;
});

/**
 * Posisi TUJUAN tiap simpul: disebar merata pada satu lingkaran, dimulai
 * dari atas supaya susunannya terasa seimbang.
 */
const tujuan = computed(() =>
  Array.from({ length: bagian.value.digambar }, (_, i) => {
    const sudut = (i / bagian.value.digambar) * Math.PI * 2 - Math.PI / 2;
    return { x: TENGAH + Math.cos(sudut) * JARI, y: TENGAH + Math.sin(sudut) * JARI };
  }),
);

/* ------------------------------------------------------------
   Perpindahan simpul

   KENAPA DIGERAKKAN LEWAT JAVASCRIPT, BUKAN CSS
   Transisi CSS bisa menggerakkan cx dan cy pada lingkaran, tapi TIDAK bisa
   menggerakkan x1/y1/x2/y2 pada garis — keempatnya bukan properti CSS.
   Kalau dipaksakan, simpulnya meluncur sementara garisnya melompat, dan itu
   terlihat rusak. Karena itu posisinya dihitung sendiri tiap gambar layar,
   sehingga simpul dan garis bergerak serempak.
------------------------------------------------------------ */
const DURASI = 450;

const kurangiGerak =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Posisi yang benar-benar digambar sekarang. Awalnya sama dengan tujuan,
// supaya gambar pertama tidak ikut beranimasi.
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
    <!-- Lingkaran bantu tempat simpulnya duduk. Digambar hanya kalau memang
         ada yang duduk di atasnya. -->
    <circle
      v-if="posisi.length"
      :cx="TENGAH"
      :cy="TENGAH"
      :r="JARI"
      fill="none"
      :stroke="warnaGaris"
      stroke-width="1.5"
    />

    <!-- Garis dari Anda ke tiap downline. Semuanya berangkat dari pusat,
         karena semuanya memang relasi langsung orang yang di pusat itu. -->
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

    <!-- Pusatnya. Diberi lingkaran cahaya di luarnya supaya bobotnya jelas
         paling besar: seluruh diagram ini menggambarkan jaringan MILIK orang
         yang ada di titik ini, dan itu harus terbaca dari satu tatapan,
         sebelum siapa pun sempat menghitung simpulnya. -->
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

<style scoped>
/* Tidak ada transisi CSS di sini dengan sengaja: perpindahan simpul dan garis
   diatur dari JavaScript (lihat komentar di bagian script), supaya keduanya
   bergerak serempak. */
</style>
