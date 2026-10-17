import { it, expect, vi } from 'vitest';
vi.mock('@web/lib/analytics.js', () => ({ track: vi.fn() }));
import { track } from '@web/lib/analytics.js';
import { checkout } from '@web/lib/checkout.js';
it('mocks analytics at its module boundary', () => {
  checkout([{ id: 'p1', priceKobo: 5000000, qty: 1 }], {
    user: { id: 'u1' },
    now: () => 1000,
  });
  expect(track).toHaveBeenCalledWith('order_placed', {
    orderId: 'SD-1000',
    totalKobo: 5000000,
  });
});
