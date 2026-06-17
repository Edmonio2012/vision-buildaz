import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ContactSection } from "@/components/sections/ContactSection";
import { WixIntroductionSection } from "@/components/sections/WixIntroductionSection";
import { WixInspiredIntroSection } from "@/components/sections/WixInspiredIntroSection";
import { WixDreamsSection } from "@/components/sections/WixDreamsSection";
import { WixServicesSection } from "@/components/sections/WixServicesSection";

export function NewHome(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <WixInspiredIntroSection />
      <WixIntroductionSection />
      <WixServicesSection />
      <WixDreamsSection />
      <ContactSection />
      <Copyright />
    </>
  );
}
