import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/layout/site-nav"
import { ColourSelector } from "@/components/product/colour-selector"
import { ProductGallery } from "@/components/product/product-gallery"
import { PurchasePanel } from "@/components/product/purchase-panel"
import { getProductWithVariantGroups } from "@/lib/api/adapter"
import { formatPrice, getDiscountedPrice } from "@/lib/format"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ color?: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProductWithVariantGroups(slug)

  return {
    title: result
      ? `${result.product.name} — Giftij Brandy`
      : "Product — Giftij Brandy",
  }
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params
  const { color } = await searchParams

  const result = await getProductWithVariantGroups(slug)

  if (!result) {
    notFound()
  }

  const { product, groups } = result

  const activeGroup =
    groups.find((group) => group.colorSlug === color) ??
    groups[0] ??
    null

  /*
   * The selected colour's own variant image is always the primary image.
   * Product-level gallery images are additional angles and are displayed
   * after the selected variant image.
   */
  const variantImage = activeGroup?.image || ""

  const additionalAngles = (product.images ?? [])
    .map((image) =>
      typeof image === "string" ? image : image.url,
    )
    .filter(
      (src): src is string => Boolean(src),
    )

  const galleryImages = Array.from(
    new Set(
      [
        variantImage,
        product.coverImage ?? "",
        ...additionalAngles,
      ].filter(
        (src): src is string => Boolean(src),
      ),
    ),
  )

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discount,
    product.discountedPrice,
  )

  return (
    <>
      <SiteNav theme="light" />

      <div className="gb-pdp">
        <ProductGallery
          key={
            activeGroup?.colorSlug ??
            product.slug
          }
          images={galleryImages}
          alt={`${product.name}${
            activeGroup
              ? ` — ${activeGroup.colour}`
              : ""
          }`}
        />

        <div>
          {product.categories?.[0]?.name && (
            <p className="gb-pdp-eyebrow">
              {product.categories[0].name}
            </p>
          )}

          <h1 className="gb-pdp-title">
            {product.name}
          </h1>

          <div className="gb-pdp-price-row">
            <span className="gb-pdp-price">
              {formatPrice(
                discountedPrice ??
                  product.price,
              )}
            </span>

            {discountedPrice !== null && (
              <span className="gb-product-price-old">
                {formatPrice(product.price)}
              </span>
            )}

            {product.discount ? (
              <span
                className="gb-product-badge"
                style={{ position: "static" }}
              >
                -{product.discount}%
              </span>
            ) : null}
          </div>

          <div style={{ marginBottom: 24 }}>
            <ColourSelector
              groups={groups}
              activeColorSlug={
                activeGroup?.colorSlug
              }
              productSlug={slug}
            />
          </div>

          <PurchasePanel
            key={
              activeGroup?.colorSlug ?? slug
            }
            productSlug={slug}
            name={product.name}
            colour={
              activeGroup?.colour ?? null
            }
            image={variantImage}
            price={
              discountedPrice ??
              product.price
            }
            group={activeGroup}
            productInStock={
              product.inStock ?? true
            }
          />

          {product.fullDesc && (
            <div style={{ marginTop: 32 }}>
              <p className="gb-pdp-section-title">
                Description
              </p>

              <p className="gb-pdp-description">
                {product.fullDesc}
              </p>
            </div>
          )}

          {product.specs &&
            product.specs.length > 0 && (
              <div
                style={{ marginTop: 24 }}
              >
                <p className="gb-pdp-section-title">
                  Details
                </p>

                <ul
                  style={{
                    fontSize: 14,
                    color: "#4a4540",
                    lineHeight: 1.9,
                  }}
                >
                  {product.specs.map(
                    (spec) => (
                      <li key={spec.label}>
                        <strong>
                          {spec.label}:
                        </strong>{" "}
                        {spec.value}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
    </>
  )
}