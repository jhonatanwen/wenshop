"use client";

import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ReturnIcon,
  ShieldIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ThunderboltIcon,
  TruckIcon,
  WarningIcon,
} from "@/components/icons";
import { useCart } from "@/contexts/CartContext";
import { productService } from "@/services/api";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!params || !params.id) {
        setError("Produto não encontrado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productId = params.id as string;
        const data = await productService.getById(parseInt(productId));
        setProduct(data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setError("Produto não encontrado");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      alert(`${quantity} unidade(s) adicionada(s) ao carrinho!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-square"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center">
              <WarningIcon className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Produto não encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              O produto que você está procurando não existe ou foi removido do
              nosso catálogo.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb moderno */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Início
              </Link>
            </li>
            <li>
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                href="/products"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Produtos
              </Link>
            </li>
            <li>
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Imagem do produto */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Preço */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary-600">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  R$ {(product.price * 1.2).toFixed(2)}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  -
                  {Math.round(
                    (1 - product.price / (product.price * 1.2)) * 100
                  )}
                  %
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
              </p>
            </div>

            {/* Status do estoque */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Em estoque
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({product.stock} unidades disponíveis)
              </span>
            </div>

            {/* Seletor de quantidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quantidade
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-xl transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-xl transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total: R$ {(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>

              <button className="w-full flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200">
                <ThunderboltIcon className="w-5 h-5" />
                Comprar Agora
              </button>
            </div>

            {/* Benefícios */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Benefícios da compra
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <TruckIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Frete grátis para todo o Brasil
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <ReturnIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Devolução gratuita em até 30 dias
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <ShieldIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Compra 100% segura e protegida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição detalhada */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Descrição Detalhada
          </h2>
          <div className="prose max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="text-lg mb-4">{product.description}</p>
            <p>
              Este produto oferece excelente qualidade e durabilidade, sendo
              ideal para quem busca performance e confiabilidade. Desenvolvido
              com tecnologia de ponta e materiais premium, garantindo a melhor
              experiência para nossos clientes.
            </p>
            <p className="mt-4">
              Com design moderno e funcionalidade avançada, este item se destaca
              no mercado pela sua versatilidade e eficiência. Perfeito para uso
              pessoal ou profissional, atendendo às mais altas expectativas de
              qualidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
