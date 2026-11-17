import type { Metadata } from "next";
import { contactConfig } from "@/config/contact";

/** Per-page metadata: title (uses the layout's "%s · Arabian TIGRIZ" template), description and canonical path. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    ...(contactConfig.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: { title, description, ...(contactConfig.siteUrl ? { url: path } : {}) },
    twitter: { title, description },
  };
}
