const paragraphs = [
  "From the inner city of New York to the forefront of purpose-driven leadership, WD Brown is an anomaly, a man who defied the odds and now lives to uplift others. A retired pastor, award-winning entrepreneur, coach, mentor, and speaker, Mr. Brown has spent decades meeting people at their point of pain and walking with them toward healing, clarity, and purpose.",
  "“We are not just talking transformation, we walk through it with you,” he says. Known for his authenticity and deep empathy, Mr. Brown is the founder of Vision Buildaz, a movement dedicated to helping people rise from discouragement and discover their divine calling. Through coaching, books, speaking, and weekly live broadcasts on YouTube and TikTok, he activates individuals to pursue the vision within them, even when life has knocked them down.",
  "His newest book, You Ready? Let’s Grow! Inspiring Sayings For Everyday Life is the first in a powerful series designed to help people push through pain and confusion into purpose and confidence. “This isn’t just a book,” he says. “It’s a push. A lifeline for those who know they’re called to more but don’t know how to get there.”",
  "Mr. Brown is co-founder and CEO of Livv Younique, LLC, a beauty and wellness platform promoting inner and outer health through targeted hair growth solutions, nutritious eating, and healthy lifestyle habits.",
  "He is also the co-founder and CEO of FIA NOW Employment Solutions, a nationwide staffing agency that brings purpose and people together in professional environments.",
  "His leadership expands into media through 11Thirty Entertainment, LLC, a firm managing Tony Award winners, and working on Emmy nominated productions.",
  "Since 2007, he has also been a strategic real estate investor, helping inner-city communities and helping build generational wealth.",
  "Mr. Brown’s faith remains central. As Chairman of Joshua and Caleb Ministries, Inc., he has led community outreach for over 20 years.",
  "Through it all, he remains grounded in one core value: humility. “I’m a practitioner,” he says. “Not an expert, Im still learning with you. We’re all growing together. Let’s leave ego and pride at the door.”",
  "You Ready? Let’s Grow!"
] as const;

export function WDBrownTextSection(): JSX.Element {
  return (
    <section className="w-full bg-white px-6 pb-14 pt-2 sm:px-8 md:pb-20">
      <div className="mx-auto flex w-full max-w-[904px] flex-col gap-10">
        <h1 className="[font-family:'Poppins',sans-serif] text-[24px] font-normal italic leading-[1.35] text-[#26323b] md:text-[26px]">
          Our Founder: WD Brown
        </h1>

        <div className="flex flex-col gap-10 [font-family:'Poppins',sans-serif] text-[23px] font-normal leading-[1.42] text-[#26323b] md:text-[26px]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph ===
              "His newest book, You Ready? Let’s Grow! Inspiring Sayings For Everyday Life is the first in a powerful series designed to help people push through pain and confusion into purpose and confidence. “This isn’t just a book,” he says. “It’s a push. A lifeline for those who know they’re called to more but don’t know how to get there.”" ? (
                <>
                  His newest book,{" "}
                  <em>You Ready? Let’s Grow! Inspiring Sayings For Everyday Life</em> is the first
                  in a powerful series designed to help people push through pain and confusion into
                  purpose and confidence. “This isn’t just a book,” he says. “It’s a push. A
                  lifeline for those who know they’re called to more but don’t know how to get
                  there.”
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
