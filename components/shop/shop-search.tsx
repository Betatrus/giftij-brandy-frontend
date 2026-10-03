"use client"

import { FormEvent, useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styles from "./shop-search.module.css"

const SEARCH_DEBOUNCE_MS = 300

export function ShopSearch({
  initialQuery,
  category,
  placeholder,
}: {
  initialQuery: string
  category?: string
  placeholder: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(initialQuery)
  const [isPending, startTransition] = useTransition()
  const lastAppliedQuery = useRef(initialQuery)

  useEffect(() => {
    setValue(initialQuery)
    lastAppliedQuery.current = initialQuery
  }, [initialQuery])

  function navigate(nextQuery: string) {
    const cleanQuery = nextQuery.trim()
    if (cleanQuery === lastAppliedQuery.current) return

    const params = new URLSearchParams(searchParams.toString())

    if (category) params.set("category", category)
    else params.delete("category")

    if (cleanQuery) params.set("q", cleanQuery)
    else params.delete("q")

    lastAppliedQuery.current = cleanQuery

    const nextUrl = params.size > 0
      ? `${pathname}?${params.toString()}`
      : pathname

    startTransition(() => {
      router.replace(nextUrl, { scroll: false })
    })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => navigate(value), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(value)
  }

  function clearSearch() {
    setValue("")
    navigate("")
  }

  return (
    <section className={styles.searchSection} aria-label="Product search">
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
        <span className={styles.searchIcon} aria-hidden="true">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.3-3.3" />
          </svg>
        </span>

        <input
          className={styles.searchInput}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          spellCheck="false"
        />

        <div className={styles.trailing}>
          {isPending && <span className={styles.spinner} aria-label="Searching" />}
          {value && (
            <button type="button" className={styles.clearButton} onClick={clearSearch} aria-label="Clear search">
              ×
            </button>
          )}
        </div>
      </form>

      <p className={styles.searchHint}>Search by product name, style or keyword.</p>
    </section>
  )
}
