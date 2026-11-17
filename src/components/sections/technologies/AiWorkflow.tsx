"use client";

import { useEffect, useRef, useState } from "react";
import { HubDiagram } from "@/components/visuals/HubDiagram";
import { ai } from "@/content/technologies";

/**
 * Illustrative AI workflow: AI engine hub + an INPUT → OUTPUT pipeline.
 * Clicking a stage highlights its role. Until the visitor interacts, the
 * demo steps through stages on its own — only while on screen and only
 * when motion is allowed. No real AI processing happens here.
 */
export function AiWorkflow() {
  const stages = ai.pipeline;
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => setActive((a) => (a + 1) % stages.length), 2800);
    });
    if (box.current) io.observe(box.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [touched, stages.length]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const s = stages[active];

  return (
    <div ref={box} data-r="clip" className="relative overflow-hidden rounded-[28px] border border-line bg-ink-900/80">
      <div data-r-zoom className="relative p-5 sm:p-8 lg:p-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          {/* Engine hub */}
          <div className="lg:col-span-7">
            <HubDiagram center={ai.engine.center} idle={ai.engine.idle} nodes={ai.engine.nodes} className="mx-auto max-w-[520px]" />
          </div>

          {/* Floating automation interface */}
          <div aria-hidden className="relative hidden gap-3 sm:grid lg:col-span-5">
            <div data-float="0.6" className="rounded-2xl border border-line bg-ink-800/90 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">Incoming request</span>
                <span className="size-4 animate-spin rounded-full border-2 border-lime/30 border-t-lime [animation-duration:1.4s]" />
              </div>
              <div className="mt-3 space-y-1.5">
                <span className="block h-[6px] w-[80%] rounded-full bg-fg/30" />
                <span className="block h-[6px] w-[55%] rounded-full bg-fg/15" />
              </div>
              <div className="mt-3 flex gap-1.5">
                {["Classified", "Extracted"].map((t) => (
                  <span key={t} className="rounded-full border border-lime/40 px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.12em] text-lime uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div data-float="1" className="ml-8 rounded-2xl border border-line bg-ink-800/90 p-4">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">Approval routed</span>
              <div className="mt-3 flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className={`grid size-6 place-items-center rounded-full border ${i < 2 ? "border-lime bg-lime/15" : "border-line-strong"}`}>
                      {i < 2 && <span className="size-1.5 rounded-full bg-lime" />}
                    </span>
                    {i < 2 && <span className="h-px w-6 bg-lime/50" />}
                  </span>
                ))}
              </div>
            </div>
            <div data-float="0.8" className="rounded-2xl border border-line bg-ink-800/90 p-4">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">Processing</span>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/10">
                <span className="block h-full w-1/3 animate-[ai-progress_2.4s_var(--ease-in-out-quart)_infinite] rounded-full bg-gradient-to-r from-cyan to-lime" />
              </div>
              <div className="mt-3 flex gap-1.5 font-mono text-[0.6rem] text-subtle">
                {"{ } → [ ] → ✓".split(" ").map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="relative mt-10 border-t border-line pt-8 lg:mt-12">
          <p className="label-mono text-[0.62rem] text-subtle">Workflow</p>
          <div className="relative mt-6">
            <div aria-hidden className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-line-strong md:block">
              <span
                className="absolute inset-y-0 left-0 bg-lime transition-[width] duration-700 ease-out-expo"
                style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
              />
              <span className="absolute -top-[3px] left-0 size-[7px] animate-[packet-run_2.8s_linear_infinite] rounded-full bg-lime shadow-[0_0_10px_2px_rgb(183_240_0/0.7)]" />
              <span className="absolute -top-[3px] left-0 size-[7px] animate-[packet-run_2.8s_linear_infinite] rounded-full bg-cyan [animation-delay:1.4s]" />
            </div>
            <ol className="relative grid gap-3 md:grid-cols-5 md:gap-2">
              {stages.map((st, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={st.key}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => select(i)}
                      className="group flex w-full items-center gap-4 rounded-xl p-1 text-left md:flex-col md:gap-3 md:text-center"
                    >
                      <span
                        className={`relative z-[1] grid size-12 shrink-0 place-items-center rounded-full border font-mono text-xs transition-[background-color,border-color,color,box-shadow,scale] duration-500 ease-out-expo ${
                          on
                            ? "scale-110 border-lime bg-lime text-ink-900 shadow-[0_0_0_6px_rgb(183_240_0/0.14),0_0_28px_4px_rgb(183_240_0/0.45)]"
                            : done
                              ? "border-lime/60 bg-ink-800 text-lime"
                              : "border-line-strong bg-ink-800 text-fg group-hover:border-fg/40"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-display text-sm font-semibold tracking-[0.08em] uppercase transition-colors ${on ? "text-lime" : "text-fg/80"}`}>
                        {st.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <div aria-live="polite" className="mt-6 flex min-h-[4.5rem] flex-col items-start gap-1 rounded-2xl border border-line bg-ink-800/60 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
            <span className="label-mono shrink-0 text-[0.62rem] text-lime">
              {String(active + 1).padStart(2, "0")} · {s.label}
            </span>
            <span className="text-[0.95rem] leading-relaxed text-fg/90">{s.description}</span>
          </div>
          <p className="mt-4 font-mono text-[0.6rem] tracking-[0.18em] text-subtle uppercase">{ai.note}</p>
        </div>
      </div>
    </div>
  );
}
