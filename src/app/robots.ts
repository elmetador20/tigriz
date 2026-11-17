import type { MetadataRoute } from "next";
import { contactConfig } from "@/config/contact";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    // The sitemap needs an absolute URL — listed once NEXT_PUBLIC_SITE_URL is set.
    ...(contactConfig.siteUrl ? { sitemap: `${contactConfig.siteUrl}/sitemap.xml` } : {}),
  };
}
