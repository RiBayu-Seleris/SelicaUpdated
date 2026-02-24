import { defineStore } from "pinia";
export const useUtilsStore = defineStore("utils", {
  state: () => ({}),
  actions: {
    fromISODate(dateString, locale = "en-US") {
      if (!dateString) return "-";
      const d = new Date(dateString);

      const day = d.toLocaleDateString(locale, { day: "2-digit" });
      const month = d.toLocaleDateString(locale, { month: "short" });
      const year = d.getFullYear();

      return `${day} ${month}, ${year}`;
    },

    shortNumber(num) {
      if (num === null || num === undefined) return "-"; // jaga-jaga null/undefined
      if (isNaN(num)) return "-"; // kalau bukan angka

      if (num >= 1_000_000_000) {
        return (
          (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"
        );
      } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
      }

      return num.toString(); // aman karena sudah difilter di atas
    },

    fromISODateSlash(dateString, locale = "en-US") {
      if (!dateString) return "-";
      const d = new Date(dateString);

      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    },

    shortNumber(num) {
      if (num === null || num === undefined) return "-"; // jaga-jaga null/undefined
      if (isNaN(num)) return "-"; // kalau bukan angka

      if (num >= 1_000_000_000) {
        return (
          (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"
        );
      } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
      }

      return num.toString(); // aman karena sudah difilter di atas
    },

    separatorNumber(num) {
      if (!num) return ""; // kalau kosong jangan return '-'
      const clean = num.toString().replace(/\D/g, ""); // hilangkan karakter non angka
      return clean.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // kasih separator
    },

    // 🆕 Hapus semua non-digit (untuk kirim API)
    cleanNumber(value) {
      return value?.toString().replace(/\D/g, "") || null;
    },

    // 🆕 Convert YYYY-MM-DD → DD-MM-YYYY (untuk API payload)
    formatToDDMMYYYY(dateString) {
      if (!dateString) return null;
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    // TEXT MENJADI ARRAY
    formatTextToArray(value) {
      if (!value) return [];

      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    },
  },
});
