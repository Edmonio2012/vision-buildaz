// Promotional section for featured books/courses shown directly below the hero banner.
export function BooksPromoSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-[#071426]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{ backgroundImage: "url('/images/assets/books-promo-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,20,38,0.94)_0%,rgba(18,35,75,0.84)_50%,rgba(7,20,38,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_42%,rgba(212,161,50,0.14),transparent_46%)]" />

      <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-12">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="max-w-[520px] text-center lg:text-left">
            <p className="font-sans text-[28px] font-extrabold italic leading-tight tracking-normal text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)] sm:text-[38px] md:text-[46px]">
              New Books Alert!
            </p>
            <p className="mt-4 font-serif text-[26px] font-semibold uppercase leading-tight tracking-normal text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)] sm:text-[36px] md:text-[42px]">
              Order Today!
            </p>
          </div>
        </div>

        <div className="flex items-end justify-center lg:justify-end">
          <img
            alt="Founder portrait for books promotion"
            className="h-[320px] w-full max-w-[500px] object-contain sm:h-[420px] lg:h-[540px]"
            loading="lazy"
            src="/images/assets/books-promo-founder.png"
          />
        </div>
      </div>
    </section>
  );
}
