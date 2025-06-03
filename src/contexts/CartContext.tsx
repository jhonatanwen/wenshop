"use client";

import { cartService } from "@/services/api";
import { CartItem } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}>({
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  const [items, setItems] = useState<CartItem[]>([]);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadCart = () => {
      try {
        const cartItems = cartService.getItems();
        setItems(cartItems);
        setTotal(cartService.getTotal());
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        setItems([]);
        setTotal(0);
      }
    };

    requestAnimationFrame(loadCart);
  }, [mounted]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    await cartService.addItem(productId, quantity);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  const removeFromCart = (itemId: number) => {
    cartService.removeItem(itemId);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    cartService.updateQuantity(itemId, quantity);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [],
        total: mounted ? total : 0,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
