import { AnimatePresence, motion } from "framer-motion";

import { ContentItemCard } from "@/components/sections/Classroom/ContentItemCard";
import type { Course } from "@/data/courses";

interface CourseDetailPanelProps {
  completedItems: Record<string, boolean>;
  course: Course | undefined;
  progress: number;
  onToggleItem: (itemId: string) => void;
}

export function CourseDetailPanel({
  completedItems,
  course,
  progress,
  onToggleItem
}: CourseDetailPanelProps): JSX.Element {
  return (
    <AnimatePresence mode="wait">
      {course ? (
        <motion.div
          className="overflow-hidden border border-[#d8d2c5] bg-white shadow-[0_18px_42px_rgba(17,24,39,0.08)]"
          key={course.id}
          initial={{ opacity: 0, height: 0, y: 20 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: 14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-6 border-b border-[#d8d2c5] bg-[#f8f8f8] p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex max-w-[720px] flex-col gap-3">
                <p className="[font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] text-[#a4890b]">
                  Course Detail
                </p>
                <h2 className="[font-family:'Trirong',serif] text-[32px] font-bold italic leading-tight text-[#132151] sm:text-[40px]">
                  {course.title}
                </h2>
                <p className="[font-family:'Poppins',sans-serif] text-[16px] leading-[1.75] text-[#26354b]/78">
                  {course.description}
                </p>
              </div>
              <div className="flex min-w-[220px] flex-col gap-2">
                <div className="flex items-center justify-between [font-family:'Poppins',sans-serif] text-[13px] font-bold uppercase tracking-[0.12em] text-[#a4890b]">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden bg-[#e4e0d6]">
                  <div
                    className="h-full bg-[#a4890b] transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-4 p-4 sm:p-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {course.items.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ContentItemCard
                  item={item}
                  isComplete={Boolean(completedItems[item.id])}
                  onToggle={() => onToggleItem(item.id)}
                />
              </motion.div>
            ))}

            {/* Quiz/exercise cards can be added here later when the course needs interactive checks. */}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
