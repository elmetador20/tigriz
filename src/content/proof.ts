/**
 * Projects and testimonials.
 *
 * ⚠ SAMPLE CONTENT. Every project and testimonial below is a placeholder that
 * shows the layout. Replace them with real, client-approved entries before
 * launch, then set `isSample` to false to remove the "Sample" badges.
 * Attributions are role + sector only; add names/companies only with consent.
 */

export const isSample = true;

export const sampleNote = "Sample content · replace before launch";

export type ProjectVisual = "report" | "engineering" | "identity";

export const projects = {
  eyebrow: "Selected work",
  heading: ["Ideas, structured.", "Systems, delivered."],
  intro: "A look at how strategy, design and technology come together across our engagements.",
  items: [
    {
      number: "01",
      vertical: "Consultancy",
      title: "Investor-ready DPR and pitch deck for a hospitality development",
      client: "Hospitality group · Riyadh",
      summary:
        "Turned a mixed-use hotel expansion plan into a bank-ready Detailed Project Report and a concise investor deck, with market analysis, phasing and financial projections.",
      services: ["Detailed Project Report", "Pitch Deck", "Financial Model"],
      outcome: "Financing approved on first submission",
      visual: "report",
    },
    {
      number: "02",
      vertical: "Technologies",
      title: "Operations platform and dispatch automation for a logistics company",
      client: "Logistics company · Eastern Province",
      summary:
        "Replaced spreadsheets and phone-based dispatch with a web platform, a driver app and automated status updates, integrated with the existing ERP.",
      services: ["Web & Mobile Apps", "Automation", "System Integration"],
      outcome: "Real-time visibility across every shipment",
      visual: "engineering",
    },
    {
      number: "03",
      vertical: "Consultancy + Technologies",
      title: "Brand refresh, company profile and website for a family business group",
      client: "Family business group · Jeddah",
      summary:
        "Unified five business units under one identity, then delivered a corporate profile, presentation templates and a bilingual website on the same design system.",
      services: ["Brand Identity", "Company Profile", "Website"],
      outcome: "One consistent brand across every touchpoint",
      visual: "identity",
    },
  ],
} as const;

export const testimonials = {
  eyebrow: "Client voices",
  heading: ["What our clients", "say about us."],
  items: [
    {
      quote:
        "Arabian TIGRIZ turned a complex expansion plan into a report our bank could approve without a second round of questions. The structure and clarity made all the difference.",
      role: "Managing Director",
      org: "Hospitality group · Riyadh",
    },
    {
      quote:
        "They understood our operations before writing a single line of code. The new platform replaced three spreadsheets and a lot of phone calls.",
      role: "Operations Director",
      org: "Logistics company · Dammam",
    },
    {
      quote: "Our pitch deck finally told the story we couldn't put into words: clear, sharp and investor-ready.",
      role: "Founder",
      org: "Fintech startup · Riyadh",
    },
    {
      quote: "One team for strategy, design and technology meant no hand-offs and no lost context.",
      role: "Chief Executive Officer",
      org: "Family business group · Jeddah",
    },
    {
      quote: "Practical, responsive and honest about what would and wouldn't work for us.",
      role: "Head of Digital",
      org: "Healthcare provider · Riyadh",
    },
  ],
} as const;
