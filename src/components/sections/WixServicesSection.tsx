import { motion } from "framer-motion";

const services = ["Coaching", "Planning", "Finances"] as const;

const tileClasses = [
  "bg-[linear-gradient(135deg,rgba(34,47,93,0.4),rgba(220,245,255,0.28)),url('/images/assets/books-promo-bg.jpg')] bg-cover bg-left",
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(28,42,88,0.18)),url('/images/assets/yrlgd-hero-founder.png')] bg-cover bg-center",
  "bg-[linear-gradient(135deg,rgba(246,245,237,0.46),rgba(255,255,255,0.18)),url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center",
  "bg-[#182a45]",
  "bg-[#102b4a]",
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.54),rgba(42,56,101,0.16)),url('/images/assets/about-section1-founder.png')] bg-cover bg-center"
] as const;

export function WixServicesSection(): JSX.Element {
  return (
    <motion.section
      className="overflow-hidden bg-[#d3a452]"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="relative isolate min-h-[320px] bg-[radial-gradient(circle_at_45%_42%,rgba(255,246,184,0.72),transparent_31%),linear-gradient(90deg,#b67538_0%,#e6bd61_28%,#f3d87a_48%,#d99d4a_74%,#a66a38_100%)] px-4 py-14 sm:py-16 md:min-h-[345px]">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.38),transparent_19%,transparent_80%,rgba(61,35,21,0.22))]" />
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center justify-center gap-8 sm:flex-row sm:gap-7 md:gap-10">
          {services.map((service) => (
            <motion.div
              className="flex aspect-square w-[205px] items-center justify-center rounded-full border-[3px] border-[#17235c] bg-transparent text-center shadow-[inset_0_0_22px_rgba(255,255,255,0.08)] sm:w-[220px] md:w-[235px]"
              key={service}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="[font-family:'Poppins',sans-serif] text-[27px] font-extrabold uppercase leading-none text-[#17235c] sm:text-[29px] md:text-[31px]">
                {service}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid h-[180px] grid-cols-2 overflow-hidden sm:h-[200px] sm:grid-cols-3 lg:grid-cols-6">
        {tileClasses.map((className, index) => (
          <div className={`relative min-h-0 border-r-2 border-white/85 ${className}`} key={className}>
            <div className="absolute inset-0 bg-white/10" />
            {index === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[4px] w-[72%] rotate-[-30deg] rounded-full bg-[#6cbf3f] shadow-[0_0_18px_rgba(108,191,63,0.5)]" />
                <div className="absolute right-[24%] top-[33%] h-0 w-0 rotate-[-30deg] border-y-[12px] border-l-[22px] border-y-transparent border-l-[#6cbf3f]" />
              </div>
            ) : null}
            {index === 2 ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/16">
                <div className="rotate-[-1deg] bg-white px-5 py-4 text-center shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                  <p className="[font-family:'Poppins',sans-serif] text-[23px] font-extrabold uppercase leading-[0.95] text-[#17235c]">
                    Financial
                    <br />
                    Literacy
                  </p>
                </div>
              </div>
            ) : null}
            {index === 3 || index === 4 ? (
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-3 font-mono text-[15px] leading-none">
                {Array.from({ length: 28 }).map((_, cellIndex) => (
                  <span className={cellIndex % 3 === 0 ? "text-[#ff6b74]" : "text-[#52d35f]"} key={cellIndex}>
                    {(cellIndex * 17.29 + 5.07).toFixed(2)}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
