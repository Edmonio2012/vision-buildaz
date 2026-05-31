import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ContactSection } from "@/components/sections/ContactSection";
import { WDBrownIntroSection } from "@/components/sections/WDBrownIntroSection";
import { WDBrownTextSection } from "@/components/sections/WDBrownTextSection";

export function WDBrown(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <WDBrownIntroSection />
      <WDBrownTextSection />
      <ContactSection />
      <Copyright />
    </>
  );
}
