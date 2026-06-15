import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { CourseCard } from "@/components/sections/Classroom/CourseCard";
import { useCourseProgress } from "@/components/sections/Classroom/useCourseProgress";
import { ADMIN_DATA_EVENT, getVisibleCourses } from "@/lib/adminData";

export function ClassroomCoursesSection(): JSX.Element {
  const { getCourseProgress } = useCourseProgress();
  const [courses, setCourses] = useState(() => getVisibleCourses());
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    const refreshCourses = (): void => setCourses(getVisibleCourses());

    window.addEventListener(ADMIN_DATA_EVENT, refreshCourses);
    window.addEventListener("storage", refreshCourses);

    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, refreshCourses);
      window.removeEventListener("storage", refreshCourses);
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((course) => course.category).filter(Boolean)))],
    [courses]
  );
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(courses.flatMap((course) => course.tags ?? [])))],
    [courses]
  );
  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const categoryMatch = activeCategory === "All" || course.category === activeCategory;
        const tagMatch = activeTag === "All" || (course.tags ?? []).includes(activeTag);
        return categoryMatch && tagMatch;
      }),
    [activeCategory, activeTag, courses]
  );

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

        <div className="flex flex-col gap-4 border border-[#d8d2c5] bg-[#f8f8f8] p-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                className={`min-h-10 px-4 [font-family:'Poppins',sans-serif] text-[13px] font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#a4890b] text-white"
                    : "border border-[#d8d2c5] bg-white text-[#26354b] hover:border-[#a4890b]"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <button
                className={`min-h-9 rounded-full px-3 [font-family:'Poppins',sans-serif] text-[12px] font-semibold transition ${
                  activeTag === tag
                    ? "bg-[#132151] text-white"
                    : "border border-[#d8d2c5] bg-white text-[#26354b] hover:border-[#a4890b]"
                }`}
                key={tag}
                onClick={() => setActiveTag(tag)}
                type="button"
              >
                {tag === "All" ? "All Tags" : tag}
              </button>
            ))}
          </div>
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
          {filteredCourses.length > 0 ? filteredCourses.map((course) => (
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
          )) : (
            <div className="col-span-full border border-[#d8d2c5] bg-[#f8f8f8] p-8 text-center [font-family:'Poppins',sans-serif] text-[#26354b]">
              No courses match the selected filters.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
