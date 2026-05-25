import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";

import { SOCIAL_LINKS } from "@/lib/constants";

type SocialVariant = "band" | "inline" | "footer";

interface SocialMediaLinksProps {
  variant?: SocialVariant;
}

const ICONS: Record<(typeof SOCIAL_LINKS)[number]["label"], JSX.Element> = {
  TikTok: <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  Instagram: <SiInstagram className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  YouTube: <SiYoutube className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  Facebook: <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
};

function linksContent(linkClassName: string): JSX.Element[] {
  return SOCIAL_LINKS.map(({ label, href }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={linkClassName}
    >
      {ICONS[label]}
    </a>
  ));
}

export function SocialMediaLinks({ variant = "inline" }: SocialMediaLinksProps): JSX.Element {
  if (variant === "band") {
    return (
      <section className="flex h-[86px] w-full items-center bg-[url('/images/assets/subheader-bg.jpg')] bg-cover bg-center bg-no-repeat px-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {linksContent(
            "flex h-9 w-9 items-center justify-center rounded-full border border-[#1f295f]/25 bg-white/95 text-[#1f295f] shadow-[0_8px_16px_rgba(17,24,39,0.16)] transition hover:-translate-y-0.5 sm:h-12 sm:w-12 sm:shadow-[0_10px_22px_rgba(17,24,39,0.18)]"
          )}
        </div>
      </section>
    );
  }

  if (variant === "footer") {
    return (
      <div className="mt-6 flex items-center justify-center gap-2.5 sm:gap-3">
        {linksContent(
          "flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1f295f] transition hover:-translate-y-0.5 sm:h-9 sm:w-9"
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center gap-2.5 md:justify-end md:gap-3">
      {linksContent(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2e396a] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.22)] sm:h-12 sm:w-12"
      )}
    </div>
  );
}
