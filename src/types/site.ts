// Shared TypeScript contracts for site metadata and navigation structures.
export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
}
