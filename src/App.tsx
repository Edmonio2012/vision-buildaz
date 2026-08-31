import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Admin } from "@/pages/Admin";
import { About } from "@/pages/About";
import { BookOnline } from "@/pages/BookOnline";
import { BookingCalendar } from "@/pages/BookingCalendar";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Mindset } from "@/pages/Mindset";
import { NotFound } from "@/pages/NotFound";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SpeakerSite } from "@/pages/SpeakerSite";
import { YouReadyLetsGrowDigital } from "@/pages/YouReadyLetsGrowDigital";
import { YouReadyLetsGrowDigitalCourse } from "@/pages/YouReadyLetsGrowDigitalCourse";

const publicSiteUrl = "https://www.visionbuildaz.com";
const speakerDescription =
  "WD Brown helps entrepreneurs, leaders, and people navigating change build the mindset and inner foundation to pursue success without losing themselves. Book WD to speak.";
const legacyDescription =
  "Vision Buildaz helps entrepreneurs and leaders grow with clarity, purpose, and a strong personal foundation.";

function setMetaContent(selector: string, content: string): void {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

function RouteMetadata(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const isSpeakerRoute = pathname === "/" || pathname === "/wdbrown";
    const canonicalUrl = isSpeakerRoute ? `${publicSiteUrl}/` : `${publicSiteUrl}${pathname}`;
    const title = isSpeakerRoute
      ? "WD Brown — Speaker, Author, Mentor | You Ready? Let's Grow!®"
      : "Vision Buildaz";
    const description = isSpeakerRoute ? speakerDescription : legacyDescription;
    const socialTitle = isSpeakerRoute ? "WD Brown — Speaker, Author & Mentor" : "Vision Buildaz";
    const socialImage = isSpeakerRoute
      ? `${publicSiteUrl}/images/speaker/wd-speaking-hero.webp`
      : `${publicSiteUrl}/images/logo/logo.png`;

    document.title = title;
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[name="author"]', isSpeakerRoute ? "WD Brown" : "Vision Buildaz");
    setMetaContent(
      'meta[name="robots"]',
      pathname.startsWith("/admin") ? "noindex, nofollow" : "index, follow"
    );
    setMetaContent('meta[property="og:title"]', socialTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:image"]', socialImage);
    setMetaContent(
      'meta[property="og:image:alt"]',
      isSpeakerRoute ? "WD Brown speaking to a full arena" : "Vision Buildaz"
    );
    setMetaContent('meta[name="twitter:title"]', socialTitle);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', socialImage);

    const structuredData = document.getElementById("site-structured-data");
    if (structuredData) {
      structuredData.textContent = JSON.stringify(
        isSpeakerRoute
          ? {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "WD Brown",
              url: `${publicSiteUrl}/`,
              image: `${publicSiteUrl}/images/speaker/wd-speaking-hero.webp`,
              jobTitle: "Speaker, Author, Mentor and Entrepreneur",
              description: speakerDescription,
              worksFor: {
                "@type": "Organization",
                name: "Vision Buildaz",
                url: `${publicSiteUrl}/`
              },
              sameAs: [
                "https://www.instagram.com/visionbuildaz",
                "https://www.youtube.com/@visionbuildaz",
                "https://www.tiktok.com/@visionbuildaz",
                "https://www.facebook.com/visionbuildaz",
                "https://www.linkedin.com/company/visionbuildaz",
                "https://www.linkedin.com/in/wmdbrown",
                "https://linktr.ee/visionbuildaz"
              ]
            }
          : {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vision Buildaz",
              url: `${publicSiteUrl}/`
            }
      );
    }
  }, [pathname]);

  return null;
}

function ScrollToTopOnRouteChange(): null {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
}

export default function App(): JSX.Element {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <RouteMetadata />
      <Routes>
        <Route element={<SpeakerSite />} path="/" />
        <Route element={<Home />} path="/recenthome" />
        <Route element={<About />} path="/about" />
        <Route element={<BookOnline />} path="/book-online" />
        <Route element={<BookingCalendar />} path="/booking-calendar" />
        <Route element={<BookingCalendar />} path="/booking-calendar/:serviceSlug" />
        <Route element={<ProjectsPage />} path="/projects" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<SpeakerSite />} path="/wdbrown" />
        <Route element={<YouReadyLetsGrowDigital />} path="/youreadyletsgrowdigital" />
        <Route
          element={<YouReadyLetsGrowDigitalCourse />}
          path="/youreadyletsgrowdigital/:courseId"
        />
        <Route element={<Mindset />} path="/mindset" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}
