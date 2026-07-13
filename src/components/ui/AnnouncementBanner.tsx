import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { PhoneNumberField } from "@/components/ui/PhoneNumberField";
import { ADMIN_DATA_EVENT, getAnnouncementData, type AnnouncementData } from "@/lib/adminData";

const BANNER_DISMISSED_KEY = "bannerDismissed";

export function AnnouncementBanner(): JSX.Element | null {
  const [announcement, setAnnouncement] = useState<AnnouncementData>(() => getAnnouncementData());
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const refreshAnnouncement = (): void => setAnnouncement(getAnnouncementData());

    window.addEventListener(ADMIN_DATA_EVENT, refreshAnnouncement);
    window.addEventListener("storage", refreshAnnouncement);

    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, refreshAnnouncement);
      window.removeEventListener("storage", refreshAnnouncement);
    };
  }, []);

  useEffect(() => {
    if (!announcement.active) return;
    if (sessionStorage.getItem(BANNER_DISMISSED_KEY) === "true") return;

    const timer = window.setTimeout(() => {
      setShouldRender(true);
      setIsVisible(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [announcement.active]);

  useEffect(() => {
    if (!shouldRender) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  const dismissBanner = (): void => {
    sessionStorage.setItem(BANNER_DISMISSED_KEY, "true");
    setIsVisible(false);
  };

  if (!announcement.active || !shouldRender) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[2147483647] flex justify-center px-4 pt-8 sm:pt-10">
      <AnimatePresence
        onExitComplete={() => {
          setShouldRender(false);
        }}
      >
        {isVisible ? (
          <motion.aside
            aria-label="Vision Buildaz live announcement"
            className="pointer-events-auto relative max-h-[calc(100vh-4rem)] w-full max-w-[780px] overflow-y-auto bg-white px-6 py-9 text-black shadow-[0_22px_60px_rgba(15,23,42,0.16)] sm:px-12 md:px-16"
            initial={{ y: "-120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button
              aria-label="Close announcement"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center text-[#26323b] transition hover:scale-105 hover:text-black"
              onClick={dismissBanner}
              type="button"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1fr] md:gap-12">
              <div className="order-2 flex items-center justify-center md:order-1">
                <img
                  alt="You Ready? Let's Grow!"
                  className="h-auto w-[300px] max-w-full object-contain sm:w-[340px]"
                  src="/images/assets/announcement-grow-logo.png"
                />
              </div>

              <div className="order-1 flex flex-col gap-5 md:order-2">
                <div className="flex flex-col gap-11">
                  <h2 className="[font-family:'Poppins',sans-serif] text-center text-[25px] font-medium leading-[0.96] text-black sm:text-[28px]">
                    {announcement.headline}
                  </h2>

                  <p className="[font-family:'Poppins',sans-serif] text-[16px] font-normal leading-[1.4] text-black">
                    {announcement.body}
                  </p>
                </div>

                <input
                  aria-label="Email address"
                  className="h-[50px] w-full rounded-[2px] border border-[#9f9f9f] px-4 [font-family:'Poppins',sans-serif] text-[16px] text-black outline-none placeholder:text-[#6f7478] focus:border-[#65727c]"
                  placeholder="Enter your email address"
                  type="email"
                />

                <PhoneNumberField
                  codeClassName="h-[50px] rounded-l-[2px] border-[#9f9f9f] text-[13px]"
                  errorClassName="text-[11px]"
                  inputClassName="h-[50px] rounded-r-[2px] border-[#9f9f9f] bg-white px-4 text-[16px] text-black placeholder:text-[#6f7478] focus:border-[#65727c]"
                  placeholder="Phone Number"
                />

                <p className="[font-family:'Poppins',sans-serif] text-[16px] font-normal leading-[1.1] text-black">
                    By submitting this form and signing up for texts,
                    <br />
                    you consent to receive marketing text
                    <br />
                    messages (e.g. promos, cart reminders) from
                    <br />
                    Vision Buildaz, LLC at the number provided,
                    <br />
                    including messages sent by autodialer.
                    <br />
                    Consent is not a condition of purchase. Msg &amp;
                    <br />
                    data rates may apply. Msg frequency varies.
                    <br />
                    Unsubscribe at any time by replying STOP or
                    <br />
                    clicking the unsubscribe link (where available).
                    <br />
                    <a className="text-[#0000ee] underline" href="/contact">
                      Privacy Policy
                    </a>{" "}
                    &amp;{" "}
                    <a className="text-[#0000ee] underline" href="/contact">
                      Terms
                    </a>
                    .
                  </p>

                  <a
                    className="flex h-[54px] w-full items-center justify-center rounded-[2px] bg-[#2f3d48] [font-family:'Poppins',sans-serif] text-[16px] font-semibold text-white transition hover:bg-[#26323b]"
                    href={announcement.ctaLink}
                  >
                    {announcement.ctaText}
                  </a>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
