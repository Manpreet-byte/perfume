import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ perfume }) {
  const { addItem } = useCart()
  return (
    <article className="product-card glass-card">
      <div className="product-image-wrap">
        <picture>
          {/* Prefer photographic JPGs (or WebP if available), fall back to SVG placeholder */}
          <source srcSet={perfume.image.replace(/\.jpg$|\.png$|\.svg$/i, '.webp')} type="image/webp" />
          <img className="product-photo" src={perfume.image} alt={perfume.name} onError={(e) => (e.currentTarget.src = '/ai-images/ai-placeholder.svg')} />
        </picture>
      </div>
      <div className="product-body">
        <div className="product-headline">
          <h3>{perfume.name}</h3>
          <span>{perfume.price}</span>
        </div>
        <p>{perfume.shortDescription}</p>
        <div className="product-actions">
          <Link className="button button-primary button-small" to={`/collection/${perfume.slug}`}>
            View Details
          </Link>
          <button className="button button-secondary button-small" onClick={() => addItem(perfume)}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}