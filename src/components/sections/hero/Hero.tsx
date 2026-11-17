import Link from "next/link";
import { HeroWave } from "@/components/visuals/HeroWave";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { Magnetic } from "@/motion/Magnetic";
import { brand, hero, process } from "@/content/site";
import { HeroCards } from "./HeroCards";
import { HeroMotion } from "./HeroMotion";
import { HeroVisual } from "./HeroVisual";

/**
 * Layout (lg+):  [ text  (7) ][ visual (5, spans 2 rows) ]
 *                [ cards (7) ][                           ]
 * Below lg the DOM order applies: text → visual → cards.
 */
export function Hero() {
  return (
    <HeroMotion id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[72px]">
      {/* ---------- Background ---------- */}
      <div aria-hidden data-hero-bg className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,#0b1b35_0%,#061327_55%)]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_65%_40%,black,transparent)]" />
        <div className="absolute top-[-10%] left-[-10%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.07),transparent)]" />
        <div data-hero-wave className="absolute inset-x-0 bottom-0 h-[62%] lg:h-[78%]">
          <HeroWave className="size-full" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="container-x relative grid flex-1 grid-cols-1 content-center gap-y-12 pt-10 pb-8 sm:pt-14 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8 lg:pt-2">
        <div data-hero-parallax className="lg:col-span-7 lg:row-start-1 lg:self-end">
          <p data-hero-label className="label-mono flex items-center gap-4 text-muted">
            <span data-hero-label-line className="h-px w-10 origin-left bg-lime" />
            {hero.label}
          </p>

          <h1 className="mt-6 font-display lg:mt-5 text-[clamp(3.5rem,min(12.5vw,11svh),9.25rem)] leading-[0.9] font-medium tracking-[-0.045em] sm:mt-7">
            {brand.tagline.map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.07em]">
                <span data-hero-word className={`block will-change-transform ${i === 2 ? "text-lime" : "text-fg"}`}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-copy className="mt-6 max-w-[32rem] text-lg leading-relaxed text-pretty text-muted sm:mt-7 sm:text-xl lg:mt-5 lg:text-lg">
            {brand.statement}
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div data-hero-cta>
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href={hero.primaryCta.href}
                  className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium whitespace-nowrap text-ink-900 transition-shadow duration-500 hover:shadow-[0_0_44px_-8px_rgb(183_240_0/0.65)] sm:w-auto"
                >
                  {hero.primaryCta.label}
                  <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                    <ArrowSwap direction="down" className="size-4" />
                  </span>
                </Link>
              </Magnetic>
            </div>
            <div data-hero-cta>
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href={hero.secondaryCta.href}
                  className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full border border-line-strong bg-ink-900/40 pr-2 pl-7 font-medium whitespace-nowrap text-fg backdrop-blur-sm transition-colors duration-500 hover:border-fg/50 sm:w-auto"
                >
                  {hero.secondaryCta.label}
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                    <ArrowSwap className="size-4" />
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div
          data-hero-visual-wrap
          className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center"
        >
          <HeroVisual />
        </div>

        <div className="lg:col-span-7 lg:row-start-2">
          <HeroCards />
        </div>
      </div>

      {/* ---------- Bottom bar: scroll indicator + approach ---------- */}
      <div className="container-x relative pb-6 sm:pb-8 lg:pb-5">
        <div className="flex items-center justify-between gap-6 border-t border-line pt-5 lg:pt-4">
          <a
            href="#explore"
            data-hero-scroll
            className="group label-mono inline-flex items-center gap-3 text-[0.65rem] text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden className="relative h-9 w-[22px] overflow-hidden rounded-full border border-line-strong">
              <span className="absolute top-2 left-1/2 h-2 w-px -translate-x-1/2 animate-[scrollcue_2.2s_var(--ease-in-out-quart)_infinite] bg-lime" />
            </span>
            Scroll to explore
          </a>
          <ol aria-label="Our approach" className="hidden items-center gap-3 lg:flex">
            {process.map((step, i) => (
              <li key={step} data-hero-step className="label-mono flex items-center gap-3 text-[0.62rem] text-subtle">
                <span className="text-fg/80">{step}</span>
                {i < process.length - 1 && <span aria-hidden className="h-px w-5 bg-line-strong" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </HeroMotion>
  );
}
