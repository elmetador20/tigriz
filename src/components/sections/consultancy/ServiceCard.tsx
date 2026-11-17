import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { Mockup } from "@/components/visuals/mockups/DocumentMockups";
import type { services } from "@/content/consultancy";

type Service = (typeof services)[number];

/**
 * One consultancy service. Three treatments keep the grid from repeating:
 *  - "mockup":  framed document mockup leads, text below
 *  - "type":    oversized title leads, mockup tucked into the corner
 *  - "graphic": full-bleed illustration with coloured light, text below
 * Motion hooks: [data-svc-card] (glow + tilt), [data-svc-tilt], [data-svc-visual].
 */
export function ServiceCard({ s }: { s: Service }) {
  const accent = Number(s.number) % 2 ? "lime" : "cyan";

  return (
    <a
      href={s.href}
      data-svc-card
      className="group/svc group/mock group relative block h-full rounded-[20px] transition-[translate] duration-700 ease-out-expo hover:-translate-y-1.5 focus-visible:-translate-y-1.5 [perspective:1100px]"
    >
      <div
        data-svc-tilt
        className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-ink-700/90 to-ink-800/90 transition-[border-color,box-shadow] duration-700 group-hover/svc:border-lime/40 group-hover/svc:shadow-[0_30px_60px_-30px_rgb(183_240_0/0.35)] [transform-style:preserve-3d]"
      >
        {/* Cursor-following glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/svc:opacity-100 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,30%),rgb(183_240_0/0.09),transparent_60%)]"
        />
        {/* Faded number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[8.5rem] leading-none font-semibold tracking-tighter text-fg/[0.04] transition-colors duration-700 select-none group-hover/svc:text-lime/[0.08]"
        >
          {s.number}
        </span>

        <header className="relative z-[1] flex items-center justify-between p-5 pb-0 sm:p-6 sm:pb-0">
          <span className="font-mono text-xs tracking-[0.22em] text-lime">{s.number}</span>
          <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-ink-900/50 text-fg transition-colors duration-500 group-hover/svc:border-lime/40">
            <ServiceIcon kind={s.visual} className="size-5" />
          </span>
        </header>

        {s.treatment === "mockup" && (
          <div className="relative z-[1] mx-5 mt-5 overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_90%_at_50%_0%,#173058,#0b1b35_70%)] sm:mx-6">
            <div data-svc-visual className="px-5 pt-5 pb-3">
              <Mockup kind={s.visual} className="mx-auto w-full max-w-[17rem]" />
            </div>
          </div>
        )}

        {s.treatment === "graphic" && (
          <div className="relative z-0 -mt-2 h-[13.5rem] overflow-hidden">
            <div
              className={`absolute inset-x-8 top-6 h-32 rounded-full blur-2xl ${accent === "lime" ? "bg-lime/15" : "bg-cyan/20"}`}
            />
            <div data-svc-visual className="absolute inset-x-0 top-2 flex justify-center">
              <Mockup kind={s.visual} className="w-[112%] max-w-[22rem] -rotate-2" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-800 to-transparent" />
          </div>
        )}

        {s.treatment === "type" && (
          <div className="relative z-[1] px-5 pt-7 sm:px-6">
            <h3 className="font-display text-[clamp(1.9rem,2.4vw,2.35rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-fg">
              {s.title}
            </h3>
          </div>
        )}

        <div className="relative z-[1] flex flex-1 flex-col p-5 pt-5 sm:p-6 sm:pt-5">
          {s.treatment !== "type" && (
            <h3 className="font-display text-xl leading-tight font-medium tracking-[-0.01em] text-balance text-fg">{s.title}</h3>
          )}
          <p className="mt-3 max-w-[32ch] text-[0.92rem] leading-relaxed text-pretty text-muted">{s.description}</p>

          {s.treatment === "type" && (
            <div data-svc-visual className="pointer-events-none mt-4 -mr-10 ml-auto w-[78%] opacity-60 transition-opacity duration-700 group-hover/svc:opacity-95">
              <Mockup kind={s.visual} />
            </div>
          )}

          <span className="mt-auto inline-flex items-center gap-3 pt-6 text-sm font-medium text-fg">
            <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover/svc:border-transparent group-hover/svc:bg-lime group-hover/svc:text-ink-900">
              <ArrowSwap className="size-3.5" />
            </span>
            <span className="relative">
              Explore service
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/svc:scale-x-100" />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
