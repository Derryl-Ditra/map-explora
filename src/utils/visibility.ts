import { Venue } from "@/types/venue";

// Rule (owner, 2026-11-04): places that are only partially checked or whose
// aliveness is unverified stay in the repo data but are not shown to users.
// A place is shown only when an official source (the brand's own branch list,
// schedule page or site) says it operates. Maps-only and not-confirmed
// records, and records with no operatingStatus at all, stay hidden.
export function isShownToUsers(v: Pick<Venue, "operatingStatus">): boolean {
  return v.operatingStatus?.state === "official-listed";
}
