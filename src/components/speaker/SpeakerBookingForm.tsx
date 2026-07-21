import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { createId, getContactSubmissions, STORAGE_KEYS, writeJson } from "@/lib/adminData";

interface BookingFormData {
  organization: string;
  contactName: string;
  email: string;
  eventType: string;
  requestedDate: string;
  location: string;
  audienceSize: string;
  eventObjective: string;
}

type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

const initialForm: BookingFormData = {
  organization: "",
  contactName: "",
  email: "",
  eventType: "",
  requestedDate: "",
  location: "",
  audienceSize: "",
  eventObjective: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClassName =
  "min-h-[56px] w-full rounded-2xl border border-[#d8d2c5] bg-white px-4 text-[15px] text-[#0b1930] outline-none transition placeholder:text-[#7b8290] hover:border-[#b8ad9b] focus:border-[#c6973d] focus:ring-4 focus:ring-[#d9a94f]/15";

export function SpeakerBookingForm(): JSX.Element {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof BookingFormData, value: string): void => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors: BookingFormErrors = {};
    if (!form.organization.trim()) nextErrors.organization = "Please enter your organization.";
    if (!form.contactName.trim()) nextErrors.contactName = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!emailPattern.test(form.email)) nextErrors.email = "Please enter a valid email.";
    if (!form.eventType) nextErrors.eventType = "Please select an event type.";
    if (!form.location.trim())
      nextErrors.location = "Please add a location or note that the event is virtual.";
    if (!form.eventObjective.trim())
      nextErrors.eventObjective = "Please tell us what your audience needs.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const bookingDetails = [
      `Organization: ${form.organization.trim()}`,
      `Event type: ${form.eventType}`,
      `Requested date: ${form.requestedDate || "Flexible / to be determined"}`,
      `Location or virtual: ${form.location.trim()}`,
      `Audience size: ${form.audienceSize || "To be determined"}`,
      "",
      "Event objective:",
      form.eventObjective.trim()
    ].join("\n");

    writeJson(STORAGE_KEYS.contacts, [
      {
        id: createId("speaker"),
        name: form.contactName.trim(),
        email: form.email.trim(),
        phone: "",
        message: bookingDetails,
        subject: `Speaker inquiry — ${form.eventType}`,
        submittedAt: new Date().toISOString(),
        read: false
      },
      ...getContactSubmissions()
    ]);

    setForm(initialForm);
    setErrors({});
    setSubmitted(true);
  };

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField error={errors.organization} id="speaker-organization" label="Organization">
          <input
            aria-describedby={errors.organization ? "speaker-organization-error" : undefined}
            aria-invalid={Boolean(errors.organization)}
            autoComplete="organization"
            className={fieldClassName}
            id="speaker-organization"
            onChange={(event) => updateField("organization", event.target.value)}
            placeholder="Organization name"
            type="text"
            value={form.organization}
          />
        </FormField>

        <FormField error={errors.contactName} id="speaker-contact-name" label="Contact name">
          <input
            aria-describedby={errors.contactName ? "speaker-contact-name-error" : undefined}
            aria-invalid={Boolean(errors.contactName)}
            autoComplete="name"
            className={fieldClassName}
            id="speaker-contact-name"
            onChange={(event) => updateField("contactName", event.target.value)}
            placeholder="Your full name"
            type="text"
            value={form.contactName}
          />
        </FormField>

        <FormField error={errors.email} id="speaker-email" label="Email">
          <input
            aria-describedby={errors.email ? "speaker-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={fieldClassName}
            id="speaker-email"
            inputMode="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@organization.com"
            type="email"
            value={form.email}
          />
        </FormField>

        <FormField error={errors.eventType} id="speaker-event-type" label="Event type">
          <select
            aria-describedby={errors.eventType ? "speaker-event-type-error" : undefined}
            aria-invalid={Boolean(errors.eventType)}
            className={`${fieldClassName} appearance-none`}
            id="speaker-event-type"
            onChange={(event) => updateField("eventType", event.target.value)}
            value={form.eventType}
          >
            <option value="">Select a format</option>
            <option>Keynote</option>
            <option>Fireside conversation</option>
            <option>Leadership workshop</option>
            <option>Executive retreat</option>
            <option>Panel</option>
            <option>Community or faith event</option>
            <option>Virtual presentation</option>
            <option>Other</option>
          </select>
        </FormField>

        <FormField
          error={errors.requestedDate}
          id="speaker-requested-date"
          label="Requested date"
          optional
        >
          <input
            className={fieldClassName}
            id="speaker-requested-date"
            onChange={(event) => updateField("requestedDate", event.target.value)}
            type="date"
            value={form.requestedDate}
          />
        </FormField>

        <FormField error={errors.location} id="speaker-location" label="Location or virtual">
          <input
            aria-describedby={errors.location ? "speaker-location-error" : undefined}
            aria-invalid={Boolean(errors.location)}
            autoComplete="address-level2"
            className={fieldClassName}
            id="speaker-location"
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="City, state or virtual platform"
            type="text"
            value={form.location}
          />
        </FormField>
      </div>

      <FormField
        error={errors.audienceSize}
        id="speaker-audience-size"
        label="Audience size"
        optional
      >
        <select
          className={`${fieldClassName} appearance-none`}
          id="speaker-audience-size"
          onChange={(event) => updateField("audienceSize", event.target.value)}
          value={form.audienceSize}
        >
          <option value="">Select an estimated range</option>
          <option>Under 50</option>
          <option>50–150</option>
          <option>151–500</option>
          <option>501–1,000</option>
          <option>1,000+</option>
          <option>To be determined</option>
        </select>
      </FormField>

      <FormField error={errors.eventObjective} id="speaker-event-objective" label="Event objective">
        <textarea
          aria-describedby={errors.eventObjective ? "speaker-event-objective-error" : undefined}
          aria-invalid={Boolean(errors.eventObjective)}
          className={`${fieldClassName} min-h-[146px] resize-y py-4 leading-relaxed`}
          id="speaker-event-objective"
          onChange={(event) => updateField("eventObjective", event.target.value)}
          placeholder="What should your audience see, decide, or change after this event?"
          value={form.eventObjective}
        />
      </FormField>

      <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[12px] leading-relaxed text-[#67707d]">
          Share the essentials now. The Vision Buildaz team can work through program details with
          you.
        </p>
        <button
          className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#0a1a32] px-6 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(7,20,38,0.2)] transition hover:-translate-y-0.5 hover:bg-[#16335a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6973d] focus-visible:ring-offset-2 sm:w-auto"
          type="submit"
        >
          Bring WD to Your Event
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>

      <div aria-live="polite">
        {submitted ? (
          <p className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] font-semibold text-emerald-800">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0" />
            Thank you. Your speaker inquiry has been submitted.
          </p>
        ) : null}
      </div>
    </form>
  );
}

interface FormFieldProps {
  children: JSX.Element;
  error?: string;
  id: string;
  label: string;
  optional?: boolean;
}

function FormField({ children, error, id, label, optional = false }: FormFieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#263650]"
        htmlFor={id}
      >
        {label}
        {optional ? (
          <span className="ml-1 font-semibold normal-case tracking-normal text-[#838a94]">
            (optional)
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] font-semibold text-[#a33a2c]" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
