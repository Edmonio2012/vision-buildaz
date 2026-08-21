import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { Link } from "react-router-dom";

export function About(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="YOU READY? LET'S GROW!"
        imageAlt="WD Brown portrait"
        imageHeight={628}
        imageSrc="/images/assets/about-section1-founder.png"
        imageWidth={504}
        lead="Vision Buildaz is a personal development platform and movement built to help people move from pain to purpose, one breakthrough at a time."
        subtitle="Clarity. Purpose. Sustainable growth."
        title="About Vision Buildaz"
        aside={
          <>
            <div className="rounded-[32px] bg-[#1f295f] px-6 py-8 text-white shadow-[0_18px_50px_rgba(31,42,84,0.14)]">
              <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-[1.25] text-[#f1dda7]">
                &quot;We don&apos;t coach from a pedestal, we build beside you.&quot;
              </p>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/72">
                Vision Buildaz
              </p>
            </div>

            <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
                Next Step
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
                Ready to build with more structure, focus, and accountability? Start the
                conversation with Vision Buildaz.
              </p>
              <Link
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
                to="/contact"
              >
                Contact Vision Buildaz
              </Link>
            </div>
          </>
        }
      >
        <div className="space-y-6 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
          <p>
            Founded by award-winning entrepreneur, speaker, and mentor WD Brown, Vision Buildaz
            helps people unpack life&apos;s challenges, connect them to purpose, and build
            something that lasts.
          </p>

          <p>
            Whether you&apos;re an entrepreneur, career professional, creative, or dreamer with
            vision, the work begins with becoming whole enough to sustain what you build.
          </p>

          <p>
            The Vision Buildaz approach is practical and personal: real conversations, clear
            strategy, disciplined follow-through, and community-based support for people who are
            ready for their next chapter.
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
      </EditorialPage>
      <Copyright />
    </>
  );
}
