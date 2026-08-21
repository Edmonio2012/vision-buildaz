import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EditorialPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  lead: string;
  imageAlt: string;
  imageSrc: string;
  imageHeight?: number;
  imageWidth?: number;
  children: ReactNode;
  aside?: ReactNode;
}

export function EditorialPage({
  eyebrow,
  title,
  subtitle,
  lead,
  imageAlt,
  imageSrc,
  imageHeight,
  imageWidth,
  children,
  aside
}: EditorialPageProps): JSX.Element {
  return (
    <main className="bg-[#f6f2ea] text-[#1f2a54]">
      <section className="overflow-hidden bg-[linear-gradient(135deg,#efe4c8_0%,#f6f2ea_50%,#e5edf5_100%)] px-6 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="[font-family:'Trirong',serif] text-[15px] font-semibold uppercase tracking-[0.2em] text-[#aa8f20]">
              {eyebrow}
            </p>
            <h1 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.5rem,6vw,4.8rem)] font-bold leading-[0.96] text-[#1f2a54]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 text-[16px] font-semibold uppercase tracking-[0.16em] text-[#4f5a7b] sm:text-[18px]">
                {subtitle}
              </p>
            ) : null}
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.8] text-[#374151] sm:text-[18px]">
              {lead}
            </p>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto w-full max-w-[500px]"
            initial={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[34px] bg-[#d7bf86]/55" />
            <div className="relative overflow-hidden rounded-[34px] bg-[#2f396d] px-4 pt-8">
              <img
                alt={imageAlt}
                className="mx-auto w-full max-w-[420px] object-contain object-bottom"
                fetchPriority="high"
                height={imageHeight}
                src={imageSrc}
                width={imageWidth}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 lg:py-20">
        <div
          className={`mx-auto grid w-full max-w-[1180px] gap-8 ${
            aside ? "lg:grid-cols-[1.18fr_0.82fr]" : ""
          }`}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(31,42,84,0.08)] sm:px-8 sm:py-10"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>

          {aside ? (
            <motion.aside
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {aside}
            </motion.aside>
          ) : null}
        </div>
      </section>
    </main>
  );
}
