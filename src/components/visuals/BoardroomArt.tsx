/**
 * Original line illustration: a strategy session around a boardroom table,
 * with a presentation screen and collaboration links. Brand colours only.
 */
type P = { x: number; y: number; s: number; accent?: boolean };

// People around the table (s = scale for depth)
const back: P[] = [
  { x: 250, y: 196, s: 0.8 },
  { x: 340, y: 186, s: 0.8, accent: true },
  { x: 460, y: 186, s: 0.8 },
  { x: 550, y: 196, s: 0.8 },
];
const sides: P[] = [
  { x: 150, y: 238, s: 0.9 },
  { x: 650, y: 238, s: 0.9 },
];
const front: P[] = [
  { x: 280, y: 312, s: 1.15 },
  { x: 400, y: 318, s: 1.15, accent: true },
  { x: 520, y: 312, s: 1.15 },
];

function Person({ x, y, s, accent }: P) {
  const stroke = accent ? "#b7f000" : "rgb(167 180 200 / 0.55)";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 22 C-22 4 -12 -4 0 -4 C12 -4 22 4 22 22 Z" fill="#102342" stroke={stroke} strokeWidth="1.2" />
      <circle cx="0" cy="-16" r="10" fill="#102342" stroke={stroke} strokeWidth="1.2" />
    </g>
  );
}

export function BoardroomArt({ className = "" }: { className?: string }) {
  const screen = { x: 300, y: 34, w: 200, h: 112 };
  const bars = [34, 52, 44, 68, 82];
  return (
    <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none">
      <defs>
        <radialGradient id="br-light" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#173058" />
          <stop offset="1" stopColor="#0b1b35" />
        </radialGradient>
        <linearGradient id="br-table" x1="0" y1="200" x2="0" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#173058" />
          <stop offset="1" stopColor="#0b1b35" />
        </linearGradient>
        <radialGradient id="br-screen" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#b7f000" stopOpacity="0.18" />
          <stop offset="1" stopColor="#b7f000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="360" fill="url(#br-light)" />

      {/* Floor perspective */}
      <g stroke="rgb(167 180 200 / 0.07)">
        {[-400, -250, -100, 50, 200, 350, 500, 650, 800, 950, 1100, 1200].map((x) => (
          <path key={x} d={`M400 150 L${x} 360`} />
        ))}
        {[190, 230, 280, 340].map((y) => (
          <path key={y} d={`M0 ${y} H800`} />
        ))}
      </g>

      {/* Screen glow + screen */}
      <ellipse cx="400" cy="92" rx="190" ry="90" fill="url(#br-screen)" />
      <rect x={screen.x} y={screen.y} width={screen.w} height={screen.h} rx="6" fill="#061327" stroke="rgb(167 180 200 / 0.4)" />
      <path d="M318 52 H380 M318 62 H352" stroke="rgb(245 247 250 / 0.5)" strokeWidth="2" strokeLinecap="round" />
      {bars.map((h, i) => (
        <rect key={i} x={322 + i * 18} y={134 - h * 0.7} width="10" height={h * 0.7} rx="1.5" fill={i === 4 ? "#b7f000" : "rgb(41 184 212 / 0.55)"} />
      ))}
      <g data-r="draw">
        <polyline
          points="420,122 440,110 456,114 472,92 486,80"
          stroke="#b7f000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </g>
      <circle cx="486" cy="80" r="3.5" fill="#b7f000" />
      <path d="M392 146 V160 M370 160 H414" stroke="rgb(167 180 200 / 0.35)" />

      {/* Collaboration links: people ↔ screen */}
      <g stroke="#b7f000" strokeOpacity="0.4" strokeWidth="1">
        {[...back, ...sides].map((p) => (
          <path key={`${p.x}-${p.y}`} className="flow-line" d={`M${p.x} ${p.y - 16 * p.s} Q${(p.x + 400) / 2} ${p.y - 70} 400 150`} />
        ))}
      </g>

      {/* Back row sits behind the table */}
      {back.map((p) => (
        <Person key={`${p.x}`} {...p} />
      ))}
      {sides.map((p) => (
        <Person key={`${p.x}`} {...p} />
      ))}

      {/* Table */}
      <ellipse cx="400" cy="262" rx="270" ry="62" fill="url(#br-table)" stroke="rgb(167 180 200 / 0.35)" />
      <ellipse cx="400" cy="258" rx="230" ry="44" stroke="rgb(167 180 200 / 0.1)" />

      {/* Documents on the table */}
      <g stroke="rgb(245 247 250 / 0.55)" strokeWidth="1">
        <g transform="translate(300 246) rotate(-8)">
          <rect width="46" height="30" rx="2" fill="#0b1b35" />
          <path d="M7 9 H34 M7 16 H26" stroke="#b7f000" strokeOpacity="0.8" />
        </g>
        <g transform="translate(420 240) rotate(6)">
          <rect width="52" height="32" rx="2" fill="#0b1b35" />
          <rect x="6" y="18" width="5" height="8" fill="rgb(41 184 212 / 0.7)" stroke="none" />
          <rect x="14" y="13" width="5" height="13" fill="rgb(41 184 212 / 0.7)" stroke="none" />
          <rect x="22" y="9" width="5" height="17" fill="#b7f000" stroke="none" />
        </g>
        <g transform="translate(520 254) rotate(-4)">
          <rect width="40" height="26" rx="2" fill="#0b1b35" />
          <path d="M6 8 H30 M6 14 H22" />
        </g>
      </g>

      {/* Front row overlaps the table edge */}
      {front.map((p) => (
        <Person key={`${p.x}`} {...p} />
      ))}
    </svg>
  );
}
