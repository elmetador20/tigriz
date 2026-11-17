"use client";

import { gsap } from "./gsap";

/**
 * Scroll-driven step timelines (DPR components, engineering process).
 *
 * Markup contract inside `root`:
 *   [data-tl]            timeline container
 *     [data-tl-fill]     progress line (scaleX when horizontal, scaleY when vertical)
 *     [data-tl-step]     each step; receives data-on / data-current
 * Styling lives in globals.css (.tl-step / .tl-dot / .tl-label).
 *
 * Call inside a gsap.matchMedia / useGSAP context so triggers are reverted.
 */

function stepper(steps: HTMLElement[]) {
  return (progress: number) => {
    const n = Math.max(1, steps.length - 1);
    let current = -1;
    steps.forEach((el, i) => {
      const on = progress > 0.002 && progress >= i / n - 0.001;
      el.dataset.on = String(on);
      if (on) current = i;
    });
    steps.forEach((el, i) => (el.dataset.current = String(i === current)));
  };
}

/** Animate every timeline in `root`. `horizontal` should match the layout breakpoint. */
export function setupStepTimelines(root: HTMLElement, horizontal: boolean) {
  const timelines = Array.from(root.querySelectorAll<HTMLElement>("[data-tl]"));
  timelines.forEach((tl) => {
    const steps = Array.from(tl.querySelectorAll<HTMLElement>("[data-tl-step]"));
    const fill = tl.querySelector<HTMLElement>("[data-tl-fill]");
    if (!fill || !steps.length) return;
    const set = stepper(steps);
    tl.dataset.tlArmed = "";
    set(-1);
    gsap.set(fill, horizontal ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 });
    gsap.to(fill, {
      [horizontal ? "scaleX" : "scaleY"]: 1,
      ease: "none",
      // Step state follows the drawn line itself (including scrub smoothing).
      onUpdate() {
        set(this.progress());
      },
      onComplete() {
        set(1);
      },
      scrollTrigger: {
        trigger: tl,
        start: horizontal ? "top 70%" : "top 75%",
        end: horizontal ? "bottom 45%" : "bottom 60%",
        scrub: 0.6,
      },
    });
  });
  return () => timelines.forEach((tl) => delete tl.dataset.tlArmed);
}

/** Reduced motion: show every timeline as complete. */
export function completeStepTimelines(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-tl]").forEach((tl) => {
    stepper(Array.from(tl.querySelectorAll<HTMLElement>("[data-tl-step]")))(1);
    const fill = tl.querySelector("[data-tl-fill]");
    if (fill) gsap.set(fill, { scaleX: 1, scaleY: 1 });
  });
}
