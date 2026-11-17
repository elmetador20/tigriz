import { SectionHeading } from "@/components/ui/SectionHeading";
import { why } from "@/content/approach";

const mv = "[transform-box:fill-box] transition-transform duration-700 ease-out-expo";
const [i1, i2, i3, i4, i5] = why.items;

function Rule() {
  return <span aria-hidden data-why-rule className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-lime/70 via-line-strong to-transparent" />;
}

function Copy({ item, className = "" }: { item: (typeof why.items)[number]; className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-xs tracking-[0.22em] text-lime">{item.number}</p>
      <h3 className="mt-3 font-display text-2xl leading-tight font-medium tracking-[-0.01em] text-fg sm:text-[1.7rem]">{item.title}</h3>
      <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-pretty text-muted">{item.description}</p>
    </div>
  );
}

/** Five differentiators, each with its own composition and hover illustration. */
export function WhyTigriz() {
  return (
    <div>
      <SectionHeading headingId="why-heading" label={why.eyebrow} lines={[why.heading[0], { text: why.heading[1], tone: "lime" }]} />

      <div data-r="stagger" className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
        {/* 01 — editorial row with a target that locks on */}
        <article data-r-item className="group relative overflow-hidden rounded-[24px] border border-line bg-ink-800/60 p-6 sm:p-8 md:col-span-2 lg:col-span-7">
          <Rule />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <span aria-hidden className="font-display text-[6.5rem] leading-none font-semibold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(167_180_200/0.35)] sm:text-[8rem]">
              {i1.number}
            </span>
            <Copy item={i1} className="flex-1" />
            <svg viewBox="0 0 120 120" className="hidden w-28 shrink-0 md:block" fill="none" aria-hidden>
              <g className={`${mv} origin-center group-hover:rotate-90`}>
                <circle cx="60" cy="60" r="50" stroke="rgb(167 180 200 / 0.3)" strokeDasharray="3 7" />
                <path d="M60 4 V20 M60 100 V116 M4 60 H20 M100 60 H116" stroke="rgb(167 180 200 / 0.5)" />
              </g>
              <circle cx="60" cy="60" r="32" stroke="rgb(167 180 200 / 0.5)" />
              <circle cx="60" cy="60" r="16" stroke="#b7f000" className={`${mv} origin-center scale-75 group-hover:scale-100`} />
              <circle cx="60" cy="60" r="5" fill="#b7f000" />
            </svg>
          </div>
        </article>

        {/* 02 — three capabilities converging */}
        <article data-r-item className="group relative overflow-hidden rounded-[24px] border border-line bg-ink-800/60 p-6 sm:p-8 lg:col-span-5">
          <Rule />
          <svg viewBox="0 0 240 120" className="w-full max-w-[18rem]" fill="none" aria-hidden>
            <g className={`${mv} group-hover:translate-x-[14px]`}>
              <circle cx="80" cy="60" r="42" stroke="#b7f000" strokeOpacity="0.7" fill="#b7f000" fillOpacity="0.05" />
              <text x="62" y="64" fontSize="9" letterSpacing="1.4" className="font-mono" fill="#b7f000">CONSULT</text>
            </g>
            <g className={`${mv} group-hover:translate-y-[10px]`}>
              <circle cx="120" cy="40" r="34" stroke="rgb(245 247 250 / 0.5)" fill="#f5f7fa" fillOpacity="0.03" />
              <text x="120" y="24" fontSize="9" letterSpacing="1.4" textAnchor="middle" className="font-mono" fill="#a7b4c8">CREATIVE</text>
            </g>
            <g className={`${mv} group-hover:-translate-x-[14px]`}>
              <circle cx="160" cy="60" r="42" stroke="#29b8d4" strokeOpacity="0.8" fill="#29b8d4" fillOpacity="0.05" />
              <text x="168" y="64" fontSize="9" letterSpacing="1.4" className="font-mono" fill="#29b8d4">TECH</text>
            </g>
            <circle cx="120" cy="62" r="4" fill="#b7f000" className={`${mv} origin-center scale-0 group-hover:scale-100`} />
          </svg>
          <Copy item={i2} className="mt-6" />
        </article>

        {/* 03 — modular blocks rearrange to fit */}
        <article data-r-item className="group relative overflow-hidden rounded-[24px] border border-line bg-ink-800/60 p-6 sm:p-8 lg:col-span-4">
          <Rule />
          <div aria-hidden className="grid w-36 grid-cols-4 gap-1.5">
            {Array.from({ length: 12 }, (_, k) => {
              const fit = [1, 2, 5, 6, 9].includes(k);
              return (
                <span
                  key={k}
                  className={`aspect-square rounded-[5px] border transition-[background-color,border-color,scale] duration-500 ease-out-expo ${
                    fit ? "border-line-strong group-hover:scale-110 group-hover:border-lime group-hover:bg-lime/80" : "border-line group-hover:opacity-50"
                  }`}
                  style={{ transitionDelay: `${(k % 4) * 50}ms` }}
                />
              );
            })}
          </div>
          <Copy item={i3} className="mt-7" />
        </article>

        {/* 04 — strategic ↔ technical */}
        <article data-r-item className="group relative overflow-hidden rounded-[24px] border border-line bg-ink-800/60 p-6 sm:p-8 md:col-span-2 lg:col-span-8">
          <Rule />
          <div aria-hidden className="flex items-center gap-4 font-display text-[clamp(1.6rem,4vw,3rem)] leading-none font-medium tracking-[-0.03em]">
            <span className="text-fg">Strategic</span>
            <span className="relative h-px flex-1 bg-gradient-to-r from-lime via-fg/30 to-cyan">
              <span className="absolute top-1/2 left-0 size-2.5 -translate-y-1/2 rounded-full bg-fg shadow-[0_0_12px_2px_rgb(183_240_0/0.6)] transition-[left] duration-1000 ease-in-out group-hover:left-[calc(100%-10px)]" />
            </span>
            <span className="text-muted transition-colors duration-700 group-hover:text-fg">Technical</span>
          </div>
          <Copy item={i4} className="mt-8" />
        </article>

        {/* 05 — long horizon */}
        <article data-r-item className="group relative overflow-hidden rounded-[24px] border border-line bg-ink-800/60 p-6 sm:p-8 md:col-span-2 lg:col-span-12">
          <Rule />
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <Copy item={i5} className="lg:col-span-4" />
            <div className="relative lg:col-span-8">
              <svg viewBox="0 0 800 160" className="w-full" fill="none" aria-hidden>
                {[40, 80, 120].map((y) => (
                  <path key={y} d={`M0 ${y} H800`} stroke="rgb(167 180 200 / 0.08)" />
                ))}
                <g data-r="draw">
                  <path d="M0 140 C120 136 200 120 300 112 S460 80 540 64" stroke="#b7f000" strokeWidth="2.2" pathLength={1} />
                </g>
                <path d="M540 64 C620 50 700 30 800 14" stroke="#29b8d4" strokeWidth="2" strokeDasharray="5 7" className="flow-line" />
                {[[300, 112], [540, 64]].map(([x, y]) => (
                  <circle key={x} cx={x} cy={y} r="5" fill="#061327" stroke="#b7f000" strokeWidth="2" />
                ))}
                <circle cx="800" cy="14" r="5" fill="#29b8d4" className="node-pulse" />
              </svg>
              <div aria-hidden className="mt-2 flex justify-between font-mono text-[0.58rem] tracking-[0.18em] text-subtle uppercase">
                <span>Deliver</span>
                <span>Improve</span>
                <span>Adapt</span>
                <span className="text-cyan">Scale</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
