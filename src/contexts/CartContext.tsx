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

// Criando o contexto do carrinho com um valor inicial
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

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => useContext(CartContext);

// Provedor do contexto do carrinho
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado para controlar se o componente está montado no cliente
  const [mounted, setMounted] = useState(false);

  // Estado para armazenar os itens do carrinho
  const [items, setItems] = useState<CartItem[]>([]);
  // Estado para armazenar o valor total do carrinho
  const [total, setTotal] = useState<number>(0);

  // Efeito para marcar como montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efeito para carregar os itens do carrinho do localStorage ao iniciar
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

    // Aguarda um frame para garantir que a hidratação terminou
    requestAnimationFrame(loadCart);
  }, [mounted]);

  // Função para adicionar um produto ao carrinho
  const addToCart = async (productId: number, quantity: number = 1) => {
    await cartService.addItem(productId, quantity);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  // Função para remover um item do carrinho
  const removeFromCart = (itemId: number) => {
    cartService.removeItem(itemId);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  // Função para atualizar a quantidade de um item no carrinho
  const updateQuantity = (itemId: number, quantity: number) => {
    cartService.updateQuantity(itemId, quantity);
    setItems(cartService.getItems());
    setTotal(cartService.getTotal());
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
    setTotal(0);
  };

  // Fornece o contexto para os componentes filhos
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
