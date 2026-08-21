import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { SocialMediaLinks } from "@/components/layout/SocialMediaLinks";
import { ContactSection } from "@/components/sections/ContactSection";
import { Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

export function Contact(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="LET'S STAY IN TOUCH"
        imageAlt="WD Brown portrait"
        imageHeight={628}
        imageSrc="/images/assets/about-section1-founder.png"
        imageWidth={504}
        lead="Tell us a little about what you're looking for, and we'll follow up soon. Whether you're interested in one-on-one coaching, workshops, or financial mentorship, we're here to help."
        title="Let's Start the Conversation"
        aside={
          <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
              Ready to book?
            </p>
            <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
              If you already know the support you need, choose a service and schedule directly.
            </p>
            <Link
              className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
              to="/book-online"
            >
              Book Online
            </Link>
          </div>
        }
      >
        <div className="max-w-[560px] rounded-[18px] border border-[#d7c8a0] bg-[#f6f2ea] px-5 py-4 shadow-[0_10px_28px_rgba(31,42,84,0.08)]">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f295f] text-[#f1dda7]">
              <Clock3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
                What to Expect
              </p>
              <p className="mt-1 text-[16px] font-medium leading-[1.55] text-[#1f2a54] sm:text-[17px]">
                We typically respond within 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      </EditorialPage>
      <ContactSection />
      <section className="bg-[#1f295f] px-6 pb-2 pt-8 text-center text-white sm:px-8">
        <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-none text-white sm:text-[32px]">
          Let&apos;s Stay in Touch
        </h2>
        <div className="mt-5">
          <SocialMediaLinks variant="footer" />
        </div>
      </section>
      <Copyright showSocial={false} />
    </>
  );
}
