"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

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

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartPopupOpen, setCartPopupOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)

      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    )
  }, [items])

  const addItem = useCallback(
    (
      item: Omit<CartItem, "quantity">,
      quantity = 1,
    ) => {
      setItems((current) => {
        const existing = current.find(
          (existingItem) => existingItem.id === item.id,
        )

        if (existing) {
          return current.map((existingItem) =>
            existingItem.id === item.id
              ? {
                  ...existingItem,
                  quantity:
                    existingItem.quantity + quantity,
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

  const removeItem = useCallback((id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    )
  }, [])

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((current) =>
          current.filter((item) => item.id !== id),
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
  }, [])

  const closeCartPopup = useCallback(() => {
    setCartPopupOpen(false)
  }, [])

  const totalCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  )

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
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