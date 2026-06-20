import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function WixFounderSection(): JSX.Element {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex h-[112px] items-center justify-center bg-[#1f295b] sm:h-[124px] lg:h-[133px]">
        <h2 className="px-4 text-center [font-family:'Trirong',Georgia,serif] text-[31px] font-bold uppercase leading-none text-white sm:text-[37px] lg:text-[39px]">
          Meet WD Brown
        </h2>
      </div>

      <div className="bg-white px-6 py-12 sm:px-8 sm:py-14 lg:min-h-[742px] lg:px-0 lg:py-[64px]">
        <div className="mx-auto grid w-full max-w-[916px] items-start gap-10 lg:grid-cols-[minmax(0,540px)_285px] lg:gap-[66px]">
          <div className="[font-family:Arial,sans-serif] text-[21px] leading-[1.35] text-[#263652] sm:text-[24px] lg:text-[27px]">
            <div className="space-y-8 lg:space-y-[39px]">
              <p>
                WD Brown is the founder of Vision Buildaz and
                <br />
                the voice behind “You Ready? Let’s Grow!®” As
                <br />
                an entrepreneur, mentor, and speaker, he is
                <br />
                committed to helping people strengthen their
                <br />
                mindset, sharpen their vision, and grow with
                <br />
                intention.
              </p>

              <p>
                His work is centered on practical wisdom,
                <br />
                personal development, and helping others move
                <br />
                forward with clarity and purpose.
              </p>

              <p>
                His book series, You Ready? Let’s Grow, begins
                <br />
                with Mindset Before Millions, a powerful
                <br />
                introduction to the belief that true prosperity
                <br />
                starts within.
              </p>
            </div>

            <Link
              className="mt-[14px] inline-flex h-[56px] min-w-[236px] items-center justify-center rounded-[7px] bg-[#ffd154] px-6 [font-family:Georgia,serif] text-[14px] italic leading-none text-[#47370a] shadow-[0_8px_18px_rgba(0,0,0,0.1)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#1f295b] focus:ring-offset-2 lg:ml-5"
              to="/wdbrown"
            >
              ABOUT WD BROWN &gt;&gt;
            </Link>
          </div>

          <img
            alt="WD Brown"
            className="mx-auto h-auto w-full max-w-[285px] object-cover object-center lg:mt-10 lg:h-[445px]"
            loading="lazy"
            src="/images/assets/books-promo-founder.png"
          />
        </div>
      </div>
    </motion.section>
  );
}
