import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/constants";

const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]["label"], JSX.Element> = {
  TikTok: <SiTiktok className="h-5 w-5" aria-hidden="true" />,
  Instagram: <SiInstagram className="h-5 w-5" aria-hidden="true" />,
  YouTube: <SiYoutube className="h-5 w-5" aria-hidden="true" />,
  Facebook: <SiFacebook className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />
};

// Books alert hero section shown directly under the header subheader.
// Matches the provided reference: left text over blue architectural background + right founder image.
export function BooksAlertSection(): JSX.Element {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-[#303a6d]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-45" />
      <div className="absolute inset-0 bg-[#2b3568]/75" />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 md:grid-cols-2">
        <motion.div
          className="flex min-h-[280px] items-center px-6 py-10 sm:px-8 sm:py-10 md:min-h-[460px] md:justify-end md:pl-0 md:pr-6 lg:min-h-[580px] lg:pr-8"
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div className="flex w-full flex-col items-center gap-3 text-center md:max-w-[360px] md:items-end md:text-right lg:max-w-[470px] lg:gap-4">
            <motion.h2
              className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[36px] font-semibold italic leading-[0.98] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] sm:text-[42px] md:text-[48px] lg:text-[60px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              New Books Alert!
            </motion.h2>
            <motion.p
              className="[font-family:'avenida-w01',fantasy] text-[40px] font-normal leading-[0.92] text-white sm:text-[48px] md:text-[56px] lg:text-[70px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: 0.22 }}
            >
              Order Today!
            </motion.p>
            <motion.div
              className="mt-4 flex items-center gap-3 md:justify-end"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.28 }}
            >
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2e396a] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.22)]"
                >
                  {SOCIAL_ICONS[label]}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto flex w-full max-w-[488px] items-end justify-center px-4 pt-0 md:max-w-[380px] md:justify-start md:px-0 lg:max-w-[488px]"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <motion.img
            alt="WD Brown portrait"
            className="h-auto w-full max-w-[488px] object-contain object-bottom"
            loading="lazy"
            src="/images/assets/books-promo-founder.png"
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
