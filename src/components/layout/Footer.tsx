import Link from "next/link";
import { AtMark } from "@/components/brand/AtMark";
import { MailIcon, PinIcon, SocialLinks } from "@/components/sections/contact/ContactChannels";
import { contactConfig, mapUrl } from "@/config/contact";
import { footer } from "@/content/contact";
import { brand } from "@/content/site";
import { RevealSection } from "@/motion/RevealSection";
import { cacheLife } from "next/cache";
import { BackToTop } from "./FooterClient";

/** Current year, rendered on the server and refreshed daily (Cache Components–safe). */
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * Footer: large brand typography, brand column with animated monogram,
 * three link columns (in-page anchors → Lenis smooth scroll), bottom bar.
 * Legal links are intentionally absent until policy pages exist.
 */
export async function Footer() {
  const year = await currentYear();
  return (
    <RevealSection as="footer" className="relative isolate overflow-hidden border-t border-line bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.08),transparent)]" />
        {/* Decorative lines */}
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-64 w-full" fill="none">
          <g data-r="draw" stroke="rgb(167 180 200 / 0.12)">
            <path d="M0 120 C360 60 720 180 1080 100 S1440 80 1440 80" pathLength={1} />
            <path d="M0 200 C300 150 760 260 1100 170 S1440 150 1440 150" pathLength={1} />
          </g>
          <path d="M0 120 C360 60 720 180 1080 100 S1440 80 1440 80" stroke="#b7f000" strokeOpacity="0.35" className="flow-line" />
        </svg>
      </div>

      <div className="container-x pt-20 sm:pt-28">
        {/* Large brand typography */}
        <p
          aria-hidden
          data-r="up"
          className="bg-gradient-to-b from-fg/90 to-fg/10 bg-clip-text font-display text-[clamp(2.6rem,11.5vw,11rem)] leading-[0.85] font-semibold tracking-[-0.05em] text-transparent select-none"
        >
          Arabian TIGRIZ
        </p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-lime/60 via-line-strong to-transparent" />

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="Arabian TIGRIZ — home" className="group inline-flex items-center gap-4">
              <span className="relative grid size-16 place-items-center rounded-2xl border border-line-strong bg-ink-900 transition-colors duration-500 group-hover:border-lime/50">
                <AtMark className="w-10 transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5 [&_[data-at=swoosh]]:animate-[swoosh-glint_4s_ease-in-out_infinite]" />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-sm font-semibold tracking-[0.28em] text-fg">{brand.wordmark}</span>
                <span className="mt-1 font-mono text-[0.58rem] tracking-[0.3em] text-muted uppercase">{brand.descriptor}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-muted">{footer.description}</p>
            <address className="mt-6 flex max-w-sm flex-col gap-3 text-[0.92rem] not-italic">
              {contactConfig.email && (
                <a href={`mailto:${contactConfig.email}`} className="group inline-flex items-center gap-3 text-fg transition-colors duration-300 hover:text-lime">
                  <MailIcon className="size-[1.1rem] shrink-0 text-muted" />
                  {contactConfig.email}
                </a>
              )}
              {contactConfig.location && (
                <a href={mapUrl(contactConfig.location)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-3 leading-relaxed text-muted transition-colors duration-300 hover:text-fg">
                  <PinIcon className="mt-0.5 size-[1.1rem] shrink-0" />
                  {contactConfig.location}
                </a>
              )}
            </address>
            <p className="mt-6 font-display text-xl font-medium tracking-[-0.01em] text-fg">
              {brand.tagline[0]} {brand.tagline[1]} <span className="text-lime">{brand.tagline[2]}</span>
            </p>
            {contactConfig.social.length > 0 && <SocialLinks links={contactConfig.social} className="mt-6" />}
          </div>

          {/* Link columns */}
          {footer.columns.map((col, i) => (
            <nav key={col.title} aria-label={`${col.title} links`} className={i === 2 ? "lg:col-span-2" : "lg:col-span-3"}>
              <h2 className="font-mono text-[0.62rem] tracking-[0.22em] text-lime uppercase">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="group inline-flex items-center gap-2 text-[0.92rem] text-muted transition-colors duration-300 hover:text-fg">
                      <span aria-hidden className="h-px w-0 bg-lime transition-[width] duration-500 ease-out-expo group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            © {year} {brand.name}. {brand.descriptor}.
          </p>
          <BackToTop />
        </div>
      </div>
    </RevealSection>
  );
}
