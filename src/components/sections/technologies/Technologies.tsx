import { AiAutomation } from "./AiAutomation";
import { CloudInfrastructure, DigitalPlatforms, EnterpriseSystems } from "./CapabilityChapters";
import { DataAnalytics } from "./DataAnalytics";
import { EngineeringProcess } from "./EngineeringProcess";
import { SoftwareEngineering } from "./SoftwareEngineering";
import { TechCta } from "./TechCta";
import { TechIntro } from "./TechIntro";
import { TechMarquee } from "./TechMarquee";
import { TechMotion } from "./TechMotion";

/**
 * Technologies vertical: intro + ecosystem, six capability chapters,
 * capability marquee, engineering process and closing CTA.
 */
export function Technologies() {
  return (
    <TechMotion id="technologies" labelledBy="technologies-heading" className="relative isolate overflow-x-clip">
      {/* Seam with Consultancy: darker technology surface fades in */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-transparent via-ink-950/50 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <div className="relative py-[var(--section-y)]">
        <div aria-hidden data-glow className="pointer-events-none absolute top-[5%] right-[-10%] -z-10 h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(41_184_212/0.09),transparent)] blur-3xl" />
        <div className="container-x">
          <TechIntro />
        </div>
      </div>

      <SoftwareEngineering />
      <AiAutomation />
      <DataAnalytics />
      <CloudInfrastructure />
      <DigitalPlatforms />
      <EnterpriseSystems />

      <TechMarquee />
      <EngineeringProcess />
      <TechCta />
    </TechMotion>
  );
}
