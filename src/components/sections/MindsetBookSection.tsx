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
    transition: { duration: 0.74, ease: [0.22, 1, 0.36, 1] }
  }
};

export function MindsetBookSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <motion.section
      className="relative overflow-hidden bg-canvas px-6 py-section sm:px-8 lg:py-section-lg"
      initial="hidden"
      ref={sectionRef}
      variants={sectionReveal}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
    >
      <div className="absolute right-0 top-0 h-1/2 w-1/2 rounded-bl-[6rem] bg-surface/76" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div className="max-w-[570px]" variants={revealItem}>
            <p className="text-label font-bold uppercase text-accent">Mindset before millions</p>
            <div className="mt-7 space-y-7 text-[1.05rem] leading-[1.85] text-body sm:text-[1.18rem]">
              <p>Wealth without alignment comes at a cost few talk about.</p>

              <p>
                Mindset Before Millions challenges the belief that financial success requires
                sacrificing health, relationships, and fulfillment. WD Brown reframes wealth not as
                endless accumulation, but as purpose &mdash; a tool meant to support a life of
                balance, meaning, and lasting impact.
              </p>
            </div>

            <motion.button
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(217,154,32,0.24), 0 18px 38px rgba(217,154,32,0.2)",
                  "0 0 0 12px rgba(217,154,32,0), 0 24px 52px rgba(217,154,32,0.26)",
                  "0 0 0 0 rgba(217,154,32,0.24), 0 18px 38px rgba(217,154,32,0.2)"
                ]
              }}
              className="mt-10 inline-flex items-center justify-center rounded-control bg-accent px-5 py-3 text-small font-extrabold uppercase text-night transition duration-premium ease-premium hover:bg-dominant hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              type="button"
              whileHover={{ scale: 1.045 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now{" "}
              <span aria-hidden="true" className="ml-2">
                &rarr;
              </span>
            </motion.button>
          </motion.div>

          <motion.div className="lg:justify-self-end" style={{ y: imageY }} variants={revealItem}>
            <div className="relative max-w-[410px] rounded-panel bg-surface p-4 shadow-strong">
              <div className="absolute -inset-5 -z-10 rounded-panel bg-accent/14 blur-2xl" />
              <img
                alt="Mindset Before Millions book cover"
                className="h-auto w-full rounded-[1.5rem] object-contain"
                loading="lazy"
                src="/images/assets/mindset-before-millions-book.png"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
