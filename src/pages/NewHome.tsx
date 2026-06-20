import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ContactSection } from "@/components/sections/ContactSection";
import { WixFounderSection } from "@/components/sections/WixFounderSection";
import { WixIntroductionSection } from "@/components/sections/WixIntroductionSection";
import { WixInspiredIntroSection } from "@/components/sections/WixInspiredIntroSection";
import { WixDreamsSection } from "@/components/sections/WixDreamsSection";
import { PodcastComingSoonSection } from "@/components/sections/PodcastComingSoonSection";
import { WixServicesSection } from "@/components/sections/WixServicesSection";

export function NewHome(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <WixInspiredIntroSection />
      <WixIntroductionSection />
      <WixServicesSection />
      <WixFounderSection />
      <WixDreamsSection />
      <PodcastComingSoonSection />
      <ContactSection />
      <Copyright />
    </>
  );
}
