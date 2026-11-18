"use client";

import { useEffect, useState } from "react";

export function CampaignAnnouncementPopup({
  title,
  description,
  imageUrl,
  announcementHtml,
}: {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  announcementHtml?: string | null;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 6000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible || (!imageUrl && !announcementHtml && !description)) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} campaign announcement`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4"
    >
      <section className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close campaign announcement"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-xl text-white"
        >
          ×
        </button>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="max-h-[65vh] w-full object-cover" />
        ) : announcementHtml ? (
          <iframe
            title={`${title} announcement creative`}
            srcDoc={announcementHtml}
            sandbox=""
            referrerPolicy="no-referrer"
            className="h-[min(65vh,520px)] w-full border-0 bg-white"
          />
        ) : (
          <div className="px-7 pb-4 pt-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Giftij Brandy offer</p>
            <h2 className="mt-3 font-display text-2xl text-ink">{title}</h2>
            {description && <p className="mt-3 text-sm leading-6 text-ink/65">{description}</p>}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <p className="text-xs text-ink/45">This announcement closes automatically.</p>
          <a href="#offer-products" onClick={() => setVisible(false)} className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-white">
            Shop offers
          </a>
        </div>
      </section>
    </div>
  );
}
