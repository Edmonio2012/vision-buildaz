import {
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  NotebookText,
  Play
} from "lucide-react";
import { type RefObject, useEffect, useRef, useState } from "react";

import type { ContentItem } from "@/data/courses";
import { incrementCount, sanitizeHtml, STORAGE_KEYS } from "@/lib/adminData";

interface ContentItemCardProps {
  item: ContentItem;
  isComplete: boolean;
  onToggle: () => void;
}

function getDomain(url?: string): string {
  if (!url) return "visionbuildaz.com";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const typeLabel: Record<ContentItem["type"], string> = {
  link: "Link",
  pdf: "PDF",
  text: "Note",
  video: "Video"
};

function trackOpen(itemId: string): void {
  incrementCount(STORAGE_KEYS.itemOpens, itemId);
}

function useItemTimeTracker(itemId: string): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || document.visibilityState !== "visible") return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") incrementCount(STORAGE_KEYS.timeSpent, itemId);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isVisible, itemId]);

  return ref;
}

export function ContentItemCard({
  item,
  isComplete,
  onToggle
}: ContentItemCardProps): JSX.Element {
  const trackerRef = useItemTimeTracker(item.id);

  if (item.type === "video") {
    return (
      <article ref={trackerRef} className="group grid gap-5 border border-[#d8d2c5] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#a4890b] hover:shadow-[0_18px_38px_rgba(17,24,39,0.1)] md:grid-cols-[220px_1fr]">
        <a
          className="relative flex min-h-[140px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#303a6d,#1f295f)]"
          href={item.url}
          onClick={() => trackOpen(item.id)}
          rel="noreferrer noopener"
          target="_blank"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(217,154,32,0.28),transparent_36%)]" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#a4890b] text-white shadow-[0_16px_38px_rgba(17,24,39,0.2)] transition group-hover:scale-105">
            <Play className="h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </a>

        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#ececec] px-3 py-1 [font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.12em] text-[#a4890b]">
                {item.duration ?? typeLabel[item.type]}
              </span>
              {isComplete ? (
                <span className="flex items-center gap-1 [font-family:'Poppins',sans-serif] text-[12px] font-semibold text-[#a4890b]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Watched
                </span>
              ) : null}
            </div>
            <h4 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
              {item.title}
            </h4>
            <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.65] text-[#26354b]/78">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="flex min-h-[44px] items-center justify-center gap-2 bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
              href={item.url}
              onClick={() => trackOpen(item.id)}
              rel="noreferrer noopener"
              target="_blank"
            >
              Watch
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              className="flex min-h-[44px] items-center justify-center border border-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#a4890b] transition hover:bg-[#a4890b] hover:text-white"
              onClick={onToggle}
              type="button"
            >
              {isComplete ? "Mark Incomplete" : "Mark as Complete"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "pdf") {
    return (
      <article ref={trackerRef} className="flex flex-col gap-5 border border-[#d8d2c5] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a4890b] hover:shadow-[0_18px_38px_rgba(17,24,39,0.1)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#ececec] text-[#a4890b]">
              <FileText className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#ececec] px-3 py-1 [font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.12em] text-[#a4890b]">
                  {item.fileSize ?? "PDF"}
                </span>
                {isComplete ? (
                  <span className="flex items-center gap-1 [font-family:'Poppins',sans-serif] text-[12px] font-semibold text-[#a4890b]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Read
                  </span>
                ) : null}
              </div>
              <h4 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
                {item.title}
              </h4>
              <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.65] text-[#26354b]/78">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className="flex min-h-[44px] items-center justify-center gap-2 bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
            href={item.url}
            onClick={() => trackOpen(item.id)}
            rel="noreferrer noopener"
            target="_blank"
          >
            Preview
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            className="flex min-h-[44px] items-center justify-center gap-2 border border-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#a4890b] transition hover:bg-[#a4890b] hover:text-white"
            href={item.url}
            onClick={() => trackOpen(item.id)}
            rel="noreferrer noopener"
            target="_blank"
          >
            Download
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            className="flex min-h-[44px] items-center justify-center border border-[#d8d2c5] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#26354b] transition hover:border-[#a4890b] hover:text-[#a4890b]"
            onClick={onToggle}
            type="button"
          >
            {isComplete ? "Mark Unread" : "Mark as Complete"}
          </button>
        </div>
      </article>
    );
  }

  if (item.type === "link") {
    return (
      <article ref={trackerRef} className="flex flex-col gap-5 border border-[#d8d2c5] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a4890b]">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#ececec] text-[#a4890b]">
            <Globe2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="[font-family:'Poppins',sans-serif] text-[13px] font-semibold text-[#a4890b]">
              {getDomain(item.url)}
            </span>
            <h4 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
              {item.title}
            </h4>
            <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.65] text-[#26354b]/78">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className="flex min-h-[44px] items-center justify-center gap-2 bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
            href={item.url}
            onClick={() => trackOpen(item.id)}
            rel="noreferrer noopener"
            target="_blank"
          >
            Open
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            className="flex min-h-[44px] items-center justify-center border border-[#d8d2c5] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#26354b] transition hover:border-[#a4890b] hover:text-[#a4890b]"
            onClick={onToggle}
            type="button"
          >
            {isComplete ? "Mark Incomplete" : "Mark as Complete"}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article ref={trackerRef} className="flex flex-col gap-4 border border-[#d8d2c5] border-l-[#a4890b] border-l-[5px] bg-white p-5">
      <div className="flex items-center gap-3 text-[#a4890b]">
        <NotebookText className="h-6 w-6" aria-hidden="true" />
        <span className="[font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.14em]">
          Note
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
          {item.title}
        </h4>
        <div
          className="[font-family:'Poppins',sans-serif] text-[15px] leading-[1.8] text-[#26354b]/78 [&_a]:text-[#a4890b] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#a4890b] [&_blockquote]:pl-4 [&_h2]:text-[22px] [&_h2]:font-bold [&_h3]:text-[19px] [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(item.content ?? item.description ?? "")
          }}
        />
      </div>
      <button
        className="flex min-h-[44px] w-fit items-center justify-center border border-[#d8d2c5] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#26354b] transition hover:border-[#a4890b] hover:text-[#a4890b]"
        onClick={onToggle}
        type="button"
      >
        {isComplete ? "Mark Unread" : "Mark as Complete"}
      </button>
    </article>
  );
}
