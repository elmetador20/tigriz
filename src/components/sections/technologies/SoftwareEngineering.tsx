import { Cable, Code, Globe, Smartphone, type LucideIcon } from "lucide-react";
import { software } from "@/content/technologies";
import { BrowserWorkspace } from "./BrowserWorkspace";
import { TechChapter } from "./TechChapter";

const icons: Record<string, LucideIcon> = { A: Globe, B: Smartphone, C: Code, D: Cable };

export function SoftwareEngineering() {
  return (
    <TechChapter id="software" eyebrow={software.eyebrow} heading={software.heading} description={software.description} glow="lime">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ul data-r="stagger" className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {software.categories.map((c) => {
            const Icon = icons[c.key];
            return (
              <li key={c.key} data-r-item>
                <article className="group relative h-full rounded-2xl border border-line bg-ink-800/70 p-5 transition-[border-color,background-color,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-lime/35 hover:bg-ink-700/80">
                  <div className="flex items-start gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-900/60 text-lime transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                      <Icon className="size-[1.1rem]" strokeWidth={1.6} aria-hidden />
                    </span>
                    <div>
                      <p className="font-mono text-[0.62rem] tracking-[0.2em] text-subtle">{c.key}</p>
                      <h3 className="mt-1 font-display text-[1.02rem] leading-snug font-semibold tracking-[0.03em] text-fg uppercase">{c.title}</h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-pretty text-muted">{c.description}</p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <div className="lg:col-span-8">
          <BrowserWorkspace />
        </div>
      </div>
    </TechChapter>
  );
}
