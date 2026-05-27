import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { SocialMediaLinks } from "@/components/layout/SocialMediaLinks";
import { MindsetBeforeMillionsSection } from "@/components/sections/MindsetBeforeMillionsSection";
import { MindsetMainSection } from "@/components/sections/MindsetMainSection";
import { MindsetTextSection } from "@/components/sections/MindsetTextSection";
import { MindsetWorkbookMirrorSection } from "@/components/sections/MindsetWorkbookMirrorSection";

export function Mindset(): JSX.Element {
  return (
    <>
      <BrandHeader />

      <MindsetMainSection />
      <MindsetTextSection />

      <SocialMediaLinks variant="band" />
      <MindsetBeforeMillionsSection showOrderNow={false} />
      <MindsetWorkbookMirrorSection showOrderNow={false} />
      <Copyright />
    </>
  );
}
