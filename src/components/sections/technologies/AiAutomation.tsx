import { AppWindow, BrainCircuit, Plug, Workflow, type LucideIcon } from "lucide-react";
import { ai } from "@/content/technologies";
import { AiWorkflow } from "./AiWorkflow";
import { TechChapter } from "./TechChapter";

const icons: Record<string, LucideIcon> = { A: Plug, B: Workflow, C: BrainCircuit, D: AppWindow };

export function AiAutomation() {
  return (
    <TechChapter id="ai" eyebrow={ai.eyebrow} heading={ai.heading} description={ai.description} glow="lime" surface>
      <AiWorkflow />
      <ul data-r="stagger" className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-5">
        {ai.capabilities.map((c) => {
          const Icon = icons[c.key];
          return (
            <li key={c.key} data-r-item>
              <article className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-ink-800/70 p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/35">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900/60 text-lime">
                    <Icon className="size-5 transition-transform duration-500 ease-out-expo group-hover:scale-110" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-subtle">{c.key}</span>
                </div>
                <h3 className="mt-8 font-display text-[1.02rem] leading-snug font-semibold tracking-[0.05em] text-fg uppercase">{c.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-pretty text-muted">{c.description}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </TechChapter>
  );
}
