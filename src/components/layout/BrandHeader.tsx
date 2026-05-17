// Branded header/navbar plus hero subheader, designed to mirror the provided reference.
import { Link } from "react-router-dom";

import logoImage from "@/assets/images/logo/logo.png";

const HEADER_LINKS = [
  { label: "Let's Grow", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Founder", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Let's Grow Series", href: "/projects" }
] as const;

export function BrandHeader(): JSX.Element {
  return (
    <section className="w-full overflow-hidden bg-[#fbfaf7]">
      <header className="px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <Link aria-label="Vision Buildaz Home" className="inline-flex flex-col items-center gap-1" to="/">
            <img
              alt="Vision Buildaz logo"
              className="h-auto w-[132px] object-contain drop-shadow-[0_10px_24px_rgba(8,17,31,0.14)] sm:w-[176px] md:w-[210px]"
              height={260}
              loading="eager"
              src={logoImage}
              width={520}
            />
          </Link>

          <nav aria-label="Primary" className="mt-5 w-full">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium tracking-normal text-[#0b1220] sm:gap-x-7 sm:text-[15px]">
              {HEADER_LINKS.map((item, index) => (
                <li key={item.label}>
                  <Link
                    className={
                      index === 0
                        ? "text-[#b9861b] transition-colors duration-300 hover:text-[#916813]"
                        : "transition-colors duration-300 hover:text-[#b9861b]"
                    }
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#d8d2c5] to-transparent" />
        </div>
      </header>

      <div className="w-full bg-[linear-gradient(90deg,#f1dda0_0%,#c58b32_24%,#f4e6a8_50%,#cc933b_77%,#a96c25_100%)] px-4 py-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(78,48,11,0.22)] sm:px-6 sm:py-14">
        <div className="mx-auto flex w-full max-w-5xl justify-center">
          <h1 className="text-center font-serif text-[18px] font-semibold uppercase leading-none tracking-normal text-[#fbfdff] [text-shadow:0_1px_0_rgba(255,255,255,0.48),0_2px_0_rgba(45,69,106,0.52),0_8px_18px_rgba(9,20,42,0.18)] sm:text-[24px] md:text-[30px]">
            YOU READY? LET&apos;S GROW!
          </h1>
        </div>
      </div>
    </section>
  );
}
