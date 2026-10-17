const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const getToken = () => localStorage.getItem('shopdesk.token');
export function setToken(v) {
  if (v) localStorage.setItem('shopdesk.token', v);
  else localStorage.removeItem('shopdesk.token');
}
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('shopdesk.user'));
  } catch {
    return null;
  }
}
export function setStoredUser(user) {
  if (user) localStorage.setItem('shopdesk.user', JSON.stringify(user));
  else localStorage.removeItem('shopdesk.user');
}
async function call(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    const e = new Error(
      payload?.error?.message || `Request failed: ${res.status}`,
    );
    e.status = res.status;
    throw e;
  }
  return payload;
}
export const api = {
  listProducts: (q) => call(`/products${q || ''}`),
  getProduct: (id) => call(`/products/${id}`),
  register: (body) => call('/auth/register', { method: 'POST', body }),
  login: (body) => call('/auth/login', { method: 'POST', body }),
  listOrders: () => call('/orders', { auth: true }),
  createOrder: (body) => call('/orders', { method: 'POST', body, auth: true }),
};
