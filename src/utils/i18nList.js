import { computed, unref } from "vue";
import { useI18n } from "vue-i18n";

/**
 * Menggabungkan daftar dari `src/Data` dengan kalimatnya dari file bahasa.
 *
 * KENAPA DIPISAH?
 * File di `src/Data` cuma menyimpan strukturnya: ikon, warna, harga, urutan.
 * Semua kalimat ada di `src/locales/en.json` dan `src/locales/id.json`.
 * Dengan begitu satu kalimat cuma ditulis di satu tempat, dan otomatis ikut
 * berganti saat pengunjung menukar bahasa.
 *
 * CARA PAKAI di sebuah komponen:
 *
 *   import { lifinsFaq } from "@/Data/Products/Lifins/LifinsFaq";
 *   import { useLocalizedList } from "@/utils/i18nList";
 *
 *   const faq = useLocalizedList("products.lifins.faq", lifinsFaq, [
 *     "question",
 *     "answer",
 *   ]);
 *
 * Lalu di template dipakai seperti daftar biasa:
 *
 *   <div v-for="item in faq">{{ item.question }}</div>
 *
 * Isi `question` diambil dari file bahasa pada kunci
 * `products.lifins.faq.0.question` untuk item pertama,
 * `products.lifins.faq.1.question` untuk item kedua, dan seterusnya.
 * Angkanya mengikuti urutan item di dalam daftar, jadi urutan di `src/Data`
 * dan di file bahasa harus sama.
 *
 * @param {string} namespace Kunci awal di file bahasa, mis. "products.lifins.faq"
 * @param {Array} list Daftar struktur dari src/Data
 * @param {string[]} fields Nama kolom teks yang mau diisi, mis. ["question", "answer"]
 * @returns {import('vue').ComputedRef<Array>} Daftar yang teksnya sudah terisi
 */
export function useLocalizedList(namespace, list, fields) {
  const { t } = useI18n(); // t() = ambil satu kalimat dari file bahasa

  // computed() artinya: hitung ulang otomatis setiap kali bahasa berganti.
  return computed(() =>
    // unref() dipakai karena namespace dan list kadang dikirim dalam bentuk
    // computed (nilainya bisa berubah). unref() mengambil nilai di dalamnya.
    // Kalau yang dikirim nilai biasa, unref() mengembalikannya apa adanya.
    unref(list).map((item, index) => {
      const itemWithText = { ...item }; // salin dulu supaya data asli tidak berubah

      for (const field of fields) {
        itemWithText[field] = t(`${unref(namespace)}.${index}.${field}`);
      }

      return itemWithText;
    }),
  );
}

/**
 * Membuat daftar berisi sekian item kosong.
 *
 * Dipakai di `src/Data` untuk daftar yang isinya teks semua, misalnya FAQ atau
 * testimoni. File datanya tetap perlu tahu ADA BERAPA item, supaya `v-for` di
 * template mengulang sebanyak itu. Kalimatnya sendiri diambil dari file bahasa
 * lewat useLocalizedList() di atas.
 *
 *   export const lifinsFaq = emptyItems(9); // 9 pertanyaan
 *
 * @param {number} count Jumlah item
 * @returns {Array<object>} Daftar berisi `count` objek kosong
 */
export function emptyItems(count) {
  return Array.from({ length: count }, () => ({}));
}
