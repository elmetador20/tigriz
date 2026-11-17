import Link from "next/link";
import { AT_PATHS } from "@/components/brand/AtMark";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { finalCta } from "@/content/contact";
import { Magnetic } from "@/motion/Magnetic";
import { RevealSection } from "@/motion/RevealSection";

/**
 * Brand-derived motion visual: the AT mark's lime swoosh repeated as
 * forward-moving echoes — momentum, the "next move".
 */
function SwooshEchoes() {
  const layers = [0, 1, 2, 3, 4, 5];
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.16),transparent)]" />
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="echo-grad" x1="29" y1="90" x2="88" y2="51" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#29b8d4" />
            <stop offset="1" stopColor="#b7f000" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="54" stroke="rgb(167 180 200 / 0.18)" strokeDasharray="0.6 3" className="origin-center animate-[spin_60s_linear_infinite] [transform-box:fill-box]" />
        <circle cx="60" cy="60" r="40" stroke="rgb(167 180 200 / 0.12)" />
        <path d="M6 60 H18 M102 60 H114 M60 6 V18 M60 102 V114" stroke="rgb(167 180 200 / 0.35)" strokeWidth="0.5" />
        <g transform="translate(-12 -22) scale(1.25)">
          {layers.map((i) => (
            <path
              key={i}
              d={AT_PATHS.swoosh}
              fill={i === layers.length - 1 ? "url(#echo-grad)" : "none"}
              stroke="url(#echo-grad)"
              strokeWidth={i === layers.length - 1 ? 0 : 0.35}
              opacity={0.18 + (i / layers.length) * 0.82}
              className="animate-[echo-drift_5s_var(--ease-in-out-quart)_infinite_alternate]"
              style={{ transform: `translate(${(i - 5) * 3.2}px, ${(5 - i) * 2.4}px)`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </g>
        <circle cx="96" cy="34" r="2.2" fill="#b7f000" className="node-pulse" />
      </svg>
    </div>
  );
}

export function FinalCta() {
  return (
    <RevealSection labelledBy="final-cta-heading" className="relative isolate overflow-hidden border-t border-line py-[var(--section-y)]">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_50%,black,transparent)]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="final-cta-heading" data-r="lines" className="font-display text-[clamp(2.4rem,8.5vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            <span className="block overflow-hidden pb-[0.07em]">
              <span data-r-line className="block text-fg">{finalCta.heading[0]}</span>
            </span>
            <span className="block overflow-hidden pb-[0.07em]">
              <span data-r-line className="block text-lime">{finalCta.heading[1]}</span>
            </span>
          </h2>
          <p data-r="up" className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">{finalCta.description}</p>
          <div data-r="up" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic className="w-full sm:w-auto">
              <Link
                href={finalCta.primary.href}
                className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium whitespace-nowrap text-ink-900 transition-shadow duration-500 hover:shadow-[0_0_50px_-6px_rgb(183_240_0/0.7)] sm:w-auto"
              >
                {finalCta.primary.label}
                <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                  <ArrowSwap className="size-4" />
                </span>
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                href={finalCta.secondary.href}
                className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full border border-line-strong pr-2 pl-7 font-medium whitespace-nowrap text-fg transition-colors duration-500 hover:border-fg/50 sm:w-auto"
              >
                {finalCta.secondary.label}
                <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                  <ArrowSwap className="size-4" />
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
        <div data-r="up" className="lg:col-span-5">
          <SwooshEchoes />
        </div>
      </div>
    </RevealSection>
  );
}
