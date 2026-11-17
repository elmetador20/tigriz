/** Contact, final CTA and footer copy. Contact details live in src/config/contact.ts (env-driven). */

export const contact = {
  eyebrow: "Let's connect",
  heading: ["Have a Vision?", "Let's Make It Happen."],
  description:
    "Tell us about your business, your challenges, and what you want to build. Let's explore how Arabian TIGRIZ can help you move forward.",
  firstStep: {
    label: "How every project begins",
    text: "We begin by understanding the client's business, objectives, challenges, requirements, and expectations.",
    stages: ["Understand", "Strategise", "Create", "Implement", "Evolve"],
  },
} as const;

export const finalCta = {
  heading: ["Your Next Big Move", "Starts Here."],
  description: "Bring your ideas, challenges, and ambitions. Let's turn them into meaningful business and technology solutions.",
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "Explore Our Services", href: "/consultancy" },
} as const;

export const footer = {
  description:
    "A multidisciplinary consulting and technology company helping organisations communicate better, operate smarter and build for sustainable growth.",
  columns: [
    {
      title: "Consultancy",
      links: [
        { label: "Pitch Decks", href: "/consultancy#documentation" },
        { label: "Company Profiles", href: "/consultancy#documentation" },
        { label: "DPRs", href: "/consultancy#dpr" },
        { label: "Business Proposals", href: "/consultancy#documentation" },
        { label: "Corporate Presentations", href: "/consultancy#brand" },
        { label: "Branding & Marketing Design", href: "/consultancy#brand" },
      ],
    },
    {
      title: "Technologies",
      links: [
        { label: "Software Engineering", href: "/technologies#software" },
        { label: "Web & Mobile Applications", href: "/technologies#software" },
        { label: "AI & Automation", href: "/technologies#ai" },
        { label: "Data & Analytics", href: "/technologies#data" },
        { label: "Cloud & Infrastructure", href: "/technologies#cloud" },
        { label: "Enterprise Systems", href: "/technologies#enterprise" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Approach", href: "/approach" },
        { label: "Consultancy", href: "/consultancy" },
        { label: "Technologies", href: "/technologies" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
} as const;
