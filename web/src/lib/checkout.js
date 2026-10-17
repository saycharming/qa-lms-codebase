// Week 2 TDD sample only; live checkout sends items to the API, not this function.
import { cartTotal, applyCoupon } from './cart.js';
import { track } from './analytics.js';
export function checkout(
  items,
  {
    coupon = null,
    user = null,
    shipping = true,
    now = () => Date.now(),
    trackEvent = track,
  } = {},
) {
  if (!user?.id) throw new Error('A logged-in user is required to check out');
  if (!Array.isArray(items) || !items.length) throw new Error('Cart is empty');
  const totals = cartTotal(items, { shipping });
  const totalKobo = applyCoupon(totals.totalKobo, coupon);
  if (totalKobo <= 0)
    throw new RangeError('Order total must be greater than zero');
  const ts = now();
  const order = {
    id: `SD-${ts}`,
    userId: user.id,
    items: items.map((i) => ({ id: i.id, qty: i.qty, priceKobo: i.priceKobo })),
    subtotalKobo: totals.subtotal,
    shippingKobo: totals.shippingKobo,
    totalKobo,
    placedAt: ts,
  };
  trackEvent('order_placed', { orderId: order.id, totalKobo });
  return order;
}
