export const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;
export const isEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const isPositiveInteger = (value) =>
  Number.isInteger(value) && value > 0;
export function validateRegistration(body) {
  const errors = {};
  if (!isNonEmptyString(body?.name)) errors.name = 'Name is required';
  if (!isEmail(body?.email)) errors.email = 'A valid email address is required';
  if (!isNonEmptyString(body?.password) || body.password.length < 8)
    errors.password = 'Password must be at least 8 characters';
  return { valid: Object.keys(errors).length === 0, errors };
}
export function validateOrder(body) {
  const errors = {};
  if (!Array.isArray(body?.items) || body.items.length === 0)
    return {
      valid: false,
      errors: { items: 'Order must contain at least one item' },
    };
  body.items.forEach((item, i) => {
    if (!isPositiveInteger(item?.product_id))
      errors[`items.${i}.product_id`] = 'product_id must be a positive integer';
    if (!isPositiveInteger(item?.quantity))
      errors[`items.${i}.quantity`] = 'quantity must be a positive integer';
  });
  return { valid: Object.keys(errors).length === 0, errors };
}
