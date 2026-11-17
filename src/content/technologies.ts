/**
 * Technologies vertical copy. Headings/descriptions as briefed; short node
 * descriptions use the Company Profile 2026 taglines (pp. 6–9).
 * Visuals are illustrative — no client names, results or live systems.
 */

export type HubNode = { key: string; label: string; title?: string; description: string };

export const techIntro = {
  eyebrow: "02 / Technologies",
  heading: ["Engineering ideas.", "Building intelligent systems."],
  description:
    "We design, develop and integrate digital solutions that help organisations modernise operations, improve efficiency and build scalable technology infrastructure.",
  primaryCta: { label: "Explore Our Capabilities", href: "#software" },
  secondaryCta: { label: "Discuss Your Project", href: "/contact" },
  ecosystem: {
    center: "Digital Ecosystem",
    idle: "Select a capability to see how it connects.",
    nodes: [
      { key: "software", label: "Software Engineering", title: "Custom solutions for real needs", description: "Web, mobile and enterprise applications tailored to your operations and users." },
      { key: "ai", label: "AI & Automation", title: "Intelligence embedded into operations", description: "AI-powered solutions and workflows that reduce manual work and improve decisions." },
      { key: "data", label: "Data & Analytics", title: "Turning data into insights", description: "Collect, process and visualise data to support better decisions and performance." },
      { key: "cloud", label: "Cloud & Infrastructure", title: "Secure. Scalable. Reliable.", description: "Cloud infrastructure that supports growth, performance and high availability." },
      { key: "platforms", label: "Digital Platforms", title: "Connected systems for modern businesses", description: "Platforms that connect people, processes and data across the organisation." },
      { key: "enterprise", label: "Enterprise Systems", title: "Integrate. Automate. Scale.", description: "CRM, ERP and enterprise systems that streamline operations and fit existing tools." },
    ] satisfies HubNode[],
  },
} as const;

export const software = {
  eyebrow: "01 / Software Engineering",
  heading: ["Technology built", "around your business."],
  description:
    "We develop tailored software solutions designed around business requirements, operational workflows and long-term scalability.",
  categories: [
    { key: "A", title: "Web Application Development", description: "Custom web applications built to deliver intuitive experiences and reliable business functionality." },
    { key: "B", title: "Mobile Application Development", description: "Android and iOS application development for businesses, products and digital services." },
    { key: "C", title: "Custom Software Development", description: "Purpose-built software solutions designed around specific organisational needs and workflows." },
    { key: "D", title: "System Integration", description: "Connecting applications, services and business systems to improve information flow and operational efficiency." },
  ],
  tabs: [
    { key: "web", label: "Web Applications" },
    { key: "mobile", label: "Mobile Applications" },
    { key: "custom", label: "Custom Software" },
  ],
  note: "Illustrative interface previews",
} as const;

export const ai = {
  eyebrow: "02 / AI & Automation",
  heading: ["Make intelligence work", "for your business."],
  description:
    "We integrate artificial intelligence and intelligent automation into business processes to streamline workflows, improve decision-making and support operational efficiency.",
  engine: {
    center: "AI Engine",
    idle: "Select a business area to see where AI fits in.",
    nodes: [
      { key: "support", label: "Customer Support", description: "AI chatbots, assistants and knowledge systems." },
      { key: "sales", label: "Sales Operations", description: "Lead automation and CRM insights." },
      { key: "workflows", label: "Business Workflows", description: "Approvals, notifications and process automation." },
      { key: "processing", label: "Data Processing", description: "Document processing, data extraction and classification." },
      { key: "reporting", label: "Reporting & Insights", description: "MIS, dashboards and automated reporting." },
    ] satisfies HubNode[],
  },
  pipeline: [
    { key: "input", label: "Input", description: "Requests, documents and data arrive from existing channels and systems." },
    { key: "processing", label: "AI Processing", description: "AI models classify, extract and interpret the incoming information." },
    { key: "decision", label: "Decision", description: "Business rules and thresholds determine the appropriate next step." },
    { key: "action", label: "Automated Action", description: "Workflows update records, notify teams or route approvals automatically." },
    { key: "output", label: "Output", description: "Results return to people and systems as responses, records or reports." },
  ],
  note: "Illustrative demonstration — no live AI processing",
  capabilities: [
    { key: "A", title: "AI Integration", description: "Integrating AI capabilities into existing applications and business workflows." },
    { key: "B", title: "Workflow Automation", description: "Automating repetitive processes and connecting business operations." },
    { key: "C", title: "Intelligent Business Systems", description: "Developing AI-enabled systems to support business processes and operational decisions." },
    { key: "D", title: "AI-Powered Applications", description: "Building applications with intelligent features and AI-driven functionality." },
  ],
} as const;

export const data = {
  eyebrow: "03 / Data & Analytics",
  heading: ["Turn information into", "meaningful insight."],
  description:
    "We help organisations structure, analyse and visualise data to support informed decisions, operational visibility and performance monitoring.",
  categories: ["Business Intelligence", "Data Analytics", "Data Visualisation", "Reporting Dashboards", "Predictive Analytics", "Data Processing"],
  note: "Illustrative sample data — not client results",
} as const;

export type CloudLayer = "cloud" | "api" | "app" | "data" | "security" | "pipeline";

export const cloud = {
  eyebrow: "04 / Cloud & Infrastructure",
  heading: ["Infrastructure", "designed to scale."],
  description:
    "We support modern digital environments through cloud infrastructure, deployment architecture and system reliability solutions.",
  capabilities: [
    { key: "infra", title: "Cloud Infrastructure", description: "Cloud architecture, migration and optimisation.", layers: ["cloud", "app"] as CloudLayer[] },
    { key: "devops", title: "Deployment & DevOps", description: "Deployment pipelines and monitoring.", layers: ["pipeline", "app"] as CloudLayer[] },
    { key: "arch", title: "Infrastructure Architecture", description: "Strategy and architecture for scalability and load.", layers: ["api", "app", "data"] as CloudLayer[] },
    { key: "reliability", title: "System Reliability", description: "Monitoring, security, backup and disaster recovery.", layers: ["security", "data"] as CloudLayer[] },
  ],
} as const;

export const platforms = {
  eyebrow: "05 / Digital Platforms",
  heading: ["Digital experiences that connect", "people and businesses."],
  description:
    "We build digital platforms and application experiences that enable organisations to deliver services, manage interactions and expand their digital presence.",
  items: ["Web Platforms", "Mobile Applications", "Customer-Facing Platforms", "Digital Product Development", "E-commerce Solutions"],
  note: "Fictional illustrative interfaces",
} as const;

export const enterprise = {
  eyebrow: "06 / Enterprise Systems",
  heading: ["Connecting operations.", "Simplifying complexity."],
  description:
    "We develop and integrate business systems that support operational workflows, information management and organisational coordination.",
  items: ["ERP Solutions", "CRM Systems", "Business Process Management", "Custom Enterprise Applications", "System Integration"],
  hub: {
    center: "Enterprise System",
    idle: "Select a department to see what flows through it.",
    nodes: [
      { key: "finance", label: "Finance", description: "Document processing and financial reporting." },
      { key: "hr", label: "HR", description: "Employee workflows and internal assistants." },
      { key: "inventory", label: "Inventory", description: "Stock, procurement and vendor approvals." },
      { key: "sales", label: "Sales", description: "Lead automation and CRM insights." },
      { key: "operations", label: "Operations", description: "Process automation and monitoring." },
      { key: "management", label: "Management", description: "MIS, analytics and decision support." },
    ] satisfies HubNode[],
  },
} as const;

export const marquee = [
  "Software Engineering",
  "Artificial Intelligence",
  "Business Automation",
  "Data Analytics",
  "Cloud Infrastructure",
  "Digital Platforms",
  "Enterprise Systems",
  "System Integration",
] as const;

export const engineeringProcess = {
  eyebrow: "Our engineering approach",
  heading: ["From technical requirements", "to working systems."],
  stages: [
    { key: "discover", label: "Discover", description: "Understand business requirements and technical objectives." },
    { key: "architect", label: "Architect", description: "Define system architecture and implementation strategy." },
    { key: "engineer", label: "Engineer", description: "Design and develop the required solution." },
    { key: "integrate", label: "Integrate", description: "Connect systems, workflows and infrastructure." },
    { key: "evolve", label: "Evolve", description: "Support improvement, scalability and ongoing development." },
  ],
} as const;

export const techCta = {
  heading: ["Have a technology challenge?", "Let's engineer the solution."],
  description:
    "Whether you are building a new digital product, automating business operations or modernising existing systems, let's discuss how we can help.",
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "Explore Consultancy", href: "/consultancy" },
} as const;
