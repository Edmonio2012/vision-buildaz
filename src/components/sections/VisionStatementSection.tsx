// Text-only vision statement section shown under the books alert block.
// Kept intentionally minimal to match the reference.
export function VisionStatementSection(): JSX.Element {
  return (
    <section className="w-full bg-[#efefef] px-6 py-10 sm:px-10 sm:py-14 md:py-16">
      <div className="mx-auto w-full text-center md:w-[92%] lg:w-[960px]">
        <p className="[font-family:'Poppins',sans-serif] text-[16px] font-normal leading-[1.5] text-[#263652] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[21px]">
          <span className="italic">
            Vision Buildaz /You Ready? Let&apos;s Grow<sup className="text-[0.48em] leading-none">™</sup>/
          </span>{" "}
          is a coaching &amp; mentoring platform that breathes life into dreams and helps you to realize your vision. Led
          by Founder WD Brown, members receive guidance in realizing purpose and fulfilling destiny.
        </p>
        <p className="mt-8 [font-family:'Poppins',sans-serif] text-[16px] font-normal leading-[1.5] text-[#263652] sm:mt-12 sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[21px]">
          Vision Buildaz is more than a business — it is a movement. Rooted in WD&apos;s belief that every person carries
          a vision worth pursuing, Vision Buildaz exists to help individuals rise from discouragement, push past
          confusion, and step into their purpose with courage and clarity that leads to wholeness.
        </p>
      </div>
    </section>
  );
}
