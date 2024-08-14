import { createContext, PropsWithChildren, useContext, useState } from 'react';

const CartContext = createContext<{
  cart: Record<number, number>;
  addToCart: (foodId: number) => void;
  removeFromCart: (foodId: number) => void;
}>({
  cart: {},
  addToCart: () => null,
  removeFromCart: () => null
});

export function useCart() {
  const value = useContext(CartContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useCart must be wrapped in a <CartProvider />');
    }
  }
  return value;
}

export function CartProvider(props: PropsWithChildren) {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (foodId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [foodId]: (prevCart[foodId] || 0) + 1
    }));
  };

  const removeFromCart = (foodId: number) => {
    setCart((prevCart) => {
      const quantity = prevCart[foodId] || 0;
      if (quantity > 1) {
        return { ...prevCart, [foodId]: quantity - 1 };
      } else {
        const newCart = { ...prevCart };
        delete newCart[foodId];
        return newCart;
      }
    });
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{props.children}</CartContext.Provider>;
}
