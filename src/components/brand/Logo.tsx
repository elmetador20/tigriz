import { AtMark } from "./AtMark";
import { brand } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group/logo inline-flex items-center gap-3 ${className}`}>
      <AtMark className="h-7 w-auto transition-transform duration-500 ease-out-expo group-hover/logo:-translate-y-px" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.8rem] font-semibold tracking-[0.28em] text-fg">
          {brand.wordmark}
        </span>
        <span className="mt-1 font-mono text-[0.55rem] tracking-[0.3em] text-muted uppercase max-sm:hidden">
          {brand.descriptor}
        </span>
      </span>
    </span>
  );
}
