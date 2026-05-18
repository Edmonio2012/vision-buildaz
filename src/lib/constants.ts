// Centralized site-level constants used by metadata, navigation, and shared UI.
export const SITE_CONFIG = {
  name: "Vision Buildaz",
  description:
    "Vision Buildaz is a coaching and mentoring platform helping people grow with purpose, clarity, and aligned success.",
  url: import.meta.env.VITE_SITE_URL || "https://visionbuildaz.com",
  ogImage: "/images/logo/logo.png"
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
] as const;
