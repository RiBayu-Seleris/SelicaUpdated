import { computed, unref } from "vue";
import { useI18n } from "vue-i18n";

export function useLocalizedList(namespace, list, fields) {
  const { t } = useI18n(); // t() = ambil satu kalimat dari file bahasa

  // computed() artinya: hitung ulang otomatis setiap kali bahasa berganti.
  return computed(() =>
    unref(list).map((item, index) => {
      const itemWithText = { ...item }; // salin dulu supaya data asli tidak berubah

      for (const field of fields) {
        itemWithText[field] = t(`${unref(namespace)}.${index}.${field}`);
      }

      return itemWithText;
    }),
  );
}

export function emptyItems(count) {
  return Array.from({ length: count }, () => ({}));
}
