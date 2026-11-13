"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Venue } from "@/types/venue";
import { X, Copy, Check, Share2 } from "lucide-react";
import { buildClassLines, buildShareText, buildVenueUrl } from "@/utils/shareText";

export default function ShareCard({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const nativeShareAvailable = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === "function",
    () => false
  );
  const [status, setStatus] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const textBox = useRef<HTMLTextAreaElement>(null);
  const shareText = buildShareText(venue);
  const classLines = buildClassLines(venue);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    return () => previous?.focus();
  }, []);
  const share = async () => {
    if (!navigator.share) { setStatus("Phone sharing is unavailable. Copy the text below."); return; }
    try {
      await navigator.share({ title: `${venue.chain ?? ""} ${venue.branchName}`.trim(), text: shareText.replace(buildVenueUrl(venue), "").trim(), url: buildVenueUrl(venue) });
      setStatus("Shared");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setStatus("Sharing failed. You can copy or select the text below.");
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(shareText); setStatus("Copied to clipboard"); }
    catch { setStatus("Copy was blocked. Select the text below and copy it manually."); textBox.current?.focus(); textBox.current?.select(); }
  };
  return <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-3" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="share-title" tabIndex={-1} onKeyDown={e => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = panel.current?.querySelectorAll<HTMLElement>("button,textarea,a[href]");
        if (!items?.length) return;
        const first=items[0],last=items[items.length-1];
        if (e.shiftKey && document.activeElement===first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement===last) { e.preventDefault(); first.focus(); }
      }
    }} className="w-full max-w-sm max-h-[90dvh] overflow-y-auto overscroll-contain bg-[#f6f2ec] rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-[#221d18] relative">
      <div className="flex items-center justify-between gap-3"><h2 id="share-title" className="font-bold">Share this place</h2><button type="button" aria-label="Close share" onClick={onClose} className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] flex items-center justify-center"><X className="w-5 h-5" /></button></div>
      <div className="p-4 bg-white rounded-2xl border border-[#e7e0d4]"><p className="font-bold">{venue.chain ? `${venue.chain} ` : ""}{venue.branchName}</p><p className="text-[#6d675f]">{venue.area}</p>{classLines && <p className="mt-2 text-sm">{classLines}</p>}</div>
      {nativeShareAvailable && <button type="button" onClick={share} className="min-h-12 rounded-full bg-[#1a7a4a] text-white font-bold flex items-center justify-center gap-2"><Share2 className="w-5 h-5" />Share</button>}
      <button type="button" onClick={copy} className="min-h-12 rounded-full border-2 border-[#1a7a4a] text-[#14532d] font-bold flex items-center justify-center gap-2">{status==="Copied to clipboard" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}Copy share text</button>
      <p role="status" aria-live="polite" className="text-sm text-[#6d675f]">{status || "The link opens this place directly."}</p>
      <label className="text-sm font-semibold" htmlFor="share-text">Share text <span className="font-normal text-[#6d675f]">({shareText.length}/500)</span></label><textarea id="share-text" ref={textBox} readOnly value={shareText} rows={9} className="w-full p-3 bg-white border border-[#e7e0d4] rounded-xl text-sm select-text" />
    </div>
  </div>;
}
