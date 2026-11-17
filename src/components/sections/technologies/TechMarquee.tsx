import { marquee } from "@/content/technologies";

function Separator({ i }: { i: number }) {
  // Alternating small technical symbols
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" aria-hidden>
      {i % 3 === 0 && <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="#b7f000" />}
      {i % 3 === 1 && <path d="M8 2 V14 M2 8 H14" stroke="#29b8d4" />}
      {i % 3 === 2 && <circle cx="8" cy="8" r="3" fill="#b7f000" />}
    </svg>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marquee.map((m, i) => (
        <li key={m} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span className="font-mono text-sm tracking-[0.28em] whitespace-nowrap text-fg/80 uppercase sm:text-base">{m}</span>
          <Separator i={i} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuous capability marquee. Two identical rows translate by -50%
 * for a seamless loop; hover/focus pauses it, reduced motion stops it.
 * Only the first row is exposed to assistive tech.
 */
export function TechMarquee() {
  return (
    <div
      role="region"
      aria-label="Technology capabilities"
      className="group relative overflow-hidden border-y border-line bg-ink-950/60 py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
