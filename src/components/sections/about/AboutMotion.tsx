"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/motion/gsap";
import { setupReveals } from "@/motion/reveal";

type Props = { children: ReactNode; id: string; labelledBy: string; className?: string };

/**
 * Motion for the About section.
 *  1. Eyebrow from the left, heading line by line, copy upward (setupReveals)
 *  2. Venn: circles slide together → borders draw → glow and core appear →
 *     labels fade in; particles orbit and travel between centres while on screen
 *  3. Principle cards stagger in (setupReveals)
 *  4. Editorial blocks unclip; code tokens "type" in
 * All of it is skipped under prefers-reduced-motion; gsap.matchMedia and
 * useGSAP revert every tween and ScrollTrigger on unmount.
 */
export function AboutMotion({ children, id, labelledBy, className }: Props) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const q = gsap.utils.selector(root);
      setupReveals(root);

      const mm = gsap.matchMedia();
      mm.add(
        {
          wide: "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 639px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { wide } = ctx.conditions as { wide: boolean; narrow: boolean };
          const svg = q<SVGSVGElement>(`svg[data-venn='${wide ? "h" : "v"}']`)[0];
          if (!svg) return;
          const s = gsap.utils.selector(svg);
          const d = svg.dataset;
          const A = { x: Number(d.ax), y: Number(d.ay) };
          const B = { x: Number(d.bx), y: Number(d.by) };

          // ---- Venn entrance --------------------------------------------
          const offset = wide ? { a: { x: -70 }, b: { x: 70 } } : { a: { y: -50 }, b: { y: 50 } };
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: svg, start: "top 78%" },
          });
          tl.from(s("[data-vn-enter='a']"), { ...offset.a, autoAlpha: 0, duration: 1.6 }, 0)
            .from(s("[data-vn-enter='b']"), { ...offset.b, autoAlpha: 0, duration: 1.6 }, 0)
            .fromTo(s("[data-vn-stroke]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.15 }, 0.2)
            .from(s("[data-vn-glowwrap]"), { autoAlpha: 0, duration: 1.4, ease: "power2.out" }, 1.1)
            .from(s("[data-vn-core]"), { autoAlpha: 0, scale: 0.7, svgOrigin: `${(A.x + B.x) / 2} ${(A.y + B.y) / 2}`, duration: 1.6 }, 1.2)
            .from(s("[data-vn-labels] > g"), { autoAlpha: 0, y: 10, duration: 1, stagger: 0.12, clearProps: "opacity,visibility,transform" }, 1.3)
            .from(s("[data-vn-particles]"), { autoAlpha: 0, duration: 1 }, 1.6);

          // ---- Particles (play only while visible) -----------------------
          const loop = gsap.timeline({ paused: true });
          s<SVGGElement>("[data-vn-orbit]").forEach((g) => {
            const a = g.dataset.vnOrbit === "a";
            loop.to(g, { rotation: a ? 360 : -360, svgOrigin: `${g.dataset.cx} ${g.dataset.cy}`, duration: a ? 24 : 30, ease: "none", repeat: -1 }, 0);
          });
          s("[data-vn-link]").forEach((dot, i) => {
            const there = i % 2 === 0;
            const from = there ? A : B;
            const to = there ? B : A;
            const hop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: i * 2.1 });
            hop
              .fromTo(dot, { attr: { cx: from.x, cy: from.y } }, { attr: { cx: to.x, cy: to.y }, duration: 3.2, ease: "sine.inOut" }, 0)
              .fromTo(dot, { opacity: 0 }, { opacity: 0.9, duration: 0.6, ease: "none" }, 0)
              .to(dot, { opacity: 0, duration: 0.6, ease: "none" }, 2.6);
            loop.add(hop, 0);
          });
          ScrollTrigger.create({
            trigger: svg,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          });

          // ---- Decorative rule: a light travels between the verticals ---
          gsap.fromTo(
            q("[data-about-rule-dot]"),
            { left: "0%" },
            { left: "100%", duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
          gsap.from(q("[data-about-rule]"), {
            autoAlpha: 0,
            scaleX: 0.6,
            transformOrigin: "0% 50%",
            duration: 1.2,
            scrollTrigger: { trigger: q("[data-about-rule]")[0], start: "top 90%" },
          });

          // ---- Editorial: code tokens type in ----------------------------
          const tokens = q("[data-eng-token]");
          if (tokens.length) {
            gsap.from(tokens, {
              scaleX: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.035,
              scrollTrigger: { trigger: tokens[0], start: "top 88%" },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}
