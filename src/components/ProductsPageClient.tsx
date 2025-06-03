"use client";

import ProductCard from "@/components/ProductCard";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { useCart } from "@/contexts/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/api";
import { Product } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getAll({
        search: debouncedSearchTerm || undefined,
        category: selectedCategory || undefined,
      });
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    const searchFromParams = searchParams.get("search") || "";
    const categoryFromParams = searchParams.get("category") || "";

    setSearchTerm(searchFromParams);
    setSelectedCategory(categoryFromParams);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateURL = useCallback(
    (search: string, category: string) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);

      const newUrl = `/products${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.push(newUrl);
    },
    [router]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      updateURL(value, selectedCategory);
    },
    [selectedCategory, updateURL]
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      updateURL(searchTerm, category);
    },
    [searchTerm, updateURL]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("");
    updateURL("", "");
  }, [updateURL]);

  const categories = ["tecnologia", "moda", "casa", "esportes"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Buscar
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Digite o nome do produto..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryFilter("")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? "bg-orange-100 text-orange-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Todas as categorias
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                          selectedCategory === category
                            ? "bg-orange-100 text-orange-800"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <CloseIcon className="h-4 w-4" />
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Produtos
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} produto
                {filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
                {searchTerm && ` para "${searchTerm}"`}
                {selectedCategory && ` na categoria "${selectedCategory}"`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <SearchIcon className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <CloseIcon className="h-4 w-4" />
                    Limpar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product.id)}
                  />
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Carregar mais produtos
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
