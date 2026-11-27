"use client";

import { useEffect, useState } from "react";

type LockStatus = { locked: boolean; message: string | null; reopeningAt: string | null };

export function StorefrontLockNotice() {
  const [status,setStatus]=useState<LockStatus | null>(null);
  useEffect(()=>{
    let active=true;
    fetch("/api/storefront/status",{cache:"no-store"})
      .then(r=>r.ok?r.json():null)
      .then(payload=>{if(active&&payload?.success&&payload.data)setStatus(payload.data);})
      .catch(()=>{});
    return ()=>{active=false;};
  },[]);
  if(!status?.locked)return null;
  const reopening = status.reopeningAt ? new Date(status.reopeningAt) : null;
  const reopeningLabel = reopening && !Number.isNaN(reopening.getTime())
    ? new Intl.DateTimeFormat("en-NG",{dateStyle:"full",timeStyle:"short",timeZone:"Africa/Lagos"}).format(reopening)+" WAT"
    : null;
  return <div role="dialog" aria-modal="true" aria-labelledby="store-lock-title" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-5 py-8">
    <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream text-2xl">♡</div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Giftij Brandy</p>
      <h2 id="store-lock-title" className="mt-2 font-display text-2xl text-ink">We’ll be back soon</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-ink/70">{status.message || "Our online store is temporarily closed. Please check back soon."}</p>
      {reopeningLabel&&<p className="mt-4 rounded-xl bg-cream px-4 py-3 text-sm font-medium text-ink">Reopening: {reopeningLabel}</p>}
      <p className="mt-4 text-xs text-ink/45">Thank you for your patience and for choosing Giftij Brandy.</p>
    </div>
  </div>;
}
