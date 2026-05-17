// Mirrored two-column section: workbook image on the left and supporting copy + CTA on the right.
export function MindsetWorkbookSection(): JSX.Element {
  return (
    <section className="bg-[#fbfaf7] px-5 py-24 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="order-1 flex w-full items-end justify-center lg:justify-end">
          <div className="w-full max-w-[390px] overflow-hidden border-[4px] border-[#071426] bg-white shadow-[0_24px_60px_rgba(8,17,31,0.12)]">
            <img
              alt="Mindset Before Millions workbook cover"
              className="h-auto w-full object-contain"
              loading="lazy"
              src="/images/assets/mindset-before-millions-book.png"
            />
          </div>
        </div>

        <div className="order-2">
          <p className="max-w-[560px] text-[17px] font-normal leading-[1.75] tracking-normal text-[#0b1220] sm:text-[20px]">
            Transformation doesn&apos;t happen just by reading, it happens through reflection.The Mindset Before Millions
            Workbook is the practical companion to the book, created to help you apply its principles to your own life.
            Through guided prompts and dedicated journaling space, this workbook invites you to examine how your pursuit
            of success is impacting your health, relationships, boundaries, and sense of fulfillment.
          </p>

          <button
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-[#071426] px-5 py-2.5 text-[15px] font-semibold uppercase tracking-normal text-white transition duration-300 hover:scale-[1.03] hover:bg-[#d99a20] hover:text-[#071426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d99a20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7] active:scale-[0.99] animate-ctaPulseGlow sm:text-[17px]"
            type="button"
          >
            Order Now <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
