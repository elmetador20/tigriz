import { About } from "@/components/sections/about/About";
import { FinalCta } from "@/components/sections/closing/FinalCta";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("/about", "About", "A multidisciplinary consulting and technology company helping organisations communicate better, operate smarter and build for sustainable growth.");

export default function Page() {
  return (
    <div className="pt-[72px]">
      <About />
      <FinalCta />
    </div>
  );
}
