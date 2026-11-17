"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/** Shared handle so UI (e.g. the mobile menu) can pause scrolling. */
export const lenisStore: { current: Lenis | null } = { current: null };

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
      // Kill any running smooth scroll when a link leads to another page.
      stopInertiaOnNavigate: true,
      touchMultiplier: 1,
    });

    lenisStore.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  // After a client-side page change: re-measure the new page so Lenis and
  // ScrollTrigger positions match its height and layout.
  const pathname = usePathname();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisStore.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
