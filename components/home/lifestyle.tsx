"use client"

import { useRef, useState } from "react"

/**
 * "A Bag Built Around You" — the Brand Story video section,
 * ported from public/index.html (Brand Story.mp4 background,
 * sound toggle, caption and the three numbered features).
 */

const FEATURES = [
  {
    num: "I",
    title: "Premium Materials, Always",
    desc: "Full-grain and Italian leather — quality you can feel from the moment you touch it.",
  },
  {
    num: "II",
    title: "Every Budget, Every Taste",
    desc: "From affordable everyday bags to statement luxury pieces — something for every woman.",
  },
  {
    num: "III",
    title: "Timeless, Not Trendy",
    desc: "Styles that remain iconic across seasons, boardrooms, and Sunday brunches alike.",
  },
]

export function Lifestyle() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="gb-lifestyle">
      <div className="gb-lifestyle-video-side">
        <video ref={videoRef} className="gb-lifestyle-video" autoPlay muted loop playsInline preload="metadata">
          <source src="/Brand Story.mp4" type="video/mp4" />
        </video>
        <div className="gb-lifestyle-video-overlay" />

        <button className="gb-sound-toggle" onClick={toggleSound} aria-label="Toggle video sound">
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        <div className="gb-video-caption">
          <p className="gb-video-caption-tag">Behind the Brand</p>
          <p className="gb-video-caption-title">
            She shops.
            <br />
            She shines.
          </p>
        </div>
      </div>

      <div className="gb-lifestyle-content">
        <p className="gb-section-label">Crafted For Her Life</p>
        <h2 className="gb-section-title">
          A Bag Built Around <span className="gb-em">You.</span>
        </h2>

        <ul className="gb-lifestyle-features">
          {FEATURES.map((f) => (
            <li className="gb-lifestyle-feature" key={f.num}>
              <span className="gb-feature-num">{f.num}</span>
              <div>
                <p className="gb-feature-title">{f.title}</p>
                <p className="gb-feature-desc">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
