import { test, expect } from '@playwright/test';
test('new customer registers and checks out', async ({ page }) => {
  const email = `student.${Date.now()}.${Math.random().toString(36).slice(2)}@example.test`;
  await page.goto('/');
  await page
    .getByTestId('product-card')
    .filter({ hasText: 'A5 Hardcover Notebook' })
    .getByTestId('product-link')
    .click();
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('checkout-link').click();
  await expect(page.getByTestId('login-page')).toBeVisible();
  await page.getByTestId('register-link').click();
  await page.getByTestId('login-name').fill('Class Tester');
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill('Password123!');
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('checkout-page')).toBeVisible();
  await page.getByTestId('checkout-name').fill('Class Tester');
  await page.getByTestId('checkout-email').fill(email);
  await page.getByTestId('checkout-address').fill('Akoka, Lagos');
  await page.getByTestId('place-order').click();
  await expect(page.getByTestId('order-confirmation')).toBeVisible();
  await page.getByTestId('view-orders').click();
  await expect(page.getByTestId('order-row').first()).toBeVisible();
});
