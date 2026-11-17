import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, verticals } from "@/content/site";
import { AboutMotion } from "./AboutMotion";
import { EditorialVisuals } from "./EditorialVisuals";
import { PrincipleCards } from "./PrincipleCards";
import { VennDiagram } from "./VennDiagram";
import { VennInteractive } from "./VennInteractive";
import { VENN_H, VENN_V } from "./venn-geometry";

export function About() {
  const [lead, second] = about.paragraphs;

  return (
    <AboutMotion id="about" labelledBy="about-heading" className="relative isolate overflow-x-clip py-[var(--section-y)]">
      {/* Seam with the hero + ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <div className="absolute top-[8%] right-[-10%] h-[45%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.06),transparent)]" />
        <div className="absolute top-[30%] left-[-15%] h-[40%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.045),transparent)]" />
      </div>

      <div className="container-x">
        {/* ---------- Story + Venn ---------- */}
        <div className="grid items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading headingId="about-heading" label={about.eyebrow} lines={[...about.heading]} />

            <p data-r="up" className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-fg/90 sm:text-xl">
              {lead}
            </p>
            <p data-r="up" className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {second}
            </p>

            {/* Decorative rule: two verticals converging */}
            <div data-about-rule aria-hidden className="mt-10 flex max-w-md items-center gap-4">
              <span className="label-mono text-[0.62rem] text-lime">{verticals.consultancy.label}</span>
              <span className="relative h-px flex-1 bg-gradient-to-r from-lime/60 via-fg/20 to-cyan/60">
                <span data-about-rule-dot className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-fg shadow-[0_0_12px_2px_rgb(183_240_0/0.6)]" />
              </span>
              <span className="label-mono text-[0.62rem] text-cyan">{verticals.technologies.label}</span>
            </div>
          </div>

          <div data-about-venn className="lg:col-span-7">
            <VennInteractive
              messages={about.venn.messages}
              options={[
                { key: "a", label: verticals.consultancy.label, accent: "lime" },
                { key: "ab", label: about.venn.center.tag, accent: "both" },
                { key: "b", label: verticals.technologies.label, accent: "cyan" },
              ]}
            >
              <div className="mx-auto hidden w-full max-w-[760px] sm:block">
                <VennDiagram g={VENN_H} />
              </div>
              <div className="mx-auto w-full max-w-[360px] sm:hidden">
                <VennDiagram g={VENN_V} />
              </div>
            </VennInteractive>
          </div>
        </div>

        {/* ---------- Principles ---------- */}
        <div className="mt-24 sm:mt-28">
          <PrincipleCards />
        </div>

        {/* ---------- Editorial visuals ---------- */}
        <div className="mt-6 lg:mt-8">
          <EditorialVisuals />
        </div>
      </div>
    </AboutMotion>
  );
}
