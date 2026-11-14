"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Venue } from "@/types/venue";
import { X, Share2 } from "lucide-react";
import { buildShareText, buildVenueUrl, shareLanguage } from "@/utils/shareText";



// OPTIONAL REVIEW COMMIT: revert this file to keep map-short-link sharing.
// Landing pages keep the map as the primary CTA. No send occurs without a tap.
export default function ShareCard({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const nativeShareAvailable = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === "function",
    () => false
  );
  const [status, setStatus] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const textBox = useRef<HTMLTextAreaElement>(null);
  const shareUrl = buildVenueUrl(venue);
  const lang=typeof window!=='undefined'?shareLanguage(new URLSearchParams(window.location.search),document.documentElement.lang):'en';
  const shareText = buildShareText(venue,lang);
  const [manual,setManual]=useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    return () => previous?.focus();
  }, []);
  const share = async () => {
    if (!navigator.share) { setStatus(lang==='id'?'Fitur berbagi tidak tersedia. Salin teks di bawah.':'Phone sharing is unavailable. Copy the text below.'); return; }
    try {
      await navigator.share({ title: `${venue.chain ?? ""} ${venue.branchName}`.trim(), text: shareText.replace(shareUrl, "").trim(), url: shareUrl });
      setStatus(lang==='id'?"Diteruskan ke aplikasi":"Handed off to app");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setStatus(lang==='id'?'Gagal berbagi. Salin teks atau pilih teks di bawah.':'Sharing failed. You can copy or select the text below.');
    }
  };
  const copy = async (kind:'link'|'plain'|'whatsapp') => {
    try {await navigator.clipboard.writeText(kind==='link'?shareUrl:kind==='whatsapp'?buildShareText(venue,lang,'whatsapp'):shareText);setStatus(lang==='id'?'Tersalin':'Copied');}
    catch {setManual(true);setStatus(lang==='id'?'Pilih dan salin teks di bawah.':'Select and copy the text below.');textBox.current?.focus();textBox.current?.select();}
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
      <div className="flex items-center justify-between gap-3"><h2 id="share-title" className="font-bold">{lang==='id'?'Bagikan tempat ini':'Share this place'}</h2><button type="button" aria-label={lang==='id'?'Tutup berbagi':'Close share'} onClick={onClose} className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] flex items-center justify-center"><X className="w-5 h-5" /></button></div>
      <div className="p-4 bg-white rounded-2xl border border-[#e7e0d4] whitespace-pre-wrap text-base leading-relaxed">{shareText}</div>
      <div className="flex gap-2">
        {nativeShareAvailable && <button type="button" onClick={share} className="min-h-12 flex-1 rounded-full bg-[#1a7a4a] text-white font-bold flex items-center justify-center gap-2"><Share2 className="w-5 h-5" />{lang==='id'?'Bagikan':'Share'}</button>}
        <button type="button" onClick={()=>copy('plain')} className="min-h-12 flex-1 rounded-full bg-white border border-[#1a7a4a] text-[#14532d] font-bold">{lang==='id'?'Salin teks':'Copy text'}</button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label={lang==='id'?'Pilihan berbagi lainnya':'More share options'}><button className="min-h-12 px-3 underline" onClick={()=>copy('link')}>{lang==='id'?'Salin tautan':'Copy link'}</button><button className="min-h-12 px-3 underline" onClick={()=>copy('whatsapp')}>{lang==='id'?'Salin untuk WhatsApp':'Copy for WhatsApp'}</button></div>
      <p role="status" aria-live="polite" className="text-sm text-[#6d675f]">{status || (lang==='id'?'Tautan membuka halaman tempat ini. Gunakan tombol peta untuk membandingkan tempat di sekitar.':'The link opens this place page. Use its map button to compare nearby places.')}</p>
      {manual&&<><label htmlFor="share-text">{lang==='id'?'Salin teks':'Copy text'}</label><textarea id="share-text" ref={textBox} readOnly value={shareText} rows={7} className="w-full p-3 bg-white border border-[#e7e0d4] rounded-xl text-sm select-text" /></>}
    </div>
  </div>;
}
