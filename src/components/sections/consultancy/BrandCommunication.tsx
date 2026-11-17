import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandCommunication } from "@/content/consultancy";
import { BrandPortfolio } from "./BrandPortfolio";

/** Brand & Marketing Communication: categories, illustrative portfolio, impact statements. */
export function BrandCommunication() {
  const b = brandCommunication;
  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <SectionHeading
          className="lg:col-span-7"
          headingId="brand-heading"
          index="1.2"
          label={b.eyebrow}
          lines={[b.heading[0], { text: b.heading[1], tone: "muted" }]}
        />
        <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
          {b.description}
        </p>
      </div>

      <div className="mt-14 lg:mt-16">
        <BrandPortfolio />
      </div>

      <ul data-r="stagger" aria-label="Why it matters" className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-5">
        {b.impact.map((s) => (
          <li key={s.number} data-r-item>
            <article className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-ink-700/70 p-6 transition-[background-color,translate] duration-700 ease-out-expo hover:-translate-y-1 hover:bg-ink-700 sm:p-7">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-lime/70" />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime shadow-[0_0_18px_2px_rgb(183_240_0/0.6)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <p className="font-mono text-xs tracking-[0.2em] text-lime">{s.number}</p>
              <h3 className="mt-8 font-display text-lg leading-tight font-semibold tracking-[0.05em] text-fg uppercase">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-muted">{s.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
