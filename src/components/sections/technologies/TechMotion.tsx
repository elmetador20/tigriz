"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/motion/gsap";
import { setupReveals } from "@/motion/reveal";
import { completeStepTimelines, setupStepTimelines } from "@/motion/steps";

type Props = { children: ReactNode; id: string; labelledBy: string; className?: string };

/**
 * Section-wide motion for Technologies. Interactive diagrams (HubDiagram,
 * CloudArchitecture) own their particle motion; this layer handles:
 *  - shared reveals (headings, cards, clip reveals, drawn lines)
 *  - engineering process timeline (shared step helper)
 *  - chapter glows, floating UI panels, subtle scroll parallax
 *  - analytics chart drawing, workspace code "typing"
 */
export function TechMotion({ children, id, labelledBy, className }: Props) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const q = gsap.utils.selector(root);
      const cleanups: (() => void)[] = [];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => completeStepTimelines(root));

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          compact: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          setupReveals(root);
          cleanups.push(setupStepTimelines(root, desktop));

          // Chapter glows
          q("[data-glow]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, scale: 0.85 },
              { autoAlpha: 1, scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "top 25%", scrub: true } },
            );
          });

          // Floating interface panels
          q<HTMLElement>("[data-float]").forEach((el, i) => {
            const d = Number(el.dataset.float) || 1;
            gsap.to(el, { y: -9 * d, duration: 3.2 + (i % 5) * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });

          // Subtle scroll parallax on large visuals (desktop only)
          if (desktop) {
            q("[data-parallax]").forEach((el) => {
              gsap.fromTo(el, { yPercent: 4 }, { yPercent: -4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
            });
          }

          // Analytics: draw line, grow bars, fill progress
          const chart = q("[data-chart-line]")[0];
          if (chart) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: chart, start: "top 85%" }, defaults: { ease: "expo.out" } });
            tl.fromTo(chart, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
              .from(q("[data-chart-area]"), { autoAlpha: 0, duration: 1.2 }, 0.6)
              .from(q("[data-chart-point]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.15 }, 0.8)
              .from(q("[data-chart-bar]"), { scaleY: 0, duration: 1.1, stagger: 0.06 }, 0.2)
              .from(q("[data-chart-progress]"), { scaleX: 0, duration: 1.4, stagger: 0.12 }, 0.4)
              .fromTo(q("[data-chart-ring]"), { strokeDasharray: "0 1" }, { strokeDasharray: "0.72 1", duration: 1.6, ease: "power2.inOut" }, 0.5);
          }

          // Workspace code tokens "type" in
          const tokens = q("#software [data-eng-token]");
          if (tokens.length) {
            gsap.from(tokens, { scaleX: 0, duration: 0.45, ease: "power2.out", stagger: 0.03, scrollTrigger: { trigger: tokens[0], start: "top 90%" } });
          }
        },
      );

      return () => {
        cleanups.forEach((f) => f());
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <section ref={scope} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}
