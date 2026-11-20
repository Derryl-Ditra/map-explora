import type { Venue } from "@/types/venue";

// Nov20 pin recovery for the visible search-only venues. 11 stored pins were
// re-checked against the live public Google Maps listing for the exact branch
// on 2026-11-20 and match it. Per the data-conflict rule (trust a verified map
// pin, keep the losing value), routing is restored for those 11 and each losing
// source value is kept in notes. The Funtastic Gym Pondok Indah pin does not
// match the live listing, so it is untouched and keeps its caution.
// No coordinate moved, no closure claim.
export default function enrich1120(venues: Venue[]) {
  const resolve = (id: string, note: string) => {
    const v = venues.find((x) => x.id === id);
    if (!v) return;
    delete v.caution;
    v.notes = ((v.notes || "") + " " + note).trim();
    v.lastCheckedAt = "2026-11-20";
  };

  resolve(
    "deen-haus-alkahf-bintaro",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for Alkahf Space (Jl. Bintaro Utara No.14, Pesanggrahan, Jakarta Selatan 12330) to the metre. The Maps pin wins for routing; the provider site's 'Bintaro Sektor 2, Tangerang Selatan' naming is kept here as the losing value."
  );
  resolve(
    "morning-nest-preschool-bojongsari",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for Morning Nest Preschool (Jl. Raya Curug, Bojongsari) exactly. The Happy Kamper partner point (~440 m south-east) remains the losing value; Maps pin takes precedence as already recorded."
  );
  resolve(
    "english-1-cinere-depok",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for English 1 Cinere Depok (Jl. Cinere Raya No.28-30, Blok A). The official branch list's 'Blok A No.28-29' is kept as the losing unit value; the verified Maps pin wins for routing."
  );
  resolve(
    "english-1-puri-indah",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for English 1 Puri Indah (M 8-1, Ruko Puri Niaga, Jl. Puri Kencana Blok J1). The official branch list's 'Blok J1 No.3 T-U' is kept as the losing unit value within the same Ruko Puri Niaga block; the verified Maps pin wins for routing."
  );
  resolve(
    "sparks-sports-academy-taman-palem",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for Sparks Sports Academy - Taman Palem (Jl. Palem Raja Barat No.10) exactly. The official lokasi page's 'Citra 3 No.3A blok A13' is kept as the losing unit value; the verified Maps pin wins for routing."
  );
  resolve(
    "sparks-sports-academy-tangerang-city",
    "Resolved 2026-11-20: the stored pin matches the live Google Maps listing for Sparks Sports Academy - Tangerang City (Ruko Citypark, Jl. Perintis Kemerdekaan No.17 Blok G) exactly. The official lokasi page's 'Jl. Perintis Kemerdekaan 42' is kept as the losing unit value; Ruko Citypark sits on the same street and the verified Maps pin wins for routing."
  );

  const cibinong = venues.find((v) => v.id === "sparks-sports-academy-cibinong");
  if (cibinong) {
    cibinong.coordinateSource = "maps-pin";
    cibinong.notes = ((cibinong.notes || "") + " Resolved 2026-11-20: the live Google Maps listing for Sparks Sports Academy - Cibinong sits at exactly the stored coordinates (plus code GR9H+956, Jl. Tegar Beriman, matching the official lokasi page). Coordinate source upgraded from area-approximate to maps-pin.").trim();
    cibinong.lastCheckedAt = "2026-11-20";
  }
  const cibubur = venues.find((v) => v.id === "sparks-sports-academy-cibubur");
  if (cibubur) {
    cibubur.coordinateSource = "maps-pin";
    cibubur.address = "Jl. Raya Kota Wisata Cluster Virginia No.L6/5, Ciangsana, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16968";
    cibubur.notes = ((cibubur.notes || "") + " Resolved 2026-11-20: the live Google Maps listing for Sparks Sports Academy - Cibubur sits at exactly the stored coordinates. Coordinate source upgraded from area-approximate to maps-pin; address set to the official lokasi page street address (Maps itself shows only the Ciangsana area name).").trim();
    cibubur.lastCheckedAt = "2026-11-20";
  }

  const deltamas = venues.find((v) => v.id === "rockstar-academy-aeon-mall-deltamas");
  if (deltamas) {
    deltamas.address = "AEON Mall Deltamas, Jl. Ganesha Boulevard, Deltamas City, Central Cikarang District, Bekasi Regency, West Java 17530, 2nd Floor Unit #2-047";
    deltamas.notes = ((deltamas.notes || "") + " Resolved 2026-11-20: the live Google Maps listing for Rockstar Academy AEON Mall Deltamas sits at exactly the stored coordinates. Address set to the official branch page value (street + floor/unit); no longer area-only.").trim();
    deltamas.lastCheckedAt = "2026-11-20";
  }
  const livingWorld = venues.find((v) => v.id === "rockstar-academy-living-world-alam-sutera");
  if (livingWorld) {
    livingWorld.address = "Living World Alam Sutera, Jl. Alam Sutera Boulevard Kav. 21, Pakulonan, Serpong Utara, South Tangerang City, Banten 15325, 2nd Floor Unit #2-19a";
    livingWorld.notes = ((livingWorld.notes || "") + " Resolved 2026-11-20: the live Google Maps listing for Rockstar Academy - Living World Alam Sutera sits at exactly the stored coordinates, and the official branch page confirms the full branch name and street address with floor/unit. The stored 'Jl. Nn No.42' Maps address string is kept as the losing value; no longer area-only.").trim();
    livingWorld.lastCheckedAt = "2026-11-20";
  }
  const utown = venues.find((v) => v.id === "sparks-sports-academy-bintaro-utown");
  if (utown) {
    utown.notes = ((utown.notes || "") + " Resolved 2026-11-20: the stored pin matches the live Google Maps listing for Sparks Sports Academy - Bintaro Utown exactly (Maps address PP4G+MF5, Sawah Lama). The official lokasi page's 'PP4G+G9M, Sawah Baru' is kept as the losing value; the verified Maps pin wins for routing. No longer area-only.").trim();
    utown.lastCheckedAt = "2026-11-20";
  }
}
