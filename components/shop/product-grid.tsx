import { ProductCard } from "./product-card"
import type { VariantCard } from "@/lib/api/types"

export function ProductGrid({
  cards,
  emptyMessage = "No products found in this category yet. Please check back soon.",
}: {
  cards: VariantCard[]
  emptyMessage?: string
}) {
  if (cards.length === 0) {
    return (
      <div className="gb-empty-state">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="gb-product-grid">
      {cards.map((card, index) => (
        <ProductCard key={card.id} card={card} priority={index < 2} />
      ))}
    </div>
  )
}
