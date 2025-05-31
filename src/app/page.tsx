"use client";

import ProductCard from "@/components/ProductCard";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  ThunderboltIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons";
import { useCart } from "@/contexts/CartContext";
import { useIsClient } from "@/hooks/useIsClient";
import { productService } from "@/services/api";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getAll();
        setFeaturedProducts(products.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar produtos em destaque:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [isClient]);

  const handleAddToCart = (productId: number) => {
    addToCart(productId);
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Descubra o Futuro da
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent pb-1">
                Tecnologia
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Os melhores produtos de tecnologia com preços imbatíveis e entrega
              ultra-rápida para todo o Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                <ThunderboltIcon className="w-5 h-5 mr-2" />
                Explorar Produtos
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TruckIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Entrega Rápida
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receba seus produtos em até 24h na região metropolitana
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Garantia Total
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                12 meses de garantia em todos os produtos
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Pagamento Seguro
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Múltiplas formas de pagamento com total segurança
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Selecionamos os melhores produtos com tecnologia de ponta para
              você
            </p>
          </div>

          {loading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              suppressHydrationWarning
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft"
                >
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              suppressHydrationWarning
            >
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Ver Todos os Produtos
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorias Populares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore nossas principais categorias de produtos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              href="/products?category=smartphones"
              className="group text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Smartphones
              </h4>
            </Link>

            <Link
              href="/products?category=laptops"
              className="group text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-4">💻</div>
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Laptops
              </h4>
            </Link>

            <Link
              href="/products?category=acessorios"
              className="group text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-4">🎧</div>
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Acessórios
              </h4>
            </Link>

            <Link
              href="/products?category=games"
              className="group text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Games
              </h4>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fique por Dentro das Novidades
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Receba ofertas exclusivas, lançamentos e promoções especiais
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900"
              />
              <button className="px-8 py-4 bg-white text-primary-600 text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Por que escolher a WenShop?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Nossa História
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fundada em 2022, a WenShop nasceu com o objetivo de
                  democratizar o acesso à tecnologia de qualidade. Oferecemos
                  produtos cuidadosamente selecionados com os melhores preços do
                  mercado.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Nosso Compromisso
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Estamos comprometidos em oferecer uma experiência de compra
                  excepcional, com atendimento personalizado e produtos que
                  superam suas expectativas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
