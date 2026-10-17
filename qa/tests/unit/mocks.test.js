import { describe, it, expect, vi, afterEach } from 'vitest';
import { luckyDiscount } from '@web/lib/promo.js';
import { sendOrderConfirmation } from '@web/lib/notifications.js';
import { checkout } from '@web/lib/checkout.js';
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
describe('doubles and isolation', () => {
  it('uses a spy to replace randomness', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.05);
    expect(luckyDiscount()).toBe(10);
  });
  it('uses a stub for asynchronous email', async () => {
    const transport = { send: vi.fn().mockResolvedValue({ id: 'mail-1' }) };
    await expect(
      sendOrderConfirmation(
        { id: 'SD-1', userId: 'u1', email: 'ada@example.com', totalKobo: 100 },
        transport,
      ),
    ).resolves.toEqual({ id: 'mail-1' });
    expect(transport.send).toHaveBeenCalledTimes(1);
  });
  it('checks async failures', async () => {
    const transport = {
      send: vi.fn().mockRejectedValue(new Error('SMTP offline')),
    };
    await expect(
      sendOrderConfirmation({ id: 'SD-1', userId: 'u1' }, transport),
    ).rejects.toThrow('SMTP offline');
  });
  it('controls time through DI and fake timers', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-17T10:00:00Z'));
    const trackEvent = vi.fn();
    const order = checkout([{ id: 'p1', priceKobo: 2500000, qty: 2 }], {
      user: { id: 'u1' },
      trackEvent,
    });
    expect(order.totalKobo).toBe(5000000);
    expect(order.id).toBe(`SD-${Date.now()}`);
    expect(trackEvent).toHaveBeenCalledTimes(1);
  });
});
