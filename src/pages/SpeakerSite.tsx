import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Menu,
  Pause,
  Play,
  X
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLink,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";

import "@/styles/speaker-site.css";

const GHL_SPEAKER_INQUIRY_URL = import.meta.env.VITE_GHL_SPEAKER_INQUIRY_URL?.trim();
const SPEAKER_INQUIRY_FALLBACK =
  "mailto:vision@visionbuildaz.com?subject=Speaking%20inquiry%20for%20WD%20Brown";
const SPEAKER_INQUIRY_URL = GHL_SPEAKER_INQUIRY_URL || SPEAKER_INQUIRY_FALLBACK;
const AMAZON_AUTHOR_URL = "https://amazon.com/author/wdbrown";

const navigation = [
  { label: "Speaking", href: "#speaking" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Meet WD", href: "#meet-wd" },
  { label: "Books", href: "#books" },
  { label: "Contact", href: "#contact" }
] as const;

const heroMessages = [
  <>
    Helping people reach their destination <em>whole</em>.
  </>,
  <>
    “Success should not cost you your health, relationships, identity, faith, or purpose.” — WD
    Brown
  </>,
  <>
    WD Brown helps audiences build the mindset, clarity, and inner foundation to sustain what they
    build.
  </>
] as const;

const whyCards = [
  {
    className: "speaker-why-card--paper",
    title: "Success without self-destruction",
    copy: "WD helps people achieve more without sacrificing their health, relationships, identity, faith, peace, or purpose."
  },
  {
    className: "speaker-why-card--outline",
    title: "Clarity and focus",
    copy: "He helps audiences cut through distractions, evaluate what deserves their attention, and build with intention."
  },
  {
    className: "speaker-why-card--gold",
    title: "Wisdom grounded in experience",
    copy: "His message is informed by building businesses, creating wealth, navigating setbacks, mentoring others, and learning what success requires beyond strategy."
  },
  {
    className: "speaker-why-card--ink",
    title: "Transformation beyond motivation",
    copy: "Audiences leave with a clearer mindset, stronger direction, and practical questions they can use to make better decisions."
  }
] as const;

const credentials = [
  { value: "30+", label: "years of mentorship" },
  { value: "2×", label: "seven-figure company experience" },
  { value: "Multiple", label: "businesses built" },
  { value: "Real estate", label: "experience" },
  { value: "Author", label: "of Mindset Before Millions" },
  { value: "300,000+", label: "digital message views" }
] as const;

const method = [
  { number: "01", title: "Shift Your Mindset", copy: "Build the internal foundation first." },
  { number: "02", title: "Clarify Your Purpose", copy: "Filter noise and align on true priorities." },
  { number: "03", title: "Build Your Next Step", copy: "Execute with intention and sustain growth." }
] as const;

const topics = [
  {
    number: "01",
    title: "Mindset Before Millions",
    promise: "Build the person who can sustain the success.",
    outcomes: [
      "Recognize when ambition is operating without alignment.",
      "Strengthen the mindset and personal foundation required for sustainable growth.",
      "Redefine success beyond money, status, and external achievement."
    ]
  },
  {
    number: "02",
    title: "Get There Whole",
    promise: "Reach your destination without losing yourself along the way.",
    outcomes: [
      "Identify the hidden personal costs of unmanaged success.",
      "Protect health, relationships, identity, peace, faith, and purpose while pursuing ambitious goals.",
      "Build a healthier and more complete definition of prosperity."
    ]
  },
  {
    number: "03",
    title: "The Focus Filter",
    promise: "Cut through distractions and build with intention.",
    outcomes: [
      "Separate meaningful opportunities from distractions.",
      "Make clearer decisions about priorities, relationships, and opportunities.",
      "Focus energy on what matters most in the current season."
    ]
  },
  {
    number: "04",
    title: "Built for the Next Chapter",
    promise: "Use experience, humility, and adaptability to keep growing.",
    outcomes: [
      "Approach change without minimizing previous accomplishments.",
      "Translate hard-earned wisdom into new opportunities and platforms.",
      "Replace fear of starting again with the confidence to build from experience."
    ]
  },
  {
    number: "05",
    title: "Harvest Time",
    promise: "Now you're ready — go out and reap what you have sown.",
    outcomes: ["An empowering closing address that calls audiences into decisive, aligned action."]
  }
] as const;

const testimonials = [
  {
    id: "y46I3ZRGgJw",
    name: "Dr Omar Bali",
    quote: "Such a privilege to learn from WD",
    image: "/images/speaker/testimonial-omar-bali.jpg"
  },
  {
    id: "Kxf390Ihz3o",
    name: "Yuen Yufeng",
    quote: "His wisdom has accelerated my self development by years",
    image: "/images/speaker/testimonial-yuen-yufeng.jpg"
  },
  {
    id: "gAnbYMzjNJ8",
    name: "Edmon Khachatryan",
    quote: "He helped me shift my mindset to build something that will last",
    image: "/images/speaker/testimonial-edmon-khachatryan.jpg"
  },
  {
    id: "HHGzZHnCWFo",
    name: "Nicholas Damien",
    quote: "He helped me understand and embrace that achievement doesn't need to be hard",
    image: "/images/speaker/testimonial-nicholas-damien.jpg"
  }
] as const;

const books = [
  {
    title: "Mindset Before Millions",
    copy: "True prosperity starts within.",
    image: "/images/speaker/book-mindset.webp"
  },
  {
    title: "Millionaire Playbook",
    copy: "Practical moves to build and sustain what you create.",
    image: "/images/speaker/millionaire-playbook.jpg"
  },
  {
    title: "Mindset Before Millions — Workbook",
    copy: "Guided reflection for the growth journey.",
    image: "/images/speaker/book-workbook.webp"
  },
  {
    title: "Millionaire Workbook",
    copy: "Exercises that turn wealth-building principles into a plan.",
    image: "/images/speaker/millionaire-workbook.webp"
  }
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/visionbuildaz", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@visionbuildaz", Icon: FaYoutube },
  { label: "TikTok", href: "https://www.tiktok.com/@visionbuildaz", Icon: FaTiktok },
  { label: "Facebook", href: "https://www.facebook.com/visionbuildaz", Icon: FaFacebookF },
  {
    label: "LinkedIn — Vision Buildaz",
    href: "https://www.linkedin.com/company/visionbuildaz",
    Icon: FaLinkedinIn
  },
  {
    label: "LinkedIn — WD Brown",
    href: "https://www.linkedin.com/in/wmdbrown",
    Icon: FaLinkedinIn
  },
  { label: "X", href: "https://x.com/VisionBuildaz", Icon: FaXTwitter },
  { label: "Linktree", href: "https://linktr.ee/visionbuildaz", Icon: FaLink }
] as const;

const standardBio =
  "For more than 30 years, WD Brown has mentored entrepreneurs, leaders, young adults, and people rebuilding after difficult seasons. Through his Focus Filter approach and Mindset Before Millions message, WD helps individuals cut through distractions and develop the mental, emotional, spiritual, and practical foundation needed to sustain success. Known for his ability to listen deeply and speak directly to the heart of an issue, WD does more than inspire audiences. He helps people reset, refocus, and move forward with intention. His mission is to help people reach their destination whole.";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className = "", delay = 0 }: RevealProps): JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      transition={{ delay, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function SpeakerSite(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [bioCopied, setBioCopied] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("speaker-menu-open", menuOpen);
    return () => document.body.classList.remove("speaker-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const menuItems = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );
    window.requestAnimationFrame(() => menuItems[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || menuItems.length === 0) return;
      const focusableItems = [menuButtonRef.current, ...menuItems].filter(
        (item): item is HTMLElement => Boolean(item)
      );
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const copyBio = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(standardBio);
      setBioCopied(true);
      window.setTimeout(() => setBioCopied(false), 2200);
    } catch {
      setBioCopied(false);
    }
  };

  return (
    <div className="speaker-site">
      <a className="speaker-skip-link" href="#speaker-main">
        Skip to content
      </a>

      <header className="speaker-nav">
        <div className="speaker-wrap speaker-nav__inner">
          <button
            aria-controls="speaker-mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="speaker-nav__menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            ref={menuButtonRef}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <a aria-label="WD Brown — top of page" className="speaker-brand" href="#top">
            <img alt="" aria-hidden="true" src="/images/speaker/logo-yrlg.webp" />
            <span>
              <strong>WD Brown</strong>
              <small>Vision Buildaz</small>
            </span>
          </a>

          <nav aria-label="Primary" className="speaker-nav__links">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="speaker-nav__actions">
            <a className="speaker-button speaker-button--ghost speaker-nav__sheet" download href="/downloads/WD_Brown_Speaker_Sheet.pdf">
              <Download aria-hidden="true" />
              Speaker Sheet
            </a>
            <a className="speaker-button speaker-button--gold speaker-nav__book" href="#contact">
              Book WD
            </a>
          </div>
        </div>

        {menuOpen ? (
          <nav
            aria-label="Mobile primary"
            className="speaker-mobile-menu is-open"
            id="speaker-mobile-menu"
            ref={mobileMenuRef}
          >
            <div className="speaker-mobile-menu__inner">
              {navigation.map((item) => (
                <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              ))}
              <a download href="/downloads/WD_Brown_Speaker_Sheet.pdf" onClick={() => setMenuOpen(false)}>
                Speaker Sheet
                <Download aria-hidden="true" />
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="speaker-main">
        <section className="speaker-hero" id="top">
          <div className="speaker-hero__visual">
            <img
              alt="WD Brown speaking on stage to a full arena"
              decoding="async"
              height="1228"
              src="/images/speaker/wd-speaking-hero.webp"
              width="2200"
            />
          </div>
          <div className="speaker-wrap speaker-hero__inner">
            <div className="speaker-hero__copy">
              <h1>
                You Ready?
                <br />
                Let&apos;s <span>Grow!</span><sup>®</sup>
              </h1>

              <div aria-live="polite" className="speaker-hero__message">
                <p key={heroIndex}>{heroMessages[heroIndex]}</p>
              </div>

              <div aria-label="Choose hero message" className="speaker-hero__dots" role="group">
                {heroMessages.map((_, index) => (
                  <button
                    aria-label={`Message ${index + 1} of ${heroMessages.length}`}
                    aria-pressed={heroIndex === index}
                    key={index}
                    onClick={() => setHeroIndex(index)}
                    type="button"
                  />
                ))}
              </div>

              <div className="speaker-hero__actions">
                <a className="speaker-button speaker-button--gold speaker-button--large" href="#contact">
                  Book WD to Speak
                </a>
                <a className="speaker-button speaker-button--ghost speaker-button--large" download href="/downloads/WD_Brown_Speaker_Sheet.pdf">
                  <Download aria-hidden="true" />
                  Download Speaker Sheet (PDF)
                </a>
              </div>

              <p className="speaker-eyebrow speaker-hero__credit">
                Entrepreneur · Author · Mentor · Speaker
              </p>
            </div>
          </div>
        </section>

        <div aria-label="What audiences take away" className="speaker-marquee">
          <div className={`speaker-marquee__track ${marqueePaused ? "is-paused" : ""}`}>
            {[0, 1].map((copy) => (
              <ul aria-hidden={copy === 1} key={copy}>
                <li>Achieve more without sacrificing health</li>
                <li>Cut through distractions and build with clarity and focus</li>
                <li>Wisdom grounded in experience — 7-figure businesses, 30+ years of mentoring</li>
                <li>Leave with a clearer mindset and stronger direction</li>
                <li>You Ready? Let&apos;s Grow!</li>
              </ul>
            ))}
          </div>
          <button
            aria-label={marqueePaused ? "Play audience takeaways" : "Pause audience takeaways"}
            aria-pressed={marqueePaused}
            className="speaker-marquee__control"
            onClick={() => setMarqueePaused((current) => !current)}
            type="button"
          >
            {marqueePaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>

        <section className="speaker-section speaker-why" id="why-wd">
          <div className="speaker-wrap">
            <Reveal className="speaker-why__panel">
              <p className="speaker-eyebrow">Why WD</p>
              <h2>Why is WD the person you&apos;re looking for?</h2>
              <p className="speaker-lede">
                As an entrepreneur, author, mentor and speaker, WD gives your audience more than a
                keynote, workshop, or retreat session. They walk out with:
              </p>

              <div className="speaker-why__grid">
                {whyCards.map((card) => (
                  <article className={`speaker-why-card ${card.className}`} key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                ))}
              </div>

              <div className="speaker-credibility">
                <ul className="speaker-credibility__stats">
                  {credentials.map((item) => (
                    <li key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
                <figure className="speaker-credibility__image">
                  <img
                    alt="WD Brown delivering a keynote in an arena setting"
                    height="1080"
                    loading="lazy"
                    src="/images/speaker/wd-stage-keynote-v1.png"
                    width="1456"
                  />
                  <figcaption>
                    <span>Built from experience.</span>
                    <strong>Delivered with clarity.</strong>
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="speaker-section speaker-speaking" id="speaking">
          <div className="speaker-wrap">
            <Reveal>
              <p className="speaker-eyebrow">Speaking &amp; Keynotes</p>
              <h2>The WD Method</h2>
              <p className="speaker-lede">
                The most gifted leaders and performers in the world still needed a coach to reach
                the top. WD brings that same clarity and grounding shift to your event.
              </p>
            </Reveal>

            <div className="speaker-method">
              {method.map((item, index) => (
                <Reveal className="speaker-method__step" delay={index * 0.06} key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="speaker-topics__heading">
              <p className="speaker-eyebrow">Signature Speaking Topics</p>
              <h3>Messages your audience can carry forward.</h3>
            </Reveal>

            <div className="speaker-topics">
              {topics.map((topic, index) => (
                <Reveal
                  className={`speaker-topic ${index === topics.length - 1 ? "speaker-topic--featured" : ""}`}
                  delay={(index % 3) * 0.05}
                  key={topic.number}
                >
                  <div className="speaker-topic__number">
                    <strong>{topic.number}</strong>
                    <span>Topic</span>
                  </div>
                  <h4>{topic.title}</h4>
                  <p className="speaker-topic__promise">{topic.promise}</p>
                  <ul>
                    {topic.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="speaker-reel-slot">
              <div className="speaker-reel-slot__image">
                <img alt="WD Brown speaking to an audience" loading="lazy" src="/images/speaker/wd-speaking-hero.webp" />
              </div>
              <div className="speaker-reel-slot__copy">
                <span className="speaker-reel-slot__icon"><Play aria-hidden="true" /></span>
                <p className="speaker-eyebrow">Speaker Reel</p>
                <h3>The reel is in production.</h3>
                <p>
                  This space is ready for WD&apos;s speaker reel. Until then, explore current teaching
                  and conversations on the Vision Buildaz channel.
                </p>
                <a href="https://youtu.be/OUtHOPJbcS0" rel="noreferrer noopener" target="_blank">
                  Watch on YouTube <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="speaker-section speaker-testimonials" id="testimonials">
          <div className="speaker-wrap">
            <Reveal className="speaker-testimonials__header">
              <p className="speaker-eyebrow">Video Testimonials</p>
              <h2>What People Say About WD</h2>
              <p className="speaker-lede">
                “WD does not simply help people reach the next level. He helps them become whole
                enough to sustain it.”
              </p>
            </Reveal>

            <div className="speaker-testimonials__grid">
              {testimonials.map((testimonial, index) => (
                <Reveal className="speaker-testimonial" delay={(index % 3) * 0.05} key={testimonial.id}>
                  <div className="speaker-testimonial__media">
                    {activeVideo === testimonial.id ? (
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src={`https://www.youtube-nocookie.com/embed/${testimonial.id}?autoplay=1&rel=0`}
                        title={`${testimonial.name} testimonial`}
                      />
                    ) : (
                      <button
                        aria-label={`Play ${testimonial.name}'s video testimonial`}
                        onClick={() => setActiveVideo(testimonial.id)}
                        type="button"
                      >
                        <img alt={testimonial.name} loading="lazy" src={testimonial.image} />
                        <span><Play aria-hidden="true" /></span>
                      </button>
                    )}
                  </div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <p>{testimonial.name}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="speaker-section speaker-bio" id="meet-wd">
          <div className="speaker-wrap speaker-bio__layout">
            <Reveal className="speaker-bio__aside">
              <p className="speaker-eyebrow">Author · Mentor · Speaker · Coach</p>
              <h2>Meet WD Brown.</h2>
              <figure>
                <img
                  alt="WD Brown in a navy suit"
                  height="555"
                  loading="lazy"
                  src="/images/assets/yrlgd-hero-founder.png"
                  width="489"
                />
              </figure>
              <div className="speaker-bio__marks">
                <img alt="You Ready? Let's Grow!" loading="lazy" src="/images/speaker/logo-yrlg.webp" />
                <img alt="Vision Buildaz" loading="lazy" src="/images/speaker/logo-vb.webp" />
              </div>
            </Reveal>

            <Reveal className="speaker-bio__copy" delay={0.08}>
              <p className="speaker-bio__open">
                Raised in inner-city New York, WD&apos;s path was anything but linear. He dropped out
                of high school, earned his GED on the third try, and had to rebuild — mentally,
                emotionally, spiritually — long before the results ever showed.
              </p>
              <p className="speaker-bio__thesis">Before the Millions, you have to become whole.</p>
              <p>
                Through what he calls the <strong>Focus Filter</strong>, WD teaches a practical way
                to cut through distractions, align your life, and build with intention instead of
                pressure.
              </p>
              <p>
                What sets WD apart is not only what he teaches, but how he connects. He listens
                intently, discerns what is being said beneath the surface, and responds in a way
                that brings clarity in real time.
              </p>
              <blockquote className="speaker-pull-quote">
                <p>He knows how to find the heart of a person and answer in a way that makes you see.</p>
                <cite>Audience member</cite>
              </blockquote>
              <blockquote className="speaker-pull-quote speaker-pull-quote--gold">
                <p>I&apos;m not an expert. I&apos;m a practitioner. I&apos;m growing with you.</p>
                <cite>WD Brown</cite>
              </blockquote>
              <p>
                WD Brown does not simply teach people how to make money or reach another level. He
                helps them become whole enough to sustain where they are going.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="speaker-section speaker-books" id="books">
          <div className="speaker-wrap">
            <Reveal className="speaker-books__header">
              <div>
                <p className="speaker-eyebrow">You Ready? Let&apos;s Grow! Series</p>
                <h2>Start with the books.</h2>
              </div>
              <a className="speaker-button speaker-button--ink" href={AMAZON_AUTHOR_URL} rel="noreferrer noopener" target="_blank">
                View all books on Amazon <ExternalLink aria-hidden="true" />
              </a>
            </Reveal>

            <div className="speaker-books__grid">
              {books.map((book, index) => (
                <Reveal className="speaker-book" delay={(index % 4) * 0.04} key={book.title}>
                  <div className="speaker-book__cover">
                    <img alt={book.title} loading="lazy" src={book.image} />
                  </div>
                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="speaker-books__single-link-note">
              All titles and editions are available from WD Brown&apos;s official Amazon author page.
            </p>
          </div>
        </section>

        <section className="speaker-section speaker-contact" id="contact">
          <div className="speaker-wrap speaker-contact__layout">
            <Reveal className="speaker-contact__copy">
              <p className="speaker-eyebrow">One Page, Everything You Need</p>
              <h2>Booking WD to Speak?</h2>
              <p className="speaker-lede">
                Get WD&apos;s one-page speaker sheet — core promise, signature talks, ideal audiences,
                speaking formats, and credentials — in one downloadable PDF for your team or event
                committee. Ready to bring this message to your audience? Start the conversation.
              </p>
              <div className="speaker-contact__actions">
                <a className="speaker-button speaker-button--gold speaker-button--large" download href="/downloads/WD_Brown_Speaker_Sheet.pdf">
                  <Download aria-hidden="true" />
                  Download Speaker Sheet
                </a>
                <a
                  className="speaker-button speaker-button--gold speaker-button--large"
                  data-integration={
                    GHL_SPEAKER_INQUIRY_URL
                      ? "gohighlevel-booking-url"
                      : "mailto-fallback-awaiting-gohighlevel-url"
                  }
                  href={SPEAKER_INQUIRY_URL}
                >
                  I&apos;m Ready, Let&apos;s Grow!
                </a>
              </div>

              <blockquote className="speaker-contact__quote">
                “WD does not simply help people reach the next level. He helps them become whole
                enough to sustain it.”
              </blockquote>

              <div className="speaker-standard-bio">
                <div className="speaker-standard-bio__head">
                  <h3>Standard Speaker Bio</h3>
                  <button className="speaker-button speaker-button--ghost" onClick={copyBio} type="button">
                    {bioCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                    {bioCopied ? "Copied" : "Copy bio"}
                  </button>
                </div>
                <p>{standardBio}</p>
              </div>
            </Reveal>

            <Reveal className="speaker-contact__portrait" delay={0.08}>
              <div>
                <img
                  alt="WD Brown"
                  height="628"
                  loading="lazy"
                  src="/images/assets/wdbrown-founder.png"
                  width="504"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="speaker-footer">
        <div className="speaker-wrap speaker-footer__grid">
          <div className="speaker-footer__brand">
            <img alt="You Ready? Let's Grow!" src="/images/speaker/logo-yrlg.webp" />
            <p>
              Speaking, mentorship, and books from WD Brown — founder of Vision Buildaz. Helping
              people reach their destination whole.
            </p>
            <div aria-label="Social media" className="speaker-footer__socials">
              {socialLinks.map(({ Icon, href, label }) => (
                <a aria-label={label} href={href} key={label} rel="noreferrer noopener" target="_blank">
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="speaker-footer__nav">
            <div>
              <h2>Explore</h2>
              {navigation.slice(0, 4).map((item) => (
                <a href={item.href} key={item.href}>{item.label}</a>
              ))}
            </div>
            <div>
              <h2>For Organizers</h2>
              <a download href="/downloads/WD_Brown_Speaker_Sheet.pdf">Speaker sheet</a>
              <a href="#speaking">Signature topics</a>
              <a href="#contact">Request information</a>
              <a href="#contact">Book WD to speak</a>
            </div>
          </nav>
        </div>
        <div className="speaker-wrap speaker-footer__bottom">
          <p>© {new Date().getFullYear()} WD Brown. You Ready? Let&apos;s Grow!® · All Rights Reserved.</p>
          <img alt="Vision Buildaz" loading="lazy" src="/images/speaker/logo-vb.webp" />
        </div>
      </footer>
    </div>
  );
}
