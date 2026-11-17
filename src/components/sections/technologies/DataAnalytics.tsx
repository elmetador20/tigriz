import { ChartBar, ChartLine, ChartPie, FileSpreadsheet, Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import { data } from "@/content/technologies";
import { TechChapter } from "./TechChapter";

const icons: LucideIcon[] = [Lightbulb, ChartLine, ChartPie, ChartBar, TrendingUp, FileSpreadsheet];

/** Sample values — illustrative only, labelled as such in the UI. */
const kpis = [
  { label: "Records processed", value: "48.2k", delta: "+12%" },
  { label: "Avg. turnaround", value: "3.4h", delta: "−18%" },
  { label: "On-time rate", value: "96.1%", delta: "+4%" },
  { label: "Open items", value: "128", delta: "−9%" },
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const bars = [38, 52, 44, 66, 58, 74, 88];

function Dashboard() {
  return (
    <div data-r="clip" className="relative overflow-hidden rounded-[24px] border border-line-strong bg-ink-900/85 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
      <div data-r-zoom className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-lime/15 text-lime">
              <ChartNoAxes />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-fg">Operations overview</p>
              <p className="font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">Reporting dashboard</p>
            </div>
          </div>
          <span className="rounded-full border border-lime/50 px-3 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-lime uppercase">
            Sample data
          </span>
        </div>

        {/* KPIs */}
        <div data-r="stagger" className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <div key={k.label} data-r-item className="rounded-xl border border-line bg-ink-800/80 p-3 sm:p-4">
              <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted uppercase">{k.label}</p>
              <p className="mt-2 font-display text-xl font-semibold text-fg tabular-nums sm:text-2xl">{k.value}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className={`font-mono text-[0.62rem] ${i % 2 ? "text-cyan" : "text-lime"}`}>{k.delta}</span>
                <svg viewBox="0 0 48 14" className="w-12" fill="none" aria-hidden>
                  <path d={["M0 12 L10 9 L20 10 L30 5 L40 6 L48 2", "M0 3 L10 5 L20 4 L30 8 L40 9 L48 12", "M0 10 L12 8 L24 9 L36 4 L48 3", "M0 4 L12 6 L24 5 L36 9 L48 10"][i]} stroke={i % 2 ? "#29b8d4" : "#b7f000"} strokeWidth="1.4" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-3 grid gap-3 lg:grid-cols-12">
          <div className="rounded-xl border border-line bg-ink-800/80 p-4 lg:col-span-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase">Throughput trend</p>
              <span className="flex gap-3 font-mono text-[0.55rem] tracking-[0.14em] text-subtle uppercase">
                <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-lime" />Actual</span>
                <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-cyan" />Target</span>
              </span>
            </div>
            <svg viewBox="0 0 420 170" className="mt-3 w-full" fill="none" aria-label="Illustrative line chart">
              {[30, 70, 110, 150].map((y) => (
                <path key={y} d={`M0 ${y} H420`} stroke="rgb(167 180 200 / 0.1)" />
              ))}
              <path data-chart-area d="M0 140 C40 132 60 110 100 112 S160 86 200 90 S270 52 310 60 S380 30 420 22 V170 H0Z" fill="url(#chart-fill)" />
              <path d="M0 120 L420 50" stroke="#29b8d4" strokeOpacity="0.7" strokeDasharray="4 6" />
              <path data-chart-line d="M0 140 C40 132 60 110 100 112 S160 86 200 90 S270 52 310 60 S380 30 420 22" stroke="#b7f000" strokeWidth="2.2" pathLength={1} strokeDasharray="1" />
              {[[100, 112], [200, 90], [310, 60], [420, 22]].map(([x, y]) => (
                <circle data-chart-point key={x} cx={x} cy={y} r="3.5" fill="#061327" stroke="#b7f000" strokeWidth="1.8" />
              ))}
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="170" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#b7f000" stopOpacity="0.18" />
                  <stop offset="1" stopColor="#b7f000" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="mt-1 flex justify-between font-mono text-[0.55rem] text-subtle">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-line bg-ink-800/80 p-4 lg:col-span-4">
            <p className="font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase">Volume by week</p>
            <div className="mt-3 flex min-h-32 flex-1 items-end gap-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  data-chart-bar
                  className={`flex-1 origin-bottom rounded-t ${i === bars.length - 1 ? "bg-lime" : "bg-cyan/55"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Processing indicators */}
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border border-line bg-ink-800/80 p-4">
            <p className="font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase">Data pipeline</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {["Ingest", "Clean", "Model", "Publish"].map((s, i) => (
                <div key={s}>
                  <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
                    <span
                      data-chart-progress
                      className={`block h-full origin-left rounded-full ${i === 3 ? "bg-cyan" : "bg-lime"}`}
                      style={{ transform: `scaleX(${[1, 1, 0.8, 0.45][i]})` }}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-[0.55rem] tracking-[0.12em] text-subtle uppercase">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-line bg-ink-800/80 p-4">
            <svg viewBox="0 0 44 44" className="size-14 -rotate-90" fill="none" aria-hidden>
              <circle cx="22" cy="22" r="17" stroke="rgb(167 180 200 / 0.15)" strokeWidth="5" />
              <circle data-chart-ring cx="22" cy="22" r="17" stroke="#b7f000" strokeWidth="5" pathLength={1} strokeDasharray="0.72 1" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted uppercase">Data quality</p>
              <p className="font-display text-lg font-semibold text-fg">72%</p>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">{data.note}</p>
      </div>
    </div>
  );
}

function ChartNoAxes() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </svg>
  );
}

export function DataAnalytics() {
  return (
    <TechChapter id="data" eyebrow={data.eyebrow} heading={data.heading} description={data.description}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-8 lg:order-2">
          {/* Floating forecast card (predictive) */}
          <div data-float="0.9" aria-hidden className="absolute -top-8 -right-4 z-10 hidden w-48 rounded-xl border border-line bg-ink-800/95 p-3 backdrop-blur xl:block">
            <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted uppercase">Forecast</p>
            <svg viewBox="0 0 120 40" className="mt-2 w-full" fill="none">
              <path d="M0 34 L20 28 L40 30 L60 20" stroke="#b7f000" strokeWidth="1.6" />
              <path d="M60 20 L80 16 L100 10 L120 6" stroke="#29b8d4" strokeWidth="1.6" strokeDasharray="3 4" />
              <circle cx="60" cy="20" r="2.5" fill="#b7f000" />
            </svg>
          </div>
          <Dashboard />
        </div>
        <ul data-r="stagger" className="grid content-start gap-2.5 sm:grid-cols-2 lg:col-span-4 lg:order-1 lg:grid-cols-1">
          {data.categories.map((c, i) => {
            const Icon = icons[i];
            return (
              <li key={c} data-r-item className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-800/60 px-4 py-3.5 transition-colors duration-300 hover:border-lime/35">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong text-lime">
                  <Icon className="size-4" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-display text-[0.95rem] font-medium tracking-[0.03em] text-fg uppercase">{c}</span>
                <span className="ml-auto font-mono text-[0.6rem] text-subtle">{String(i + 1).padStart(2, "0")}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </TechChapter>
  );
}
