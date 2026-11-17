"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { applications, type FunctionKey } from "@/content/approach";

/** Orbit points at 20°, 140°, 260° on r=88 (precomputed: no render-time trig). */
const ORBIT: [number, number][] = [
  [182.7, 130.1],
  [32.6, 156.6],
  [84.7, 13.3],
];

/** Abstract 32px illustrations per business function. */
const art: Record<FunctionKey, React.JSX.Element> = {
  sales: (
    <>
      <path d="M4 26 L12 18 L18 22 L28 8" />
      <path d="M22 8 H28 V14" stroke="#b7f000" />
      <circle cx="12" cy="18" r="2" stroke="#b7f000" />
    </>
  ),
  finance: (
    <>
      <rect x="6" y="4" width="20" height="24" rx="2" />
      <path d="M10 10 H22 M10 15 H18" />
      <path d="M10 22 h4 M17 22 h5" stroke="#b7f000" />
    </>
  ),
  hr: (
    <>
      <circle cx="11" cy="11" r="4" />
      <circle cx="22" cy="13" r="3" stroke="#b7f000" />
      <path d="M4 26 c1-5 4-7 7-7 s6 2 7 7 M18 26 c.5-3 2-5 4-5 s3.5 2 4 5" />
    </>
  ),
  procurement: (
    <>
      <path d="M4 12 L16 5 L28 12 V26 H4 Z" />
      <path d="M10 26 V17 H22 V26" />
      <path d="M13 21 l2 2 l4 -4" stroke="#b7f000" />
    </>
  ),
  operations: (
    <>
      <circle cx="16" cy="16" r="5" stroke="#b7f000" />
      <path d="M16 4 V8 M16 24 V28 M4 16 H8 M24 16 H28 M7.5 7.5 l3 3 M21.5 21.5 l3 3 M24.5 7.5 l-3 3 M10.5 21.5 l-3 3" />
    </>
  ),
  support: (
    <>
      <path d="M5 8 a3 3 0 0 1 3-3 H24 a3 3 0 0 1 3 3 V18 a3 3 0 0 1-3 3 H14 L8 26 V21 a3 3 0 0 1-3-3 Z" />
      <path d="M11 13 h.01 M16 13 h.01 M21 13 h.01" stroke="#b7f000" strokeWidth="2.6" />
    </>
  ),
  management: (
    <>
      <rect x="4" y="5" width="24" height="17" rx="2" />
      <path d="M9 17 V13 M14 17 V10 M19 17 V12 M24 17 V9" stroke="#b7f000" />
      <path d="M12 27 H20 M16 22 V27" />
    </>
  ),
};

/**
 * Business functions (from the company profile) with the challenges they
 * commonly face and the capabilities that apply. Tabs pattern, vertical.
 */
export function ApplicationsExplorer() {
  const fns = applications.functions;
  const [idx, setIdx] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const f = fns[idx];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + fns.length) % fns.length;
    setIdx(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div role="tablist" aria-orientation="vertical" aria-label="Business functions" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
        {fns.map((fn, i) => {
          const on = i === idx;
          return (
            <button
              key={fn.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`fn-tab-${fn.key}`}
              aria-selected={on}
              aria-controls="fn-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setIdx(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setIdx(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex shrink-0 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 lg:px-5 lg:py-4 ${
                on ? "border-lime/50 bg-ink-700" : "border-line bg-ink-800/50 hover:border-fg/25"
              }`}
            >
              <svg viewBox="0 0 32 32" className={`size-6 shrink-0 transition-colors ${on ? "text-fg" : "text-muted"}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {art[fn.key]}
              </svg>
              <span className={`font-display text-base font-semibold tracking-[0.08em] uppercase ${on ? "text-fg" : "text-fg/70"}`}>{fn.name}</span>
              <span className={`ml-auto hidden font-mono text-[0.6rem] lg:inline ${on ? "text-lime" : "text-subtle"}`}>{String(i + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div
        id="fn-panel"
        role="tabpanel"
        aria-labelledby={`fn-tab-${f.key}`}
        className="relative overflow-hidden rounded-[24px] border border-line bg-ink-800/70 p-6 sm:p-8 lg:col-span-8 lg:p-10"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <div key={f.key} className="relative grid animate-[fn-in_0.6s_var(--ease-out-expo)] gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="label-mono text-[0.62rem] text-lime">Business function · {String(idx + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none font-medium tracking-[-0.03em] text-fg">{f.name}</h3>

            <p className="mt-6 label-mono text-[0.58rem] text-subtle">Common challenge</p>
            <p className="mt-2 max-w-lg text-[1.02rem] leading-relaxed text-pretty text-fg/90">{f.challenge}</p>

            <p className="mt-6 label-mono text-[0.58rem] text-subtle">Applications</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {f.applications.map((a) => (
                <li key={a} className="rounded-full bg-fg/[0.07] px-3 py-1.5 text-[0.82rem] text-fg">
                  {a}
                </li>
              ))}
            </ul>

            <p className="mt-6 label-mono text-[0.58rem] text-subtle">Relevant capabilities</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {f.capabilities.technology.map((c) => (
                <li key={c} className="flex items-center gap-2 rounded-full border border-cyan/40 px-3 py-1.5 text-[0.8rem] text-fg/90">
                  <span className="size-1.5 rounded-full bg-cyan" />
                  {c}
                </li>
              ))}
              {f.capabilities.consultancy.map((c) => (
                <li key={c} className="flex items-center gap-2 rounded-full border border-lime/40 px-3 py-1.5 text-[0.8rem] text-fg/90">
                  <span className="size-1.5 rounded-full bg-lime" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Abstract illustration: function at the centre of its connections */}
          <div aria-hidden className="relative hidden size-44 place-self-center md:grid lg:size-52">
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" fill="none">
              <circle cx="100" cy="100" r="88" stroke="rgb(167 180 200 / 0.18)" strokeDasharray="2 7" className="origin-center animate-[spin_40s_linear_infinite] [transform-box:fill-box]" />
              <circle cx="100" cy="100" r="60" stroke="rgb(167 180 200 / 0.25)" />
              {ORBIT.map(([x, y], k) => {
                return (
                  <g key={x}>
                    <path d={`M100 100 L${x} ${y}`} stroke={k === 1 ? "#b7f000" : "#29b8d4"} strokeOpacity="0.5" className="flow-line" />
                    <circle cx={x} cy={y} r="5" fill={k === 1 ? "#b7f000" : "#29b8d4"} />
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="34" fill="#061327" stroke="#b7f000" strokeWidth="1.5" />
            </svg>
            <svg viewBox="0 0 32 32" className="relative size-12 place-self-center text-fg" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {art[f.key]}
            </svg>
          </div>
        </div>
        <p className="relative mt-8 border-t border-line pt-4 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">{applications.note}</p>
      </div>
    </div>
  );
}
