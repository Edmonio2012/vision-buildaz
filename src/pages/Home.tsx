import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { BooksAlertSection } from "@/components/sections/BooksAlertSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MindsetBeforeMillionsSection } from "@/components/sections/MindsetBeforeMillionsSection";
import { MindsetWorkbookMirrorSection } from "@/components/sections/MindsetWorkbookMirrorSection";
import { VisionStatementSection } from "@/components/sections/VisionStatementSection";

export function Home(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <BooksAlertSection />
      <VisionStatementSection />
      <MindsetBeforeMillionsSection />
      <MindsetWorkbookMirrorSection />
      <ContactSection />
      <Copyright variant="minimal" />
    </>
  );
}
