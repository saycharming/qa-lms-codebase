export async function sendOrderConfirmation(order, transport) {
  if (!order?.userId) throw new Error('order.userId is required');
  if (typeof transport?.send !== 'function')
    throw new Error('a transport with send() is required');
  return transport.send({
    to: order.email,
    subject: `Your ShopDesk order ${order.id}`,
    body: `Total: ${order.totalKobo} kobo`,
  });
}
