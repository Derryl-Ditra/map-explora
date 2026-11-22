import type { Venue } from "@/types/venue";

// 2026-11-22 enrichment round F: dated third-party (partner) price listings
// for the three Buumi Playscape branches, all from tiket.com product pages
// read 2026-11-22. Additions only: existing Happy Kamper listings stay.
// Partner prices are admission tickets, never class tuition.

export default function enrich1122f(venues: Venue[]) {
  let updated = 0;

  const pp = venues.find((v) => v.id === "buumi-playscape-pacific-place");
  if (pp) {
    pp.priceListings = [
      ...(pp.priceListings || []),
      {
        sourceKind: "partner" as const,
        amountIdr: 196950,
        unit: "per 2-hour public-play ticket",
        label: "2 Hours Admission, weekday: 1 child + 1 adult, not class tuition",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/id-id/to-do/buumi-playscape-pacific-place",
        checkedAt: "2026-11-22",
        note: "Selected date only; No refund; Anti-slip socks required; Daily cleaning break 13:00-14:00 WIB",
      },
      {
        sourceKind: "partner" as const,
        amountIdr: 199980,
        listPriceIdr: 220000,
        unit: "per all-day public-play ticket",
        label: "All Day Admission, weekday: 1 child + 1 adult, not class tuition",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/id-id/to-do/buumi-playscape-pacific-place",
        checkedAt: "2026-11-22",
        note: "Selected date only; No refund; Promo price shown 10% below list",
      },
    ];
    updated += 1;
  }

  const ps = venues.find((v) => v.id === "buumi-playscape-plaza-senayan");
  if (ps) {
    ps.priceListings = [
      ...(ps.priceListings || []),
      {
        sourceKind: "partner" as const,
        amountIdr: 196950,
        unit: "per public-play ticket (from-price)",
        label: "Play admission from-price: 1 child + 1 adult, not class tuition",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/id-id/to-do/buumi-playscape-plaza-senayan",
        checkedAt: "2026-11-22",
        note: "From-price only; Package breakdown requires date selection; No refund; Anti-slip socks required; Daily cleaning break 13:00-14:00 WIB",
      },
    ];
    updated += 1;
  }

  const uf = venues.find((v) => v.id === "buumi-playscape-urban-forest-cipete");
  if (uf) {
    uf.priceListings = [
      ...(uf.priceListings || []),
      {
        sourceKind: "partner" as const,
        amountIdr: 237350,
        unit: "per 3-hour indoor + outdoor ticket",
        label: "3 Hours Admission, indoor + outdoor, weekday: 1 child + 1 adult, not class tuition",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/en-id/to-do/buumi-play-club-at-urban-forest",
        checkedAt: "2026-11-22",
        note: "Selected date only; No refund; Swimwear for waterplay, anti-slip socks indoors; Pool is a separate ticket",
      },
      {
        sourceKind: "partner" as const,
        amountIdr: 227250,
        listPriceIdr: 250000,
        unit: "per all-day indoor + outdoor ticket",
        label: "All Day Admission, indoor + outdoor, weekday: 1 child + 1 adult, not class tuition",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/en-id/to-do/buumi-play-club-at-urban-forest",
        checkedAt: "2026-11-22",
        note: "Selected date only; No refund; Promo price shown 10% below list",
      },
      {
        sourceKind: "partner" as const,
        amountIdr: 196950,
        unit: "per pool admission ticket",
        label: "Pool Admission, weekday: 1 child, ages 8+ or over 120 cm",
        source: "tiket.com",
        sourceUrl: "https://www.tiket.com/en-id/to-do/buumi-play-club-at-urban-forest",
        checkedAt: "2026-11-22",
        note: "Pool only, sold separately from indoor tickets; No refund",
      },
    ];
    updated += 1;
  }

  if (updated !== 3) {
    throw new Error(`enrich1122f: expected 3 venue price updates, got ${updated}`);
  }
}
