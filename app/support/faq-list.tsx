"use client"

import { useState } from "react"

export interface Faq {
  q: string
  a: string
}

/** Accordion FAQ, ported from public/support.html. */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => (
        <div className="gb-faq-item" key={item.q}>
          <button
            className="gb-faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <span className="gb-faq-icon" data-open={open === i}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
          {open === i && <div className="gb-faq-answer">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}
