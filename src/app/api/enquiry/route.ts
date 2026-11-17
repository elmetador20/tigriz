import { enquirySchema, type Enquiry, type EnquiryInput, type EnquiryResponse } from "@/lib/enquiry";

/**
 * POST /api/enquiry — project enquiry intake.
 *
 * Delivery channels (configure at least one; see .env.example):
 *  - ENQUIRY_WEBHOOK_URL  JSON POST to any webhook / CRM / automation tool
 *  - RESEND_API_KEY + ENQUIRY_TO_EMAIL (+ ENQUIRY_FROM_EMAIL)  email via Resend's REST API
 *
 * If no channel is configured the route answers 503 "not_configured" —
 * it never reports success for an enquiry that was not delivered.
 */

const json = (body: EnquiryResponse, status = 200) => Response.json(body, { status });

// Best-effort, per-instance rate limit (5 requests / 10 minutes / IP).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

function formatText(e: Enquiry, submittedAt: string) {
  return [
    `New project enquiry — ${submittedAt}`,
    "",
    `Name: ${e.fullName}`,
    `Email: ${e.email}`,
    `Company: ${e.company}`,
    `Phone: ${e.phone ?? "—"}`,
    `Looking for: ${e.services.join(", ")}`,
    `Budget: ${e.budget ?? "—"}`,
    `Timeline: ${e.timeline ?? "—"}`,
    "",
    "Project description:",
    e.description,
  ].join("\n");
}

async function sendWebhook(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendEmail(e: Enquiry, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL || "Arabian TIGRIZ Website <onboarding@resend.dev>",
      to: process.env.ENQUIRY_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: e.email,
      subject: `Project enquiry: ${e.company} — ${e.services[0]}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return json({ ok: false, error: "bad_request" }, 413);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot filled → silently drop (bots only; people never see the field).
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof EnquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, error: "invalid", fieldErrors }, 422);
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL);
  if (!webhook && !emailReady) {
    console.error("[enquiry] No delivery channel configured. Set ENQUIRY_WEBHOOK_URL or RESEND_API_KEY + ENQUIRY_TO_EMAIL.");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  const enquiry = parsed.data;
  const submittedAt = new Date().toISOString();
  const { website: _honeypot, ...fields } = enquiry;
  void _honeypot;
  const tasks: Promise<void>[] = [];
  if (webhook) tasks.push(sendWebhook(webhook, { type: "project_enquiry", source: "website", submittedAt, ...fields }));
  if (emailReady) tasks.push(sendEmail(enquiry, formatText(enquiry, submittedAt)));

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("[enquiry] delivery failed:", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) return json({ ok: false, error: "delivery_failed" }, 502);

  return json({ ok: true });
}
