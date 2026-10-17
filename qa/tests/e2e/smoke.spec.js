import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage.js';
test('catalogue loads', async ({ page }) => {
  const p = new ProductsPage(page);
  await p.open();
  await expect(p.cards).toHaveCount(10);
});
test('search narrows to two desk products', async ({ page }) => {
  const p = new ProductsPage(page);
  await p.open();
  await p.search('desk');
  await expect(p.cards).toHaveCount(2);
});
test('visitor adds two hubs to cart', async ({ page }) => {
  const p = new ProductsPage(page);
  await p.open();
  await p.openProduct('USB-C 7-in-1 Hub');
  await page.getByTestId('quantity-input').fill('2');
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-line-qty')).toHaveText('x2');
  await expect(page.getByTestId('cart-total')).toHaveAttribute(
    'data-total-kobo',
    '5000000',
  );
});
