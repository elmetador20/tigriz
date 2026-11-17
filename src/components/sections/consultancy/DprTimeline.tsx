import { dprComponents } from "@/content/consultancy";

/**
 * Typical DPR components as a connected timeline.
 * Horizontal (9 columns) from lg, vertical below. ConsultancyMotion draws
 * [data-tl-fill] with scroll and flips data-on / data-current on each step.
 */
export function DprTimeline() {
  const steps = dprComponents.steps;
  return (
    <div id="dpr" data-tl className="relative scroll-mt-28 rounded-[24px] border border-line bg-ink-800/50 p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 data-r="left" className="label-mono flex items-center gap-4 text-sm text-fg">
          <span className="h-px w-10 bg-lime" />
          {dprComponents.title}
        </h3>
        <p data-r="up" className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">
          {String(steps.length).padStart(2, "0")} stages
        </p>
      </div>

      <div className="relative mt-10 lg:mt-14">
        {/* Track + fill: horizontal from lg, vertical below */}
        <div
          aria-hidden
          className="absolute top-[22px] bottom-[22px] left-[21px] w-px bg-line-strong lg:top-[22px] lg:right-[calc(100%/18)] lg:bottom-auto lg:left-[calc(100%/18)] lg:h-px lg:w-auto"
        >
          <div data-tl-fill className="absolute inset-0 origin-top bg-lime shadow-[0_0_12px_rgb(183_240_0/0.6)] lg:origin-left" />
        </div>

        <ol className="relative grid gap-7 lg:grid-cols-9 lg:gap-3">
          {steps.map((label, i) => (
            <li key={label} data-tl-step className="tl-step flex items-start gap-5 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
              <span className="tl-dot relative z-[1] grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-fg tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="tl-label pt-2.5 font-display text-[0.98rem] leading-snug text-fg lg:max-w-[9rem] lg:pt-0 lg:text-[0.92rem]">
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
