import { motion } from "framer-motion";

export function YRLGDHeroSection(): JSX.Element {
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
        <div className="flex w-full max-w-[560px] flex-col gap-7 justify-self-center pb-10 text-center md:justify-self-end md:pb-24 md:text-left">
          <div className="flex flex-col gap-3">
            <h1 className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[32px] font-semibold italic leading-[0.95] text-white sm:text-[42px] md:text-[50px]">
              YOU READY? LET&apos;S GROW!
            </h1>
            <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[22px] font-semibold italic leading-[1] text-white sm:text-[28px] md:text-[32px]">
              Digital Resource Library
            </p>
          </div>

          <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[21px] font-semibold italic leading-[1.58] text-white sm:text-[26px] md:text-[30px]">
            These digital resources are offered to the public as part of the YOU READY? LET&apos;S
            GROW! series by Vision Buildaz.
            <br />
            All items on this page are available for direct download to demonstrate active use in
            commerce.
          </p>
        </div>

        <div className="mx-auto flex h-full w-full max-w-[480px] items-end justify-center md:justify-start lg:max-w-[560px]">
          <img
            alt="WD Brown seated"
            className="h-auto max-h-[500px] w-full object-contain object-bottom lg:max-h-[560px]"
            loading="lazy"
            src="/images/assets/yrlgd-hero-founder.png"
          />
        </div>
      </div>
    </motion.section>
  );
}
