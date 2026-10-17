export const KOBO_PER_NAIRA = 100;
export function toKobo(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount))
    throw new TypeError('amount must be a finite number');
  return Math.round(amount * 100);
}
export function formatKobo(kobo) {
  if (!Number.isInteger(kobo)) throw new TypeError('kobo must be an integer');
  const sign = kobo < 0 ? '-' : '';
  const n = Math.abs(kobo);
  return `${sign}₦${Math.floor(n / 100).toLocaleString('en-US')}.${String(n % 100).padStart(2, '0')}`;
}
export function sumKobo(lines) {
  if (!Array.isArray(lines)) throw new TypeError('lines must be an array');
  return lines.reduce((total, line) => {
    if (
      !Number.isInteger(line?.price_kobo) ||
      !Number.isInteger(line?.quantity)
    )
      throw new TypeError('each line needs integer price_kobo and quantity');
    return total + line.price_kobo * line.quantity;
  }, 0);
}
