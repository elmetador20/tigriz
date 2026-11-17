"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Fade particles toward the left edge (keeps hero text calm). */
  fadeLeft?: boolean;
  /** Horizon as a fraction of canvas height. */
  horizon?: number;
  /** Vanishing point as a fraction of canvas width. */
  vanishX?: number;
};

type Layer = {
  /** Hue ramp from near rows to far rows. */
  near: [number, number, number];
  far: [number, number, number];
  lift: number; // vertical offset in world units
  amp: number; // wave amplitude
  phase: number;
  speed: number;
  alpha: number;
  mesh: boolean; // draw connecting lines
};

const LIME: [number, number, number] = [183, 240, 0];
const LIME_DEEP: [number, number, number] = [120, 190, 30];
const CYAN: [number, number, number] = [41, 184, 212];

const LAYERS: Layer[] = [
  // Back layer: cyan, higher and calmer — depth behind the main wave.
  { near: CYAN, far: [30, 120, 160], lift: 0.42, amp: 0.16, phase: 1.7, speed: 0.6, alpha: 0.55, mesh: false },
  // Main layer: lime → cyan into the distance, with the particle mesh.
  { near: LIME, far: CYAN, lift: 0, amp: 0.22, phase: 0, speed: 1, alpha: 1, mesh: true },
  // Front accent: sparse, bright, low.
  { near: LIME, far: LIME_DEEP, lift: -0.18, amp: 0.12, phase: 3.1, speed: 1.3, alpha: 0.5, mesh: false },
];

const HUES = 5; // colour steps from near to far
const ALPHAS = 8; // alpha buckets

/**
 * Perspective particle terrain that climbs toward the top-right — a
 * "growth" curve made of thousands of points, with faint connecting
 * lines on the main layer. Canvas 2D, batched by colour/alpha so each
 * frame is a few dozen fill/stroke calls.
 *
 * - Density scales with viewport width (fewer points on mobile).
 * - Pauses offscreen and in hidden tabs; DPR capped.
 * - prefers-reduced-motion: renders a single still frame.
 */
export default function ParticleWave({ className, fadeLeft = true, horizon: horizonRatio, vanishX }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let layers = LAYERS;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, k: 0, tk: 0 };

    const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    let styles: string[][][] = []; // [layer][hue][alpha]
    const buildStyles = () => {
      styles = layers.map((L) =>
        Array.from({ length: HUES }, (_, hi) => {
          const c = mix(L.near, L.far, hi / (HUES - 1));
          return Array.from({ length: ALPHAS }, (_, ai) => `rgba(${c[0]},${c[1]},${c[2]},${(((ai + 1) / ALPHAS) * L.alpha).toFixed(3)})`);
        }),
      );
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 640 ? 1.5 : 1.75);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = w < 640;
      const mid = w < 1100;
      cols = small ? 54 : mid ? 90 : 120;
      rows = small ? 20 : mid ? 28 : 34;
      layers = small ? LAYERS.slice(0, 2) : LAYERS;
      buildStyles();
      if (!running) draw(reduce ? 6 : (performance.now() - start) / 1000);
    };

    // World → screen
    const X_MIN = -1.9;
    const X_MAX = 1.9;
    const Z_NEAR = 1.1;
    const Z_FAR = 6.5;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;
      pointer.k += (pointer.tk - pointer.k) * 0.05;

      const small = w < 640;
      const f = Math.min(h * 0.95, w * 0.75);
      const horizon = h * (horizonRatio ?? (small ? 0.3 : 0.4));
      const vx = w * (vanishX ?? (small ? 0.5 : 0.6)) + (pointer.x - 0.5) * 30 * pointer.k;
      const camH = 1 + (pointer.y - 0.5) * 0.12 * pointer.k;
      const pr = Math.max(110, w * 0.11);
      const px = pointer.x * w;
      const py = pointer.y * h;

      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        const dots: Path2D[][] = Array.from({ length: HUES }, () => Array.from({ length: ALPHAS }, () => new Path2D()));
        const lines: Path2D[] = Array.from({ length: HUES }, () => new Path2D());
        const tt = t * L.speed;

        for (let r = 0; r < rows; r++) {
          const v = r / (rows - 1); // 0 near → 1 far
          const z = Z_NEAR + (Z_FAR - Z_NEAR) * Math.pow(v, 1.15);
          const hue = Math.min(HUES - 1, Math.floor(v * HUES));
          const depthA = (1 - v) * 0.85 + 0.15;
          let started = false;

          for (let c = 0; c < cols; c++) {
            const u = c / (cols - 1);
            const x = X_MIN + (X_MAX - X_MIN) * u;
            // Growth: terrain rises toward the right, waves roll through it.
            const rise = 0.36 * Math.max(0, x + 0.5) ** 1.4;
            const y =
              L.lift +
              rise +
              L.amp *
                (Math.sin(x * 1.7 + tt * 0.55 + z * 0.55 + L.phase) * 0.62 +
                  Math.sin(x * 0.8 - tt * 0.35 + z * 1.25 + L.phase * 0.5) * 0.38);

            const sx = vx + (x * f) / z;
            let sy = horizon + ((camH - y) * f) / z;
            if (sx < -20 || sx > w + 20) {
              started = false;
              continue;
            }

            if (pointer.k > 0.01) {
              const dx = sx - px;
              const dy = sy - py;
              const d2 = dx * dx + dy * dy;
              if (d2 < pr * pr) {
                const k = 1 - Math.sqrt(d2) / pr;
                sy -= k * k * 34 * pointer.k;
              }
            }

            // Keep the text column calm: fade the far-left on wide screens.
            const leftFade = small || !fadeLeft ? 1 : Math.min(1, Math.max(0, (sx / w - 0.08) / 0.4));
            const a = depthA * leftFade;
            if (a <= 0.02) {
              started = false;
              continue;
            }

            const ai = Math.min(ALPHAS - 1, Math.floor(a * ALPHAS));
            const s = (1.9 / z) * (small ? 1.6 : 2.1) + 0.35;
            dots[hue][ai].rect(sx - s / 2, sy - s / 2, s, s);

            if (L.mesh && r % 2 === 0) {
              if (started) lines[hue].lineTo(sx, sy);
              else lines[hue].moveTo(sx, sy);
              started = true;
            }
          }
        }

        if (L.mesh) {
          ctx.lineWidth = 0.6;
          for (let hi = 0; hi < HUES; hi++) {
            const c = mix(L.near, L.far, hi / (HUES - 1));
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(0.16 * (1 - hi / HUES) + 0.03).toFixed(3)})`;
            ctx.stroke(lines[hi]);
          }
        }
        for (let hi = 0; hi < HUES; hi++) {
          for (let ai = 0; ai < ALPHAS; ai++) {
            ctx.fillStyle = styles[li][hi][ai];
            ctx.fill(dots[hi][ai]);
          }
        }
      }
    };

    const loop = () => {
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = (e.clientY - r.top) / r.height;
      if (pointer.tk === 0) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.tk = 1;
    };
    const onLeave = () => (pointer.tk = 0);
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    resize();
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fadeLeft, horizonRatio, vanishX]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
