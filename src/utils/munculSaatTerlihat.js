const kurangiGerak = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

let pengamat = null;

const ambilPengamat = () => {
  if (pengamat) return pengamat;

  pengamat = new IntersectionObserver(
    (daftar) => {
      for (const masuk of daftar) {
        if (!masuk.isIntersecting) continue;
        masuk.target.dataset.muncul = "ya";
        pengamat.unobserve(masuk.target);
      }
    },
    {
      // Sedikit ke dalam layar: elemen baru dianggap "terlihat" setelah
      // benar-benar masuk, bukan saat piksel pertamanya menyentuh tepi.
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.01,
    },
  );

  return pengamat;
};

export const vMuncul = {
  mounted(el, ikatan) {
    // Pengunjung yang menyalakan "kurangi animasi" langsung mendapat
    // keadaan akhir: isinya tetap lengkap, hanya tanpa gerak.
    if (kurangiGerak()) {
      el.dataset.muncul = "ya";
      return;
    }

    const jeda = Number(ikatan.value ?? 0);
    if (jeda) el.style.setProperty("--jeda-muncul", `${jeda}ms`);

    el.dataset.muncul = "belum";
    ambilPengamat().observe(el);
  },

  unmounted(el) {
    pengamat?.unobserve(el);
  },
};
