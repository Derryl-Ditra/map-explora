// Opening hours are stored language-neutral with English weekday abbreviations.
// This swaps them for Indonesian ones on the Bahasa pages.
const ID_DAYS: Record<string, string> = { Mon: "Sen", Tue: "Sel", Wed: "Rab", Thu: "Kam", Fri: "Jum", Sat: "Sab", Sun: "Min" };

export function hoursTextId(text: string): string {
  return text.replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g, (d) => ID_DAYS[d]).replace(/\bclosed\b/g, "tutup");
}

export function hoursLabel(kind: "school" | undefined, lang: "en" | "id", source?: "google-maps"): string {
  if (kind === "school") return lang === "id" ? "Jam sekolah" : "School hours";
  if (source === "google-maps") return lang === "id" ? "Jam buka tempat" : "Venue hours";
  return lang === "id" ? "Jam buka" : "Opening hours";
}

// Maps hours describe when the venue is open, not when a class runs.
export function hoursCaption(source: "google-maps" | undefined, lang: "en" | "id"): string {
  if (source !== "google-maps") return "";
  return lang === "id" ? "Jadwal kelas bisa beda. Konfirmasi lewat telepon." : "Class times can differ. Confirm by phone.";
}
