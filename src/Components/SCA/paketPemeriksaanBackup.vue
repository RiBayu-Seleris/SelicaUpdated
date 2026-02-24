<template>
  <!-- DESKTOP -->
  <div class="hidden md:block w-full">
    <div
      class="grid grid-cols-[1fr_repeat(3,1fr)] border rounded-lg overflow-hidden"
    >
      <!-- HEADER -->
      <div class="border-b px-6 py-4 font-semibold h-auto flex items-center">
        Fitur & Parameter
      </div>

      <template v-for="pkg in packages" :key="pkg.name">
        <div
          class="relative border-b px-6 py-4"
          :class="pkg.highlight && 'bg-[#E7FFFB]'"
        >
          <div
            v-if="pkg.highlight"
            class="absolute top-0 left-0 w-full h-2 bg-[#26DBBD] rounded-b-[20px]"
          />
          <p
            class="text-xs font-semibold"
            :class="pkg.highlight ? 'text-[#22B098]' : 'text-[#374151]'"
          >
            {{ pkg.label }}
          </p>
          <p class="text-lg font-semibold text-[#374151] uppercase">
            {{ pkg.name }}
          </p>
        </div>
      </template>

      <!-- ROW: HARGA -->
      <div class="border-b px-6 py-4 font-semibold text-[#57788E]">Harga</div>

      <template v-for="pkg in packages" :key="pkg.name + '-price'">
        <div
          class="border-b px-6 py-4"
          :class="pkg.highlight && 'bg-[#E7FFFB]'"
        >
          <span :class="`${pkg.priceColor} font-[600]`">
            {{ pkg.price }}
          </span>
        </div>
      </template>

      <!-- ROWS: FITUR -->
      <template v-for="(feat, i) in features" :key="feat">
        <div class="border-b px-6 py-4 font-semibold text-[#57788E]">
          {{ feat }}
        </div>

        <template v-for="pkg in packages" :key="pkg.name + i">
          <div
            class="border-b px-6 py-4 h-auto flex items-center"
            :class="pkg.highlight && 'bg-[#E7FFFB]'"
          >
            <span v-if="pkg.values[i]" class="text-[#000]">
              {{ pkg.values[i] }}
            </span>
            <span v-if="pkg.values[i] === null" class="text-[#000]"> - </span>
          </div>
        </template>
      </template>

      <!-- CTA -->
      <div></div>

      <template v-for="pkg in packages" :key="pkg.name + '-cta'">
        <div
          class="w-full md:px-4 lg:px-6 py-3 font-semibold h-auto flex items-center justify-center"
          :class="pkg.highlight && 'bg-[#E7FFFB]'"
        >
          <button
            class="w-full h-auto py-2 flex justify-center items-center rounded-[10px] cursor-pointer"
            :class="
              pkg.name === 'Essential'
                ? 'bg-[#C4EAFF] text-[#488DB3]'
                : pkg.name === 'Core'
                  ? 'bg-[#2BE1C2] text-[#FFFFFF] shadow'
                  : pkg.name === 'Prime'
                    ? 'bg-[#0067B5] text-[#FFFFFF]'
                    : ''
            "
            @click="handleOpenModal(pkg)"
          >
            <span class="font-[600] md:text-[12px] lg:text-[14px]">
              Lihat Detail {{ pkg.name }}
            </span>
          </button>
        </div>
      </template>
    </div>
  </div>

  <!-- MOBILE -->
  <div class="flex flex-col gap-y-5 md:hidden w-full">
    <div
      v-for="(pkg, index) in packages"
      :key="pkg.name"
      class="p-[1px] rounded-[10px]"
      :class="
        pkg.name === 'CORE'
          ? 'bg-gradient-to-b from-[#26DBBD] from-[20%] to-[#26DBBD]/0'
          : 'bg-[#DADADA]'
      "
    >
      <div class="relative bg-white rounded-[10px] flex flex-col">
        <!-- HEADER -->
        <div
          v-if="pkg.name === 'CORE'"
          class="w-[50%] h-1.5 absolute top-0 left-1/2 -translate-x-1/2 bg-[#27DBBD] rounded-b-full"
        />
        <div class="flex justify-between px-5 pt-5 pb-3">
          <div>
            <p class="text-[12px] text-[#374151]">
              {{ pkg.label }}
            </p>
            <p class="text-[20px] font-[600] text-[#374151] uppercase">
              {{ pkg.name }}
            </p>
          </div>
          <div class="flex items-end">
            <span class="text-[18px] font-[600]" :class="pkg.priceColor">
              {{ pkg.price }}
            </span>
          </div>
        </div>

        <div class="h-[1px] bg-[#DADADA]" />

        <!-- CONTENT -->
        <div
          ref="contentRefs"
          class="relative overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]"
          :style="{
            maxHeight: pkg.expanded ? contentHeights[index] + 'px' : '160px',
          }"
        >
          <!-- GRADIENT -->
          <div
            v-if="!pkg.expanded"
            class="absolute inset-0 z-10 bg-gradient-to-b from-white/30 to-white"
          />

          <ul
            class="px-5 py-5 mx-5 list-disc list-outside pl-5 flex flex-col gap-y-3 text-[14px] md:text-[16px]"
          >
            <li v-for="(val, i) in pkg.mobileValues" :key="i">
              {{ val }}
            </li>
          </ul>
        </div>

        <!-- BUTTON -->
        <div class="px-5 py-3">
          <div
            class="rounded-[8px] py-2 text-center cursor-pointer"
            :class="
              pkg.name === 'ESSENTIAL'
                ? 'bg-[#C4EAFF] text-[#488DB3]'
                : pkg.name === 'CORE'
                  ? 'bg-[#2BE1C2] text-[#FFFFFF] shadow'
                  : pkg.name === 'PRIME'
                    ? 'bg-[#0067B5] text-[#FFFFFF]'
                    : ''
            "
            @click="toggleExpand(index)"
          >
            <span class="font-[600] text-[14px]">
              {{ pkg.expanded ? "Tutup" : "Lihat Lebih Banyak" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
