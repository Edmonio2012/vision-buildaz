import { motion } from "framer-motion";

import { SocialMediaLinks } from "@/components/layout/SocialMediaLinks";

export function WDBrownIntroSection(): JSX.Element {
  return (
    <>
      <motion.section
        className="relative w-full overflow-hidden bg-[#303a6d]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-[#2b3568]/75" />

        <div className="relative mx-auto grid h-[520px] w-full max-w-[1280px] grid-cols-1 items-end px-6 pt-10 md:grid-cols-[0.95fr_1.05fr] md:px-8 lg:h-[624px]">
          <div className="flex w-full max-w-[340px] flex-col items-center gap-7 justify-self-center pb-8 text-center sm:gap-8 md:justify-self-end md:items-start md:gap-[34px] md:pb-44 md:text-left">
            {["Author", "Mentor", "Speaker", "Coach"].map((item) => (
              <p
                className="[font-family:'avenida-w01',fantasy] text-[42px] font-normal leading-[0.96] text-white sm:text-[52px] md:text-[62px]"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mx-auto flex h-full w-full max-w-[560px] items-end justify-center md:justify-start lg:max-w-[660px]">
            <img
              alt="WD Brown"
              className="h-full max-h-none w-auto max-w-none origin-bottom scale-[0.94] object-contain object-bottom lg:scale-[0.98]"
              loading="lazy"
              src="/images/assets/wdbrown-founder.png"
            />
          </div>
        </div>
      </motion.section>

      <section className="w-full bg-white py-5">
        <SocialMediaLinks variant={2} />
      </section>
    </>
  );
}
