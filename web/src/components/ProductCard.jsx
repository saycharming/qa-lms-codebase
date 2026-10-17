import { Link } from 'react-router-dom';
import { formatKobo } from '../lib/format.js';
export default function ProductCard({ product }) {
  return (
    <article
      className="card"
      data-testid="product-card"
      data-product-id={product.id}
    >
      <Link data-testid="product-link" to={`/products/${product.id}`}>
        <h3 data-testid="product-name">{product.name}</h3>
      </Link>
      <p>{product.category}</p>
      <p data-testid="product-price" data-price-kobo={product.price_kobo}>
        {formatKobo(product.price_kobo)}
      </p>
      <Link className="button" to={`/products/${product.id}`}>
        View
      </Link>
    </article>
  );
}
