'use client';
import {useEffect}from'react';
export default function ShortPlaceRedirect({path}:{path:string}) {
 useEffect(()=>{window.location.replace((process.env.NODE_ENV==='production'?'/map-explora':'')+path);},[path]);
 return null;
}
