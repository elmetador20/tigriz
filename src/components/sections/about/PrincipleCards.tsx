import { PrincipleIcon } from "@/components/icons/PrincipleIcons";
import { about } from "@/content/site";

/** Four business principles from the profile, as numbered cards. */
export function PrincipleCards() {
  return (
    <ul data-r="stagger" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {about.principles.map((p) => (
        <li key={p.number} data-r-item>
          <article className="group/pc relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-700/80 p-6 transition-[border-color,background-color,translate] duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-lime/35 hover:bg-ink-700 sm:p-7">
            {/* Faded background number */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-5 -right-1 font-display text-[7.5rem] leading-none font-semibold tracking-tighter text-fg/[0.045] transition-colors duration-700 select-none group-hover/pc:text-lime/[0.1]"
            >
              {p.number}
            </span>
            {/* Top edge light on hover */}
            <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-lime to-transparent transition-transform duration-700 ease-out-expo group-hover/pc:scale-x-100" />

            <span className="relative grid size-14 place-items-center rounded-2xl border border-line-strong bg-ink-900/50 transition-colors duration-700 group-hover/pc:border-lime/40">
              <PrincipleIcon kind={p.icon} className="size-8" />
            </span>

            <div className="relative mt-auto pt-10">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-lime">{p.number}</p>
              <h3 className="mt-3 font-display text-[1.05rem] leading-tight font-semibold tracking-[0.05em] text-fg uppercase">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-muted">{p.description}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
