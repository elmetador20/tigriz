import { AT_PATHS } from "@/components/brand/AtMark";

/**
 * Brand-communication preview pieces built from Arabian TIGRIZ's own
 * identity (mark, palette, type). Illustrative only — not client work.
 */
const C = { ink900: "#061327", ink800: "#0b1b35", ink700: "#102342", ink600: "#173058", fg: "#f5f7fa", muted: "#a7b4c8", lime: "#b7f000", cyan: "#29b8d4", line: "rgb(167 180 200 / 0.35)" };
const mv = "[transform-box:fill-box] transition-transform duration-700 ease-out-expo";

function Mark({ x, y, s, mono = false }: { x: number; y: number; s: number; mono?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={AT_PATHS.a} fill={C.fg} fillOpacity={mono ? 0.9 : 0.85} />
      <path d={AT_PATHS.swoosh} fill={mono ? C.ink900 : C.lime} />
      <path d={AT_PATHS.tBar} fill={C.fg} />
      <path d={AT_PATHS.tStem} fill={C.fg} />
    </g>
  );
}

/** Mark, palette and type specimen. */
export function IdentityBoard() {
  const swatches = [C.ink900, C.ink800, C.ink700, C.lime, C.cyan, C.fg];
  return (
    <svg viewBox="0 0 240 150" className="mock block h-auto w-full" role="img" aria-label="Identity board preview: mark, colour palette and type specimen" fill="none">
      <rect x="6" y="6" width="112" height="78" rx="4" fill={C.ink900} stroke={C.line} />
      <g className={`${mv} origin-center group-hover/tile:scale-105`}>
        <Mark x={26} y={26} s={0.36} />
      </g>
      <rect x="124" y="6" width="110" height="78" rx="4" fill={C.ink800} stroke={C.line} />
      <text x="136" y="58" fill={C.fg} fontSize="38" fontWeight="500" className="font-display">Aa</text>
      <text x="200" y="30" fill={C.muted} fontSize="7" letterSpacing="1.4" className="font-mono" textAnchor="middle">SPACE</text>
      <text x="200" y="40" fill={C.muted} fontSize="7" letterSpacing="1.4" className="font-mono" textAnchor="middle">GROTESK</text>
      <rect x="136" y="68" width="40" height="3" rx="1.5" fill={C.lime} />
      {swatches.map((c, i) => (
        <rect
          key={c}
          x={6 + i * 38.6}
          y="92"
          width="34"
          height="52"
          rx="4"
          fill={c}
          stroke={C.line}
          className={`${mv} group-hover/tile:-translate-y-[4px]`}
          style={{ transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </svg>
  );
}

/** Letterhead and business cards. */
export function Stationery() {
  return (
    <svg viewBox="0 0 240 150" className="mock block h-auto w-full" role="img" aria-label="Corporate stationery preview: letterhead and business cards" fill="none">
      <g className={`${mv} group-hover/tile:-rotate-2`}>
        <rect x="18" y="8" width="96" height="134" rx="2" fill={C.fg} fillOpacity="0.94" />
        <Mark x={28} y={18} s={0.11} mono />
        <rect x="28" y="40" width="50" height="3" rx="1.5" fill={C.ink900} fillOpacity="0.5" />
        {[52, 58, 64, 70, 76, 82].map((y, i) => (
          <rect key={y} x="28" y={y} width={[72, 66, 74, 60, 70, 40][i]} height="2.4" rx="1.2" fill={C.ink900} fillOpacity="0.22" />
        ))}
        <rect x="18" y="136" width="96" height="6" fill={C.lime} />
      </g>
      <g className={`${mv} group-hover/tile:translate-x-[6px] group-hover/tile:-translate-y-[4px]`}>
        <rect x="128" y="24" width="96" height="56" rx="3" fill={C.ink900} stroke={C.line} transform="rotate(-6 176 52)" />
        <g transform="rotate(-6 176 52)">
          <Mark x={140} y={36} s={0.13} />
          <rect x="140" y="62" width="40" height="3" rx="1.5" fill={C.fg} fillOpacity="0.7" />
          <rect x="140" y="69" width="26" height="2.4" rx="1.2" fill={C.muted} fillOpacity="0.5" />
        </g>
      </g>
      <g className={`${mv} group-hover/tile:translate-x-[4px] group-hover/tile:translate-y-[4px]`}>
        <rect x="136" y="86" width="96" height="56" rx="3" fill={C.lime} transform="rotate(4 184 114)" />
        <g transform="rotate(4 184 114)">
          <rect x="148" y="100" width="44" height="4" rx="2" fill={C.ink900} />
          <rect x="148" y="109" width="30" height="3" rx="1.5" fill={C.ink900} fillOpacity="0.5" />
          <rect x="148" y="126" width="56" height="2.4" rx="1.2" fill={C.ink900} fillOpacity="0.35" />
        </g>
      </g>
    </svg>
  );
}

/** Wide digital advertising banner. */
export function AdBanner() {
  return (
    <svg viewBox="0 0 480 80" className="mock block h-auto w-full" role="img" aria-label="Digital advertising banner preview" fill="none">
      <rect x="2" y="2" width="476" height="76" rx="6" fill={C.ink800} stroke={C.line} />
      <rect x="2" y="2" width="120" height="76" rx="6" fill={C.ink600} />
      <path d="M2 78 L60 30 L84 50 L122 20 V78 Z" fill={C.cyan} fillOpacity="0.35" />
      <Mark x={140} y={22} s={0.17} />
      <rect x="186" y="26" width="140" height="8" rx="4" fill={C.fg} fillOpacity="0.9" />
      <rect x="186" y="42" width="96" height="4" rx="2" fill={C.muted} fillOpacity="0.5" />
      <g className={`${mv} group-hover/tile:translate-x-[4px]`}>
        <rect x="372" y="26" width="86" height="28" rx="14" fill={C.lime} />
        <path d="M424 40 h12 m-4 -4 l4 4 l-4 4" stroke={C.ink900} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="386" y="38" width="28" height="4" rx="2" fill={C.ink900} />
      </g>
    </svg>
  );
}
