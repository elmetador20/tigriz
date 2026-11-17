"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { workflow } from "@/content/approach";

/** Custom 24px stage icons. */
const icons: Record<string, React.JSX.Element> = {
  understand: (
    <>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" stroke="#b7f000" />
    </>
  ),
  strategise: (
    <>
      <circle cx="5.5" cy="18.5" r="2" />
      <path d="M7.5 18.5h4a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h7" />
      <path d="M16.5 3.5v6M16.5 3.5l4 1.5-4 1.5" stroke="#b7f000" />
    </>
  ),
  create: (
    <>
      <path d="M12 3.5 16.5 9 12 20.5 7.5 9Z" />
      <path d="M12 9v5" stroke="#b7f000" />
      <circle cx="12" cy="15.5" r="1.4" stroke="#b7f000" />
      <path d="M19.5 3.5v3M18 5h3" stroke="#b7f000" />
    </>
  ),
  implement: (
    <>
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="3.5" width="7" height="7" rx="1.5" stroke="#b7f000" />
      <path d="M12 10.5v3" />
    </>
  ),
  evolve: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" stroke="#b7f000" />
      <path d="M8.5 14.5 11 12l2 2 3-3.5" stroke="#b7f000" />
    </>
  ),
};

/**
 * Five-stage project workflow.
 * - Scroll: the connecting line draws and stages activate (shared step helper).
 *   Without a selection, the scroll-current stage is expanded (CSS).
 * - Hover / focus / click a stage to expand it explicitly.
 * - Arrow keys move between stages. Vertical layout below lg shows all text.
 */
export function WorkflowTimeline() {
  const stages = workflow.stages;
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = ["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + stages.length) % stages.length;
    refs.current[next]?.focus();
    setOpen(next);
  };

  return (
    <div data-tl data-wf data-selected={open !== null ? "" : undefined} className="relative">
      {/* Track + fill */}
      <div
        aria-hidden
        className="absolute top-[30px] bottom-[30px] left-[29px] w-px bg-line-strong lg:top-[30px] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto"
      >
        <div data-tl-fill className="absolute inset-0 origin-top bg-gradient-to-b from-cyan to-lime shadow-[0_0_12px_rgb(183_240_0/0.5)] lg:origin-left lg:bg-gradient-to-r" />
      </div>

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
        {stages.map((s, i) => {
          const descId = `wf-desc-${s.key}`;
          return (
            <li key={s.key} data-tl-step data-open={open === i} className="tl-step wf-step flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <button
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                aria-expanded={open === i}
                aria-controls={descId}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(i)}
                onBlur={(e) => {
                  // Leaving the timeline hands control back to scroll activation.
                  if (!(e.relatedTarget as HTMLElement | null)?.closest?.("[data-wf]")) setOpen(null);
                }}
                onClick={(e) => {
                  const pt = (e.nativeEvent as PointerEvent).pointerType;
                  setOpen((cur) => (pt === "mouse" ? i : cur === i ? null : i));
                }}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex shrink-0 flex-col items-center gap-4 rounded-2xl text-left lg:text-center"
              >
                <span className="tl-dot relative z-[1] grid size-[3.75rem] place-items-center rounded-full border border-line-strong bg-ink-900 text-fg transition-transform duration-500 ease-out-expo group-hover:scale-105">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {icons[s.key]}
                  </svg>
                </span>
                <span className="sr-only">
                  Stage {i + 1}: {s.title}
                </span>
              </button>

              <div className="tl-label min-w-0 flex-1 pt-1 lg:pt-0">
                <p className="font-mono text-[0.62rem] tracking-[0.22em] text-subtle">STAGE {String(i + 1).padStart(2, "0")}</p>
                <h3 aria-hidden className="wf-title mt-1.5 font-display text-xl font-semibold tracking-[0.06em] text-fg uppercase transition-colors duration-500">
                  {s.title}
                </h3>
                {/* Fixed-height slot on desktop prevents layout shift when expanding */}
                <div className="lg:h-[7.5rem]">
                  <div id={descId} className="wf-desc">
                    <div>
                      <p className="mt-3 max-w-[17rem] text-[0.92rem] leading-relaxed text-pretty text-muted lg:mx-auto">{s.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
