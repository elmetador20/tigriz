import { CircleCheck } from "lucide-react";
import { HubDiagram } from "@/components/visuals/HubDiagram";
import { cloud, enterprise, platforms } from "@/content/technologies";
import { CloudArchitecture } from "./CloudArchitecture";
import { PlatformShowcase } from "./PlatformShowcase";
import { TechChapter } from "./TechChapter";

function CheckList({ items, accent = "lime" }: { items: readonly string[]; accent?: "lime" | "cyan" }) {
  return (
    <ul data-r="stagger" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
      {items.map((it) => (
        <li key={it} data-r-item className="flex items-center gap-3 rounded-xl border border-line bg-ink-800/60 px-4 py-3.5">
          <CircleCheck className={`size-4 shrink-0 ${accent === "lime" ? "text-lime" : "text-cyan"}`} strokeWidth={1.8} aria-hidden />
          <span className="font-display text-[0.95rem] font-medium tracking-[0.03em] text-fg uppercase">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CloudInfrastructure() {
  return (
    <TechChapter id="cloud" eyebrow={cloud.eyebrow} heading={cloud.heading} description={cloud.description} glow="cyan" surface>
      <CloudArchitecture />
    </TechChapter>
  );
}

export function DigitalPlatforms() {
  return (
    <TechChapter id="platforms" eyebrow={platforms.eyebrow} heading={platforms.heading} description={platforms.description} glow="lime">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <CheckList items={platforms.items} />
        </div>
        <div data-parallax className="lg:col-span-8">
          <PlatformShowcase />
        </div>
      </div>
    </TechChapter>
  );
}

export function EnterpriseSystems() {
  return (
    <TechChapter id="enterprise" eyebrow={enterprise.eyebrow} heading={enterprise.heading} description={enterprise.description} glow="cyan" surface>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <CheckList items={enterprise.items} accent="cyan" />
        </div>
        <div className="lg:col-span-8">
          <HubDiagram
            center={enterprise.hub.center}
            idle={enterprise.hub.idle}
            nodes={enterprise.hub.nodes}
            accent="cyan"
            ring
            numbered={false}
            className="mx-auto max-w-[580px]"
          />
        </div>
      </div>
    </TechChapter>
  );
}
