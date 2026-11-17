import { z } from "zod";

/** Shared by the enquiry form (client) and /api/enquiry (server). */

export const SERVICE_OPTIONS = [
  "Consultancy & Business Documentation",
  "Pitch Deck & Company Profile",
  "Branding & Creative Design",
  "Website Development",
  "Mobile Application Development",
  "AI & Automation",
  "ERP / CRM / Enterprise Solutions",
  "Data & Analytics",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹5,00,000",
  "Above ₹5,00,000",
  "Not Decided Yet",
] as const;

export const TIMELINE_OPTIONS = ["Immediately", "Within 1 Month", "1–3 Months", "3–6 Months", "Flexible"] as const;

export const DESCRIPTION_MAX = 2000;

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal("")]).optional().transform((v) => (v ? v : undefined));

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.string().trim().min(1, "Please enter your work email.").email("Please enter a valid email address.").max(200),
  company: z.string().trim().min(2, "Please enter your company or organisation.").max(160, "Company name is too long."),
  phone: z
    .string()
    .trim()
    .max(25, "Phone number is too long.")
    .refine((v) => v === "" || /^\+?[\d\s()-]{7,20}$/.test(v), "Please enter a valid phone number, including country code if outside Saudi Arabia.")
    .optional()
    .transform((v) => (v ? v : undefined)),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Please choose at least one option."),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(DESCRIPTION_MAX, `Please keep the description under ${DESCRIPTION_MAX} characters.`),
  budget: optionalEnum(BUDGET_OPTIONS),
  timeline: optionalEnum(TIMELINE_OPTIONS),
  /** Honeypot — must stay empty. Hidden from people and assistive tech. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** API response contract. */
export type EnquiryResponse =
  | { ok: true }
  | { ok: false; error: "invalid"; fieldErrors: Partial<Record<keyof EnquiryInput, string>> }
  | { ok: false; error: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" };
