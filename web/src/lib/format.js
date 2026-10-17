export function formatKobo(kobo) {
  const sign = kobo < 0 ? '-' : '';
  const n = Math.abs(kobo);
  return `${sign}₦${Math.floor(n / 100).toLocaleString('en-US')}.${String(n % 100).padStart(2, '0')}`;
}
