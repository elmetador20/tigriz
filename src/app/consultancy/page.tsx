import { Consultancy } from "@/components/sections/consultancy/Consultancy";
import { FinalCta } from "@/components/sections/closing/FinalCta";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("/consultancy", "Consultancy", "Pitch decks, company profiles, detailed project reports, business proposals, corporate presentations and marketing design.");

export default function Page() {
  return (
    <div className="pt-[72px]">
      <Consultancy />
      <FinalCta />
    </div>
  );
}
