import { motion } from "framer-motion";
import { PhoneCountryCodeSelect } from "@/components/ui/PhoneCountryCodeSelect";

export function MindsetMainSection(): JSX.Element {
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

      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-7 pt-8 sm:px-8 md:pb-8 md:pt-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[34px] font-semibold italic leading-[1] text-white sm:text-[44px] md:text-[54px]">
            Mindset Before Millions
          </h2>
          <p className="mt-2 [font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[38px] font-semibold italic leading-[1] text-white sm:text-[50px] md:text-[60px]">
            Sign Up For Your $1 E-book Here
          </p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-[880px] grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_0.88fr]">
          <div className="bg-[#efefef] px-6 py-7 sm:px-8">
            <p className="[font-family:'Poppins',sans-serif] text-[18px] leading-[1.4] text-[#2f3c4f]">
              Submit your information below and we&apos;ll send you the private purchase links for
              the <span className="font-semibold">Mindset Before Millions</span> book series.
            </p>

            <div className="mt-7 space-y-7">
              <div>
                <label className="block [font-family:'Poppins',sans-serif] text-[17px] text-[#2f3c4f]">
                  Name *
                </label>
                <input
                  className="mt-2 h-[58px] w-full border border-[#9c9c9c] bg-transparent px-3 text-[18px] text-[#1f2d41] outline-none focus:border-[#7f7f7f]"
                  type="text"
                />
              </div>

              <div>
                <label className="block [font-family:'Poppins',sans-serif] text-[17px] text-[#2f3c4f]">
                  Email *
                </label>
                <input
                  className="mt-2 h-[58px] w-full border border-[#9c9c9c] bg-transparent px-3 text-[18px] text-[#1f2d41] outline-none focus:border-[#7f7f7f]"
                  type="email"
                />
              </div>

              <div>
                <label className="block [font-family:'Poppins',sans-serif] text-[17px] text-[#2f3c4f]">
                  Phone
                </label>
                <div className="mt-2 grid grid-cols-[76px_minmax(0,1fr)] gap-2 sm:grid-cols-[90px_minmax(0,1fr)] md:grid-cols-[98px_minmax(0,1fr)]">
                  <PhoneCountryCodeSelect className="w-full" defaultValue="US" />
                  <input
                    className="h-[52px] min-w-0 w-full border border-[#9c9c9c] bg-transparent px-3 text-[15px] text-[#1f2d41] outline-none focus:border-[#7f7f7f] sm:text-[17px]"
                    inputMode="tel"
                    placeholder="Phone number"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            <button
              className="mt-7 h-[58px] w-full bg-[#6eb4da] [font-family:'Poppins',sans-serif] text-[32px] font-normal leading-none text-white transition hover:brightness-95"
              type="button"
            >
              Submit
            </button>
          </div>

          <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
            <img
              alt="WD Brown holding Mindset Before Millions book"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/assets/mindset-main-founder.png"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
