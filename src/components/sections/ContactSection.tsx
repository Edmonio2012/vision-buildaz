import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function ContactSection(): JSX.Element {
  const [form, setForm] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const validationErrors: ContactFormErrors = {};
    if (!form.email.trim()) validationErrors.email = "Խնդրում ենք լրացնել էլ. հասցեն։";
    else if (!EMAIL_REGEX.test(form.email))
      validationErrors.email = "Խնդրում ենք մուտքագրել վավեր էլ. հասցե։";
    if (!form.subject.trim()) validationErrors.subject = "Խնդրում ենք լրացնել թեման։";
    if (!form.message.trim()) validationErrors.message = "Խնդրում ենք լրացնել հաղորդագրությունը։";

    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  };

  return (
    <motion.section
      className="bg-[#1f295f] px-6 pb-8 pt-10 text-white sm:px-8 md:pb-10 md:pt-14"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        <h2 className="[font-family:'Trirong',serif] text-[28px] font-bold leading-none text-white sm:text-[35px] md:text-[40px]">
          LET&apos;S STAY IN TOUCH
        </h2>

        <p className="max-w-[680px] [font-family:'Poppins',sans-serif] text-[16px] font-normal leading-[1.6] text-white sm:text-[18px] md:text-[19px]">
          Are you ready to take the next step toward achieving your goals? Contact Vision Buildaz
          today to schedule a consultation. Whether you&apos;re interested in one-on-one coaching,
          workshops, or financial mentorship, we&apos;re here to help. You ready? Let&apos;s grow!
        </p>

        <form className="flex w-full max-w-[560px] flex-col items-center gap-6" noValidate onSubmit={handleSubmit}>
          <p className="[font-family:'Poppins',sans-serif] text-[18px] font-normal leading-[1.2] text-white sm:text-[20px] md:text-[22px]">
            Please Complete Form Details
          </p>

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  className="peer h-[54px] w-full rounded-[12px] border border-[#e1be14] bg-[#e1be14] px-4 pt-5 text-[16px] text-black outline-none transition duration-300 placeholder:text-transparent hover:brightness-[1.04] focus:-translate-y-[1px] focus:ring-2 focus:ring-[#f3dd78] focus:shadow-[0_10px_24px_rgba(227,189,20,0.28)] sm:text-[17px]"
                  id="contact-email"
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder=" "
                  type="email"
                  value={form.email}
                />
                <label
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 [font-family:'Poppins',sans-serif] text-[12px] font-semibold uppercase leading-none text-black/70 transition-all duration-300 peer-placeholder-shown:left-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-x-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:translate-x-0 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-black peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-x-0 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
                  htmlFor="contact-email"
                >
                  EMAIL *
                </label>
              </div>
              {errors.email ? <p className="text-[16px] text-[#ffd77b]">{errors.email}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  className="peer h-[54px] w-full rounded-[12px] border border-[#e1be14] bg-[#e1be14] px-4 pt-5 text-[16px] text-black outline-none transition duration-300 placeholder:text-transparent hover:brightness-[1.04] focus:-translate-y-[1px] focus:ring-2 focus:ring-[#f3dd78] focus:shadow-[0_10px_24px_rgba(227,189,20,0.28)] sm:text-[17px]"
                  id="contact-subject"
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder=" "
                  type="text"
                  value={form.subject}
                />
                <label
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 [font-family:'Poppins',sans-serif] text-[12px] font-semibold uppercase leading-none text-black/70 transition-all duration-300 peer-placeholder-shown:left-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-x-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:translate-x-0 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-black peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-x-0 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
                  htmlFor="contact-subject"
                >
                  SUBJECT
                </label>
              </div>
              {errors.subject ? (
                <p className="text-[16px] text-[#ffd77b]">{errors.subject}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <textarea
                  className="peer h-[120px] w-full resize-none rounded-[12px] border border-[#e1be14] bg-[#e1be14] px-4 pt-9 text-center [font-family:'Poppins',sans-serif] text-[18px] text-black outline-none transition duration-300 placeholder:text-transparent hover:brightness-[1.04] focus:-translate-y-[1px] focus:ring-2 focus:ring-[#f3dd78] focus:shadow-[0_10px_24px_rgba(227,189,20,0.28)] sm:text-[19px]"
                  id="contact-message"
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder=" "
                  value={form.message}
                />
                <label
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 [font-family:'Poppins',sans-serif] text-[12px] font-semibold uppercase leading-none text-black/70 transition-all duration-300 peer-placeholder-shown:left-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-x-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-1/2 peer-focus:top-2 peer-focus:-translate-x-1/2 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-black peer-[:not(:placeholder-shown)]:left-1/2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-x-1/2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
                  htmlFor="contact-message"
                >
                  ADD MESSAGE
                </label>
              </div>
              {errors.message ? (
                <p className="text-[16px] text-[#ffd77b]">{errors.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              className="group relative inline-flex animate-cta-pulse items-center gap-2 overflow-hidden rounded-[12px] border border-[#d8b168] bg-[#050608] px-7 py-3 text-[20px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-all duration-300 hover:scale-[1.05] hover:border-[#f2cf87] hover:shadow-[0_26px_44px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b168] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f295f] sm:text-[22px]"
              type="submit"
            >
              <span className="pointer-events-none absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-[#1f232a] via-[#0b0e12] to-[#040506]" />
              <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-[40%] animate-cta-sheen bg-gradient-to-r from-transparent via-[#ffedbf]/35 to-transparent" />
              <span className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_1px_0_rgba(255,233,188,0.34),inset_0_-1px_0_rgba(0,0,0,0.5)]" />
              <span className="relative z-10">SUBMIT</span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6"
              />
            </button>

            {submitted ? (
              <p className="[font-family:'Poppins',sans-serif] text-[17px] text-[#f3dd78]">
                Form submitted successfully.
              </p>
            ) : null}
          </div>
        </form>

      </motion.div>
    </motion.section>
  );
}
