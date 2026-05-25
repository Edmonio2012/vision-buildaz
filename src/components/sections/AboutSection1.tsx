import { motion } from "framer-motion";

export function AboutSection1(): JSX.Element {
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

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-end md:grid-cols-2">
        <div className="flex min-h-[260px] items-center px-6 py-10 sm:px-8 md:min-h-[520px] md:justify-end md:pr-6 lg:min-h-[560px] lg:pr-8">
          <div className="w-full text-center md:max-w-[430px] md:text-left">
            <h2 className="[font-family:'avenida-w01',fantasy] whitespace-nowrap text-[32px] font-normal leading-[0.95] text-white sm:text-[44px] md:text-[58px]">
              Tailored Mentorship
            </h2>
            <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] mt-3 whitespace-nowrap text-[42px] font-semibold leading-[0.95] text-white sm:text-[56px] md:text-[74px]">
              &amp; COACHING
            </p>
            <button
              className="mt-8 h-[56px] w-full max-w-[320px] bg-[#a4890b] [font-family:'Poppins',sans-serif] text-[24px] font-normal leading-none tracking-[0.04em] text-white transition hover:brightness-95"
              type="button"
            >
              LEARN MORE &gt;&gt;
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px] md:max-w-[460px] lg:max-w-[560px]">
          <img
            alt="WD Brown portrait"
            className="h-full w-full object-contain object-bottom"
            loading="lazy"
            src="/images/assets/about-section1-founder.png"
          />
        </div>
      </div>
    </motion.section>
  );
}
