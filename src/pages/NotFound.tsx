import { Link } from "react-router-dom";

import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";

export function NotFound(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <main className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-[#303a6d] px-6 py-20 text-center sm:px-8 lg:min-h-[560px]">
        <div className="absolute inset-0 bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-[#29366a]/80" />
        <div className="relative z-10 flex max-w-[760px] flex-col items-center text-white">
          <p className="[font-family:Arial,sans-serif] text-[76px] font-bold leading-none sm:text-[96px] lg:text-[118px]">404</p>
          <h1 className="mt-3 [font-family:'Trirong',Georgia,serif] text-[34px] font-bold leading-none sm:text-[42px] lg:text-[48px]">
            Page Not Found
          </h1>
          <p className="mt-7 [font-family:Arial,sans-serif] text-[19px] leading-[1.5] text-white/90 sm:text-[22px]">
            The page you&apos;re looking for may have moved, changed, or no longer exists.
          </p>
          <Link
            className="mt-9 inline-flex h-[54px] min-w-[230px] items-center justify-center rounded-[7px] bg-[#ffd154] px-6 [font-family:Georgia,serif] text-[15px] italic text-[#47370a] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#303a6d]"
            to="/"
          >
            RETURN HOME &gt;&gt;
          </Link>
        </div>
      </main>
      <Copyright />
    </>
  );
}
