"use client";

import { useEffect, useRef } from "react";

// Handle dragging works with mouse/pen/touch. Content can dismiss only from
// scrollTop zero; upward swipes, horizontal swipes and multi-touch remain native.
export function useSheetGesture(enabled: boolean, onDismiss: () => void) {
  const sheet = useRef<HTMLElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const dismiss = useRef(onDismiss);
  useEffect(() => { dismiss.current = onDismiss; }, [onDismiss]);
  useEffect(() => {
    const el = sheet.current, grip = handle.current, body = content.current;
    if (!enabled || !el || !grip || !body) return;
    let suppressClick = false;
    const click = (e: MouseEvent) => { if (suppressClick) { e.preventDefault(); e.stopImmediatePropagation(); suppressClick = false; } };
    let startX = 0, startY = 0, distance = 0, startedAt = 0, tracking = false;
    const start = (x: number, y: number) => { startX = x; startY = y; distance = 0; startedAt = performance.now(); tracking = true; };
    const move = (x: number, y: number) => {
      if (!tracking) return false;
      const dy = y - startY;
      if (Math.abs(x - startX) > Math.abs(dy) && distance === 0) { tracking = false; return false; }
      distance = Math.max(0, dy);
      el.style.transition = "none";
      el.style.transform = `translateY(${distance}px)`;
      return distance > 5;
    };
    const finish = (cancel = false) => {
      if (!tracking) return;
      tracking = false;
      suppressClick = distance > 5;
      el.style.transition = "";
      el.style.transform = "";
      const velocity = distance / Math.max(1, performance.now() - startedAt);
      if (!cancel && (distance > Math.min(120, el.clientHeight * .18) || (distance > 45 && velocity > .6))) dismiss.current();
    };
    const down = (e: PointerEvent) => { if (e.isPrimary) { grip.setPointerCapture(e.pointerId); start(e.clientX, e.clientY); } };
    const pointerMove = (e: PointerEvent) => { move(e.clientX, e.clientY); };
    const up = () => finish();
    const cancel = () => finish(true);
    const touchStart = (e: TouchEvent) => { if (e.touches.length === 1 && body.scrollTop <= 0 && !(e.target as HTMLElement).closest("input,button,a,textarea,select")) start(e.touches[0].clientX, e.touches[0].clientY); else tracking = false; };
    const touchMove = (e: TouchEvent) => { if (e.touches.length !== 1) { finish(true); return; } if (move(e.touches[0].clientX, e.touches[0].clientY)) e.preventDefault(); };
    grip.addEventListener("click", click, true);
    grip.addEventListener("pointerdown", down); grip.addEventListener("pointermove", pointerMove); grip.addEventListener("pointerup", up); grip.addEventListener("pointercancel", cancel);
    body.addEventListener("touchstart", touchStart, { passive: true }); body.addEventListener("touchmove", touchMove, { passive: false }); body.addEventListener("touchend", up); body.addEventListener("touchcancel", cancel);
    return () => {
      el.style.transform = ""; el.style.transition = "";
      grip.removeEventListener("click", click, true);
      grip.removeEventListener("pointerdown", down); grip.removeEventListener("pointermove", pointerMove); grip.removeEventListener("pointerup", up); grip.removeEventListener("pointercancel", cancel);
      body.removeEventListener("touchstart", touchStart); body.removeEventListener("touchmove", touchMove); body.removeEventListener("touchend", up); body.removeEventListener("touchcancel", cancel);
    };
  }, [enabled]);
  return { sheet, handle, content };
}
