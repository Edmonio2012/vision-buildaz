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

    const nextErrors: ContactFormErrors = {};
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <section className="bg-[#071426] text-white">
      <div
        aria-hidden="true"
        className="h-[56px] w-full bg-[linear-gradient(90deg,#f1dda0_0%,#c58b32_24%,#f4e6a8_50%,#cc933b_77%,#a96c25_100%)]"
      />

      <div className="mx-auto max-w-[880px] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24">
        <h2 className="text-center font-serif text-[30px] font-semibold uppercase leading-tight tracking-normal text-white sm:text-[42px]">
          LET&apos;S STAY IN TOUCH
        </h2>

        <p className="mx-auto mt-8 max-w-[760px] text-center text-[16px] font-normal leading-[1.75] tracking-normal text-[#f8fafc] sm:text-[18px]">
          Are you ready to take the next step toward achieving your goals? Contact Vision Buildaz today to schedule a
          consultation. Whether you&apos;re interested in one-on-one coaching, workshops, or financial mentorship, we&apos;re
          here to help. You ready? Let&apos;s grow!
        </p>

        <p className="mt-12 text-center text-[18px] font-normal tracking-normal text-[#f8fafc] sm:text-[20px]">
          Please Complete Form Details
        </p>

        <form className="mx-auto mt-8 max-w-[360px]" noValidate onSubmit={handleSubmit}>
          <label className="block text-center text-[12px] font-semibold uppercase tracking-normal text-white" htmlFor="contact-email">
            EMAIL *
          </label>
          <input
            className="mt-2 h-[44px] w-full rounded-lg border border-[#d99a20] bg-[#d99a20] px-4 text-[15px] text-[#071426] outline-none transition focus:border-[#f4d384] focus:ring-2 focus:ring-[#f4d384]/30"
            id="contact-email"
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
            value={form.email}
          />
          {errors.email ? <p className="mt-2 text-center text-sm text-[#ffcfbf]">{errors.email}</p> : null}

          <label className="mt-5 block text-center text-[12px] font-semibold uppercase tracking-normal text-white" htmlFor="contact-subject">
            SUBJECT
          </label>
          <input
            className="mt-2 h-[44px] w-full rounded-lg border border-[#d99a20] bg-[#d99a20] px-4 text-[15px] text-[#071426] outline-none transition focus:border-[#f4d384] focus:ring-2 focus:ring-[#f4d384]/30"
            id="contact-subject"
            onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
            type="text"
            value={form.subject}
          />
          {errors.subject ? <p className="mt-2 text-center text-sm text-[#ffcfbf]">{errors.subject}</p> : null}

          <label className="mt-5 block text-center text-[12px] font-semibold uppercase tracking-normal text-white" htmlFor="contact-message">
            ADD MESSAGE
          </label>
          <textarea
            className="mt-2 min-h-[112px] w-full resize-y rounded-lg border border-[#d99a20] bg-[#d99a20] px-4 py-3 text-[16px] text-[#071426] outline-none placeholder:text-[#071426] transition focus:border-[#f4d384] focus:ring-2 focus:ring-[#f4d384]/30"
            id="contact-message"
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Enter text here"
            value={form.message}
          />
          {errors.message ? <p className="mt-2 text-center text-sm text-[#ffcfbf]">{errors.message}</p> : null}

          <div className="mt-7 flex justify-center">
            <button
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-[14px] font-semibold uppercase tracking-normal text-[#071426] transition duration-300 hover:scale-[1.03] hover:bg-[#d99a20] hover:text-[#071426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d99a20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426] active:scale-[0.99] animate-ctaPulseGlow"
              type="submit"
            >
              SUBMIT
            </button>
          </div>

          {submitted ? (
            <p className="mt-4 text-center text-sm text-[#d8f0cc]">Form submitted successfully.</p>
          ) : null}
        </form>

        <div className="mt-16 text-center">
          <p className="font-serif text-[22px] font-semibold uppercase tracking-normal sm:text-[28px]">
            YOU READY? LET&apos;S GROW!
          </p>
          <p className="mt-2 font-serif text-[16px] font-semibold tracking-normal sm:text-[20px]">
            Copyright Vision Buildaz, LLC 2026
          </p>
        </div>
      </div>
    </section>
  );
}
