"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { Magnetic } from "@/motion/Magnetic";
import { gsap, useGSAP, prefersReducedMotion } from "@/motion/gsap";
import { lenisStore } from "@/motion/SmoothScroll";
import { nav, navCta, verticals } from "@/content/site";

/** Seconds after load at which the nav enters (keeps it in step with the hero timeline). */
const NAV_DELAY = 0.25;

export function Nav() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up; blurred navy background once past the top.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active route: exact match for Home, prefix match for the inner pages.
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  // Close the mobile menu whenever the route changes (including browser back/forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Pause page scrolling while the mobile menu is open; Escape closes it.
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      lenisStore.current?.stop();
      html.style.overflow = "hidden";
    } else {
      lenisStore.current?.start();
      html.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Entrance: bar fades and slides into place, then the logo assembles.
  useGSAP(
    () => {
      gsap.set(root.current, { autoAlpha: 1 });
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ delay: NAV_DELAY });
      tl.from("[data-nav-bar]", { y: -24, autoAlpha: 0, duration: 1.1 })
        .from("[data-at='a']", { yPercent: 40, autoAlpha: 0, duration: 0.9 }, "<0.15")
        .from("[data-at='t-bar']", { xPercent: 25, autoAlpha: 0, duration: 0.9 }, "<0.08")
        .from("[data-at='t-stem']", { yPercent: -40, autoAlpha: 0, duration: 0.9 }, "<0.05")
        .from("[data-at='swoosh']", { scaleX: 0, transformOrigin: "0% 100%", duration: 0.8 }, "<0.2")
        .from("[data-nav-item]", { y: -10, autoAlpha: 0, stagger: 0.05, duration: 0.8 }, "<0.05");
    },
    { scope: root },
  );

  // Mobile panel open/close.
  useGSAP(
    () => {
      const p = panel.current!;
      const reduce = prefersReducedMotion();
      if (open) {
        gsap.set(p, { display: "flex" });
        gsap.fromTo(p, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.7, ease: "expo.inOut" });
        gsap.fromTo(
          p.querySelectorAll("[data-menu-item]"),
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.05, duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.25 },
        );
      } else if (p.style.display === "flex") {
        gsap.to(p, {
          clipPath: "inset(0 0 100% 0)",
          duration: reduce ? 0 : 0.5,
          ease: "expo.inOut",
          onComplete: () => void gsap.set(p, { display: "none" }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <>
      <header
        ref={root}
        data-reveal
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          data-nav-bar
          className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled && !open ? "border-line bg-ink-900/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between gap-6">
            <Link href="/" aria-label="Arabian TIGRIZ — home" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
              <Logo />
            </Link>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {nav.map((item) => (
                <li key={item.href} data-nav-item>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`group relative inline-flex px-3.5 py-2 text-sm whitespace-nowrap transition-colors duration-300 hover:text-fg xl:px-4 ${isActive(item.href) ? "text-fg" : "text-muted"}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-3.5 bottom-1 h-px bg-lime transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 xl:inset-x-4 ${isActive(item.href) ? "origin-left scale-x-100" : "origin-right scale-x-0"}`} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div data-nav-item className="hidden sm:block">
                <Magnetic>
                  <Link
                    href={navCta.href}
                    className="group inline-flex h-11 items-center gap-3 rounded-full border border-line-strong bg-ink-800/60 pr-1.5 pl-5 text-sm font-medium whitespace-nowrap text-fg transition-colors duration-300 hover:border-lime/60"
                  >
                    {navCta.label}
                    <span className="grid size-8 place-items-center rounded-full bg-lime text-ink-900">
                      <ArrowSwap className="size-4" />
                    </span>
                  </Link>
                </Magnetic>
              </div>
              <button
                type="button"
                data-nav-item
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong text-fg lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Outside <header>: its transform would otherwise contain this fixed panel. */}
      <div
        ref={panel}
        id="mobile-menu"
        className="fixed inset-0 z-40 hidden flex-col bg-ink-900 pt-[96px] pb-10 lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-x relative flex flex-1 flex-col justify-between gap-8 overflow-y-auto">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line">
                <Link
                  data-menu-item
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 font-display text-[clamp(2rem,9vw,3rem)] font-medium tracking-tight ${isActive(item.href) ? "text-lime" : "text-fg"}`}
                >
                  {item.label}
                  <span className="label-mono text-subtle">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden">
            <div data-menu-item className="flex flex-col gap-6">
              <p className="label-mono text-muted">
                {verticals.consultancy.label} &amp; {verticals.technologies.label}
              </p>
              <Link
                href={navCta.href}
                onClick={() => setOpen(false)}
                className="group inline-flex h-14 items-center justify-between rounded-full bg-lime pr-2 pl-6 font-medium text-ink-900"
              >
                {navCta.label}
                <span className="grid size-10 place-items-center rounded-full bg-ink-900 text-lime">
                  <ArrowSwap className="size-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
