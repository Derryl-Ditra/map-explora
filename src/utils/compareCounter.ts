// Owner scope: aggregate opens only. No branch/user IDs, location, search,
// cookies or person-level history. The existing analytics SDK adds query
// strings and derives location, so it MUST NOT be used for this event.
export const COMPARE_COUNTER_ENABLED = false;
export const COMPARE_OPEN_EVENT = Object.freeze({event: 'compare-open', count: 1});
export function recordCompareOpen() {
  // Deliberately no network or storage until an aggregate-only endpoint and
  // retention are verified. A local UI open is not a recorded analytics hit.
  return { enabled: COMPARE_COUNTER_ENABLED, event: COMPARE_OPEN_EVENT };
}
