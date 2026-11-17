/**
 * Custom capability icons. Hover animation is driven by the nearest
 * `group/hc` ancestor (the hero capability card).
 */

const fill = "[transform-box:fill-box] transition-transform duration-500 ease-out-expo";

/** Presentation slide in front of a document; bars grow, document fans out on hover. */
export function ConsultancyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={className}>
      {/* Document behind */}
      <g className={`${fill} origin-bottom-left group-hover/hc:-translate-x-[2px] group-hover/hc:-translate-y-[2px] group-hover/hc:-rotate-6`}>
        <rect x="12" y="5" width="22" height="27" rx="2.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M17 11h12M17 15h8" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Slide */}
      <rect x="6" y="13" width="28" height="20" rx="2.5" fill="#0b1b35" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="23" width="3.5" height="6" rx="0.75" className={`${fill} origin-bottom fill-[var(--icon-accent)] group-hover/hc:scale-y-[1.35]`} />
      <rect x="17.25" y="20" width="3.5" height="9" rx="0.75" className={`${fill} origin-bottom fill-[var(--icon-accent)] delay-75 group-hover/hc:scale-y-[1.2]`} />
      <rect x="23.5" y="17" width="3.5" height="12" rx="0.75" className={`${fill} origin-bottom fill-[var(--icon-accent)] delay-150 group-hover/hc:scale-y-[1.12]`} />
      {/* Stand */}
      <path d="M20 33v5M15 39h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Processor with circuit traces; core rotates and traces start flowing on hover. */
export function TechnologyIcon({ className = "" }: { className?: string }) {
  const pins = [14, 22, 30];
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={className}>
      {/* Pins */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="transition-colors duration-500 group-hover/hc:stroke-[var(--icon-accent)]">
        {pins.map((p) => (
          <g key={p}>
            <path d={`M${p} 6v4M${p} 34v4M6 ${p}h4M34 ${p}h4`} />
          </g>
        ))}
      </g>
      {/* Package */}
      <rect x="10" y="10" width="24" height="24" rx="3.5" fill="#0b1b35" stroke="currentColor" strokeWidth="1.5" />
      {/* Traces */}
      <path
        d="M16 17h5l3 3v7"
        stroke="var(--icon-accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeOpacity="0.8"
        className="[stroke-dasharray:3_3] group-hover/hc:animate-[dashflow_1.2s_linear_infinite]"
      />
      {/* Core */}
      <rect
        x="17.5"
        y="17.5"
        width="9"
        height="9"
        rx="1.5"
        className={`${fill} origin-center fill-[var(--icon-accent)] group-hover/hc:rotate-45 group-hover/hc:scale-90`}
        fillOpacity="0.9"
      />
    </svg>
  );
}
