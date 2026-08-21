import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { Link } from "react-router-dom";

const pillars = ["Shift Your Mindset", "Clarify Your Purpose", "Build Your Next Step"] as const;

export function NewHome(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="VISION BUILDAZ"
        imageAlt="WD Brown"
        imageHeight={628}
        imageSrc="/images/assets/wdbrown-founder.png"
        imageWidth={504}
        lead="From mindset to momentum - let's build what you see."
        title="You Ready? Let's Grow!"
        aside={
          <>
            <div className="rounded-[32px] bg-[#1f295f] px-6 py-8 text-white shadow-[0_18px_50px_rgba(31,42,84,0.14)]">
              <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-[1.25] text-[#f1dda7]">
                Ready to move with clarity?
              </p>
              <Link
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#e1be14] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f295f] transition hover:-translate-y-0.5 hover:bg-[#f3dd78]"
                to="/contact"
              >
                Book a Consultation
              </Link>
            </div>

            <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
                Start Here
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
                Meet WD Brown and learn the belief behind the work.
              </p>
              <Link
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
                to="/wdbrown"
              >
                Meet WD Brown
              </Link>
            </div>
          </>
        }
      >
        <div className="space-y-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div className="rounded-[24px] border border-[#d7c8a0] bg-[#f6f2ea] p-5" key={pillar}>
                <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#8a7521]">
                  {pillar}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-8 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
            <section>
              <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-tight text-[#1f2a54]">
                What We Do
              </h2>
              <p className="mt-3">
                Vision Buildaz helps individuals, entrepreneurs, and emerging leaders move from
                uncertainty to action - through coaching, consulting, books, and transformational
                conversation.{" "}
                <Link className="font-bold text-[#8a7521] hover:text-[#1f295f]" to="/about">
                  Learn more about our approach →
                </Link>
              </p>
            </section>

            <section>
              <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-tight text-[#1f2a54]">
                Meet the Founder
              </h2>
              <p className="mt-3">
                Vision Buildaz is led by WD Brown, entrepreneur, mentor, and speaker behind
                &quot;You Ready? Let&apos;s Grow!&quot;® His work is grounded in one belief: before
                the millions, you have to become whole.{" "}
                <Link className="font-bold text-[#8a7521] hover:text-[#1f295f]" to="/wdbrown">
                  Meet WD Brown →
                </Link>
              </p>
            </section>

            <section>
              <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-tight text-[#1f2a54]">
                Coaching Services
              </h2>
              <p className="mt-3">
                Coaching and consulting for individuals, entrepreneurs, and personal brands ready
                to grow with more clarity and structure - practical, direct, and growth-centered.{" "}
                <Link className="font-bold text-[#8a7521] hover:text-[#1f295f]" to="/book-online">
                  Explore Coaching →
                </Link>
              </p>
            </section>

            <section>
              <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-tight text-[#1f2a54]">
                Books
              </h2>
              <p className="mt-3">
                Start with <span className="font-semibold italic">Mindset Before Millions</span> -
                the belief that true prosperity starts within.{" "}
                <Link className="font-bold text-[#8a7521] hover:text-[#1f295f]" to="/mindset">
                  Explore the Books →
                </Link>
              </p>
            </section>

            <section className="rounded-[24px] bg-[#1f295f] p-6 text-white">
              <h2 className="[font-family:'Trirong',serif] text-[26px] font-bold leading-tight">
                Are you ready to take the next step toward achieving your goals?
              </h2>
              <Link
                className="mt-5 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#e1be14] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f295f] transition hover:-translate-y-0.5 hover:bg-[#f3dd78]"
                to="/contact"
              >
                Contact Vision Buildaz →
              </Link>
            </section>
          </div>
        </div>
      </EditorialPage>
      <Copyright />
    </>
  );
}
