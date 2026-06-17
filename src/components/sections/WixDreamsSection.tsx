import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function WixDreamsSection(): JSX.Element {
  return (
    <motion.section
      className="overflow-hidden bg-[#f0eefc] text-[#343440]"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="bg-[#262b66] py-5 text-white">
        <div className="container flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-16">
          <h2 className="[font-family:'Trirong',serif] text-[27px] font-bold uppercase leading-none drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)] sm:text-[33px]">
            Achieve Your Dreams
          </h2>
          <Link
            className="inline-flex h-[56px] min-w-[184px] items-center justify-center border border-white/65 px-8 [font-family:'Poppins',sans-serif] text-[18px] font-medium uppercase leading-none text-white transition hover:bg-white hover:text-[#262b66]"
            to="/contact"
          >
            Book Now &gt;&gt;
          </Link>
        </div>
      </div>

      <div className="container py-14 sm:py-18 md:py-20">
        <div className="max-w-[760px]">
          <p className="[font-family:'Poppins',sans-serif] text-[38px] font-light uppercase leading-[1.55] tracking-[0.04em] text-[#b79a62] sm:text-[48px] md:text-[56px]">
            Helping Entreprenuers Unlock Their Full Potential
          </p>

          <p className="mt-7 max-w-[560px] [font-family:'Poppins',sans-serif] text-[24px] font-normal leading-[1.28] text-[#393946] sm:text-[28px] md:text-[31px]">
            Vision Buildaz was founded by WD Brown, a seasoned entrepreneur with decades of
            experience helping others achieve their dreams. We believe that success is the result
            of clear vision, strategic planning, and ongoing support.
          </p>
        </div>

        <div className="relative mt-8 min-h-[245px]">
          <div className="absolute left-0 top-0 z-10 flex aspect-square w-[210px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#17235c] bg-[#d9dbe8] shadow-[0_12px_28px_rgba(32,39,88,0.22)] sm:w-[245px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_33%_29%,rgba(255,255,255,0.72),transparent_16%),linear-gradient(135deg,#f4f4f8_0%,#9397aa_42%,#23273e_100%)]" />
            <div className="relative h-[122px] w-[122px] rounded-full border-[14px] border-[#11131f] bg-[#161829] shadow-[0_0_0_10px_rgba(255,255,255,0.26)] sm:h-[138px] sm:w-[138px]" />
            <div className="absolute right-[36px] top-[32px] h-[112px] w-[34px] rotate-[-12deg] rounded-full bg-[linear-gradient(90deg,#777b8f,#e7e8ef,#42465c)] shadow-[0_14px_22px_rgba(0,0,0,0.25)] sm:right-[44px] sm:top-[36px] sm:h-[128px]" />
            <div className="absolute bottom-[24px] right-[28px] h-[5px] w-[104px] rotate-[-18deg] rounded-full bg-[#26283a] sm:bottom-[32px] sm:right-[35px]" />
          </div>

          <Link
            className="absolute left-[105px] right-0 top-[39px] z-0 flex min-h-[132px] items-center justify-center bg-[linear-gradient(90deg,#b37539_0%,#efcf76_37%,#f2d878_57%,#b9773a_100%)] px-8 text-center transition hover:brightness-105 sm:left-[122px] sm:top-[56px]"
            to="/youreadyletsgrowdigital"
          >
            <span className="[font-family:'Poppins',sans-serif] text-[29px] font-light uppercase leading-[1.05] text-[#22275d] sm:text-[34px]">
              Join Our
              <br />
              <strong className="font-extrabold">Podcast &gt;&gt;</strong>
            </span>
          </Link>
        </div>

        <div className="mt-10">
          <div className="max-w-[920px] [font-family:'Poppins',sans-serif] text-[24px] leading-[1.26] text-[#393946] sm:text-[28px] md:text-[31px]">
            <p>
              Explore our library of recommended books as well as books authored by W. D. Brown.
              These resources provide in-depth guidance on everything from entrepreneurship and
              leadership to personal finance and self-development.
            </p>

            <p className="mt-8">
              Each book is designed to give you the tools you need to make informed decisions and
              take control of your future.
            </p>
          </div>

          <div className="mt-16 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_390px] md:gap-12">
            <p className="[font-family:'Poppins',sans-serif] text-[40px] font-light uppercase leading-[1.55] tracking-[0.04em] text-[#b79a62] sm:text-[48px] md:text-[56px]">
              Mindset Before Millions
            </p>

            <img
              alt="Mindset Before Millions book cover by WD Brown"
              className="mx-auto w-full max-w-[340px] object-contain md:max-w-[390px]"
              src="/images/assets/mindset-before-millions-book.png"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
