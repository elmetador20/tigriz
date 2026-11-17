import type { MockupKind } from "@/content/consultancy";

/**
 * Custom 24px line icons for the eight consultancy services.
 * Hover motion is driven by the nearest `group/svc` ancestor.
 */
const mv = "[transform-box:fill-box] transition-transform duration-500 ease-out-expo";
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
  "aria-hidden": true,
};

const icons: Record<MockupKind, () => React.JSX.Element> = {
  // Easel with rising trend
  slides: () => (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v4M8.5 20h7" />
      <path d="M6.5 12.5l3-3 2.5 2 5-4.5" className={`${mv} group-hover/svc:-translate-y-[1.5px]`} stroke="var(--color-lime)" />
    </svg>
  ),
  // Document with profile block
  profile: () => (
    <svg {...base}>
      <path d="M6 3h9l3 3v15H6z" />
      <circle cx="12" cy="10" r="2.5" className={`${mv} origin-center group-hover/svc:scale-125`} stroke="var(--color-lime)" />
      <path d="M8.5 16.5c.8-1.6 2-2.3 3.5-2.3s2.7.7 3.5 2.3" />
    </svg>
  ),
  // Report with bars
  report: () => (
    <svg {...base}>
      <path d="M5 3h10l4 4v14H5z" />
      <path d="M9 17v-3M12 17v-5M15 17v-7" className={`${mv} origin-bottom group-hover/svc:scale-y-110`} stroke="var(--color-lime)" />
    </svg>
  ),
  // Proposal with signature
  proposal: () => (
    <svg {...base}>
      <path d="M5 3h10l4 4v14H5z" />
      <path d="M8 9h7M8 12h5" />
      <path
        d="M8 17.5c1-1.6 2-1.6 2.2-.3s1.4.8 2.2-.6 1.6-.6 2.6.4"
        stroke="var(--color-lime)"
        pathLength={1}
        strokeDasharray="1"
        className="group-hover/svc:animate-[redraw_0.8s_var(--ease-out-expo)]"
      />
    </svg>
  ),
  // Screen with play
  presentation: () => (
    <svg {...base}>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="M10.5 8.5l4 2-4 2z" fill="var(--color-lime)" stroke="var(--color-lime)" className={`${mv} origin-center group-hover/svc:scale-125`} />
    </svg>
  ),
  // Tri-fold
  brochure: () => (
    <svg {...base}>
      <path d="M3 6l6-2v16l-6 2zM9 4l6 2v16l-6-2zM15 6l6-2v16l-6 2z" />
      <path d="M11 9.5h2" stroke="var(--color-lime)" className={`${mv} group-hover/svc:translate-y-[2px]`} />
    </svg>
  ),
  // Social grid + spark
  social: () => (
    <svg {...base}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" className={`${mv} group-hover/svc:translate-x-[1px] group-hover/svc:-translate-y-[1px]`} stroke="var(--color-lime)" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  ),
  // Standee / roll-up
  collateral: () => (
    <svg {...base}>
      <rect x="7" y="2.5" width="10" height="16" rx="1" />
      <path d="M9 21.5l1.5-3M15 21.5l-1.5-3" />
      <path d="M9.5 6h5M9.5 9h3" stroke="var(--color-lime)" className={`${mv} group-hover/svc:translate-x-[1.5px]`} />
    </svg>
  ),
};

export function ServiceIcon({ kind, className = "" }: { kind: MockupKind; className?: string }) {
  const I = icons[kind];
  return (
    <span className={`inline-block ${className}`}>
      <I />
    </span>
  );
}
