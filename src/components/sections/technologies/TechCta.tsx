import Link from "next/link";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { HeroWave } from "@/components/visuals/HeroWave";
import { Magnetic } from "@/motion/Magnetic";
import { techCta } from "@/content/technologies";

/** Abstract connected nodes behind the closing statement. */
function Nodes() {
  const pts: [number, number][] = [
    [80, 120], [220, 60], [380, 140], [540, 70], [700, 150], [860, 90], [1020, 160], [1140, 70],
    [140, 260], [460, 250], [780, 270], [1080, 250],
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [2, 9], [4, 10], [6, 11], [9, 10], [8, 9], [10, 11]];
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none" aria-hidden>
      <g data-r="draw" stroke="rgb(167 180 200 / 0.18)">
        {links.map(([a, b]) => (
          <path key={`${a}-${b}`} d={`M${pts[a][0]} ${pts[a][1]} L${pts[b][0]} ${pts[b][1]}`} pathLength={1} />
        ))}
      </g>
      <g stroke="#b7f000" strokeOpacity="0.5">
        <path className="flow-line" d={`M${pts[2][0]} ${pts[2][1]} L${pts[3][0]} ${pts[3][1]} L${pts[4][0]} ${pts[4][1]}`} />
        <path className="flow-line" d={`M${pts[9][0]} ${pts[9][1]} L${pts[10][0]} ${pts[10][1]}`} />
      </g>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill={i % 4 === 1 ? "#29b8d4" : "#b7f000"} className="node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          <circle cx={x} cy={y} r="3.5" fill="#061327" stroke={i % 4 === 1 ? "#29b8d4" : "#b7f000"} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

export function TechCta() {
  return (
    <section aria-labelledby="tech-cta-heading" className="relative isolate overflow-hidden py-[calc(var(--section-y)*1.1)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[55%] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <Nodes />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[70%] opacity-90">
          <HeroWave className="size-full" fadeLeft={false} horizon={0.3} vanishX={0.5} />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.13),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container-x text-center">
        <h2
          id="tech-cta-heading"
          data-r="lines"
          className="mx-auto max-w-5xl font-display text-[clamp(2.4rem,7vw,6.25rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-r-line className="block text-fg">{techCta.heading[0]}</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-r-line className="block text-lime">{techCta.heading[1]}</span>
          </span>
        </h2>
        <p data-r="up" className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
          {techCta.description}
        </p>
        <div data-r="up" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Magnetic className="w-full sm:w-auto">
            <Link
              href={techCta.primary.href}
              className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium tracking-[0.06em] whitespace-nowrap text-ink-900 uppercase transition-shadow duration-500 hover:shadow-[0_0_50px_-6px_rgb(183_240_0/0.7)] sm:w-auto"
            >
              {techCta.primary.label}
              <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                <ArrowSwap className="size-4" />
              </span>
            </Link>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <Link
              href={techCta.secondary.href}
              className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full border border-line-strong bg-ink-900/50 pr-2 pl-7 font-medium tracking-[0.06em] whitespace-nowrap text-fg uppercase backdrop-blur-sm transition-colors duration-500 hover:border-fg/50 sm:w-auto"
            >
              {techCta.secondary.label}
              <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                <ArrowSwap className="size-4" />
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
