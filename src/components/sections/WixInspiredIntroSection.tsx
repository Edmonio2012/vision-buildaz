import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function WixInspiredIntroSection(): JSX.Element {
  return (
    <section className="relative isolate min-h-[430px] overflow-hidden bg-[#222d5f] sm:min-h-[480px] lg:min-h-[520px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        style={{ backgroundImage: "url('/images/assets/books-promo-bg.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,71,0.9)_0%,rgba(35,43,92,0.82)_48%,rgba(35,43,92,0.86)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/30" />

      <motion.div
        className="container relative z-10 flex min-h-[430px] flex-col justify-center py-16 sm:min-h-[480px] lg:min-h-[520px]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="max-w-[880px]">
          <h1 className="[font-family:'dinneuzeitgroteskltw01-_812426','Poppins',sans-serif] text-[34px] font-extrabold uppercase leading-tight tracking-[0.01em] text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.28)] sm:text-[44px] md:text-[56px]">
            Welcome to Vision Buildaz
          </h1>

          <p className="mt-9 max-w-[830px] [font-family:'avenida-w01','Trirong',serif] text-[20px] leading-[1.45] text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.26)] sm:text-[25px] md:text-[30px]">
            Vision Buildaz is a coaching and mentoring platform that breathes life into your dreams and helps you to
            realize your vision.
            <br />
            We&apos;re helping build visions from A to Z.
          </p>

          <motion.div className="mt-10" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              className="inline-flex h-[54px] min-w-[270px] items-center justify-center bg-[#a58b25] px-10 [font-family:'Poppins',sans-serif] text-[16px] font-semibold uppercase leading-none text-white shadow-[0_12px_26px_rgba(0,0,0,0.25)] transition hover:bg-[#b79a2c] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#222d5f]"
              to="/about"
            >
              Learn More &gt;&gt;
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
