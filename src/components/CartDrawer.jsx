import { useEffect, useMemo } from 'react'
import { useCart } from '../contexts/CartContext'

function parsePrice(value) {
  const numeric = Number(String(value ?? '').replace(/[^0-9.]/g, ''))
  return Number.isFinite(numeric) ? numeric : 0
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, clear, count, increment, decrement } = useCart()
  const subtotal = useMemo(() => items.reduce((total, item) => total + parsePrice(item.price) * (item.qty || 0), 0), [items])
  const freeShippingThreshold = 7999
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const remaining = Math.max(freeShippingThreshold - subtotal, 0)

  useEffect(() => {
    document.body.classList.toggle('cart-open', open)

    return () => {
      document.body.classList.remove('cart-open')
    }
  }, [open])

  return (
    <>
      <button
        className={`cart-backdrop ${open ? 'open' : ''}`}
        aria-label="Close cart overlay"
        onClick={onClose}
      />

      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
        <div className="cart-header">
          <div>
            <p className="cart-kicker">Your Bag</p>
            <strong>Shopping Cart</strong>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cart-summary">
          <div className="cart-progress-head">
            <span>Free shipping at ₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
            <strong>{remaining > 0 ? `₹${remaining.toLocaleString('en-IN')} away` : 'Unlocked'}</strong>
          </div>
          <div className="cart-progress-track" aria-hidden="true">
            <span style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button className="button button-primary" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {items.map((it) => (
                <div className="cart-item" key={it.slug}>
                  <div className="ci-left">
                    <img src={it.image} alt={it.name} onError={(e) => (e.currentTarget.src = '/ai-images/ai-placeholder.svg')} />
                  </div>
                  <div className="ci-right">
                    <div className="ci-top">
                      <div>
                        <div className="ci-name">{it.name}</div>
                        <div className="ci-price">{it.price}</div>
                      </div>
                      <button className="remove-link" onClick={() => removeItem(it.slug)}>Remove</button>
                    </div>
                    <div className="ci-qty">
                      <button className="qty" onClick={() => decrement(it.slug)} aria-label="Decrease">−</button>
                      <span className="qty-value">{it.qty}</span>
                      <button className="qty" onClick={() => increment(it.slug)} aria-label="Increase">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="cart-total-row muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="cart-footer">
              <button className="button button-secondary" onClick={clear}>Clear</button>
              <button className="button button-primary">Checkout ({count})</button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
