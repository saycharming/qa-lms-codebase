import { describe, it, expect } from 'vitest';
// Integration checks expect a running Laravel API and seeded SQLite database.
const BASE = process.env.API_BASE_URL || 'http://localhost:8000/api';
const live = process.env.RUN_LARAVEL_INTEGRATION === '1';
describe.skipIf(!live)('Laravel API integration checks', () => {
  it('returns products with a data array', async () => {
    const response = await fetch(`${BASE}/products`);
    expect(response.status).toBe(200);
    expect(Array.isArray((await response.json()).data)).toBe(true);
  });
  it('rejects an unauthenticated checkout',async()=>{
    const response=await fetch(`${BASE}/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[]})});
    expect(response.status).toBe(401);
  });
});
