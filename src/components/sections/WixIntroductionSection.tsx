import { motion } from "framer-motion";

export function WixIntroductionSection(): JSX.Element {
  return (
    <motion.section
      className="scroll-mt-0 bg-[#f0eefc]"
      id="about-vision-buildaz"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex h-[112px] items-center justify-center bg-cover bg-center bg-no-repeat sm:h-[124px] lg:h-[133px]"
        style={{ backgroundImage: "url('/images/assets/subheader-bg.jpg')" }}
      >
        <h2 className="px-4 text-center [font-family:'Trirong',serif] text-[31px] font-bold leading-none text-white drop-shadow-[0_3px_2px_rgba(23,32,52,0.38)] sm:text-[38px] lg:text-[43px]">
          About Vision Buildaz
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[966px] px-6 py-8 sm:px-8 sm:py-9 lg:px-0 lg:py-[30px]">
        <div className="max-w-[800px] text-[#263652]">
          <h3 className="[font-family:Arial,sans-serif] text-[32px] font-bold leading-none sm:text-[36px] lg:text-[40px]">
            What we do
          </h3>
          <div aria-hidden="true" className="mt-2 h-[9px] w-[294px] max-w-full bg-[#b78400]" />

          <div className="mt-3 flex flex-col gap-5 [font-family:Arial,sans-serif] text-[20px] font-normal leading-[1.06] sm:text-[23px] lg:text-[27px]">
            <p>
              Vision Buildaz exists to help people move from ideas to action. The focus is not just motivation. It is
              practical, purposeful growth that helps individuals, entrepreneurs, and emerging leaders think better,
              move smarter, and build with greater intention.
            </p>

            <p>
              Whether someone is refining a vision, rebuilding after a setback, or preparing for a new season, Vision
              Buildaz offers guidance that starts on the inside and moves outward into real life and real decisions.
            </p>

            <p>
              Through coaching, consulting, books, and transformational conversation, Vision Buildaz helps people
              move from uncertainty to action with greater confidence and clarity.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
