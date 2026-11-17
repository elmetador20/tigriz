/**
 * Consultancy vertical copy — Company Profile 2026, pp. 3–5.
 * Service names and meanings are kept exactly as in the profile.
 */

export type MockupKind =
  | "slides"
  | "profile"
  | "report"
  | "proposal"
  | "presentation"
  | "brochure"
  | "social"
  | "collateral";

/** Card treatments: A typography-led, B document/mockup-led, C illustration-led. */
export type Treatment = "type" | "mockup" | "graphic";

export const consultancyIntro = {
  eyebrow: "01 / Consultancy",
  heading: ["Structuring businesses", "for greater opportunities."],
  description:
    "We help organisations communicate their vision, document their plans, build a strong market presence and create high-quality collateral that supports growth, investment and strategic partnerships.",
} as const;

export const services: {
  number: string;
  title: string;
  description: string;
  visual: MockupKind;
  treatment: Treatment;
  href: string;
}[] = [
  {
    number: "01",
    title: "Pitch Decks",
    description: "Compelling investor and business presentations that communicate your story, opportunity and potential.",
    visual: "slides",
    treatment: "mockup",
    href: "#documentation",
  },
  {
    number: "02",
    title: "Company Profiles",
    description: "Professional profiles that showcase your business, capabilities, infrastructure and vision with clarity.",
    visual: "profile",
    treatment: "type",
    href: "#documentation",
  },
  {
    number: "03",
    title: "Detailed Project Reports",
    description: "Comprehensive documentation for planning, financing and stakeholder communication across industries.",
    visual: "report",
    treatment: "graphic",
    href: "#dpr",
  },
  {
    number: "04",
    title: "Business Proposals",
    description: "Well-structured proposals tailored to your offerings, client requirements and commercial objectives.",
    visual: "proposal",
    treatment: "mockup",
    href: "#documentation",
  },
  {
    number: "05",
    title: "Corporate Presentations",
    description: "Engaging presentations for meetings, product launches, partnership discussions and internal communication.",
    visual: "presentation",
    treatment: "graphic",
    href: "#brand",
  },
  {
    number: "06",
    title: "Brochures & Catalogues",
    description: "Visually compelling brochures and catalogues that showcase your products, services and capabilities.",
    visual: "brochure",
    treatment: "mockup",
    href: "#brand",
  },
  {
    number: "07",
    title: "Social Media & Marketing Design",
    description: "Social creatives, campaign designs, infographics and brand communication for a strong digital presence.",
    visual: "social",
    treatment: "graphic",
    href: "#brand",
  },
  {
    number: "08",
    title: "Offline Marketing Collateral",
    description: "Standees, posters, flyers, banners and event creatives to support your brand offline.",
    visual: "collateral",
    treatment: "type",
    href: "#brand",
  },
];

export const documentation = {
  eyebrow: "Business Documentation & Advisory",
  heading: ["Business documentation", "& advisory."],
  description:
    "We structure complex information into clear, professional and visually compelling documents that communicate your vision, capabilities and opportunities to the right audience.",
  panels: [
    {
      key: "A",
      title: "Pitch Decks",
      eyebrow: "Ideas that attract capital",
      description:
        "Compelling decks communicating your story, problem, solution, market opportunity and growth potential to investors, partners and stakeholders.",
      includes: ["Investor Pitch Decks", "Startup Fundraising", "Business Opportunity", "Product & Service Decks", "Partnership Management"],
      visual: "slides" as MockupKind,
    },
    {
      key: "B",
      title: "Company Profiles",
      eyebrow: "Clarity and credibility",
      description:
        "Professional profiles that showcase your business, capabilities, infrastructure, vision and market positioning with strong design and clear storytelling.",
      includes: [
        "Corporate Profiles",
        "Overview & Vision",
        "Products & Services",
        "Capabilities & Infrastructure",
        "Leadership & Team",
        "Markets Served",
        "Digital & Print",
      ],
      visual: "profile" as MockupKind,
    },
    {
      key: "C",
      title: "Detailed Project Reports",
      eyebrow: "Planning, financing, execution",
      description:
        "Structured research, analysis and financial information to support project evaluation, funding discussions and stakeholder communication.",
      includes: ["Feasibility", "Market Analysis", "Financial Projections", "Implementation Roadmap", "Risk Analysis"],
      visual: "report" as MockupKind,
    },
    {
      key: "D",
      title: "Business Proposals",
      eyebrow: "Proposals that win business",
      description:
        "Tailored proposals that clearly present your offerings, approach, commercials and value proposition for clients, partners and institutions.",
      includes: ["Corporate", "Service", "Client Project", "Partnership", "Commercial Presentations", "Custom Formats"],
      visual: "proposal" as MockupKind,
    },
  ],
} as const;

export const dprComponents = {
  title: "Typical DPR Components",
  steps: [
    "Executive Summary",
    "Project Background & Concept",
    "Market Analysis",
    "Product / Service Details",
    "Operational Plan",
    "Infrastructure & Technology",
    "Financial Projections",
    "Implementation Roadmap",
    "Risk Analysis & Conclusion",
  ],
} as const;

export type BrandKey = "social" | "corporate" | "offline" | "identity";

export const brandCommunication = {
  eyebrow: "Brand & Marketing Communication",
  heading: ["Building brands through", "impactful visual communication."],
  description:
    "Impactful visual communication that strengthens brand presence, engages audiences and supports your goals across digital and offline channels.",
  previewNote: "Illustrative design previews — not client projects",
  categories: [
    {
      key: "social" as BrandKey,
      number: "01",
      title: "Social Media & Digital Creatives",
      eyebrow: "Engage. Inform. Grow.",
      description: "Visually compelling creatives tailored for your brand, products and campaigns.",
      includes: ["Social Creatives", "Product / Service Campaigns", "Testimonials / Reviews", "Carousels", "Infographics & Data Visualisation"],
    },
    {
      key: "corporate" as BrandKey,
      number: "02",
      title: "Corporate & Business Design",
      eyebrow: "Communication that builds credibility",
      description: "Corporate design material that presents your business with clarity, consistency and impact.",
      includes: ["Corporate Presentations", "Company Profiles", "Brochures", "Product Catalogues", "Business Proposals"],
    },
    {
      key: "offline" as BrandKey,
      number: "03",
      title: "Marketing & Offline Collateral",
      eyebrow: "A stronger impression beyond the screen",
      description: "Creative, print-ready material for events, promotions, client engagement and brand visibility.",
      includes: ["Standees", "Posters", "Flyers", "Banners", "Event / Promotional Material"],
    },
    {
      key: "identity" as BrandKey,
      number: "04",
      title: "Brand Visual Identity Support",
      eyebrow: "Consistent design across touchpoints",
      description: "A cohesive, professional brand identity across digital, print and corporate communication.",
      includes: [
        "Design Systems & Templates",
        "Visual Styling",
        "Typography & Layout",
        "Image Treatment",
        "Editable Source Files",
        "Revisions & Coordination",
      ],
    },
  ],
  impact: [
    { number: "01", title: "Stronger Brand Presence", description: "Build recognition and trust across all channels." },
    { number: "02", title: "Clearer Communication", description: "Present your business with clarity and confidence." },
    { number: "03", title: "Greater Engagement", description: "Reach and engage your target audience." },
    { number: "04", title: "Business Growth Support", description: "Marketing assets that convert investment into opportunity." },
  ],
} as const;
