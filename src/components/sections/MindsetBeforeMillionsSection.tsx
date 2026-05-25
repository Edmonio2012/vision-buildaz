import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function MindsetBeforeMillionsSection(): JSX.Element {
  const [showFullCopy, setShowFullCopy] = useState(false);

  return (
    <>
      <motion.section
        className="bg-[#ececec] px-6 py-14 sm:px-8 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto grid w-full max-w-[1040px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_460px] lg:gap-16">
          <motion.div
            className="order-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-[470px] space-y-8">
              <p className="[font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.62] text-[#26354b] sm:text-[19px] md:text-[21px] lg:text-[23px] xl:text-[24px]">
                Wealth without alignment comes at a cost few talk about.
              </p>

              {!showFullCopy ? (
                <p className="[font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.62] text-[#26354b] sm:text-[19px] md:text-[21px] lg:text-[23px] xl:text-[24px]">
                  Mindset Before Millions challenges the belief that{" "}
                  <strong className="font-semibold text-[#1f2d41]">financial success</strong>{" "}
                  requires sacrificing health, relationships, and fulfillment.{" "}
                  <button
                    className="font-semibold text-[#1f2d41] underline decoration-[#b3872f] underline-offset-4 transition hover:text-[#0f1928]"
                    onClick={() => setShowFullCopy(true)}
                    type="button"
                  >
                    Continue reading
                  </button>
                </p>
              ) : (
                <p className="[font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.62] text-[#26354b] sm:text-[19px] md:text-[21px] lg:text-[23px] xl:text-[24px]">
                  Mindset Before Millions challenges the belief that{" "}
                  <strong className="font-semibold text-[#1f2d41]">financial success</strong>{" "}
                  requires sacrificing health, relationships, and fulfillment. WD Brown reframes
                  wealth not as <strong className="font-semibold text-[#1f2d41]">endless accumulation</strong>,
                  but as <strong className="font-semibold text-[#1f2d41]">purpose</strong> &mdash;
                  a tool meant to support a life of{" "}
                  <strong className="font-semibold text-[#1f2d41]">
                    balance, meaning, and lasting impact
                  </strong>
                  .
                </p>
              )}
            </div>

            <button
              className="group relative mt-12 inline-flex animate-cta-pulse items-center gap-2 overflow-hidden rounded-[12px] border border-[#d8b168] bg-[#050608] px-8 py-4 text-[28px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-all duration-300 hover:scale-[1.05] hover:border-[#f2cf87] hover:shadow-[0_26px_44px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b168] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ececec]"
              type="button"
            >
              <span className="pointer-events-none absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-[#1f232a] via-[#0b0e12] to-[#040506]" />
              <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-[40%] animate-cta-sheen bg-gradient-to-r from-transparent via-[#ffedbf]/35 to-transparent" />
              <span className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_1px_0_rgba(255,233,188,0.34),inset_0_-1px_0_rgba(0,0,0,0.5)]" />
              <span className="relative z-10">Order Now</span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

          <motion.div
            className="order-2 mx-auto w-full max-w-[460px]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.66, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[406/640] w-full overflow-hidden border-[5px] border-black bg-white">
              <img
                alt="Mindset Before Millions cover"
                className="h-full w-full object-cover"
                loading="lazy"
                src="/images/assets/mindset-before-millions-book.png"
            />
            </div>
          </motion.div>
        </div>
      </motion.section>
      <div
        aria-hidden="true"
        className="h-[70px] w-full bg-[url('/images/assets/subheader-bg.jpg')] bg-cover bg-center"
      />
    </>
  );
}
