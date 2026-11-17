import { SectionHeading } from "@/components/ui/SectionHeading";
import { EngineeringArt } from "@/components/visuals/EngineeringArt";
import { IdentityBoard } from "@/components/visuals/mockups/BrandMockups";
import { Mockup } from "@/components/visuals/mockups/DocumentMockups";
import { projects, type ProjectVisual } from "@/content/proof";
import { RevealSection } from "@/motion/RevealSection";
import { SampleBadge } from "./SampleBadge";

function ProjectArt({ kind }: { kind: ProjectVisual }) {
  if (kind === "engineering") return <EngineeringArt className="text-[0.9em]" />;
  return (
    <div className="grid h-full place-items-center px-8 py-6">
      {kind === "report" ? <Mockup kind="report" className="w-full max-w-[15rem]" /> : <IdentityBoard />}
    </div>
  );
}

/** Three short case studies: visual, context, services and outcome. */
export function Projects() {
  return (
    <RevealSection id="work" labelledBy="work-heading" className="relative isolate scroll-mt-20 overflow-x-clip border-t border-line py-[var(--section-y)]">
      <div aria-hidden className="pointer-events-none absolute top-[10%] right-[-15%] -z-10 h-[60%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.07),transparent)] blur-3xl" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            headingId="work-heading"
            label={projects.eyebrow}
            lines={[projects.heading[0], { text: projects.heading[1], tone: "lime" }]}
            intro={projects.intro}
          />
          <SampleBadge className="self-start lg:self-end" />
        </div>

        <ul data-r="stagger" className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {projects.items.map((p) => (
            <li key={p.number} data-r-item>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-ink-800/50 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/40">
                <div aria-hidden className="relative h-52 overflow-hidden border-b border-line bg-[radial-gradient(120%_90%_at_50%_0%,#173058,#0b1b35_70%)]">
                  <ProjectArt kind={p.visual} />
                  <span className="absolute top-4 left-4 rounded-full border border-line-strong bg-ink-900/80 px-3 py-1 font-mono text-[0.6rem] tracking-[0.18em] text-lime uppercase backdrop-blur-sm">
                    {p.vertical}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.18em] text-subtle uppercase">
                    <span className="text-lime">{p.number}</span>
                    {p.client}
                  </p>
                  <h3 className="mt-4 font-display text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-fg">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-muted">{p.summary}</p>
                  <ul aria-label="Services" className="mt-5 mb-6 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto flex items-start gap-3 border-t border-line pt-5 text-sm text-fg">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime" />
                    <span>
                      <span className="sr-only">Outcome: </span>
                      {p.outcome}
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
