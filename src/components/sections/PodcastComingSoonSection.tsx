import { Link } from "react-router-dom";

const podcastImage = "/images/assets/podcast-coming-soon.png";

export function PodcastComingSoonSection(): JSX.Element {
  return (
    <section className="overflow-hidden bg-white">
      <div className="relative hidden lg:block" style={{ height: "419px" }}>
        <div
          aria-hidden="true"
          className="absolute right-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/assets/subheader-bg.jpg')",
            height: "164px",
            left: "calc(50% - 218px)",
            top: "102px"
          }}
        />

        <div
          aria-hidden="true"
          className="absolute overflow-hidden rounded-full bg-[#d4d4d4] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${podcastImage}'), radial-gradient(circle at 48% 38%, #e9e9e9, #777 100%)`,
            height: "304px",
            left: "calc(50% - 484px)",
            top: "56px",
            width: "304px"
          }}
        />

        <Link
          aria-label="Podcast coming soon"
          className="absolute flex flex-col text-[#17235c] transition hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#17235c] focus:ring-offset-4"
          style={{ left: "calc(50% - 121px)", top: "143px" }}
          to="/youreadyletsgrowdigital"
        >
          <span className="[font-family:Arial,sans-serif] text-[39px] font-light leading-none tracking-[-0.035em]">
            You Ready? Let&apos;s Grow!
          </span>
          <span className="mt-3 [font-family:Arial,sans-serif] text-[42px] font-bold leading-none tracking-[-0.045em]">
            PODCAST COMING SOON &gt;&gt;
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-6 px-6 py-12 text-center lg:hidden">
        <div
          aria-hidden="true"
          className="rounded-full bg-[#d4d4d4] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${podcastImage}'), radial-gradient(circle at 48% 38%, #e9e9e9, #777 100%)`,
            height: "min(72vw, 304px)",
            width: "min(72vw, 304px)"
          }}
        />
        <Link
          className="flex w-full max-w-[560px] flex-col items-center bg-[url('/images/assets/subheader-bg.jpg')] bg-cover bg-center px-5 py-8 text-[#17235c] transition hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#17235c] focus:ring-offset-4"
          to="/youreadyletsgrowdigital"
        >
          <span className="[font-family:Arial,sans-serif] text-[clamp(1.75rem,8vw,2.4rem)] font-light leading-none">
            You Ready? Let&apos;s Grow!
          </span>
          <span className="mt-3 [font-family:Arial,sans-serif] text-[clamp(1.9rem,8vw,2.6rem)] font-bold leading-none">
            PODCAST COMING SOON &gt;&gt;
          </span>
        </Link>
      </div>
    </section>
  );
}
