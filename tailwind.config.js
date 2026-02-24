/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- wajib!
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        smallest: "320px",
        // Mobile breakpoints
        sm: "640px",
        // Tablet / Medium
        md: "768px",
        // Desktop
        lg: "1024px",
        xl: "1280px",
        // Extra Large
        xls: { raw: "(min-width: 1440px)" },
        "2xls": { raw: "(min-width: 2560px)" },
      },
      gradientColorStops: {
        "dark-start": "#565656 0%",
        "dark-end": "#BCBCBC 70%",
      },
      backgroundImage: {
        frameBookDemo: "url('@/assets/images/frame-about-book-demo2.png')",
        darkFrameBookDemo:
          "url('@/assets/images/dark-frame-about-book-demo2.png')",
        hero2: "url('@/assets/images/hero-banner2.png')",
        touch: "url('@/assets/images/touch-bg.png')",
        touchDark: "url('@/assets/images/touch-bg-dark.png')",
        medins: "url('@/assets/Products/images/bg-hero-medins.png')",
        cc: "url('@/assets/Products/images/bg-hero-cc.png')",
        herodark: "url('@/assets/images/herodark3.png')",
        different: "url('@/assets/images/different-background.png')",
        differentDark: "url('@/assets/images/different-dark-background.png')",
        api: "url('@/assets/images/api-background.png')",
        darkapi: "url('@/assets/images/dark-api-background.png')",
        leftCertBefore:
          "url('@/assets/images/certification/left-frame-before.png')",
        centerCertBefore:
          "url('@/assets/images/certification/center-frame-before.png')",
        rightCertBefore:
          "url('@/assets/images/certification/right-frame-before.png')",
        leftCertAfter:
          "url('@/assets/images/certification/left-frame-after.png')",
        centerCertAfter:
          "url('@/assets/images/certification/center-frame-after.png')",
        rightCertAfter:
          "url('@/assets/images/certification/right-frame-after.png')",
        // DARK BACKGROUND
        leftCertDarkBefore:
          "url('@/assets/images/certification/dark-left-frame-before.png')",
        leftCertDarkAfter:
          "url('@/assets/images/certification/dark-left-frame-after.png')",
        centerCertDarkBefore:
          "url('@/assets/images/certification/dark-center-frame-before.png')",
        centerCertDarkAfter:
          "url('@/assets/images/certification/dark-center-frame-after.png')",
        rightCertDarkBefore:
          "url('@/assets/images/certification/dark-right-frame-before.png')",
        rightCertDarkAfter:
          "url('@/assets/images/certification/dark-right-frame-after.png')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // Animation
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
        bounce2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(7deg)" },
          "25%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(4deg)" },
          "75%": { transform: "rotate(-4deg)" },
          "100%": { transform: "rotate(7deg)" },
        },
        miniBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-10%)" },
          "60%": { transform: "translateY(-5%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        bounce: "bounce 3s infinite",
        bounce2: "bounce2 3s infinite",
        miniBounce: "miniBounce 1s ease-in-out infinite",
        wiggle: "wiggle 5s linear infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // ini boleh tetap
  ],
  safelist: ["rotate-90", "transform"],
};

// screens: {
//   // Mobile breakpoints
//   sm: "640px",
//   // Tablet / Medium
//   md: "768px",
//   // Desktop
//   lg: "1024px",
//   xl: "1280px",
//   // Extra Large
//   xls: { raw: "(min-width: 1440px)" },
//   "2xls": { raw: "(min-width: 2560px)" },
// },
