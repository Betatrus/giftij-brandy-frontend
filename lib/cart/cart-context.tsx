"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { usePathname } from "next/navigation"

export interface CartItem {
  id: string
  productSlug: string
  name: string
  colour: string | null
  size: string | null
  sku: string | null
  price: number
  image: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number,
  ) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  totalCount: number
  totalPrice: number
  cartPopupOpen: boolean
  closeCartPopup: () => void
}

const STORAGE_KEY = "giftij-cart"
const LAST_ACTIVITY_KEY = "giftij-storefront-last-activity"

const INACTIVITY_MS = 7 * 60 * 1000

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const [items, setItems] = useState<CartItem[]>([])
  const [cartPopupOpen, setCartPopupOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  /**
   * Cart storage deliberately uses sessionStorage rather than localStorage.
   *
   * This means:
   * - a new browser tab starts with a fresh cart
   * - closing the tab/browser removes the shopping session
   * - a normal refresh in the same active tab can preserve the cart
   */
  useEffect(() => {
    try {
      const lastActivityRaw =
        window.sessionStorage.getItem(LAST_ACTIVITY_KEY)

      const lastActivity = lastActivityRaw
        ? Number(lastActivityRaw)
        : 0

      const expired =
        lastActivity > 0 &&
        Date.now() - lastActivity >= INACTIVITY_MS

      if (expired) {
        window.sessionStorage.removeItem(STORAGE_KEY)
        window.sessionStorage.removeItem(LAST_ACTIVITY_KEY)
        setItems([])
      } else {
        const stored =
          window.sessionStorage.getItem(STORAGE_KEY)

        if (stored) {
          setItems(JSON.parse(stored))
        }
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY)
      window.sessionStorage.removeItem(LAST_ACTIVITY_KEY)
      setItems([])
    } finally {
      setHydrated(true)
    }
  }, [])

  /**
   * Persist only after initial browser storage has been read.
   */
  useEffect(() => {
    if (!hydrated) return

    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items),
      )
    } catch {
      // If browser storage is unavailable, the in-memory cart still works.
    }
  }, [items, hydrated])

  /**
   * Global storefront inactivity handling.
   *
   * After 7 minutes without real user interaction:
   * - cart is cleared
   * - checkout React state disappears when the page unmounts
   * - customer returns to the homepage
   *
   * The Paystack callback page is intentionally excluded so we never
   * interrupt payment verification after the customer returns from Paystack.
   */
  useEffect(() => {
    if (!hydrated) return

    let timer: ReturnType<typeof setTimeout> | null = null
    let hasExpired = false

    const isPaymentCallback =
      pathname.startsWith("/checkout/callback")

    function getLastActivity() {
      const raw =
        window.sessionStorage.getItem(LAST_ACTIVITY_KEY)

      if (!raw) return Date.now()

      const parsed = Number(raw)

      return Number.isFinite(parsed)
        ? parsed
        : Date.now()
    }

    function clearTimer() {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    function expireSession() {
      if (hasExpired || isPaymentCallback) return

      hasExpired = true
      clearTimer()

      window.sessionStorage.removeItem(STORAGE_KEY)
      window.sessionStorage.removeItem(LAST_ACTIVITY_KEY)

      setItems([])
      setCartPopupOpen(false)

      window.location.replace("/")
    }

    function scheduleExpiry() {
      if (isPaymentCallback) return

      clearTimer()

      const elapsed =
        Date.now() - getLastActivity()

      const remaining =
        INACTIVITY_MS - elapsed

      if (remaining <= 0) {
        expireSession()
        return
      }

      timer = setTimeout(
        expireSession,
        remaining,
      )
    }

    function recordActivity() {
      if (hasExpired || isPaymentCallback) return

      window.sessionStorage.setItem(
        LAST_ACTIVITY_KEY,
        String(Date.now()),
      )

      scheduleExpiry()
    }

    function checkWhenReturning() {
      if (isPaymentCallback) return

      const elapsed =
        Date.now() - getLastActivity()

      if (elapsed >= INACTIVITY_MS) {
        expireSession()
        return
      }

      scheduleExpiry()
    }

    if (!isPaymentCallback) {
      const existingActivity =
        window.sessionStorage.getItem(
          LAST_ACTIVITY_KEY,
        )

      if (!existingActivity) {
        window.sessionStorage.setItem(
          LAST_ACTIVITY_KEY,
          String(Date.now()),
        )
      }

      scheduleExpiry()

      window.addEventListener(
        "pointerdown",
        recordActivity,
      )

      window.addEventListener(
        "keydown",
        recordActivity,
      )

      window.addEventListener(
        "scroll",
        recordActivity,
        { passive: true },
      )

      window.addEventListener(
        "touchstart",
        recordActivity,
        { passive: true },
      )

      window.addEventListener(
        "focus",
        checkWhenReturning,
      )

      document.addEventListener(
        "visibilitychange",
        checkWhenReturning,
      )
    }

    return () => {
      clearTimer()

      window.removeEventListener(
        "pointerdown",
        recordActivity,
      )

      window.removeEventListener(
        "keydown",
        recordActivity,
      )

      window.removeEventListener(
        "scroll",
        recordActivity,
      )

      window.removeEventListener(
        "touchstart",
        recordActivity,
      )

      window.removeEventListener(
        "focus",
        checkWhenReturning,
      )

      document.removeEventListener(
        "visibilitychange",
        checkWhenReturning,
      )
    }
  }, [hydrated, pathname])

  const addItem = useCallback(
    (
      item: Omit<CartItem, "quantity">,
      quantity = 1,
    ) => {
      setItems((current) => {
        const existing = current.find(
          (existingItem) =>
            existingItem.id === item.id,
        )

        if (existing) {
          return current.map((existingItem) =>
            existingItem.id === item.id
              ? {
                  ...existingItem,
                  quantity:
                    existingItem.quantity +
                    quantity,
                }
              : existingItem,
          )
        }

        return [
          ...current,
          {
            ...item,
            quantity,
          },
        ]
      })

      setCartPopupOpen(true)
    },
    [],
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((current) =>
        current.filter(
          (item) => item.id !== id,
        ),
      )
    },
    [],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((current) =>
          current.filter(
            (item) => item.id !== id,
          ),
        )

        return
      }

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      )
    },
    [],
  )

  const clear = useCallback(() => {
    setItems([])

    try {
      window.sessionStorage.removeItem(
        STORAGE_KEY,
      )
    } catch {
      // In-memory state has still been cleared.
    }
  }, [])

  const closeCartPopup = useCallback(() => {
    setCartPopupOpen(false)
  }, [])

  const totalCount = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      ),
    [items],
  )

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0,
      ),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      totalCount,
      totalPrice,
      cartPopupOpen,
      closeCartPopup,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      totalCount,
      totalPrice,
      cartPopupOpen,
      closeCartPopup,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    )
  }

  return context
}