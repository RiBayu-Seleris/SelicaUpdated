import { onBeforeUnmount, onMounted } from "vue";

export function pasangJedaAnimasi() {
  let pengamat = null;

  const mulai = () => {
    if (typeof IntersectionObserver === "undefined") return;

    pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          e.target.classList.toggle("jeda-animasi", !e.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" },
    );

    document.querySelectorAll("section").forEach((el) => pengamat.observe(el));
  };

  onMounted(() => {
    requestAnimationFrame(mulai);
  });

  onBeforeUnmount(() => {
    pengamat?.disconnect();
    document.querySelectorAll(".jeda-animasi").forEach((el) => el.classList.remove("jeda-animasi"));
  });
}
