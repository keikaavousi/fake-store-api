import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'brads-store-cart';

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) => (
          item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        ));
      }
      return [...currentCart, { ...product, quantity: safeQuantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    setCart((currentCart) => currentCart.map((item) => (
      item.id === productId ? { ...item, quantity: safeQuantity } : item
    )));
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + (Number(item.price) * item.quantity),
    0,
  );
  const value = {
    cart,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity: (productId) => {
      const item = cart.find((cartItem) => cartItem.id === productId);
      if (item) updateQuantity(productId, item.quantity + 1);
    },
    decreaseQuantity: (productId) => {
      const item = cart.find((cartItem) => cartItem.id === productId);
      if (item) updateQuantity(productId, item.quantity - 1);
    },
    calculateTotal: () => subtotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
