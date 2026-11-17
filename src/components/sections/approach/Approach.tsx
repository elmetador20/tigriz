import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applications } from "@/content/approach";
import { ApplicationsExplorer } from "./ApplicationsExplorer";
import { ApproachIntro } from "./ApproachIntro";
import { ApproachMotion } from "./ApproachMotion";
import { ClosingTransition } from "./ClosingTransition";
import { EngagementPathways } from "./EngagementPathways";
import { WhyTigriz } from "./WhyTigriz";
import { WorkflowTimeline } from "./WorkflowTimeline";

function Block({ id, labelledBy, glow, children }: { id?: string; labelledBy?: string; glow: "lime" | "cyan"; children: ReactNode }) {
  return (
    <div id={id} role={id ? "region" : undefined} aria-labelledby={labelledBy} className="relative scroll-mt-24 py-[calc(var(--section-y)*0.7)]">
      <div
        aria-hidden
        data-glow
        className={`pointer-events-none absolute top-[10%] -z-10 h-[60%] w-[55%] rounded-full blur-3xl ${
          glow === "lime" ? "left-[-12%] bg-[radial-gradient(closest-side,rgb(183_240_0/0.06),transparent)]" : "right-[-12%] bg-[radial-gradient(closest-side,rgb(41_184_212/0.07),transparent)]"
        }`}
      />
      <div className="container-x">{children}</div>
    </div>
  );
}

/** Our Approach: workflow, engagement pathways, differentiators, business applications, closing. */
export function Approach() {
  return (
      <ApproachMotion id="process" labelledBy="approach-heading" className="relative isolate overflow-x-clip pt-[calc(var(--section-y)*0.3)]">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

        <Block glow="lime">
          <ApproachIntro />
          <div className="mt-16 lg:mt-20">
            <WorkflowTimeline />
          </div>
        </Block>

        <Block id="pathways" labelledBy="pathways-heading" glow="cyan">
          <EngagementPathways />
        </Block>

        <Block id="why" labelledBy="why-heading" glow="lime">
          <WhyTigriz />
        </Block>

        <Block id="applications" labelledBy="applications-heading" glow="cyan">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-7"
              headingId="applications-heading"
              label={applications.eyebrow}
              lines={[applications.heading[0], { text: applications.heading[1], tone: "muted" }]}
            />
            <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
              {applications.description}
            </p>
          </div>
          <div data-r="up" className="mt-14 lg:mt-16">
            <ApplicationsExplorer />
          </div>
        </Block>

        <ClosingTransition />
      </ApproachMotion>
  );
}
