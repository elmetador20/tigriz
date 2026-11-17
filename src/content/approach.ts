/**
 * Our Approach module copy. Headings/descriptions as briefed.
 * Business applications use the functions listed in the Company Profile 2026
 * (p.8 "Application across business functions") — the profile names no
 * specific industries, so no industry experience is claimed.
 */

export const approachIntro = {
  eyebrow: "How we work",
  heading: ["From Vision", "to Execution."],
  description:
    "Every successful project starts with understanding the bigger picture. We combine strategic thinking, creative problem-solving, and technology execution to transform business objectives into practical solutions.",
  journey: ["Idea", "Insight", "Plan", "Build", "Solution"],
} as const;

export const workflow = {
  label: "Project workflow",
  stages: [
    { key: "understand", title: "Understand", description: "We begin by understanding the client's business, objectives, challenges, requirements, and expectations." },
    { key: "strategise", title: "Strategise", description: "We define the direction, identify opportunities, establish priorities, and develop a suitable execution plan." },
    { key: "create", title: "Create", description: "Our consultancy and technology capabilities come together to develop the required strategy, design, documentation, or digital solution." },
    { key: "implement", title: "Implement", description: "We execute the planned solution through structured development, coordination, integration, and delivery." },
    { key: "evolve", title: "Evolve", description: "We review the delivered work, identify opportunities for improvement, and support future enhancements where required." },
  ],
} as const;

export const pathways = {
  eyebrow: "Two engagement pathways",
  heading: ["Two ways to work with us.", "One shared outcome."],
  description:
    "Engage our consultancy or technology capabilities independently — or bring them together when a project calls for both.",
  outcome: "Business Growth & Digital Transformation",
  note: "Each pathway stands on its own. Combine them only when it serves the project.",
  a: {
    key: "A",
    title: "Consultancy",
    label: "Strategy & Communication",
    journey: ["Business Requirements", "Strategic Planning", "Documentation & Design", "Business Presentation"],
    services: ["Pitch Decks", "Company Profiles", "Detailed Project Reports", "Business Proposals", "Corporate Presentations", "Marketing & Branding Collateral"],
    href: "/consultancy",
  },
  b: {
    key: "B",
    title: "Technologies",
    label: "Engineering & Digital Solutions",
    journey: ["Business Requirements", "Solution Architecture", "Development & Integration", "Digital Implementation"],
    services: ["Web & Mobile Applications", "Custom Software", "AI & Automation", "Data & Analytics", "Cloud Infrastructure", "Enterprise Systems"],
    href: "/technologies",
  },
} as const;

export const why = {
  eyebrow: "Why Arabian TIGRIZ",
  heading: ["More Than Services.", "A Connected Approach."],
  items: [
    { number: "01", title: "Business-First Thinking", description: "We begin with business objectives and practical requirements before defining the solution." },
    { number: "02", title: "Integrated Capabilities", description: "Consultancy, creative communication, and technology capabilities under one roof." },
    { number: "03", title: "Tailored Solutions", description: "Solutions shaped around the individual requirements and objectives of each engagement." },
    { number: "04", title: "Strategic & Technical Perspective", description: "Combining strategic understanding with practical execution capabilities." },
    { number: "05", title: "Long-Term Perspective", description: "Building solutions with future improvements, adaptability, and scalability in mind." },
  ],
} as const;

export type FunctionKey = "sales" | "finance" | "hr" | "procurement" | "operations" | "support" | "management";

export const applications = {
  eyebrow: "Business applications",
  heading: ["Applied across", "business functions."],
  description:
    "Our capabilities apply to the everyday work of an organisation. These are the business functions where consultancy and technology most often meet.",
  note: "Business functions from our company profile — not a list of industries or completed projects.",
  functions: [
    {
      key: "sales" as FunctionKey,
      name: "Sales",
      challenge: "Leads, follow-ups and customer information spread across channels make pipelines hard to manage.",
      applications: ["Lead automation", "CRM insights"],
      capabilities: { technology: ["CRM Systems", "Workflow Automation", "Data & Analytics"], consultancy: ["Pitch Decks", "Brochures & Catalogues"] },
    },
    {
      key: "finance" as FunctionKey,
      name: "Finance",
      challenge: "Invoices, documents and reports often depend on manual handling and repeated data entry.",
      applications: ["Document processing", "Reporting"],
      capabilities: { technology: ["Document Intelligence", "Automated Reporting", "ERP"], consultancy: ["Detailed Project Reports"] },
    },
    {
      key: "hr" as FunctionKey,
      name: "HR",
      challenge: "Routine employee requests and internal processes take time away from people-focused work.",
      applications: ["Employee workflows", "Internal assistants"],
      capabilities: { technology: ["Workflow Automation", "AI Assistants", "Employee Portals"], consultancy: ["Corporate Presentations"] },
    },
    {
      key: "procurement" as FunctionKey,
      name: "Procurement",
      challenge: "Vendor coordination and multi-step approvals can slow down purchasing decisions.",
      applications: ["Vendor management", "Approvals"],
      capabilities: { technology: ["Vendor Portals", "Approval Workflows", "ERP"], consultancy: ["Business Proposals"] },
    },
    {
      key: "operations" as FunctionKey,
      name: "Operations",
      challenge: "Recurring processes and status tracking are difficult to keep consistent and visible.",
      applications: ["Process automation", "Monitoring"],
      capabilities: { technology: ["Process Automation", "Dashboards & MIS", "System Integration"], consultancy: [] },
    },
    {
      key: "support" as FunctionKey,
      name: "Support",
      challenge: "Repeated customer questions and scattered knowledge increase response times.",
      applications: ["AI chatbots", "Knowledge systems"],
      capabilities: { technology: ["AI Chatbots", "AI Agents & RAG", "Customer Portals"], consultancy: [] },
    },
    {
      key: "management" as FunctionKey,
      name: "Management",
      challenge: "Decisions depend on timely, consolidated information from across the organisation.",
      applications: ["MIS · Analytics", "Decision support"],
      capabilities: { technology: ["Business Intelligence", "Management Dashboards"], consultancy: ["Company Profiles", "Corporate Presentations"] },
    },
  ],
} as const;

export const closing = {
  heading: ["Let's Build Something That", "Moves Your Business Forward."],
  description:
    "Whether you need strategic clarity, professional business communication, or technology-driven solutions, Arabian TIGRIZ is ready to explore the possibilities with you.",
  primary: { label: "Discuss Your Project", href: "/contact" },
  secondary: { label: "Explore Our Capabilities", href: "/consultancy" },
} as const;
