import { SectionHeading } from "@/components/ui/SectionHeading";
import { engineeringProcess } from "@/content/technologies";

/** Small custom technical icons per stage (20px line icons). */
const icon: Record<string, React.JSX.Element> = {
  discover: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13 13 L17.5 17.5" />
      <path d="M9 6.5 V11.5 M6.5 9 H11.5" stroke="#b7f000" />
    </>
  ),
  architect: (
    <>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" />
      <rect x="7" y="11.5" width="6" height="6" rx="1" stroke="#b7f000" />
      <path d="M5.5 8.5 V10 H10 V11.5 M14.5 8.5 V10 H10" />
    </>
  ),
  engineer: (
    <>
      <path d="M7 5 L2.5 10 L7 15 M13 5 L17.5 10 L13 15" />
      <path d="M11.5 3.5 L8.5 16.5" stroke="#b7f000" />
    </>
  ),
  integrate: (
    <>
      <path d="M8 6 H5 a4 4 0 0 0 0 8 H8 M12 6 H15 a4 4 0 0 1 0 8 H12" />
      <path d="M7 10 H13" stroke="#b7f000" />
    </>
  ),
  evolve: (
    <>
      <path d="M3 16 L8 11 L11 13.5 L17 6.5" stroke="#b7f000" />
      <path d="M13 6.5 H17 V10.5" stroke="#b7f000" />
      <path d="M3 3 V17 H17" />
    </>
  ),
};

/**
 * Engineering approach: horizontal connected timeline from lg, vertical below.
 * Uses the shared step-timeline contract (motion/steps.ts).
 */
export function EngineeringProcess() {
  const p = engineeringProcess;
  return (
    <section id="tech-process" aria-labelledby="tech-process-heading" className="relative scroll-mt-24 py-[calc(var(--section-y)*0.8)]">
      <div className="container-x">
        <SectionHeading headingId="tech-process-heading" label={p.eyebrow} lines={[p.heading[0], { text: p.heading[1], tone: "muted" }]} />

        <div data-tl className="relative mt-14 lg:mt-20">
          <div
            aria-hidden
            className="absolute top-[30px] bottom-[30px] left-[29px] w-px bg-line-strong lg:top-[30px] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto"
          >
            <div data-tl-fill className="absolute inset-0 origin-top bg-lime shadow-[0_0_12px_rgb(183_240_0/0.6)] lg:origin-left" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {p.stages.map((s, i) => (
              <li key={s.key} data-tl-step className="tl-step flex gap-6 lg:flex-col lg:items-center lg:text-center">
                <span className="tl-dot relative z-[1] grid size-[3.75rem] shrink-0 place-items-center rounded-full border border-line-strong bg-ink-900 text-fg">
                  <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {icon[s.key]}
                  </svg>
                </span>
                <div className="tl-label pt-1 lg:pt-0">
                  <p className="font-display text-[clamp(2.4rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-fg/15">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-[0.1em] text-fg uppercase">{s.label}</h3>
                  <p className="mt-2 max-w-[16rem] text-[0.92rem] leading-relaxed text-pretty text-muted lg:mx-auto">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
