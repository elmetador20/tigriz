import type { ReactNode } from "react";

type Line = string | { text: string; tone: "muted" | "lime" };

type Props = {
  index?: string;
  label: string;
  lines: Line[];
  intro?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  /** id for the heading, so the section can be aria-labelledby it. */
  headingId?: string;
};

const tones = { muted: "text-muted", lime: "text-lime" } as const;

/** Section opener: lime eyebrow with animated rule, masked multi-line heading, optional intro. */
export function SectionHeading({ index, label, lines, intro, className = "", as: Tag = "h2", headingId }: Props) {
  return (
    <div className={className}>
      <p data-r="left" className="label-mono flex items-center gap-4 text-lime">
        {index && <span className="text-subtle">{index}</span>}
        <span aria-hidden className="relative h-px w-10 overflow-hidden bg-lime/30">
          <span className="absolute inset-y-0 left-0 w-1/2 animate-[rule-sweep_3.2s_var(--ease-in-out-quart)_infinite] bg-lime" />
        </span>
        {label}
      </p>
      <Tag
        id={headingId}
        data-r="lines"
        className="mt-6 font-display text-[clamp(2rem,5.2vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.035em] text-balance text-fg"
      >
        {lines.map((line) => {
          const text = typeof line === "string" ? line : line.text;
          const tone = typeof line === "string" ? "" : tones[line.tone];
          return (
            <span key={text} className="block overflow-hidden pb-[0.08em]">
              <span data-r-line className={`block ${tone}`}>
                {text}
              </span>
            </span>
          );
        })}
      </Tag>
      {intro && (
        <p data-r="up" className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}
