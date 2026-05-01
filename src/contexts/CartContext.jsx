import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  const addItem = (perfume) => {
    setItems((prev) => {
      const found = prev.find((p) => p.slug === perfume.slug)
      if (found) return prev.map((p) => (p.slug === perfume.slug ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { ...perfume, qty: 1 }]
    })
  }

  const updateQty = (slug, delta) => {
    setItems((prev) => {
      return prev
        .map((p) => (p.slug === slug ? { ...p, qty: Math.max(0, (p.qty || 0) + delta) } : p))
        .filter((p) => p.qty > 0)
    })
  }

  const increment = (slug) => updateQty(slug, 1)
  const decrement = (slug) => updateQty(slug, -1)

  const removeItem = (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug))

  const clear = () => setItems([])

  const count = items.reduce((s, i) => s + (i.qty || 0), 0)

  const value = { items, addItem, removeItem, clear, count, updateQty, increment, decrement }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
