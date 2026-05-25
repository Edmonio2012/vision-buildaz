// Root router component with a page-level entrance animation.
import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import { About } from "@/pages/About";
import { ContactPage } from "@/pages/ContactPage";
import { Home } from "@/pages/Home";
import { Mindset } from "@/pages/Mindset";
import { ProjectsPage } from "@/pages/ProjectsPage";

export default function App(): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<ProjectsPage />} path="/projects" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<Mindset />} path="/mindset" />
      </Routes>
    </motion.div>
  );
}
