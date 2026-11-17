import { AtMark } from "@/components/brand/AtMark";
import { hero } from "@/content/site";

/**
 * Signature visual: the AT monogram inside a technical constellation.
 * Layers carry data-depth for pointer parallax (HeroMotion):
 *   0.35 back geometry · 1 mark · 0.6 front orbit arc · 0.8 labels
 * Coordinates are in a 600×600 box; the mark occupies x 84–516, y 200–400.
 */

// Anchor points on the mark (in the 600 box)
const APEX = [228, 204];
const T_RIGHT = [510, 214];
const A_FOOT = [90, 396];
const T_FOOT = [397, 396];

// Constellation nodes
const N = {
  n1: [64, 128],
  n2: [184, 62],
  n3: [468, 74],
  n4: [566, 196],
  n5: [548, 472],
  n6: [404, 548],
  n7: [116, 526],
  n8: [34, 330],
} as const;

const line = (a: readonly number[], b: readonly number[]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;

const drawn = [line(N.n8, N.n1), line(N.n1, N.n2), line(N.n3, N.n4), line(N.n4, N.n5), line(N.n5, N.n6), line(N.n7, N.n8)];
const flowing = [line(N.n2, APEX), line(N.n3, T_RIGHT), line(N.n7, A_FOOT), line(N.n6, T_FOOT), line(N.n2, N.n3)];

const ORBIT = { cx: 300, cy: 318, rx: 286, ry: 74, rot: -9 };

export function HeroVisual() {
  const L = hero.visualLabels;

  return (
    <div data-hero-visual className="relative mx-auto aspect-square w-full max-w-[640px] select-none">
      {/* Back geometry */}
      <div data-depth="0.35" className="absolute inset-0">
        <svg viewBox="0 0 600 600" className="size-full overflow-visible" aria-hidden fill="none">
          <defs>
            <radialGradient id="hv-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#b7f000" stopOpacity="0.16" />
              <stop offset="0.55" stopColor="#29b8d4" stopOpacity="0.05" />
              <stop offset="1" stopColor="#061327" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="300" cy="300" r="260" fill="url(#hv-core)" />

          {/* Technical frame: corner brackets + ticks */}
          <g data-hero-geo stroke="rgb(167 180 200 / 0.35)" strokeWidth="1">
            {[
              "M24 46 V24 H46",
              "M554 24 H576 V46",
              "M576 554 V576 H554",
              "M46 576 H24 V554",
              "M300 14 V30",
              "M292 22 H308",
              "M300 570 V586",
              "M292 578 H308",
            ].map((d) => (
              <path key={d} d={d} pathLength={1} />
            ))}
          </g>

          {/* Orbit (back half shows through, front arc is in a layer above the mark) */}
          <g transform={`rotate(${ORBIT.rot} ${ORBIT.cx} ${ORBIT.cy})`}>
            <ellipse
              data-hero-geo-fade
              cx={ORBIT.cx}
              cy={ORBIT.cy}
              rx={ORBIT.rx}
              ry={ORBIT.ry}
              stroke="rgb(167 180 200 / 0.18)"
              strokeWidth="1"
            />
            <ellipse
              data-hero-geo-fade
              cx={ORBIT.cx}
              cy={ORBIT.cy}
              rx={ORBIT.rx - 52}
              ry={ORBIT.ry - 20}
              stroke="rgb(41 184 212 / 0.28)"
              strokeWidth="1"
              strokeDasharray="1 6"
              strokeLinecap="round"
            />
          </g>

          {/* Constellation */}
          <g data-hero-geo stroke="rgb(167 180 200 / 0.22)" strokeWidth="1">
            {drawn.map((d) => (
              <path key={d} d={d} pathLength={1} />
            ))}
          </g>
          <g data-hero-geo-fade stroke="#b7f000" strokeOpacity="0.55" strokeWidth="1">
            {flowing.map((d) => (
              <path key={d} d={d} className="flow-line" />
            ))}
          </g>

          <g data-hero-geo-fade>
            {Object.entries(N).map(([k, [x, y]], i) => {
              const cyan = i % 3 === 1;
              const color = cyan ? "#29b8d4" : "#b7f000";
              return (
                <g key={k}>
                  <circle cx={x} cy={y} r="3.5" fill={color} className="node-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                  <circle cx={x} cy={y} r="3.5" fill="#061327" stroke={color} strokeWidth="1.5" />
                </g>
              );
            })}
            {[APEX, T_RIGHT, A_FOOT, T_FOOT].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 2.5} y={y - 2.5} width="5" height="5" fill="#b7f000" />
            ))}
          </g>
        </svg>
      </div>

      {/* Monogram */}
      <div data-depth="1" className="absolute inset-0 grid place-items-center">
        <div data-hero-float className="w-[72%] [perspective:1200px]">
          <div data-hero-mark className="[transform-style:preserve-3d]">
            <AtMark
              withOutline
              title="Arabian TIGRIZ"
              className="block h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Front orbit arc passes in front of the mark */}
      <div data-depth="0.6" className="pointer-events-none absolute inset-0">
        <svg viewBox="0 0 600 600" className="size-full overflow-visible" aria-hidden fill="none">
          <defs>
            <linearGradient id="hv-arc" x1="14" y1="0" x2="586" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#29b8d4" stopOpacity="0" />
              <stop offset="0.35" stopColor="#29b8d4" stopOpacity="0.7" />
              <stop offset="0.7" stopColor="#b7f000" stopOpacity="0.9" />
              <stop offset="1" stopColor="#b7f000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g transform={`rotate(${ORBIT.rot} ${ORBIT.cx} ${ORBIT.cy})`}>
            <path
              data-hero-arc
              d={`M${ORBIT.cx - ORBIT.rx} ${ORBIT.cy} A${ORBIT.rx} ${ORBIT.ry} 0 0 0 ${ORBIT.cx + ORBIT.rx} ${ORBIT.cy}`}
              stroke="url(#hv-arc)"
              strokeWidth="1.5"
              pathLength={1}
            />
            <circle data-hero-geo-fade cx={ORBIT.cx + ORBIT.rx * 0.62} cy={ORBIT.cy + ORBIT.ry * 0.78} r="4" fill="#b7f000" />
          </g>
        </svg>
      </div>

      {/* Technical labels */}
      <div data-depth="0.8" aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase sm:text-[0.62rem]">
        <span data-hero-tag className="rounded-sm bg-ink-900/70 px-2 py-1 backdrop-blur-sm absolute top-[3%] left-[12%] flex items-center gap-2">
          <span className="size-1.5 bg-lime" />
          {L.top}
        </span>
        <span data-hero-tag className="rounded-sm bg-ink-900/70 px-2 py-1 backdrop-blur-sm absolute right-[6%] bottom-[2%] flex items-center gap-2">
          {L.bottom}
          <span className="size-1.5 bg-lime" />
        </span>
      </div>
    </div>
  );
}
