import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachIntro } from "@/content/approach";

/** Path from a loose idea to a structured solution: wiggles settle into a straight line. */
export const JOURNEY_PATH =
  "M40 130 C80 40 120 210 170 110 C210 40 260 160 300 95 C350 40 400 170 450 115 C490 80 520 150 560 125 C620 95 660 135 700 115 C740 100 780 118 820 110 L1070 110";
const NODES = [
  [40, 130],
  [300, 95],
  [560, 125],
  [820, 110],
  [1110, 110],
] as const;

function Journey() {
  return (
    <div data-journey className="relative mt-14 lg:mt-20">
      <svg viewBox="0 0 1200 220" className="w-full overflow-visible" fill="none" aria-hidden>
        <defs>
          <linearGradient id="journey-grad" x1="40" y1="0" x2="1070" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a7b4c8" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#29b8d4" />
            <stop offset="1" stopColor="#b7f000" />
          </linearGradient>
        </defs>
        <path d={JOURNEY_PATH} stroke="rgb(167 180 200 / 0.12)" strokeWidth="1.5" />
        <g data-r="draw">
          <path data-journey-path d={JOURNEY_PATH} stroke="url(#journey-grad)" strokeWidth="2" strokeLinecap="round" pathLength={1} />
        </g>

        {/* Idea spark */}
        <g stroke="#a7b4c8" strokeOpacity="0.7" strokeLinecap="round">
          <path d="M40 104 V96 M40 164 V156 M14 130 H22 M58 130 H66 M22 112 l-5 -5 M58 112 l5 -5" />
        </g>

        {NODES.slice(0, 4).map(([x, y], i) => (
          <g key={x}>
            <circle cx={x} cy={y} r="11" fill="#061327" stroke={i === 0 ? "#a7b4c8" : i < 2 ? "#29b8d4" : "#b7f000"} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3.5" fill={i === 0 ? "#a7b4c8" : i < 2 ? "#29b8d4" : "#b7f000"} />
          </g>
        ))}

        {/* Structured solution block */}
        <g data-journey-solution>
          <rect x="1070" y="70" width="80" height="80" rx="12" fill="#102342" stroke="#b7f000" strokeWidth="1.5" />
          <path d="M1096.7 70 V150 M1123.3 70 V150 M1070 96.7 H1150 M1070 123.3 H1150" stroke="rgb(183 240 0 / 0.25)" />
          <rect x="1076" y="76" width="16" height="16" rx="3" fill="#b7f000" />
          <rect x="1102" y="102" width="16" height="16" rx="3" fill="#b7f000" fillOpacity="0.6" />
          <rect x="1128" y="128" width="16" height="16" rx="3" fill="#29b8d4" fillOpacity="0.7" />
        </g>

        <circle data-journey-dot cx="40" cy="130" r="5" fill="#b7f000" opacity="0" />
      </svg>

      {/* Labels (HTML for crisp text at any width) */}
      {approachIntro.journey.map((label, i) => (
        <span
          key={label}
          className="label-mono absolute -translate-x-1/2 text-[0.5rem] text-muted sm:text-[0.62rem]"
          style={{ left: `${(NODES[i][0] / 1200) * 100}%`, top: `${((NODES[i][1] + (i === 4 ? 56 : 30)) / 220) * 100}%` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function ApproachIntro() {
  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <SectionHeading
          className="lg:col-span-7"
          headingId="approach-heading"
          label={approachIntro.eyebrow}
          lines={[approachIntro.heading[0], { text: approachIntro.heading[1], tone: "lime" }]}
        />
        <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
          {approachIntro.description}
        </p>
      </div>
      <Journey />
    </div>
  );
}
