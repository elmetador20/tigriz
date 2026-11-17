import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { HubDiagram } from "@/components/visuals/HubDiagram";
import { Magnetic } from "@/motion/Magnetic";
import { techIntro } from "@/content/technologies";

/** Small floating interface panels around the ecosystem (decorative, lg+). */
function FloatingPanels() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* API status */}
      <div data-float="0.7" className="absolute top-[6%] left-[-4%] w-44 rounded-xl border border-line bg-ink-800/85 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.58rem] tracking-[0.2em] text-muted uppercase">API</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.15em] text-lime uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-lime" /> Connected
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {[80, 62, 72].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-cyan" />
              <span className="h-[5px] rounded-full bg-fg/20" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
      {/* Code */}
      <div data-float="1" className="absolute top-[2%] right-[-2%] w-40 rounded-xl border border-line bg-ink-900/85 p-3 backdrop-blur-md">
        <div className="mb-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-fg/20" />
          ))}
        </div>
        {[
          ["bg-cyan/80 w-6", "bg-lime/90 w-12"],
          ["bg-fg/30 w-4 ml-3", "bg-fg/50 w-14"],
          ["bg-fg/30 w-4 ml-3", "bg-lime/50 w-10"],
          ["bg-fg/20 w-3"],
        ].map((row, i) => (
          <div key={i} className="mt-1.5 flex gap-1.5">
            {row.map((c, j) => (
              <span key={j} className={`h-[5px] rounded-full ${c}`} />
            ))}
          </div>
        ))}
      </div>
      {/* Throughput sparkline */}
      <div data-float="0.85" className="absolute right-[-6%] bottom-[16%] w-44 rounded-xl border border-line bg-ink-800/85 p-3 backdrop-blur-md">
        <span className="font-mono text-[0.58rem] tracking-[0.2em] text-muted uppercase">Data flow</span>
        <svg viewBox="0 0 120 36" className="mt-2 w-full" fill="none">
          <path d="M0 30 L18 24 L34 27 L52 16 L70 19 L88 9 L104 12 L120 4" stroke="#29b8d4" strokeWidth="1.5" className="flow-line" />
          <path d="M0 30 L18 24 L34 27 L52 16 L70 19 L88 9 L104 12 L120 4 V36 H0Z" fill="#29b8d4" fillOpacity="0.1" />
        </svg>
      </div>
      {/* Geometry */}
      <svg data-float="0.4" viewBox="0 0 100 100" className="absolute bottom-[4%] left-[2%] w-28 opacity-60" fill="none">
        <polygon points="50,6 92,30 92,70 50,94 8,70 8,30" stroke="rgb(167 180 200 / 0.4)" />
        <polygon points="50,24 76,39 76,61 50,76 24,61 24,39" stroke="#b7f000" strokeOpacity="0.6" />
        <circle cx="50" cy="50" r="3" fill="#b7f000" />
      </svg>
    </div>
  );
}

export function TechIntro() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <SectionHeading
          headingId="technologies-heading"
          label={techIntro.eyebrow}
          lines={[techIntro.heading[0], { text: techIntro.heading[1], tone: "muted" }]}
        />
        <p data-r="up" className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
          {techIntro.description}
        </p>
        <div data-r="up" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Magnetic className="w-full sm:w-auto">
            <Link
              href={techIntro.primaryCta.href}
              className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-lime pr-2 pl-7 font-medium whitespace-nowrap text-ink-900 transition-shadow duration-500 hover:shadow-[0_0_44px_-8px_rgb(183_240_0/0.65)] sm:w-auto"
            >
              {techIntro.primaryCta.label}
              <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                <ArrowSwap direction="down" className="size-4" />
              </span>
            </Link>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <Link
              href={techIntro.secondaryCta.href}
              className="group inline-flex h-14 w-full items-center justify-between gap-6 rounded-full border border-line-strong pr-2 pl-7 font-medium whitespace-nowrap text-fg transition-colors duration-500 hover:border-fg/50 sm:w-auto"
            >
              {techIntro.secondaryCta.label}
              <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                <ArrowSwap className="size-4" />
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>

      <div data-parallax className="relative lg:col-span-7">
        <FloatingPanels />
        <HubDiagram
          center={techIntro.ecosystem.center}
          idle={techIntro.ecosystem.idle}
          nodes={techIntro.ecosystem.nodes}
          className="relative mx-auto max-w-[600px]"
        />
      </div>
    </div>
  );
}
