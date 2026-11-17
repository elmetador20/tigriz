import { about, verticals } from "@/content/site";
import type { VennGeometry } from "./venn-geometry";

/**
 * Consultancy × Technologies Venn as SVG. Purely presentational:
 * hover/selection state comes from [data-active] on an ancestor
 * (see globals.css "About — Venn"), entrance and particles from AboutMotion.
 *
 * Layers per circle:
 *   g[data-vn-enter]   ← GSAP entrance (position/opacity)
 *     g.vn-group       ← CSS state (scale/dim)
 *       fill · g[data-vn-glowwrap] > glow · stroke[data-vn-stroke]
 */
type Labels = {
  tag: { a: Pt; b: Pt; ab: Pt };
  title: { a: Pt; b: Pt };
  verbs: { a: Pt[]; b: Pt[] };
  centerTitle: Pt[];
  sizes: { tag: number; title: number; verb: number; centerTitle: number };
};
type Pt = { x: number; y: number };

function labelsFor(g: VennGeometry): Labels {
  if (g.variant === "h") {
    const ax = 152;
    const bx = 568;
    return {
      tag: { a: { x: ax, y: 196 }, b: { x: bx, y: 196 }, ab: { x: g.mid.x, y: 232 } },
      title: { a: { x: ax, y: 230 }, b: { x: bx, y: 230 } },
      verbs: {
        a: [0, 1, 2].map((i) => ({ x: ax, y: 268 + i * 25 })),
        b: [0, 1, 2].map((i) => ({ x: bx, y: 268 + i * 25 })),
      },
      centerTitle: [
        { x: g.mid.x, y: 266 },
        { x: g.mid.x, y: 292 },
      ],
      sizes: { tag: 12.5, title: 22, verb: 16, centerTitle: 21 },
    };
  }
  return {
    tag: { a: { x: g.a.x, y: 104 }, b: { x: g.b.x, y: 404 }, ab: { x: g.mid.x, y: 274 } },
    title: { a: { x: g.a.x, y: 138 }, b: { x: g.b.x, y: 438 } },
    verbs: { a: [{ x: g.a.x, y: 172 }], b: [{ x: g.b.x, y: 472 }] },
    centerTitle: [{ x: g.mid.x, y: 302 }],
    sizes: { tag: 12, title: 22, verb: 14, centerTitle: 17 },
  };
}

export function VennDiagram({ g, className = "" }: { g: VennGeometry; className?: string }) {
  const id = `venn-${g.variant}`;
  const L = labelsFor(g);
  const c = verticals.consultancy;
  const t = verticals.technologies;
  const center = about.venn.center;
  const vertical = g.variant === "v";
  const verbsA = vertical ? [c.verbs.join(" ")] : c.verbs;
  const verbsB = vertical ? [t.verbs.join(" ")] : t.verbs;
  const centerLines = vertical ? [center.title] : center.title.split(" ");

  // Particles: orbiting dots (angles in degrees) — fewer on the stacked mobile layout.
  const orbitA = vertical ? [210, 330] : [200, 300, 20];
  const orbitB = vertical ? [30, 150] : [20, 120, 230];
  const links = vertical ? 1 : 2;
  const pos = (p: Pt, deg: number) => ({
    x: Math.round((p.x + g.r * Math.cos((deg * Math.PI) / 180)) * 100) / 100,
    y: Math.round((p.y + g.r * Math.sin((deg * Math.PI) / 180)) * 100) / 100,
  });

  return (
    <svg
      data-venn={g.variant}
      data-ax={g.a.x}
      data-ay={g.a.y}
      data-bx={g.b.x}
      data-by={g.b.y}
      data-r={g.r}
      viewBox={`0 0 ${g.width} ${g.height}`}
      className={`block h-auto w-full touch-manipulation overflow-visible ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-fa`} cx="0.42" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#b7f000" stopOpacity="0.13" />
          <stop offset="1" stopColor="#b7f000" stopOpacity="0.015" />
        </radialGradient>
        <radialGradient id={`${id}-fb`} cx="0.58" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#29b8d4" stopOpacity="0.14" />
          <stop offset="1" stopColor="#29b8d4" stopOpacity="0.015" />
        </radialGradient>
        <linearGradient
          id={`${id}-lens`}
          x1={vertical ? g.mid.x : g.mid.x - g.lensSpan / 2}
          y1={vertical ? g.mid.y - g.lensSpan / 2 : g.mid.y}
          x2={vertical ? g.mid.x : g.mid.x + g.lensSpan / 2}
          y2={vertical ? g.mid.y + g.lensSpan / 2 : g.mid.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#b7f000" stopOpacity="0.3" />
          <stop offset="1" stopColor="#29b8d4" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d4ff4d" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#29b8d4" stopOpacity="0.08" />
          <stop offset="1" stopColor="#061327" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={vertical ? 5 : 7} />
        </filter>
        <filter id={`${id}-dot`} x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id={`${id}-clip-lens`}>
          <path d={g.lens} />
        </clipPath>
      </defs>

      {/* Dotted halo rings */}
      <g fill="none" stroke="rgb(167 180 200 / 0.18)" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round">
        <circle cx={g.a.x} cy={g.a.y} r={g.r + 18} />
        <circle cx={g.b.x} cy={g.b.y} r={g.r + 18} />
      </g>

      {/* Circles */}
      {(["a", "b"] as const).map((k) => {
        const p = g[k];
        const color = k === "a" ? "#b7f000" : "#29b8d4";
        return (
          <g key={k} data-vn-enter={k}>
            <g className={`vn-group vn-group-${k}`}>
              <circle cx={p.x} cy={p.y} r={g.r} fill={`url(#${id}-f${k})`} className={`vn-fill vn-fill-${k}`} />
              <g data-vn-glowwrap>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={g.r}
                  fill="none"
                  stroke={color}
                  strokeWidth="4"
                  filter={`url(#${id}-glow)`}
                  className={`vn-glow vn-glow-${k}`}
                />
              </g>
              <circle
                data-vn-stroke
                cx={p.x}
                cy={p.y}
                r={g.r}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray="1"
                className={`vn-stroke vn-stroke-${k}`}
                transform={`rotate(${k === "a" ? -90 : 90} ${p.x} ${p.y})`}
              />
            </g>
          </g>
        );
      })}

      {/* Integrated core */}
      <g data-vn-core>
        <circle cx={g.mid.x} cy={g.mid.y} r={g.lensSpan * 0.95} fill={`url(#${id}-core)`} className="vn-core" clipPath={`url(#${id}-clip-lens)`} />
        <path d={g.lens} fill={`url(#${id}-lens)`} className="vn-lens" />
        <path d={g.lens} fill="none" stroke="rgb(245 247 250 / 0.4)" strokeWidth="1" />
      </g>

      {/* Particles */}
      <g data-vn-particles>
        {(["a", "b"] as const).map((k) => (
          <g key={k} data-vn-orbit={k} data-cx={g[k].x} data-cy={g[k].y}>
            {(k === "a" ? orbitA : orbitB).map((deg, i) => {
              const p = pos(g[k], deg);
              const color = k === "a" ? "#b7f000" : "#29b8d4";
              return (
                <g key={deg}>
                  <circle cx={p.x} cy={p.y} r={i === 0 ? 7 : 5} fill={color} opacity="0.55" filter={`url(#${id}-dot)`} />
                  <circle cx={p.x} cy={p.y} r={i === 0 ? 3.5 : 2.4} fill={color} />
                </g>
              );
            })}
          </g>
        ))}
        {Array.from({ length: links }, (_, i) => (
          <circle key={i} data-vn-link cx={g.a.x} cy={g.a.y} r="2.4" fill="#f5f7fa" opacity="0" />
        ))}
      </g>

      {/* Labels */}
      <g data-vn-labels textAnchor="middle">
        <g className="vn-label-a">
          <text x={L.tag.a.x} y={L.tag.a.y} className="vn-tag font-mono" fontSize={L.sizes.tag} letterSpacing="2.6" fill="#b7f000">
            {c.tag.toUpperCase()}
          </text>
          <text x={L.title.a.x} y={L.title.a.y} className="vn-title vn-title-a font-display" fontSize={L.sizes.title} fontWeight="600" letterSpacing="1.6" fill="#f5f7fa">
            {c.label.toUpperCase()}
          </text>
          {verbsA.map((v, i) => (
            <text key={v} x={L.verbs.a[i].x} y={L.verbs.a[i].y} className="vn-verb vn-verb-a font-sans" fontSize={L.sizes.verb} fill="#a7b4c8">
              {v}
            </text>
          ))}
        </g>
        <g className="vn-label-b">
          <text x={L.tag.b.x} y={L.tag.b.y} className="vn-tag font-mono" fontSize={L.sizes.tag} letterSpacing="2.6" fill="#29b8d4">
            {t.tag.toUpperCase()}
          </text>
          <text x={L.title.b.x} y={L.title.b.y} className="vn-title vn-title-b font-display" fontSize={L.sizes.title} fontWeight="600" letterSpacing="1.6" fill="#f5f7fa">
            {t.label.toUpperCase()}
          </text>
          {verbsB.map((v, i) => (
            <text key={v} x={L.verbs.b[i].x} y={L.verbs.b[i].y} className="vn-verb vn-verb-b font-sans" fontSize={L.sizes.verb} fill="#a7b4c8">
              {v}
            </text>
          ))}
        </g>
        <g className="vn-label-ab">
          <text x={L.tag.ab.x} y={L.tag.ab.y} className="vn-tag font-mono" fontSize={L.sizes.tag - 1} letterSpacing="2.6" fill="#f5f7fa">
            {center.tag.toUpperCase()}
          </text>
          {centerLines.map((line, i) => (
            <text
              key={line}
              x={L.centerTitle[i].x}
              y={L.centerTitle[i].y}
              className="vn-title vn-title-ab font-display"
              fontSize={L.sizes.centerTitle}
              fontWeight="500"
              fill="#f5f7fa"
            >
              {line}
            </text>
          ))}
        </g>
      </g>

      {/* Hit surface (region resolved in VennInteractive) */}
      <rect data-vn-hit x="0" y="0" width={g.width} height={g.height} fill="transparent" />
    </svg>
  );
}
