"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/motion/gsap";
import { setupReveals } from "@/motion/reveal";
import { completeStepTimelines, setupStepTimelines } from "@/motion/steps";

type Props = { children: ReactNode; id: string; labelledBy: string; className?: string };

/**
 * Motion for Our Approach.
 *  - shared reveals (eyebrows, headings, cards, drawn lines)
 *  - workflow timeline: scroll-drawn line, sequential stage activation
 *  - intro journey: a light travels from idea to solution
 *  - pathways: packets flow along both paths; connection points and the
 *    matching journey steps light in sequence (only while on screen)
 *  - Why: thin rules draw in; subtle parallax on large visuals
 */
export function ApproachMotion({ children, id, labelledBy, className }: Props) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const q = gsap.utils.selector(root);
      const cleanups: (() => void)[] = [];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        completeStepTimelines(root);
        q<HTMLElement>("[data-pw-step], [data-pw-node]").forEach((el) => (el.dataset.on = "true"));
      });

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          compact: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          setupReveals(root);
          cleanups.push(setupStepTimelines(root, desktop));

          // Section glows
          q("[data-glow]").forEach((el) => {
            gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "top 25%", scrub: true } });
          });

          // Why: rules draw in
          q("[data-why-rule]").forEach((el) => {
            gsap.from(el, { scaleX: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
          });

          // Parallax
          if (desktop) {
            q("[data-parallax]").forEach((el) => {
              gsap.fromTo(el, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true } });
            });
          }

          // Journey: a light travels idea → solution along the path
          const jPath = q<SVGPathElement>("[data-journey-path]")[0];
          const jDot = q<SVGCircleElement>("[data-journey-dot]")[0];
          if (jPath && jDot) {
            const len = jPath.getTotalLength();
            const prox = { t: 0 };
            const travel = gsap.to(prox, {
              t: 1,
              duration: 5,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 0.8,
              paused: true,
              onUpdate: () => {
                const p = jPath.getPointAtLength(prox.t * len);
                jDot.setAttribute("cx", String(p.x));
                jDot.setAttribute("cy", String(p.y));
                jDot.style.opacity = prox.t > 0.02 && prox.t < 0.98 ? "1" : "0";
              },
            });
            gsap.from(q("[data-journey-solution]"), { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.2, ease: "expo.out", delay: 0.8, scrollTrigger: { trigger: jPath, start: "top 80%" } });
            gsap.timeline({ scrollTrigger: { trigger: jPath, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? travel.play() : travel.pause()) } });
          }

          // Pathways: packets + sequential connection points
          const pw = q<HTMLElement>("[data-pathways]")[0];
          if (pw) {
            const loops: gsap.core.Animation[] = [];
            (["a", "b"] as const).forEach((k, n) => {
              const path = pw.querySelector<SVGPathElement>(`[data-pw-path="${k}"]`);
              const dot = pw.querySelector<SVGCircleElement>(`[data-pw-packet="${k}"]`);
              if (!path || !dot) return;
              const len = path.getTotalLength();
              const prox = { t: 0 };
              loops.push(
                gsap.to(prox, {
                  t: 1,
                  duration: 3.2,
                  ease: "none",
                  repeat: -1,
                  delay: n * 1.6,
                  paused: true,
                  onUpdate: () => {
                    const p = path.getPointAtLength(prox.t * len);
                    dot.setAttribute("cx", String(p.x));
                    dot.setAttribute("cy", String(p.y));
                    dot.style.opacity = prox.t < 0.95 ? "1" : "0";
                  },
                }),
              );
            });
            const seq = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });
            const setStep = (i: number) => {
              pw.querySelectorAll<HTMLElement>("[data-pw-step], [data-pw-node]").forEach((el) => {
                const idx = Number((el.dataset.pwStep ?? el.dataset.pwNode)!.slice(1));
                el.dataset.on = String(idx <= i);
              });
            };
            for (let i = 0; i < 4; i++) seq.call(() => setStep(i), undefined, i * 0.9);
            seq.call(() => setStep(-1), undefined, 4.6);
            loops.push(seq);
            gsap.timeline({ scrollTrigger: { trigger: pw, start: "top bottom", end: "bottom top", onToggle: (s) => loops.forEach((l) => (s.isActive ? l.play() : l.pause())) } });
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
