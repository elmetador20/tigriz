import type { ReactNode } from "react";
import { BoardroomArt } from "@/components/visuals/BoardroomArt";
import { EngineeringArt } from "@/components/visuals/EngineeringArt";
import { HeroWave } from "@/components/visuals/HeroWave";
import { about } from "@/content/site";

type Meta = { index: string; label: string; caption: string };

function Block({
  meta,
  className = "",
  captionClass = "",
  children,
}: {
  meta: Meta;
  className?: string;
  captionClass?: string;
  children: ReactNode;
}) {
  return (
    <figure
      data-r="clip"
      className={`relative isolate overflow-hidden rounded-[20px] border border-line bg-ink-800 ${className}`}
    >
      <div data-r-zoom className="absolute inset-0 -z-10">
        {children}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-ink-900/90 to-transparent" />
      <figcaption className="flex h-full flex-col justify-between p-5 sm:p-6">
        <span className="label-mono flex items-center gap-3 self-start rounded-full border border-line bg-ink-900/60 px-3 py-1.5 text-[0.62rem] text-muted backdrop-blur-sm">
          <span className="text-lime">{meta.index}</span>
          {meta.label}
        </span>
        <span className={`font-display text-xl font-medium tracking-tight text-balance text-fg sm:text-2xl ${captionClass}`}>{meta.caption}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Editorial composition: a tall wave panel beside a wide boardroom
 * scene and a shorter engineering panel — three proportions.
 */
export function EditorialVisuals() {
  const e = about.editorial;
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[300px_250px] lg:gap-5">
      <Block meta={e.wave} className="aspect-[4/5] sm:aspect-[16/10] lg:col-span-5 lg:row-span-2 lg:aspect-auto">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_90%,rgb(183_240_0/0.12),transparent_70%)]" />
        <HeroWave className="size-full" fadeLeft={false} horizon={0.36} vanishX={0.55} />
      </Block>

      <Block meta={e.boardroom} className="aspect-[16/10] sm:aspect-[21/9] lg:col-span-7 lg:aspect-auto">
        <BoardroomArt className="size-full" />
      </Block>

      <Block meta={e.engineering} className="min-h-[280px] lg:col-span-7 lg:min-h-0" captionClass="lg:max-w-[12rem]">
        <div className="absolute inset-0 grid place-items-center px-4 pt-16 pb-16 sm:px-6 sm:pb-20 lg:px-6 lg:pt-6 lg:pb-6 lg:pl-[38%]">
          <div className="h-full w-full max-w-[640px] overflow-hidden rounded-xl border border-line-strong shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
            <EngineeringArt />
          </div>
        </div>
      </Block>
    </div>
  );
}
