import { BrandHeader } from "@/components/layout/BrandHeader";
import { BooksAlertSection } from "@/components/sections/BooksAlertSection";
import { VisionStatementSection } from "@/components/sections/VisionStatementSection";

export function Home(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <BooksAlertSection />
      <VisionStatementSection />
    </>
  );
}
