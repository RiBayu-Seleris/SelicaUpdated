// src/data/blogPosts.js
import { generateSlug } from "@/components/Helper/slugUtil.js";

export const blogPosts = [
  {
    id: 1,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Your Financial Safety Net in an Unpredictable World",
    category: "Insurance",
    date: "August 04, 2025",
    likes: 600,
    views: 400,
    comments: 300,
    description: `
    <p>
              Technology. It's the invisible hand guiding our modern lives, the
              constant hum in the background, and the driving force behind
              unprecedented change. Every day, new advancements emerge,
              seemingly at lightning speed, promising to make our lives easier,
              smarter, and more connected. But beyond the hype, what truly
              defines the current landscape of technology, and how is it
              fundamentally reshaping our world?
            </p>
            <div class="flex flex-col space-y-4">
              <h1 class="text-[28px] lg:text-[34px] text-[#195279] font-[500]">
                Key Frontiers in Today's Tech Landscape
              </h1>
              <h2 class="text-[18px] lg:text-[20px] text-[#535862] font-[500]">
                Artificial Intelligence (AI) & Machine Learning (ML)
              </h2>
              <p class="text-[14px] lg:text-[16px]">
                Technology. It's the invisible hand guiding our modern lives,
                the constant hum in the background, and the driving force behind
                unprecedented change.
              </p>
              <h2 class="text-[18px] lg:text-[20px] text-[#535862] font-[500]">
                Artificial Intelligence (AI) & Machine Learning (ML)
              </h2>
              <p class="text-[14px] lg:text-[16px]">
                Technology. It's the invisible hand guiding our modern lives,
                the constant hum in the background, and the driving force behind
                unprecedented change.
              </p>
              <h2 class="text-[18px] lg:text-[20px] text-[#535862] font-[500]">
                Artificial Intelligence (AI) & Machine Learning (ML)
              </h2>
              <p class="text-[14px] lg:text-[16px]">
                Technology. It's the invisible hand guiding our modern lives,
                the constant hum in the background, and the driving force behind
                unprecedented change.
              </p>
            </div>
            <div class="flex flex-col space-y-4">
              <h1 class="text-[28px] lg:text-[34px] text-[#195279] font-[500]">
                How Tech is Reshaping Our World
              </h1>
              <p class="italic text-[16px] lg:text-[20px] font-[500]">
                “What technological advancements are you most excited (or
                concerned) about? Share your thoughts below!”
              </p>
              <p class="text-[14px] lg:text-[16px]">
                Technology. It's the invisible hand guiding our modern lives,
                the constant hum in the background, and the driving force behind
                unprecedented change.
              </p>
              <h2 class="text-[18px] lg:text-[20px] text-[#535862] font-[500]">
                Artificial Intelligence (AI) & Machine Learning (ML)
              </h2>
              <p class="text-[14px] lg:text-[16px]">
                Technology. It's the invisible hand guiding our modern lives,
                the constant hum in the background, and the driving force behind
                unprecedented change.
              </p>
            </div>
    `,
  },

  // Tambah lainnya...
].map((post) => ({
  ...post,
  slug: `${generateSlug(post.title)}`, // pastikan unik
}));
