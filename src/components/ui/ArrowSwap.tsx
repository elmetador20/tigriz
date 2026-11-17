import { ArrowUpRight, ArrowDown, type LucideIcon } from "lucide-react";

const icons: Record<"up-right" | "down", LucideIcon> = { "up-right": ArrowUpRight, down: ArrowDown };

/**
 * Arrow that exits in its pointing direction and a twin that enters
 * behind it when the nearest `.group` ancestor is hovered or focused.
 */
export function ArrowSwap({ className = "size-4", direction = "up-right" }: { className?: string; direction?: "up-right" | "down" }) {
  const Icon = icons[direction];
  const out =
    direction === "down"
      ? "group-hover:translate-y-[140%] group-focus-visible:translate-y-[140%]"
      : "group-hover:translate-x-[140%] group-hover:-translate-y-[140%] group-focus-visible:translate-x-[140%] group-focus-visible:-translate-y-[140%]";
  const enter =
    direction === "down"
      ? "-translate-y-[140%] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      : "-translate-x-[140%] translate-y-[140%] group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0";
  const base = "transition-transform duration-500 ease-out-expo";

  return (
    <span aria-hidden className={`relative inline-block overflow-hidden ${className}`}>
      <Icon className={`absolute inset-0 size-full ${base} ${out}`} strokeWidth={2.25} />
      <Icon className={`absolute inset-0 size-full ${base} ${enter}`} strokeWidth={2.25} />
    </span>
  );
}
