"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, useGSAP } from "@/motion/gsap";
import type { HubNode } from "@/content/technologies";

type Props = {
  center: string;
  idle: string;
  nodes: readonly HubNode[];
  /** Colour of the active connection. */
  accent?: "lime" | "cyan";
  /** Draw a ring between nodes with information flowing around it. */
  ring?: boolean;
  /** Show 01–0n inside node circles. */
  numbered?: boolean;
  className?: string;
};

const VB = 600;
const C = VB / 2;
const R = 214; // node orbit
const CORE = 74; // core radius
const NODE = 34; // node radius
const COLORS = { lime: "#b7f000", cyan: "#29b8d4" };

/** Rounded so server and client render identical attributes (avoids hydration drift). */
const r2 = (n: number) => Math.round(n * 100) / 100;
const polar = (deg: number, r: number) => ({ x: r2(C + r * Math.cos((deg * Math.PI) / 180)), y: r2(C + r * Math.sin((deg * Math.PI) / 180)) });

/**
 * Interactive hub-and-spoke system diagram.
 * Desktop/tablet: radial SVG with spokes, travelling particles and HTML node
 * buttons. Phones: stacked list. Hover (mouse), focus (keyboard) or tap selects
 * a node: it scales, its spoke lights up, its particles speed up and the
 * description panel updates (aria-live).
 */
export function HubDiagram({ center, idle, nodes, accent = "lime", ring = false, numbered = true, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tweens = useRef<Map<string, gsap.core.Tween[]>>(new Map());
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const color = COLORS[accent];
  const step = 360 / nodes.length;
  const pts = nodes.map((n, i) => {
    const deg = -90 + i * step;
    return { n, deg, p: polar(deg, R), a: polar(deg, CORE + 6), b: polar(deg, R - NODE - 6) };
  });
  const current = nodes.find((n) => n.key === active);

  // Entrance + particles (wide layout only, motion allowed)
  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%" }, defaults: { ease: "expo.out" } });
        tl.from(q("[data-hub-core]"), { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.2 })
          .fromTo(q("[data-hub-spoke]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.08 }, 0.3)
          .from(q("[data-hub-node]"), { scale: 0.4, autoAlpha: 0, duration: 0.9, stagger: 0.08, clearProps: "opacity,visibility,transform" }, 0.6)
          .from(q("[data-hub-label]"), { autoAlpha: 0, y: 8, duration: 0.8, stagger: 0.06, clearProps: "opacity,visibility,transform" }, 0.9);

        gsap.to(q("[data-hub-spin]"), { rotation: 360, svgOrigin: `${C} ${C}`, duration: 40, ease: "none", repeat: -1 });
        if (ring) gsap.to(q("[data-hub-ring]"), { rotation: 360, svgOrigin: `${C} ${C}`, duration: 26, ease: "none", repeat: -1 });

        tweens.current.clear();
        pts.forEach(({ n, a, b }, i) => {
          const dots = q<SVGCircleElement>(`[data-hub-dot="${n.key}"]`);
          const list = dots.map((dot, j) => {
            const inbound = j % 2 === 1;
            const from = inbound ? b : a;
            const to = inbound ? a : b;
            return gsap.fromTo(
              dot,
              { attr: { cx: from.x, cy: from.y }, opacity: 0 },
              {
                attr: { cx: to.x, cy: to.y },
                keyframes: { opacity: [0, 1, 1, 0] },
                duration: 2.6,
                ease: "none",
                repeat: -1,
                delay: i * 0.35 + j * 1.3,
              },
            );
          });
          tweens.current.set(n.key, list);
        });
        return () => tweens.current.clear();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Busier particles on the active connection
  useEffect(() => {
    tweens.current.forEach((list, key) => list.forEach((t) => t.timeScale(key === active ? 2.6 : active ? 0.6 : 1)));
  }, [active]);

  const hover = (key: string | null) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setActive(key);
  };
  const handlers = (key: string) => ({
    onPointerEnter: hover(key),
    onPointerLeave: hover(null),
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => e.currentTarget.matches(":focus-visible") && setActive(key),
    onBlur: () => setActive(null),
    onClick: (e: React.MouseEvent) => {
      const pt = (e.nativeEvent as PointerEvent).pointerType;
      setActive((cur) => (pt === "mouse" ? key : cur === key ? null : key));
    },
    "aria-pressed": active === key,
  });

  return (
    <div ref={root} className={className}>
      {/* ---------- Radial (sm+) ---------- */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[600px] sm:block">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 size-full overflow-visible" aria-hidden fill="none">
          <defs>
            <radialGradient id={`${uid}-core`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={color} stopOpacity="0.55" />
              <stop offset="0.45" stopColor={color} stopOpacity="0.12" />
              <stop offset="1" stopColor="#061327" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-field`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#173058" stopOpacity="0.9" />
              <stop offset="1" stopColor="#061327" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <circle cx={C} cy={C} r={R + 70} fill={`url(#${uid}-field)`} />
          <g stroke="rgb(167 180 200 / 0.14)">
            <circle cx={C} cy={C} r={R} strokeDasharray="2 8" />
            <circle cx={C} cy={C} r={R * 0.62} />
          </g>

          {ring && (
            <g data-hub-ring>
              {[0, 72, 144, 216, 288].map((d) => {
                const p = polar(d, R);
                return <circle key={d} cx={p.x} cy={p.y} r="2.6" fill="#29b8d4" opacity="0.8" />;
              })}
            </g>
          )}

          {/* Spokes */}
          {pts.map(({ n, a, b }) => {
            const on = active === n.key;
            return (
              <g key={n.key}>
                <path
                  d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
                  stroke={on ? color : "rgb(167 180 200 / 0.3)"}
                  strokeWidth={on ? 2 : 1}
                  className="transition-[stroke,stroke-width] duration-500"
                  data-hub-spoke
                  pathLength={1}
                  strokeDasharray="1"
                />
                {on && <path d={`M${a.x} ${a.y} L${b.x} ${b.y}`} stroke={color} strokeWidth="6" opacity="0.35" filter={`url(#${uid}-blur)`} />}
                {[0, 1].map((j) => (
                  <circle key={j} data-hub-dot={n.key} cx={a.x} cy={a.y} r={on ? 3.6 : 2.6} fill={j ? "#29b8d4" : "#b7f000"} opacity="0" />
                ))}
              </g>
            );
          })}

          {/* Core */}
          <g data-hub-core>
            <circle cx={C} cy={C} r={CORE + 46} fill={`url(#${uid}-core)`} opacity={active ? 1 : 0.75} className="transition-opacity duration-500" />
            <g data-hub-spin stroke={color} strokeOpacity="0.5">
              <circle cx={C} cy={C} r={CORE + 14} strokeDasharray="3 10" />
              <path d={`M${C - CORE - 22} ${C} h10 M${C + CORE + 12} ${C} h10 M${C} ${C - CORE - 22} v10 M${C} ${C + CORE + 12} v10`} />
            </g>
            <circle cx={C} cy={C} r={CORE} fill="#0b1b35" stroke={color} strokeWidth="1.5" />
            <circle cx={C} cy={C} r={CORE - 12} stroke="rgb(245 247 250 / 0.12)" />
          </g>

          {/* Node halos */}
          {pts.map(({ n, p }) => (
            <circle
              key={n.key}
              cx={p.x}
              cy={p.y}
              r={NODE + 14}
              fill={color}
              opacity={active === n.key ? 0.18 : 0}
              filter={`url(#${uid}-blur)`}
              className="transition-opacity duration-500"
            />
          ))}
        </svg>

        {/* Core label */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="max-w-[8.5rem] text-center font-display text-[0.95rem] leading-tight font-semibold tracking-[0.08em] text-fg uppercase">
            {center}
          </p>
        </div>

        {/* Nodes */}
        {pts.map(({ n, deg, p }, i) => {
          const on = active === n.key;
          const cos = Math.cos((deg * Math.PI) / 180);
          const side = Math.abs(cos) < 0.2 ? "center" : cos > 0 ? "right" : "left";
          const top = p.y < C - 40;
          return (
            <div key={n.key} className="absolute" style={{ left: `${(p.x / VB) * 100}%`, top: `${(p.y / VB) * 100}%` }}>
              <button
                type="button"
                data-hub-node
                {...handlers(n.key)}
                aria-label={n.label}
                className={`absolute top-1/2 left-1/2 grid size-[4.25rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-ink-800 font-mono text-xs transition-[scale,border-color,background-color,color,box-shadow] duration-500 ease-out-expo ${
                  on
                    ? `scale-110 ${accent === "lime" ? "border-lime text-lime shadow-[0_0_30px_-4px_rgb(183_240_0/0.6)]" : "border-cyan text-cyan shadow-[0_0_30px_-4px_rgb(41_184_212/0.6)]"}`
                    : "border-line-strong text-fg hover:border-fg/40"
                }`}
              >
                {numbered ? String(i + 1).padStart(2, "0") : <span className={`size-2 rounded-full ${on ? "bg-current" : "bg-fg/50"}`} />}
              </button>
              <span
                data-hub-label
                aria-hidden
                className={`pointer-events-none absolute w-max max-w-[9.5rem] font-display text-[0.8rem] leading-tight font-medium tracking-[0.06em] uppercase transition-colors duration-500 ${
                  on ? "text-fg" : "text-muted"
                } ${
                  side === "center"
                    ? `left-1/2 -translate-x-1/2 text-center ${top ? "bottom-[2.6rem]" : "top-[2.6rem]"}`
                    : side === "right"
                      ? "top-1/2 left-[2.7rem] -translate-y-1/2 text-left"
                      : "top-1/2 right-[2.7rem] -translate-y-1/2 text-right"
                }`}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ---------- Stacked (phones) ---------- */}
      <div className="sm:hidden">
        <div className="mx-auto grid w-fit place-items-center rounded-full border border-lime/50 bg-ink-800 px-5 py-3 shadow-[0_0_30px_-8px_rgb(183_240_0/0.5)]">
          <span className="font-display text-sm font-semibold tracking-[0.08em] text-fg uppercase">{center}</span>
        </div>
        <div aria-hidden className="mx-auto h-6 w-px bg-gradient-to-b from-lime/70 to-line-strong" />
        <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-line p-2.5">
          {nodes.map((n, i) => {
            const on = active === n.key;
            return (
              <button
                key={n.key}
                type="button"
                {...handlers(n.key)}
                className={`flex min-h-14 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 ${
                  on ? (accent === "lime" ? "border-lime/60 bg-ink-700" : "border-cyan/60 bg-ink-700") : "border-line bg-ink-800/70"
                } ${nodes.length % 2 && i === nodes.length - 1 ? "col-span-2" : ""}`}
              >
                <span className={`font-mono text-[0.65rem] ${on ? (accent === "lime" ? "text-lime" : "text-cyan") : "text-subtle"}`}>
                  {numbered ? String(i + 1).padStart(2, "0") : "●"}
                </span>
                <span className="font-display text-[0.8rem] leading-tight font-medium tracking-[0.04em] text-fg uppercase">{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Description ---------- */}
      <div aria-live="polite" className="mx-auto mt-6 min-h-[5.5rem] max-w-md text-center">
        {current ? (
          <>
            <p className={`label-mono text-[0.65rem] ${accent === "lime" ? "text-lime" : "text-cyan"}`}>{current.label}</p>
            {current.title && <p className="mt-2 font-display text-lg leading-snug text-fg">{current.title}</p>}
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{current.description}</p>
          </>
        ) : (
          <p className="pt-3 text-[0.92rem] text-muted">{idle}</p>
        )}
      </div>
    </div>
  );
}
