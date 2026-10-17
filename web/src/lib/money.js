// Week 2 stand-alone practice logic: not wired into the live storefront API.
export function nairaToKobo(naira) {
  const value = Number(naira);
  if (!Number.isFinite(value))
    throw new TypeError('naira must be a finite number');
  return Math.round(value * 100);
}
export function formatNaira(kobo) {
  if (!Number.isInteger(kobo)) throw new TypeError('kobo must be an integer');
  const abs = Math.abs(kobo);
  return `${kobo < 0 ? '-' : ''}₦${Math.floor(abs / 100).toLocaleString('en-US')}.${String(abs % 100).padStart(2, '0')}`;
}
export const sumKobo = (amounts) => amounts.reduce((a, b) => a + b, 0);
