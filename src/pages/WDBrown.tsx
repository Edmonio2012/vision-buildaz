import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";

const founderParagraphs = [
  `WD Brown is the voice behind a simple but powerful question: "You Ready? Let's Grow!"® In his experience, most people don't always need more money first, they need clarity, focus, and wholeness.`,
  "Raised in the inner city of New York, WD's journey has been anything but linear. He has faced failure, started over, and learned firsthand what it takes to rebuild not just financially, but mentally, emotionally, and spiritually. He dropped out of high school, passed his GED on his third attempt, and had to develop discipline and perspective long before he ever saw results.",
  "That journey shaped his core message: Before the millions... you have to become whole.",
  `As the founder of Vision Buildaz - "You Ready? Let's Grow!"®, WD teaches what he calls a Focus Filter: a practical way to cut through distractions, align your life, and build with intention instead of pressure.`,
  "For over 30 years, he has mentored and walked alongside people at every stage - those trying to find direction, those rebuilding after setbacks, and even those who have success but still feel out of alignment. His approach is not about hype; it's about becoming grounded enough to sustain what you build.",
  `His book series, You Ready? Let's Grow, begins with Mindset Before Millions, a powerful introduction to the belief that true prosperity starts within. It challenges the idea that wealth is only measured by money, instead defining success through balance, legacy, and wholeness. Rather than chasing financial gain at the expense of health, relationships, and purpose, this message emphasizes building a life that can sustain and truly enjoy the wealth it creates.`,
  "What sets WD apart is not just what he teaches, but how he connects. He is deeply relationship-oriented, with a unique ability to listen intently, discern what's really being said beneath the surface, and respond in a way that brings clarity in real time. People often say he has a way of speaking directly to the heart, even in a room full of strangers.",
  `As one audience member put it: "He knows how to find the heart of a person and answer in a way that makes you see."`,
  `That's exactly how WD teaches.`,
  `He often says: "We're going to get you to the millions, but first, let's get your mind right. Let's make sure your heart is right. Let's make sure you're mentally and emotionally whole because if that's not in place, the millions won't matter."`,
  "Through weekly live sessions, real conversations, and consistent teaching, WD challenges people to stop chasing everything and start focusing on what actually matters.",
  `He often reminds his community: "I'm not an expert. I'm a practitioner. I'm growing with you."`,
  "WD Brown doesn't just teach people how to make money; he teaches them how to become whole.",
  `Wherever he goes, the message stays the same: You Ready? Let's Grow!®`
] as const;

export function WDBrown(): JSX.Element {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Our Founder | WD Brown | Vision Buildaz";
    if (description) {
      description.content =
        "Meet WD Brown, founder of Vision Buildaz, and learn how his message of clarity, focus, and wholeness shapes the work behind You Ready? Let's Grow!.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <>
      <BrandHeader />

      <main className="bg-[#f6f2ea] text-[#1f2a54]">
        <section className="overflow-hidden bg-[linear-gradient(135deg,#efe4c8_0%,#f6f2ea_50%,#e5edf5_100%)] px-6 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="[font-family:'Trirong',serif] text-[15px] font-semibold uppercase tracking-[0.2em] text-[#aa8f20]">
                YOU READY? LET&apos;S GROW!
              </p>
              <h1 className="mt-5 [font-family:'Trirong',serif] text-[clamp(2.5rem,6vw,4.8rem)] font-bold leading-[0.96] text-[#1f2a54]">
                Our Founder
              </h1>
              <p className="mt-6 text-[16px] font-semibold uppercase tracking-[0.16em] text-[#4f5a7b] sm:text-[18px]">
                Author &middot; Mentor &middot; Speaker &middot; Coach
              </p>
              <p className="mt-7 max-w-[620px] text-[17px] leading-[1.8] text-[#374151] sm:text-[18px]">
                WD Brown doesn&apos;t just teach people how to make money; he teaches them how to
                become whole.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto w-full max-w-[500px]"
              initial={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[34px] bg-[#d7bf86]/55" />
              <div className="relative overflow-hidden rounded-[34px] bg-[#2f396d] px-4 pt-8">
                <img
                  alt="WD Brown"
                  className="mx-auto w-full max-w-[420px] object-contain object-bottom"
                  fetchPriority="high"
                  height={628}
                  src="/images/assets/wdbrown-founder.png"
                  width={504}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[1.18fr_0.82fr]">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[32px] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(31,42,84,0.08)] sm:px-8 sm:py-10"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-6 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
                {founderParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.aside
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-[32px] bg-[#1f295f] px-6 py-8 text-white shadow-[0_18px_50px_rgba(31,42,84,0.14)]">
                <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-[1.25] text-[#f1dda7]">
                  &quot;He knows how to find the heart of a person and answer in a way that makes
                  you see.&quot;
                </p>
                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/72">
                  Audience member
                </p>
              </div>

              <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
                  Call to Action
                </p>
                <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
                  Are you ready to take the next step toward achieving your goals? Contact Vision
                  Buildaz today to schedule a consultation. Whether you&apos;re interested in
                  one-on-one coaching, workshops, or financial mentorship, we&apos;re here to help.
                  You ready? Let&apos;s grow!
                </p>
                <Link
                  className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
                  to="/contact"
                >
                  Contact Vision Buildaz
                </Link>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>

      <Copyright />
    </>
  );
}
