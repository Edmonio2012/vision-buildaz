import { motion } from "framer-motion";

interface AboutSection1Props {
  showLearnMore?: boolean;
}

export function AboutSection1({ showLearnMore = true }: AboutSection1Props): JSX.Element {
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
        <div className="flex min-h-[220px] items-center px-6 py-8 sm:px-8 md:min-h-[520px] md:justify-end md:pr-6 lg:min-h-[560px] lg:pr-8">
          <div className="flex w-full flex-col items-center gap-7 text-center md:max-w-[430px] md:items-start md:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="[font-family:'avenida-w01',fantasy] whitespace-nowrap text-[28px] font-normal leading-[0.95] text-white sm:text-[38px] md:text-[50px]">
                Tailored Mentorship
              </h2>
              <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] whitespace-nowrap text-[34px] font-semibold leading-[0.95] text-white sm:text-[46px] md:text-[64px]">
                &amp; COACHING
              </p>
            </div>
            {showLearnMore ? (
              <button
                className="h-[50px] w-full max-w-[300px] bg-[#a4890b] [font-family:'Poppins',sans-serif] text-[18px] font-normal leading-none tracking-[0.04em] text-white transition hover:brightness-95 sm:text-[20px]"
                type="button"
              >
                LEARN MORE &gt;&gt;
              </button>
            ) : null}
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
