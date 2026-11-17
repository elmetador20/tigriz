import Link from "next/link";
import { ConsultancyIcon, TechnologyIcon } from "@/components/icons/CapabilityIcons";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { heroCards } from "@/content/site";

const looks = [
  {
    Icon: ConsultancyIcon,
    accent: "#b7f000",
    text: "text-lime",
    hover: "hover:border-lime/45 hover:shadow-[0_24px_60px_-28px_rgb(183_240_0/0.55)] focus-visible:border-lime/45",
    glow: "bg-[radial-gradient(260px_circle_at_0%_0%,rgb(183_240_0/0.12),transparent_70%)]",
  },
  {
    Icon: TechnologyIcon,
    accent: "#29b8d4",
    text: "text-cyan",
    hover: "hover:border-cyan/45 hover:shadow-[0_24px_60px_-28px_rgb(41_184_212/0.55)] focus-visible:border-cyan/45",
    glow: "bg-[radial-gradient(260px_circle_at_0%_0%,rgb(41_184_212/0.14),transparent_70%)]",
  },
] as const;

/** The two verticals as compact, linked capability cards under the hero CTAs. */
export function HeroCards() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {heroCards.map((card, i) => {
        const { Icon, accent, text, hover, glow } = looks[i];
        return (
          <li key={card.number} data-hero-card>
            <Link
              href={card.href}
              style={{ ["--icon-accent" as string]: accent }}
              className={`group/hc group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/65 p-5 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 focus-visible:-translate-y-1 sm:p-6 lg:p-5 ${hover}`}
            >
              <span aria-hidden className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/hc:opacity-100 ${glow}`} />

              <span className="relative flex items-start justify-between">
                <Icon className="size-10 text-fg transition-transform duration-500 ease-out-expo group-hover/hc:-translate-y-0.5" />
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-xs tracking-[0.2em] ${text}`}>{card.number}</span>
                  <span className="grid size-8 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-500 group-hover/hc:border-transparent group-hover/hc:bg-[var(--icon-accent)] group-hover/hc:text-ink-900">
                    <ArrowSwap className="size-3.5" />
                  </span>
                </span>
              </span>

              <span className="relative mt-4 font-display text-[0.95rem] font-semibold tracking-[0.22em] text-fg uppercase">
                {card.title}
              </span>
              <span className="relative mt-2 text-[0.82rem] leading-relaxed text-muted">{card.description}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
