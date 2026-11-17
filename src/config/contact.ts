/**
 * Public contact configuration.
 *
 * Email and office address are verified by Arabian TIGRIZ and used as defaults;
 * every value can be overridden by an environment variable (see .env.example).
 * Phone, hours, WhatsApp and social links have no default and render only when set.
 * Do not add contact details here that the company has not verified.
 */

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

const social = [
  { key: "linkedin", label: "LinkedIn", url: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
  { key: "instagram", label: "Instagram", url: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
  { key: "x", label: "X", url: clean(process.env.NEXT_PUBLIC_SOCIAL_X) },
  { key: "facebook", label: "Facebook", url: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
].filter((s): s is { key: string; label: string; url: string } => Boolean(s.url));

/** Verified office details (Riyadh head office). */
export const office = {
  email: "info@arabiantigriz.com",
  address: {
    street: "King Saud Ibn Abdulaziz Saud St.",
    district: "Al Murabba District",
    city: "Riyadh",
    postalCode: "12624",
    country: "Kingdom of Saudi Arabia",
    countryCode: "SA",
    full: "King Saud Ibn Abdulaziz Saud St., Al Murabba District, Riyadh 12624, Kingdom of Saudi Arabia",
  },
} as const;

/** Google Maps search link for an address. */
export const mapUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const whatsappDigits = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/[^\d]/g, "");

export const contactConfig = {
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? office.email,
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  location: clean(process.env.NEXT_PUBLIC_CONTACT_LOCATION) ?? office.address.full,
  hours: clean(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  whatsapp: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
  social,
  /** Absolute site URL, used for metadata, sitemap and structured data. */
  siteUrl: clean(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/$/, ""),
} as const;

export type SocialLink = (typeof social)[number];

export const hasContactDetails = Boolean(contactConfig.email || contactConfig.phone || contactConfig.location || contactConfig.hours);
export const hasDirectChannels = Boolean(contactConfig.email || contactConfig.whatsapp || contactConfig.social.length);
