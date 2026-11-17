import { platforms } from "@/content/technologies";

/** Fictional interface mockups (no real brands, products or clients). */
const b = (w: string, c = "bg-fg/20", h = "h-[5px]") => <span className={`block ${h} rounded-full ${c}`} style={{ width: w }} />;

function DesktopDashboard() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-900 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-ink-800 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-fg/20" />
        ))}
        <span className="ml-3 h-3.5 flex-1 rounded-md bg-ink-900/80" />
      </div>
      <div className="grid grid-cols-[18%_1fr] gap-0">
        <div className="space-y-2.5 border-r border-line p-3">
          <span className="block h-2.5 w-8 rounded bg-lime/80" />
          {[70, 55, 80, 60].map((w, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-sm ${i === 0 ? "bg-lime" : "bg-fg/25"}`} />
              {b(`${w}%`)}
            </span>
          ))}
        </div>
        <div className="space-y-2.5 p-3">
          {b("35%", "bg-fg/60", "h-[7px]")}
          <div className="grid grid-cols-3 gap-2">
            {["from-lime/70", "from-cyan/60", "from-fg/30"].map((c) => (
              <div key={c} className="rounded-md border border-line bg-ink-800 p-2">
                {b("60%", "bg-fg/25", "h-[4px]")}
                <span className={`mt-2 block h-6 rounded bg-gradient-to-r ${c} to-transparent`} />
              </div>
            ))}
          </div>
          <div className="h-16 rounded-md border border-line bg-ink-800 p-2">
            <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="size-full" fill="none">
              <path d="M0 42 C30 38 50 22 80 26 S130 12 160 14 S190 6 200 4" stroke="#b7f000" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletWeb() {
  return (
    <div className="overflow-hidden rounded-[1.1rem] border-2 border-fg/20 bg-ink-900 p-2 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85)]">
      <div className="space-y-2 rounded-lg bg-ink-800 p-2.5">
        <div className="flex items-center justify-between">
          <span className="h-2 w-8 rounded bg-lime/80" />
          <span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-1 w-3 rounded bg-fg/30" />)}</span>
        </div>
        <div className="h-14 rounded-md bg-gradient-to-br from-cyan/50 via-ink-600 to-lime/40" />
        {b("70%", "bg-fg/60", "h-[6px]")}
        {b("50%", "bg-fg/20", "h-[4px]")}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {[0, 1].map((i) => (
            <span key={i} className="h-8 rounded-md border border-line bg-ink-900/60" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneApp() {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border-2 border-fg/25 bg-ink-900 p-1.5 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.9)]">
      <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-fg/20" />
      <div className="space-y-2 rounded-[1rem] bg-ink-800 p-2.5">
        {b("50%", "bg-fg/70", "h-[6px]")}
        <div className="flex items-center gap-2 rounded-lg bg-lime/90 p-2">
          <span className="size-4 rounded-full bg-ink-900/70" />
          {b("60%", "bg-ink-900/60", "h-[4px]")}
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-line p-1.5">
            <span className="size-4 rounded bg-ink-600" />
            {b(`${70 - i * 12}%`, "bg-fg/30", "h-[4px]")}
          </div>
        ))}
        <div className="flex justify-around border-t border-line pt-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`size-1.5 rounded-sm ${i === 0 ? "bg-lime" : "bg-fg/25"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Storefront() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-900 p-3 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between">
        {b("28%", "bg-fg/60", "h-[6px]")}
        <span className="flex items-center gap-1.5 rounded-full border border-line-strong px-2 py-0.5">
          <span className="size-2 rounded-sm border border-lime" />
          <span className="h-1 w-3 rounded bg-lime" />
        </span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {["from-lime/60", "from-cyan/60", "from-fg/40"].map((c, i) => (
          <div key={c} className="rounded-lg border border-line bg-ink-800 p-1.5">
            <span className={`block aspect-square rounded-md bg-gradient-to-br ${c} to-ink-600`} />
            <span className="mt-1.5 block">{b("75%", "bg-fg/40", "h-[4px]")}</span>
            <span className="mt-1 flex items-center justify-between">
              {b("35%", i === 0 ? "bg-lime/80" : "bg-fg/25", "h-[4px]")}
              <span className="size-3 rounded-full border border-line-strong" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Floating collection of fictional product interfaces. */
export function PlatformShowcase() {
  return (
    <figure className="relative">
      <div className="relative mx-auto aspect-[4/3.4] w-full max-w-[760px] sm:aspect-[16/11]">
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.12),transparent)]" />
        <div data-float="0.6" className="absolute top-[2%] left-[0%] w-[66%]">
          <DesktopDashboard />
        </div>
        <div data-float="1" className="absolute top-[10%] right-[0%] w-[30%]">
          <TabletWeb />
        </div>
        <div data-float="1.2" className="absolute bottom-[0%] left-[8%] w-[22%] min-w-[96px]">
          <PhoneApp />
        </div>
        <div data-float="0.8" className="absolute right-[2%] bottom-[4%] w-[52%]">
          <Storefront />
        </div>
        {/* Tags */}
        {[
          ["Dashboard", "top-[0%] left-[52%]"],
          ["Mobile app", "bottom-[34%] left-[0%]"],
          ["Storefront", "bottom-[0%] right-[44%]"],
        ].map(([t, pos]) => (
          <span key={t} data-float="0.4" aria-hidden className={`label-mono absolute ${pos} hidden items-center gap-2 rounded-full border border-line bg-ink-900/80 px-2.5 py-1 text-[0.55rem] text-muted backdrop-blur sm:flex`}>
            <span className="size-1.5 bg-lime" />
            {t}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">{platforms.note}</figcaption>
    </figure>
  );
}
