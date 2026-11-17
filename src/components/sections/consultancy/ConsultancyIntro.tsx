import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mockup } from "@/components/visuals/mockups/DocumentMockups";
import { consultancyIntro, services } from "@/content/consultancy";
import { ServiceCard } from "./ServiceCard";

/** Floating documentation composition: strategy, documents, communication. */
function DocsComposition() {
  return (
    <div data-docs-visual aria-hidden className="relative mx-auto aspect-[6/5] w-full max-w-[620px]">
      <div className="bg-grid absolute inset-0 rounded-[28px] [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(183_240_0/0.10),transparent)]" />

      {/* Connectors */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full" fill="none">
        <g stroke="#b7f000" strokeOpacity="0.45">
          <path className="flow-line" d="M170 150 C 260 110, 320 120, 380 160" />
          <path className="flow-line" d="M200 330 C 260 380, 340 380, 400 340" />
          <path className="flow-line" d="M450 260 C 470 300, 470 320, 450 350" />
        </g>
        <g stroke="rgb(167 180 200 / 0.3)">
          <circle cx="300" cy="250" r="34" strokeDasharray="2 6" />
          <path d="M300 205 V230 M300 270 V295 M255 250 H280 M320 250 H345" />
        </g>
        <circle cx="300" cy="250" r="5" fill="#b7f000" />
        <rect x="92" y="62" width="8" height="8" fill="#b7f000" />
        <rect x="520" y="420" width="8" height="8" fill="#29b8d4" />
        <rect x="530" y="84" width="5" height="5" fill="#b7f000" />
      </svg>

      <div data-float="0.6" className="absolute top-[4%] left-[2%] w-[44%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]">
        <Mockup kind="profile" />
      </div>
      <div data-float="1" className="absolute top-[10%] right-[0%] w-[50%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]">
        <Mockup kind="slides" />
      </div>
      <div data-float="0.8" className="absolute right-[6%] bottom-[2%] w-[46%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]">
        <Mockup kind="report" />
      </div>
      <div data-float="1.2" className="absolute bottom-[6%] left-[8%] w-[36%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]">
        <Mockup kind="proposal" />
      </div>

      {/* Labels */}
      {[
        ["Strategy", "top-[2%] right-[34%]"],
        ["Documentation", "top-[50%] left-[0%]"],
        ["Communication", "right-[2%] bottom-[48%]"],
      ].map(([t, pos]) => (
        <span
          key={t}
          data-float="0.4"
          className={`label-mono absolute ${pos} flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-3 py-1.5 text-[0.58rem] text-muted backdrop-blur-sm`}
        >
          <span className="size-1.5 bg-lime" />
          {t}
        </span>
      ))}
    </div>
  );
}

export function ConsultancyIntro() {
  return (
    <>
      <SectionHeading
        headingId="consultancy-heading"
        label={consultancyIntro.eyebrow}
        lines={[consultancyIntro.heading[0], { text: consultancyIntro.heading[1], tone: "muted" }]}
      />
      <div className="mt-10 grid items-center gap-12 lg:mt-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:self-start lg:pt-16">
          <p data-r="up" className="max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {consultancyIntro.description}
          </p>
          <div data-r="up" aria-hidden className="mt-10 hidden items-center gap-4 lg:flex">
            <span className="h-px w-16 bg-gradient-to-r from-lime to-transparent" />
            <span className="label-mono text-[0.62rem] text-subtle">Strategy · Documentation · Communication</span>
          </div>
        </div>
        <div className="lg:col-span-7">
          <DocsComposition />
        </div>
      </div>

      <ul data-r="stagger" className="mt-20 grid gap-4 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {services.map((s) => (
          <li key={s.number} data-r-item>
            <ServiceCard s={s} />
          </li>
        ))}
      </ul>
    </>
  );
}
