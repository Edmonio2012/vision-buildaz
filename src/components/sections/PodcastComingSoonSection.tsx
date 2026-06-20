import { Link } from "react-router-dom";

const podcastImage = "/images/assets/podcast-coming-soon.png";

export function PodcastComingSoonSection(): JSX.Element {
  return (
    <section className="relative hidden overflow-hidden bg-white lg:block" style={{ height: "419px" }}>
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
    </section>
  );
}
