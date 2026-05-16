// Home route composed from section-level components for maintainable page assembly.
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { ProjectCardsSection } from "@/components/sections/project-cards";

export default function HomePage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProjectCardsSection />
    </>
  );
}
