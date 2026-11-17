import { Contact } from "@/components/sections/contact/Contact";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("/contact", "Contact", "Tell us about your business, your challenges, and what you want to build.");

export default function Page() {
  return (
    <div className="pt-[72px]">
      <Contact />
    </div>
  );
}
