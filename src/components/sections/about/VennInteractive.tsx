"use client";

import { useCallback, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { regionAt } from "./venn-geometry";

type Region = "a" | "b" | "ab";

type Props = {
  children: ReactNode;
  messages: { idle: string; a: string; b: string; ab: string };
  options: { key: Region; label: string; accent: "lime" | "cyan" | "both" }[];
};

const dot = {
  lime: "bg-lime",
  cyan: "bg-cyan",
  both: "bg-gradient-to-r from-lime to-cyan",
} as const;

/**
 * Interaction layer for the Venn: resolves the pointer to a region
 * (circle A, circle B or the overlap) and exposes it as data-active,
 * which the SVG styles react to. Touch toggles on tap; keyboard and
 * screen-reader users get the equivalent buttons below the diagram.
 */
export function VennInteractive({ children, messages, options }: Props) {
  const [active, setActive] = useState<Region | null>(null);

  const resolve = useCallback((e: RPointerEvent<HTMLDivElement>): Region | null | undefined => {
    const svg = (e.target as Element).closest?.("svg[data-venn]") as SVGSVGElement | null;
    if (!svg) return undefined;
    const m = svg.getScreenCTM();
    if (!m) return undefined;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const d = svg.dataset;
    return regionAt(
      { a: { x: Number(d.ax), y: Number(d.ay) }, b: { x: Number(d.bx), y: Number(d.by) }, r: Number(d.r) },
      { x: p.x, y: p.y },
    );
  }, []);

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = resolve(e);
    if (r !== undefined && r !== active) setActive(r);
  };
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    const r = resolve(e);
    if (r === undefined) return;
    setActive((cur) => (cur === r ? null : r));
  };

  const message = active ? messages[active] : messages.idle;

  return (
    <div data-venn-root data-active={active ?? undefined} className="relative">
      <div onPointerMove={onMove} onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)} onPointerDown={onDown}>
        {children}
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 sm:mt-4">
        <p
          aria-live="polite"
          className="min-h-[3.25em] max-w-md text-center font-display text-base leading-snug text-pretty text-fg/90 transition-colors sm:text-lg"
        >
          {message}
        </p>
        <div role="group" aria-label="Explore the verticals" className="flex flex-wrap justify-center gap-2">
          {options.map((o) => {
            const on = active === o.key;
            return (
              <button
                key={o.key}
                type="button"
                aria-pressed={on}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(o.key)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(o.key)}
                onBlur={() => setActive(null)}
                onClick={(e) => {
                  // Mouse already selected on hover, so keep it; touch/keyboard toggle.
                  const pt = (e.nativeEvent as PointerEvent).pointerType;
                  setActive((cur) => (pt === "mouse" ? o.key : cur === o.key ? null : o.key));
                }}
                className={`label-mono inline-flex h-10 items-center gap-2.5 rounded-full border px-4 text-[0.66rem] transition-colors duration-300 ${
                  on ? "border-fg/40 bg-ink-700 text-fg" : "border-line-strong text-muted hover:text-fg"
                }`}
              >
                <span aria-hidden className={`size-2 rounded-full ${dot[o.accent]}`} />
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
