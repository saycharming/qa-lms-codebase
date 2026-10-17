export async function track(event, props = {}) {
  if (!event) throw new Error('event name is required');
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, props }),
  });
  if (!res.ok) throw new Error(`analytics failed: ${res.status}`);
  return true;
}
