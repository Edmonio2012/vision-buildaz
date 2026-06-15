import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileUp,
  GripVertical,
  Keyboard as KeyboardIcon,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  Plus,
  Save,
  Settings,
  Share2,
  Trash2,
  X
} from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";

import type { ContentItem, Course } from "@/data/courses";
import {
  createId,
  defaultAnnouncementData,
  defaultCoursesData,
  getCourseCategories,
  defaultSocialLinksData,
  getAnnouncementData,
  getContactSubmissions,
  getCoursesData,
  getSocialLinksData,
  STORAGE_KEYS,
  type AnnouncementData,
  type ContactSubmission,
  type CoursesData,
  type SocialLinkData,
  writeJson
} from "@/lib/adminData";

type SectionId = "dashboard" | "classroom" | "analytics" | "announcements" | "contacts" | "social" | "settings";
type ToastType = "success" | "error";
type ConfirmState = { title: string; message: string; action: () => void } | null;

interface ToastState {
  id: number;
  type: ToastType;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  expiresAt?: number;
}

interface AdminAuth {
  authenticated: boolean;
  lastActive: number;
}

const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;
const LOCKOUT_MS = 60 * 1000;
const sections: { id: SectionId; label: string; icon: JSX.Element }[] = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="h-4 w-4" aria-hidden="true" /> },
  { id: "classroom", label: "Classroom", icon: <BookOpen className="h-4 w-4" aria-hidden="true" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" aria-hidden="true" /> },
  { id: "announcements", label: "Announcements", icon: <Megaphone className="h-4 w-4" aria-hidden="true" /> },
  { id: "contacts", label: "Contact & Leads", icon: <Mail className="h-4 w-4" aria-hidden="true" /> },
  { id: "social", label: "Social Media", icon: <Share2 className="h-4 w-4" aria-hidden="true" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" aria-hidden="true" /> }
];

const emptyCourse: Omit<Course, "id" | "items"> = {
  title: "",
  description: "",
  thumbnail: "",
  status: "visible",
  category: "Featured",
  tags: []
};

const emptyItem: Omit<ContentItem, "id"> = {
  type: "video",
  title: "",
  description: "",
  url: "",
  duration: "",
  fileSize: "",
  content: "",
  status: "visible",
  thumbnail: ""
};

const emptySocial: Omit<SocialLinkData, "id"> = {
  label: "",
  href: "",
  icon: "Globe",
  visible: true
};

function readAuth(): boolean {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.adminAuth);
    if (!raw) return false;

    const auth = JSON.parse(raw) as AdminAuth;
    if (!auth.authenticated || Date.now() - auth.lastActive > SESSION_TIMEOUT) {
      sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function saveAuth(): void {
  sessionStorage.setItem(
    STORAGE_KEYS.adminAuth,
    JSON.stringify({ authenticated: true, lastActive: Date.now() } satisfies AdminAuth)
  );
}

function readProgressStats(coursesData: CoursesData): { completed: number; total: number } {
  try {
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) ?? "{}") as Record<string, boolean>;
    const itemIds = coursesData.courses.flatMap((course) => course.items.map((item) => item.id));
    return { completed: itemIds.filter((id) => progress[id]).length, total: itemIds.length };
  } catch {
    return { completed: 0, total: coursesData.courses.flatMap((course) => course.items).length };
  }
}

function downloadFile(filename: string, contents: string, type: string): void {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

export function Admin(): JSX.Element {
  const [isAuthed, setIsAuthed] = useState(() => readAuth());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [coursesData, setCoursesData] = useState<CoursesData>(() => getCoursesData());
  const [announcement, setAnnouncement] = useState<AnnouncementData>(() => getAnnouncementData());
  const [contacts, setContacts] = useState<ContactSubmission[]>(() => getContactSubmissions());
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>(() => getSocialLinksData());
  const [courseCategories, setCourseCategories] = useState<string[]>(() => getCourseCategories());
  const [selectedCourseId, setSelectedCourseId] = useState(() => getCoursesData().courses[0]?.id ?? "");
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState(emptyItem);
  const [socialForm, setSocialForm] = useState(emptySocial);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState("All");
  const [courseTagFilter, setCourseTagFilter] = useState("All");
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [resetText, setResetText] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const selectedCourse = coursesData.courses.find((course) => course.id === selectedCourseId);
  const progressStats = useMemo(() => readProgressStats(coursesData), [coursesData]);
  const unreadCount = contacts.filter((submission) => !submission.read).length;
  const totalItems = coursesData.courses.reduce((sum, course) => sum + course.items.length, 0);
  const allTags = useMemo(
    () => Array.from(new Set(coursesData.courses.flatMap((course) => course.tags ?? []))),
    [coursesData.courses]
  );
  const filteredCourses = useMemo(
    () =>
      coursesData.courses.filter((course) => {
        const search = courseSearch.trim().toLowerCase();
        const searchMatch =
          !search ||
          course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search) ||
          (course.tags ?? []).some((tag) => tag.toLowerCase().includes(search)) ||
          (course.category ?? "").toLowerCase().includes(search);
        const categoryMatch = courseCategoryFilter === "All" || course.category === courseCategoryFilter;
        const tagMatch = courseTagFilter === "All" || (course.tags ?? []).includes(courseTagFilter);
        return searchMatch && categoryMatch && tagMatch;
      }),
    [courseCategoryFilter, courseSearch, courseTagFilter, coursesData.courses]
  );

  useEffect(() => {
    const lockoutUntil = Number(sessionStorage.getItem(STORAGE_KEYS.lockoutUntil) ?? "0");
    const updateLockout = (): void => {
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      setLockoutRemaining(remaining);
    };

    updateLockout();
    const timer = window.setInterval(updateLockout, 1000);
    return () => window.clearInterval(timer);
  }, [loginError]);

  useEffect(() => {
    if (!toast) return;
    if (toast.expiresAt) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isAuthed) return;

    const refreshActivity = (): void => saveAuth();
    const interval = window.setInterval(() => {
      if (!readAuth()) logout();
    }, 30000);

    window.addEventListener("click", refreshActivity);
    window.addEventListener("keydown", refreshActivity);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("click", refreshActivity);
      window.removeEventListener("keydown", refreshActivity);
    };
  }, [isAuthed]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      setConfirmState(null);
      setSelectedSubmission(null);
      setMobileNavOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function showToast(type: ToastType, message: string, options?: Pick<ToastState, "actionLabel" | "onAction" | "expiresAt">): void {
    setToast({ id: Date.now(), type, message, ...options });
  }

  function runAction(action: () => void, successMessage: string): void {
    setIsLoading(true);
    window.setTimeout(() => {
      try {
        action();
        setDirty(false);
        showToast("success", successMessage);
      } catch (error) {
        showToast("error", error instanceof Error ? error.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }, 250);
  }

  function persistCourses(next: CoursesData, message = "Classroom updated."): void {
    runAction(() => {
      writeJson(STORAGE_KEYS.courses, next);
      setCoursesData(next);
      if (!next.courses.some((course) => course.id === selectedCourseId)) {
        setSelectedCourseId(next.courses[0]?.id ?? "");
      }
    }, message);
  }

  function writeCoursesInstant(next: CoursesData, message = "Classroom updated."): void {
    writeJson(STORAGE_KEYS.courses, next);
    setCoursesData(next);
    setDirty(false);
    setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    showToast("success", message);
  }

  function persistCategories(nextCategories: string[]): void {
    const unique = Array.from(new Set(nextCategories.filter(Boolean)));
    writeJson(STORAGE_KEYS.categories, unique);
    setCourseCategories(unique);
  }

  function scheduleDestructiveCourseWrite(next: CoursesData, message: string): void {
    const previous = coursesData;
    setCoursesData(next);
    setConfirmState(null);
    setSelectedCourseIds([]);
    setSelectedItemIds([]);
    const expiresAt = Date.now() + 5000;
    const timer = window.setTimeout(() => {
      writeJson(STORAGE_KEYS.courses, next);
      setToast(null);
    }, 5000);
    showToast("success", message, {
      actionLabel: "Undo",
      expiresAt,
      onAction: () => {
        window.clearTimeout(timer);
        setCoursesData(previous);
        writeJson(STORAGE_KEYS.courses, previous);
        setToast(null);
      }
    });
  }

  function cloneItem(item: ContentItem): ContentItem {
    return { ...item, id: createId("item"), title: `Copy of ${item.title}` };
  }

  function duplicateCourse(courseId: string): void {
    const index = coursesData.courses.findIndex((course) => course.id === courseId);
    if (index < 0) return;
    const original = coursesData.courses[index];
    const copy: Course = {
      ...original,
      id: createId("course"),
      title: `Copy of ${original.title}`,
      items: original.items.map(cloneItem)
    };
    const nextCourses = [...coursesData.courses];
    nextCourses.splice(index + 1, 0, copy);
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, "Course duplicated.");
  }

  function duplicateItem(itemId: string): void {
    if (!selectedCourse) return;
    const index = selectedCourse.items.findIndex((item) => item.id === itemId);
    if (index < 0) return;
    const items = [...selectedCourse.items];
    items.splice(index + 1, 0, cloneItem(selectedCourse.items[index]));
    const nextCourses = coursesData.courses.map((course) =>
      course.id === selectedCourse.id ? { ...course, items } : course
    );
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, "Content item duplicated.");
  }

  function handleCourseDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = coursesData.courses.findIndex((course) => course.id === active.id);
    const newIndex = coursesData.courses.findIndex((course) => course.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    writeCoursesInstant(
      { ...coursesData, courses: arrayMove(coursesData.courses, oldIndex, newIndex) },
      "Course order saved."
    );
  }

  function handleItemDragEnd(event: DragEndEvent): void {
    if (!selectedCourse) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = selectedCourse.items.findIndex((item) => item.id === active.id);
    const newIndex = selectedCourse.items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const nextCourses = coursesData.courses.map((course) =>
      course.id === selectedCourse.id ? { ...course, items: arrayMove(selectedCourse.items, oldIndex, newIndex) } : course
    );
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, "Content order saved.");
  }

  function handleSocialDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = socialLinks.findIndex((link) => link.id === active.id);
    const newIndex = socialLinks.findIndex((link) => link.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(socialLinks, oldIndex, newIndex);
    writeJson(STORAGE_KEYS.socials, next);
    setSocialLinks(next);
    showToast("success", "Social link order saved.");
  }

  function setSelectedCoursesStatus(status: "visible" | "hidden"): void {
    const nextCourses = coursesData.courses.map((course) =>
      selectedCourseIds.includes(course.id) ? { ...course, status } : course
    );
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, `Selected courses ${status === "visible" ? "shown" : "hidden"}.`);
    setSelectedCourseIds([]);
  }

  function setSelectedItemsStatus(status: "visible" | "hidden"): void {
    if (!selectedCourse) return;
    const nextCourses = coursesData.courses.map((course) =>
      course.id === selectedCourse.id
        ? {
            ...course,
            items: course.items.map((item) => (selectedItemIds.includes(item.id) ? { ...item, status } : item))
          }
        : course
    );
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, `Selected content items ${status === "visible" ? "shown" : "hidden"}.`);
    setSelectedItemIds([]);
  }

  function deleteSelectedCourses(): void {
    setConfirmState({
      title: "Delete selected courses?",
      message: `Delete ${selectedCourseIds.length} selected course${selectedCourseIds.length === 1 ? "" : "s"}? You can undo this for 5 seconds.`,
      action: () => {
        scheduleDestructiveCourseWrite(
          { ...coursesData, courses: coursesData.courses.filter((course) => !selectedCourseIds.includes(course.id)) },
          "Courses deleted. Undo?"
        );
      }
    });
  }

  function deleteSelectedItems(): void {
    if (!selectedCourse) return;
    setConfirmState({
      title: "Delete selected content items?",
      message: `Delete ${selectedItemIds.length} selected content item${selectedItemIds.length === 1 ? "" : "s"}? You can undo this for 5 seconds.`,
      action: () => {
        const nextCourses = coursesData.courses.map((course) =>
          course.id === selectedCourse.id
            ? { ...course, items: course.items.filter((item) => !selectedItemIds.includes(item.id)) }
            : course
        );
        scheduleDestructiveCourseWrite({ ...coursesData, courses: nextCourses }, "Content items deleted. Undo?");
      }
    });
  }

  function moveSelectedItems(destinationCourseId: string): void {
    if (!selectedCourse || destinationCourseId === selectedCourse.id || selectedItemIds.length === 0) return;
    const movingItems = selectedCourse.items.filter((item) => selectedItemIds.includes(item.id));
    const nextCourses = coursesData.courses.map((course) => {
      if (course.id === selectedCourse.id) {
        return { ...course, items: course.items.filter((item) => !selectedItemIds.includes(item.id)) };
      }
      if (course.id === destinationCourseId) {
        return { ...course, items: [...course.items, ...movingItems] };
      }
      return course;
    });
    writeCoursesInstant({ ...coursesData, courses: nextCourses }, "Selected content moved.");
    setSelectedItemIds([]);
  }

  function previewCourse(course: Course): void {
    sessionStorage.setItem(STORAGE_KEYS.previewCourse, JSON.stringify(course));
    window.open(`/youreadyletsgrowdigital/${course.id}`, "_blank", "noopener,noreferrer");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (lockoutRemaining > 0) return;
    if (username === adminUsername && password === adminPassword) {
      sessionStorage.removeItem(STORAGE_KEYS.failedAttempts);
      sessionStorage.removeItem(STORAGE_KEYS.lockoutUntil);
      saveAuth();
      setIsAuthed(true);
      setLoginError("");
      return;
    }

    const failedAttempts = Number(sessionStorage.getItem(STORAGE_KEYS.failedAttempts) ?? "0") + 1;
    const lockoutUntil = Date.now() + LOCKOUT_MS;
    sessionStorage.setItem(STORAGE_KEYS.failedAttempts, String(failedAttempts));
    sessionStorage.setItem(STORAGE_KEYS.lockoutUntil, String(lockoutUntil));
    setLockoutRemaining(60);
    setLoginError("Invalid credentials.");
  }

  function logout(): void {
    sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
    setIsAuthed(false);
    setUsername("");
    setPassword("");
  }

  function changeSection(nextSection: SectionId): void {
    if (dirty && !window.confirm("You have unsaved changes. Leave this section?")) return;
    setDirty(false);
    setActiveSection(nextSection);
    setMobileNavOpen(false);
  }

  async function handleCourseThumbnail(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const thumbnail = await fileToDataUrl(file);
      setCourseForm((current) => ({ ...current, thumbnail }));
      setDirty(true);
    } catch {
      showToast("error", "Thumbnail upload failed.");
    }
  }

  async function handleItemFile(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      setItemForm((current) => ({
        ...current,
        url,
        fileSize: file.type.includes("pdf") ? "PDF" : `${Math.max(1, Math.round(file.size / 1024))} KB`
      }));
      setDirty(true);
    } catch {
      showToast("error", "File upload failed.");
    }
  }

  function saveCourse(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      showToast("error", "Course title and description are required.");
      return;
    }

    const nextCourse: Course = {
      id: editingCourseId ?? createId("course"),
      title: courseForm.title.trim(),
      description: courseForm.description.trim(),
      thumbnail: courseForm.thumbnail?.trim(),
      status: courseForm.status,
      category: courseForm.category?.trim() || "Featured",
      tags: typeof courseForm.tags === "string"
        ? String(courseForm.tags).split(",").map((tag) => tag.trim()).filter(Boolean)
        : courseForm.tags ?? [],
      items: editingCourseId
        ? coursesData.courses.find((course) => course.id === editingCourseId)?.items ?? []
        : []
    };
    const nextCourses = editingCourseId
      ? coursesData.courses.map((course) => (course.id === editingCourseId ? nextCourse : course))
      : [...coursesData.courses, nextCourse];

    persistCourses({ ...coursesData, courses: nextCourses }, editingCourseId ? "Course saved." : "Course created.");
    persistCategories([...courseCategories, nextCourse.category ?? "Featured"]);
    setEditingCourseId(null);
    setCourseForm(emptyCourse);
    setSelectedCourseId(nextCourse.id);
  }

  function editCourse(course: Course): void {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail ?? "",
      status: course.status ?? "visible",
      category: course.category ?? "Featured",
      tags: course.tags ?? []
    });
  }

  function moveCourse(courseId: string, direction: -1 | 1): void {
    const index = coursesData.courses.findIndex((course) => course.id === courseId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= coursesData.courses.length) return;
    const next = [...coursesData.courses];
    [next[index], next[target]] = [next[target], next[index]];
    persistCourses({ ...coursesData, courses: next }, "Course order updated.");
  }

  function saveItem(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!selectedCourse) {
      showToast("error", "Select a course before adding content.");
      return;
    }
    if (!itemForm.title.trim()) {
      showToast("error", "Content title is required.");
      return;
    }
    if ((itemForm.type === "video" || itemForm.type === "link" || itemForm.type === "pdf") && !itemForm.url?.trim()) {
      showToast("error", "A URL or uploaded file is required for this content type.");
      return;
    }
    if (itemForm.type === "text" && !itemForm.content?.trim()) {
      showToast("error", "Text content is required.");
      return;
    }

    const nextItem: ContentItem = {
      id: editingItemId ?? createId("item"),
      type: itemForm.type,
      title: itemForm.title.trim(),
      description: itemForm.description?.trim(),
      url: itemForm.url?.trim(),
      duration: itemForm.duration?.trim(),
      fileSize: itemForm.fileSize?.trim(),
      content: itemForm.content?.trim(),
      status: itemForm.status ?? "visible",
      thumbnail: itemForm.thumbnail?.trim()
    };

    const nextCourses = coursesData.courses.map((course) => {
      if (course.id !== selectedCourse.id) return course;
      const items = editingItemId
        ? course.items.map((item) => (item.id === editingItemId ? nextItem : item))
        : [...course.items, nextItem];
      return { ...course, items };
    });

    persistCourses({ ...coursesData, courses: nextCourses }, editingItemId ? "Content item saved." : "Content item added.");
    setEditingItemId(null);
    setItemForm(emptyItem);
  }

  function editItem(item: ContentItem): void {
    setEditingItemId(item.id);
    setItemForm({
      type: item.type,
      title: item.title,
      description: item.description ?? "",
      url: item.url ?? "",
      duration: item.duration ?? "",
      fileSize: item.fileSize ?? "",
      content: item.content ?? "",
      status: item.status ?? "visible",
      thumbnail: item.thumbnail ?? ""
    });
  }

  function moveItem(itemId: string, direction: -1 | 1): void {
    if (!selectedCourse) return;
    const index = selectedCourse.items.findIndex((item) => item.id === itemId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= selectedCourse.items.length) return;
    const items = [...selectedCourse.items];
    [items[index], items[target]] = [items[target], items[index]];
    const nextCourses = coursesData.courses.map((course) =>
      course.id === selectedCourse.id ? { ...course, items } : course
    );
    persistCourses({ ...coursesData, courses: nextCourses }, "Content order updated.");
  }

  function saveAnnouncement(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!announcement.headline.trim() || !announcement.body.trim()) {
      showToast("error", "Announcement headline and body are required.");
      return;
    }

    runAction(() => {
      writeJson(STORAGE_KEYS.announcement, announcement);
    }, "Announcement published.");
  }

  function updateContacts(nextContacts: ContactSubmission[], message: string): void {
    runAction(() => {
      writeJson(STORAGE_KEYS.contacts, nextContacts);
      setContacts(nextContacts);
    }, message);
  }

  function saveSocial(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!socialForm.label.trim() || !socialForm.href.trim()) {
      showToast("error", "Social platform name and URL are required.");
      return;
    }

    const nextLink: SocialLinkData = {
      id: editingSocialId ?? createId("social"),
      label: socialForm.label.trim(),
      href: socialForm.href.trim(),
      icon: socialForm.icon,
      visible: socialForm.visible
    };
    const nextLinks = editingSocialId
      ? socialLinks.map((link) => (link.id === editingSocialId ? nextLink : link))
      : [...socialLinks, nextLink];

    runAction(() => {
      writeJson(STORAGE_KEYS.socials, nextLinks);
      setSocialLinks(nextLinks);
      setSocialForm(emptySocial);
      setEditingSocialId(null);
    }, editingSocialId ? "Social link saved." : "Social link added.");
  }

  function moveSocial(id: string, direction: -1 | 1): void {
    const index = socialLinks.findIndex((link) => link.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= socialLinks.length) return;
    const next = [...socialLinks];
    [next[index], next[target]] = [next[target], next[index]];
    runAction(() => {
      writeJson(STORAGE_KEYS.socials, next);
      setSocialLinks(next);
    }, "Social link order updated.");
  }

  function exportContactsCsv(): void {
    const rows = [
      ["Name", "Email", "Phone", "Message", "Date Submitted", "Status"].join(","),
      ...contacts.map((item) =>
        [
          csvEscape(item.name),
          csvEscape(item.email),
          csvEscape(item.phone),
          csvEscape(item.message),
          csvEscape(new Date(item.submittedAt).toLocaleString()),
          csvEscape(item.read ? "Read" : "Unread")
        ].join(",")
      )
    ];
    downloadFile("contact-submissions.csv", rows.join("\n"), "text/csv;charset=utf-8");
    showToast("success", "CSV exported.");
  }

  function exportAllData(): void {
    downloadFile(
      "vision-buildaz-data.json",
      JSON.stringify({ coursesData, announcement, socialLinks }, null, 2),
      "application/json;charset=utf-8"
    );
    showToast("success", "Website data exported.");
  }

  async function importAllData(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as {
        coursesData?: CoursesData;
        announcement?: AnnouncementData;
        socialLinks?: SocialLinkData[];
      };
      if (!parsed.coursesData?.courses || !parsed.announcement || !Array.isArray(parsed.socialLinks)) {
        throw new Error("The JSON file does not match the expected admin data format.");
      }
      runAction(() => {
        writeJson(STORAGE_KEYS.courses, parsed.coursesData);
        writeJson(STORAGE_KEYS.announcement, parsed.announcement);
        writeJson(STORAGE_KEYS.socials, parsed.socialLinks);
        setCoursesData(parsed.coursesData);
        setAnnouncement(parsed.announcement);
        setSocialLinks(parsed.socialLinks);
      }, "Website data imported.");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Import failed.");
    } finally {
      event.target.value = "";
    }
  }

  function resetAllData(): void {
    if (resetText !== "RESET") {
      showToast("error", 'Type "RESET" before resetting data.');
      return;
    }

    setConfirmState({
      title: "Reset all admin data?",
      message: "This clears all admin-managed localStorage data and restores the built-in defaults.",
      action: () => {
        [
          STORAGE_KEYS.courses,
          STORAGE_KEYS.announcement,
          STORAGE_KEYS.contacts,
          STORAGE_KEYS.socials,
          STORAGE_KEYS.progress
        ].forEach((key) => localStorage.removeItem(key));
        setCoursesData(defaultCoursesData);
        setAnnouncement(defaultAnnouncementData);
        setContacts([]);
        setSocialLinks(defaultSocialLinksData);
        setResetText("");
        setConfirmState(null);
        showToast("success", "Admin data reset to defaults.");
      }
    });
  }

  if (!isAuthed) {
    const locked = lockoutRemaining > 0;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1026] px-5 text-white">
        <form
          className="flex w-full max-w-[440px] flex-col gap-5 border border-[#a4890b]/40 bg-[#121936] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-8"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#d8b168]">Protected Admin</p>
            <h1 className="[font-family:'Trirong',serif] text-[34px] font-bold italic leading-tight">
              Vision Buildaz Control Panel
            </h1>
          </div>

          {locked ? (
            <p className="border border-[#d8b168]/45 bg-[#d8b168]/10 p-3 text-[14px] text-[#ffe8aa]">
              Too many attempts. Try again in 00:{String(lockoutRemaining).padStart(2, "0")}
            </p>
          ) : loginError ? (
            <p className="border border-red-300/40 bg-red-500/10 p-3 text-[14px] text-red-100">{loginError}</p>
          ) : null}

          <label className="flex flex-col gap-2 text-[14px] font-semibold text-[#f8f1dc]">
            Username
            <input
              className="h-12 border border-white/15 bg-white/10 px-3 text-white outline-none focus:border-[#d8b168]"
              disabled={locked}
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </label>
          <label className="flex flex-col gap-2 text-[14px] font-semibold text-[#f8f1dc]">
            Password
            <input
              className="h-12 border border-white/15 bg-white/10 px-3 text-white outline-none focus:border-[#d8b168]"
              disabled={locked}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
          <button
            className="flex h-12 items-center justify-center bg-[#a4890b] px-4 font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#927904] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={locked || !username || !password}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </main>
    );
  }

  const nav = (
    <nav className="flex flex-col gap-2">
      {sections.map((section) => (
        <button
          className={`flex min-h-11 items-center gap-3 px-4 text-left text-[14px] font-semibold transition ${
            activeSection === section.id
              ? "bg-[#a4890b] text-white"
              : "text-[#e9e3d1] hover:bg-white/10 hover:text-white"
          }`}
          key={section.id}
          onClick={() => changeSection(section.id)}
          type="button"
        >
          {section.icon}
          {section.label}
        </button>
      ))}
    </nav>
  );

  return (
    <main className="min-h-screen bg-[#0b1026] text-white">
      {toast ? (
        <div
          className={`fixed right-4 top-4 z-[90] border px-4 py-3 text-[14px] shadow-[0_18px_44px_rgba(0,0,0,0.28)] ${
            toast.type === "success"
              ? "border-[#d8b168]/60 bg-[#17213f] text-[#ffe8aa]"
              : "border-red-300/50 bg-red-950 text-red-100"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-[#111832] p-5 lg:block">
          <div className="mb-8 flex flex-col gap-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#d8b168]">Admin</p>
            <h1 className="[font-family:'Trirong',serif] text-[28px] font-bold italic">Vision Buildaz</h1>
          </div>
          {nav}
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-white/10 bg-[#0b1026]/95 px-4 backdrop-blur sm:px-6">
            <button
              aria-label="Open admin menu"
              className="flex h-10 w-10 items-center justify-center border border-white/15 lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#d8b168]">
                {sections.find((section) => section.id === activeSection)?.label}
              </p>
              <h2 className="[font-family:'Trirong',serif] text-[24px] font-bold italic sm:text-[30px]">
                Website Admin Panel
              </h2>
            </div>
            <button
              className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-3 text-[13px] font-semibold text-[#f8f1dc] transition hover:border-[#d8b168]"
              onClick={logout}
              type="button"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </header>

          {mobileNavOpen ? (
            <div className="fixed inset-0 z-50 bg-black/60 lg:hidden">
              <div className="h-full w-[min(310px,86vw)] bg-[#111832] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-bold text-[#d8b168]">Menu</p>
                  <button aria-label="Close menu" onClick={() => setMobileNavOpen(false)} type="button">
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {nav}
              </div>
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
            {activeSection === "dashboard" ? (
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {[
                  { label: "Total Courses", value: coursesData.courses.length },
                  { label: "Content Items", value: totalItems },
                  { label: "Submissions", value: contacts.length },
                  { label: "Unread", value: unreadCount },
                  { label: "Banner", value: announcement.active ? "Active" : "Inactive" }
                ].map((stat) => (
                  <div className="border border-[#d8b168]/45 bg-[#151d3a] p-5" key={stat.label}>
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#d8b168]">{stat.label}</p>
                    <p className="mt-3 [font-family:'Trirong',serif] text-[32px] font-bold text-white">{stat.value}</p>
                  </div>
                ))}
                <div className="border border-white/10 bg-[#111832] p-5 md:col-span-2 xl:col-span-5">
                  <p className="text-[#f8f1dc]">
                    Student progress: {progressStats.completed}/{progressStats.total} content items completed in this browser.
                  </p>
                </div>
              </section>
            ) : null}

            {activeSection === "classroom" ? (
              <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                <div className="flex flex-col gap-6">
                  <Panel title="Hero Banner">
                    <div className="grid gap-4">
                      <Input
                        label="Headline"
                        onChange={(value) => {
                          setCoursesData({ ...coursesData, hero: { ...coursesData.hero, headline: value } });
                          setDirty(true);
                        }}
                        value={coursesData.hero.headline}
                      />
                      <Textarea
                        label="Subtext"
                        onChange={(value) => {
                          setCoursesData({ ...coursesData, hero: { ...coursesData.hero, subtext: value } });
                          setDirty(true);
                        }}
                        value={coursesData.hero.subtext}
                      />
                      <ActionButton
                        icon={<Save className="h-4 w-4" aria-hidden="true" />}
                        loading={isLoading}
                        onClick={() => persistCourses(coursesData, "Hero banner saved.")}
                      >
                        Save Hero
                      </ActionButton>
                    </div>
                  </Panel>

                  <Panel title="Courses">
                    <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
                      <Input label="Search courses" onChange={setCourseSearch} value={courseSearch} />
                      <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                        Category
                        <select className="h-11 border border-white/15 bg-[#0b1026] px-3" onChange={(event) => setCourseCategoryFilter(event.target.value)} value={courseCategoryFilter}>
                          {["All", ...courseCategories].map((category) => <option key={category} value={category}>{category}</option>)}
                        </select>
                      </label>
                      <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                        Tag
                        <select className="h-11 border border-white/15 bg-[#0b1026] px-3" onChange={(event) => setCourseTagFilter(event.target.value)} value={courseTagFilter}>
                          {["All", ...allTags].map((tag) => <option key={tag} value={tag}>{tag}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="mb-3 flex items-center gap-3 text-[13px] font-semibold text-[#f8f1dc]">
                      <input
                        checked={filteredCourses.length > 0 && filteredCourses.every((course) => selectedCourseIds.includes(course.id))}
                        onChange={(event) =>
                          setSelectedCourseIds(event.target.checked ? filteredCourses.map((course) => course.id) : [])
                        }
                        type="checkbox"
                      />
                      Select All
                    </label>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleCourseDragEnd} sensors={sensors}>
                      <SortableContext items={coursesData.courses.map((course) => course.id)} strategy={verticalListSortingStrategy}>
                        <div className="flex flex-col gap-3">
                          {filteredCourses.map((course) => (
                            <SortableAdminItem id={course.id} key={course.id}>
                              <div className={`flex flex-col gap-3 border border-white/10 bg-white/5 p-4 transition md:flex-row md:items-center md:justify-between ${course.status === "hidden" ? "opacity-55" : ""}`}>
                                <div className="flex items-start gap-3">
                                  <DragHandle />
                                  <input
                                    checked={selectedCourseIds.includes(course.id)}
                                    className="mt-1"
                                    onChange={(event) =>
                                      setSelectedCourseIds((current) =>
                                        event.target.checked
                                          ? [...current, course.id]
                                          : current.filter((id) => id !== course.id)
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <div>
                                    <p className="font-semibold">{course.title}</p>
                                    <p className="text-[13px] text-[#d8b168]">
                                      {course.category ?? "Featured"} · {course.items.length} items · {course.status ?? "visible"}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {(course.tags ?? []).map((tag) => (
                                        <span className="rounded-full bg-[#a4890b]/20 px-2 py-1 text-[11px] text-[#ffe8aa]" key={tag}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <IconButton label="Select" onClick={() => setSelectedCourseId(course.id)} icon={<Eye />} />
                                  <IconButton label="Preview" onClick={() => previewCourse(course)} icon={<ExternalLink />} />
                                  <IconButton label="Edit" onClick={() => editCourse(course)} icon={<Save />} />
                                  <IconButton label="Duplicate" onClick={() => duplicateCourse(course.id)} icon={<Copy />} />
                                  <IconButton
                                    label="Delete"
                                    onClick={() =>
                                      setConfirmState({
                                        title: "Delete course?",
                                        message: `Delete "${course.title}" and every content item inside it? You can undo this for 5 seconds.`,
                                        action: () => {
                                          scheduleDestructiveCourseWrite(
                                            {
                                              ...coursesData,
                                              courses: coursesData.courses.filter((item) => item.id !== course.id)
                                            },
                                            "Course deleted. Undo?"
                                          );
                                        }
                                      })
                                    }
                                    icon={<Trash2 />}
                                  />
                                </div>
                              </div>
                            </SortableAdminItem>
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                    {selectedCourseIds.length > 0 ? (
                      <BulkBar>
                        <span>{selectedCourseIds.length} selected</span>
                        <button onClick={() => setSelectedCoursesStatus("hidden")} type="button">Bulk Hide</button>
                        <button onClick={() => setSelectedCoursesStatus("visible")} type="button">Bulk Show</button>
                        <button onClick={deleteSelectedCourses} type="button">Bulk Delete</button>
                      </BulkBar>
                    ) : null}
                  </Panel>

                  <Panel title={`Content Items${selectedCourse ? `: ${selectedCourse.title}` : ""}`}>
                    <select
                      className="mb-4 h-11 w-full border border-white/15 bg-[#0b1026] px-3"
                      onChange={(event) => setSelectedCourseId(event.target.value)}
                      value={selectedCourseId}
                    >
                      {coursesData.courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 text-[13px] font-semibold text-[#f8f1dc]">
                        <input
                          checked={Boolean(selectedCourse?.items.length) && selectedCourse?.items.every((item) => selectedItemIds.includes(item.id))}
                          onChange={(event) =>
                            setSelectedItemIds(event.target.checked && selectedCourse ? selectedCourse.items.map((item) => item.id) : [])
                          }
                          type="checkbox"
                        />
                        Select All
                      </label>
                      {selectedCourse?.items.length ? (
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleItemDragEnd} sensors={sensors}>
                          <SortableContext items={selectedCourse.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            {selectedCourse.items.map((item) => (
                              <SortableAdminItem id={item.id} key={item.id}>
                                <div className={`flex flex-col gap-3 border border-white/10 bg-white/5 p-4 transition md:flex-row md:items-center md:justify-between ${item.status === "hidden" ? "opacity-55" : ""}`}>
                                  <div className="flex items-start gap-3">
                                    <DragHandle />
                                    <input
                                      checked={selectedItemIds.includes(item.id)}
                                      className="mt-1"
                                      onChange={(event) =>
                                        setSelectedItemIds((current) =>
                                          event.target.checked
                                            ? [...current, item.id]
                                            : current.filter((id) => id !== item.id)
                                        )
                                      }
                                      type="checkbox"
                                    />
                                    <div>
                                      <p className="font-semibold">{item.title}</p>
                                      <p className="text-[13px] uppercase tracking-[0.12em] text-[#d8b168]">
                                        {item.type} {item.status === "hidden" ? "· Hidden" : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <IconButton label="Edit" onClick={() => editItem(item)} icon={<Save />} />
                                    <IconButton
                                      label={item.status === "hidden" ? "Show" : "Hide"}
                                      onClick={() => {
                                        const nextCourses = coursesData.courses.map((course) =>
                                          course.id === selectedCourse.id
                                            ? {
                                                ...course,
                                                items: course.items.map((content) =>
                                                  content.id === item.id
                                                    ? { ...content, status: content.status === "hidden" ? "visible" : "hidden" }
                                                    : content
                                                )
                                              }
                                            : course
                                        );
                                        writeCoursesInstant({ ...coursesData, courses: nextCourses }, item.status === "hidden" ? "Content item shown." : "Content item hidden.");
                                      }}
                                      icon={item.status === "hidden" ? <Eye /> : <EyeOff />}
                                    />
                                    <IconButton label="Duplicate" onClick={() => duplicateItem(item.id)} icon={<Copy />} />
                                    <IconButton
                                      label="Delete"
                                      onClick={() =>
                                        setConfirmState({
                                          title: "Delete content item?",
                                          message: `Delete "${item.title}" from this course? You can undo this for 5 seconds.`,
                                          action: () => {
                                            const nextCourses = coursesData.courses.map((course) =>
                                              course.id === selectedCourse.id
                                                ? { ...course, items: course.items.filter((content) => content.id !== item.id) }
                                                : course
                                            );
                                            scheduleDestructiveCourseWrite({ ...coursesData, courses: nextCourses }, "Content item deleted. Undo?");
                                          }
                                        })
                                      }
                                      icon={<Trash2 />}
                                    />
                                  </div>
                                </div>
                              </SortableAdminItem>
                            ))}
                          </SortableContext>
                        </DndContext>
                      ) : (
                        <EmptyState message="No content items yet. Add a lesson, PDF, link, or note." />
                      )}
                    </div>
                    {selectedItemIds.length > 0 ? (
                      <BulkBar>
                        <span>{selectedItemIds.length} selected</span>
                        <button onClick={() => setSelectedItemsStatus("hidden")} type="button">Bulk Hide</button>
                        <button onClick={() => setSelectedItemsStatus("visible")} type="button">Bulk Show</button>
                        <button onClick={deleteSelectedItems} type="button">Bulk Delete</button>
                        <select
                          className="h-9 border border-white/15 bg-[#0b1026] px-2"
                          onChange={(event) => {
                            moveSelectedItems(event.target.value);
                            event.target.value = "";
                          }}
                          value=""
                        >
                          <option value="">Move to course...</option>
                          {coursesData.courses
                            .filter((course) => course.id !== selectedCourse?.id)
                            .map((course) => (
                              <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                      </BulkBar>
                    ) : null}
                  </Panel>

                  <Panel title="Progress">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[#f8f1dc]">
                        {progressStats.completed}/{progressStats.total} content items are marked complete in this browser.
                      </p>
                      <ActionButton
                        icon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
                        loading={isLoading}
                        onClick={() =>
                          setConfirmState({
                            title: "Reset all progress?",
                            message: "This clears the yrlgd_progress localStorage key.",
                            action: () => {
                              localStorage.removeItem(STORAGE_KEYS.progress);
                              setConfirmState(null);
                              showToast("success", "Progress reset.");
                            }
                          })
                        }
                      >
                        Reset Progress
                      </ActionButton>
                    </div>
                  </Panel>
                </div>

                <div className="flex flex-col gap-6">
                  <Panel title={editingCourseId ? "Edit Course" : "Create Course"}>
                    <form className="grid gap-4" onSubmit={saveCourse}>
                      <Input label="Title" onChange={(value) => { setCourseForm({ ...courseForm, title: value }); setDirty(true); }} value={courseForm.title} />
                      <Textarea label="Description" onChange={(value) => { setCourseForm({ ...courseForm, description: value }); setDirty(true); }} value={courseForm.description} />
                      <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                        Thumbnail Upload
                        <input accept="image/*" className="text-[13px]" onChange={handleCourseThumbnail} type="file" />
                      </label>
                      <Input label="Thumbnail URL" onChange={(value) => { setCourseForm({ ...courseForm, thumbnail: value }); setDirty(true); }} value={courseForm.thumbnail ?? ""} />
                      <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                        Status
                        <select
                          className="h-11 border border-white/15 bg-[#0b1026] px-3"
                          onChange={(event) => { setCourseForm({ ...courseForm, status: event.target.value as Course["status"] }); setDirty(true); }}
                          value={courseForm.status}
                        >
                          <option value="visible">Visible</option>
                          <option value="hidden">Hidden</option>
                        </select>
                      </label>
                      <ActionButton icon={<Plus className="h-4 w-4" aria-hidden="true" />} loading={isLoading}>
                        {editingCourseId ? "Save Course" : "Create Course"}
                      </ActionButton>
                    </form>
                  </Panel>

                  <Panel title={editingItemId ? "Edit Content Item" : "Add Content Item"}>
                    <form className="grid gap-4" onSubmit={saveItem}>
                      <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                        Type
                        <select
                          className="h-11 border border-white/15 bg-[#0b1026] px-3"
                          onChange={(event) => { setItemForm({ ...itemForm, type: event.target.value as ContentItem["type"] }); setDirty(true); }}
                          value={itemForm.type}
                        >
                          <option value="video">Video</option>
                          <option value="pdf">PDF</option>
                          <option value="link">Link</option>
                          <option value="text">Text / Note</option>
                        </select>
                      </label>
                      <Input label="Title" onChange={(value) => { setItemForm({ ...itemForm, title: value }); setDirty(true); }} value={itemForm.title} />
                      {itemForm.type === "text" ? (
                        <Textarea label="Content" onChange={(value) => { setItemForm({ ...itemForm, content: value }); setDirty(true); }} value={itemForm.content ?? ""} />
                      ) : (
                        <>
                          {itemForm.type === "pdf" ? (
                            <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                              PDF Upload
                              <input accept="application/pdf" className="text-[13px]" onChange={handleItemFile} type="file" />
                            </label>
                          ) : null}
                          <Input label={itemForm.type === "pdf" ? "File URL" : "URL"} onChange={(value) => { setItemForm({ ...itemForm, url: value }); setDirty(true); }} value={itemForm.url ?? ""} />
                          {itemForm.type === "video" ? (
                            <Input label="Duration" onChange={(value) => { setItemForm({ ...itemForm, duration: value }); setDirty(true); }} value={itemForm.duration ?? ""} />
                          ) : null}
                        </>
                      )}
                      <Textarea label="Description" onChange={(value) => { setItemForm({ ...itemForm, description: value }); setDirty(true); }} value={itemForm.description ?? ""} />
                      <ActionButton icon={<Plus className="h-4 w-4" aria-hidden="true" />} loading={isLoading}>
                        {editingItemId ? "Save Item" : "Add Item"}
                      </ActionButton>
                    </form>
                  </Panel>
                </div>
              </section>
            ) : null}

            {activeSection === "announcements" ? (
              <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                <Panel title="Announcement Banner">
                  <form className="grid gap-4" onSubmit={saveAnnouncement}>
                    <label className="flex items-center gap-3 text-[14px] font-semibold text-[#f8f1dc]">
                      <input
                        checked={announcement.active}
                        onChange={(event) => { setAnnouncement({ ...announcement, active: event.target.checked }); setDirty(true); }}
                        type="checkbox"
                      />
                      Banner active
                    </label>
                    <Input label="Headline" onChange={(value) => { setAnnouncement({ ...announcement, headline: value }); setDirty(true); }} value={announcement.headline} />
                    <Textarea label="Body Message" onChange={(value) => { setAnnouncement({ ...announcement, body: value }); setDirty(true); }} value={announcement.body} />
                    <Input label="CTA Button Text" onChange={(value) => { setAnnouncement({ ...announcement, ctaText: value }); setDirty(true); }} value={announcement.ctaText} />
                    <Input label="CTA Button Link" onChange={(value) => { setAnnouncement({ ...announcement, ctaLink: value }); setDirty(true); }} value={announcement.ctaLink} />
                    <ActionButton icon={<Save className="h-4 w-4" aria-hidden="true" />} loading={isLoading}>
                      Publish Changes
                    </ActionButton>
                  </form>
                </Panel>
                <Panel title="Preview">
                  <div className="bg-white p-6 text-black">
                    <p className="[font-family:'Poppins',sans-serif] text-[24px] font-semibold leading-tight">{announcement.headline}</p>
                    <p className="mt-4 text-[15px] leading-6">{announcement.body}</p>
                    <a className="mt-5 inline-flex min-h-11 items-center bg-[#2f3d48] px-5 font-semibold text-white" href={announcement.ctaLink}>
                      {announcement.ctaText}
                    </a>
                  </div>
                </Panel>
              </section>
            ) : null}

            {activeSection === "contacts" ? (
              <Panel title="Contact & Leads">
                <div className="mb-4 flex justify-end">
                  <ActionButton icon={<Download className="h-4 w-4" aria-hidden="true" />} loading={false} onClick={exportContactsCsv}>
                    Export CSV
                  </ActionButton>
                </div>
                {contacts.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] border-collapse text-left text-[14px]">
                      <thead className="bg-white/5 text-[#d8b168]">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Message</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((submission) => (
                          <tr className="border-t border-white/10" key={submission.id}>
                            <td className="p-3">{submission.name}</td>
                            <td className="p-3">{submission.email}</td>
                            <td className="p-3">{submission.phone || "-"}</td>
                            <td className="max-w-[220px] truncate p-3">{submission.message}</td>
                            <td className="p-3">{new Date(submission.submittedAt).toLocaleString()}</td>
                            <td className="p-3">{submission.read ? "Read" : "Unread"}</td>
                            <td className="flex flex-wrap gap-2 p-3">
                              <IconButton label="View" onClick={() => setSelectedSubmission(submission)} icon={<Eye />} />
                              <IconButton
                                label={submission.read ? "Mark unread" : "Mark read"}
                                onClick={() =>
                                  updateContacts(
                                    contacts.map((item) =>
                                      item.id === submission.id ? { ...item, read: !item.read } : item
                                    ),
                                    submission.read ? "Marked unread." : "Marked read."
                                  )
                                }
                                icon={submission.read ? <EyeOff /> : <Eye />}
                              />
                              <IconButton
                                label="Delete"
                                onClick={() =>
                                  setConfirmState({
                                    title: "Delete submission?",
                                    message: `Delete the submission from ${submission.email}?`,
                                    action: () => {
                                      updateContacts(
                                        contacts.filter((item) => item.id !== submission.id),
                                        "Submission deleted."
                                      );
                                      setConfirmState(null);
                                    }
                                  })
                                }
                                icon={<Trash2 />}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState message="No contact submissions yet. New website submissions will appear here." />
                )}
              </Panel>
            ) : null}

            {activeSection === "social" ? (
              <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                <Panel title="Social Platforms">
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleSocialDragEnd} sensors={sensors}>
                    <SortableContext items={socialLinks.map((link) => link.id)} strategy={verticalListSortingStrategy}>
                      <div className="flex flex-col gap-3">
                        {socialLinks.map((link) => (
                          <SortableAdminItem id={link.id} key={link.id}>
                            <div className="flex flex-col gap-3 border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                              <div className="flex items-start gap-3">
                                <DragHandle />
                                <div>
                                  <p className="font-semibold">{link.label}</p>
                                  <p className="break-all text-[13px] text-[#d8b168]">{link.href}</p>
                                  <p className="text-[12px] uppercase tracking-[0.12em] text-[#f8f1dc]/70">{link.visible ? "Visible" : "Hidden"}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <IconButton
                                  label="Edit"
                                  onClick={() => {
                                    setEditingSocialId(link.id);
                                    setSocialForm({ label: link.label, href: link.href, icon: link.icon, visible: link.visible });
                                  }}
                                  icon={<Save />}
                                />
                                <IconButton
                                  label={link.visible ? "Hide" : "Show"}
                                  onClick={() => {
                                    const next = socialLinks.map((item) =>
                                      item.id === link.id ? { ...item, visible: !item.visible } : item
                                    );
                                    runAction(() => {
                                      writeJson(STORAGE_KEYS.socials, next);
                                      setSocialLinks(next);
                                    }, link.visible ? "Platform hidden." : "Platform visible.");
                                  }}
                                  icon={link.visible ? <EyeOff /> : <Eye />}
                                />
                                <IconButton
                                  label="Delete"
                                  onClick={() =>
                                    setConfirmState({
                                      title: "Delete social platform?",
                                      message: `Delete ${link.label}?`,
                                      action: () => {
                                        const next = socialLinks.filter((item) => item.id !== link.id);
                                        runAction(() => {
                                          writeJson(STORAGE_KEYS.socials, next);
                                          setSocialLinks(next);
                                        }, "Social platform deleted.");
                                        setConfirmState(null);
                                      }
                                    })
                                  }
                                  icon={<Trash2 />}
                                />
                              </div>
                            </div>
                          </SortableAdminItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </Panel>
                <Panel title={editingSocialId ? "Edit Platform" : "Add Platform"}>
                  <form className="grid gap-4" onSubmit={saveSocial}>
                    <Input label="Name" onChange={(value) => { setSocialForm({ ...socialForm, label: value }); setDirty(true); }} value={socialForm.label} />
                    <Input label="URL" onChange={(value) => { setSocialForm({ ...socialForm, href: value }); setDirty(true); }} value={socialForm.href} />
                    <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
                      Icon
                      <select
                        className="h-11 border border-white/15 bg-[#0b1026] px-3"
                        onChange={(event) => { setSocialForm({ ...socialForm, icon: event.target.value as SocialLinkData["icon"] }); setDirty(true); }}
                        value={socialForm.icon}
                      >
                        {["TikTok", "Instagram", "YouTube", "Facebook", "LinkedIn", "Globe"].map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-center gap-3 text-[14px] font-semibold text-[#f8f1dc]">
                      <input
                        checked={socialForm.visible}
                        onChange={(event) => { setSocialForm({ ...socialForm, visible: event.target.checked }); setDirty(true); }}
                        type="checkbox"
                      />
                      Visible
                    </label>
                    <ActionButton icon={<Plus className="h-4 w-4" aria-hidden="true" />} loading={isLoading}>
                      {editingSocialId ? "Save Platform" : "Add Platform"}
                    </ActionButton>
                  </form>
                </Panel>
              </section>
            ) : null}

            {activeSection === "settings" ? (
              <section className="grid gap-6 xl:grid-cols-2">
                <Panel title="Admin Password">
                  <p className="text-[#f8f1dc]">
                    To change the admin password, update <code>VITE_ADMIN_PASSWORD</code> in <code>.env</code>, rebuild, and redeploy the site.
                  </p>
                </Panel>
                <Panel title="Website Data">
                  <div className="flex flex-col gap-4">
                    <ActionButton icon={<Download className="h-4 w-4" aria-hidden="true" />} loading={false} onClick={exportAllData}>
                      Export JSON
                    </ActionButton>
                    <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#a4890b] px-4 text-[14px] font-bold uppercase tracking-[0.08em] text-white">
                      <FileUp className="h-4 w-4" aria-hidden="true" />
                      Import JSON
                      <input accept="application/json" className="hidden" onChange={importAllData} type="file" />
                    </label>
                    <div className="border border-red-300/30 bg-red-950/20 p-4">
                      <p className="mb-3 flex items-center gap-2 font-semibold text-red-100">
                        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                        Reset all data to defaults
                      </p>
                      <Input label='Type "RESET" to confirm' onChange={setResetText} value={resetText} />
                      <div className="mt-3">
                        <ActionButton icon={<Trash2 className="h-4 w-4" aria-hidden="true" />} loading={false} onClick={resetAllData}>
                          Reset All Data
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </Panel>
              </section>
            ) : null}
          </div>
        </section>
      </div>

      {selectedSubmission ? (
        <Modal title="Submission Details" onClose={() => setSelectedSubmission(null)}>
          <div className="grid gap-3 text-[#f8f1dc]">
            <p><strong>Name:</strong> {selectedSubmission.name}</p>
            <p><strong>Email:</strong> {selectedSubmission.email}</p>
            <p><strong>Phone:</strong> {selectedSubmission.phone || "-"}</p>
            <p><strong>Date:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
            <p className="whitespace-pre-wrap"><strong>Message:</strong> {selectedSubmission.message}</p>
          </div>
        </Modal>
      ) : null}

      {confirmState ? (
        <Modal title={confirmState.title} onClose={() => setConfirmState(null)}>
          <p className="text-[#f8f1dc]">{confirmState.message}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button className="min-h-11 border border-white/15 px-4" onClick={() => setConfirmState(null)} type="button">
              Cancel
            </button>
            <button className="min-h-11 bg-red-700 px-4 font-semibold text-white" onClick={confirmState.action} type="button">
              Confirm
            </button>
          </div>
        </Modal>
      ) : null}
    </main>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }): JSX.Element {
  return (
    <section className="border border-white/10 bg-[#111832] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
      <h3 className="mb-5 [font-family:'Trirong',serif] text-[24px] font-bold italic text-white">{title}</h3>
      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
      {label}
      <input
        className="h-11 border border-white/15 bg-[#0b1026] px-3 text-white outline-none focus:border-[#d8b168]"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}): JSX.Element {
  return (
    <label className="grid gap-2 text-[13px] font-semibold text-[#f8f1dc]">
      {label}
      <textarea
        className="min-h-[112px] resize-y border border-white/15 bg-[#0b1026] px-3 py-3 text-white outline-none focus:border-[#d8b168]"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function ActionButton({
  children,
  icon,
  loading,
  onClick
}: {
  children: ReactNode;
  icon: JSX.Element;
  loading: boolean;
  onClick?: () => void;
}): JSX.Element {
  return (
    <button
      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#a4890b] px-4 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#927904] disabled:opacity-60"
      disabled={loading}
      onClick={onClick}
      type={onClick ? "button" : "submit"}
    >
      {icon}
      {loading ? "Working..." : children}
    </button>
  );
}

function IconButton({ label, icon, onClick }: { label: string; icon: JSX.Element; onClick: () => void }): JSX.Element {
  return (
    <button
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-[#f8f1dc] transition hover:border-[#d8b168] hover:text-[#d8b168]"
      onClick={onClick}
      title={label}
      type="button"
    >
      {icon}
    </button>
  );
}

function SortableAdminItem({ id, children }: { id: string; children: ReactNode }): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? "z-30 opacity-75" : ""}
    >
      {children}
    </div>
  );
}

function DragHandle(): JSX.Element {
  return (
    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 cursor-grab items-center justify-center border border-white/15 text-[#d8b168] active:cursor-grabbing">
      <GripVertical className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

function BulkBar({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 animate-[fadeIn_0.2s_ease-out] flex-wrap items-center justify-center gap-3 border border-[#d8b168]/50 bg-[#111832] px-4 py-3 text-[13px] font-semibold text-[#f8f1dc] shadow-[0_24px_70px_rgba(0,0,0,0.42)] [&_button]:min-h-9 [&_button]:border [&_button]:border-white/15 [&_button]:px-3 [&_button]:transition [&_button:hover]:border-[#d8b168]">
      {children}
    </div>
  );
}

function EmptyState({ message }: { message: string }): JSX.Element {
  return <p className="border border-dashed border-white/20 p-5 text-center text-[#f8f1dc]/75">{message}</p>;
}

function Modal({
  title,
  children,
  onClose
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}): JSX.Element {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto border border-[#d8b168]/40 bg-[#111832] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="[font-family:'Trirong',serif] text-[26px] font-bold italic text-white">{title}</h3>
          <button aria-label="Close modal" className="text-[#f8f1dc]" onClick={onClose} type="button">
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
