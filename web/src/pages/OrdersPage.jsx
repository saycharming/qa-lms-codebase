import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { formatKobo } from '../lib/format.js';
export default function OrdersPage() {
  const [orders, setOrders] = useState([]),
    [state, setState] = useState('loading'),
    [error, setError] = useState('');
  useEffect(() => {
    let cancel = false;
    api
      .listOrders()
      .then((r) => {
        if (!cancel) {
          setOrders(r.data);
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
  }, []);
  return (
    <section data-testid="orders-page">
      <h1>My orders</h1>
      {state === 'loading' && (
        <p data-testid="orders-loading">Loading orders...</p>
      )}
      {state === 'error' && (
        <p data-testid="orders-error" role="alert">
          {error}
        </p>
      )}
      {state === 'ready' && !orders.length && (
        <p data-testid="orders-empty">You have no orders yet.</p>
      )}
      <ul data-testid="orders-list">
        {orders.map((o) => (
          <li key={o.id} data-testid="order-row" data-order-id={o.id}>
            <span data-testid="order-id">#{o.id}</span>{' '}
            <span data-testid="order-status">{o.status}</span>{' '}
            <span data-testid="order-total" data-total-kobo={o.total_kobo}>
              {formatKobo(o.total_kobo)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
