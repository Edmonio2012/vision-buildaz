import { SocialMediaLinks } from "@/components/layout/SocialMediaLinks";

export function Copyright(): JSX.Element {
  return (
    <footer className="flex flex-col items-center gap-6 bg-[#1f295f] px-6 pb-10 pt-8 text-center text-white sm:px-8">
      <div className="flex flex-col gap-3">
        <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-none text-white sm:text-[32px]">
          YOU READY? LET&apos;S GROW!®
        </p>
        <p className="[font-family:'Trirong',serif] text-[14px] font-semibold leading-none text-white sm:text-[16px]">
          Copyright Vision Buildaz, LLC {new Date().getFullYear()}
        </p>
      </div>
      <SocialMediaLinks variant="footer" />
    </footer>
  );
}
