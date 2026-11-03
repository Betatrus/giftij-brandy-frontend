"use client"

import { useState } from "react"
import { storefrontImageUrl } from "@/lib/images"

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const gallery = images.length > 0 ? images : [""]

  return (
    <div>
      <div className="gb-pdp-gallery-main">
        {gallery[active] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={storefrontImageUrl(gallery[active], 1200)} alt={alt} fetchPriority="high" decoding="async" />
        ) : null}
      </div>

      {gallery.length > 1 && (
        <div className="gb-pdp-thumbs">
          {gallery.map((src, index) => (
            <button
              key={src + index}
              type="button"
              className="gb-pdp-thumb"
              data-active={index === active}
              onClick={() => setActive(index)}
              aria-label={`Show angle ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={storefrontImageUrl(src, 240)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
