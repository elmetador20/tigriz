import Link from "next/link";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachIntro } from "@/content/approach";
import { about, verticals } from "@/content/site";
import { RevealSection } from "@/motion/RevealSection";

/** Signposts from the home page to each inner page, using copy already on those pages. */
const pages = [
  { href: "/about", label: "About Us", text: about.paragraphs[0] },
  { href: "/consultancy", label: verticals.consultancy.label, text: verticals.consultancy.lede },
  { href: "/technologies", label: verticals.technologies.label, text: verticals.technologies.lede },
  { href: "/approach", label: "Our Approach", text: approachIntro.description },
] as const;

export function ExplorePages() {
  return (
    <RevealSection id="explore" labelledBy="explore-heading" className="relative isolate scroll-mt-20 border-t border-line py-[var(--section-y)]">
      <div className="container-x">
        <SectionHeading label="Explore" headingId="explore-heading" lines={[`${about.venn.center.tag}.`, { text: about.venn.center.title, tone: "lime" }]} />
        <ul data-r="stagger" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
          {pages.map((p, i) => (
            <li key={p.href} data-r-item>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-[24px] border border-line bg-ink-800/50 p-6 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/50 sm:p-8"
              >
                <span className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-subtle">0{i + 1}</span>
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-ink-900">
                    <ArrowSwap className="size-4" />
                  </span>
                </span>
                <span className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-fg sm:text-3xl">{p.label}</span>
                <span className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-muted">{p.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
