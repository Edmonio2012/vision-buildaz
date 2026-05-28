import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeaderLinks = [
  { label: "Let's Grow", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Founder", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Let's Grow Series", href: "/projects" }
] as const;

const LogoSrc = "/images/logo/logo.png";
const SubheaderBackgroundSrc = "/images/assets/subheader-bg.jpg";

export function BrandHeader(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[#efefef] md:max-h-[500px] md:overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex h-[246px] w-full max-w-[1280px] items-center justify-center px-4 pt-2 sm:h-[258px] sm:pt-3"
        initial={{ opacity: 0, y: -14 }}
        transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link aria-label="Vision Buildaz Home" className="block self-center justify-self-center" to="/">
          <motion.img
            alt="Vision Buildaz logo"
            className="mx-auto h-[176px] w-[250px] object-contain sm:h-[224px] sm:w-[317px] md:h-[241px] md:w-[341px]"
            height={241}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={LogoSrc}
            width={341}
          />
        </Link>
      </motion.header>

      <motion.nav
        aria-label="Primary"
        className="mx-auto hidden h-[68px] w-full max-w-[1280px] items-center justify-center overflow-hidden px-4 md:flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <ul className="flex min-w-0 flex-nowrap items-center justify-center gap-x-8 overflow-visible">
          {HeaderLinks.map((item, index) => (
            <li key={item.label}>
              <motion.div whileHover={{ y: -1, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                className={`[font-family:'Poppins',sans-serif] text-[16px] font-normal leading-none sm:text-[17px] md:text-[19px] ${
                  index === 0 ? "text-[#aa8f20]" : "text-black"
                }`}
                to={item.href}
              >
                {item.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.nav>

      <motion.div
        className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 md:hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2">
          <Link
            className="[font-family:'Poppins',sans-serif] rounded-full border border-[#1f2a54]/20 bg-white/80 px-3 py-1.5 text-[14px] font-medium leading-none text-[#aa8f20] shadow-[0_8px_18px_rgba(17,24,39,0.12)] backdrop-blur"
            to="/"
          >
            Let&apos;s Grow
          </Link>
          <Link
            className="[font-family:'Poppins',sans-serif] rounded-full border border-[#1f2a54]/20 bg-white/80 px-3 py-1.5 text-[14px] font-medium leading-none text-[#1f2a54] shadow-[0_8px_18px_rgba(17,24,39,0.12)] backdrop-blur"
            to="/contact"
          >
            Contact
          </Link>
        </div>

        <motion.button
          aria-controls="mobile-primary-menu"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d1b260]/60 bg-[linear-gradient(180deg,#f5e3a4_0%,#c9953f_100%)] text-[#1f2a54] shadow-[0_12px_26px_rgba(17,24,39,0.22)] transition active:scale-95"
          onClick={toggleMobileMenu}
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="sr-only">Open menu</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-5 bg-current transition ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`absolute left-0 top-[7px] block h-[2px] w-5 bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 top-[14px] block h-[2px] w-5 bg-current transition ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </motion.button>
      </motion.div>

      <nav
        aria-label="Mobile Primary"
        className={`mx-auto w-[calc(100%-2rem)] max-w-[520px] overflow-hidden rounded-2xl border border-[#d1b260]/55 bg-[#edd79b]/95 p-3 shadow-[0_6px_14px_rgba(17,24,39,0.1)] transition-opacity duration-100 md:hidden ${
          mobileMenuOpen ? "mb-3 max-h-72 opacity-100" : "pointer-events-none mb-0 max-h-0 border-transparent p-0 opacity-0"
        }`}
        id="mobile-primary-menu"
      >
        <ul className="space-y-1">
          {HeaderLinks.map((item, index) => (
            <li key={item.label}>
              <Link
                className={`block rounded-lg px-3 py-2 [font-family:'Poppins',sans-serif] text-[18px] leading-none ${
                  index === 0 ? "bg-white/40 font-medium text-[#aa8f20]" : "text-black hover:bg-white/30"
                }`}
                onClick={closeMobileMenu}
                to={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="flex h-[118px] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundImage: `url('${SubheaderBackgroundSrc}')` }}
      >
        <motion.p
          className="[font-family:'Trirong',serif] px-4 text-center text-[21px] font-bold uppercase leading-none text-white drop-shadow-[0_3px_2px_rgba(23,32,52,0.35)] sm:text-[27px] md:text-[33px]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.24, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          YOU READY? LET&apos;S GROW!
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
