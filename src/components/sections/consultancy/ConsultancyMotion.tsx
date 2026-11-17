"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, isFinePointer } from "@/motion/gsap";
import { setupReveals } from "@/motion/reveal";
import { completeStepTimelines, setupStepTimelines } from "@/motion/steps";

type Props = { children: ReactNode; id: string; labelledBy: string; className?: string };

/**
 * Motion for the Consultancy section.
 *  - Shared reveals: eyebrows, headings, copy, staggered cards, clip reveals
 *  - Intro documents float gently and parallax with the pointer
 *  - Service cards: cursor glow, 3D tilt and visual drift (desktop mouse)
 *  - Documentation panel mockups float
 *  - DPR timeline: line draws with scroll, steps activate in sequence
 *  - Each chapter's ambient glow fades in as it arrives
 * Reduced motion: no tweens; the timeline shows every step as complete.
 */
export function ConsultancyMotion({ children, id, labelledBy, className }: Props) {
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

          // ---- DPR timeline ---------------------------------------------
          const disarm = setupStepTimelines(root, desktop);
          cleanups.push(disarm);

          // ---- Ambient glows --------------------------------------------
          q("[data-glow]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, scale: 0.85 },
              {
                autoAlpha: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement, start: "top 85%", end: "top 25%", scrub: true },
              },
            );
          });

          // ---- Floating documents (intro + panels) ----------------------
          q<HTMLElement>("[data-float]").forEach((el, i) => {
            const d = Number(el.dataset.float) || 1;
            gsap.to(el, { y: -10 * d, rotation: i % 2 ? 0.8 : -0.8, duration: 3 + i * 0.45, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
          q("[data-panel-float]").forEach((el, i) => {
            gsap.to(el, { y: -10, duration: 3.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
          gsap.from(q("[data-docs-visual] [data-float]"), {
            autoAlpha: 0,
            scale: 0.9,
            duration: 1.4,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: q("[data-docs-visual]")[0], start: "top 80%" },
          });

          if (!desktop || !isFinePointer()) return;

          // ---- Intro pointer parallax -----------------------------------
          const visual = q<HTMLElement>("[data-docs-visual]")[0];
          if (visual) {
            const layers = gsap.utils.toArray<HTMLElement>(visual.querySelectorAll("[data-float]")).map((el) => ({
              d: Number(el.dataset.float) || 1,
              x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
            }));
            const move = (e: PointerEvent) => {
              const r = visual.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              layers.forEach((l) => l.x(nx * 18 * l.d));
            };
            visual.addEventListener("pointermove", move);
            cleanups.push(() => visual.removeEventListener("pointermove", move));
          }

          // ---- Service cards: glow, tilt, drift --------------------------
          q<HTMLElement>("[data-svc-card]").forEach((card) => {
            const tilt = card.querySelector<HTMLElement>("[data-svc-tilt]");
            const vis = card.querySelector<HTMLElement>("[data-svc-visual]");
            if (!tilt) return;
            const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
            const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
            const vx = vis ? gsap.quickTo(vis, "x", { duration: 1, ease: "power3.out" }) : null;
            const vy = vis ? gsap.quickTo(vis, "y", { duration: 1, ease: "power3.out" }) : null;

            const move = (e: PointerEvent) => {
              const r = tilt.getBoundingClientRect();
              const px = e.clientX - r.left;
              const py = e.clientY - r.top;
              tilt.style.setProperty("--mx", `${px}px`);
              tilt.style.setProperty("--my", `${py}px`);
              const nx = px / r.width - 0.5;
              const ny = py / r.height - 0.5;
              ry(nx * 6);
              rx(-ny * 6);
              vx?.(nx * -12);
              vy?.(ny * -8);
            };
            const leave = () => {
              rx(0);
              ry(0);
              vx?.(0);
              vy?.(0);
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
            });
          });
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
