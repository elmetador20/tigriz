import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactConfig, hasContactDetails, mapUrl } from "@/config/contact";
import { contact } from "@/content/contact";
import { RevealSection } from "@/motion/RevealSection";
import { ClockIcon, DirectContactStrip, MailIcon, PhoneIcon, PinIcon } from "./ContactChannels";
import { ContactForm } from "./ContactForm";

/** Two parties connecting: nodes, flowing links and an orbiting signal. */
function ConnectionVisual() {
  return (
    <div aria-hidden className="relative mt-12 aspect-[16/9] w-full max-w-md">
      <svg viewBox="0 0 400 225" className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="cv-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#b7f000" stopOpacity="0.25" />
            <stop offset="1" stopColor="#061327" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="112" r="100" fill="url(#cv-glow)" />
        <g stroke="rgb(167 180 200 / 0.2)">
          <circle cx="200" cy="112" r="70" strokeDasharray="2 7" className="origin-center animate-[spin_50s_linear_infinite] [transform-box:fill-box]" />
        </g>
        <g data-r="draw">
          <path d="M70 112 C120 40 280 40 330 112" stroke="#b7f000" strokeOpacity="0.8" strokeWidth="1.5" pathLength={1} />
          <path d="M70 112 C120 184 280 184 330 112" stroke="#29b8d4" strokeOpacity="0.8" strokeWidth="1.5" pathLength={1} />
        </g>
        <path d="M70 112 H330" stroke="rgb(245 247 250 / 0.25)" className="flow-line" />
        {[[70, 112, "#a7b4c8"], [330, 112, "#b7f000"]].map(([x, y, c]) => (
          <g key={String(x)}>
            <circle cx={x as number} cy={y as number} r="9" fill={c as string} className="node-pulse" />
            <circle cx={x as number} cy={y as number} r="22" fill="#0b1b35" stroke={c as string} strokeWidth="1.5" />
            <circle cx={x as number} cy={y as number} r="6" fill={c as string} />
          </g>
        ))}
        <circle cx="200" cy="58" r="4" fill="#b7f000" />
        <circle cx="200" cy="166" r="4" fill="#29b8d4" />
      </svg>
      <span className="label-mono absolute top-[66%] left-[6%] text-[0.58rem] text-muted">Your vision</span>
      <span className="label-mono absolute top-[66%] right-[4%] text-[0.58rem] text-lime">Arabian TIGRIZ</span>
    </div>
  );
}

function InfoBlocks() {
  const c = contactConfig;
  const blocks = [
    c.email && { icon: <MailIcon />, label: "Email", value: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: <PhoneIcon />, label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` },
    c.location && { icon: <PinIcon />, label: "Office", value: c.location, href: mapUrl(c.location), external: true, wide: true },
    c.hours && { icon: <ClockIcon />, label: "Business hours", value: c.hours },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean; wide?: boolean }[];
  const narrowCount = blocks.filter((b) => !b.wide).length;

  return (
    <dl data-r="stagger" className="mt-10 grid gap-3 sm:grid-cols-2">
      {blocks.map((b) => {
        const inner = (
          <>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong text-fg">{b.icon}</span>
            <span className="min-w-0">
              <dt className="font-mono text-[0.6rem] tracking-[0.18em] text-subtle uppercase">{b.label}</dt>
              <dd className={`mt-1 text-[0.95rem] text-fg ${b.wide ? "leading-snug text-pretty" : "truncate"}`}>{b.value}</dd>
            </span>
          </>
        );
        return (
          <div key={b.label} data-r-item className={b.wide || narrowCount === 1 ? "sm:col-span-2" : undefined}>
            {b.href ? (
              <a href={b.href} {...(b.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-800/60 p-4 transition-colors hover:border-lime/50">
                {inner}
              </a>
            ) : (
              <div className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-800/60 p-4">{inner}</div>
            )}
          </div>
        );
      })}
    </dl>
  );
}

/** How an engagement begins — verified copy from the workflow (shown when no direct details are configured). */
function FirstSteps() {
  return (
    <div data-r="up" className="mt-10 rounded-2xl border border-line bg-ink-800/50 p-5">
      <p className="label-mono text-[0.6rem] text-lime">{contact.firstStep.label}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-fg/90">{contact.firstStep.text}</p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6rem] tracking-[0.16em] text-subtle uppercase">
        {contact.firstStep.stages.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={i === 0 ? "text-lime" : ""}>{s}</span>
            {i < contact.firstStep.stages.length - 1 && <span aria-hidden>→</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Contact() {
  return (
    <RevealSection id="contact" labelledBy="contact-heading" className="relative isolate scroll-mt-20 overflow-x-clip py-[var(--section-y)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[15%] left-[-15%] h-[60%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.07),transparent)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-0 h-[50%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.07),transparent)] blur-3xl" />
      </div>
      <div className="container-x">
        <div className="grid gap-14 xl:grid-cols-12 xl:gap-12">
          <div className="xl:col-span-5">
            <div className="xl:sticky xl:top-28">
              <SectionHeading headingId="contact-heading" label={contact.eyebrow} lines={[contact.heading[0], { text: contact.heading[1], tone: "lime" }]} />
              <p data-r="up" className="mt-8 max-w-lg text-lg leading-relaxed text-pretty text-muted">
                {contact.description}
              </p>
              <ConnectionVisual />
              {hasContactDetails ? <InfoBlocks /> : <FirstSteps />}
            </div>
          </div>
          <div className="xl:col-span-7">
            <div data-r="up">
              <ContactForm />
            </div>
            <DirectContactStrip />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
