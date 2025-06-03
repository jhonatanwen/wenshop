"use client";

import { SearchIcon } from "@/components/icons";
import { useSearch } from "@/hooks/useSearch";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface SearchDropdownProps {
  onClose: () => void;
}

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const { query, results, loading, hasSearched, setQuery, navigateToProducts } =
    useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigateToProducts(query);
      onClose();
      setIsOpen(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  const handleResultClick = () => {
    onClose();
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <SearchIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </form>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleClickOutside} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-20 max-h-96 overflow-hidden">
            {loading && (
              <div className="p-4 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Buscando...
                </p>
              </div>
            )}

            {!loading && hasSearched && results.length === 0 && (
              <div className="p-4 text-center">
                <SearchIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nenhum produto encontrado
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {product.category}
                      </p>
                      <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}

                {results.length > 5 && (
                  <button
                    onClick={() => {
                      navigateToProducts(query);
                      handleResultClick();
                    }}
                    className="w-full p-3 text-center text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Ver todos os {results.length} resultados
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
