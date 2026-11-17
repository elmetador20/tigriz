"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "./gsap";

/** Subtly pulls its child toward the pointer. No-op on touch or reduced motion. */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (!isFinePointer() || prefersReducedMotion()) return;
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });

      const move = (e: PointerEvent) => {
        const b = el.getBoundingClientRect();
        x((e.clientX - (b.left + b.width / 2)) * strength);
        y((e.clientY - (b.top + b.height / 2)) * strength);
      };
      const reset = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
}
