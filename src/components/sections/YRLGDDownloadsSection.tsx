const DOWNLOAD_LINKS = [
  {
    href: "https://www.visionbuildaz.com/_files/ugd/7fb596_d512ec700c934afaa0ce990db9908df3.pdf",
    label: "YOU READY? LET’S GROW! — Newsletter (PDF)"
  },
  {
    href: "https://www.visionbuildaz.com/_files/ugd/7fb596_fde2627e8c2c4d4a814851baaf468153.pdf",
    label: "YOU READY? LET’S GROW! — eBook (PDF)"
  },
  {
    href: "https://www.visionbuildaz.com/_files/ugd/7fb596_579eff36d5f14f39b8983bc27168ef62.pdf",
    label: "YOU READY? LET’S GROW! — Article (PDF)"
  }
] as const;

export function YRLGDDownloadsSection(): JSX.Element {
  return (
    <section className="w-full bg-white">
      <div className="h-[160px] sm:h-[212px]" />

      <div className="bg-[#1f295f] px-6 py-10 text-center sm:px-8 md:py-12">
        <h2 className="[font-family:'Trirong',serif] text-[30px] font-bold italic leading-tight text-white sm:text-[38px] md:text-[42px]">
          Downloadable Audio + Video Resources
        </h2>
      </div>

      <div className="mx-auto flex max-w-[950px] flex-col items-center gap-8 px-6 py-6 text-center sm:px-8">
        <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[26px] font-semibold italic leading-[1.55] text-[#132151] sm:text-[34px] md:text-[39px]">
          These digital resources are offered to the public as part of the YOU READY? LET&apos;S
          GROW! series by Vision Buildaz. All items on this page are available for direct download
          to demonstrate active use in commerce.
        </p>

        <div className="flex w-full max-w-[548px] flex-col gap-3">
          {DOWNLOAD_LINKS.map(({ href, label }) => (
            <a
              className="flex min-h-[50px] items-center justify-center bg-[#a4890b] px-5 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
              href={href}
              key={label}
              rel="noreferrer noopener"
              target="_blank"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
