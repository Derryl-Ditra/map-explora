'use client';
import {useRef,useState} from 'react';
import {chromeIntent,isInAppBrowser,locationLanguage} from '@/utils/inAppBrowser';
export default function LocationNotice({message,denied}:{message:string;denied:boolean}) {
 const [status,setStatus]=useState(''),[manual,setManual]=useState(false);
 const input=useRef<HTMLInputElement>(null);
 const lang=locationLanguage(new URLSearchParams(window.location.search),document.documentElement.lang);
 const id=lang==='id',ua=navigator.userAgent,inApp=isInAppBrowser(ua);
 const href=window.location.href,intent=/Android/i.test(ua)?chromeIntent(href):null;
 const copy=async()=>{
  try{await navigator.clipboard.writeText(href);setStatus(id?'Tautan tersalin. Tempel di Chrome atau Safari.':'Link copied. Paste it into Chrome or Safari.');}
  catch{setManual(true);setStatus(id?'Pilih dan salin tautan di bawah.':'Select and copy the link below.');}
 };
 if(!denied)return <span>{message}</span>;
 // Denied: one short line a parent can act on. Copy-link help only inside in-app browsers, where it is the real fix.
 return <div className="min-w-0 flex-1 leading-snug" role="status">
  <p><span className="font-semibold">{id?'Lokasi mati.':'Location is off.'}</span> {inApp?(id?'Browser dalam aplikasi ini memblokir lokasi. Buka di Chrome atau Safari untuk memakainya.':'This in-app browser blocks location. Open the page in Chrome or Safari to use it.'):(id?'Pilih area di bawah, atau izinkan lokasi di pengaturan browser.':'Pick an area below, or allow location in your browser settings.')}</p>
  {inApp&&<div className="mt-1.5 flex flex-wrap gap-2">
   <button type="button" onClick={copy} className="min-h-11 rounded-xl border border-[#1a7a4a] px-3 font-semibold text-[#14532d]">{id?'Salin tautan':'Copy link'}</button>
   {intent&&<a href={intent} className="min-h-11 inline-flex items-center rounded-xl bg-[#1a7a4a] px-3 font-semibold text-white">{id?'Coba buka Chrome':'Try Chrome'}</a>}
  </div>}
  {status&&<p className="mt-2">{status}</p>}
  {manual&&<label className="mt-2 block">{id?'Tautan halaman':'Page link'}<input ref={input} readOnly value={href} onFocus={e=>e.target.select()} onClick={e=>e.currentTarget.select()} className="mt-1 min-h-12 w-full min-w-0 rounded border p-2 select-text" /></label>}
 </div>;
}
