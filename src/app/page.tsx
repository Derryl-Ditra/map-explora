import Link from "next/link";
import MapHUD from "@/components/MapHUD";

export default function Home() {
  return (
    <main className="h-dvh w-screen overflow-hidden">
      <MapHUD />
      <Link href="/activities/" className="absolute top-3 left-3 z-30 rounded-lg bg-[#f6f2ec] px-3 py-2 text-sm font-semibold text-[#14532d] shadow-sm">Class guides</Link>
    </main>
  );
}
