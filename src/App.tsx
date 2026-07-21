// Root router component with a page-level entrance animation.
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnnouncementBanner } from "@/components/ui/AnnouncementBanner";
import { Admin } from "@/pages/Admin";
import { About } from "@/pages/About";
import { BookOnline } from "@/pages/BookOnline";
import { BookingCalendar } from "@/pages/BookingCalendar";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Mindset } from "@/pages/Mindset";
import { NewHome } from "@/pages/NewHome";
import { NotFound } from "@/pages/NotFound";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { WDBrown } from "@/pages/WDBrown";
import { YouReadyLetsGrowDigital } from "@/pages/YouReadyLetsGrowDigital";
import { YouReadyLetsGrowDigitalCourse } from "@/pages/YouReadyLetsGrowDigitalCourse";

function ScrollToTopOnRouteChange(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App(): JSX.Element {
  const { pathname } = useLocation();
  const showAnnouncement = pathname !== "/wdbrown";

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {showAnnouncement ? <AnnouncementBanner /> : null}
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route element={<NewHome />} path="/" />
        <Route element={<Home />} path="/recenthome" />
        <Route element={<About />} path="/about" />
        <Route element={<BookOnline />} path="/book-online" />
        <Route element={<BookingCalendar />} path="/booking-calendar" />
        <Route element={<BookingCalendar />} path="/booking-calendar/:serviceSlug" />
        <Route element={<ProjectsPage />} path="/projects" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<WDBrown />} path="/wdbrown" />
        <Route element={<YouReadyLetsGrowDigital />} path="/youreadyletsgrowdigital" />
        <Route
          element={<YouReadyLetsGrowDigitalCourse />}
          path="/youreadyletsgrowdigital/:courseId"
        />
        <Route element={<Mindset />} path="/mindset" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </motion.div>
  );
}
