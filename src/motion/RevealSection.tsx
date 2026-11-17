"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { setupReveals } from "./reveal";

type Props = {
  as?: "section" | "footer" | "div";
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Generic motion wrapper for simpler sections: shared scroll reveals plus
 * gentle floats on [data-float]. Server-rendered children stay server-rendered.
 */
export function RevealSection({ as: Tag = "section", id, labelledBy, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        setupReveals(root);
        gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-float]")).forEach((el, i) => {
          const d = Number(el.dataset.float) || 1;
          gsap.to(el, { y: -8 * d, duration: 3.4 + (i % 4) * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </Tag>
  );
}
