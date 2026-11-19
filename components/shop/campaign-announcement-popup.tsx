"use client";

import { useEffect, useState } from "react";

function routeEmbeddedCampaignLinks(html: string, campaignUrl: string) {
  return html.replace(/<a\b[^>]*>/gi, (anchor) => {
    const hrefMatch = anchor.match(/\bhref\s*=\s*(["'])(.*?)\1/i)
    if (!hrefMatch) return anchor

    let pathname = ""
    try {
      pathname = new URL(hrefMatch[2], "https://www.giftijbrandy.com").pathname
    } catch {
      return anchor
    }

    if (pathname.replace(/\/+$/, "") !== "/offers") return anchor

    let updated = anchor.replace(hrefMatch[0], `href="${campaignUrl}"`)
    if (/\btarget\s*=/i.test(updated)) {
      updated = updated.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_top"')
    } else {
      updated = updated.replace(/>$/, ' target="_top">')
    }
    return updated
  })
}

function styleCampaignAnnouncementHtml(html: string) {
  const styles = `<style>
    :root { color-scheme: light; }
    html, body { margin: 0 !important; padding: 0 !important; min-height: 0 !important; background: #fdfaf5 !important; }
    body { box-sizing: border-box !important; padding: clamp(22px, 4vw, 48px) !important; color: #1a1a1a !important; font-family: Arial, Helvetica, sans-serif !important; }
    body * { box-sizing: border-box; }
    h1, h2, h3 { color: #1a1a1a !important; font-family: Georgia, 'Times New Roman', serif !important; }
    p, li { color: #625b50 !important; line-height: 1.75 !important; }
    a, strong, b { color: #9b7930 !important; }
    img { display: block; max-width: 100% !important; height: auto !important; }
  </style>`;
  const headEnd = html.toLowerCase().indexOf("</head>");
  return headEnd >= 0 ? html.slice(0, headEnd) + styles + html.slice(headEnd) : styles + html;
}

export function CampaignAnnouncementPopup({
  title,
  description,
  imageUrl,
  announcementHtml,
  campaignUrl = "/offers",
  ctaLabel = "Shop the offer",
  durationSeconds = 5,
}: {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  announcementHtml?: string | null;
  campaignUrl?: string;
  ctaLabel?: string;
  durationSeconds?: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => setVisible(false), Math.max(2, durationSeconds) * 1000);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, durationSeconds]);

  useEffect(() => {
    if (!visible) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setVisible(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-[#120e08]/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setVisible(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${title} campaign announcement`}
        className="relative w-full max-w-2xl overflow-hidden border border-[#c9a84c]/50 bg-[#fdfaf5] shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
      >
        <button
          type="button"
          aria-label="Close campaign announcement"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/65 text-2xl leading-none text-white shadow-lg transition hover:bg-black"
        >
          ×
        </button>

        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[68vh] w-full object-cover"
          />
        ) : announcementHtml ? (
          <iframe
            title={`${title} announcement creative`}
            srcDoc={styleCampaignAnnouncementHtml(routeEmbeddedCampaignLinks(announcementHtml, campaignUrl))}
            sandbox="allow-top-navigation-by-user-activation"
            referrerPolicy="no-referrer"
            className="h-[min(68vh,560px)] w-full border-0 bg-white"
          />
        ) : (
          <div className="relative overflow-hidden px-7 pb-8 pt-16 text-center sm:px-14 sm:pb-12 sm:pt-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-[#c9a84c]/35" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7930]">
              Giftij Brandy · A special edit
            </p>
            <div aria-hidden="true" className="relative mx-auto my-5 h-px w-16 bg-[#c9a84c]" />
            <h2 className="relative font-serif text-3xl leading-tight text-[#1a1a1a] sm:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="relative mx-auto mt-5 max-w-lg text-base leading-7 text-[#625b50] sm:text-lg">
                {description}
              </p>
            )}
            <p className="relative mt-7 text-[10px] font-medium uppercase tracking-[0.24em] text-[#9b7930]">
              Curated for your moment
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c9a84c]/25 px-5 py-4 sm:px-7">
          <p className="text-xs tracking-wide text-[#766e62]">
            This announcement closes automatically.
          </p>
          <a
            href={campaignUrl}
            onClick={() => setVisible(false)}
            className="inline-flex min-h-11 items-center justify-center bg-[#c9a84c] px-6 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-[#dfc77f]"
          >
            {ctaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
