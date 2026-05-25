export function AboutSection2(): JSX.Element {
  return (
    <section className="bg-[#efefef] px-6 py-8 sm:px-8 md:py-10">
      <div className="mx-auto max-w-[940px]">
        <h3 className="[font-family:'Poppins',sans-serif] text-[34px] font-semibold leading-[1.1] text-black sm:text-[38px] md:text-[40px]">
          About Us
        </h3>
        <div className="mt-4 space-y-7 [font-family:'Poppins',sans-serif] text-[22px] font-normal leading-[1.42] text-[#2f3c4f] sm:text-[23px] md:text-[24px]">
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

          <div>
            <p className="font-semibold text-black">Services</p>
            <p className="mt-1">
              At Vision Buildaz, we offer real-life strategies and community-based support through:
            </p>
            <ul className="mt-3 list-disc pl-8">
              <li>1:1 and group coaching</li>
              <li>Motivational speaking and interactive workshops</li>
              <li>Books and digital resources</li>
              <li>Community-building events and strategic partnerships</li>
            </ul>
          </div>

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
