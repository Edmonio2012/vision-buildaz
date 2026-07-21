import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const speakerLinks = [
  { label: "Story", href: "#story" },
  { label: "Message", href: "#message" },
  { label: "Topics", href: "#topics" },
  { label: "Impact", href: "#impact" }
] as const;

export function SpeakerHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071426]/95 text-white shadow-[0_10px_35px_rgba(2,8,20,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[82px]">
        <Link
          aria-label="Vision Buildaz home"
          className="group flex items-center gap-3"
          onClick={closeMenu}
          to="/"
        >
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:-translate-y-0.5 lg:h-12 lg:w-12">
            <img
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
              src="/images/logo/logo.png"
            />
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-[0.13em] text-white sm:text-[16px]">
              WD BROWN
            </span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#e3bd66] sm:text-[10px]">
              Vision Buildaz
            </span>
          </span>
        </Link>

        <nav aria-label="Speaker page" className="hidden items-center gap-8 lg:flex">
          {speakerLinks.map((link) => (
            <a
              className="text-[13px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-[#f1cc77]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d9a94f] px-4 text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#071426] shadow-[0_10px_28px_rgba(217,169,79,0.24)] transition hover:-translate-y-0.5 hover:bg-[#efca79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d58f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426] sm:px-5 sm:text-[12px]"
            href="#booking"
          >
            Book WD<span className="hidden sm:inline"> to Speak</span>
          </a>
          <button
            aria-controls="speaker-mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#e3bd66] hover:text-[#e3bd66] lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label="Mobile speaker page"
        className={`overflow-hidden border-t border-white/10 bg-[#071426] transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
        id="speaker-mobile-navigation"
      >
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 gap-2 px-5 py-4 sm:px-8">
          {speakerLinks.map((link) => (
            <a
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-white/75 transition hover:border-[#e3bd66]/60 hover:text-[#e3bd66]"
              href={link.href}
              key={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
