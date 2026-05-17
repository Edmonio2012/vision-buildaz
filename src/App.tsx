// Root router component that maps top-level routes to page components.
import { Route, Routes } from "react-router-dom";

import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { Home } from "@/pages/Home";
import { ProjectsPage } from "@/pages/ProjectsPage";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<ProjectsPage />} path="/projects" />
      <Route element={<ContactPage />} path="/contact" />
    </Routes>
  );
}
