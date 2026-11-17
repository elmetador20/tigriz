import { BrandCommunication } from "./BrandCommunication";
import { ConsultancyIntro } from "./ConsultancyIntro";
import { ConsultancyMotion } from "./ConsultancyMotion";
import { DocumentationPanels } from "./DocumentationPanels";
import { DprTimeline } from "./DprTimeline";

/** Subsection wrapper with its own ambient light (faded in by ConsultancyMotion). */
function Chapter({ id, labelledBy, glow, children }: { id?: string; labelledBy?: string; glow: "lime" | "cyan"; children: React.ReactNode }) {
  return (
    <div id={id} aria-labelledby={labelledBy} role={id ? "region" : undefined} className="relative scroll-mt-24 py-[calc(var(--section-y)*0.7)]">
      <div
        aria-hidden
        data-glow
        className={`pointer-events-none absolute top-0 -z-10 h-[70%] w-[60%] rounded-full blur-3xl ${
          glow === "lime" ? "left-[-15%] bg-[radial-gradient(closest-side,rgb(183_240_0/0.07),transparent)]" : "right-[-15%] bg-[radial-gradient(closest-side,rgb(41_184_212/0.08),transparent)]"
        }`}
      />
      <div className="container-x">{children}</div>
    </div>
  );
}

export function Consultancy() {
  return (
    <ConsultancyMotion id="consultancy" labelledBy="consultancy-heading" className="relative isolate overflow-x-clip pt-[calc(var(--section-y)*0.3)]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <Chapter glow="lime">
        <ConsultancyIntro />
      </Chapter>

      <Chapter id="documentation" labelledBy="documentation-heading" glow="cyan">
        <DocumentationPanels />
        <div className="mt-6 lg:mt-8">
          <DprTimeline />
        </div>
      </Chapter>

      <Chapter id="brand" labelledBy="brand-heading" glow="lime">
        <BrandCommunication />
      </Chapter>
    </ConsultancyMotion>
  );
}
