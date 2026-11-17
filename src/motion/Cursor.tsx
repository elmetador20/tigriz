"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";

const INTERACTIVE = "a, button, [data-cursor]";

/**
 * Decorative trailing ring for desktop mouse users. The native cursor is
 * never hidden, so nothing depends on this; it is skipped on touch
 * devices and under reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const r = ring.current!;
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set(r, { x: e.clientX, y: e.clientY });
        gsap.to(r, { autoAlpha: 1, duration: 0.3 });
      }
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element).closest?.(INTERACTIVE);
      gsap.to(r, {
        scale: hit ? 1.7 : 1,
        borderColor: hit ? "rgba(183,240,0,0.85)" : "rgba(245,247,250,0.28)",
        duration: 0.4,
        ease: "expo.out",
      });
    };
    const leave = () => {
      shown = false;
      gsap.to(r, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(r);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="invisible absolute top-0 left-0 -mt-5 -ml-5 size-10 rounded-full border border-[rgba(245,247,250,0.28)] opacity-0"
      />
    </div>
  );
}
