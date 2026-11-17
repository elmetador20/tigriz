import { ImageResponse } from "next/og";
import { AT_PATHS } from "@/components/brand/AtMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: AT monogram on brand navy. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#061327" }}>
        <svg width="140" height="65" viewBox="0 -2 204 94">
          <path d={AT_PATHS.a} fill="#d6dce5" />
          <path d={AT_PATHS.swoosh} fill="#b7f000" />
          <path d={AT_PATHS.tBar} fill="#ffffff" />
          <path d={AT_PATHS.tStem} fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
