const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v) => typeof v === 'string' && EMAIL_RE.test(v.trim());
export const isStrongPassword = (v) =>
  typeof v === 'string' &&
  v.length >= 8 &&
  v.length <= 64 &&
  /[A-Z]/.test(v) &&
  /[0-9]/.test(v);
export function validateRegistration(input = {}) {
  const errors = {};
  if ((typeof input.name === 'string' ? input.name.trim() : '').length < 2)
    errors.name = 'Name must be at least 2 characters';
  if (!isEmail(input.email)) errors.email = 'Enter a valid email address';
  if (!isStrongPassword(input.password))
    errors.password =
      'Password must be 8-64 characters with an uppercase letter and a number';
  return { valid: Object.keys(errors).length === 0, errors };
}
