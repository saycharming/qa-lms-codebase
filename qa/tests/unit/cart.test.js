import { describe, it, expect } from 'vitest';
import {
  lineTotal,
  cartTotal,
  cartSubtotal,
  applyCoupon,
} from '@web/lib/cart.js';
describe('practice cart', () => {
  it('multiplies exact kobo', () =>
    expect(lineTotal({ priceKobo: 2500000, qty: 2 })).toBe(5000000));
  it('rejects zero quantity', () =>
    expect(() => lineTotal({ priceKobo: 1, qty: 0 })).toThrow());
  it('adds totals', () =>
    expect(
      cartSubtotal([
        { priceKobo: 100, qty: 2 },
        { priceKobo: 50, qty: 1 },
      ]),
    ).toBe(250));
  it.each([
    [4999999, 150000],
    [5000000, 0],
    [5000001, 0],
  ])('shipping at %i kobo is %i', (value, shipping) =>
    expect(cartTotal([{ priceKobo: value, qty: 1 }]).shippingKobo).toBe(
      shipping,
    ),
  );
  it('handles empty cart', () => expect(cartTotal([]).totalKobo).toBe(0));
  it('handles a percentage discount', () =>
    expect(applyCoupon(100000, { type: 'percent', value: 10 })).toBe(90000));
});
