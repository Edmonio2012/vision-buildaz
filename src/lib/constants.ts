// Centralized site-level constants used by metadata, navigation, and shared UI.
export const SITE_CONFIG = {
  name: "Vision Buildaz",
  description:
    "A professional GitHub profile and organization website built with Next.js 14 and TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: "/og-image.png"
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
] as const;
