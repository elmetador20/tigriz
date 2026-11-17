import { useId } from "react";
import { AT_PATHS } from "@/components/brand/AtMark";
import type { MockupKind } from "@/content/consultancy";

/**
 * Original document & marketing mockups (240×160 artboard).
 * - Text is drawn as bars; charts carry no figures (no invented data).
 * - Hover motion is driven by the nearest `group/mock` ancestor.
 * - `.mock` keeps strokes hairline at any size (globals.css).
 */

const C = {
  ink900: "#061327",
  ink800: "#0b1b35",
  ink700: "#102342",
  ink600: "#173058",
  line: "rgb(167 180 200 / 0.35)",
  lineSoft: "rgb(167 180 200 / 0.18)",
  fg: "#f5f7fa",
  muted: "#a7b4c8",
  lime: "#b7f000",
  cyan: "#29b8d4",
};

/** Transition helper for hover-moved layers. */
const mv = "[transform-box:fill-box] transition-transform duration-700 ease-out-expo";

function Bar({ x, y, w, h = 4, o = 0.25, fill = C.fg }: { x: number; y: number; w: number; h?: number; o?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} fillOpacity={o} />;
}

function Frame({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={`mock block h-auto w-full overflow-visible ${className}`} role="img" aria-label={label} fill="none">
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- */

function Slides() {
  const bars = [12, 18, 24, 32, 42];
  return (
    <Frame label="Illustration of a layered pitch deck">
      <g className={`${mv} group-hover/mock:-translate-x-[10px] group-hover/mock:-translate-y-[8px]`}>
        <rect x="52" y="16" width="150" height="94" rx="5" fill={C.ink700} stroke={C.lineSoft} />
      </g>
      <g className={`${mv} group-hover/mock:-translate-x-[5px] group-hover/mock:-translate-y-[4px]`}>
        <rect x="44" y="27" width="150" height="94" rx="5" fill={C.ink700} stroke={C.line} />
        <Bar x={56} y={38} w={40} o={0.18} />
      </g>
      <g>
        <rect x="36" y="38" width="150" height="94" rx="5" fill={C.ink800} stroke="rgb(245 247 250 / 0.5)" />
        <Bar x={48} y={50} w={58} h={6} o={0.9} />
        <Bar x={48} y={61} w={36} o={0.45} fill={C.muted} />
        <Bar x={48} y={80} w={48} o={0.22} />
        <Bar x={48} y={88} w={42} o={0.22} />
        <Bar x={48} y={96} w={34} o={0.22} />
        <rect x="48" y="108" width="22" height="9" rx="4.5" fill={C.lime} />
        <path d="M112 120 H176" stroke={C.line} />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={116 + i * 12}
            y={120 - h}
            width="7"
            height={h}
            rx="1"
            fill={i === 4 ? C.lime : C.cyan}
            fillOpacity={i === 4 ? 1 : 0.55}
            className={`${mv} origin-bottom group-hover/mock:scale-y-[1.15]`}
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
        <polyline
          points="118,98 132,90 144,84 156,72 172,58"
          stroke={C.lime}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          className="group-hover/mock:animate-[redraw_0.9s_var(--ease-out-expo)]"
        />
        <circle cx="172" cy="58" r="2.4" fill={C.lime} />
      </g>
    </Frame>
  );
}

function Profile() {
  return (
    <Frame label="Illustration of a corporate company profile">
      {/* Inner spread page */}
      <g className={`${mv} group-hover/mock:translate-x-[14px] group-hover/mock:rotate-[3deg]`}>
        <rect x="104" y="20" width="86" height="120" rx="3" fill={C.ink700} stroke={C.line} />
        <rect x="112" y="30" width="70" height="36" rx="2" fill={C.ink600} />
        <circle cx="168" cy="42" r="6" fill={C.cyan} fillOpacity="0.6" />
        <path d="M112 66 L134 48 L150 60 L162 52 L182 66 Z" fill={C.lime} fillOpacity="0.35" />
        <Bar x={112} y={76} w={46} h={5} o={0.75} />
        {[86, 93, 100, 107].map((y, i) => (
          <Bar key={y} x={112} y={y} w={[64, 58, 66, 40][i]} h={3} o={0.2} />
        ))}
        <rect x="112" y="118" width="30" height="14" rx="2" fill={C.ink900} stroke={C.lineSoft} />
        <rect x="146" y="118" width="36" height="14" rx="2" fill={C.ink900} stroke={C.lineSoft} />
      </g>
      {/* Cover */}
      <g className={`${mv} group-hover/mock:-translate-x-[6px] group-hover/mock:-rotate-[3deg]`}>
        <rect x="52" y="14" width="88" height="128" rx="3" fill={C.ink800} stroke="rgb(245 247 250 / 0.45)" />
        <g transform="translate(64 28) scale(0.2)">
          <path d={AT_PATHS.a} fill={C.fg} fillOpacity="0.9" />
          <path d={AT_PATHS.swoosh} fill={C.lime} />
          <path d={AT_PATHS.tBar} fill={C.fg} />
          <path d={AT_PATHS.tStem} fill={C.fg} />
        </g>
        <Bar x={64} y={62} w={56} h={6} o={0.9} />
        <Bar x={64} y={73} w={38} o={0.45} fill={C.muted} />
        <rect x="52" y="98" width="88" height="3" fill={C.lime} />
        <Bar x={64} y={114} w={30} h={3} o={0.3} />
        <Bar x={64} y={121} w={22} h={3} o={0.3} />
      </g>
    </Frame>
  );
}

function Report() {
  const bars = [14, 22, 18, 30, 26, 38];
  return (
    <Frame label="Illustration of a detailed project report with charts">
      <rect x="44" y="10" width="152" height="140" rx="4" fill={C.ink800} stroke="rgb(245 247 250 / 0.45)" />
      <Bar x={56} y={22} w={64} h={6} o={0.85} />
      <rect x="178" y="22" width="6" height="6" rx="1" fill={C.lime} />
      {/* Indicator blocks (no figures) */}
      {[56, 101, 146].map((x, i) => (
        <g key={x}>
          <rect x={x} y="36" width="38" height="24" rx="2" fill={C.ink700} stroke={C.lineSoft} />
          <Bar x={x + 6} y={42} w={16} h={3} o={0.4} fill={C.muted} />
          <path
            d={`M${x + 6} 54 l6 -3 l6 2 l6 -5 l8 -2`}
            stroke={i === 1 ? C.lime : C.cyan}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {/* Bar chart */}
      <path d="M56 132 H120" stroke={C.line} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 10}
          y={132 - h}
          width="6"
          height={h}
          rx="1"
          fill={i === 5 ? C.lime : C.cyan}
          fillOpacity={i === 5 ? 0.95 : 0.5}
          className={`${mv} origin-bottom group-hover/mock:scale-y-[1.18]`}
          style={{ transitionDelay: `${i * 35}ms` }}
        />
      ))}
      {/* Trend panel */}
      <rect x="128" y="70" width="56" height="64" rx="2" fill={C.ink700} stroke={C.lineSoft} />
      <path d="M134 122 L146 112 L156 116 L166 98 L178 86 V128 H134 Z" fill={C.lime} fillOpacity="0.08" />
      <polyline
        points="134,122 146,112 156,116 166,98 178,86"
        stroke={C.lime}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        className="group-hover/mock:animate-[redraw_0.9s_var(--ease-out-expo)]"
      />
      {[78, 84].map((y) => (
        <Bar key={y} x={134} y={y} w={y === 78 ? 26 : 18} h={3} o={0.3} />
      ))}
      <Bar x={56} y={140} w={80} h={3} o={0.15} />
    </Frame>
  );
}

function Proposal() {
  return (
    <Frame label="Illustration of a business proposal document">
      <g className={`${mv} group-hover/mock:translate-x-[10px] group-hover/mock:translate-y-[-4px]`}>
        <rect x="70" y="8" width="124" height="136" rx="4" fill={C.ink700} stroke={C.lineSoft} />
      </g>
      <rect x="54" y="16" width="124" height="136" rx="4" fill={C.ink800} stroke="rgb(245 247 250 / 0.5)" />
      <rect x="54" y="16" width="4" height="34" fill={C.lime} />
      <Bar x={66} y={26} w={70} h={6} o={0.9} />
      <Bar x={66} y={37} w={44} o={0.45} fill={C.muted} />
      {/* Scope rows */}
      {[60, 74, 88].map((y, i) => (
        <g key={y}>
          <rect x="66" y={y} width="8" height="8" rx="1.5" fill={i === 0 ? C.lime : C.cyan} fillOpacity={i === 0 ? 1 : 0.6} />
          <Bar x={80} y={y + 1} w={[62, 52, 70][i]} h={3} o={0.4} />
          <Bar x={80} y={y + 6} w={[40, 46, 34][i]} h={2} o={0.18} />
        </g>
      ))}
      {/* Commercials block (no figures) */}
      <rect x="66" y="104" width="100" height="16" rx="2" fill={C.ink700} stroke={C.lineSoft} />
      <Bar x={72} y={110} w={34} h={3} o={0.35} />
      <Bar x={140} y={110} w={20} h={4} o={0.75} fill={C.lime} />
      {/* Signature + approval stamp */}
      <path d="M66 140 H118" stroke={C.line} />
      <path
        d="M68 136 c4 -8 8 -8 9 -1 s5 4 8 -4 s6 -2 7 2 s6 2 12 -3"
        stroke={C.fg}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        className="group-hover/mock:animate-[redraw_1s_var(--ease-out-expo)]"
      />
      <g className={`${mv} origin-center group-hover/mock:scale-110 group-hover/mock:-rotate-12`}>
        <circle cx="152" cy="136" r="11" stroke={C.lime} strokeWidth="1.5" />
        <path d="M147 136 l3.5 3.5 l6.5 -7" stroke={C.lime} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

function slide(x: number, variant: 0 | 1) {
  return variant === 0 ? (
      <g>
        <rect x={x} y="22" width="168" height="94" fill={C.ink800} />
        <Bar x={x + 12} y={36} w={70} h={7} o={0.9} />
        <Bar x={x + 12} y={49} w={48} o={0.45} fill={C.muted} />
        <rect x={x + 12} y="66" width="22" height="9" rx="4.5" fill={C.lime} />
        <rect x={x + 96} y="34" width="60" height="70" rx="3" fill={C.ink600} />
        <circle cx={x + 126} cy="62" r="16" stroke={C.cyan} strokeOpacity="0.7" />
        <circle cx={x + 126} cy="62" r="6" fill={C.lime} />
      </g>
    ) : (
      <g>
        <rect x={x} y="22" width="168" height="94" fill={C.ink800} />
        <Bar x={x + 12} y={34} w={60} h={6} o={0.85} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={x + 12 + i * 50} y="52" width="44" height="48" rx="3" fill={C.ink700} stroke={C.lineSoft} />
            <rect x={x + 18 + i * 50} y="58" width="8" height="8" rx="2" fill={i === 1 ? C.lime : C.cyan} fillOpacity={i === 1 ? 1 : 0.6} />
            <Bar x={x + 18 + i * 50} y={74} w={30} h={3} o={0.45} />
            <Bar x={x + 18 + i * 50} y={81} w={22} h={3} o={0.2} />
          </g>
        ))}
      </g>
    );
}

function Presentation() {
  const clip = `pres-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <Frame label="Illustration of a corporate presentation on screen with slide transitions">
      <defs>
        <clipPath id={clip}>
          <rect x="36" y="22" width="168" height="94" rx="2" />
        </clipPath>
      </defs>
      <rect x="28" y="14" width="184" height="110" rx="6" fill={C.ink900} stroke="rgb(245 247 250 / 0.45)" />
      <g clipPath={`url(#${clip})`}>
        <g className="animate-[slide-swap_7s_var(--ease-in-out-quart)_infinite] group-hover/mock:[animation-duration:3.5s]">
          {slide(36, 0)}
          {slide(204, 1)}
          {slide(372, 0)}
        </g>
      </g>
      <path d="M120 124 V136 M96 138 H144" stroke={C.line} strokeWidth="1.5" strokeLinecap="round" />
      {/* Progress */}
      <rect x="36" y="146" width="168" height="2" rx="1" fill={C.lineSoft} />
      <rect x="36" y="146" width="168" height="2" rx="1" fill={C.lime} className="origin-left animate-[slide-progress_7s_linear_infinite] [transform-box:fill-box] group-hover/mock:[animation-duration:3.5s]" />
    </Frame>
  );
}

function Brochure() {
  return (
    <Frame label="Illustration of layered brochure and catalogue mockups">
      {/* Catalogue behind */}
      <g className={`${mv} group-hover/mock:translate-x-[8px] group-hover/mock:-translate-y-[8px]`}>
        <rect x="128" y="8" width="74" height="98" rx="3" fill={C.ink700} stroke={C.lineSoft} transform="rotate(8 165 57)" />
        <g transform="rotate(8 165 57)">
          <rect x="136" y="18" width="58" height="40" rx="2" fill={C.ink600} />
          <circle cx="165" cy="38" r="10" stroke={C.lime} strokeOpacity="0.6" />
          <Bar x={136} y={66} w={40} h={4} o={0.5} />
          <Bar x={136} y={74} w={30} h={3} o={0.2} />
        </g>
      </g>
      {/* Tri-fold brochure */}
      <g className={`${mv} origin-center group-hover/mock:scale-[1.04]`}>
        <polygon points="34,40 84,32 84,142 34,134" fill={C.ink700} stroke={C.line} />
        <polygon points="84,32 134,40 134,134 84,142" fill={C.ink800} stroke={C.line} />
        <polygon points="134,40 184,32 184,142 134,134" fill={C.ink700} stroke={C.line} />
        {/* panel 1 */}
        <polygon points="40,52 78,46 78,80 40,86" fill={C.ink600} />
        <Bar x={42} y={96} w={30} h={3} o={0.45} />
        <Bar x={42} y={103} w={24} h={3} o={0.2} />
        {/* panel 2 (cover-ish) */}
        <polygon points="90,44 128,50 128,58 90,52" fill={C.fg} fillOpacity="0.85" />
        <polygon points="90,60 116,64 116,68 90,64" fill={C.muted} fillOpacity="0.5" />
        <polygon points="84,112 134,120 134,128 84,120" fill={C.lime} />
        {/* panel 3 */}
        <circle cx="159" cy="70" r="14" fill={C.cyan} fillOpacity="0.25" stroke={C.cyan} strokeOpacity="0.6" />
        <Bar x={142} y={96} w={34} h={3} o={0.4} />
        <Bar x={142} y={103} w={26} h={3} o={0.2} />
      </g>
    </Frame>
  );
}

function Social() {
  const S = 52;
  const G = 8;
  const ox = 37;
  const oy = 20;
  const pos = (i: number) => ({ x: ox + (i % 3) * (S + G), y: oy + Math.floor(i / 3) * (S + G) });
  const shift = [
    "group-hover/mock:-translate-x-[4px] group-hover/mock:-translate-y-[4px]",
    "group-hover/mock:-translate-y-[5px]",
    "group-hover/mock:translate-x-[4px] group-hover/mock:-translate-y-[4px]",
    "group-hover/mock:-translate-x-[4px] group-hover/mock:translate-y-[4px]",
    "group-hover/mock:translate-y-[5px]",
    "group-hover/mock:translate-x-[4px] group-hover/mock:translate-y-[4px]",
  ];
  const tile = (i: number, body: React.ReactNode, fill: string = C.ink800) => {
    const p = pos(i);
    return (
      <g key={i} className={`${mv} ${shift[i]}`}>
        <g className="animate-[tile-glow_6s_ease-in-out_infinite]" style={{ animationDelay: `${i * 1}s` }}>
          <rect x={p.x} y={p.y} width={S} height={S} rx="4" fill={fill} stroke={C.line} />
          <g transform={`translate(${p.x} ${p.y})`}>{body}</g>
        </g>
      </g>
    );
  };
  return (
    <Frame label="Illustration of a grid of social media creative layouts">
      {/* Campaign */}
      {tile(
        0,
        <>
          <Bar x={8} y={10} w={30} h={6} o={1} fill={C.ink900} />
          <Bar x={8} y={20} w={22} h={6} o={1} fill={C.ink900} />
          <rect x="8" y="38" width="16" height="6" rx="3" fill={C.ink900} />
        </>,
        C.lime,
      )}
      {/* Product */}
      {tile(
        1,
        <>
          <rect x="6" y="6" width="40" height="26" rx="2" fill={C.ink600} />
          <circle cx="26" cy="19" r="8" stroke={C.cyan} />
          <Bar x={8} y={38} w={26} h={3} o={0.6} />
          <Bar x={8} y={44} w={18} h={3} o={0.25} />
        </>,
      )}
      {/* Testimonial (layout only) */}
      {tile(
        2,
        <>
          <path d="M10 12 q0 -4 4 -4 v4 h-4 v6 h6 v-6 M20 12 q0 -4 4 -4 v4 h-4 v6 h6 v-6" fill={C.lime} fillOpacity="0.9" />
          <Bar x={8} y={26} w={36} h={3} o={0.45} />
          <Bar x={8} y={32} w={30} h={3} o={0.3} />
          <circle cx="12" cy="44" r="4" fill={C.ink600} />
          <Bar x={20} y={42} w={16} h={3} o={0.35} />
        </>,
      )}
      {/* Carousel */}
      {tile(
        3,
        <>
          <rect x="10" y="8" width="32" height="28" rx="2" fill={C.ink600} />
          <path d="M6 22 l3 -3 v6 Z M46 22 l-3 -3 v6 Z" fill={C.fg} fillOpacity="0.6" />
          {[20, 26, 32].map((x, i) => (
            <circle key={x} cx={x} cy="44" r="1.8" fill={i === 0 ? C.lime : C.muted} fillOpacity={i === 0 ? 1 : 0.4} />
          ))}
        </>,
      )}
      {/* Infographic */}
      {tile(
        4,
        <>
          <circle cx="18" cy="22" r="10" stroke={C.lineSoft} strokeWidth="4" />
          <circle cx="18" cy="22" r="10" stroke={C.cyan} strokeWidth="4" pathLength={1} strokeDasharray="0.62 1" transform="rotate(-90 18 22)" />
          <circle cx="18" cy="22" r="10" stroke={C.lime} strokeWidth="4" pathLength={1} strokeDasharray="0.2 1" strokeDashoffset="-0.64" transform="rotate(-90 18 22)" />
          <Bar x={33} y={16} w={12} h={3} o={0.45} />
          <Bar x={33} y={24} w={9} h={3} o={0.25} />
          <Bar x={8} y={40} w={34} h={3} o={0.3} />
        </>,
      )}
      {/* Video */}
      {tile(
        5,
        <>
          <rect x="6" y="6" width="40" height="40" rx="2" fill={C.ink600} />
          <circle cx="26" cy="26" r="10" fill={C.ink900} fillOpacity="0.7" />
          <path d="M23 21 l8 5 l-8 5 Z" fill={C.lime} />
        </>,
      )}
    </Frame>
  );
}

function Collateral() {
  return (
    <Frame label="Illustration of print and event branding: banner, standee, poster and flyer">
      {/* Banner */}
      <g className={`${mv} group-hover/mock:-translate-y-[4px]`}>
        <rect x="40" y="10" width="164" height="22" rx="2" fill={C.ink700} stroke={C.line} />
        <rect x="40" y="10" width="40" height="22" rx="2" fill={C.lime} />
        <Bar x={88} y={17} w={60} h={5} o={0.8} />
        <Bar x={154} y={18} w={40} h={3} o={0.3} />
      </g>
      {/* Standee */}
      <g className={`${mv} group-hover/mock:-translate-x-[6px]`}>
        <rect x="44" y="40" width="42" height="98" rx="2" fill={C.ink800} stroke="rgb(245 247 250 / 0.45)" />
        <rect x="50" y="48" width="30" height="34" rx="1.5" fill={C.ink600} />
        <path d="M50 82 L62 66 L70 74 L80 62 V82 Z" fill={C.cyan} fillOpacity="0.4" />
        <Bar x={50} y={90} w={28} h={5} o={0.85} />
        <Bar x={50} y={99} w={20} h={3} o={0.35} />
        <rect x="50" y="122" width="30" height="6" rx="3" fill={C.lime} />
        <path d="M52 138 L46 148 M78 138 L84 148" stroke={C.line} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Poster */}
      <g className={`${mv} origin-center group-hover/mock:scale-[1.04]`}>
        <rect x="96" y="42" width="66" height="94" rx="2" fill={C.ink800} stroke="rgb(245 247 250 / 0.5)" />
        <circle cx="129" cy="76" r="22" stroke={C.lime} strokeWidth="1.5" />
        <circle cx="129" cy="76" r="12" fill={C.lime} fillOpacity="0.85" />
        <Bar x={104} y={108} w={44} h={6} o={0.9} />
        <Bar x={104} y={118} w={30} h={3} o={0.35} />
      </g>
      {/* Flyer */}
      <g className={`${mv} origin-bottom-left group-hover/mock:rotate-[10deg] group-hover/mock:translate-x-[4px]`}>
        <g transform="rotate(8 186 110)">
          <rect x="168" y="80" width="40" height="56" rx="2" fill={C.ink700} stroke={C.line} />
          <rect x="174" y="86" width="28" height="18" rx="1.5" fill={C.cyan} fillOpacity="0.35" />
          <Bar x={174} y={110} w={24} h={4} o={0.75} />
          <Bar x={174} y={118} w={18} h={3} o={0.3} />
        </g>
      </g>
    </Frame>
  );
}

const map: Record<MockupKind, () => React.JSX.Element> = {
  slides: Slides,
  profile: Profile,
  report: Report,
  proposal: Proposal,
  presentation: Presentation,
  brochure: Brochure,
  social: Social,
  collateral: Collateral,
};

export function Mockup({ kind, className = "" }: { kind: MockupKind; className?: string }) {
  const M = map[kind];
  return (
    <div className={className}>
      <M />
    </div>
  );
}
