import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ContactSection } from "@/components/sections/ContactSection";
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

      <section className="relative isolate overflow-hidden bg-[#303a6d]">
        <div className="absolute inset-0 bg-[url('/images/assets/books-promo-bg.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-[#29366a]/80" />

        <div className="relative mx-auto grid min-h-[500px] w-full max-w-[1280px] grid-cols-1 items-end px-6 pt-12 sm:px-8 lg:h-[624px] lg:grid-cols-[1fr_620px] lg:px-0 lg:pt-0">
          <div className="z-10 flex flex-col items-center pb-12 text-center lg:items-start lg:pb-[151px] lg:pl-[110px] lg:text-left">
            <p className="[font-family:Arial,sans-serif] text-[35px] font-light uppercase leading-none tracking-[-0.04em] text-white sm:text-[44px] lg:text-[54px]">
              Tailored Mentorship
            </p>
            <h1 className="mt-3 [font-family:Arial,sans-serif] text-[54px] font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-[72px] lg:text-[88px]">
              &amp; Coaching
            </h1>
            <button
              className="mt-8 h-[55px] w-[322px] bg-[#a28908] [font-family:Arial,sans-serif] text-[17px] font-normal leading-none text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#303a6d]"
              type="button"
            >
              LEARN MORE &gt;&gt;
            </button>
          </div>

          <div className="z-10 flex justify-center lg:h-full lg:items-end lg:justify-start">
            <img
              alt="WD Brown"
              className="h-auto w-full max-w-[455px] object-contain object-bottom lg:max-w-[620px]"
              src="/images/assets/about-section1-founder.png"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 lg:px-0 lg:py-[100px]">
        <div className="mx-auto grid w-full max-w-[966px] grid-cols-1 items-center gap-12 lg:grid-cols-[490px_1fr] lg:gap-[99px]">
          <img
            alt="Podcast microphone"
            className="mx-auto aspect-square w-full max-w-[490px] rounded-full border-[4px] border-[#17235c] object-cover lg:-ml-[34px]"
            src="/images/assets/podcast-coming-soon.png"
          />

          <div className="flex flex-col items-center text-center lg:items-start lg:pt-[145px] lg:text-left">
            <p className="[font-family:Arial,sans-serif] text-[48px] font-light uppercase leading-none tracking-[-0.04em] text-[#b78709] sm:text-[58px] lg:text-[65px]">
              Tune In
            </p>
            <h2 className="mt-4 [font-family:Arial,sans-serif] text-[76px] font-bold uppercase leading-none tracking-[-0.06em] text-[#b78709] sm:text-[92px] lg:text-[104px]">
              Now!
            </h2>
            <div aria-hidden="true" className="mt-20 h-px w-full bg-[#d4d4d4]" />
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-[966px] [font-family:Arial,sans-serif] text-[25px] font-normal leading-[1.38] tracking-[-0.035em] text-[#263652] sm:text-[31px] lg:mt-[79px] lg:text-[37px]">
          <p>
            Tune in to the Vision Buildaz podcast, where W. D. Brown shares his insights on entrepreneurship, personal
            growth, and financial success.
          </p>
          <p className="mt-10 lg:mt-[48px]">
            Each episode features actionable advice and inspiring stories from successful entrepreneurs and thought
            leaders. Whether you&apos;re looking for motivation or practical tips, the podcast is a valuable resource for
            anyone on their journey to success.
          </p>
        </div>

        <div className="mx-auto mt-20 w-full max-w-[966px] lg:mt-[150px]">
          <h2 className="text-center [font-family:Arial,sans-serif] text-[28px] font-normal uppercase leading-none text-black sm:text-[33px] lg:text-[36px]">
            Vision Buildaz Services
          </h2>

          <div className="mt-16 border-t border-[#d7d7d7] lg:mt-[72px]">
            {services.map((service) => (
              <div className="flex min-h-[116px] items-center justify-between gap-6 border-b border-[#d7d7d7] py-5" key={service.slug}>
                <p className="[font-family:Arial,sans-serif] text-[22px] font-normal leading-none text-black sm:text-[25px] lg:text-[27px]">
                  {service.label}
                </p>
                <Link
                  className="inline-flex h-[44px] w-[166px] shrink-0 items-center justify-center bg-[#9d8b09] [font-family:Arial,sans-serif] text-[17px] font-normal leading-none text-black transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#9d8b09] focus:ring-offset-2"
                  to={`/booking-calendar/${service.slug}?referral=service_list_widget`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Copyright />
    </>
  );
}
