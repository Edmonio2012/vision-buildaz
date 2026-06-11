import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

export function ClassroomHero(): JSX.Element {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-[#303a6d]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-45" />
      <div className="absolute inset-0 bg-[#2b3568]/75" />

      <div className="relative mx-auto grid min-h-[560px] w-full max-w-[1280px] grid-cols-1 items-end px-6 pt-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:min-h-[636px]">
        <div className="flex w-full max-w-[580px] flex-col gap-7 justify-self-center pb-10 text-center md:justify-self-end md:pb-24 md:text-left">
          <div className="flex flex-col gap-3">
            <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[22px] font-semibold italic leading-[1] text-white sm:text-[28px] md:text-[32px]">
              Digital Classroom
            </p>
            <h1 className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[34px] font-semibold italic leading-[0.95] text-white sm:text-[44px] md:text-[54px]">
              YOU READY? LET&apos;S GROW!
            </h1>
          </div>

          <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[22px] font-semibold italic leading-[1.48] text-white sm:text-[28px] md:text-[32px]">
            Learn, download, plan, and grow through the digital resources from Vision Buildaz.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-start">
            <a
              className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-[#a4890b] px-6 [font-family:'Poppins',sans-serif] text-[18px] font-medium leading-none text-white transition hover:bg-[#927904]"
              href="#growth-planner"
            >
              Build Your Plan
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-white bg-white/10 px-6 [font-family:'Poppins',sans-serif] text-[18px] font-medium leading-none text-white transition hover:bg-white hover:text-[#1f295f]"
              href="#course-library"
            >
              View Courses
            </a>
          </div>
        </div>

        <div className="mx-auto flex h-full w-full max-w-[480px] items-end justify-center md:justify-start lg:max-w-[560px]">
          <img
            alt="WD Brown seated"
            className="h-auto max-h-[500px] w-full object-contain object-bottom lg:max-h-[560px]"
            loading="lazy"
            src="/images/assets/yrlgd-hero-founder.png"
          />
          <div className="absolute bottom-8 right-6 hidden items-center gap-3 bg-white/92 px-5 py-4 shadow-[0_16px_34px_rgba(17,24,39,0.18)] md:flex lg:right-12">
            <GraduationCap className="h-7 w-7 text-[#a4890b]" aria-hidden="true" />
            <p className="[font-family:'Poppins',sans-serif] text-[14px] font-semibold uppercase tracking-[0.08em] text-[#132151]">
              4 courses · 10 resources
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
