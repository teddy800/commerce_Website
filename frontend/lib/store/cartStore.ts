import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LineItem } from '@/lib/types'

interface CartStore {
  items: LineItem[]
  cartId: string | null
  total: number
  addItem: (item: LineItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setCartId: (id: string) => void
  calculateTotal: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      total: 0,

      addItem: (item: LineItem) => {
        set((state: CartStore) => {
          const existingItem = state.items.find((i: LineItem) => i.id === item.id)
          let newItems: LineItem[]

          if (existingItem) {
            newItems = state.items.map((i: LineItem) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          } else {
            newItems = [...state.items, item]
          }

          return { items: newItems }
        })
        get().calculateTotal()
      },

      removeItem: (id: string) => {
        set((state: CartStore) => ({
          items: state.items.filter((item: LineItem) => item.id !== id),
        }))
        get().calculateTotal()
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set((state: CartStore) => ({
          items: state.items.map((item: LineItem) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
        get().calculateTotal()
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      setCartId: (id: string) => {
        set({ cartId: id })
      },

      calculateTotal: () => {
        const total = get().items.reduce((sum: number, item: LineItem) => sum + item.unit_price * item.quantity, 0)
        set({ total })
      },
    }),
    {
      name: 'cart-store',
    }
  )
)
