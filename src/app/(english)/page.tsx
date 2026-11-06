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
    </main>
  );
}
