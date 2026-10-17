import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from './CartContext.jsx';
import { formatKobo } from '../lib/format.js';
export default function CheckoutForm() {
  const { lines, totalKobo, clear } = useCart();
  const [form, setForm] = useState({ full_name: '', email: '', address: '' });
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const edit = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = await api.createOrder({
        items: lines.map((x) => ({ product_id: x.id, quantity: x.quantity })),
        customer: form,
      });
      clear();
      setOrder(payload.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (order)
    return (
      <section data-testid="order-confirmation">
        <h1>Thank you!</h1>
        <p>
          Order <span data-testid="order-id">#{order.id}</span> is confirmed.
        </p>
        <p>
          Total{' '}
          <strong data-testid="order-total" data-total-kobo={order.total_kobo}>
            {formatKobo(order.total_kobo)}
          </strong>
        </p>
        <button data-testid="view-orders" onClick={() => navigate('/orders')}>
          View my orders
        </button>
      </section>
    );
  return (
    <form data-testid="checkout-form" onSubmit={submit}>
      <label>
        Full name
        <input
          data-testid="checkout-name"
          value={form.full_name}
          onChange={edit('full_name')}
        />
      </label>
      <label>
        Email
        <input
          data-testid="checkout-email"
          value={form.email}
          onChange={edit('email')}
        />
      </label>
      <label>
        Delivery address
        <textarea
          data-testid="checkout-address"
          value={form.address}
          onChange={edit('address')}
        />
      </label>
      {error && (
        <p role="alert" data-testid="checkout-error">
          {error}
        </p>
      )}
      <p>
        Total{' '}
        <strong data-testid="checkout-total" data-total-kobo={totalKobo}>
          {formatKobo(totalKobo)}
        </strong>
      </p>
      <button
        data-testid="place-order"
        disabled={busy || !lines.length}
        type="submit"
      >
        {busy ? 'Placing...' : 'Place order'}
      </button>
    </form>
  );
}
