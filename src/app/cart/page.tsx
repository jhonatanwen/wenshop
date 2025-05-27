"use client";

import {
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TrashIcon,
  TruckIcon,
} from "@/components/icons";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center">
              <ShoppingCartIcon className="w-12 h-12 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Parece que você ainda não adicionou nada ao seu carrinho. Vamos
              encontrar alguns produtos incríveis para você!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Explorar Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Carrinho de Compras
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "itens"} no seu carrinho
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
          >
            <TrashIcon className="w-4 h-4" />
            Limpar Carrinho
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-primary-600 font-bold text-lg">
                        R$ {item.product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">cada</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>

                      <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"}
                    )
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Frete
                  </span>
                  <div className="text-right">
                    <span className="font-semibold text-green-600">Grátis</span>
                    <p className="text-xs text-gray-500">
                      Em compras acima de R$ 100
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  Finalizar Compra
                </button>

                <Link
                  href="/products"
                  className="block w-full text-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <ShieldIcon className="w-4 h-4 text-green-500" />
                    Compra Segura
                  </div>
                  <div className="flex items-center gap-1">
                    <TruckIcon className="w-4 h-4 text-blue-500" />
                    Frete Grátis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
