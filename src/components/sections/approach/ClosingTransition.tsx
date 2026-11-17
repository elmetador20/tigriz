import Link from "next/link";
import { AT_PATHS, AT_VIEWBOX } from "@/components/brand/AtMark";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { Magnetic } from "@/motion/Magnetic";
import { closing } from "@/content/approach";

/** Full-width brand moment that hands over to the contact module. */
export function ClosingTransition() {
  return (
    <section aria-labelledby="closing-heading" className="relative isolate overflow-hidden border-y border-line bg-ink-950/60 py-[var(--section-y)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_80%_50%,black,transparent)]" />
        <div className="absolute top-1/2 right-[-10%] h-[90%] w-[60%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.10),transparent)]" />
        {/* Outlined AT mark, drawn on scroll */}
        <svg data-parallax viewBox={AT_VIEWBOX} className="absolute top-1/2 right-[-6%] w-[70%] max-w-[900px] -translate-y-1/2 opacity-60 sm:right-[-2%] sm:w-[52%]" fill="none">
          <g data-r="draw" stroke="#b7f000" strokeWidth="0.35" strokeLinejoin="round">
            {Object.values(AT_PATHS).map((d) => (
              <path key={d} d={d} pathLength={1} />
            ))}
          </g>
          <path d={AT_PATHS.swoosh} fill="#b7f000" fillOpacity="0.12" />
        </svg>
        {/* Horizon */}
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent" />
      </div>

      <div className="container-x">
        <div className="max-w-4xl">
          <p data-r="left" className="label-mono flex items-center gap-4 text-lime">
            <span className="h-px w-10 bg-lime" />
            Next step
          </p>
          <h2 id="closing-heading" data-r="lines" className="mt-6 font-display text-[clamp(2.4rem,6.4vw,5.75rem)] leading-[0.96] font-medium tracking-[-0.045em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-r-line className="block text-fg">{closing.heading[0]}</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-r-line className="block text-lime">{closing.heading[1]}</span>
            </span>
          </h2>
          <p data-r="up" className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">{closing.description}</p>
          <div data-r="up" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic className="w-full sm:w-auto">
              <Link
                href={closing.primary.href}
                className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium whitespace-nowrap text-ink-900 transition-shadow duration-500 hover:shadow-[0_0_50px_-6px_rgb(183_240_0/0.7)] sm:w-auto"
              >
                {closing.primary.label}
                <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                  <ArrowSwap className="size-4" />
                </span>
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                href={closing.secondary.href}
                className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full border border-line-strong bg-ink-900/50 pr-2 pl-7 font-medium whitespace-nowrap text-fg backdrop-blur-sm transition-colors duration-500 hover:border-fg/50 sm:w-auto"
              >
                {closing.secondary.label}
                <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                  <ArrowSwap className="size-4" />
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
