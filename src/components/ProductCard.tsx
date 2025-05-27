import { CloseIcon, ShoppingCartIcon, StarIcon } from "@/components/icons";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Props para o componente ProductCard
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

// Componente moderno de card de produto
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      {/* Container da imagem com overlay de ações */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge de estoque */}
        <div className="absolute top-4 left-4">
          {product.stock > 0 ? (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-sm">
              Em Estoque
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-sm">
              Esgotado
            </span>
          )}
        </div>

        {/* Overlay com botão de visualização rápida */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product.id}`}
            className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-white"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        {/* Nome do produto */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 mb-3 line-clamp-2 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Descrição do produto */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Área de preço e ações */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              R$ {product.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.stock > 0
                ? `${product.stock} disponíveis`
                : "Indisponível"}
            </p>
          </div>

          {/* Rating placeholder */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
                filled={i < 4}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              (4.0)
            </span>
          </div>
        </div>

        {/* Botão de adicionar ao carrinho */}
        <button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock <= 0}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
            ${
              product.stock > 0
                ? "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
        >
          {product.stock > 0 ? (
            <>
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </>
          ) : (
            <>
              <CloseIcon className="w-5 h-5" />
              <span>Indisponível</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
