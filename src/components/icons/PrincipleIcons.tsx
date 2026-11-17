import type { PrincipleIcon as Kind } from "@/content/site";

/**
 * Custom lime line icons for the About principles. Hover motion is
 * driven by the nearest `group/pc` ancestor (the principle card).
 */
const box = "[transform-box:fill-box] transition-transform duration-700 ease-out-expo";
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
};

function Target() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...common}>
      <circle cx="22" cy="26" r="16" strokeOpacity="0.35" className={`${box} origin-center group-hover/pc:scale-105`} />
      <circle cx="22" cy="26" r="10" strokeOpacity="0.65" />
      <circle cx="22" cy="26" r="3.5" fill="currentColor" />
      {/* Arrow: flies in to the centre on hover */}
      <g className={`${box} translate-x-[3px] -translate-y-[3px] group-hover/pc:translate-x-0 group-hover/pc:translate-y-0`}>
        <path d="M22 26 L40 8" />
        <path d="M35 7 L41 7 L41 13" />
        <path d="M37 11 L41 7" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}

function Layers() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...common}>
      <path d="M24 34 L42 26 L24 18 L6 26 Z" strokeOpacity="0.4" className={`${box} group-hover/pc:translate-y-[4px]`} />
      <path d="M24 28 L42 20 L24 12 L6 20 Z" strokeOpacity="0.7" fill="#102342" />
      <path d="M24 22 L42 14 L24 6 L6 14 Z" fill="#102342" className={`${box} group-hover/pc:-translate-y-[4px]`} />
      <path d="M24 34 V42" strokeOpacity="0.45" strokeDasharray="2 3" />
    </svg>
  );
}

function Execution() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...common}>
      <circle cx="24" cy="24" r="17" strokeOpacity="0.3" />
      {/* Progress arc completes on hover */}
      <circle
        cx="24"
        cy="24"
        r="17"
        pathLength={1}
        strokeDasharray="1"
        className="[stroke-dashoffset:0.3] transition-[stroke-dashoffset] duration-700 ease-out-expo group-hover/pc:[stroke-dashoffset:0]"
        transform="rotate(-90 24 24)"
      />
      <path d="M16 24.5 L21.5 30 L32.5 18.5" strokeWidth="2.2" pathLength={1} strokeDasharray="1" className="group-hover/pc:animate-[redraw_0.7s_var(--ease-out-expo)]" />
    </svg>
  );
}

function Growth() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...common}>
      <path d="M6 42 H42" strokeOpacity="0.35" />
      <g strokeOpacity="0.55">
        <path d="M11 42 V34" className={`${box} origin-bottom group-hover/pc:scale-y-110`} />
        <path d="M19 42 V30" className={`${box} origin-bottom delay-75 group-hover/pc:scale-y-110`} />
        <path d="M27 42 V25" className={`${box} origin-bottom delay-150 group-hover/pc:scale-y-110`} />
        <path d="M35 42 V19" className={`${box} origin-bottom delay-200 group-hover/pc:scale-y-110`} />
      </g>
      <g className={`${box} group-hover/pc:translate-x-[2px] group-hover/pc:-translate-y-[2px]`}>
        <path d="M8 30 L18 21 L25 26 L40 10" strokeWidth="2" pathLength={1} strokeDasharray="1" className="group-hover/pc:animate-[redraw_0.8s_var(--ease-out-expo)]" />
        <path d="M33 9.5 L40.5 9.5 L40.5 17" strokeWidth="2" />
      </g>
    </svg>
  );
}

const map: Record<Kind, () => React.JSX.Element> = { target: Target, layers: Layers, execution: Execution, growth: Growth };

export function PrincipleIcon({ kind, className = "" }: { kind: Kind; className?: string }) {
  const Icon = map[kind];
  return (
    <span className={`inline-block text-lime ${className}`}>
      <Icon />
    </span>
  );
}
