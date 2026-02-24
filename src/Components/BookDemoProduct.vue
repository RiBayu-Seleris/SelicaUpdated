<script setup>
defineProps({
  title: {
    type: String,
  },
  framebookdemo: {
    type: String,
  },
  colorarrow: {
    type: String,
  },
});
</script>

<template>
  <div class="relative w-full h-auto top-0">
    <img
      :src="framebookdemo"
      alt="FrameBookDemoSection"
      class="w-full h-full bg-no-repeat bg-cover bg-center"
    />
    <div
      class="absolute w-full h-full top-0 flex flex-row justify-between items-center px-4 md:px-10 pt-2 md:pt-8 xl:pt-11"
    >
      <div class="w-full h-full flex items-center">
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-8">
          <div class="w-full h-full">
            <p
              class="text-[#FAFAFA] font-[500] text-[10px] md:text-[22px] lg:text-[24px] xl:text-[36px] leading-tight"
            >
              {{ title }}
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[#FAFAFA] font-[500] text-[10px] md:text-[20px] lg:text-[24px]"
            >
              Request Demo Now!
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex items-center md:pr-10">
        <div class="w-full h-auto flex flex-col">
          <div class="w-full h-[80px] flex items-center justify-end">
            <a href="/book-a-demo" target="_blank">
              <div
                class="w-auto h-auto md:h-full py-1 md:py-2 rounded-md md:rounded-lg flex flex-row px-2 md:px-5 bg-[#FAFAFA]"
              >
                <div
                  :class="[
                    `w-full h-full flex items-center justify-center gap-x-2 md:gap-x-2 ${colorarrow}`,
                  ]"
                >
                  <p
                    class="font-[500] text-[10px] md:text-[19px] lg:text-[24px]"
                  >
                    Book a Demo
                  </p>
                  <svg
                    class="w-6 h-6 md:w-12 md:h-12"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28 36L40 24L28 12"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 22.5C10.1716 22.5 9.5 23.1716 9.5 24C9.5 24.8284 10.1716 25.5 11 25.5V24V22.5ZM39.5 24V22.5H11V24V25.5H39.5V24Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
