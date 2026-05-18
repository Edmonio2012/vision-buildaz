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

const sectionReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const revealItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

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
    if (!form.email.trim()) validationErrors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(form.email)) validationErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) validationErrors.subject = "Subject is required.";
    if (!form.message.trim()) validationErrors.message = "Message is required.";

    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  };

  return (
    <motion.section
      className="relative isolate overflow-hidden bg-night px-6 py-section text-cream sm:px-8 lg:py-section-lg"
      initial="hidden"
      variants={sectionReveal}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_12%,rgba(212,161,50,0.2),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(255,255,255,0.1),transparent_34%)]" />

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div className="max-w-[620px]" variants={revealItem}>
            <p className="text-label font-bold uppercase text-accent">Contact</p>
            <h2 className="mt-5 text-[2.8rem] font-extrabold leading-none text-cream sm:text-[4.4rem]">
              LET&apos;S STAY IN TOUCH
            </h2>
            <p className="mt-8 text-[1.05rem] leading-[1.85] text-cream/82 sm:text-[1.18rem]">
              Are you ready to take the next step toward achieving your goals? Contact Vision
              Buildaz today to schedule a consultation. Whether you&apos;re interested in one-on-one
              coaching, workshops, or financial mentorship, we&apos;re here to help. You ready?
              Let&apos;s grow!
            </p>

            <div className="mt-16 border-t border-cream/14 pt-8">
              <p className="text-[1.45rem] font-extrabold uppercase leading-tight text-cream">
                YOU READY? LET&apos;S GROW!
              </p>
              <p className="mt-3 text-small font-semibold text-cream/68">
                Copyright Vision Buildaz, LLC 2026
              </p>
            </div>
          </motion.div>

          <motion.div variants={revealItem}>
            <form
              className="rounded-panel border border-cream/12 bg-cream/[0.06] p-5 shadow-strong backdrop-blur-xl sm:p-8"
              noValidate
              onSubmit={handleSubmit}
            >
              <p className="mb-8 text-center text-[1rem] font-bold text-cream">
                Please Complete Form Details
              </p>

              <div className="space-y-6">
                <div>
                  <div className="relative">
                    <input
                      className="peer h-field w-full rounded-control border border-cream/12 bg-cream/10 px-4 pt-5 text-[1rem] text-cream outline-none transition duration-premium ease-premium placeholder:text-transparent focus:border-accent focus:bg-cream/14 focus:ring-4 focus:ring-accent/20"
                      id="contact-email"
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      type="email"
                      value={form.email}
                    />
                    <label
                      className="pointer-events-none absolute left-4 top-2 text-[0.68rem] font-bold uppercase text-cream/62 transition-all duration-premium ease-premium peer-placeholder-shown:top-[1.12rem] peer-placeholder-shown:text-[0.8rem] peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:text-accent"
                      htmlFor="contact-email"
                    >
                      EMAIL *
                    </label>
                  </div>
                  {errors.email ? (
                    <p className="mt-2 text-small text-accent">{errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <div className="relative">
                    <input
                      className="peer h-field w-full rounded-control border border-cream/12 bg-cream/10 px-4 pt-5 text-[1rem] text-cream outline-none transition duration-premium ease-premium placeholder:text-transparent focus:border-accent focus:bg-cream/14 focus:ring-4 focus:ring-accent/20"
                      id="contact-subject"
                      onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Subject"
                      type="text"
                      value={form.subject}
                    />
                    <label
                      className="pointer-events-none absolute left-4 top-2 text-[0.68rem] font-bold uppercase text-cream/62 transition-all duration-premium ease-premium peer-placeholder-shown:top-[1.12rem] peer-placeholder-shown:text-[0.8rem] peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:text-accent"
                      htmlFor="contact-subject"
                    >
                      SUBJECT
                    </label>
                  </div>
                  {errors.subject ? (
                    <p className="mt-2 text-small text-accent">{errors.subject}</p>
                  ) : null}
                </div>

                <div>
                  <div className="relative">
                    <textarea
                      className="peer min-h-[150px] w-full resize-y rounded-control border border-cream/12 bg-cream/10 px-4 pt-10 text-[1rem] text-cream outline-none transition duration-premium ease-premium placeholder:text-cream/45 focus:border-accent focus:bg-cream/14 focus:ring-4 focus:ring-accent/20"
                      id="contact-message"
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Enter text here"
                      value={form.message}
                    />
                    <label
                      className="pointer-events-none absolute left-4 top-3 text-[0.68rem] font-bold uppercase text-cream/62 transition duration-premium ease-premium peer-focus:text-accent"
                      htmlFor="contact-message"
                    >
                      ADD MESSAGE
                    </label>
                  </div>
                  {errors.message ? (
                    <p className="mt-2 text-small text-accent">{errors.message}</p>
                  ) : null}
                </div>
              </div>

              <motion.button
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(217,154,32,0.3), 0 20px 42px rgba(217,154,32,0.22)",
                    "0 0 0 13px rgba(217,154,32,0), 0 26px 56px rgba(217,154,32,0.28)",
                    "0 0 0 0 rgba(217,154,32,0.3), 0 20px 42px rgba(217,154,32,0.22)"
                  ]
                }}
                className="mt-8 w-full rounded-control bg-accent px-6 py-4 text-small font-extrabold uppercase text-night transition duration-premium ease-premium hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                type="submit"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBMIT
              </motion.button>

              {submitted ? (
                <p className="mt-4 text-center text-small font-semibold text-cream">
                  Form submitted successfully.
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
