import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import SafeImage from './SafeImage'

export default function ProductCard({ perfume }) {
  const { addItem } = useCart()
  return (
    <article className="product-card glass-card">
      <div className="product-image-wrap">
        <SafeImage className="product-photo" src={perfume.image} alt={perfume.name} />
      </div>
      <div className="product-body">
        <div className="product-headline">
          <h3>{perfume.name}</h3>
          <span>{perfume.price}</span>
        </div>
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
