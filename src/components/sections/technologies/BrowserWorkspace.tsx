"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { EngineeringArt } from "@/components/visuals/EngineeringArt";
import { software } from "@/content/technologies";

type TabKey = (typeof software.tabs)[number]["key"];

const bar = (w: string, c = "bg-fg/20", h = "h-[6px]") => <span className={`block ${h} rounded-full ${c}`} style={{ width: w }} />;

/* ---------------- Illustrative previews (no live functionality) ---------------- */

function WebPreview() {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[18%] flex-col gap-3 border-r border-line bg-ink-900/60 p-3 sm:flex">
        <span className="mb-2 h-3 w-10 rounded bg-lime/80" />
        {[70, 55, 80, 60, 50].map((w, i) => (
          <span key={i} className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${i === 1 ? "bg-ink-700" : ""}`}>
            <span className={`size-2 rounded-sm ${i === 1 ? "bg-lime" : "bg-fg/25"}`} />
            {bar(`${w}%`, i === 1 ? "bg-fg/60" : "bg-fg/20", "h-[5px]")}
          </span>
        ))}
      </aside>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          {bar("30%", "bg-fg/70", "h-[8px]")}
          <span className="flex gap-1.5">
            <span className="h-5 w-14 rounded-md border border-line-strong" />
            <span className="h-5 w-10 rounded-md bg-lime/90" />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {["bg-lime", "bg-cyan", "bg-fg/60"].map((c, i) => (
            <div key={i} className="rounded-lg border border-line bg-ink-800 p-2.5">
              {bar("50%", "bg-fg/25", "h-[4px]")}
              <span className={`mt-2 block h-2.5 w-[60%] rounded ${c}`} />
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-5 gap-2.5">
          <div className="col-span-3 rounded-lg border border-line bg-ink-800 p-2.5">
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="size-full" fill="none">
              <path d="M0 64 C30 60 40 40 70 44 S120 20 150 26 S185 10 200 8" stroke="#b7f000" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
              <path d="M0 64 C30 60 40 40 70 44 S120 20 150 26 S185 10 200 8 V80 H0Z" fill="#b7f000" fillOpacity="0.08" />
            </svg>
          </div>
          <div className="col-span-2 flex flex-col gap-2 rounded-lg border border-line bg-ink-800 p-2.5">
            {[90, 70, 80, 55].map((w, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-ink-600" />
                {bar(`${w}%`, "bg-fg/20", "h-[4px]")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ variant }: { variant: 0 | 1 }) {
  return (
    <div className="flex h-[92%] aspect-[9/18] flex-col overflow-hidden rounded-[1.4rem] border-2 border-fg/25 bg-ink-900 p-1.5 shadow-[0_30px_50px_-25px_rgba(0,0,0,0.8)]">
      <div className="mx-auto mb-1.5 h-1.5 w-10 rounded-full bg-fg/20" />
      <div className="flex flex-1 flex-col gap-2 rounded-[1rem] bg-ink-800 p-2.5">
        {variant === 0 ? (
          <>
            {bar("55%", "bg-fg/70", "h-[7px]")}
            <div className="h-16 rounded-lg bg-gradient-to-br from-lime/70 to-cyan/50" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-line p-2">
                <span className="size-5 rounded-md bg-ink-600" />
                <span className="flex-1 space-y-1">
                  {bar("70%", "bg-fg/40", "h-[4px]")}
                  {bar("45%", "bg-fg/15", "h-[4px]")}
                </span>
              </div>
            ))}
          </>
        ) : (
          <>
            {bar("40%", "bg-fg/70", "h-[7px]")}
            <div className="rounded-lg border border-line p-2">
              <svg viewBox="0 0 100 50" className="w-full" fill="none">
                {[14, 24, 18, 32, 28, 40].map((h, i) => (
                  <rect key={i} x={6 + i * 15} y={48 - h} width="8" height={h} rx="1.5" fill={i === 5 ? "#b7f000" : "#29b8d4"} fillOpacity={i === 5 ? 1 : 0.55} />
                ))}
              </svg>
            </div>
            {bar("80%", "bg-fg/25", "h-[4px]")}
            {bar("60%", "bg-fg/25", "h-[4px]")}
            <span className="mt-auto h-7 rounded-full bg-lime/90" />
          </>
        )}
        <div className="mt-auto flex justify-around border-t border-line pt-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`size-2 rounded-sm ${i === variant ? "bg-lime" : "bg-fg/25"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="flex h-full items-center justify-center gap-6 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(41_184_212/0.12),transparent)] p-4">
      <Phone variant={0} />
      <div className="hidden translate-y-4 sm:block">
        <Phone variant={1} />
      </div>
    </div>
  );
}

function CustomPreview() {
  const nodes = [
    { x: 14, y: 26, c: "border-lime/70" },
    { x: 46, y: 18, c: "border-cyan/70" },
    { x: 46, y: 62, c: "border-line-strong" },
    { x: 78, y: 40, c: "border-lime/70" },
  ];
  return (
    <div className="flex h-full">
      <div className="hidden w-[22%] flex-col gap-2 border-r border-line p-3 sm:flex">
        {bar("60%", "bg-fg/50", "h-[6px]")}
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5">
            <span className={`size-2 rounded-full ${i < 2 ? "bg-lime" : "bg-fg/25"}`} />
            {bar(`${50 + i * 8}%`, "bg-fg/20", "h-[4px]")}
          </span>
        ))}
      </div>
      <div className="bg-grid relative flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
          <path d="M22 30 C34 30 34 22 46 22" stroke="#b7f000" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" className="flow-line" />
          <path d="M22 30 C34 30 34 66 46 66" stroke="rgb(167 180 200 / 0.5)" vectorEffect="non-scaling-stroke" />
          <path d="M54 22 C66 22 66 44 78 44" stroke="#29b8d4" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" className="flow-line" />
          <path d="M54 66 C66 66 66 44 78 44" stroke="rgb(167 180 200 / 0.5)" vectorEffect="non-scaling-stroke" />
        </svg>
        {nodes.map((n, i) => (
          <div
            key={i}
            className={`absolute w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-ink-800 p-2 ${n.c}`}
            style={{ left: `${n.x + 4}%`, top: `${n.y + 4}%` }}
          >
            {bar("70%", "bg-fg/50", "h-[4px]")}
            <span className="mt-1.5 block">{bar("45%", "bg-fg/20", "h-[4px]")}</span>
          </div>
        ))}
      </div>
      <div className="hidden w-[24%] flex-col gap-2.5 border-l border-line p-3 md:flex">
        {bar("50%", "bg-fg/50", "h-[6px]")}
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-6 rounded-md border border-line bg-ink-800" />
        ))}
        <span className="flex items-center gap-2">
          <span className="relative h-3.5 w-7 rounded-full bg-lime/90">
            <span className="absolute top-0.5 right-0.5 size-2.5 rounded-full bg-ink-900" />
          </span>
          {bar("40%", "bg-fg/20", "h-[4px]")}
        </span>
        <span className="mt-auto h-6 rounded-md bg-lime/90" />
      </div>
    </div>
  );
}

const previews: Record<TabKey, () => React.JSX.Element> = { web: WebPreview, mobile: MobilePreview, custom: CustomPreview };

/**
 * Interactive engineering workspace: an illustrative browser window whose
 * tabs switch the interface preview, with a floating code editor and
 * component chips. Tabs follow the WAI-ARIA tabs pattern.
 */
export function BrowserWorkspace() {
  const [tab, setTab] = useState<TabKey>("web");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = software.tabs;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + tabs.length) % tabs.length;
    setTab(tabs[next].key);
    refs.current[next]?.focus();
  };

  return (
    <div className="relative lg:pr-10 lg:pb-14">
      <div data-r="clip" className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
        <div data-r-zoom>
          {/* Chrome */}
          <div className="flex flex-wrap items-center gap-3 border-b border-line bg-ink-800/80 px-3 py-2.5 sm:px-4">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-fg/20" />
              ))}
            </span>
            <div role="tablist" aria-label="Interface previews" className="flex flex-1 gap-1 overflow-x-auto">
              {tabs.map((t, i) => {
                const on = t.key === tab;
                return (
                  <button
                    key={t.key}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    role="tab"
                    id={`ws-tab-${t.key}`}
                    aria-selected={on}
                    aria-controls={`ws-panel-${t.key}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(t.key)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`relative shrink-0 rounded-lg px-3 py-1.5 font-mono text-[0.66rem] tracking-[0.12em] uppercase transition-colors duration-300 ${
                      on ? "bg-ink-700 text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {t.label}
                    <span className={`absolute inset-x-3 -bottom-[11px] h-[2px] rounded-full bg-lime transition-transform duration-500 ease-out-expo ${on ? "scale-x-100" : "scale-x-0"}`} />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2 border-b border-line px-4 py-2">
            <span className="size-2 rounded-full bg-lime/80" />
            <span className="truncate font-mono text-[0.62rem] tracking-[0.12em] text-subtle">workspace / {tab}-preview</span>
          </div>

          {/* Previews */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10]">
            {tabs.map((t) => {
              const P = previews[t.key];
              const on = t.key === tab;
              return (
                <div
                  key={t.key}
                  id={`ws-panel-${t.key}`}
                  role="tabpanel"
                  aria-labelledby={`ws-tab-${t.key}`}
                  aria-hidden={!on}
                  className={`absolute inset-0 transition-[opacity,translate,scale] duration-700 ease-out-expo ${
                    on ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.985] opacity-0"
                  }`}
                >
                  <P />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating code editor + architecture */}
      <div data-float="0.8" className="absolute right-0 bottom-0 hidden h-[44%] w-[58%] overflow-hidden rounded-xl border border-line-strong shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] lg:block">
        <EngineeringArt />
      </div>
      {/* Component chips */}
      <div data-float="0.5" aria-hidden className="absolute top-[18%] -left-6 hidden flex-col gap-1.5 lg:flex">
        {["UI", "Services", "Data"].map((c, i) => (
          <span key={c} className="flex items-center gap-2 rounded-full border border-line bg-ink-800/90 px-3 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-muted uppercase backdrop-blur">
            <span className={`size-1.5 rounded-full ${i === 0 ? "bg-lime" : i === 1 ? "bg-cyan" : "bg-fg/50"}`} />
            {c}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-[0.6rem] tracking-[0.18em] text-subtle uppercase lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">{software.note}</p>
    </div>
  );
}
