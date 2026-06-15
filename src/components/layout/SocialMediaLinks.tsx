import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { Globe2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ADMIN_DATA_EVENT, getSocialLinksData, type SocialLinkData } from "@/lib/adminData";

type SocialVariant = 1 | 2 | "band" | "inline" | "footer" | "squares";

interface SocialMediaLinksProps {
  variant?: SocialVariant;
}

const ICONS: Record<SocialLinkData["icon"], JSX.Element> = {
  TikTok: <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  Instagram: <SiInstagram className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  YouTube: <SiYoutube className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  Facebook: <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  Globe: <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
};

function linksContent(
  linkClassName: string,
  links: SocialLinkData[]
): JSX.Element[] {
  return links.map(({ id, label, href, icon }) => (
    <a
      key={id}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={linkClassName}
    >
      {ICONS[icon] ?? ICONS.Globe}
    </a>
  ));
}

export function SocialMediaLinks({ variant = "inline" }: SocialMediaLinksProps): JSX.Element {
  const resolvedVariant = variant === 1 ? "inline" : variant === 2 ? "squares" : variant;
  const [storedLinks, setStoredLinks] = useState(() => getSocialLinksData());
  const visibleLinks = useMemo(() => storedLinks.filter((link) => link.visible), [storedLinks]);

  useEffect(() => {
    const refreshLinks = (): void => setStoredLinks(getSocialLinksData());

    window.addEventListener(ADMIN_DATA_EVENT, refreshLinks);
    window.addEventListener("storage", refreshLinks);

    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, refreshLinks);
      window.removeEventListener("storage", refreshLinks);
    };
  }, []);

  if (resolvedVariant === "band") {
    return (
      <section className="flex h-[86px] w-full items-center bg-[url('/images/assets/subheader-bg.jpg')] bg-cover bg-center bg-no-repeat px-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {linksContent(
            "flex h-9 w-9 items-center justify-center rounded-full border border-[#1f295f]/25 bg-white/95 text-[#1f295f] shadow-[0_8px_16px_rgba(17,24,39,0.16)] transition hover:-translate-y-0.5 sm:h-12 sm:w-12 sm:shadow-[0_10px_22px_rgba(17,24,39,0.18)]",
            visibleLinks
          )}
        </div>
      </section>
    );
  }

  if (resolvedVariant === "footer") {
    return (
      <div className="flex items-center justify-center gap-2.5 sm:gap-3">
        {linksContent(
          "flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1f295f] transition hover:-translate-y-0.5 sm:h-9 sm:w-9",
          visibleLinks
        )}
      </div>
    );
  }

  if (resolvedVariant === "squares") {
    const founderOrder = ["Instagram", "Facebook", "LinkedIn", "YouTube", "TikTok"] as const;
    const founderLinks = founderOrder
      .map((label) => visibleLinks.find((link) => link.label === label))
      .filter((link): link is SocialLinkData => Boolean(link));

    return (
      <div className="flex items-center justify-center gap-5">
        {linksContent(
          "flex h-10 w-10 items-center justify-center rounded-[3px] bg-[#1f295f] text-white shadow-[0_6px_12px_rgba(17,24,39,0.16)] transition hover:-translate-y-0.5 hover:brightness-110 sm:h-11 sm:w-11",
          founderLinks.length > 0 ? founderLinks : visibleLinks
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 md:justify-end md:gap-3">
      {linksContent(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2e396a] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.22)] sm:h-12 sm:w-12",
        visibleLinks
      )}
    </div>
  );
}
