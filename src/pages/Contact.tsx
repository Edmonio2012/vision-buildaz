import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { AboutSection1 } from "@/components/sections/AboutSection1";
import { ContactSection } from "@/components/sections/ContactSection";

export function Contact(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <AboutSection1 showLearnMore={false} />
      <ContactSection />
      <Copyright />
    </>
  );
}
