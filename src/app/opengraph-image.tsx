import { ImageResponse } from "next/og";
import { AT_PATHS } from "@/components/brand/AtMark";
import { brand } from "@/content/site";

export const alt = "Arabian TIGRIZ — Ideas. Systems. Growth. Consultancy & Technologies.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share image generated from brand tokens (no external assets). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 90%, rgba(183,240,0,0.22), rgba(6,19,39,0) 45%), #061327",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="150" height="70" viewBox="0 -2 204 94">
            <path d={AT_PATHS.a} fill="#d6dce5" />
            <path d={AT_PATHS.swoosh} fill="#b7f000" />
            <path d={AT_PATHS.tBar} fill="#ffffff" />
            <path d={AT_PATHS.tStem} fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>{brand.wordmark}</span>
            <span style={{ fontSize: 18, letterSpacing: 6, color: "#a7b4c8", marginTop: 6 }}>{brand.descriptor.toUpperCase()}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            <span>Ideas.&nbsp;Systems.&nbsp;</span>
            <span style={{ color: "#b7f000" }}>Growth.</span>
          </div>
          <span style={{ fontSize: 30, color: "#a7b4c8", marginTop: 28, maxWidth: 900 }}>{brand.statement}</span>
        </div>
      </div>
    ),
    size,
  );
}
