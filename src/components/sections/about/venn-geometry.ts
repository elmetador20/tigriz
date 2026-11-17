/** Geometry for the two-circle Venn, in either orientation. Pure and server-safe. */

export type Pt = { x: number; y: number };

export type VennGeometry = {
  variant: "h" | "v";
  width: number;
  height: number;
  r: number;
  a: Pt;
  b: Pt;
  mid: Pt;
  /** Closed path of the overlap (lens). */
  lens: string;
  /** Lens extent across its narrow axis (for the core glow). */
  lensSpan: number;
};

const f = (n: number) => Math.round(n * 10) / 10;

function build(variant: "h" | "v", width: number, height: number, a: Pt, b: Pt, r: number): VennGeometry {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const half = Math.sqrt(r * r - (d / 2) ** 2);
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

  // Intersection points; arc sweep flags follow from orientation (see About notes).
  const lens =
    variant === "h"
      ? `M${f(mid.x)} ${f(mid.y - half)} A${r} ${r} 0 0 1 ${f(mid.x)} ${f(mid.y + half)} A${r} ${r} 0 0 1 ${f(mid.x)} ${f(mid.y - half)} Z`
      : `M${f(mid.x - half)} ${f(mid.y)} A${r} ${r} 0 0 0 ${f(mid.x + half)} ${f(mid.y)} A${r} ${r} 0 0 0 ${f(mid.x - half)} ${f(mid.y)} Z`;

  return { variant, width, height, r, a, b, mid, lens, lensSpan: 2 * r - d };
}

/** Desktop / tablet: side by side. */
export const VENN_H = build("h", 720, 520, { x: 260, y: 260 }, { x: 460, y: 260 }, 210);

/** Mobile: stacked vertically. */
export const VENN_V = build("v", 360, 580, { x: 180, y: 180 }, { x: 180, y: 390 }, 160);

/** Which region a point (in viewBox units) falls in. */
export function regionAt(g: Pick<VennGeometry, "a" | "b" | "r">, p: Pt): "a" | "b" | "ab" | null {
  const inA = Math.hypot(p.x - g.a.x, p.y - g.a.y) <= g.r;
  const inB = Math.hypot(p.x - g.b.x, p.y - g.b.y) <= g.r;
  return inA && inB ? "ab" : inA ? "a" : inB ? "b" : null;
}
