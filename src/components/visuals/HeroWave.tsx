"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Canvas-only visual: no SSR, loaded after the critical markup.
const ParticleWave = dynamic(() => import("./ParticleWave"), { ssr: false });

/** Lazily loaded particle wave (hero background, About editorial block). */
export function HeroWave(props: ComponentProps<typeof ParticleWave>) {
  return <ParticleWave {...props} />;
}
