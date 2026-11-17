/**
 * Single source of truth for site copy.
 * All text is taken from the Arabian TIGRIZ Company Profile 2026.
 * Do not add achievements, clients, statistics or contact details
 * that are not in the profile.
 */

export const brand = {
  name: "Arabian TIGRIZ",
  wordmark: "ARABIAN TIGRIZ",
  descriptor: "Consultancy & Technologies",
  subline: "Digital Business Solutions",
  tagline: ["Ideas.", "Systems.", "Growth."] as const,
  statement:
    "Building better businesses through strategic thinking, intelligent technology and execution.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Technologies", href: "/technologies" },
  { label: "Our Approach", href: "/approach" },
] as const;

export const navCta = { label: "Let's Talk", href: "/contact" } as const;

export const hero = {
  label: "Consultancy & Technologies",
  primaryCta: { label: "Explore Our Capabilities", href: "/about" },
  secondaryCta: { label: "Let's Build Together", href: "/contact" },
  /** Small technical labels placed around the signature visual. */
  visualLabels: {
    top: "Digital Business Solutions",
    bottom: "Ideas → Systems → Growth",
  },
} as const;

export const process = [
  "Understand",
  "Strategise",
  "Design",
  "Build",
  "Transform",
] as const;

/** Hero capability cards (profile cover, p.1). */
export const heroCards = [
  {
    number: "01",
    title: "Consultancy",
    href: "/consultancy",
    description:
      "Business Documentation · Corporate Communication · Pitch Decks · DPRs · Business Proposals · Marketing & Design",
  },
  {
    number: "02",
    title: "Technologies",
    href: "/technologies",
    description:
      "Software Engineering · AI · Automation · Data & Analytics · Cloud · Digital Platforms · Enterprise Systems",
  },
] as const;

/** About section (profile p.2, with vertical headlines from p.3 and p.6). */
export const about = {
  eyebrow: "About Arabian TIGRIZ",
  heading: ["Where business", "thinking meets", "technology."],
  paragraphs: [
    "Arabian TIGRIZ is a multidisciplinary consulting and technology company helping organisations communicate better, operate smarter and build for sustainable growth.",
    "We combine business understanding, strategic communication, professional design and technology execution to turn ideas into opportunities and operations into efficient, scalable systems.",
  ],
  venn: {
    center: { tag: "One roof", title: "Integrated Capabilities." },
    messages: {
      idle: "Select a vertical to see how the two connect.",
      a: "Structuring businesses for greater opportunities.",
      b: "Building technology around the business.",
      ab: "One integrated ecosystem connecting strategy, design and technology.",
    },
  },
  principles: [
    { number: "01", title: "Business-first approach", description: "We start with your business objectives.", icon: "target" },
    { number: "02", title: "Integrated capabilities", description: "Consulting, design and technology under one roof.", icon: "layers" },
    { number: "03", title: "Practical execution", description: "Clear strategy, measurable outcomes and scalable solutions.", icon: "execution" },
    { number: "04", title: "Long-term value", description: "Solutions designed for growth, efficiency and impact.", icon: "growth" },
  ],
  editorial: {
    wave: { index: "01", label: "Digital ecosystem", caption: "Ideas. Systems. Growth." },
    boardroom: { index: "02", label: "Boardroom · Teamwork", caption: "Structure. Communicate. Position." },
    engineering: { index: "03", label: "Technology · Code", caption: "Build. Automate. Scale." },
  },
} as const;

export type PrincipleIcon = (typeof about.principles)[number]["icon"];

export const verticals = {
  consultancy: {
    tag: "Vertical A",
    href: "/consultancy",
    lede: "We help organisations communicate their vision, document their plans, build a strong market presence and create high-quality collateral that supports growth, investment and strategic partnerships.",
    label: "Consultancy",
    summary:
      "Business Documentation · Corporate Communication · Pitch Decks · DPRs · Business Proposals · Marketing & Design",
    verbs: ["Structure.", "Communicate.", "Position."],
    services: [
      "Pitch Decks",
      "Company Profiles",
      "Detailed Project Reports",
      "Business Proposals",
      "Corporate Presentations",
      "Brochures & Catalogues",
      "Social Media & Marketing Design",
      "Offline Marketing Collateral",
    ],
  },
  technologies: {
    tag: "Vertical B",
    href: "/technologies",
    lede: "Secure, scalable and efficient digital systems that help organisations automate operations, improve productivity and enable growth.",
    label: "Technologies",
    summary:
      "Software Engineering · AI · Automation · Data & Analytics · Cloud · Digital Platforms · Enterprise Systems",
    verbs: ["Build.", "Automate.", "Scale."],
    services: [
      "Software Engineering",
      "Web & Mobile Applications",
      "AI & Automation",
      "Data & Analytics",
      "Cloud & Infrastructure",
      "Digital Platforms",
      "Enterprise Systems",
      "System Integration",
    ],
  },
} as const;
