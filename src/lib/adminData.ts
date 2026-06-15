import { courses as defaultCourses, type Course } from "@/data/courses";
import { SOCIAL_LINKS } from "@/lib/constants";

export const STORAGE_KEYS = {
  courses: "yrlgd_courses_data",
  announcement: "announcement_data",
  contacts: "contact_submissions",
  socials: "social_links_data",
  progress: "yrlgd_progress",
  categories: "course_categories",
  courseOpens: "yrlgd_course_opens",
  itemOpens: "yrlgd_item_opens",
  timeSpent: "yrlgd_time_spent",
  previewCourse: "admin_preview_course",
  tourCompleted: "admin_tour_completed",
  adminAuth: "admin_auth",
  failedAttempts: "admin_failed_attempts",
  lockoutUntil: "admin_lockout_until"
} as const;

export const ADMIN_DATA_EVENT = "visionbuildaz-admin-data";

export interface ClassroomHeroData {
  headline: string;
  subtext: string;
}

export interface CoursesData {
  hero: ClassroomHeroData;
  courses: Course[];
}

export interface AnnouncementData {
  active: boolean;
  headline: string;
  body: string;
  ctaText: string;
  ctaLink: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  submittedAt: string;
  read: boolean;
}

export interface SocialLinkData {
  id: string;
  label: string;
  href: string;
  icon: "TikTok" | "Instagram" | "YouTube" | "Facebook" | "LinkedIn" | "Globe";
  visible: boolean;
}

export const defaultCoursesData: CoursesData = {
  hero: {
    headline: "YOU READY? LET'S GROW!",
    subtext: "Learn, download, plan, and grow through the digital resources from Vision Buildaz."
  },
  courses: defaultCourses.map((course) => ({
    ...course,
    status: "visible",
    category: "Featured",
    tags: course.title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 3),
    items: course.items.map((item) => ({ ...item, status: "visible" }))
  }))
};

export const defaultCourseCategories = ["Featured", "Media", "Books", "Planning"];

export const defaultAnnouncementData: AnnouncementData = {
  active: true,
  headline: "We're Live Every Tuesday & Thursday at 7PM EST!",
  body: "Free coaching, mindset shifts, encouragement, and conversations that help you move forward. Tuesdays & Thursdays at 7PM EST.",
  ctaText: "Subscribe",
  ctaLink: "/contact"
};

export const defaultSocialLinksData: SocialLinkData[] = SOCIAL_LINKS.map((link) => ({
  id: link.label.toLowerCase(),
  label: link.label,
  href: link.href,
  icon: link.label,
  visible: true
}));

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? ({ ...fallback, ...(JSON.parse(stored) as T) } as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readArray<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  if (!isBrowser()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(ADMIN_DATA_EVENT, { detail: { key } }));
}

export function getCoursesData(): CoursesData {
  const stored = readJson<CoursesData>(STORAGE_KEYS.courses, defaultCoursesData);

  return {
    hero: { ...defaultCoursesData.hero, ...stored.hero },
    courses: stored.courses.map((course) => ({
      ...course,
      status: course.status ?? "visible",
      category: course.category ?? "Featured",
      tags: course.tags ?? [],
      items: course.items.map((item) => ({ ...item, status: item.status ?? "visible" }))
    }))
  };
}

export function getVisibleCourses(): Course[] {
  return getCoursesData().courses
    .filter((course) => course.status !== "hidden")
    .map((course) => ({
      ...course,
      items: course.items.filter((item) => item.status !== "hidden")
    }));
}

export function getAnnouncementData(): AnnouncementData {
  return readJson<AnnouncementData>(STORAGE_KEYS.announcement, defaultAnnouncementData);
}

export function getContactSubmissions(): ContactSubmission[] {
  return readArray<ContactSubmission>(STORAGE_KEYS.contacts, []);
}

export function getSocialLinksData(): SocialLinkData[] {
  return readArray<SocialLinkData>(STORAGE_KEYS.socials, defaultSocialLinksData);
}

export function getCourseCategories(): string[] {
  return readArray<string>(STORAGE_KEYS.categories, defaultCourseCategories);
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, iframe, object, embed, style").forEach((node) => node.remove());
  doc.body.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.toLowerCase();
      if (name.startsWith("on") || value.includes("javascript:")) {
        node.removeAttribute(attribute.name);
      }
    });
  });

  return doc.body.innerHTML;
}

export function readCountMap(key: string): Record<string, number> {
  return readJson<Record<string, number>>(key, {});
}

export function incrementCount(key: string, id: string, amount = 1): void {
  const current = readCountMap(key);
  writeJson(key, { ...current, [id]: (current[id] ?? 0) + amount });
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
