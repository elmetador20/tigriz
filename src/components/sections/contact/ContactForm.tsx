"use client";

import { useRef, useState } from "react";
import { useForm, useWatch, type FieldPath, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, LoaderCircle, RotateCcw, TriangleAlert } from "lucide-react";
import {
  BUDGET_OPTIONS,
  DESCRIPTION_MAX,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  enquirySchema,
  type Enquiry,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { contactConfig } from "@/config/contact";

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

const MESSAGES: Record<string, string> = {
  not_configured:
    "Online enquiries aren't available at the moment, so your message was not sent. Please try again later.",
  rate_limited: "You've sent several enquiries in a short time. Please wait a few minutes and try again.",
  delivery_failed: "We couldn't deliver your enquiry just now. Your details are still here — please try again.",
  bad_request: "Something went wrong with that request. Please check your details and try again.",
  invalid: "Some details need attention. Please review the highlighted fields.",
  network: "We couldn't reach the server. Please check your connection and try again.",
};

const input =
  "w-full rounded-xl border bg-ink-900/60 px-4 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-300 outline-none focus:border-lime/70 focus:shadow-[0_0_0_3px_rgb(183_240_0/0.15)] aria-[invalid=true]:border-danger/70";

function Field({ id, label, optional, error, hint, children }: { id: string; label: string; optional?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
        <span>
          {label}
          {!optional && <span aria-hidden className="ml-0.5 text-lime">*</span>}
        </span>
        {optional && <span className="font-mono text-[0.6rem] tracking-[0.16em] text-subtle uppercase">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <TriangleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function Chip({ type, name, value, register, label }: { type: "checkbox" | "radio"; name: string; value: string; register: UseFormRegister<EnquiryInput>; label: string }) {
  return (
    <label className="group relative cursor-pointer">
      <input type={type} value={value} {...register(name as FieldPath<EnquiryInput>)} className="peer sr-only" />
      <span className="flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/40 px-4 py-2 text-[0.86rem] text-fg/85 transition-colors duration-300 group-hover:border-fg/40 peer-checked:border-lime/70 peer-checked:bg-lime/10 peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
        <span
          aria-hidden
          className={`grid size-4 shrink-0 place-items-center border border-line-strong transition-colors group-has-[:checked]:border-lime group-has-[:checked]:bg-lime ${type === "radio" ? "rounded-full" : "rounded-[5px]"}`}
        >
          <Check className="size-3 text-ink-900 opacity-0 transition-opacity group-has-[:checked]:opacity-100" strokeWidth={3} />
        </span>
        {label}
      </span>
    </label>
  );
}

/**
 * Project enquiry form. Validates with the shared Zod schema on the client
 * and again on the server (/api/enquiry). Success is only shown when the
 * server confirms delivery.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inFlight = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", company: "", phone: "", services: [], description: "", budget: "", timeline: "", website: "" },
  });

  const descLen = (useWatch({ control, name: "description" }) ?? "").length;

  const onSubmit = async (data: Enquiry) => {
    if (inFlight.current) return; // duplicate-submission guard
    inFlight.current = true;
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => null)) as EnquiryResponse | null;
      if (res.ok && body?.ok) {
        setStatus({ kind: "success" });
        reset();
        requestAnimationFrame(() => heading.current?.focus());
        return;
      }
      if (body && !body.ok && body.error === "invalid") {
        Object.entries(body.fieldErrors).forEach(([k, msg]) => msg && setError(k as FieldPath<EnquiryInput>, { message: msg }));
      }
      setStatus({ kind: "error", message: MESSAGES[(body && !body.ok && body.error) || "delivery_failed"] });
    } catch {
      setStatus({ kind: "error", message: MESSAGES.network });
    } finally {
      inFlight.current = false;
    }
  };

  const a11y = (name: keyof EnquiryInput, hint = false) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : hint ? `${name}-hint` : undefined,
  });

  if (status.kind === "success") {
    return (
      <div className="flex min-h-[32rem] flex-col items-center justify-center rounded-[28px] border border-lime/30 bg-ink-800/70 p-8 text-center sm:p-12" role="status">
        <span className="grid size-20 place-items-center rounded-full border border-lime/50 bg-lime/10 shadow-[0_0_50px_-10px_rgb(183_240_0/0.6)]">
          <svg viewBox="0 0 24 24" className="size-9 text-lime" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12.5 10 17.5 19 7" pathLength={1} strokeDasharray="1" className="animate-[redraw_0.9s_var(--ease-out-expo)]" />
          </svg>
        </span>
        <h3 ref={heading} tabIndex={-1} className="mt-8 font-display text-3xl font-medium tracking-[-0.02em] text-fg outline-none">
          Thank you — your enquiry has been sent.
        </h3>
        <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-muted">
          We&apos;ve received your project details and will review them before getting back to you at the email you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:border-fg/50"
        >
          <RotateCcw aria-hidden className="size-4" />
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      aria-labelledby="enquiry-heading"
      aria-busy={isSubmitting}
      className="relative rounded-[28px] border border-line bg-ink-800/70 p-5 backdrop-blur-sm sm:p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 id="enquiry-heading" className="font-display text-2xl font-medium tracking-[-0.02em] text-fg sm:text-3xl">
          Tell Us About Your Project
        </h3>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" error={errors.fullName?.message}>
          <input id="fullName" autoComplete="name" className={`${input} h-12 border-line-strong`} {...register("fullName")} {...a11y("fullName")} />
        </Field>
        <Field id="email" label="Work Email" error={errors.email?.message}>
          <input id="email" type="email" inputMode="email" autoComplete="email" className={`${input} h-12 border-line-strong`} {...register("email")} {...a11y("email")} />
        </Field>
        <Field id="company" label="Company / Organisation" error={errors.company?.message}>
          <input id="company" autoComplete="organization" className={`${input} h-12 border-line-strong`} {...register("company")} {...a11y("company")} />
        </Field>
        <Field id="phone" label="Phone Number" optional error={errors.phone?.message} hint="Include your country code if you're outside Saudi Arabia.">
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" className={`${input} h-12 border-line-strong`} {...register("phone")} {...a11y("phone", true)} />
        </Field>
      </div>

      <fieldset className="mt-8" aria-invalid={errors.services ? true : undefined} aria-describedby={errors.services ? "services-error" : undefined}>
        <legend className="text-sm font-medium text-fg">
          What Are You Looking For?<span aria-hidden className="ml-0.5 text-lime">*</span>
          <span className="ml-2 text-xs font-normal text-subtle">Choose all that apply</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((o) => (
            <Chip key={o} type="checkbox" name="services" value={o} register={register} label={o} />
          ))}
        </div>
        {errors.services && (
          <p id="services-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-danger">
            <TriangleAlert aria-hidden className="size-3.5" />
            {errors.services.message}
          </p>
        )}
      </fieldset>

      <div className="mt-8">
        <Field id="description" label="Project Description" error={errors.description?.message} hint="Your goals, current challenges and what you'd like to build.">
          <textarea
            id="description"
            rows={5}
            maxLength={DESCRIPTION_MAX}
            className={`${input} min-h-36 resize-y border-line-strong py-3 leading-relaxed`}
            {...register("description")}
            {...a11y("description", true)}
          />
        </Field>
        <p aria-live="polite" className="mt-1 text-right font-mono text-[0.62rem] text-subtle tabular-nums">
          {descLen}/{DESCRIPTION_MAX}
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <fieldset>
          <legend className="flex w-full items-baseline justify-between text-sm font-medium text-fg">
            Estimated Budget <span className="font-mono text-[0.6rem] tracking-[0.16em] text-subtle uppercase">Optional</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((o) => (
              <Chip key={o} type="radio" name="budget" value={o} register={register} label={o} />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="flex w-full items-baseline justify-between text-sm font-medium text-fg">
            Expected Timeline <span className="font-mono text-[0.6rem] tracking-[0.16em] text-subtle uppercase">Optional</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMELINE_OPTIONS.map((o) => (
              <Chip key={o} type="radio" name="timeline" value={o} register={register} label={o} />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status.kind === "error" && (
        <div role="alert" className="mt-8 flex items-start gap-3 rounded-2xl border border-danger/40 bg-danger/10 p-4 text-sm leading-relaxed text-fg">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
          <span>
            {status.message}
            {contactConfig.email && (
              <>
                {" "}You can also reach us directly at{" "}
                <a href={`mailto:${contactConfig.email}`} className="font-medium text-lime underline underline-offset-4">
                  {contactConfig.email}
                </a>
                .
              </>
            )}
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">
          <span className="text-lime">*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium whitespace-nowrap text-ink-900 transition-[box-shadow,opacity] duration-500 hover:shadow-[0_0_44px_-8px_rgb(183_240_0/0.65)] disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Send Project Enquiry"}
          <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
            {isSubmitting ? (
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
            ) : (
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
