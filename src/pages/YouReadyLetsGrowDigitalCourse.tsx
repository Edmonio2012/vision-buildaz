import { motion } from "framer-motion";
import { ArrowLeft, BookOpenCheck, Library } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { CourseDetailPanel } from "@/components/sections/Classroom/CourseDetailPanel";
import { useCourseProgress } from "@/components/sections/Classroom/useCourseProgress";
import { courses } from "@/data/courses";

export function YouReadyLetsGrowDigitalCourse(): JSX.Element {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);
  const { completedItems, getCourseProgress, toggleItem } = useCourseProgress();

  if (!course) {
    return <Navigate replace to="/youreadyletsgrowdigital" />;
  }

  const progress = getCourseProgress(course.items.map((item) => item.id));

  return (
    <>
      <BrandHeader />
      <section className="bg-[#ececec] px-6 py-12 text-[#132151] sm:px-8 md:py-16">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
          <Link
            className="flex min-h-[44px] w-fit items-center gap-2 border border-[#d8d2c5] bg-white px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#26354b] transition hover:border-[#a4890b] hover:text-[#a4890b]"
            to="/youreadyletsgrowdigital#course-library"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Course Library
          </Link>

          <motion.div
            className="grid grid-cols-1 gap-6 border border-[#d8d2c5] bg-white p-6 shadow-[0_18px_42px_rgba(17,24,39,0.08)] lg:grid-cols-[1fr_280px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-4">
              <p className="[font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.22em] text-[#a4890b]">
                Course Page
              </p>
              <h1 className="[font-family:'Trirong',serif] text-[38px] font-bold italic leading-tight text-[#132151] sm:text-[50px]">
                {course.title}
              </h1>
              <p className="max-w-[760px] [font-family:'Poppins',sans-serif] text-[16px] leading-[1.75] text-[#26354b]/78 sm:text-[18px]">
                {course.description}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 border border-[#d8d2c5] bg-[#f8f8f8] p-5">
              <div className="flex items-center gap-3">
                <BookOpenCheck className="h-7 w-7 text-[#a4890b]" aria-hidden="true" />
                <div>
                  <p className="[font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.14em] text-[#a4890b]">
                    Saved Progress
                  </p>
                  <p className="[font-family:'Trirong',serif] text-[32px] font-bold leading-none text-[#132151]">
                    {progress}%
                  </p>
                </div>
              </div>
              <div className="h-2 overflow-hidden bg-[#e4e0d6]">
                <div
                  className="h-full bg-[#a4890b] transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="[font-family:'Poppins',sans-serif] text-[13px] leading-[1.6] text-[#26354b]/72">
                {course.items.length} resources available on this course page.
              </p>
            </div>
          </motion.div>

          <CourseDetailPanel
            completedItems={completedItems}
            course={course}
            onToggleItem={toggleItem}
            progress={progress}
          />

          <div className="flex flex-col gap-3 border border-[#d8d2c5] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Library className="h-6 w-6 text-[#a4890b]" aria-hidden="true" />
              <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.6] text-[#26354b]/78">
                Ready for another path? Return to the main classroom and choose a different course.
              </p>
            </div>
            <Link
              className="flex min-h-[44px] items-center justify-center bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
              to="/youreadyletsgrowdigital#course-library"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>
      <Copyright />
    </>
  );
}
