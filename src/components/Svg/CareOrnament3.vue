<script setup>
/**
 * Ornamen garis.
 *
 * `arah` menentukan dari mana garisnya tersingkap: "kiri", "kanan", "atas",
 * "bawah", atau "dalam" (dari tengah melebar ke dua sisi). Geraknya sendiri
 * ditulis di src/style.css sebagai animasi AOS buatan sendiri, jadi
 * pemicunya sama persis dengan section tempatnya berada.
 */
defineProps({
  arah: {
    type: String,
    default: "kiri",
  },
  positionClass: {
    type: String,
  },
  heightClass: {
    type: String,
  },
});
</script>

<template>
  <!-- w-auto -->
  <figure
    :data-aos="`garis-${arah}`"
    data-aos-duration="1200"
    :class="[`pointer-events-none absolute sm:flex sm:absolute ${positionClass} ${heightClass}`]"
  >
    <img
      src="@/assets/Products/images/CareOrnament3.png"
      alt="CareOrnament"
      class="object-center bg-no-repeat w-full h-full"
      loading="lazy"
      decoding="async"
    />
  </figure>
</template>
