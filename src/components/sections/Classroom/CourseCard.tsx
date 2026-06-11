import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  progress: number;
}

export function CourseCard({ course, progress }: CourseCardProps): JSX.Element {
  const completed = progress === 100;

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
    >
      <Link
        className="group flex h-full flex-col overflow-hidden border border-[#d8d2c5] bg-white text-left shadow-[0_16px_34px_rgba(17,24,39,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#a4890b] hover:shadow-[0_22px_46px_rgba(17,24,39,0.12)]"
        to={`/youreadyletsgrowdigital/${course.id}`}
      >
        <div
          className="relative h-[188px] bg-[#1f295f] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(140deg, rgba(7,20,38,0.32), rgba(7,20,38,0.78)), url('${course.thumbnail ?? ""}')`
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(217,154,32,0.32),transparent_34%)]" />
          <div className="absolute left-4 top-4 bg-white/92 px-3 py-1 [font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.12em] text-[#132151] shadow-[0_8px_18px_rgba(17,24,39,0.16)]">
            {course.items.length} items
          </div>
          {completed ? (
            <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-[#a4890b] text-white">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-col gap-3">
            <h3 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
              {course.title}
            </h3>
            <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.65] text-[#26354b]/78">
              {course.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 [font-family:'Poppins',sans-serif] text-[13px] font-semibold text-[#26354b]/78">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#a4890b]" aria-hidden="true" />
                {progress}% complete
              </span>
              <ChevronDown
                className="-rotate-90 h-5 w-5 text-[#a4890b] transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
            <div className="h-2 overflow-hidden bg-[#e4e0d6]">
              <div
                className="h-full bg-[#a4890b] transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="flex min-h-[46px] items-center justify-center bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[15px] font-medium uppercase tracking-[0.08em] text-white transition group-hover:bg-[#927904]">
            {progress > 0 ? "Continue Course" : "Open Course"}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
