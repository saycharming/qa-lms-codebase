import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from '../components/CartContext.jsx';
import { formatKobo } from '../lib/format.js';
export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null),
    [qty, setQty] = useState(1),
    [state, setState] = useState('loading'),
    [error, setError] = useState('');
  useEffect(() => {
    let cancel = false;
    setState('loading');
    api
      .getProduct(id)
      .then((r) => {
        if (!cancel) {
          setProduct(r.data);
          setState('ready');
        }
      })
      .catch((e) => {
        if (!cancel) {
          setError(e.message);
          setState('error');
        }
      });
    return () => {
      cancel = true;
    };
  }, [id]);
  if (state === 'loading')
    return <p data-testid="product-loading">Loading...</p>;
  if (state === 'error')
    return (
      <p role="alert" data-testid="product-error">
        {error}
      </p>
    );
  if (!product) return null;
  return (
    <section data-testid="product-detail" data-product-id={product.id}>
      <h1 data-testid="product-title">{product.name}</h1>
      <p data-testid="product-description">{product.description}</p>
      <p data-testid="product-price" data-price-kobo={product.price_kobo}>
        {formatKobo(product.price_kobo)}
      </p>
      <p data-testid="product-stock">In stock: {product.stock}</p>
      <label>
        Quantity
        <input
          data-testid="quantity-input"
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
      </label>
      <button
        data-testid="add-to-cart"
        onClick={() => {
          add(product, qty);
          navigate('/cart');
        }}
      >
        Add to cart
      </button>
    </section>
  );
}
