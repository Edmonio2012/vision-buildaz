import { Link } from "react-router-dom";
import { SocialMediaLinks } from "@/components/layout/SocialMediaLinks";

interface CopyrightProps {
  variant?: "minimal" | "social";
}

export function Copyright({ variant = "minimal" }: CopyrightProps): JSX.Element {
  if (variant === "social") {
    return (
      <footer className="bg-[#1f295f] px-6 pb-10 pt-8 text-center text-white sm:px-8">
        <p className="[font-family:'Trirong',serif] text-[34px] font-bold leading-none text-white sm:text-[40px]">
          YOU READY? LET&apos;S GROW!
        </p>
        <p className="mt-3 [font-family:'Trirong',serif] text-[18px] font-semibold leading-none text-white sm:text-[20px]">
          Copyright Vision Buildaz, LLC 2026
        </p>
        <SocialMediaLinks variant="footer" />
      </footer>
    );
  }

  return (
    <footer className="bg-[#1f295f] px-6 pb-10 pt-4 text-center text-white sm:px-8">
      <p className="[font-family:'Trirong',serif] text-[18px] font-semibold leading-none sm:text-[20px]">
        Copyright Vision Buildaz, LLC 2026
      </p>
      <div className="mt-3 flex items-center justify-center gap-4 [font-family:'Poppins',sans-serif] text-[13px]">
        <Link className="underline underline-offset-2 hover:text-[#f3dd78]" to="/contact">
          Privacy
        </Link>
        <Link className="underline underline-offset-2 hover:text-[#f3dd78]" to="/contact">
          Terms
        </Link>
      </div>
    </footer>
  );
}
