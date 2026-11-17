import { Approach } from "@/components/sections/approach/Approach";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("/approach", "Our Approach", "From vision to execution: how Arabian TIGRIZ understands, strategises, creates, implements and evolves every engagement.");

export default function Page() {
  return (
    <div className="pt-[72px]">
      <Approach />
    </div>
  );
}
