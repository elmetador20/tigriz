import Link from "next/link";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pathways } from "@/content/approach";

type P = [number, number];
type Seg = [P, P, P, P];

/** Cubic segments for each pathway (400×520 artboard). */
const SEG_A: Seg[] = [
  [[0, 90], [120, 90], [150, 170], [170, 250]],
  [[170, 250], [190, 330], [200, 360], [200, 400]],
];
const SEG_B: Seg[] = [
  [[400, 90], [280, 90], [250, 170], [230, 250]],
  [[230, 250], [210, 330], [200, 360], [200, 400]],
];

const toPath = (segs: Seg[]) => `M${segs[0][0].join(" ")} ` + segs.map(([, c1, c2, p]) => `C${c1.join(" ")} ${c2.join(" ")} ${p.join(" ")}`).join(" ");

/** Point at t ∈ [0,1] across the joined segments (evaluated at render; server-only). */
function at(segs: Seg[], t: number): P {
  const s = Math.min(segs.length - 1, Math.floor(t * segs.length));
  const u = t * segs.length - s;
  const [p0, p1, p2, p3] = segs[s];
  const m = 1 - u;
  const f = (i: 0 | 1) => m * m * m * p0[i] + 3 * m * m * u * p1[i] + 3 * m * u * u * p2[i] + u * u * u * p3[i];
  return [Math.round(f(0) * 10) / 10, Math.round(f(1) * 10) / 10];
}

const STOPS = [0.18, 0.42, 0.66, 0.88];

function Converge() {
  const routes = [
    { key: "a", segs: SEG_A, color: "#b7f000" },
    { key: "b", segs: SEG_B, color: "#29b8d4" },
  ];
  return (
    <svg viewBox="0 0 400 520" className="mx-auto w-full max-w-[380px] overflow-visible" fill="none" aria-hidden>
      <defs>
        <radialGradient id="pw-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#b7f000" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#29b8d4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#061327" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-stem" x1="0" y1="400" x2="0" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b7f000" />
          <stop offset="1" stopColor="#29b8d4" />
        </linearGradient>
      </defs>

      {routes.map((r) => (
        <g key={r.key}>
          <path d={toPath(r.segs)} stroke={r.color} strokeOpacity="0.15" strokeWidth="10" strokeLinecap="round" />
          <g data-r="draw">
            <path data-pw-path={r.key} d={toPath(r.segs)} stroke={r.color} strokeWidth="2" strokeLinecap="round" pathLength={1} />
          </g>
          {STOPS.map((t, i) => {
            const [x, y] = at(r.segs, t);
            return (
              <g key={t} data-pw-node={`${r.key}${i}`} className="pw-node">
                <circle cx={x} cy={y} r="11" fill="#061327" stroke={r.color} strokeOpacity="0.5" />
                <circle cx={x} cy={y} r="4" fill={r.color} className="pw-core" />
              </g>
            );
          })}
          <circle data-pw-packet={r.key} cx={r.segs[0][0][0]} cy={r.segs[0][0][1]} r="4.5" fill={r.color} opacity="0" />
          <text
            x={r.key === "a" ? 14 : 386}
            y={68}
            textAnchor={r.key === "a" ? "start" : "end"}
            className="font-mono"
            fontSize="15"
            letterSpacing="3"
            fill={r.color}
          >
            {r.key.toUpperCase()}
          </text>
        </g>
      ))}

      <path d="M200 400 V446" stroke="url(#pw-stem)" strokeWidth="2.5" />
      <circle cx="200" cy="470" r="70" fill="url(#pw-glow)" />
      <circle cx="200" cy="470" r="26" fill="#0b1b35" stroke="#b7f000" strokeWidth="1.5" />
      <circle cx="200" cy="470" r="36" stroke="rgb(245 247 250 / 0.2)" strokeDasharray="2 6" />
      <path d="M190 470 l7 7 l13 -14" stroke="#b7f000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PathwayCard({ p, accent }: { p: typeof pathways.a | typeof pathways.b; accent: "lime" | "cyan" }) {
  const text = accent === "lime" ? "text-lime" : "text-cyan";
  const border = accent === "lime" ? "hover:border-lime/40" : "hover:border-cyan/40";
  return (
    <article data-r="up" className={`group relative flex h-full flex-col rounded-[24px] border border-line bg-ink-800/70 p-6 transition-colors duration-500 sm:p-8 ${border}`}>
      <div className="flex items-center justify-between">
        <span className={`label-mono text-[0.62rem] ${text}`}>{p.label}</span>
        <span className={`grid size-9 place-items-center rounded-full border border-line-strong font-mono text-xs ${text}`}>{p.key}</span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-medium tracking-[-0.02em] text-fg">{p.title}</h3>

      <ol className="relative mt-7 space-y-4">
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong" />
        {p.journey.map((step, i) => (
          <li key={step} data-pw-step={`${p.key.toLowerCase()}${i}`} className="pw-step relative flex items-center gap-4">
            <span className={`pw-dot relative z-[1] size-[15px] shrink-0 rounded-full border-2 border-line-strong bg-ink-900 transition-colors duration-500 ${accent === "lime" ? "pw-lime" : "pw-cyan"}`} />
            <span className="text-[0.95rem] text-fg/90">{step}</span>
          </li>
        ))}
      </ol>

      <ul aria-label={`${p.title} services`} className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
        {p.services.map((s) => (
          <li key={s} className="rounded-full border border-line-strong px-3 py-1.5 text-[0.78rem] text-fg/85">
            {s}
          </li>
        ))}
      </ul>

      <Link href={p.href} className="group/link mt-auto inline-flex items-center gap-3 pt-7 text-sm font-medium text-fg">
        <span className={`grid size-8 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover/link:border-transparent ${accent === "lime" ? "group-hover/link:bg-lime" : "group-hover/link:bg-cyan"} group-hover/link:text-ink-900`}>
          <ArrowSwap className="size-3.5" />
        </span>
        Explore {p.title.toLowerCase()}
      </Link>
    </article>
  );
}

export function EngagementPathways() {
  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <SectionHeading
          className="lg:col-span-7"
          headingId="pathways-heading"
          label={pathways.eyebrow}
          lines={[pathways.heading[0], { text: pathways.heading[1], tone: "muted" }]}
        />
        <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
          {pathways.description}
        </p>
      </div>

      <div data-pathways className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-4">
          <PathwayCard p={pathways.a} accent="lime" />
        </div>
        <div className="order-3 flex flex-col items-center justify-end md:col-span-2 lg:order-2 lg:col-span-4">
          <Converge />
          <div data-r="up" className="relative -mt-4 w-full max-w-[22rem] rounded-2xl bg-gradient-to-r from-lime/60 via-fg/20 to-cyan/60 p-px">
            <div className="rounded-2xl bg-ink-900 px-5 py-4 text-center">
              <p className="label-mono text-[0.58rem] text-subtle">Shared outcome</p>
              <p className="mt-2 font-display text-base leading-snug font-semibold tracking-[0.08em] text-fg uppercase">{pathways.outcome}</p>
            </div>
          </div>
        </div>
        <div className="order-2 lg:order-3 lg:col-span-4">
          <PathwayCard p={pathways.b} accent="cyan" />
        </div>
      </div>

      <p data-r="up" className="mt-8 flex items-center justify-center gap-3 text-center text-[0.92rem] text-muted">
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        {pathways.note}
        <span aria-hidden className="h-px w-8 bg-line-strong" />
      </p>
    </div>
  );
}
