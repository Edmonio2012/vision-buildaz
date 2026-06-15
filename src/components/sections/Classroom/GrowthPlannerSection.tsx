import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Download,
  Flame,
  Lightbulb,
  ListChecks,
  NotebookPen,
  Plus,
  RotateCcw,
  Target,
  Trash2
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getVisibleCourses } from "@/lib/adminData";

const STORAGE_KEY = "yrlgd_growth_plan";

const focusOptions = [
  {
    id: "mindset",
    label: "Mindset Reset",
    courseId: "starter-library",
    prompt: "I need a cleaner daily rhythm and a stronger belief system."
  },
  {
    id: "momentum",
    label: "Build Momentum",
    courseId: "momentum-audio-video",
    prompt: "I need quick lessons that keep me moving this week."
  },
  {
    id: "clarity",
    label: "Find Clarity",
    courseId: "mini-webinar",
    prompt: "I need to name the next practical action in front of me."
  },
  {
    id: "books",
    label: "Read The Series",
    courseId: "books-in-series",
    prompt: "I want the books and deeper resources in one place."
  }
];

const defaultTasks = [
  "Choose one resource to start today",
  "Block learning time on the calendar",
  "Write one next action after the lesson"
];

interface PlannerState {
  focusId: string;
  weeklyMinutes: number;
  commitment: string;
  tasks: string[];
  completedTasks: Record<string, boolean>;
}

function readPlannerState(): PlannerState {
  const fallback: PlannerState = {
    focusId: focusOptions[0].id,
    weeklyMinutes: 90,
    commitment: "",
    tasks: defaultTasks,
    completedTasks: {}
  };

  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...fallback, ...(JSON.parse(stored) as Partial<PlannerState>) } : fallback;
  } catch {
    return fallback;
  }
}

function slugTask(task: string): string {
  return task.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function GrowthPlannerSection(): JSX.Element {
  const [planner, setPlanner] = useState<PlannerState>(() => readPlannerState());
  const [newTask, setNewTask] = useState("");
  const courses = getVisibleCourses();

  const activeFocus = focusOptions.find((focus) => focus.id === planner.focusId) ?? focusOptions[0];
  const recommendedCourse = courses.find((course) => course.id === activeFocus.courseId) ?? courses[0];
  const completedTaskCount = planner.tasks.filter((task) => planner.completedTasks[slugTask(task)]).length;
  const taskProgress =
    planner.tasks.length > 0 ? Math.round((completedTaskCount / planner.tasks.length) * 100) : 0;
  const weeklySessions = Math.max(2, Math.ceil(planner.weeklyMinutes / 30));
  const minutesPerSession = Math.round(planner.weeklyMinutes / weeklySessions);

  const planSummary = useMemo(
    () =>
      [
        `Focus: ${activeFocus.label}`,
        `Weekly learning time: ${planner.weeklyMinutes} minutes`,
        `Suggested rhythm: ${weeklySessions} sessions of about ${minutesPerSession} minutes`,
        `Recommended course: ${recommendedCourse?.title ?? "Course Library"}`,
        planner.commitment ? `Commitment: ${planner.commitment}` : "Commitment: Add your statement",
        `Tasks: ${planner.tasks.join("; ")}`
      ].join("\n"),
    [
      activeFocus.label,
      minutesPerSession,
      planner.commitment,
      planner.tasks,
      planner.weeklyMinutes,
      recommendedCourse?.title,
      weeklySessions
    ]
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(planner));
  }, [planner]);

  const addTask = (): void => {
    const cleanTask = newTask.trim();
    if (!cleanTask) return;

    setPlanner((current) => ({
      ...current,
      tasks: [...current.tasks, cleanTask]
    }));
    setNewTask("");
  };

  const downloadPlan = (): void => {
    const blob = new Blob([planSummary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "you-ready-lets-grow-plan.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetPlan = (): void => {
    setPlanner({
      focusId: focusOptions[0].id,
      weeklyMinutes: 90,
      commitment: "",
      tasks: defaultTasks,
      completedTasks: {}
    });
    setNewTask("");
  };

  return (
    <section className="bg-[#ececec] px-6 py-16 text-[#132151] sm:px-8 md:py-20" id="growth-planner">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="[font-family:'Poppins',sans-serif] text-[13px] font-bold uppercase tracking-[0.18em] text-[#a4890b]">
              Interactive Growth Lab
            </p>
            <h2 className="[font-family:'Trirong',serif] text-[36px] font-bold italic leading-tight text-[#132151] sm:text-[46px]">
              Build a plan before you start clicking.
            </h2>
            <p className="[font-family:'Poppins',sans-serif] text-[16px] leading-[1.75] text-[#26354b] sm:text-[18px]">
              Pick your focus, shape your weekly rhythm, create action steps, and save a simple
              plan that points you to the right course.
            </p>
          </div>

          <div className="grid grid-cols-3 overflow-hidden border border-[#d8d2c5] bg-white text-center shadow-[0_12px_28px_rgba(17,24,39,0.08)]">
            {[
              { label: "Tasks", value: `${completedTaskCount}/${planner.tasks.length}` },
              { label: "Plan", value: `${taskProgress}%` },
              { label: "Week", value: `${planner.weeklyMinutes}m` }
            ].map((stat) => (
              <div className="min-w-[92px] border-r border-[#d8d2c5] px-4 py-4 last:border-r-0" key={stat.label}>
                <p className="[font-family:'Trirong',serif] text-[28px] font-bold leading-none text-[#a4890b]">
                  {stat.value}
                </p>
                <p className="mt-2 [font-family:'Poppins',sans-serif] text-[11px] font-bold uppercase tracking-[0.12em] text-[#26354b]/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            className="border border-[#d8d2c5] bg-white p-5 shadow-[0_18px_42px_rgba(17,24,39,0.08)] sm:p-6"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-[#a4890b]" aria-hidden="true" />
                <h3 className="[font-family:'Trirong',serif] text-[28px] font-bold italic leading-tight text-[#132151]">
                  Choose your focus
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {focusOptions.map((focus) => {
                  const selected = planner.focusId === focus.id;

                  return (
                    <button
                      className={`min-h-[118px] border p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-[#a4890b] ${
                        selected
                          ? "border-[#a4890b] bg-[#a4890b] text-white"
                          : "border-[#d8d2c5] bg-[#f8f8f8] text-[#132151]"
                      }`}
                      key={focus.id}
                      onClick={() => setPlanner((current) => ({ ...current, focusId: focus.id }))}
                      type="button"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="[font-family:'Poppins',sans-serif] text-[14px] font-bold uppercase tracking-[0.1em]">
                          {focus.label}
                        </span>
                        {selected ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : null}
                      </span>
                      <span
                        className={`mt-3 block [font-family:'Poppins',sans-serif] text-[13px] leading-[1.6] ${
                          selected ? "text-white/82" : "text-[#26354b]/72"
                        }`}
                      >
                        {focus.prompt}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="border border-[#d8d2c5] bg-[#f8f8f8] p-4">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 [font-family:'Poppins',sans-serif] text-[14px] font-bold uppercase tracking-[0.1em] text-[#a4890b]">
                      <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
                      Weekly time
                    </span>
                    <span className="[font-family:'Trirong',serif] text-[28px] font-bold text-[#132151]">
                      {planner.weeklyMinutes}m
                    </span>
                  </div>
                  <input
                    aria-label="Weekly learning minutes"
                    className="h-2 w-full accent-[#a4890b]"
                    max="240"
                    min="30"
                    onChange={(event) =>
                      setPlanner((current) => ({
                        ...current,
                        weeklyMinutes: Number(event.target.value)
                      }))
                    }
                    step="15"
                    type="range"
                    value={planner.weeklyMinutes}
                  />
                  <p className="mt-4 [font-family:'Poppins',sans-serif] text-[13px] leading-[1.6] text-[#26354b]/72">
                    Try {weeklySessions} sessions at about {minutesPerSession} minutes each.
                  </p>
                </div>

                <label className="border border-[#d8d2c5] bg-[#f8f8f8] p-4">
                  <span className="mb-3 flex items-center gap-2 [font-family:'Poppins',sans-serif] text-[14px] font-bold uppercase tracking-[0.1em] text-[#a4890b]">
                    <NotebookPen className="h-5 w-5" aria-hidden="true" />
                    Commitment
                  </span>
                  <textarea
                    className="min-h-[116px] w-full resize-none border border-[#d8d2c5] bg-white px-4 py-3 [font-family:'Poppins',sans-serif] text-[14px] leading-[1.7] text-[#132151] outline-none transition placeholder:text-[#26354b]/42 focus:border-[#a4890b]"
                    maxLength={180}
                    onChange={(event) =>
                      setPlanner((current) => ({ ...current, commitment: event.target.value }))
                    }
                    placeholder="Example: This week I will finish one resource and act on one idea."
                    value={planner.commitment}
                  />
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 border border-[#d8d2c5] bg-white p-5 shadow-[0_18px_42px_rgba(17,24,39,0.08)] sm:p-6"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#1f295f] p-3 text-white">
                <Lightbulb className="h-7 w-7" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="[font-family:'Poppins',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] text-[#a4890b]">
                  Recommended next
                </p>
                <h3 className="[font-family:'Trirong',serif] text-[28px] font-bold italic leading-tight text-[#132151]">
                  {recommendedCourse?.title}
                </h3>
                <p className="[font-family:'Poppins',sans-serif] text-[14px] leading-[1.7] text-[#26354b]/72">
                  {recommendedCourse?.description}
                </p>
              </div>
            </div>

            <div className="border border-[#d8d2c5] bg-[#f8f8f8] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 [font-family:'Poppins',sans-serif] text-[14px] font-bold uppercase tracking-[0.1em] text-[#a4890b]">
                  <ListChecks className="h-5 w-5" aria-hidden="true" />
                  Action steps
                </span>
                <span className="[font-family:'Poppins',sans-serif] text-[13px] font-semibold text-[#26354b]/72">
                  {taskProgress}% ready
                </span>
              </div>

              <div className="mb-4 h-2 overflow-hidden bg-[#e4e0d6]">
                <div
                  className="h-full bg-[#a4890b] transition-[width] duration-500"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>

              <div className="flex flex-col gap-2">
                {planner.tasks.map((task) => {
                  const taskId = slugTask(task);
                  const checked = Boolean(planner.completedTasks[taskId]);

                  return (
                    <div className="flex items-center gap-3 border border-[#d8d2c5] bg-white p-3" key={taskId}>
                      <input
                        aria-label={`Complete ${task}`}
                        checked={checked}
                        className="h-5 w-5 shrink-0 accent-[#a4890b]"
                        onChange={() =>
                          setPlanner((current) => ({
                            ...current,
                            completedTasks: {
                              ...current.completedTasks,
                              [taskId]: !current.completedTasks[taskId]
                            }
                          }))
                        }
                        type="checkbox"
                      />
                      <span
                        className={`min-w-0 flex-1 [font-family:'Poppins',sans-serif] text-[14px] leading-[1.5] ${
                          checked ? "text-[#26354b]/42 line-through" : "text-[#26354b]"
                        }`}
                      >
                        {task}
                      </span>
                      <button
                        aria-label={`Remove ${task}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d8d2c5] text-[#26354b]/56 transition hover:border-[#a4890b] hover:text-[#a4890b]"
                        onClick={() =>
                          setPlanner((current) => {
                            const { [taskId]: _removed, ...remainingTasks } = current.completedTasks;

                            return {
                              ...current,
                              completedTasks: remainingTasks,
                              tasks: current.tasks.filter((savedTask) => savedTask !== task)
                            };
                          })
                        }
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  className="min-h-[44px] flex-1 border border-[#d8d2c5] bg-white px-4 [font-family:'Poppins',sans-serif] text-[14px] text-[#132151] outline-none transition placeholder:text-[#26354b]/42 focus:border-[#a4890b]"
                  onChange={(event) => setNewTask(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addTask();
                  }}
                  placeholder="Add your own step"
                  value={newTask}
                />
                <button
                  className="flex min-h-[44px] items-center justify-center gap-2 bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
                  onClick={addTask}
                  type="button"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                className="flex min-h-[48px] items-center justify-center gap-2 bg-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#927904]"
                to={`/youreadyletsgrowdigital/${recommendedCourse?.id ?? ""}`}
              >
                Open Course
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button
                className="flex min-h-[48px] items-center justify-center gap-2 border border-[#a4890b] px-4 [font-family:'Poppins',sans-serif] text-[14px] font-semibold text-[#a4890b] transition hover:bg-[#a4890b] hover:text-white"
                onClick={downloadPlan}
                type="button"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Save Plan
              </button>
            </div>

            <button
              className="flex min-h-[44px] w-fit items-center gap-2 border border-[#d8d2c5] px-4 [font-family:'Poppins',sans-serif] text-[13px] font-semibold text-[#26354b]/72 transition hover:border-[#a4890b] hover:text-[#a4890b]"
              onClick={resetPlan}
              type="button"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset planner
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: Flame,
              title: "Pick a lane",
              text: "The focus selector changes the course recommendation instantly."
            },
            {
              icon: ClipboardList,
              title: "Make it concrete",
              text: "The checklist turns a resource library into a real weekly action plan."
            },
            {
              icon: Download,
              title: "Keep the plan",
              text: "Download a simple text plan when you want something to review offline."
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div className="border border-[#d8d2c5] bg-white p-5 shadow-[0_12px_28px_rgba(17,24,39,0.06)]" key={item.title}>
                <Icon className="mb-4 h-6 w-6 text-[#a4890b]" aria-hidden="true" />
                <h3 className="[font-family:'Trirong',serif] text-[24px] font-bold italic leading-tight text-[#132151]">
                  {item.title}
                </h3>
                <p className="mt-2 [font-family:'Poppins',sans-serif] text-[14px] leading-[1.65] text-[#26354b]/72">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
