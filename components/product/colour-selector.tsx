import Link from "next/link"
import type { VariantGroup } from "@/lib/api/types"

export function ColourSelector({
  groups,
  activeColorSlug,
  productSlug,
}: {
  groups: VariantGroup[]
  activeColorSlug?: string
  productSlug: string
}) {
  if (groups.length <= 1) return null

  return (
    <div>
      <p className="gb-pdp-section-title">Colour</p>
      <div className="gb-colour-list">
        {groups.map((group) => (
          <Link
            key={group.colorSlug}
            href={`/product/${productSlug}?color=${group.colorSlug}`}
            className="gb-colour-swatch"
            data-active={group.colorSlug === activeColorSlug}
          >
            {group.colour}
          </Link>
        ))}
      </div>
    </div>
  )
}
