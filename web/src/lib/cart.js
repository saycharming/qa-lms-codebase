import { sumKobo } from './money.js';
export const FREE_SHIPPING_THRESHOLD_KOBO = 5000000;
export const SHIPPING_FLAT_KOBO = 150000;
export function lineTotal(item) {
  if (!Number.isInteger(item.qty) || item.qty <= 0)
    throw new RangeError('qty must be positive');
  return item.priceKobo * item.qty;
}
export const cartSubtotal = (items) => sumKobo(items.map(lineTotal));
export function cartTotal(items, { shipping = true } = {}) {
  const subtotal = cartSubtotal(items);
  const shippingKobo =
    shipping && subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD_KOBO
      ? SHIPPING_FLAT_KOBO
      : 0;
  return { subtotal, shippingKobo, totalKobo: subtotal + shippingKobo };
}
export function applyCoupon(subtotalKobo, coupon) {
  if (!coupon) return subtotalKobo;
  if (coupon.type === 'percent')
    return Math.round(subtotalKobo * (1 - coupon.value / 100));
  if (coupon.type === 'fixed') return Math.max(0, subtotalKobo - coupon.value);
  throw new Error(`Unknown coupon type: ${coupon.type}`);
}
