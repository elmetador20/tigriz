import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  id: string;
  eyebrow: string;
  heading: readonly [string, string];
  description: string;
  children: ReactNode;
  glow?: "lime" | "cyan";
  /** Darker surface for visually dominant chapters. */
  surface?: boolean;
};

/** Consistent opener + spacing for each technology capability chapter. */
export function TechChapter({ id, eyebrow, heading, description, children, glow = "cyan", surface = false }: Props) {
  const hid = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={hid}
      className={`relative scroll-mt-24 py-[calc(var(--section-y)*0.75)] ${surface ? "bg-gradient-to-b from-transparent via-ink-950/70 to-transparent" : ""}`}
    >
      <div
        aria-hidden
        data-glow
        className={`pointer-events-none absolute top-[10%] -z-10 h-[60%] w-[55%] rounded-full blur-3xl ${
          glow === "lime" ? "right-[-12%] bg-[radial-gradient(closest-side,rgb(183_240_0/0.06),transparent)]" : "left-[-12%] bg-[radial-gradient(closest-side,rgb(41_184_212/0.08),transparent)]"
        }`}
      />
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-7" headingId={hid} label={eyebrow} lines={[heading[0], { text: heading[1], tone: "muted" }]} />
          <p data-r="up" className="max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-3">
            {description}
          </p>
        </div>
        <div className="mt-14 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
