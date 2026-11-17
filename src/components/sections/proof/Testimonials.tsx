import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/proof";
import { RevealSection } from "@/motion/RevealSection";
import { SampleBadge } from "./SampleBadge";

type Item = (typeof testimonials.items)[number];

function initials(role: string) {
  return role
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function Attribution({ t }: { t: Item }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-lime">
        {initials(t.role)}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-fg">{t.role}</span>
        <span className="mt-1 text-xs text-muted">{t.org}</span>
      </span>
    </figcaption>
  );
}

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="currentColor" aria-hidden>
      <path d="M0 24V14C0 6.3 4.2 1.6 12.6 0l1.3 3.4C9.3 4.8 7 7.4 6.8 11.2H13V24H0Zm18.6 0V14c0-7.7 4.2-12.4 12.6-14l1.3 3.4c-4.6 1.4-6.9 4-7.1 7.8h6.2V24H18.6Z" />
    </svg>
  );
}

/** One featured quote, then the rest in a grid. */
export function Testimonials() {
  const [featured, ...rest] = testimonials.items;
  return (
    <RevealSection labelledBy="testimonials-heading" className="relative isolate overflow-x-clip border-t border-line py-[var(--section-y)]">
      <div aria-hidden className="pointer-events-none absolute top-[5%] left-[-15%] -z-10 h-[60%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.06),transparent)] blur-3xl" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading headingId="testimonials-heading" label={testimonials.eyebrow} lines={[testimonials.heading[0], { text: testimonials.heading[1], tone: "muted" }]} />
          <SampleBadge className="self-start lg:self-end" />
        </div>

        <figure data-r="up" className="relative mt-14 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-ink-700/80 to-ink-800/60 p-7 sm:p-10 lg:mt-20 lg:p-14">
          <QuoteMark className="w-10 text-lime sm:w-12" />
          <blockquote className="mt-6 max-w-4xl font-display text-[clamp(1.35rem,2.6vw,2.2rem)] leading-[1.25] font-medium tracking-[-0.02em] text-balance text-fg">
            {featured.quote}
          </blockquote>
          <div className="mt-8 sm:mt-10">
            <Attribution t={featured} />
          </div>
        </figure>

        <ul data-r="stagger" className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {rest.map((t) => (
            <li key={t.role + t.org} data-r-item>
              <figure className="flex h-full flex-col rounded-[24px] border border-line bg-ink-800/50 p-6 transition-colors duration-500 hover:border-line-strong">
                <QuoteMark className="w-6 text-subtle" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-pretty text-muted">{t.quote}</blockquote>
                <div className="mt-6 border-t border-line pt-5">
                  <Attribution t={t} />
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
