import { motion } from "framer-motion";

import { CourseCard } from "@/components/sections/Classroom/CourseCard";
import { useCourseProgress } from "@/components/sections/Classroom/useCourseProgress";
import { courses } from "@/data/courses";

export function ClassroomCoursesSection(): JSX.Element {
  const { getCourseProgress } = useCourseProgress();

  return (
    <section className="bg-white text-[#132151]" id="course-library">
      <div className="bg-[#1f295f] px-6 py-10 text-center sm:px-8 md:py-12">
        <h2 className="[font-family:'Trirong',serif] text-[34px] font-bold italic leading-tight text-white sm:text-[39px] md:text-[43px]">
          Course Library
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-6 py-14 sm:px-8 md:py-16">
        <div className="mx-auto flex max-w-[860px] flex-col gap-4 text-center">
          <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[25px] font-semibold italic leading-[1.45] text-[#132151] sm:text-[32px] md:text-[38px]">
            Choose your next lesson path.
          </p>
          <p className="[font-family:'Poppins',sans-serif] text-[16px] leading-[1.75] text-[#26354b] sm:text-[18px]">
            Each course opens on its own page with a dedicated resource list. Mark items complete as
            you learn, and your progress will stay saved in this browser.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <CourseCard
                course={course}
                progress={getCourseProgress(course.items.map((item) => item.id))}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
