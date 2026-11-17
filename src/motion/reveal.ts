"use client";

import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Standard scroll reveals shared by every section. Call inside a section's
 * useGSAP callback so triggers are cleaned up with the section.
 *
 *  [data-r="left"]    slides in from the left (eyebrows)
 *  [data-r="lines"]   heading; children [data-r-line] rise out of a mask
 *  [data-r="up"]      fades and rises into place
 *  [data-r="stagger"] children [data-r-item] rise in sequence
 *  [data-r="draw"]    SVG shapes with pathLength=1 draw their stroke
 *  [data-r="clip"]    unclips upward; child [data-r-zoom] settles from a slight zoom
 *
 * Transforms are cleared afterwards so CSS hover transforms keep working.
 */
export function setupReveals(root: HTMLElement) {
  if (prefersReducedMotion()) return;
  const q = gsap.utils.selector(root);
  const start = "top 86%";

  q("[data-r='left']").forEach((el) => {
    gsap.from(el, { x: -28, autoAlpha: 0, duration: 1.1, clearProps: "transform", scrollTrigger: { trigger: el, start } });
  });

  q("[data-r='lines']").forEach((el) => {
    gsap.from(el.querySelectorAll("[data-r-line]"), {
      yPercent: 110,
      rotate: 2,
      duration: 1.3,
      stagger: 0.12,
      scrollTrigger: { trigger: el, start },
    });
  });

  q("[data-r='up']").forEach((el) => {
    gsap.from(el, { y: 36, autoAlpha: 0, duration: 1.2, clearProps: "transform", scrollTrigger: { trigger: el, start } });
  });

  q("[data-r='stagger']").forEach((el) => {
    gsap.from(el.querySelectorAll("[data-r-item]"), {
      y: 40,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.1,
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 82%" },
    });
  });

  q("[data-r='draw']").forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll("[pathLength]"),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    );
  });

  q("[data-r='clip']").forEach((el, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0% round 20px)" },
      { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.5, ease: "expo.inOut", delay: (i % 3) * 0.12 },
    ).from(el.querySelectorAll("[data-r-zoom]"), { scale: 1.14, duration: 1.8, ease: "expo.out" }, "<0.1");
  });
}
