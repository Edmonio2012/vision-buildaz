// Root router component with a page-level entrance animation.
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnnouncementBanner } from "@/components/ui/AnnouncementBanner";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Mindset } from "@/pages/Mindset";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { WDBrown } from "@/pages/WDBrown";

function ScrollToTopOnRouteChange(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App(): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnnouncementBanner />
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<ProjectsPage />} path="/projects" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<WDBrown />} path="/wdbrown" />
        <Route element={<Mindset />} path="/mindset" />
      </Routes>
    </motion.div>
  );
}
