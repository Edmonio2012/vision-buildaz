import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ContactSection } from "@/components/sections/ContactSection";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { Link } from "react-router-dom";

const services = [
  { label: "ONE ON ONE CONSULTATION", slug: "one-on-one-consultation-1" },
  { label: "STRATEGIC PLANNING", slug: "strategic-planning" },
  { label: "ENTREPRENEURIAL COACHING", slug: "entrepreneurial-coaching" },
  { label: "FINANCIAL COACHING", slug: "financial-coaching" }
] as const;

export function BookOnline(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="TAILORED MENTORSHIP"
        imageAlt="WD Brown"
        imageHeight={628}
        imageSrc="/images/assets/about-section1-founder.png"
        imageWidth={504}
        lead="Choose the kind of support that fits your current season, then schedule a focused session with Vision Buildaz."
        subtitle="Consultation. Strategy. Coaching."
        title="Book Online"
        aside={
          <div className="rounded-[32px] bg-[#1f295f] px-6 py-8 text-white shadow-[0_18px_50px_rgba(31,42,84,0.14)]">
            <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-[1.25] text-[#f1dda7]">
              Build with structure, support, and practical next steps.
            </p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/72">
              Vision Buildaz Services
            </p>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="space-y-5 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
            <p>
              Each service is designed for real-life decisions, next-step clarity, and grounded
              accountability. Pick the path that matches what you need right now.
            </p>
          </div>

          <div className="divide-y divide-[#d7d7d7] border-y border-[#d7d7d7]">
            {services.map((service) => (
              <div
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                key={service.slug}
              >
                <p className="text-[18px] font-semibold uppercase leading-[1.2] text-[#1f2a54] sm:text-[20px]">
                  {service.label}
                </p>
                <Link
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#9d8b09] px-6 text-[13px] font-bold uppercase tracking-[0.1em] text-black transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
                  to={`/booking-calendar/${service.slug}?referral=service_list_widget`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </EditorialPage>

      <ContactSection />
      <Copyright />
    </>
  );
}
