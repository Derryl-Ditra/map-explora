// 2026-11-26 data capture (owner request): official Instagram handles for
// visible branches, each taken from the provider's own official website.
import type { Venue } from "../types/venue";

const INSTAGRAM: Record<string, string> = {
  // linked from https://www.sociablegrouplearning.com/
  "sociable-inclusive-learning-meruya": "https://www.instagram.com/sociable.learning/",
  // linked from https://montessorischoolbogor.com/
  "kiddiegym-bogor-siliwangi": "https://www.instagram.com/kiddieland_bogor/",
  // linked from https://buminusantaramontessori.sch.id/
  "bumi-nusantara-montessori-bsd": "https://www.instagram.com/bnmontessori/",
  // linked from https://www.kimiandfriends.id/
  "kimi-friends-montessori-gading-serpong": "https://www.instagram.com/kimiandfriends.montessori/",
};

export default function enrich1128(venues: Venue[]) {
  for (const v of venues) {
    const ig = INSTAGRAM[v.id];
    if (ig && !v.instagram) {
      v.instagram = ig;
    }
  }
}
