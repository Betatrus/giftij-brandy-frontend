"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

type Announcement = {
  id:string; name:string; slug:string; headline:string; caption?:string|null; message?:string|null;
  imageUrl?:string|null; announcementMode:string; ctaLabel:string; popupEnabled:boolean; bannerEnabled:boolean; popupSeconds:number;
};

export function CampaignAnnouncements() {
  const [items,setItems]=useState<Announcement[]>([]);
  const [popup,setPopup]=useState<Announcement|null>(null);
  const [banner,setBanner]=useState<Announcement|null>(null);
  const [closed,setClosed]=useState(false);

  useEffect(()=>{
    let alive=true;
    fetch("/api/offers/active",{cache:"no-store"})
      .then(r=>r.ok?r.json():null)
      .then(payload=>{
        if(!alive||!payload?.success||!Array.isArray(payload.data))return;
        const announcements=payload.data as Announcement[];
        setItems(announcements);
        const popupItem=announcements.find(item=>item.popupEnabled);
        const bannerItem=announcements.find(item=>item.bannerEnabled);
        if(bannerItem)setBanner(bannerItem);
        if(popupItem){
          let alreadySeen=false;
          try{alreadySeen=sessionStorage.getItem("gb-campaign-popup:"+popupItem.id)==="seen";}catch{}
          if(!alreadySeen){
            setPopup(popupItem);
            try{sessionStorage.setItem("gb-campaign-popup:"+popupItem.id,"seen");}catch{}
            window.setTimeout(()=>setPopup(null),Math.max(2,Math.min(20,popupItem.popupSeconds||6))*1000);
          }
        }
      })
      .catch(()=>{});
    return ()=>{alive=false;};
  },[]);

  if(items.length===0)return null;
  return <>
    {banner&&!closed&&<div className="relative z-40 bg-[#173f35] px-4 py-2.5 text-center text-sm text-[#fff8e8]">
      <Link href={`/offers/${banner.slug}`} className="inline-flex items-center justify-center gap-2 font-medium hover:underline">
        <span>{banner.caption||banner.headline}</span><span className="font-semibold text-[#e6c978]">{banner.ctaLabel||"Explore offers"} →</span>
      </Link>
      <button onClick={()=>setClosed(true)} aria-label="Dismiss announcement" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 hover:bg-white/10"><X size={15}/></button>
    </div>}
    {popup&&<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101a16]/55 p-4 backdrop-blur-[3px]" role="dialog" aria-modal="true" aria-label={popup.headline}>
      <div className="relative w-full max-w-xl overflow-hidden rounded-[26px] bg-[#173f35] text-[#fbf5e7] shadow-2xl">
        <button onClick={()=>setPopup(null)} aria-label="Close offer announcement" className="absolute right-3 top-3 z-10 rounded-full bg-black/20 p-2 text-white hover:bg-black/40"><X size={18}/></button>
        {popup.imageUrl&&<div className="relative aspect-[16/8] w-full"><Image src={popup.imageUrl} alt="" fill sizes="(max-width:640px) 100vw, 576px" className="object-cover"/></div>}
        <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#e6c978]">{popup.name}</p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl">{popup.headline}</h2>
          {popup.caption&&<p className="mt-3 text-base font-medium text-[#f3e7c9]">{popup.caption}</p>}
          {popup.message&&<p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/75">{popup.message}</p>}
          <Link href={`/offers/${popup.slug}`} onClick={()=>setPopup(null)} className="mt-7 inline-flex rounded-full bg-[#e5c575] px-7 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#f3d993]">{popup.ctaLabel||"Explore offers"} <span className="ml-2">→</span></Link>
        </div>
      </div>
    </div>}
  </>;
}
