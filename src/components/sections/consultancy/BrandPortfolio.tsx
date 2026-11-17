"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { Mockup } from "@/components/visuals/mockups/DocumentMockups";
import { AdBanner, IdentityBoard, Stationery } from "@/components/visuals/mockups/BrandMockups";
import { brandCommunication, type BrandKey } from "@/content/consultancy";

type Tile = { id: string; caption: string; keys: BrandKey[]; className: string; body: ReactNode };

const tiles: Tile[] = [
  { id: "social", caption: "Social creatives", keys: ["social"], className: "col-span-6 sm:col-span-3", body: <Mockup kind="social" /> },
  { id: "identity", caption: "Identity elements", keys: ["identity"], className: "col-span-6 sm:col-span-3", body: <IdentityBoard /> },
  { id: "stationery", caption: "Corporate stationery", keys: ["identity", "corporate"], className: "col-span-6 sm:col-span-3", body: <Stationery /> },
  { id: "collateral", caption: "Poster & event", keys: ["offline"], className: "col-span-6 sm:col-span-3", body: <Mockup kind="collateral" /> },
  { id: "brochure", caption: "Brochure & catalogue", keys: ["corporate", "offline"], className: "col-span-6 sm:col-span-2", body: <Mockup kind="brochure" /> },
  { id: "ad", caption: "Digital advertising", keys: ["social"], className: "col-span-6 sm:col-span-4", body: <AdBanner /> },
];

/**
 * Category list + illustrative portfolio. Selecting a category (hover with
 * a mouse, tap, or keyboard) highlights the previews that belong to it.
 */
export function BrandPortfolio() {
  const cats = brandCommunication.categories;
  const [active, setActive] = useState<BrandKey>(cats[0].key);
  const uid = useId();

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Categories */}
      <div className="order-2 lg:order-1 lg:col-span-5">
        <ul className="border-t border-line">
          {cats.map((c) => {
            const on = c.key === active;
            const panelId = `${uid}-${c.key}`;
            return (
              <li key={c.key} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={panelId}
                  onClick={() => setActive(c.key)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(c.key)}
                  className="group flex w-full items-start gap-5 py-5 text-left"
                >
                  <span className={`pt-1 font-mono text-xs tracking-[0.2em] transition-colors ${on ? "text-lime" : "text-subtle"}`}>{c.number}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-lg leading-snug font-medium tracking-[0.04em] uppercase transition-colors sm:text-xl ${on ? "text-fg" : "text-fg/60 group-hover:text-fg/90"}`}>
                      {c.title}
                    </span>
                    <span className={`label-mono mt-1.5 block text-[0.62rem] transition-colors ${on ? "text-lime" : "text-subtle"}`}>{c.eyebrow}</span>
                  </span>
                  <Plus
                    aria-hidden
                    className={`mt-1 size-4 shrink-0 transition-transform duration-500 ease-out-expo ${on ? "rotate-45 text-lime" : "text-muted"}`}
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-label={c.title}
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-10">
                      <p className="text-[0.95rem] leading-relaxed text-muted">{c.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.includes.map((x) => (
                          <li key={x} className="rounded-full border border-line-strong px-3 py-1.5 text-[0.78rem] text-fg/85">
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Portfolio composition */}
      <div className="order-1 lg:order-2 lg:col-span-7">
        <figure className="lg:sticky lg:top-28">
          <div data-r="clip" className="rounded-[24px] border border-line bg-ink-800/60 p-3 sm:p-4">
            <div data-r-zoom className="grid grid-cols-6 gap-3 sm:gap-4">
              {tiles.map((t) => {
                const on = t.keys.includes(active);
                return (
                  <div
                    key={t.id}
                    data-on={on}
                    className={`group/tile group/mock relative overflow-hidden rounded-2xl border bg-ink-900/70 p-4 transition-[opacity,border-color,filter,translate] duration-700 ease-out-expo sm:p-5 ${t.className} ${
                      on ? "border-lime/45 opacity-100" : "border-line opacity-40 saturate-[0.4] hover:opacity-70"
                    }`}
                  >
                    <div className="flex h-full flex-col justify-center gap-3">
                      <div className="transition-transform duration-700 ease-out-expo group-hover/tile:scale-[1.02]">{t.body}</div>
                      <span className={`label-mono text-[0.58rem] transition-colors ${on ? "text-lime" : "text-subtle"}`}>{t.caption}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <figcaption className="mt-3 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-subtle uppercase">
            <span className="size-1.5 rounded-full bg-cyan" />
            {brandCommunication.previewNote}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
