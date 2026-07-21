import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CirclePlay,
  Compass,
  Heart,
  Lightbulb,
  Quote,
  RefreshCw,
  Sparkles,
  Target,
  Users,
  Youtube,
  type LucideIcon
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { Copyright } from "@/components/layout/Copyright";
import { SpeakerBookingForm } from "@/components/speaker/SpeakerBookingForm";
import { SpeakerHeader } from "@/components/speaker/SpeakerHeader";

const authorityPoints = [
  { value: "30+", label: "Years mentoring others" },
  { value: "2", label: "Companies helped build" },
  { value: "7-figure", label: "Staffing company experience" },
  { value: "Real estate", label: "Wealth-building experience" },
  { value: "Author", label: "Mindset Before Millions" },
  { value: "300K+", label: "Views on one message" }
] as const;

const storyMilestones = [
  "Raised in inner-city New York",
  "Left high school and earned his GED on the third attempt",
  "Helped build businesses and created wealth through real estate",
  "Saw the personal cost of success without the right foundation",
  "Built Vision Buildaz to help others avoid the potholes"
] as const;

const philosophyPillars = [
  {
    title: "Mindset",
    question: "Can your thinking support where you are trying to go?",
    icon: Lightbulb
  },
  {
    title: "Heart",
    question: "Are ambition and purpose working together?",
    icon: Heart
  },
  {
    title: "Focus",
    question: "Can you recognize what deserves your attention?",
    icon: Target
  },
  {
    title: "Wholeness",
    question: "Can you sustain success without destroying what matters?",
    icon: Compass
  }
] as const;

interface Topic {
  title: string;
  promise: string;
  idealFor: string;
  outcomes: readonly string[];
  formats: readonly string[];
  icon: LucideIcon;
}

const topics: Topic[] = [
  {
    title: "Mindset Before Millions",
    promise: "Build the person who can sustain the success.",
    idealFor: "Entrepreneurs, emerging leaders, and ambitious teams",
    outcomes: [
      "Recognize when ambition is operating without alignment",
      "Strengthen the mindset and personal foundation required for growth",
      "Redefine success beyond money, status, and external achievement"
    ],
    formats: ["Keynote", "Workshop", "Fireside conversation"],
    icon: Sparkles
  },
  {
    title: "Get There Whole",
    promise: "Reach your destination without losing yourself along the way.",
    idealFor: "Founders, leaders, high-performing teams, and community organizations",
    outcomes: [
      "Identify the hidden personal costs of unmanaged success",
      "Protect health, relationships, identity, peace, faith, and purpose",
      "Build a healthier and more complete definition of prosperity"
    ],
    formats: ["Keynote", "Executive retreat", "Community event"],
    icon: Heart
  },
  {
    title: "The Focus Filter",
    promise: "Cut through distractions and build with intention.",
    idealFor: "Leadership programs, executive teams, entrepreneurs, and professionals",
    outcomes: [
      "Separate meaningful opportunities from distractions",
      "Make clearer decisions about priorities, relationships, and opportunities",
      "Focus energy on what matters most in the current season"
    ],
    formats: ["Workshop", "Keynote", "Leadership session"],
    icon: Target
  },
  {
    title: "Built for the Next Chapter",
    promise: "Use experience, humility, and adaptability to keep growing.",
    idealFor: "People in transition, multigenerational leaders, and changing organizations",
    outcomes: [
      "Approach change without minimizing previous accomplishments",
      "Translate hard-earned wisdom into new opportunities and platforms",
      "Replace fear of starting again with confidence built from experience"
    ],
    formats: ["Keynote", "Panel", "Fireside conversation"],
    icon: RefreshCw
  }
];

const audiencePathways = [
  {
    title: "Entrepreneurs",
    copy: "Build without losing the reason you started.",
    icon: BriefcaseBusiness
  },
  {
    title: "Leaders",
    copy: "Develop the person, not only the performance.",
    icon: Users
  },
  {
    title: "Emerging professionals",
    copy: "Learn from experience before making avoidable mistakes.",
    icon: Sparkles
  },
  {
    title: "People starting again",
    copy: "Your next chapter does not erase what you already know.",
    icon: RefreshCw
  }
] as const;

export function WDBrown(): JSX.Element {
  const [openTopic, setOpenTopic] = useState(0);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "WD Brown | Speaker, Author & Mentor | Vision Buildaz";
    if (description) {
      description.content =
        "Book WD Brown for keynotes, workshops, and conversations that help people pursue success without losing themselves in the process.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#f7f4ed] text-[#0b1930]">
      <SpeakerHeader />

      <main>
        <section className="relative isolate overflow-hidden bg-[#071426] text-white">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_28%,rgba(218,170,78,0.24),transparent_29%),radial-gradient(circle_at_4%_12%,rgba(70,109,160,0.25),transparent_30%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="mx-auto grid min-h-[720px] w-full max-w-[1240px] items-center gap-10 px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4 lg:pb-0 lg:pt-10">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 max-w-[730px]"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#e3bd66] sm:text-[12px]">
                WD Brown | Entrepreneur | Author | Mentor | Speaker
              </p>
              <h1 className="max-w-[720px] [font-family:'Trirong',serif] text-[clamp(2.65rem,7vw,5.35rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
                You can reach the destination and still{" "}
                <span className="text-[#e3bd66]">lose yourself</span> along the way.
              </h1>
              <p className="mt-7 max-w-[670px] text-[16px] leading-[1.75] text-white/72 sm:text-[18px]">
                WD Brown helps entrepreneurs, leaders, and people navigating change build the
                mindset, clarity, and inner foundation to pursue success without sacrificing what
                matters most.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#d9a94f] px-7 text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#071426] shadow-[0_16px_36px_rgba(217,169,79,0.24)] transition hover:-translate-y-0.5 hover:bg-[#efca79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2d58f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426]"
                  href="#booking"
                >
                  Book WD to Speak
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/22 bg-white/[0.04] px-7 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:border-[#e3bd66]/70 hover:bg-white/[0.08] hover:text-[#efca79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2d58f]"
                  href="#watch"
                >
                  <CirclePlay aria-hidden="true" className="h-5 w-5" />
                  Watch WD Speak
                </a>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-[#d9a94f]" />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/62 sm:text-[13px]">
                    Helping people reach their destination whole.
                  </p>
                  <p className="mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#e3bd66]">
                    You Ready? Let’s Grow!®
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto h-[470px] w-full max-w-[480px] self-end lg:h-[650px] lg:max-w-[520px]"
              initial={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute bottom-[9%] right-[3%] h-[70%] w-[70%] rounded-full border border-[#e3bd66]/25 bg-[radial-gradient(circle_at_50%_40%,rgba(227,189,102,0.2),transparent_67%)]" />
              <div className="absolute bottom-[6%] right-[-1%] h-[78%] w-[78%] rounded-full border border-white/10" />
              <img
                alt="WD Brown, entrepreneur, author, mentor, and speaker"
                className="absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom drop-shadow-[0_28px_36px_rgba(0,0,0,0.35)]"
                decoding="async"
                fetchPriority="high"
                height={628}
                src="/images/assets/wdbrown-founder.png"
                width={504}
              />

              <div className="absolute bottom-5 left-0 rounded-2xl border border-white/15 bg-[#0d213d]/90 px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur sm:bottom-10 sm:left-2">
                <p className="text-[26px] font-extrabold leading-none text-[#e3bd66]">30+</p>
                <p className="mt-1 max-w-[125px] text-[10px] font-bold uppercase leading-[1.45] tracking-[0.11em] text-white/70">
                  Years walking alongside people
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-label="Speaker credentials" className="border-b border-[#ded8cc] bg-white">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 px-5 sm:px-8 md:grid-cols-3 xl:grid-cols-6">
            {authorityPoints.map((point, index) => (
              <div
                className={`flex min-h-[126px] flex-col justify-center border-[#e7e1d6] px-3 py-6 text-center sm:px-5 ${
                  index % 2 === 0 ? "border-r" : ""
                } md:border-r md:[&:nth-child(3)]:border-r-0 xl:[&:nth-child(3)]:border-r xl:[&:last-child]:border-r-0`}
                key={point.label}
              >
                <p className="text-[18px] font-extrabold leading-tight text-[#0c203c]">
                  {point.value}
                </p>
                <p className="mt-1.5 text-[10px] font-bold uppercase leading-[1.45] tracking-[0.09em] text-[#737a85]">
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-20 bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:py-28" id="watch">
          <div className="mx-auto grid w-full max-w-[1160px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Experience WD</SectionLabel>
              <h2 className="mt-5 max-w-[520px] [font-family:'Trirong',serif] text-[clamp(2rem,5vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#0b1930]">
                Wisdom for the journey, not just motivation for the moment.
              </h2>
              <p className="mt-6 max-w-[510px] text-[16px] leading-[1.75] text-[#596372]">
                WD brings lived experience, practical teaching, warmth, and a willingness to meet
                the real question in the room. His goal is not a temporary high. It is clarity
                people can carry with them.
              </p>
              <a
                className="group mt-8 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.11em] text-[#9b6d1f] transition hover:text-[#714b0d]"
                href="https://www.youtube.com/@visionbuildaz"
                rel="noreferrer noopener"
                target="_blank"
              >
                Explore conversations on YouTube
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                aria-label="Watch WD Brown on the Vision Buildaz YouTube channel"
                className="group relative block aspect-[16/10] overflow-hidden rounded-[32px] bg-[#0b1d36] shadow-[0_28px_70px_rgba(7,20,38,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6973d] focus-visible:ring-offset-4"
                href="https://www.youtube.com/@visionbuildaz"
                rel="noreferrer noopener"
                target="_blank"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_38%,rgba(218,170,78,.3),transparent_34%),linear-gradient(135deg,#08172c,#102d50)]" />
                <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:48px_48px]" />
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-[4%] right-[4%] h-[96%] w-auto object-contain opacity-90 transition duration-700 group-hover:scale-[1.025]"
                  loading="lazy"
                  src="/images/assets/about-section1-founder.png"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/95 via-[#071426]/50 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-between p-7 sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d9a94f] text-[#071426] shadow-[0_14px_32px_rgba(0,0,0,0.26)] transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                    <Youtube aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#e3bd66]">
                      Vision Buildaz
                    </p>
                    <p className="mt-2 max-w-[270px] [font-family:'Trirong',serif] text-[clamp(1.25rem,3.7vw,2.2rem)] font-bold leading-[1.08] text-white">
                      Hear WD teach, listen, and connect.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        <section className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 lg:py-28" id="story">
          <div className="mx-auto grid w-full max-w-[1160px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
            <Reveal className="relative mx-auto w-full max-w-[470px]">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[32px] border border-[#d9a94f]/45" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#d9e0e7] shadow-[0_24px_60px_rgba(7,20,38,0.16)]">
                <img
                  alt="WD Brown"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  src="/images/assets/books-promo-founder.png"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071426]/90 to-transparent px-7 pb-7 pt-24 text-white">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#e3bd66]">
                    The through line
                  </p>
                  <p className="mt-2 [font-family:'Trirong',serif] text-[25px] font-bold leading-[1.12]">
                    Failure. Rebuilding. Wisdom earned.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <SectionLabel>Why this message belongs to him</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[#0b1930]">
                The message was earned.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.78] text-[#586372] sm:text-[17px]">
                WD’s path—from leaving high school and earning his GED on the third attempt to
                building companies and creating wealth through real estate—was never linear. Along
                the way, he saw talented people gain wealth and influence while losing their health,
                relationships, peace, and purpose.
              </p>
              <p className="mt-4 text-[16px] leading-[1.78] text-[#586372] sm:text-[17px]">
                That is why he helps others build success they are whole enough to sustain.
              </p>

              <ol className="mt-8 grid gap-3">
                {storyMilestones.map((milestone, index) => (
                  <li className="flex items-start gap-3" key={milestone}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2e4c4] text-[10px] font-extrabold text-[#91631c]">
                      {index + 1}
                    </span>
                    <span className="text-[14px] font-semibold leading-relaxed text-[#334155]">
                      {milestone}
                    </span>
                  </li>
                ))}
              </ol>

              <details className="group mt-9 border-t border-[#ded8cc] pt-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12px] font-extrabold uppercase tracking-[0.11em] text-[#8f631d] [&::-webkit-details-marker]:hidden">
                  Read WD’s story
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="mt-6 grid gap-4 text-[15px] leading-[1.75] text-[#596372]">
                  <p>
                    Raised in the inner city of New York, WD Brown has faced failure, started over,
                    and learned firsthand what it takes to rebuild financially, mentally,
                    emotionally, and spiritually. He dropped out of high school, passed his GED on
                    his third attempt, and had to develop discipline and perspective long before he
                    saw results.
                  </p>
                  <p>
                    Over the course of his career, WD helped build two companies, including a
                    staffing company that reached seven figures, and created wealth through real
                    estate. Some of his most important lessons came from watching talented people
                    achieve wealth, status, and influence while losing themselves in the process.
                  </p>
                  <p>
                    As founder of Vision Buildaz, LLC, WD now teaches the Focus Filter and the
                    Mindset Before Millions message. For more than 30 years, he has mentored people
                    searching for direction, rebuilding after setbacks, pursuing growth, or feeling
                    out of alignment despite outward success.
                  </p>
                  <p>
                    He does not present himself as someone who has finished growing: “I’m not an
                    expert. I’m a practitioner. I’m growing with you.”
                  </p>
                </div>
              </details>
            </Reveal>
          </div>
        </section>

        <section
          className="relative scroll-mt-20 overflow-hidden bg-[#0a1a32] px-5 py-20 text-white sm:px-8 lg:py-28"
          id="message"
        >
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.5)_1px,transparent_1.5px)] [background-size:30px_30px]" />
          <div className="relative mx-auto w-full max-w-[1160px]">
            <Reveal className="mx-auto max-w-[880px] text-center">
              <SectionLabel light>The core philosophy</SectionLabel>
              <p className="mt-6 [font-family:'Trirong',serif] text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[1.04] tracking-[-0.04em] text-white">
                “Before the millions, you have to become{" "}
                <span className="text-[#e3bd66]">whole.</span>”
              </p>
              <p className="mx-auto mt-6 max-w-[690px] text-[16px] leading-[1.75] text-white/66">
                Sustainable success asks better questions—not only about what you want, but about
                who you are becoming while you pursue it.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {philosophyPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal delay={index * 0.06} key={pillar.title}>
                    <article className="h-full rounded-[26px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d9a94f]/45 hover:bg-white/[0.08]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d9a94f]/15 text-[#e3bd66]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 text-[19px] font-extrabold text-white">{pillar.title}</h3>
                      <p className="mt-3 text-[14px] leading-[1.7] text-white/62">
                        {pillar.question}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="scroll-mt-20 bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:py-28" id="topics">
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <SectionLabel>Signature speaking topics</SectionLabel>
                <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.85rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[#0b1930]">
                  Messages people can use.
                </h2>
              </div>
              <p className="max-w-[580px] text-[16px] leading-[1.75] text-[#596372] lg:justify-self-end">
                Each experience is shaped for the audience and grounded in practical reflection,
                real-world wisdom, and clear next steps.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                const isOpen = openTopic === index;
                const panelId = `speaker-topic-panel-${index}`;

                return (
                  <Reveal delay={index * 0.04} key={topic.title}>
                    <article
                      className={`overflow-hidden rounded-[26px] border bg-white transition duration-300 ${
                        isOpen
                          ? "border-[#d5b46d] shadow-[0_22px_50px_rgba(7,20,38,0.1)]"
                          : "border-[#ded8cc] hover:border-[#cdb878]"
                      }`}
                    >
                      <button
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                        onClick={() => setOpenTopic(isOpen ? -1 : index)}
                        type="button"
                      >
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                            isOpen ? "bg-[#0a1a32] text-[#e3bd66]" : "bg-[#eee8dc] text-[#8b641f]"
                          }`}
                        >
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[18px] font-extrabold leading-tight text-[#0b1930] sm:text-[21px]">
                            {topic.title}
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-[#6b7280] sm:text-[14px]">
                            {topic.promise}
                          </span>
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-5 w-5 shrink-0 text-[#9b6d1f] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            animate={{ height: "auto", opacity: 1 }}
                            className="overflow-hidden"
                            exit={{ height: 0, opacity: 0 }}
                            id={panelId}
                            initial={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="grid gap-8 border-t border-[#eee9df] px-5 pb-7 pt-6 sm:px-7 lg:grid-cols-[0.7fr_1.3fr]">
                              <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#98691d]">
                                  Ideal audience
                                </p>
                                <p className="mt-2 text-[14px] font-semibold leading-[1.65] text-[#364152]">
                                  {topic.idealFor}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {topic.formats.map((format) => (
                                    <span
                                      className="rounded-full border border-[#ddd3c1] bg-[#faf8f3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#526070]"
                                      key={format}
                                    >
                                      {format}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#98691d]">
                                  Audience outcomes
                                </p>
                                <ul className="mt-3 grid gap-3">
                                  {topic.outcomes.map((outcome) => (
                                    <li
                                      className="flex items-start gap-3 text-[14px] leading-[1.65] text-[#4c5765]"
                                      key={outcome}
                                    >
                                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0e2c2] text-[#8b611a]">
                                        <Check
                                          aria-hidden="true"
                                          className="h-3 w-3"
                                          strokeWidth={3}
                                        />
                                      </span>
                                      {outcome}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-5 rounded-[24px] border border-dashed border-[#cdb878] bg-[#f1e9da] px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#94651b]">
                  Also available
                </p>
                <p className="mt-1 text-[18px] font-extrabold text-[#0b1930]">Harvest Time</p>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5e6672] sm:mt-0 sm:text-right">
                Now you’re ready—go out and reap what you have sown.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex justify-center">
              <a
                className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#0a1a32] px-7 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(7,20,38,0.16)] transition hover:-translate-y-0.5 hover:bg-[#16335a]"
                href="#booking"
              >
                Book WD to Speak
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1160px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <SectionLabel>Why WD connects</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[#0b1930]">
                He listens before he speaks.
              </h2>
              <p className="mt-6 max-w-[610px] text-[16px] leading-[1.78] text-[#596372] sm:text-[17px]">
                WD listens for what is being said beneath the surface, then brings honest, practical
                clarity to the heart of the issue. He shares the failures, lessons, and hard-earned
                wisdom behind his success so people can avoid unnecessary potholes.
              </p>

              <blockquote className="relative mt-9 rounded-[26px] bg-[#f4efe4] px-7 pb-7 pt-10 sm:px-9 sm:pb-9">
                <Quote
                  aria-hidden="true"
                  className="absolute left-7 top-6 h-7 w-7 text-[#c6973d]/65"
                />
                <p className="relative [font-family:'Trirong',serif] text-[22px] font-bold leading-[1.45] text-[#17253c] sm:text-[25px]">
                  “He knows how to find the heart of a person and answer in a way that makes you
                  see.”
                </p>
              </blockquote>
            </Reveal>

            <Reveal className="relative mx-auto w-full max-w-[440px]" delay={0.08}>
              <div className="absolute -right-5 -top-5 h-full w-full rounded-[32px] bg-[#d9a94f]/18" />
              <div className="relative overflow-hidden rounded-[32px] bg-[#0a1a32] pt-10 shadow-[0_24px_60px_rgba(7,20,38,0.16)]">
                <img
                  alt="WD Brown in conversation"
                  className="mx-auto w-[92%] object-contain object-bottom"
                  loading="lazy"
                  src="/images/assets/yrlgd-hero-founder.png"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071426] via-[#071426]/75 to-transparent px-7 pb-7 pt-24">
                  <p className="text-[13px] font-bold leading-relaxed text-white/78">
                    Listening · Discernment · Vulnerability · Real-time clarity
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-20 w-full max-w-[1160px] border-t border-[#e2ddd4] pt-16">
            <Reveal className="max-w-[640px]">
              <SectionLabel>Audience pathways</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2rem,4.5vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1930]">
                A message that meets people where they are.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {audiencePathways.map((pathway, index) => {
                const Icon = pathway.icon;
                return (
                  <Reveal delay={index * 0.05} key={pathway.title}>
                    <article className="h-full rounded-[24px] border border-[#e3ded4] bg-[#faf8f3] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#cdb878] hover:shadow-[0_16px_34px_rgba(7,20,38,0.08)]">
                      <Icon aria-hidden="true" className="h-6 w-6 text-[#a17121]" />
                      <h3 className="mt-6 text-[17px] font-extrabold leading-tight text-[#0b1930]">
                        {pathway.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.7] text-[#626b77]">
                        {pathway.copy}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-8 text-center">
              <p className="mx-auto max-w-[880px] text-[13px] leading-[1.75] text-[#747b84]">
                Also serving business owners, corporate and nonprofit leaders, leadership programs,
                faith-centered and community organizations, and multigenerational business
                communities.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e9e1d1] px-5 py-20 sm:px-8 lg:py-28">
          <div className="absolute -right-36 -top-36 h-[430px] w-[430px] rounded-full border border-[#c6973d]/25" />
          <div className="absolute -right-20 -top-20 h-[310px] w-[310px] rounded-full border border-[#c6973d]/25" />
          <div className="relative mx-auto grid w-full max-w-[1160px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal className="relative mx-auto w-full max-w-[390px]">
              <div className="absolute left-[12%] top-[9%] h-[82%] w-[76%] rounded-full bg-[#d9a94f]/28 blur-3xl" />
              <img
                alt="Mindset Before Millions by WD Brown"
                className="relative mx-auto w-[78%] rotate-[-2deg] drop-shadow-[0_28px_30px_rgba(7,20,38,0.22)] transition duration-500 hover:rotate-0 hover:scale-[1.02]"
                loading="lazy"
                src="/images/assets/mindset-before-millions-book.png"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <SectionLabel>Books & Vision Buildaz</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.035em] text-[#0b1930]">
                The conversation continues after the stage.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.78] text-[#505b69] sm:text-[17px]">
                <em>Mindset Before Millions</em> begins the <em>You Ready? Let’s Grow</em> book
                series with a clear belief: prosperity is about more than money. It is about
                balance, legacy, and becoming whole enough to sustain success.
              </p>
              <p className="mt-4 text-[16px] leading-[1.78] text-[#505b69] sm:text-[17px]">
                Through Vision Buildaz, WD extends the message through live conversations,
                mentorship, books, and a growing community built around clarity and intentional
                growth.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0a1a32] px-6 text-[12px] font-extrabold uppercase tracking-[0.09em] text-white transition hover:-translate-y-0.5 hover:bg-[#16335a]"
                  to="/mindset"
                >
                  Explore the Book
                  <BookOpen aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#a89877] px-6 text-[12px] font-extrabold uppercase tracking-[0.09em] text-[#0a1a32] transition hover:-translate-y-0.5 hover:border-[#876e3e] hover:bg-white/35"
                  to="/"
                >
                  Explore Vision Buildaz
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="scroll-mt-20 bg-[#071426] px-5 py-20 text-white sm:px-8 lg:py-28"
          id="impact"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal className="mx-auto max-w-[760px] text-center">
              <SectionLabel light>Impact that moves beyond applause</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white">
                See clearly. Decide intentionally. Move forward whole.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <Reveal>
                <article className="h-full rounded-[28px] border border-white/10 bg-white/[0.055] p-7">
                  <p className="text-[42px] font-extrabold leading-none text-[#e3bd66]">300K+</p>
                  <p className="mt-3 text-[13px] font-bold uppercase leading-[1.55] tracking-[0.09em] text-white/65">
                    Views on one digital message
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.06}>
                <article className="h-full rounded-[28px] border border-white/10 bg-white/[0.055] p-7">
                  <p className="text-[42px] font-extrabold leading-none text-[#e3bd66]">30+</p>
                  <p className="mt-3 text-[13px] font-bold uppercase leading-[1.55] tracking-[0.09em] text-white/65">
                    Years mentoring people through growth and change
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.12}>
                <article className="h-full rounded-[28px] border border-[#d9a94f]/35 bg-[#d9a94f]/10 p-7">
                  <Quote aria-hidden="true" className="h-7 w-7 text-[#e3bd66]" />
                  <p className="mt-4 [font-family:'Trirong',serif] text-[19px] font-bold leading-[1.5] text-white">
                    “WD does not simply help people reach the next level. He helps them become whole
                    enough to sustain it.”
                  </p>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-11 text-center">
              <a
                className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#d9a94f] px-7 text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#071426] transition hover:-translate-y-0.5 hover:bg-[#efca79]"
                href="#booking"
              >
                Book WD to Speak
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="scroll-mt-20 bg-[#f7f4ed] px-5 py-20 sm:px-8 lg:py-28" id="booking">
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Bring WD Brown to your next event</SectionLabel>
              <h2 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-[-0.035em] text-[#0b1930]">
                Your audience does not need another speaker telling them to chase more.
              </h2>
              <p className="mt-6 text-[17px] font-semibold leading-[1.72] text-[#435063]">
                They need someone who can help them understand who they must become to sustain what
                they are building.
              </p>
              <div className="mt-9 rounded-[24px] border border-[#dfd8ca] bg-white p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#94651b]">
                  Available formats
                </p>
                <p className="mt-3 text-[14px] leading-[1.8] text-[#5e6875]">
                  Keynotes · Fireside conversations · Leadership workshops · Executive retreats ·
                  Panels · Community and faith events · Virtual presentations
                </p>
              </div>
            </Reveal>

            <Reveal
              className="rounded-[30px] border border-[#dfd8ca] bg-white p-6 shadow-[0_24px_60px_rgba(7,20,38,0.1)] sm:p-9"
              delay={0.08}
            >
              <div className="mb-8 flex items-start gap-4 border-b border-[#ebe6dd] pb-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0e2c2] text-[#8f621a]">
                  <Building2 aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#0b1930]">
                    Start the conversation
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#707782]">
                    Tell us about the room, the moment, and what your audience needs.
                  </p>
                </div>
              </div>
              <SpeakerBookingForm />
            </Reveal>
          </div>
        </section>
      </main>

      <Copyright />
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className, delay = 0 }: RevealProps): JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.16, once: true }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  light?: boolean;
}

function SectionLabel({ children, light = false }: SectionLabelProps): JSX.Element {
  return (
    <p
      className={`flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] sm:text-[11px] ${
        light ? "text-[#e3bd66]" : "text-[#98691d]"
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
