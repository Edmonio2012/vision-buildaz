import { motion } from "framer-motion";

const services = ["SHIFT\nYOUR\nMINDSET", "CLARIFY\nYOUR\nPURPOSE", "BUILD\nYOUR NEXT\nSTEP"] as const;

export function WixServicesSection(): JSX.Element {
  return (
    <motion.section
      className="overflow-hidden bg-[#d3a452]"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex min-h-[720px] items-center bg-[length:100%_100%] bg-center bg-no-repeat px-6 py-16 sm:min-h-[360px] sm:px-8 md:min-h-[400px] lg:min-h-[433px] lg:px-0 lg:py-[78px]"
        style={{ backgroundImage: "url('/images/assets/subheader-bg.jpg')" }}
      >
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center gap-8 sm:flex-row sm:gap-7 lg:gap-[28px]">
          {services.map((service) => (
            <motion.div
              className="flex aspect-square w-[214px] shrink-0 select-none items-center justify-center rounded-full border-[3px] border-[#132664] bg-transparent text-center sm:w-[230px] md:w-[250px] lg:w-[272px]"
              key={service}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="[font-family:Arial,sans-serif] text-[30px] font-bold uppercase leading-[1.05] tracking-[-0.035em] text-[#132664] sm:text-[34px] lg:text-[39px]">
                {service.split("\n").map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
