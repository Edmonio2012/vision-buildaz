import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function WixDreamsSection(): JSX.Element {
  return (
    <motion.section
      className="scroll-mt-0 overflow-hidden bg-white text-[#263652]"
      id="achieve-your-dreams"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex h-[112px] items-center justify-center bg-cover bg-center bg-no-repeat sm:h-[124px] lg:h-[133px]"
        style={{ backgroundImage: "url('/images/assets/subheader-bg.jpg')" }}
      >
        <h2 className="px-4 text-center [font-family:'Trirong',Georgia,serif] text-[30px] font-bold leading-none text-white drop-shadow-[0_3px_2px_rgba(23,32,52,0.38)] sm:text-[36px] lg:text-[39px]">
          Coaching and Consulting Services
        </h2>
      </div>

      <div
        className="coaching-copy-section px-6 py-10 sm:px-8 sm:py-12 lg:h-[431px] lg:px-0 lg:py-[39px]"
        style={{ height: "431px", paddingBottom: 0, paddingTop: "32px" }}
      >
        <div className="mx-auto w-full max-w-[966px]">
          <div
            className="coaching-copy max-w-[800px] [font-family:Arial,sans-serif] text-[21px] font-normal leading-[1.15] text-[#263652] sm:text-[24px] lg:ml-[44px] lg:text-[27px]"
            style={{ fontSize: "25px", letterSpacing: "-0.3px", lineHeight: "31px", marginLeft: "44px" }}
          >
            <div className="coaching-copy-paragraphs flex flex-col" style={{ gap: "30px" }}>
              <p>
                Vision Buildaz provides coaching and consulting support for
                <br />
                individuals, entrepreneurs, and personal brands that are ready to
                <br />
                grow with more clarity and structure. The goal is to help clients
                <br />
                strengthen their thinking, make wiser decisions, and move forward
                <br />
                with a plan that aligns with who they are and where they are headed.
              </p>

              <p>
                Whether the need is personal development, strategic guidance,
                <br />
                mentorship, or support through transition, the approach is practical,
                <br />
                direct, and growth-centered.
              </p>
            </div>

            <Link
              className="coaching-cta mt-[33px] inline-flex h-[56px] min-w-[236px] items-center justify-center rounded-[7px] bg-[#ffd154] px-6 [font-family:Georgia,serif] text-[14px] italic leading-none text-[#47370a] shadow-[0_8px_18px_rgba(0,0,0,0.1)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#1f295b] focus:ring-offset-2 lg:ml-[31px]"
              to="/contact"
              style={{ marginLeft: "31px", marginTop: "42px" }}
            >
              APPLY FOR COACHING&gt;&gt;
            </Link>
          </div>
        </div>
      </div>

      <div
        className="book-series-banner flex h-[124px] items-center bg-cover bg-center bg-no-repeat px-6 sm:h-[132px] sm:px-8 lg:h-[134px] lg:px-0"
        style={{
          backgroundImage: "url('/images/assets/subheader-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "134px"
        }}
      >
        <div
          className="book-series-banner-content mx-auto flex w-full max-w-[804px] flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-8"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginInline: "auto",
            maxWidth: "804px",
            width: "100%"
          }}
        >
          <h2 className="[font-family:'Trirong',Georgia,serif] text-center text-[29px] font-bold uppercase leading-none text-white sm:text-[34px] lg:text-[39px]">
            You Ready? Let&apos;s Grow!
          </h2>
          <a
            className="inline-flex h-[65px] w-[200px] items-center justify-center bg-black [clip-path:polygon(0_0,90%_0,100%_20%,100%_100%,0_100%)] [font-family:Arial,sans-serif] text-[20px] font-normal leading-none text-white transition hover:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d3a452]"
            href="#book-series"
            style={{
              backgroundColor: "#000",
              clipPath: "polygon(0 0, 90% 0, 100% 20%, 100% 100%, 0 100%)",
              display: "inline-flex",
              flexShrink: 0,
              height: "65px",
              width: "200px"
            }}
          >
            BOOK SERIES
          </a>
        </div>
      </div>

      <div
        className="px-6 py-9 sm:px-8 sm:py-10 lg:px-0 lg:py-[34px]"
        id="book-series"
        style={{ paddingTop: "27px" }}
      >
        <div className="mx-auto w-full max-w-[966px]">
          <div
            className="book-series-intro max-w-[800px] [font-family:Arial,sans-serif] text-[21px] font-normal leading-[1.35] text-[#263652] sm:text-[24px] lg:ml-[44px] lg:text-[27px]"
            style={{ marginLeft: "44px" }}
          >
            <p>
              Explore our library of recommended books as well as books authored by WD Brown. These resources provide
              in-depth guidance on everything from entrepreneurship and leadership to personal finance and
              self-development.
            </p>

            <p className="mt-8">
              Each book is designed to give you the tools you need to make informed decisions and take control of your
              future.
            </p>
          </div>
        </div>

        <div
          className="book-feature-grid mx-auto mt-16 grid w-full grid-cols-1 items-start gap-10 lg:mt-[77px]"
          style={{
            columnGap: "30px",
            gridTemplateColumns: "450px 404px",
            marginInline: "auto",
            marginTop: "77px",
            maxWidth: "884px"
          }}
        >
          <div
            className="book-feature-copy [font-family:Arial,sans-serif] text-[22px] font-normal leading-[1.35] text-[#263652] sm:text-[25px] lg:text-[27px]"
            style={{
              fontSize: "25px",
              letterSpacing: "-0.3px",
              lineHeight: "36.5px",
              paddingTop: "60px",
              width: "450px"
            }}
          >
            <div className="flex flex-col" style={{ gap: "32px" }}>
              <p>
                Wealth without alignment comes at
                <br />
                a cost few talk about.
              </p>

              <p>
                Mindset Before Millions challenges
                <br />
                the belief that financial success
                <br />
                requires sacrificing health,
                <br />
                relationships, and fulfillment. WD
                <br />
                Brown reframes wealth not as
                <br />
                endless accumulation, but as
                <br />
                purpose — a tool meant to support a
                <br />
                life of balance, meaning, and lasting
                <br />
                impact.
              </p>
            </div>

            <a
              className="book-order-cta mt-16 inline-flex h-[59px] w-[291px] items-center justify-center bg-black [clip-path:polygon(0_0,96%_0,100%_18%,100%_100%,4%_100%,0_82%)] [font-family:Arial,sans-serif] text-[20px] font-normal leading-none text-white transition hover:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-[#1f295b] focus:ring-offset-2 lg:ml-[70px]"
              href="https://www.amazon.com/Mindset-Before-Millions-READY-LETS/dp/B0GQZ2R814/ref=tmm_pap_swatch_0?_encoding=UTF8&sr=8-1"
              rel="noreferrer"
              style={{
                backgroundColor: "#000",
                clipPath: "polygon(0 0, 96% 0, 100% 18%, 100% 100%, 4% 100%, 0 82%)",
                display: "inline-flex",
                height: "59px",
                marginLeft: "70px",
                marginTop: "90px",
                width: "291px"
              }}
              target="_blank"
            >
              ORDER NOW &gt;&gt;
            </a>
          </div>

          <img
            alt="Mindset Before Millions book cover"
            className="book-cover h-auto w-full border-[5px] border-black object-cover"
            loading="lazy"
            src="/images/assets/mindset-before-millions-book.png"
            style={{ width: "404px" }}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[70px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/assets/subheader-bg.jpg')", height: "70px" }}
      />

      <div className="workbook-feature-section bg-white px-6 py-9 sm:px-8 sm:py-10 lg:px-0">
        <div
          className="workbook-feature-grid mx-auto grid w-full grid-cols-1 items-start gap-10 lg:mt-[35px]"
          style={{
            columnGap: "47px",
            gridTemplateColumns: "404px 450px",
            marginInline: "auto",
            marginTop: "35px",
            maxWidth: "966px"
          }}
        >
          <img
            alt="Mindset Before Millions workbook cover"
            className="book-cover h-auto w-full border-[5px] border-black object-cover"
            loading="lazy"
            src="/images/assets/mindset-before-millions-workbook.png"
            style={{ width: "404px" }}
          />

          <div
            className="workbook-feature-copy [font-family:Arial,sans-serif] text-[22px] font-normal leading-[1.35] text-[#263652] sm:text-[25px] lg:text-[27px]"
            style={{
              fontSize: "25px",
              letterSpacing: "-0.3px",
              lineHeight: "36.5px",
              paddingTop: "90px",
              width: "450px"
            }}
          >
            <p>
              Transformation doesn&apos;t happen just
              <br />
              by reading, it happens through
              <br />
              reflection.The Mindset Before
              <br />
              Millions Workbook is the practical
              <br />
              companion to the book, created to
              <br />
              help you apply its principles to your
              <br />
              own life. Through guided prompts
              <br />
              and dedicated journaling space, this
              <br />
              workbook invites you to examine
              <br />
              how your pursuit of success is
              <br />
              impacting your health, relationships,
              <br />
              boundaries, and sense of fulfillment.
            </p>

            <Link
              className="workbook-order-cta mt-16 inline-flex h-[59px] w-[291px] items-center justify-center bg-black [clip-path:polygon(0_0,96%_0,100%_18%,100%_100%,4%_100%,0_82%)] [font-family:Arial,sans-serif] text-[20px] font-normal leading-none text-white transition hover:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-[#1f295b] focus:ring-offset-2"
              style={{
                backgroundColor: "#000",
                clipPath: "polygon(0 0, 96% 0, 100% 18%, 100% 100%, 4% 100%, 0 82%)",
                display: "inline-flex",
                height: "59px",
                marginLeft: "16px",
                marginTop: "60px",
                width: "291px"
              }}
              to="/book-online"
            >
              ORDER NOW &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
