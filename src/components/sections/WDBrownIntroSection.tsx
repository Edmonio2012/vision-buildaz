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

        <div className="relative mx-auto grid min-h-[520px] w-full max-w-[1280px] grid-cols-1 items-end px-6 pt-10 md:grid-cols-[0.95fr_1.05fr] md:px-8 lg:min-h-[624px]">
          <div className="mx-auto flex w-full max-w-[340px] flex-col items-center gap-7 pb-8 text-center sm:gap-8 md:ml-auto md:mr-8 md:items-start md:gap-[34px] md:pb-44 md:text-left lg:mr-10">
            {["Author", "Mentor", "Speaker", "Coach"].map((item) => (
              <p
                className="[font-family:'avenida-w01',fantasy] text-[42px] font-normal leading-[0.96] text-white sm:text-[52px] md:text-[62px]"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mx-auto flex h-full w-full max-w-[500px] items-end justify-center md:justify-start lg:max-w-[540px]">
            <img
              alt="WD Brown"
              className="h-auto max-h-[600px] w-full object-contain object-bottom lg:max-h-[615px]"
              loading="lazy"
              src="/images/assets/wdbrown-founder.png"
            />
          </div>
        </div>
      </motion.section>

      <section className="w-full bg-white py-5">
        <SocialMediaLinks variant="squares" />
      </section>
    </>
  );
}
