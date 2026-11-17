"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, isFinePointer, prefersReducedMotion } from "@/motion/gsap";

/**
 * Motion layer for the hero. Renders the <section>; the server-built
 * markup inside is targeted through data attributes.
 *
 * Entrance (seconds):
 *  0.00 background            0.25 nav (Nav.tsx)       0.45 label
 *  0.60 / 0.78 / 0.96 Ideas. Systems. Growth.          1.35 paragraph
 *  1.55 CTAs                  1.80 capability cards
 *  0.90 → 2.80 AT monogram + geometry assemble, wave reaches full strength
 *  then: monogram float loop
 */
export function HeroMotion({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      gsap.set(root, { autoAlpha: 1 });
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);
      const outline = q("[data-hero-mark] [data-at='outline'] path");
      const piece = (k: string) => q(`[data-hero-mark] [data-at='${k}']`);
      const cards = q("[data-hero-card]");

      // ---- Entrance ----------------------------------------------------
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(q("[data-hero-bg]"), { autoAlpha: 0, duration: 1.2, ease: "power2.out" }, 0)
        .from(q("[data-hero-wave]"), { autoAlpha: 0, duration: 2.5, ease: "power1.inOut" }, 0.3)

        // Typography
        .from(q("[data-hero-label-line]"), { scaleX: 0, duration: 1 }, 0.45)
        .from(q("[data-hero-label]"), { autoAlpha: 0, x: -12, duration: 1 }, 0.5)
        .from(q("[data-hero-word]"), { yPercent: 112, duration: 1.35, stagger: 0.18 }, 0.6)
        .fromTo(
          q("[data-hero-word]")[2] ?? [],
          { textShadow: "0 0 0px rgba(183,240,0,0)" },
          { textShadow: "0 0 48px rgba(183,240,0,0.38)", duration: 0.9, ease: "power2.out", yoyo: true, repeat: 1 },
          1.35,
        )
        .from(q("[data-hero-copy]"), { autoAlpha: 0, y: 26, duration: 1.2 }, 1.35)
        .from(q("[data-hero-cta]"), { autoAlpha: 0, y: 22, duration: 1.1, stagger: 0.1 }, 1.55)
        .from(cards, { autoAlpha: 0, y: 36, duration: 1.2, stagger: 0.12, clearProps: "transform,opacity,visibility" }, 1.8)
        .from(q("[data-hero-scroll], [data-hero-step]"), { autoAlpha: 0, y: 8, duration: 0.9, stagger: 0.04 }, 2.0)

        // Signature visual
        .fromTo(q("[data-hero-geo] path"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.04 }, 0.9)
        .fromTo(outline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.12 }, 1.0)
        .fromTo(q("[data-hero-arc]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1.6)
        .from(q("[data-hero-geo-fade]"), { autoAlpha: 0, duration: 1.2, stagger: 0.08 }, 1.7)
        .from(piece("a"), { autoAlpha: 0, y: 12, duration: 1.2 }, 2.0)
        .from(piece("t-bar"), { autoAlpha: 0, x: 18, duration: 1.2 }, 2.1)
        .from(piece("t-stem"), { autoAlpha: 0, y: -16, duration: 1.2 }, 2.15)
        .from(piece("swoosh"), { scaleX: 0, transformOrigin: "0% 100%", duration: 1.1, ease: "expo.inOut" }, 2.2)
        .to(outline, { autoAlpha: 0.18, duration: 1 }, 2.7)
        .from(q("[data-hero-tag]"), { autoAlpha: 0, y: 8, duration: 0.9, stagger: 0.08 }, 2.4);

      // ---- Idle float on the monogram (after it has assembled) ---------
      const float = gsap.to(q("[data-hero-float]"), {
        y: -12,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });
      tl.call(() => void float.play(), undefined, 2.8);

      // ---- Scroll: content drifts and dims as the hero leaves ----------
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("[data-hero-parallax]"), { yPercent: -8, autoAlpha: 0.2, ease: "none", scrollTrigger: { ...st } });
      gsap.to(q("[data-hero-visual-wrap]"), { yPercent: -14, ease: "none", scrollTrigger: { ...st } });

      // Pause the float while the hero is off screen.
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        onLeave: () => void float.pause(),
        onEnterBack: () => void (tl.progress() === 1 && float.play()),
      });

      // ---- Pointer: layered parallax + tilt (desktop mouse only) -------
      if (!isFinePointer()) return;
      const layers = q<HTMLElement>("[data-depth]").map((el) => {
        const d = Number(el.dataset.depth) || 0;
        return {
          d,
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        };
      });
      const mark = q("[data-hero-mark]")[0];
      const rx = gsap.quickTo(mark, "rotationX", { duration: 1.2, ease: "power3.out" });
      const ry = gsap.quickTo(mark, "rotationY", { duration: 1.2, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * 22 * l.d);
          l.y(ny * 16 * l.d);
        });
        ry(nx * 12);
        rx(-ny * 8);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope },
  );

  // Recalculate trigger positions after web fonts settle.
  useGSAP(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return (
    <section ref={scope} id={id} data-reveal className={className}>
      {children}
    </section>
  );
}
