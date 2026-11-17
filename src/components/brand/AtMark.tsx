import { useId } from "react";

/**
 * Arabian TIGRIZ "AT" identity mark, traced from the logo on the
 * company profile cover (no vector asset is supplied). Proportions:
 * rounded-apex A without a crossbar, curved lime swoosh in its lower
 * opening, forward-slanted T bar over a vertical stem.
 *
 * Pieces carry data-at attributes so motion layers can reveal them
 * independently (outline draw, A, swoosh, T bar, T stem).
 */
export const AT_PATHS = {
  a: "M2 90 L60 5 Q68 -3 76 5 L134 90 H103 L67 28 L29 90 Z",
  swoosh: "M29 90 C37 75 44 65 56 63 H88 C76 70 66 80 60 90 Z",
  tBar: "M111 3.6 H202 L187 23 H98 Z",
  tStem: "M137 23 H160 V90 H137 Z",
} as const;

export const AT_VIEWBOX = "0 -2 204 94";

type Props = {
  className?: string;
  /** Draw outline paths used by the reveal animation. */
  withOutline?: boolean;
  title?: string;
};

export function AtMark({ className, withOutline = false, title }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gA = `${id}-a`;
  const gT = `${id}-t`;
  const gS = `${id}-s`;

  return (
    <svg
      viewBox={AT_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={gA} x1="8" y1="60" x2="128" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#273246" />
          <stop offset="0.45" stopColor="#8e98a9" />
          <stop offset="0.8" stopColor="#dde2ea" />
          <stop offset="1" stopColor="#f5f7fa" />
        </linearGradient>
        <linearGradient id={gT} x1="98" y1="4" x2="200" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe4ec" />
        </linearGradient>
        <linearGradient id={gS} x1="29" y1="90" x2="88" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#577600" />
          <stop offset="1" stopColor="#a8dc00" />
        </linearGradient>
      </defs>

      {withOutline && (
        <g data-at="outline" stroke="#b7f000" strokeWidth="0.5" strokeLinejoin="round">
          {Object.values(AT_PATHS).map((d) => (
            <path key={d} d={d} pathLength={1} strokeDasharray="1" strokeDashoffset="0" />
          ))}
        </g>
      )}

      <path data-at="a" d={AT_PATHS.a} fill={`url(#${gA})`} />
      <path data-at="swoosh" d={AT_PATHS.swoosh} fill={`url(#${gS})`} />
      <path data-at="t-bar" d={AT_PATHS.tBar} fill={`url(#${gT})`} />
      <path data-at="t-stem" d={AT_PATHS.tStem} fill={`url(#${gT})`} />
    </svg>
  );
}
