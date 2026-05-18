import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sectionReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const revealItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

export function BooksPromoSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.section
      className="relative isolate overflow-hidden bg-canvas px-6 py-section sm:px-8 lg:py-section-lg"
      initial="hidden"
      ref={sectionRef}
      variants={sectionReveal}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-6 top-14 -z-10 h-[72%] rounded-panel bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-[0.18] mix-blend-multiply sm:inset-x-10"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_24%,rgba(212,161,50,0.14),transparent_32%),linear-gradient(180deg,transparent_0%,rgba(7,20,38,0.08)_100%)]" />

      <div className="container">
        <motion.div
          className="grid items-center gap-12 rounded-panel border border-line bg-surface/86 p-6 shadow-medium backdrop-blur md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
          variants={sectionReveal}
        >
          <motion.div className="order-2 lg:order-1" variants={revealItem}>
            <div className="max-w-[520px]">
              <p className="text-label font-bold uppercase text-accent">Featured release</p>
              <h2 className="mt-5 text-[2.7rem] font-extrabold leading-[0.98] text-heading sm:text-[4rem] lg:text-[5rem]">
                New Books Alert!
              </h2>
              <p className="mt-5 text-[2.1rem] font-extrabold leading-none text-dominant sm:text-[3rem]">
                Order Today!
              </p>
            </div>
          </motion.div>

          <motion.div className="order-1 lg:order-2" style={{ y: portraitY }} variants={revealItem}>
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-panel bg-dominant shadow-strong">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(212,161,50,0.22),transparent_36%)]" />
              <img
                alt="Founder portrait for books promotion"
                className="relative mx-auto h-[360px] w-full object-contain object-bottom sm:h-[500px] lg:h-[580px]"
                loading="lazy"
                src="/images/assets/books-promo-founder.png"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
