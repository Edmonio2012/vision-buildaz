import { motion } from "framer-motion";

export function WixInspiredIntroSection(): JSX.Element {
  return (
    <section className="relative isolate min-h-[440px] overflow-hidden bg-[#303a6d] sm:min-h-[520px] lg:min-h-[575px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/assets/books-promo-bg.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#303a6d]/[0.86]"
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[440px] w-full max-w-[920px] flex-col justify-start px-6 py-12 sm:min-h-[520px] sm:px-8 sm:py-14 lg:min-h-[575px] lg:px-0 lg:py-[52px]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="w-full">
          <h1 className="max-w-[850px] [font-family:'dinneuzeitgroteskltw01-_812426','Arial_Narrow',sans-serif] text-[35px] font-extrabold uppercase leading-[1.1] tracking-[-0.035em] text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.28)] sm:text-[45px] lg:text-[56px]">
            <span className="lg:block lg:origin-left lg:scale-x-[.68] lg:whitespace-nowrap">
              From mindset to momentum, let’s build
            </span>{" "}
            <span className="lg:block">what you see.</span>
          </h1>

          <p className="mt-10 max-w-[900px] [font-family:'avenida-w01','Arial_Narrow',sans-serif] text-[23px] font-normal leading-[1.65] tracking-[-0.025em] text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)] sm:mt-12 sm:text-[27px] lg:mt-[68px] lg:text-[32px]">
            Vision Buildaz is a coaching and mentoring platform that breathes life into your dreams and helps you to realize your vision.
            <br />
            We&apos;re helping build visions from A to Z.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:mt-11 sm:flex-row sm:gap-6 lg:mt-[46px] lg:gap-[254px]">
            <motion.a
              className="inline-flex h-[56px] w-full max-w-[236px] items-center justify-center rounded-[7px] bg-[#ffd154] px-6 [font-family:Georgia,serif] text-[14px] italic leading-none text-[#47370a] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#303a6d] sm:w-auto sm:min-w-[236px]"
              href="#about-vision-buildaz"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              ABOUT VISION BUILDAZ &gt;&gt;
            </motion.a>

            <motion.a
              className="inline-flex h-[56px] w-full max-w-[313px] items-center justify-center rounded-[7px] bg-[#ffd154] px-6 [font-family:Georgia,serif] text-[14px] italic leading-none text-[#47370a] shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#303a6d] sm:w-auto sm:min-w-[313px]"
              href="#achieve-your-dreams"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              MINDSET BEFORE MILLIONS BOOKS &gt;&gt;
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
