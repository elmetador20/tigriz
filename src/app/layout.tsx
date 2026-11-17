import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { Cursor } from "@/motion/Cursor";
import { brand } from "@/content/site";
import { contactConfig } from "@/config/contact";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${brand.name} — ${brand.tagline.join(" ")}`;
const description = `${brand.name} is a multidisciplinary consulting and technology company. ${brand.statement}`;

export const metadata: Metadata = {
  ...(contactConfig.siteUrl ? { metadataBase: new URL(contactConfig.siteUrl) } : {}),
  category: "business",
  creator: brand.name,
  publisher: brand.name,
  title: { default: title, template: `%s · ${brand.name}` },
  description,
  applicationName: brand.name,
  keywords: [
    "Arabian TIGRIZ",
    "consultancy",
    "pitch decks",
    "company profiles",
    "detailed project reports",
    "business proposals",
    "software engineering",
    "AI and automation",
    "data and analytics",
    "cloud and infrastructure",
    "enterprise systems",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    title,
    description,
    siteName: brand.name,
  },
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#061327",
  colorScheme: "dark",
};

// Runs before paint: hides [data-reveal] elements only when motion is allowed,
// with a safety timeout so content never stays hidden if JS stalls.
const motionGate = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){d.classList.remove('js-motion')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="min-h-svh">
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-lime px-5 py-3 font-medium text-ink-900 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
