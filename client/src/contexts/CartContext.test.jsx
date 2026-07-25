import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const product = {
  id: 7,
  title: 'A useful object',
  price: 25,
  category: 'objects',
};

function CartHarness() {
  const { addToCart, itemCount, subtotal } = useCart();
  return (
    <>
      <span>Items: {itemCount}</span>
      <span>Subtotal: ${subtotal.toFixed(2)}</span>
      <button type="button" onClick={() => addToCart(product)}>Add object</button>
    </>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test('adds an item and calculates the cart totals', () => {
  render(
    <CartProvider>
      <CartHarness />
    </CartProvider>,
  );

  fireEvent.click(screen.getByRole('button', { name: /add object/i }));

  expect(screen.getByText('Items: 1')).toBeInTheDocument();
  expect(screen.getByText('Subtotal: $25.00')).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('brads-store-cart'))).toHaveLength(1);
});
