import { VENUES } from "@/data/venues";
import { itemListSchema, publicInventory, SITE_URL } from "@/utils/discovery";
import MapHUD from "@/components/MapHUD";
import vendor from "@/data/map-vendor.json";
const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";

export default function Home() {
  const schema = { ...itemListSchema({ slug: "", title: "Under 5 classes in Jabodetabek", area: "Jabodetabek", venues: publicInventory(VENUES) }), url: `${SITE_URL}/` };
  schema.itemListElement = schema.itemListElement.map((entry, i) => ({ ...entry, item: { ...entry.item, url: publicInventory(VENUES)[i].sourceUrl } }));
  return (
    <main className="h-dvh w-screen overflow-hidden">
      <link rel="modulepreload" href={`${base}${vendor.entry}`} />
      {vendor.shared.map((path) => <link key={path} rel="modulepreload" href={`${base}${path}`} />)}
      <MapHUD />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
