import Link from "next/link";
import { VENUES } from "@/data/venues";
import { itemListSchema, publicInventory, SITE_URL } from "@/utils/discovery";
import MapHUD from "@/components/MapHUD";

export default function Home() {
  const schema = { ...itemListSchema({ slug: "", title: "Under 5 classes in Jabodetabek", area: "Jabodetabek", venues: publicInventory(VENUES) }), url: `${SITE_URL}/` };
  schema.itemListElement = schema.itemListElement.map((entry, i) => ({ ...entry, item: { ...entry.item, url: publicInventory(VENUES)[i].sourceUrl } }));
  return (
    <main className="h-dvh w-screen overflow-hidden">
      <MapHUD />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Link href="/activities/" className="hidden md:block absolute top-3 left-3 z-30 rounded-lg bg-[#f6f2ec] px-3 py-2 text-sm font-semibold text-[#14532d] shadow-sm">Class guides</Link>
    </main>
  );
}
