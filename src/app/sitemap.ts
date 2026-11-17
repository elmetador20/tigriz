import type { MetadataRoute } from "next";
import { contactConfig } from "@/config/contact";

const routes = ["/", "/about", "/consultancy", "/technologies", "/approach", "/contact"] as const;

/** Entries require an absolute URL, so the list stays empty until NEXT_PUBLIC_SITE_URL is set. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!contactConfig.siteUrl) return [];
  return routes.map((path) => ({
    url: `${contactConfig.siteUrl}${path === "/" ? "/" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
