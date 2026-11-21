"use client";
import { useEffect } from "react";
import { analyticsAllowed, applyQaParam } from "@/utils/analytics";

// Loads GoatCounter only when analyticsAllowed() says so. In QA mode or after
// the GoatCounter browser opt-out, no count request is made at all, which
// automated tests can assert deterministically.
export default function Analytics() {
  useEffect(() => {
    let allowed = true;
    try {
      const storage = window.localStorage;
      applyQaParam(window.location.search, (k, v) => storage.setItem(k, v), (k) => storage.removeItem(k));
      allowed = analyticsAllowed(window.location.search, (k) => storage.getItem(k));
    } catch {
      // Storage can be unavailable (strict privacy modes); fall back to the
      // previous always-on behavior rather than breaking the page.
      allowed = true;
    }
    if (!allowed) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.goatcounter = "https://map-explora.goatcounter.com/count";
    script.src = "https://gc.zgo.at/count.js";
    document.body.appendChild(script);
  }, []);
  return null;
}
