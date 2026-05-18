import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const HEADER_LINKS = [
  { label: "Let's Grow", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Founder", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Let's Grow Series", href: "/projects" }
] as const;

const logoSrc = "/images/logo/logo.png";

const groupReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export function BrandHeader(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-night text-cream sm:min-h-[800px]">
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-premium ease-premium sm:px-6"
        initial={{ opacity: 0, y: -22 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-panel px-4 py-3 transition-all duration-premium ease-premium sm:px-5 ${
            isScrolled
              ? "border border-cream/15 bg-night/74 shadow-strong backdrop-blur-2xl"
              : "border border-cream/10 bg-cream/5 backdrop-blur-sm"
          }`}
        >
          <Link aria-label="Vision Buildaz Home" className="flex items-center gap-3" to="/">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cream shadow-subtle">
              <img
                alt="Vision Buildaz logo"
                className="h-8 w-8 object-contain"
                height={64}
                src={logoSrc}
                width={64}
              />
            </span>
            <span className="hidden text-small font-bold text-cream sm:inline">Vision Buildaz</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {HEADER_LINKS.slice(1).map((item) => (
                <li key={item.label}>
                  <Link
                    className="rounded-full px-4 py-2 text-small font-semibold text-cream/78 transition duration-premium ease-premium hover:bg-cream/10 hover:text-cream"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(217,154,32,0.22), 0 18px 36px rgba(217,154,32,0.18)",
                "0 0 0 10px rgba(217,154,32,0), 0 20px 42px rgba(217,154,32,0.22)",
                "0 0 0 0 rgba(217,154,32,0.22), 0 18px 36px rgba(217,154,32,0.18)"
              ]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="inline-flex items-center justify-center rounded-control bg-accent px-4 py-2 text-small font-extrabold text-night transition duration-premium ease-premium hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:px-5"
                to="/contact"
              >
                Let&apos;s Grow
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(217,154,32,0.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(135deg,#071426_0%,#12234b_52%,#071426_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-canvas to-transparent" />
      <div className="absolute left-1/2 top-28 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-cream/10" />

      <div className="container flex min-h-[720px] items-center pt-28 sm:min-h-[800px] sm:pt-32">
        <motion.div
          className="grid w-full items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
          initial="hidden"
          variants={groupReveal}
          viewport={{ once: true, amount: 0.35 }}
          whileInView="show"
        >
          <div>
            <motion.p
              className="mb-7 text-label font-bold uppercase text-accent"
              variants={itemReveal}
            >
              Vision Buildaz
            </motion.p>
            <motion.h1
              className="max-w-4xl text-[3.35rem] font-extrabold leading-[0.9] text-cream sm:text-[5.4rem] lg:text-[7.25rem]"
              variants={itemReveal}
            >
              YOU READY?
              <span className="block text-accent">LET&apos;S GROW!</span>
            </motion.h1>
            <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={itemReveal}>
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(217,154,32,0.28), 0 22px 46px rgba(217,154,32,0.2)",
                    "0 0 0 14px rgba(217,154,32,0), 0 28px 58px rgba(217,154,32,0.24)",
                    "0 0 0 0 rgba(217,154,32,0.28), 0 22px 46px rgba(217,154,32,0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    className="inline-flex rounded-control bg-accent px-6 py-4 text-small font-extrabold uppercase text-night transition duration-premium ease-premium hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                    to="/contact"
                  >
                    Contact Vision Buildaz
                  </Link>
                </motion.div>
              </motion.div>
              <Link
                className="rounded-control border border-cream/20 px-6 py-4 text-small font-bold text-cream/84 transition duration-premium ease-premium hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
                to="/projects"
              >
                Let&apos;s Grow Series
              </Link>
            </motion.div>
          </div>

          <motion.div className="relative mx-auto w-full max-w-[480px]" variants={itemReveal}>
            <div className="absolute -inset-8 rounded-panel bg-cream/8 blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              className="relative rounded-panel border border-cream/12 bg-cream/8 p-8 shadow-strong backdrop-blur-xl"
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                alt="Vision Buildaz logo"
                className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-[0_26px_42px_rgba(0,0,0,0.28)]"
                height={420}
                src={logoSrc}
                width={640}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
