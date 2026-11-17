"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/motion/gsap";
import { cloud, type CloudLayer } from "@/content/technologies";

const L = { lime: "#b7f000", cyan: "#29b8d4", fg: "#f5f7fa", line: "rgb(167 180 200 / 0.4)", ink800: "#0b1b35", ink700: "#102342" };
const apps = [
  { x: 70, label: "Web App" },
  { x: 255, label: "Services" },
  { x: 440, label: "Workers" },
];
const dbs = [
  { x: 150, label: "Primary" },
  { x: 320, label: "Replica" },
  { x: 490, label: "Backup" },
];
const pipeline = ["Code", "Build", "Test", "Deploy"];

/** Data paths for travelling packets (each a list of points). */
const routes: [number, number][][] = [
  [[320, 112], [320, 165], [320, 205], [135, 245]],
  [[320, 112], [320, 205], [320, 245], [320, 315], [320, 362]],
  [[320, 205], [505, 245], [505, 315], [490, 362]],
  [[135, 315], [150, 362]],
];

function Cylinder({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <path d={`M${x - 46} 368 v44 a46 12 0 0 0 92 0 v-44`} fill={L.ink800} stroke={L.line} />
      <ellipse cx={x} cy={368} rx="46" ry="12" fill={L.ink700} stroke={L.line} />
      <path d={`M${x - 46} 390 a46 12 0 0 0 92 0`} stroke={L.line} />
      <text x={x} y={436} textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.6" fill="#a7b4c8">
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/**
 * Cloud architecture: cloud → API gateway → application layer → data layer,
 * inside a security boundary, fed by a deployment pipeline. Packets travel
 * between layers; selecting a capability highlights the layers it covers.
 */
export function CloudArchitecture() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const layers: CloudLayer[] = (cloud.capabilities.find((c) => c.key === active)?.layers ?? []) as CloudLayer[];
  const lit = (l: CloudLayer) => (active ? (layers.includes(l) ? "opacity-100" : "opacity-25") : "opacity-100");
  const glow = (l: CloudLayer) => active !== null && layers.includes(l);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root.current!);
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" }, defaults: { ease: "expo.out" } });
        tl.from(q("[data-cl-layer]"), { autoAlpha: 0, y: 24, duration: 1, stagger: 0.12, clearProps: "opacity,visibility,transform" }).fromTo(
          q("[data-cl-link]"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.06 },
          0.4,
        );

        q<SVGCircleElement>("[data-cl-packet]").forEach((dot, i) => {
          const route = routes[i % routes.length];
          const t = gsap.timeline({ repeat: -1, delay: i * 0.7, repeatDelay: 0.4 });
          t.set(dot, { attr: { cx: route[0][0], cy: route[0][1] }, opacity: 1 });
          route.slice(1).forEach(([x, y]) => t.to(dot, { attr: { cx: x, cy: y }, duration: 0.7, ease: "none" }));
          t.to(dot, { opacity: 0, duration: 0.2 });
        });
        gsap.fromTo(q("[data-cl-deploy]"), { attr: { cx: 90 } }, { attr: { cx: 550 }, duration: 3.2, ease: "none", repeat: -1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const handlers = (key: string) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setActive(key),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setActive(null),
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => e.currentTarget.matches(":focus-visible") && setActive(key),
    onBlur: () => setActive(null),
    onClick: (e: React.MouseEvent) => {
      const pt = (e.nativeEvent as PointerEvent).pointerType;
      setActive((cur) => (pt === "mouse" ? key : cur === key ? null : key));
    },
  });

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
        {cloud.capabilities.map((c, i) => {
          const on = c.key === active;
          return (
            <li key={c.key}>
              <button
                type="button"
                aria-pressed={on}
                {...handlers(c.key)}
                className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-300 ${on ? "border-cyan/60 bg-ink-700" : "border-line bg-ink-800/60 hover:border-fg/25"}`}
              >
                <span className={`pt-0.5 font-mono text-xs ${on ? "text-cyan" : "text-subtle"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[1rem] font-semibold tracking-[0.04em] text-fg uppercase">{c.title}</span>
                  <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-muted">{c.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <figure className="relative overflow-hidden rounded-[24px] border border-line bg-ink-900/80 p-3 sm:p-6 lg:col-span-8">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        {/* Phones / small tablets: stacked layers, same highlight state */}
        <div className="relative space-y-2 md:hidden" role="img" aria-label="Illustrative cloud architecture layers">
          {(
            [
              ["cloud", "Cloud", "Regions · CDN · Managed services"],
              ["api", "API Gateway", "Routing · Authentication · Rate limits"],
              ["app", "Application layer", "Web app · Services · Workers"],
              ["data", "Data layer", "Primary · Replica · Backup"],
            ] as [CloudLayer, string, string][]
          ).map(([k, t, d], i, arr) => (
            <div key={k}>
              <div
                className={`rounded-xl border px-4 py-3 transition-[opacity,border-color] duration-500 ${lit(k)} ${glow(k) ? "border-cyan/70 bg-ink-700" : "border-line bg-ink-800"} ${
                  k !== "cloud" ? (glow("security") ? "outline-2 outline-offset-4 outline-lime/60 outline-dashed" : "") : ""
                }`}
              >
                <p className="font-mono text-[0.62rem] tracking-[0.18em] text-fg uppercase">{t}</p>
                <p className="mt-1 text-[0.8rem] text-muted">{d}</p>
              </div>
              {i < arr.length - 1 && (
                <svg viewBox="0 0 2 18" className="mx-auto h-[18px] w-0.5 overflow-visible" aria-hidden>
                  <path d="M1 0 V18" stroke="#b7f000" strokeOpacity="0.6" className="flow-line" />
                </svg>
              )}
            </div>
          ))}
          <div className={`mt-3 flex items-center justify-between gap-1 rounded-xl border px-3 py-2.5 transition-[opacity,border-color] duration-500 ${lit("pipeline")} ${glow("pipeline") ? "border-lime/60" : "border-line"}`}>
            {pipeline.map((p, i) => (
              <span key={p} className={`font-mono text-[0.58rem] tracking-[0.14em] uppercase ${i === 3 ? "text-lime" : "text-muted"}`}>
                {p}
                {i < 3 && <span className="ml-1 text-subtle">→</span>}
              </span>
            ))}
          </div>
          <p className={`flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.16em] uppercase transition-opacity ${lit("security")} ${glow("security") ? "text-lime" : "text-subtle"}`}>
            <span className="h-px w-5 border-t border-dashed border-current" /> Security boundary around gateway, apps and data
          </p>
        </div>

        <svg viewBox="0 0 640 540" className="relative hidden w-full md:block" fill="none" role="img" aria-label="Illustrative cloud architecture: cloud, API gateway, application layer and data layer inside a security boundary, with a deployment pipeline">
          {/* Connections */}
          <g stroke={L.line} strokeWidth="1.2">
            {[
              "M320 112 V165",
              "M320 205 C320 225 135 225 135 245",
              "M320 205 V245",
              "M320 205 C320 225 505 225 505 245",
              "M135 315 C135 340 150 340 150 356",
              "M320 315 V356",
              "M505 315 C505 340 490 340 490 356",
            ].map((d) => (
              <path key={d} data-cl-link d={d} pathLength={1} strokeDasharray="1" />
            ))}
            <path d="M196 390 H274 M366 390 H444" strokeDasharray="3 5" stroke={L.cyan} strokeOpacity="0.6" />
          </g>

          {/* Security boundary */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("security")}`}>
            <rect x="24" y="140" width="592" height="318" rx="24" stroke={L.lime} strokeOpacity={glow("security") ? 0.9 : 0.4} strokeDasharray="6 6" strokeWidth={glow("security") ? 2 : 1.2} />
            <g transform="translate(44 150)">
              <rect x="0" y="6" width="12" height="9" rx="2" stroke={L.lime} />
              <path d="M3 6 V3 a3 3 0 0 1 6 0 V6" stroke={L.lime} />
              <text x="20" y="14" className="font-mono" fontSize="10" letterSpacing="1.8" fill={L.lime}>SECURITY BOUNDARY</text>
            </g>
          </g>

          {/* Cloud */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("cloud")}`}>
            <path
              d="M210 104 C176 104 160 80 176 60 C186 46 206 44 216 50 C226 24 262 14 290 26 C306 6 352 6 368 30 C392 20 428 30 432 58 C460 60 472 88 452 102 C448 104 444 104 440 104 Z"
              fill={L.ink800}
              stroke={glow("cloud") ? L.cyan : L.line}
              strokeWidth={glow("cloud") ? 2 : 1.2}
            />
            <text x="320" y="72" textAnchor="middle" className="font-display" fontSize="15" fontWeight="600" letterSpacing="2.5" fill={L.fg}>CLOUD</text>
            {[278, 320, 362].map((x) => (
              <circle key={x} cx={x} cy="88" r="3" fill={L.cyan} opacity="0.7" />
            ))}
          </g>

          {/* API gateway */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("api")}`}>
            <rect x="220" y="165" width="200" height="40" rx="10" fill={L.ink700} stroke={glow("api") ? L.lime : L.line} strokeWidth={glow("api") ? 2 : 1.2} />
            <text x="320" y="190" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="2" fill={L.fg}>API GATEWAY</text>
          </g>

          {/* Application layer */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("app")}`}>
            <text x="44" y="238" className="font-mono" fontSize="9" letterSpacing="1.8" fill="#6f7f98">APPLICATION LAYER</text>
            {apps.map((a, i) => (
              <g key={a.x}>
                <rect x={a.x} y="245" width="130" height="70" rx="12" fill={L.ink800} stroke={glow("app") ? L.lime : L.line} strokeWidth={glow("app") ? 2 : 1.2} />
                <rect x={a.x + 14} y="262" width="10" height="10" rx="2.5" fill={i === 1 ? L.lime : L.cyan} fillOpacity={i === 1 ? 1 : 0.7} />
                <text x={a.x + 32} y="271" className="font-mono" fontSize="10" letterSpacing="1.4" fill={L.fg}>{a.label.toUpperCase()}</text>
                <rect x={a.x + 14} y="284" width="80" height="4" rx="2" fill={L.fg} fillOpacity="0.2" />
                <rect x={a.x + 14} y="294" width="56" height="4" rx="2" fill={L.fg} fillOpacity="0.12" />
              </g>
            ))}
          </g>

          {/* Data layer */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("data")}`}>
            <text x="44" y="352" className="font-mono" fontSize="9" letterSpacing="1.8" fill="#6f7f98">DATA LAYER</text>
            {dbs.map((d) => (
              <Cylinder key={d.x} {...d} />
            ))}
            {glow("data") && dbs.map((d) => <ellipse key={d.x} cx={d.x} cy={368} rx="46" ry="12" stroke={L.lime} strokeWidth="2" />)}
          </g>

          {/* Deployment pipeline */}
          <g data-cl-layer className={`transition-opacity duration-500 ${lit("pipeline")}`}>
            <path d="M90 500 H550" stroke={glow("pipeline") ? L.lime : L.line} strokeWidth={glow("pipeline") ? 2 : 1.2} />
            <path d="M550 500 V470 M550 470 l-5 6 M550 470 l5 6" stroke={L.lime} strokeOpacity="0.7" />
            {pipeline.map((p, i) => {
              const x = 90 + i * (460 / 3);
              return (
                <g key={p}>
                  <rect x={x - 40} y="486" width="80" height="28" rx="14" fill={L.ink700} stroke={i === 3 ? L.lime : L.line} />
                  <text x={x} y="504" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.6" fill={i === 3 ? L.lime : L.fg}>
                    {p.toUpperCase()}
                  </text>
                </g>
              );
            })}
            <text x="44" y="478" className="font-mono" fontSize="9" letterSpacing="1.8" fill="#6f7f98">DEPLOYMENT PIPELINE</text>
            <circle data-cl-deploy cx="90" cy="500" r="3.5" fill={L.lime} />
          </g>

          {/* Packets */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} data-cl-packet cx={routes[i % routes.length][0][0]} cy={routes[i % routes.length][0][1]} r="3.5" fill={i % 2 ? L.cyan : L.lime} opacity="0" />
          ))}
        </svg>
        <figcaption className="relative mt-2 px-1 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">Illustrative architecture</figcaption>
      </figure>
    </div>
  );
}
