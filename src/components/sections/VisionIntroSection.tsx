import { motion } from "framer-motion";

const sectionReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14
    }
  }
};

const revealItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

export function VisionIntroSection(): JSX.Element {
  return (
    <motion.section
      className="relative isolate overflow-hidden bg-night px-6 py-section text-cream sm:px-8 lg:py-section-lg"
      initial="hidden"
      variants={sectionReveal}
      viewport={{ once: true, amount: 0.35 }}
      whileInView="show"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(212,161,50,0.18),transparent_30%)]" />

      <div className="container">
        <div className="mx-auto max-w-[940px]">
          <motion.p className="text-label font-bold uppercase text-accent" variants={revealItem}>
            The movement
          </motion.p>
          <motion.div
            className="mt-8 space-y-8 text-[1.15rem] leading-[1.9] text-cream/86 sm:text-[1.35rem]"
            variants={revealItem}
          >
            <p>
              <span className="font-semibold italic text-cream">
                Vision Buildaz /You Ready? Let&apos;s Grow
                <sup className="text-[0.48em] leading-none">&trade;</sup>/
              </span>{" "}
              is a coaching &amp; mentoring platform that breathes life into dreams and helps you to
              realize your vision. Led by Founder WD Brown, members receive guidance in realizing
              purpose and fulfilling destiny.
            </p>

            <p>
              Vision Buildaz is more than a business &mdash; it is a movement. Rooted in WD&apos;s
              belief that every person carries a vision worth pursuing, Vision Buildaz exists to
              help individuals rise from discouragement, push past confusion, and step into their
              purpose with courage and clarity that leads to wholeness.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
