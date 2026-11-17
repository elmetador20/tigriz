import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { ExplorePages } from "@/components/sections/home/ExplorePages";
import { FinalCta } from "@/components/sections/closing/FinalCta";
import { Projects } from "@/components/sections/proof/Projects";
import { Testimonials } from "@/components/sections/proof/Testimonials";
import { contactConfig, office } from "@/config/contact";
import { brand, verticals } from "@/content/site";

/** Organization structured data — verified facts only (no phone or ratings). */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  description: `${brand.name} is a multidisciplinary consulting and technology company. ${brand.statement}`,
  slogan: brand.tagline.join(" "),
  knowsAbout: [...verticals.consultancy.services, ...verticals.technologies.services],
  ...(contactConfig.siteUrl ? { url: contactConfig.siteUrl, logo: `${contactConfig.siteUrl}/icon.svg` } : {}),
  ...(contactConfig.email ? { email: contactConfig.email } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${office.address.street}, ${office.address.district}`,
    addressLocality: office.address.city,
    postalCode: office.address.postalCode,
    addressCountry: office.address.countryCode,
  },
  ...(contactConfig.social.length ? { sameAs: contactConfig.social.map((s) => s.url) } : {}),
};

export const metadata: Metadata = contactConfig.siteUrl ? { alternates: { canonical: "/" } } : {};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <ExplorePages />
      <Projects />
      <Testimonials />
      <FinalCta />
    </>
  );
}
