import { motion } from "framer-motion";

export function WixIntroductionSection(): JSX.Element {
  return (
    <motion.section
      className="bg-[#f0eefc] py-10 sm:py-12 md:py-14"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="container">
        <div className="max-w-[780px] text-[#31323d]">
          <h2 className="inline-block border-b-[7px] border-[#a99124] pb-0 [font-family:'Poppins',sans-serif] text-[30px] font-extrabold uppercase leading-[1.05] text-[#060814] sm:text-[34px] md:text-[38px]">
            Introduction
          </h2>

          <div className="mt-6 flex flex-col gap-7 [font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.42] sm:text-[21px] md:text-[24px]">
            <p>From mindset to wealth 🔑 Let&apos;s build what you see 👑</p>

            <p>You Ready? Let&apos;s Grow!</p>

            <p>
              Here, you will receive guidance in realizing purpose and fulfilling destiny for
              entrepreneurs, career professionals, and personal brands. At Vision Buildaz, we
              provide tailored mentorship and coaching to help entrepreneurs and personal brands
              unlock their full potential.
            </p>

            <p>
              Founded by WD Brown, our mission is to offer practical, strategic guidance through
              personalized coaching sessions—virtual or in-person. Whether you&apos;re building a
              business or developing a personal brand, Vision Buildaz is here to help you achieve
              success. Let&apos;s work together to turn your vision into reality.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
