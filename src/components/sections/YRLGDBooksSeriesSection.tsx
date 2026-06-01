export function YRLGDBooksSeriesSection(): JSX.Element {
  return (
    <section className="w-full">
      <div className="bg-[#1f295f] px-6 py-10 text-center sm:px-8 md:py-11">
        <h2 className="[font-family:'Trirong',serif] text-[34px] font-bold italic leading-tight text-white sm:text-[39px] md:text-[43px]">
          Books In This Series
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6 bg-white px-6 py-10 text-center sm:px-8">
        <p className="max-w-[820px] [font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[25px] font-semibold italic leading-[1.45] text-[#132151] sm:text-[32px] md:text-[38px]">
          The You Ready? Let&apos;s Grow! series includes books designed to challenge your thinking,
          strengthen your mindset, and help readers move toward personal and financial growth.
        </p>

        <div className="grid w-full max-w-[694px] grid-cols-1 gap-5 sm:grid-cols-2 md:gap-24">
          <a
            className="flex min-h-[47px] items-center justify-center bg-[#a4890b] px-4 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
            href="https://www.amazon.com/dp/B0GQZ2R814"
            rel="noreferrer noopener"
            target="_blank"
          >
            Mindset Before Millions
          </a>
          <a
            className="flex min-h-[47px] items-center justify-center bg-[#a4890b] px-4 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
            href="https://www.amazon.com/dp/B0GQZ6DYCH"
            rel="noreferrer noopener"
            target="_blank"
          >
            Millionaire Playbook
          </a>
        </div>
      </div>
    </section>
  );
}
