import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { AboutSection1 } from "@/components/sections/AboutSection1";
import { AboutSection2 } from "@/components/sections/AboutSection2";
import { ContactSection } from "@/components/sections/ContactSection";

export function About(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <AboutSection1 />
      <AboutSection2 />
      <ContactSection />
      <Copyright />
    </>
  );
}
