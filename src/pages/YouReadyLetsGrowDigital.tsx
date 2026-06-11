import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { ClassroomCoursesSection } from "@/components/sections/Classroom/ClassroomCoursesSection";
import { ClassroomHero } from "@/components/sections/Classroom/ClassroomHero";
import { GrowthPlannerSection } from "@/components/sections/Classroom/GrowthPlannerSection";

export function YouReadyLetsGrowDigital(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <ClassroomHero />
      <GrowthPlannerSection />
      <ClassroomCoursesSection />
      <Copyright />
    </>
  );
}
