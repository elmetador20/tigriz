import { isSample, sampleNote } from "@/content/proof";

/** Visible marker while projects/testimonials are still placeholders (see src/content/proof.ts). */
export function SampleBadge({ className = "" }: { className?: string }) {
  if (!isSample) return null;
  return (
    <p data-r="up" className={`inline-flex items-center gap-2 max-w-full rounded-full border border-dashed sm:whitespace-nowrap border-line-strong px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] text-muted uppercase ${className}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
      {sampleNote}
    </p>
  );
}
