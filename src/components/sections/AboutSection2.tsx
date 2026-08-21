export function AboutSection2(): JSX.Element {
  return (
    <section className="bg-[#efefef] px-6 py-8 sm:px-8 md:py-10">
      <div className="mx-auto flex max-w-[880px] flex-col gap-4">
        <h3 className="[font-family:'Poppins',sans-serif] text-[28px] font-semibold leading-[1.1] text-black sm:text-[32px] md:text-[36px]">
          About Us
        </h3>
        <div className="flex flex-col gap-6 [font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.52] text-[#2f3c4f] sm:text-[19px] md:text-[20px]">
          <p>
            Vision Buildaz, LLC, is a personal development platform and movement designed to help
            people move from pain to purpose, one breakthrough at a time.
          </p>

          <p>
            Founded by award-winning entrepreneur, speaker, and mentor WD Brown, Vision Buildaz
            provides coaching, mentoring, and motivational tools for those who feel stuck,
            overlooked, or ready for their next chapter.
          </p>

          <p>
            Whether you&apos;re an entrepreneur, career professional, creative, or dreamer with
            vision, we help you unpack life&apos;s challenges, connect them to your purpose, and
            build something that lasts. We don&apos;t coach from a pedestal, we build beside you.
          </p>

          <p>
            From launching a dream to changing careers, buying a home to setting up a legacy, we
            walk with you through the real stuff. With structure, support, and a no-fluff approach,
            we equip you to move forward with confidence and clarity.
          </p>

          <p className="italic">
            &ldquo;We&apos;re not here to impress, we&apos;re here to impact. We don&apos;t just talk
            about success, we walk through the transformation with you.&rdquo;
            <br />- WD Brown, Founder &amp; CEO
          </p>
        </div>
      </div>
    </section>
  );
}
