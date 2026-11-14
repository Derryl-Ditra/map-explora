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
 return <div className="min-w-0 flex-1" role="status">
  <p className="font-semibold">{id?'Lokasi belum diizinkan':'Location access is denied'}</p>
  <p className="mt-1">{inApp?(id?'Browser dalam aplikasi ini mungkin membatasi lokasi. Peta dan daftar tempat tetap bisa dipakai.':'This in-app browser may limit location access. You can still use the map and place list.'):(id?'Peta dan daftar tempat tetap bisa dipakai. Untuk memakai lokasi, izinkan akses di browser atau buka tautan ini di browser lain.':'You can still use the map and place list. To use location, allow access in your browser or open this link in another browser.')}</p>
  {inApp&&<p className="mt-2">{id?'Buka menu aplikasi (biasanya titik tiga), lalu pilih buka di browser jika tersedia. Atau salin tautan ini dan tempel di Chrome atau Safari.':'Use the app menu (often three dots) and choose open in browser if available. Or copy this link and paste it into Chrome or Safari.'}</p>}
  <div className="mt-2 flex flex-wrap gap-2">
   <button type="button" onClick={copy} className="min-h-12 rounded-xl border border-[#1a7a4a] px-3 font-semibold text-[#14532d]">{id?'Salin tautan':'Copy link'}</button>
   {inApp&&intent&&<a href={intent} className="min-h-12 inline-flex items-center rounded-xl bg-[#1a7a4a] px-3 font-semibold text-white">{id?'Coba buka Chrome':'Try Chrome'}</a>}
  </div>
  {inApp&&intent&&<p className="mt-1 text-xs">{id?'Jika tidak terbuka, gunakan menu aplikasi atau salin tautan.':'If it stays here, use the app menu or copy the link.'}</p>}
  {status&&<p className="mt-2">{status}</p>}
  {manual&&<label className="mt-2 block">{id?'Tautan halaman':'Page link'}<input ref={input} readOnly value={href} onFocus={e=>e.target.select()} onClick={e=>e.currentTarget.select()} className="mt-1 min-h-12 w-full min-w-0 rounded border p-2 select-text" /></label>}
 </div>;
}
