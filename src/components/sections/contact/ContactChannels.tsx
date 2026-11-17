import { contactConfig, type SocialLink } from "@/config/contact";

/* Custom animated line icons (hover motion via the nearest `group`). */
const mv = "[transform-box:fill-box] transition-transform duration-500 ease-out-expo";

export function MailIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7 12 13l8.5-6" className={`${mv} origin-top group-hover:translate-y-[1.5px]`} stroke="#b7f000" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
      <path d="M15 4.5a5 5 0 0 1 4.5 4.5" stroke="#b7f000" className={`${mv} group-hover:translate-x-[1px] group-hover:-translate-y-[1px]`} />
    </svg>
  );
}

export function PinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" stroke="#b7f000" className={`${mv} origin-center group-hover:scale-125`} />
    </svg>
  );
}

export function ClockIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" stroke="#b7f000" />
    </svg>
  );
}

function ChatIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5 5.3 15.6A8 8 0 1 1 8.6 18.8Z" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" stroke="#b7f000" strokeWidth="2.6" className={`${mv} group-hover:-translate-y-[1px]`} />
    </svg>
  );
}

/** Simple monogram glyphs for social networks (no third-party logo assets). */
export function SocialGlyph({ k, className = "size-[1.1rem]" }: { k: string; className?: string }) {
  const common = { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (k) {
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8 10.5V16M8 7.8v.01M11.5 16v-3.2a2.2 2.2 0 0 1 4.4 0V16M11.5 10.5V16" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <path d="M16.9 7.1v.01" strokeWidth="2.4" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M14.5 8.5h-1.3a1.7 1.7 0 0 0-1.7 1.7V20M9.5 13h5" />
        </svg>
      );
  }
}

/** "Prefer a direct conversation?" — renders only verified, configured channels. */
export function DirectContactStrip() {
  const { email, whatsapp, social } = contactConfig;
  const items: { href: string; label: string; sub: string; icon: React.ReactNode; external?: boolean }[] = [];
  if (email) items.push({ href: `mailto:${email}`, label: "Email us", sub: email, icon: <MailIcon /> });
  if (whatsapp) items.push({ href: whatsapp, label: "WhatsApp", sub: "Start a chat", icon: <ChatIcon />, external: true });
  if (!items.length && !social.length) return null;

  return (
    <div data-r="up" className="mt-6 flex flex-col gap-5 rounded-[24px] border border-line bg-ink-900/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <h3 className="font-display text-lg font-medium text-fg">Prefer a Direct Conversation?</h3>
      <div className="flex flex-wrap items-center gap-2.5">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-line-strong px-4 py-2 text-sm text-fg transition-colors duration-300 hover:border-lime/60"
          >
            <span className="text-fg">{it.icon}</span>
            <span className="flex flex-col leading-tight">
              <span className="font-medium">{it.label}</span>
              <span className="text-xs text-muted">{it.sub}</span>
            </span>
          </a>
        ))}
        {social.length > 0 && <SocialLinks links={social} />}
      </div>
    </div>
  );
}

export function SocialLinks({ links, className = "" }: { links: readonly SocialLink[]; className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social media">
      {links.map((s) => (
        <li key={s.key}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Arabian TIGRIZ on ${s.label}`}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-[color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime"
          >
            <SocialGlyph k={s.key} />
          </a>
        </li>
      ))}
    </ul>
  );
}
