import { describe, it, expect } from 'vitest';
import { toKobo, formatKobo, sumKobo } from '../../examples/money.js';
describe('API money conversion', () => {
  it.each([
    [0, 0],
    [19.99, 1999],
    [45000, 4500000],
  ])('converts %s naira to %i kobo', (input, want) =>
    expect(toKobo(input)).toBe(want),
  );
  it('rejects non-finite amounts', () =>
    expect(() => toKobo(NaN)).toThrow(TypeError));
  it('formats exact amounts', () =>
    expect(formatKobo(150000)).toBe('₦1,500.00'));
  it('adds whole-kobo cart amounts', () =>
    expect(
      sumKobo([
        { price_kobo: 250000, quantity: 2 },
        { price_kobo: 999, quantity: 1 },
      ]),
    ).toBe(500999));
  it('rejects fractional quantities', () =>
    expect(() => sumKobo([{ price_kobo: 100, quantity: 1.5 }])).toThrow());
});
