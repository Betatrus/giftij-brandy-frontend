"use client"

import { useState } from "react"

/**
 * Renders an <img> from /public and gracefully falls back to
 * decorative artwork if the file hasn't been uploaded yet (rather
 * than a browser's broken-image icon). Once the named file exists
 * in /public, it just appears — no code change needed.
 */
export function ImageOrFallback({
  src,
  alt,
  fallback,
  className,
}: {
  src: string
  alt: string
  fallback: React.ReactNode
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) return <>{fallback}</>

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={encodeURI(src)}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
