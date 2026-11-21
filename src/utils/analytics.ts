// Visit stats are aggregate-only (GoatCounter, cookie-free). Owner browsing
// and QA runs must not inflate them, so loading the counter is gated here
// instead of being unconditional in the document.
export const QA_PARAM = 'qa';
export const QA_STORAGE_KEY = 'map-explora-qa';
// GoatCounter's own per-browser opt-out (#toggle-goatcounter) sets this flag.
export const GOATCOUNTER_SKIP_KEY = 'skipgc';

type StorageGet = (key: string) => string | null;

// True when the analytics script may load. Blocked by an explicit QA mode
// (?qa=1 in the URL or the stored flag) and by GoatCounter's own browser
// opt-out, decided before any count request is made.
export function analyticsAllowed(search: string, getItem: StorageGet): boolean {
  const qa = new URLSearchParams(search).get(QA_PARAM);
  if (qa === '1' || qa === 'true') return false;
  if (getItem(QA_STORAGE_KEY) === '1') return false;
  if (getItem(GOATCOUNTER_SKIP_KEY) !== null) return false;
  return true;
}

// Persist the QA toggle from the URL so test runs stay excluded across
// navigations; ?qa=0 clears it again.
export function applyQaParam(
  search: string,
  setItem: (key: string, value: string) => void,
  removeItem: (key: string) => void,
): void {
  const qa = new URLSearchParams(search).get(QA_PARAM);
  if (qa === '1' || qa === 'true') setItem(QA_STORAGE_KEY, '1');
  else if (qa === '0' || qa === 'false') removeItem(QA_STORAGE_KEY);
}
