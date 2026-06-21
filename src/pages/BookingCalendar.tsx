import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Copyright } from "@/components/layout/Copyright";
import { BrandHeader } from "@/components/layout/BrandHeader";
import { createId, getContactSubmissions, STORAGE_KEYS, writeJson } from "@/lib/adminData";

const SERVICES: Record<string, string> = {
  "one-on-one-consultation-1": "ONE ON ONE CONSULTATION",
  "one-on-one-consultation": "ONE ON ONE CONSULTATION",
  "strategic-planning": "STRATEGIC PLANNING",
  "entrepreneurial-coaching": "ENTREPRENEURIAL COACHING",
  "financial-coaching": "FINANCIAL COACHING"
};

const TIME_SLOTS = [
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm"
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function nextBookableDate(date: Date): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + 1);
  while (next.getDay() === 0 || next.getDay() === 6) next.setDate(next.getDate() + 1);
  return next;
}

function nextAvailableWeekday(date: Date): Date {
  const next = startOfDay(date);
  do {
    next.setDate(next.getDate() + 1);
  } while (next.getDay() === 0 || next.getDay() === 6);
  return next;
}

function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function formatServiceTitle(slug?: string): string {
  return SERVICES[slug ?? ""] ?? SERVICES["entrepreneurial-coaching"];
}

function getCalendarCells(month: Date): (Date | null)[] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const cells: (Date | null)[] = Array.from({ length: firstDay.getDay() }, () => null);

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function BookingCalendar(): JSX.Element {
  const { serviceSlug } = useParams();
  const service = formatServiceTitle(serviceSlug);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(() => nextBookableDate(today));
  const [selectedTime, setSelectedTime] = useState<(typeof TIME_SLOTS)[number]>(TIME_SLOTS[0]);
  const [timezone, setTimezone] = useState("Eastern Daylight Time (EDT)");
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const calendarCells = useMemo(() => getCalendarCells(calendarMonth), [calendarMonth]);
  const hasAvailability = selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6;
  const canViewPreviousMonth =
    calendarMonth.getFullYear() > today.getFullYear() ||
    (calendarMonth.getFullYear() === today.getFullYear() && calendarMonth.getMonth() > today.getMonth());

  const moveMonth = (direction: -1 | 1): void => {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  };

  const selectDate = (date: Date): void => {
    if (date < today) return;
    setSelectedDate(date);
  };

  const goToNextAvailability = (): void => {
    const next = nextAvailableWeekday(selectedDate);
    setSelectedDate(next);
    setCalendarMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const dateLabel = formatLongDate(selectedDate);
    const submissions = getContactSubmissions();

    writeJson(STORAGE_KEYS.contacts, [
      {
        id: createId("booking"),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: `Booking request — ${service}`,
        message: `${service} requested for ${dateLabel} at ${selectedTime} (${timezone}).`,
        submittedAt: new Date().toISOString(),
        read: false
      },
      ...submissions
    ]);

    setStep("confirmed");
  };

  return (
    <>
      <BrandHeader />
      <main className="min-h-screen bg-white text-[#444]">
        <div className="mx-auto w-full max-w-[1034px] px-6 pb-20 pt-7 sm:px-8 lg:px-0 lg:pt-6">
        <Link
          className="inline-flex items-center gap-2 [font-family:Arial,sans-serif] text-[17px] text-[#444] transition hover:text-black"
          to="/book-online"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          Back
        </Link>

        {step === "confirmed" ? (
          <section className="mx-auto mt-16 max-w-[650px] border border-[#d4d4d4] p-8 text-center sm:p-12">
            <h1 className="[font-family:Arial,sans-serif] text-[38px] font-normal leading-none text-[#444] sm:text-[46px]">
              You&apos;re booked!
            </h1>
            <p className="mt-6 [font-family:Arial,sans-serif] text-[20px] leading-[1.5] text-[#555]">
              Your {service.toLowerCase()} request for {formatLongDate(selectedDate)} at {selectedTime} ({timezone}) has been
              sent to Vision Buildaz.
            </p>
            <button
              className="mt-8 h-[48px] min-w-[220px] bg-[#a18e0c] px-6 [font-family:Arial,sans-serif] text-[17px] text-black transition hover:brightness-110"
              onClick={() => setStep("select")}
              type="button"
            >
              Book another session
            </button>
          </section>
        ) : (
          <>
            <header className="mt-14 lg:mt-16">
              <h1 className="[font-family:Arial,sans-serif] text-[36px] font-normal leading-none text-[#444] sm:text-[42px]">
                {step === "select" ? "Schedule your service" : "Your details"}
              </h1>
              <p className="mt-6 [font-family:Arial,sans-serif] text-[17px] leading-[1.4] text-[#555]">
                {step === "select"
                  ? "Check out our availability and book the date and time that works for you"
                  : "Tell us where to send your booking confirmation."}
              </p>
            </header>

            {step === "select" ? (
              <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-[72px] lg:grid-cols-[minmax(0,1fr)_265px] lg:gap-[57px]">
                <section>
                  <div className="flex flex-col justify-between gap-3 border-b border-[#d4d4d4] pb-2 sm:flex-row sm:items-center">
                    <h2 className="[font-family:Arial,sans-serif] text-[24px] font-normal leading-none text-[#444]">
                      Select a Date and Time
                    </h2>
                    <label className="flex items-center gap-1 [font-family:Arial,sans-serif] text-[15px] text-[#999]">
                      Time zone:
                      <select
                        aria-label="Time zone"
                        className="appearance-none bg-transparent pr-5 text-[15px] text-[#999] outline-none"
                        onChange={(event) => setTimezone(event.target.value)}
                        value={timezone}
                      >
                        <option value="Eastern Daylight Time (EDT)">Eastern Daylight Time (EDT)</option>
                        <option value="Armenia Standard Time (GMT+4)">Armenia Standard Time (GMT+4)</option>
                      </select>
                      <ChevronDown aria-hidden="true" className="-ml-5 h-4 w-4 pointer-events-none" />
                    </label>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[330px_minmax(0,1fr)] md:gap-12">
                    <div>
                      <div className="flex items-center justify-between px-6 [font-family:Arial,sans-serif] text-[17px] text-[#444]">
                        <button
                          aria-label="Previous month"
                          className="p-1 text-[#555] disabled:cursor-not-allowed disabled:opacity-30"
                          disabled={!canViewPreviousMonth}
                          onClick={() => moveMonth(-1)}
                          type="button"
                        >
                          <ChevronLeft className="h-7 w-7" />
                        </button>
                        <span>{calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                        <button aria-label="Next month" className="p-1 text-[#555]" onClick={() => moveMonth(1)} type="button">
                          <ChevronRight className="h-7 w-7" />
                        </button>
                      </div>

                      <div className="mt-5 grid grid-cols-7 gap-y-3 text-center [font-family:Arial,sans-serif]">
                        {WEEKDAYS.map((weekday) => (
                          <span className="text-[16px] text-[#999]" key={weekday}>
                            {weekday}
                          </span>
                        ))}
                        {calendarCells.map((date, index) => {
                          if (!date) return <span key={`empty-${index}`} />;
                          const isSelected = date.getTime() === selectedDate.getTime();
                          const isPast = date < today;
                          const isToday = date.getTime() === today.getTime();

                          return (
                            <button
                              className={`mx-auto flex h-[42px] w-[42px] items-center justify-center text-[16px] transition ${
                                isSelected
                                  ? "bg-[#73bfee] text-white"
                                  : isPast
                                    ? "cursor-not-allowed text-[#c7c7c7]"
                                    : isToday
                                      ? "text-[#63baf0] hover:bg-[#eef8fd]"
                                      : "text-[#555] hover:bg-[#eef8fd]"
                              }`}
                              disabled={isPast}
                              key={date.toISOString()}
                              onClick={() => selectDate(date)}
                              type="button"
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="mb-7 [font-family:Arial,sans-serif] text-[17px] leading-none text-[#555]">
                        Availability for {formatLongDate(selectedDate)}
                      </p>
                      {hasAvailability ? (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {TIME_SLOTS.map((time) => (
                            <button
                              className={`h-[46px] border [font-family:Arial,sans-serif] text-[16px] transition ${
                                time === selectedTime
                                  ? "border-[#73bfee] bg-[#73bfee] text-white"
                                  : "border-[#9f9f9f] bg-white text-[#444] hover:border-[#73bfee]"
                              }`}
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              type="button"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-5">
                          <p className="[font-family:Arial,sans-serif] text-[16px] text-[#555]">No availability</p>
                          <button
                            className="h-[44px] min-w-[240px] bg-[#73bfee] px-5 [font-family:Arial,sans-serif] text-[16px] text-white transition hover:brightness-105"
                            onClick={goToNextAvailability}
                            type="button"
                          >
                            Check Next Availability
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <aside>
                  <h2 className="border-b border-[#d4d4d4] pb-2 [font-family:Arial,sans-serif] text-[24px] font-normal leading-none text-[#444]">
                    Service Details
                  </h2>
                  <div className="mt-6 [font-family:Arial,sans-serif] text-[16px] leading-[1.65] text-[#999]">
                    <p className="text-[#444]">{service}</p>
                    {showServiceDetails ? <p className="mt-2">PRICES VARIES</p> : null}
                  </div>
                  <button
                    className="mt-3 inline-flex items-center gap-2 [font-family:Arial,sans-serif] text-[16px] text-[#999] transition hover:text-[#555]"
                    onClick={() => setShowServiceDetails((current) => !current)}
                    type="button"
                  >
                    {showServiceDetails ? "Less details" : "More details"}
                    {showServiceDetails ? <ChevronUp aria-hidden="true" className="h-4 w-4" /> : <ChevronDown aria-hidden="true" className="h-4 w-4" />}
                  </button>
                  <button
                    className="mt-12 h-[44px] w-full bg-[#73bfee] [font-family:Arial,sans-serif] text-[17px] text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[#c9c9c9]"
                    disabled={!hasAvailability}
                    onClick={() => setStep("details")}
                    type="button"
                  >
                    Next
                  </button>
                </aside>
              </div>
            ) : (
              <form className="mx-auto mt-14 max-w-[600px] [font-family:Arial,sans-serif]" onSubmit={submitBooking}>
                <div className="grid gap-5">
                  <label className="grid gap-2 text-[17px] text-[#444]">
                    Full name
                    <input
                      className="h-[48px] border border-[#aaa] px-3 text-[17px] outline-none focus:border-[#73bfee] focus:ring-1 focus:ring-[#73bfee]"
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      required
                      value={form.name}
                    />
                  </label>
                  <label className="grid gap-2 text-[17px] text-[#444]">
                    Email address
                    <input
                      className="h-[48px] border border-[#aaa] px-3 text-[17px] outline-none focus:border-[#73bfee] focus:ring-1 focus:ring-[#73bfee]"
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      required
                      type="email"
                      value={form.email}
                    />
                  </label>
                  <label className="grid gap-2 text-[17px] text-[#444]">
                    Phone number
                    <input
                      className="h-[48px] border border-[#aaa] px-3 text-[17px] outline-none focus:border-[#73bfee] focus:ring-1 focus:ring-[#73bfee]"
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                      required
                      type="tel"
                      value={form.phone}
                    />
                  </label>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    className="h-[48px] min-w-[180px] border border-[#999] px-6 text-[17px] text-[#444] transition hover:border-[#73bfee]"
                    onClick={() => setStep("select")}
                    type="button"
                  >
                    Back
                  </button>
                  <button className="h-[48px] min-w-[220px] bg-[#73bfee] px-6 text-[17px] text-white transition hover:brightness-105" type="submit">
                    Confirm booking
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        </div>
      </main>
      <Copyright />
    </>
  );
}
