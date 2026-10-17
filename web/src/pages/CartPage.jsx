import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';
import { useCart } from '../components/CartContext.jsx';
import { formatKobo } from '../lib/format.js';
export default function CartPage() {
  const { lines, totalKobo, remove, clear } = useCart();
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();
  if (!lines.length)
    return (
      <section data-testid="cart-page">
        <h1>Your cart</h1>
        <p data-testid="cart-empty">Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </section>
    );
  return (
    <section data-testid="cart-page">
      <h1>Your cart</h1>
      <ul data-testid="cart-lines">
        {lines.map((l) => (
          <li key={l.id} data-testid="cart-line" data-product-id={l.id}>
            <span data-testid="cart-line-name">{l.name}</span>{' '}
            <span data-testid="cart-line-qty">x{l.quantity}</span>{' '}
            <span
              data-testid="cart-line-total"
              data-total-kobo={l.price_kobo * l.quantity}
            >
              {formatKobo(l.price_kobo * l.quantity)}
            </span>{' '}
            <button data-testid="remove-line" onClick={() => remove(l.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        Total:{' '}
        <strong data-testid="cart-total" data-total-kobo={totalKobo}>
          {formatKobo(totalKobo)}
        </strong>
      </p>
      <button onClick={clear}>Clear cart</button>{' '}
      <button
        data-testid="checkout-link"
        onClick={() =>
          nav(isAuthenticated ? '/checkout' : '/login?next=/checkout')
        }
      >
        Checkout
      </button>
    </section>
  );
}
