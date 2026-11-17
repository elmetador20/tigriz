"use client";

import { ArrowUp } from "lucide-react";
import { lenisStore } from "@/motion/SmoothScroll";

/** Back-to-top: smooth via Lenis when active, instant under reduced motion. */
export function BackToTop() {
  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisStore.current && !reduce) lenisStore.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };
  return (
    <button
      type="button"
      onClick={go}
      className="group inline-flex items-center gap-3 rounded-full border border-line-strong py-2 pr-2 pl-4 font-mono text-[0.62rem] tracking-[0.2em] text-muted uppercase transition-colors duration-300 hover:border-lime/60 hover:text-fg"
    >
      Back to top
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-ink-700 text-lime">
        <ArrowUp aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-[140%]" />
        <ArrowUp aria-hidden className="absolute size-4 translate-y-[140%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
      </span>
    </button>
  );
}
