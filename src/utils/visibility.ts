import { Venue } from "@/types/venue";

// Rule (owner, 2026-11-04): places that are only partially checked or whose
// aliveness is unverified stay in the repo data but are not shown to users.
// A place is shown when an official source (the brand's own branch list,
// schedule page or site) says it operates. Amended 2026-11-11 (owner decision):
// partner + Maps evidence is enough to publish small brands, so "partner-listed"
// (booking-platform provider page AND an active Maps listing) is shown too.
// Maps-only and not-confirmed records, and records with no operatingStatus at
// all, stay hidden.
export function isShownToUsers(v: Pick<Venue, "operatingStatus">): boolean {
  return v.operatingStatus?.state === "official-listed" || v.operatingStatus?.state === "partner-listed";
}
