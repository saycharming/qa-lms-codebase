import { it, describe, expect } from 'vitest';
import {
  validateRegistration,
  validateOrder,
} from '../../examples/validators.js';
import { isStrongPassword } from '@web/lib/validators.js';
describe('API validation', () => {
  it('accepts valid registration', () =>
    expect(
      validateRegistration({
        name: 'Ada',
        email: 'ada@example.com',
        password: 'Password123!',
      }).valid,
    ).toBe(true));
  it('rejects an invalid registration with field errors', () =>
    expect(validateRegistration({}).errors).toHaveProperty('email'));
  it.each([
    [0, false],
    [1, true],
    [2, true],
    [-1, false],
    [1.5, false],
  ])('checks order quantity %s', (qty, valid) =>
    expect(
      validateOrder({ items: [{ product_id: 1, quantity: qty }] }).valid,
    ).toBe(valid),
  );
});
describe('Web practice password boundaries', () => {
  it.each([
    [7, false],
    [8, true],
    [9, true],
    [64, true],
    [65, false],
  ])('password length %s valid %s', (n, valid) =>
    expect(isStrongPassword('A' + 'a'.repeat(n - 2) + '1')).toBe(valid),
  );
});
