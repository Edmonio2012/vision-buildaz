// Home page composition: hero/header first, then books promotion section.
import { BrandHeader } from "@/components/layout/BrandHeader";
import { BooksPromoSection } from "@/components/sections/BooksPromoSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MindsetBookSection } from "@/components/sections/MindsetBookSection";
import { MindsetWorkbookSection } from "@/components/sections/MindsetWorkbookSection";
import { VisionIntroSection } from "@/components/sections/VisionIntroSection";

export function Home(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <BooksPromoSection />
      <VisionIntroSection />
      <MindsetBookSection />
      <MindsetWorkbookSection />
      <ContactSection />
    </>
  );
}
