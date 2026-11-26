// Opening hours are stored language-neutral with English weekday abbreviations.
// This swaps them for Indonesian ones on the Bahasa pages.
const ID_DAYS: Record<string, string> = { Mon: "Sen", Tue: "Sel", Wed: "Rab", Thu: "Kam", Fri: "Jum", Sat: "Sab", Sun: "Min" };

export function hoursTextId(text: string): string {
  return text.replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g, (d) => ID_DAYS[d]).replace(/\bclosed\b/g, "tutup");
}

export function hoursLabel(kind: "school" | undefined, lang: "en" | "id"): string {
  if (kind === "school") return lang === "id" ? "Jam sekolah" : "School hours";
  return lang === "id" ? "Jam buka" : "Opening hours";
}
