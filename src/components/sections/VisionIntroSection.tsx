// Text-only intro section that presents mission copy directly beneath the books promo area.
export function VisionIntroSection(): JSX.Element {
  return (
    <section className="bg-[#fbfaf7] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[820px] text-center text-[#0b1220]">
        <p className="mx-auto max-w-[780px] text-[16px] leading-[1.8] tracking-normal sm:text-[18px]">
          <span className="italic">Vision Buildaz /You Ready? Let&apos;s Grow&trade;/</span> is a coaching &amp; mentoring
          platform that breathes life into dreams and helps you to realize your vision. Led by Founder WD Brown,
          members receive guidance in realizing purpose and fulfilling destiny.
        </p>

        <p className="mx-auto mt-8 max-w-[780px] text-[16px] leading-[1.8] tracking-normal sm:mt-10 sm:text-[18px]">
          Vision Buildaz is more than a business &mdash; it is a movement. Rooted in WD&apos;s belief that every person
          carries a vision worth pursuing, Vision Buildaz exists to help individuals rise from discouragement, push past
          confusion, and step into their purpose with courage and clarity that leads to wholeness.
        </p>
      </div>
    </section>
  );
}
