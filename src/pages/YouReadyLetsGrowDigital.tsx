import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { Link } from "react-router-dom";

export function YouReadyLetsGrowDigital(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="THE MOVEMENT"
        imageAlt="Mindset Before Millions book and workbook"
        imageHeight={720}
        imageSrc="/images/assets/mindset-before-millions-book.png"
        imageWidth={720}
        lead="Vision Buildaz is more than a business - it's a movement."
        title="You Ready? Let's Grow!"
        aside={
          <>
            <div className="rounded-[32px] bg-[#1f295f] px-6 py-8 text-white shadow-[0_18px_50px_rgba(31,42,84,0.14)]">
              <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-[1.25] text-[#f1dda7]">
                Ready to put this into practice?
              </p>
              <Link
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#e1be14] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f295f] transition hover:-translate-y-0.5 hover:bg-[#f3dd78]"
                to="/book-online"
              >
                Start Coaching →
              </Link>
            </div>

            <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
                Featured Resource
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
                Start with the book and companion workbook, then bring the reflection into action.
              </p>
              <Link
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
                to="/mindset"
              >
                Get the Book →
              </Link>
            </div>
          </>
        }
      >
        <div className="space-y-8 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
          <section>
            <h2 className="[font-family:'Trirong',serif] text-[30px] font-bold leading-tight text-[#1f2a54]">
              The Movement
            </h2>
            <p className="mt-3">
              Vision Buildaz is more than a business - it&apos;s a movement. Led by founder WD
              Brown, it exists to help people rise from discouragement, push past confusion, and
              step into their purpose with the courage and clarity that leads to wholeness.
            </p>
          </section>

          <section>
            <h2 className="[font-family:'Trirong',serif] text-[30px] font-bold leading-tight text-[#1f2a54]">
              The Growth Path
            </h2>
            <p className="mt-3">
              Growth here isn&apos;t about hustle for its own sake. It starts on the inside - with
              mindset and clarity - before it ever shows up in your results. That&apos;s the shift
              this movement is built around.
            </p>
          </section>

          <section>
            <h2 className="[font-family:'Trirong',serif] text-[30px] font-bold leading-tight text-[#1f2a54]">
              Featured Book - Mindset Before Millions
            </h2>
            <p className="mt-3">
              Wealth without alignment comes at a cost few talk about. This book challenges the
              idea that financial success requires sacrificing health, relationships, and
              fulfillment - reframing wealth as purpose: a tool meant to support a life of balance,
              meaning, and lasting impact.
            </p>
          </section>

          <section>
            <h2 className="[font-family:'Trirong',serif] text-[30px] font-bold leading-tight text-[#1f2a54]">
              Companion Resource - The Workbook
            </h2>
            <p className="mt-3">
              Transformation doesn&apos;t happen just by reading, it happens through reflection. The
              workbook helps you examine how your pursuit of success is impacting your health,
              relationships, boundaries, and sense of fulfillment, through guided prompts and
              journaling.
            </p>
          </section>
        </div>
      </EditorialPage>
      <Copyright />
    </>
  );
}
