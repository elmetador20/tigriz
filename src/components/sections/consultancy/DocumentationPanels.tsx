import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mockup } from "@/components/visuals/mockups/DocumentMockups";
import { documentation } from "@/content/consultancy";

/** Business Documentation & Advisory: four large editorial panels. */
export function DocumentationPanels() {
  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <SectionHeading
          className="lg:col-span-7"
          headingId="documentation-heading"
          index="1.1"
          label={documentation.eyebrow}
          lines={[documentation.heading[0], { text: documentation.heading[1], tone: "muted" }]}
        />
        <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
          {documentation.description}
        </p>
      </div>

      <div data-r="stagger" className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
        {documentation.panels.map((p, i) => (
          <article
            key={p.key}
            data-r-item
            className="group/mock relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-ink-800/80 transition-colors duration-700 hover:border-lime/30"
          >
            {/* Visual stage */}
            <div className="relative h-[15rem] overflow-hidden border-b border-line bg-[radial-gradient(90%_100%_at_50%_0%,#173058,#0b1b35_75%)] sm:h-[19rem] [perspective:1200px]">
              <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-4 left-5 font-display text-[9rem] leading-none font-semibold text-fg/[0.05] select-none"
              >
                {p.key}
              </span>
              <div data-panel-float className="absolute inset-x-0 top-8 mx-auto w-[74%] max-w-[26rem] sm:top-10">
                <div
                  className="drop-shadow-[0_40px_50px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-out-expo [transform:rotateX(10deg)_rotateY(var(--tilt))] group-hover/mock:[transform:rotateX(0deg)_rotateY(0deg)]"
                  style={{ ["--tilt" as string]: `${i % 2 ? 10 : -10}deg` }}
                >
                  <Mockup kind={p.visual} />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-800 to-transparent" />
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="label-mono text-[0.66rem] text-lime">{p.eyebrow}</p>
              <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-medium tracking-[-0.02em] text-fg">
                {p.title}
              </h3>
              <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-pretty text-muted">{p.description}</p>
              <ul aria-label={`${p.title} include`} className="mt-6 flex flex-wrap gap-2">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line-strong bg-ink-900/40 px-3 py-1.5 text-[0.78rem] text-fg/85 transition-colors duration-300 group-hover/mock:border-lime/25"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
