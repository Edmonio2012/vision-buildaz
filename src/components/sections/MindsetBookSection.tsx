// Two-column section introducing the book message with supporting visual and CTA.
export function MindsetBookSection(): JSX.Element {
  return (
    <section className="bg-[#fbfaf7] px-5 py-24 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="order-1">
          <p className="max-w-[470px] text-[17px] font-normal leading-[1.75] tracking-normal text-[#0b1220] sm:text-[20px]">
            Wealth without alignment comes at a cost few talk about.
          </p>

          <p className="mt-7 max-w-[560px] text-[17px] font-normal leading-[1.75] tracking-normal text-[#0b1220] sm:text-[20px]">
            Mindset Before Millions challenges the belief that financial success requires sacrificing health,
            relationships, and fulfillment. WD Brown reframes wealth not as endless accumulation, but as purpose
            &mdash; a tool meant to support a life of balance, meaning, and lasting impact.
          </p>

          <button
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-[#071426] px-5 py-2.5 text-[15px] font-semibold uppercase tracking-normal text-white transition duration-300 hover:scale-[1.03] hover:bg-[#d99a20] hover:text-[#071426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d99a20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7] active:scale-[0.99] animate-ctaPulseGlow sm:text-[17px]"
            type="button"
          >
            Order Now <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="order-2 w-full lg:justify-self-end">
          <div className="w-full max-w-[390px] overflow-hidden border-[4px] border-[#071426] bg-white shadow-[0_24px_60px_rgba(8,17,31,0.12)]">
            <img
              alt="Mindset Before Millions book cover"
              className="h-auto w-full object-contain"
              loading="lazy"
              src="/images/assets/mindset-before-millions-book.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
