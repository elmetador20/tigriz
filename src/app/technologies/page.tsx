import { Technologies } from "@/components/sections/technologies/Technologies";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("/technologies", "Technologies", "Software engineering, AI and automation, data and analytics, cloud and infrastructure, digital platforms and enterprise systems.");

export default function Page() {
  return (
    <div className="pt-[72px]">
      <Technologies />
    </div>
  );
}
