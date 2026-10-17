import React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../web/src/components/ProductCard.jsx';
it('shows a card with exactly formatted naira', () => {
  render(
    <MemoryRouter>
      <ProductCard
        product={{
          id: 1,
          name: 'Oak Writing Desk',
          category: 'office',
          price_kobo: 4500000,
        }}
      />
    </MemoryRouter>,
  );
  expect(screen.getByTestId('product-name')).toHaveTextContent(
    'Oak Writing Desk',
  );
  expect(screen.getByTestId('product-price')).toHaveTextContent('₦45,000.00');
});
