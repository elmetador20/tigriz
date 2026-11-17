/**
 * Original technology-development visual: an abstract code editor beside
 * a service-architecture chain (layers named in the company profile).
 * Code is shown as token bars rather than text; [data-eng-token] bars
 * are "typed in" by the section's motion layer.
 */

type Tok = [width: number, tone: "kw" | "fn" | "tx" | "str" | "dim"];

const tone = {
  kw: "bg-cyan/80",
  fn: "bg-lime/90",
  tx: "bg-fg/55",
  str: "bg-lime/45",
  dim: "bg-fg/20",
} as const;

const lines: { indent: number; toks: Tok[] }[] = [
  { indent: 0, toks: [[14, "kw"], [22, "fn"], [10, "dim"]] },
  { indent: 1, toks: [[10, "kw"], [18, "tx"], [6, "dim"], [26, "str"]] },
  { indent: 1, toks: [[12, "kw"], [16, "tx"], [20, "fn"], [8, "dim"]] },
  { indent: 2, toks: [[18, "tx"], [14, "fn"], [22, "str"]] },
  { indent: 2, toks: [[10, "kw"], [28, "tx"]] },
  { indent: 1, toks: [[8, "dim"]] },
  { indent: 1, toks: [[14, "kw"], [20, "fn"], [12, "tx"], [10, "dim"]] },
  { indent: 0, toks: [[6, "dim"]] },
];

const stack = ["Web", "API", "Backend", "Database", "Cloud"];

export function EngineeringArt({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full ${className}`} aria-hidden>
      {/* Editor */}
      <div className="flex min-w-0 flex-1 flex-col bg-ink-900/70">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-line px-4">
          <span className="size-2 rounded-full bg-fg/25" />
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/10" />
          <span className="ml-3 h-full border-x border-line bg-ink-800/80 px-3 font-mono text-[0.62rem] leading-9 tracking-[0.15em] text-muted uppercase">
            systems
          </span>
        </div>
        <div className="flex-1 space-y-2.5 overflow-hidden px-4 py-4 sm:px-5">
          {lines.map((l, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-4 shrink-0 text-right font-mono text-[0.6rem] text-subtle tabular-nums">{i + 1}</span>
              <div className="flex min-w-0 items-center gap-1.5" style={{ paddingLeft: `${l.indent * 1.25}rem` }}>
                {l.toks.map(([wd, t], j) => (
                  <span key={j} data-eng-token className={`block h-[7px] shrink-0 origin-left rounded-full ${tone[t]}`} style={{ width: `${wd * 0.32}rem` }} />
                ))}
                {i === lines.length - 1 && <span className="ml-1 block h-3.5 w-[2px] animate-[caret_1.1s_steps(1)_infinite] bg-lime" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture chain */}
      <div className="hidden w-[36%] shrink-0 flex-col justify-center gap-0 border-l border-line bg-ink-800/60 px-4 py-3 sm:flex">
        {stack.map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <span
              className={`w-full rounded-md border px-2 py-1 text-center font-mono text-[0.56rem] tracking-[0.18em] uppercase ${
                i === 1 ? "border-lime/50 text-lime" : i === 4 ? "border-cyan/50 text-cyan" : "border-line-strong text-muted"
              }`}
            >
              {s}
            </span>
            {i < stack.length - 1 && (
              <svg width="2" height="9" className="overflow-visible">
                <path d="M1 0 V9" stroke="#b7f000" strokeOpacity="0.6" className="flow-line" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
